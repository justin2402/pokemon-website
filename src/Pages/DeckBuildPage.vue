<template>
<div>

    <v-row>
      <v-col sm="12" md="12" lg="2"  style="text-align: left" class="ma-3">
        <v-card>
          <v-card-title>Instructions</v-card-title>
          <v-card-text>
            <ul style="font-weight: bold;color: black">
              <li >You can change from your cards to your deck build by clicking the button saying show cards and show deck</li>
              <li>Your personal card count doesn't matter for the build</li>
              <li>You need 60 cards for a deck you won't be able to make the deck if you are missing cards</li>
              <li>Make sure to have enough cards in collection before building a deck</li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-btn color="yellow" v-if="deckDis" @click="deckDis = !deckDis">Show Deck</v-btn>
            <v-btn color="yellow" v-else @click="function(){deckDis = !deckDis; missingDis = false} ">Show Cards</v-btn>
            <v-spacer></v-spacer>
            <h4>{{deckList.length}}/60</h4>
          </v-card-actions>

        </v-card>
      </v-col>
        <v-col v-if="deckDis">
            <h1>My Cards</h1>
            <v-card elevation="0" class="d-inline-block" v-for="card in myCards" :key="card.id">
                <pokemon-card-collection :card="card"></pokemon-card-collection>
                <div>
                    <v-btn @click="addCard(card)" block text color="black">
                        <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                </div>

            </v-card>
        </v-col>
        <v-col v-else style="height: 200px">
            <v-text-field v-model="deckThing" placeholder="Deck Name"></v-text-field>
          <h4  v-if="missingDis" style="color: red">You are missing  {{60-this.deckList.length }} cards or you didn't add a deck name</h4>


            <v-btn style="width: 100%" @click="addDeck()" class="mb-4" block>Add Deck To Collection </v-btn>

            <v-card elevation="0" class="d-inline-block" v-for="(card,n) in deckList" :key="card.id + n">
                <pokemon-card-collection :card="card"></pokemon-card-collection>
                <div>
                    <v-btn @click="removeCard(card)" block text color="black">
                        <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                </div>

            </v-card>

        </v-col>

    </v-row>
</div>
</template>

<script>
import {
    db
} from "@/firebase/firebase";
import PokemonCardCollection from "@/components/PokemonCardCollection";

export default {
    name: "DeckBuildPage",
    components: {
        PokemonCardCollection
    },
    props: {
        authUser: {
            required: true
        }
    },
    methods: {
        addCard(e) {
            if (this.deckList.length < 60) {

                this.deckList.push(e)
            }

        },
        removeCard(e) {
            let inde = this.deckList.indexOf(e)

            this.deckList.splice(inde, 1)
        },
        async addDeck() {
            //add each card to a new collection based on the name that they gave it
            //make sure that there are 60 cards if not then do not add them
            if (this.deckList.length === 60 && this.deckThing !== '') {
                let name = this.deckThing

                let names = await db.collection('Users').doc(this.authUser.uid).get().then(c => {

                    return c.data()
                }).catch(e => {
                    console.error('There are no names', e)
                })
                let arr = []

                if (names === undefined) {
                  arr.push(name)
                  await db.collection('Users').doc(this.authUser.uid).set({names: arr})
                } else {
                  arr = names.names
                  arr.push(name)
                  await db.collection('Users').doc(this.authUser.uid).update({names:arr})
                }
                await this.deckList.forEach(c => {
                    c.deckName = name;

                    db.collection('Users').doc(this.authUser.uid).collection('deckcollection').add(c)
                })
                this.deckList.splice(0)
            }
            else{
              this.missingDis = true
            }

        }
    },

    data() {
        return {
            deckList: [],
            selectOptions: [],
            myCards: [],
            deckThing: '',
            deckDis: false,
            missingDis: false
        }
    },
    firestore: function () {
        return {
            myCards: db.collection('Users').doc(this.authUser.uid).collection('cardcollection')
        }
    }

}
</script>

<style scoped>

</style>
