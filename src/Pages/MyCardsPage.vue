<template>
<div>
    <div v-if="authUser !== null">
        <div class="d-inline-block">
            <v-btn @click="View = 'Collection'" text width="33.3%">My Collection</v-btn>
            <v-btn @click="View = 'Wishlist'" width="33.3%" text>My Wishlist</v-btn>
          <v-btn @click="View = 'Decks'" width="33.3%" text>My Decks</v-btn>
        </div>
        <v-container v-if="View === 'Collection'">
            <h1>My Card Collection</h1>
            <v-card elevation="0" class="d-inline-block" v-for="card in cards" :key="card.id">
                <h3 style="">Owned: {{card.count}}</h3>
                <pokemon-card-collection :card="card"></pokemon-card-collection>
                <div>
                    <v-btn @click="removeAll(card)" text color="red">Remove All</v-btn>
                    <v-btn v-if="card.count > 1" @click="removeOne(card)" text color="orange">Remove 1</v-btn>

                    <v-dialog v-model="dialog" persistent max-width="600px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="sell.card = card" color="green" text v-bind="attrs" v-on="on">
                                sell
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Seller: {{authUser.displayName}}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-form @submit.prevent="addToSell()">
                                      <h3 style="color: red" v-show="notEmpty">You are missing some fields</h3>

                                        <v-text-field v-model="sell.email" :rules="[rules.required, rules.email]" label="E-mail"></v-text-field>

                                        <v-text-field v-model="sell.price" label="Sell Price" type="number" :rules="[rules.required]"></v-text-field>
                                        <p>Recommended Price - ${{ card.cardmarket.prices.averageSellPrice }}</p>

                                        <v-select v-model="sell.condition" :items="['Near Mint', 'Lightly Played', 'Midly Played', 'Heavily Played', 'Damaged']" label="Condition" :rules="[rules.required]"></v-select>

                                        <v-text-field v-model="sell.zip" label="Zip-Code" counter maxlength="10" :rules="[rules.required, ]"></v-text-field>

                                        <v-text-field v-model="sell.city" label="City" counter maxlength="40" :rules="[rules.required, ]"></v-text-field>

                                        <v-select v-model="sell.deliveryMethod" :items="['Drop-Off', 'Pick-up', 'Meet-up']" label="Delivery Method" :rules="[rules.required]"></v-select>

                                        <v-textarea :rules="[rules.required]" v-model="sell.description" label="Description" placeholder="Preferred method of contact, Card Details, Other Info Buyer should know" required></v-textarea>

                                        <v-spacer></v-spacer>
                                        <v-btn color="red darken-1" text @click="dialog = false">
                                            Cancel
                                        </v-btn>
                                        <v-btn color="green darken-1" type="submit" text>
                                            Sell It
                                        </v-btn>

                                    </v-form>
                                </v-container>

                            </v-card-text>

                        </v-card>
                    </v-dialog>

                </div>

            </v-card>
        </v-container>

        <v-container v-if="View === 'Wishlist'">
            <h1>My Wishlist</h1>

            <v-card elevation="0" class="d-inline-block" v-for="card in wishlist" :key="card.id">
                <pokemon-card-collection :card="card"></pokemon-card-collection>
                <v-btn @click="removeWishlist(card)" text block color="red">Remove</v-btn>
            </v-card>
        </v-container>

        <v-container v-if="View === 'Decks'">
            <h1>My Decks</h1>
            <deck-manager :auth-user="authUser" :cards="deckList" class="d-inline-block" ></deck-manager>
        </v-container>

    </div>
</div>
</template>

<script>
import {
  db
} from "@/firebase/firebase";
import PokemonCardCollection from "@/components/PokemonCardCollection";
import DeckManager from "@/components/DeckManager";

export default {
    name: "MyCardsPage",
    components: {
      DeckManager,
        PokemonCardCollection
    },

    data() {
        return {
            decks:[],
            cards: [],
            wishlist: [],
            deckList:[],
            View: 'Collection',
            sell: {
                card: null,
                username: this.authUser.displayName,
                email: '',
                price: 0,
                zip: '',
                city: '',
                condition: null,
                deliveryMethod: '',
                description: '',
                sellerID: this.authUser.uid
            },
            dialog: false,
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                }
            },
            notEmpty:false
        }
    },
    props: {
        authUser: {
            required: true
        }
    },
    methods: {
        removeAll(e) {
            this.$emit('remove-all', e)
        },
      removeWishlist(e){
          db.collection('Users').doc(this.authUser.uid).collection('wishcollection').doc(e.id).delete()
      },
        removeOne(e) {
            this.$emit('remove-one', e)
        },
        addToSell() {
            if (this.sell.email === '' || this.sell.zip === '' || this.sell.city === '' || this.sell.deliveryMethod === '' || this.sell.price === '' || this.sell.condition === '' || this.sell.description === ''){
            this.notEmpty = true;
            }
            else {
              db.collection('Store').add(this.sell);
              this.dialog = false
            }
          this.sell = {
            card: null,
            username: this.authUser.displayName,
            email: '',
            price: 0,
            zip: '',
            city: '',
            condition: null,
            deliveryMethod: '',
            description: '',
            sellerID: this.authUser.uid
          }

        }
    },
  firestore: function () {

        return {
            cards: db.collection('Users').doc(this.authUser.uid).collection('cardcollection'),
            wishlist: db.collection('Users').doc(this.authUser.uid).collection('wishcollection'),
            deckList: db.collection('Users').doc(this.authUser.uid).collection('deckcollection'),
        }
    }

}
</script>

<style scoped>

</style>
