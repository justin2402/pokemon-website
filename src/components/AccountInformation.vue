<template>
<v-container>
    <v-card elevation="0" class="text-center">

        <v-row>
            <v-col>

                <div class="pa-2">
                    <h2 style="text-align: center;" class="mb-2">Account Information</h2>
                    <v-img width="100%" :src="this.authUser.photoURL"> </v-img>
                    <h2 style="background: rgba(255,255,159,1); border-radius: 3px">{{ authUser.displayName }}</h2>
                </div>

            </v-col>

            <v-col>
                <br>
                <v-card-text class="text-left">
                    <br>
                    <h2>Cards: {{this.cardTotals}}</h2>
                    <br>
                    <h2>Decks: {{this.deckTotals}}</h2>
                    <br>
                    <h2>Wishlist: {{ this.wishTotals }}</h2>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>

</v-container>
</template>

<script>
import {
    db
} from "@/firebase/firebase";

export default {
    name: "AccountInformation",
    props: {
        authUser: {
            type: Object,
            required: true
        }

    },

    data() {
        return {
            cardTotals: 0,
            wishTotals: 0,
            deckTotals: 0,
            decks:null
        }
    },
    methods: {

    },
    async mounted() {

        let total = await db.collection('Users').doc(this.authUser.uid).collection('cardcollection').get().then(function (c) {

            return c.docs.length
        })
        this.cardTotals = total
        total = await db.collection('Users').doc(this.authUser.uid).collection('wishcollection').get().then(function (c) {

            return c.docs.length
        })
        this.wishTotals = total

      total = await db.collection('Users').doc(this.authUser.uid).collection('deckcollection').get().then(function (c) {

        return c.docs.length/60
      })
      this.deckTotals = total


    },
  firestore: function () {
    return {
      decks: db.collection('Users').doc(this.authUser.uid).collection("Decks")
    }
  }
}
</script>

<style scoped>
.friend-name {
    background: rgba(255, 255, 159, 1);
    ;
}
</style>
