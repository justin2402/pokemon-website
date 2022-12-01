
<template>
    <v-card >
      <v-img :src="deck[0].images.small"></v-img>

      <v-card-actions>
        <v-dialog
            class="align-center"
            v-model="dialog"
            width="100%"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                dark
                v-bind="attrs"
                v-on="on"
                width="100%"
            >Show {{ deck[0].deckName }}
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{deck[0].deckName}}</span>
            </v-card-title>
            <v-card-text>
              <pokemon-card :card="card" v-for="(card, n) in deck" :key="card.id + n"></pokemon-card>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
</template>


<script>
import pokemonCard from "@/components/PokemonCard";
export default {
  name: "DeckItem",
  components: {pokemonCard},

  props:{
    deck:{
      type:[],
      required:true
    }
  },
  data(){
    return{
      dialog:false
    }
  }

}
</script>

<style scoped>

</style>
