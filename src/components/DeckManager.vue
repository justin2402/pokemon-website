<template>
<div>
  <div  class="d-inline-flex" :key="deck" v-for="deck in cardThing" >
    <deck-item  :deck="deck" ></deck-item>
  </div>
</div>
</template>





<script>
import deckItem from "@/components/DeckItem";
import {db} from "@/firebase/firebase";

export default {
  name: "DeckManager",
  components: {deckItem},

  props:{
    cards:{
      type:[],
      required:true
    },
    authUser:{
      type:Object,
      required:true
    }
  },
  data(){
    return{
      cardThing:[]
    }
  },
  created: async function () {
    let filterCards = function (c,x) {
      return c.deckName === x
    }

    let namesCollection = await db.collection('Users').doc(this.authUser.uid).get().then(c => {
      let names = c.data()
      return names.names
    }).catch(e => {
      console.error('There are no names', e)
    })
    let decks = []
    if (namesCollection !== undefined) {
      let deckNames = namesCollection
      deckNames.forEach(x => {

        let cardFiltered = this.cards.filter(c => filterCards(c,x))
        decks.push(cardFiltered)
      })



      this.cardThing = decks;
    }
  }
}
</script>

<style scoped>

</style>
