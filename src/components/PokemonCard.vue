<template>
<span>
    <v-card style="background: whitesmoke" class="ma-1 d-inline-block" max-width="240px" min-width="240px" max-height="550px">

        <v-img v-tilt="{speed: 500, perspective: 1200}" style="background:none;" contain elevation="4" class="card-image mb-1" :src="card.images.small" height="330px" width="240px"></v-img>

        <v-card-title>{{card.name}}</v-card-title>

        <v-card-actions>

            <div class="text-center">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark v-bind="attrs" v-on="on" icon>
                            <v-icon>mdi-menu</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item-title>
                            <v-btn @click="emitCardCollection" block>Add to Collection</v-btn>
                        </v-list-item-title>
                        <v-list-item-title>
                            <v-btn @click="emitWishList" block>Add to Wishlist</v-btn>
                        </v-list-item-title>
                    </v-list>
                </v-menu>
            </div>

            <!-- Dialog box--->
            <v-dialog transition="dialog-bottom-transition" width="100%" >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" v-bind="attrs" v-on="on" icon>
                        <v-icon>mdi-arrow-expand</v-icon>
                    </v-btn>
                </template>
                <template v-slot:default="dialog">
                    <v-toolbar color="yellow lighten">{{card.name}} card by Artist - {{card.artist}}</v-toolbar>

                    <v-card class="pa-4">
                        <v-row>

                            <v-col sm="12" md="12" lg="3">
                                <v-img v-tilt="{speed: 200, perspective: 2000}" class="card-image" width="100%" :src="card.images.large"></v-img>
                            </v-col>

                            <v-col class="d-inline-flex" sm="12" md="12" lg="8">
                              <div style="width: 50%">
                                <h2><v-icon>mdi-circle-multiple</v-icon>Card Prices</h2>
                                <ul style="list-style: none; size: A3">
                                <li v-if="card.cardmarket.prices.averageSellPrice">Average: ${{card.cardmarket.prices.averageSellPrice === undefined ? 'No Average Price Data': card.cardmarket.prices.averageSellPrice }}</li>
                                  <li v-if="card.cardmarket.prices.lowPrice">Min: ${{card.cardmarket.prices.lowPrice === undefined ? 'No Low Price Data': card.cardmarket.prices.lowPrice}}</li>
                                </ul>
                                <h2 v-if="card.rarity"><v-icon>mdi-star</v-icon>Rarity : {{card.rarity}}</h2>
                                <h2 v-if="card.types"><v-icon>mdi-flash</v-icon>Types: {{typeof card.types === undefined ? 'Type N/A': card.types.join('') }}</h2>
                                <h2 v-if="card.evolvesTo" ><v-icon>mdi-swap-vertical-bold</v-icon>Evolutions: {{card.evolvesTo === undefined ? 'No Evolutions': card.evolvesTo.join(', ')}}</h2>
                                <h2 v-if="card.flavorText"> <v-icon>mdi-card-text</v-icon>Description: <br> {{card.flavorText}}</h2>
                              </div>
                              <div>

                                <ul v-show="card.retreatCost"  :key="cost" v-for="(cost, n) in card.retreatCost" >
                                  <h2>Retreat Cost:</h2>
                                  <li>{{n}}:{{cost}}</li>
                                </ul>
                                <h2 v-show="card.hp">HP:{{card.hp}}</h2>
                                <ul v-show="card.legalities.expanded || card.legalities.Unlimited">
                                  <h2>Legalities</h2>
                                  <li v-if="card.legalities.expanded">Expanded: {{card.legalities.expanded === undefined ? 'N/A': `${card.legalities.expanded}`}}</li>
                                  <li v-if="card.legalities.Unlimited">Unlimited: {{card.legalities.Unlimited === undefined ? 'N/A': `${card.legalities.Unlimited}`}}</li>
                                </ul>
                                <h2>Set Name: {{card.set.name}}</h2>

                                <div v-show="card.weaknesses" v-for="(weakness,n) in card.weaknesses" :key="n">
                                  <h2>Weakness</h2>
                                <ul >
                                  <li>{{weakness.type}}:{{weakness.value}}</li>
                                </ul>
                                </div>
                              </div>
                            </v-col>
                        </v-row>
                        <v-card-actions class="justify-end">
                            <v-btn text @click="dialog.value = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>

                </template>
            </v-dialog>

        </v-card-actions>

    </v-card>
</span>
</template>

<script>
export default {
    name: 'PokemonCard',
    props: {
        card: {
            type: Object,
            required: true
        }
    },
    methods: {
        emitCardCollection() {
            this.$emit('add-card', this.card);
        },
        emitWishList() {
            this.$emit('add-wishlist', this.card)
        }
    }

}
</script>

<style scoped>

</style>
