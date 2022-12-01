<template>
<div>

    <div v-if="storeItems.length === 0">
      <h1 style="color: orangered">Sorry Store is Empty</h1>
    </div>
  <div v-else>
    <h1>Store</h1>
    <v-card style="text-align: center" class="d-inline-block mb-5" elevation="0" v-for="product in storeItems" :key="product.id">
      <h2 >
        Seller: {{product.username}}
      </h2>
        <div >
            <pokemon-card-collection class="d-inline-flex" :card="product.card"></pokemon-card-collection>
            <v-dialog width="25%"  transition="dialog-bottom-transition">
                <template v-slot:activator="{ on, attrs }">
                      <v-btn width="65%" color="green" v-bind="attrs" v-on="on">Description</v-btn>
                      <v-btn color="red" width="65%" v-if="product.sellerID === authUser.uid" @click="deletePost(product.id)">Delete Post</v-btn>

                </template>
                <template v-slot:default="tree">
                    <v-card >
                      <v-toolbar color="yellow" >Price: ${{parseInt(product.price).toFixed(2)}}</v-toolbar>
                      <div class="ma-3">
                        <p>{{product.city}} {{product.zip}}</p>
                        <p>{{product.condition}}</p>
                        <p>{{product.deliveryMethod}}</p>
                        <p>{{product.email}}</p>
                        <p>{{product.description}}</p>
                      </div>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="tree.value = false">Close</v-btn>

                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
        </div>
    </v-card>
  </div>
</div>
</template>

<script>
import {
    db
} from "@/firebase/firebase";
import PokemonCardCollection from "@/components/PokemonCardCollection";
export default {
    name: "StorePage",
    components: {
        PokemonCardCollection
    },
  methods:{
      async deletePost(product){
        await db.collection('Store').doc(product).delete()
      }
  },
  props:{
      authUser:{
        required:true
      }
  },

    data() {
        return {
            storeItems: [],
            dialog: false,
        }
    },
    firestore: function () {
        return {
            storeItems: db.collection('Store')
        }
    }
}
</script>

<style scoped>

</style>
