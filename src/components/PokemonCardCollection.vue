<template>
<span>
    <v-card style="background: whitesmoke" class="ma-1 d-inline-block" max-width="240px" min-width="240px" max-height="550px">

        <v-img v-tilt="{speed: 500, perspective: 1200}" style="background:none;" contain elevation="4" class="card-image mb-1" :src="card.images.small" height="330px" width="240px"></v-img>

        <v-card-title>{{card.name}}</v-card-title>

        <v-card-actions>

            <div class="text-center">
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
                                <li >Average: ${{card.cardmarket.prices.averageSellPrice}}</li>
                                  <li>Min: ${{card.cardmarket.prices.lowPrice}}</li>
                                </ul>
                                <h2><v-icon>mdi-star</v-icon>Rarity : {{card.rarity}}</h2>
                                <h2><v-icon>mdi-flash</v-icon>Types: {{card.types.join(', ') }}</h2>
                                <h2><v-icon>mdi-swap-vertical-bold</v-icon>Evolutions: {{card.evolvesTo === undefined ? 'No Evolutions': card.evolvesTo.join(', ')}}</h2>
                                <h2 v-if="card.flavorText"> <v-icon>mdi-card-text</v-icon>Description: <br> {{card.flavorText}}</h2>
                              </div>
                              <div>
                                <h2>Retreat Cost:</h2>
                                <ul :key="cost" v-for="(cost, n) in card.retreatCost" >
                                  <li>{{n}}:{{cost}}</li>
                                </ul>
                                <h2>HP:{{card.hp}}</h2>
                                <h2>Legalities</h2>
                                <ul>
                                  <li>Expanded: {{card.legalities.expanded === undefined ? 'N/A': `${card.legalities.expanded}`}}</li>
                                  <li>Unlimited: {{card.legalities.Unlimited === undefined ? 'N/A': `${card.legalities.Unlimited}`}}</li>
                                </ul>
                                <h2>Set Name: {{card.set.name}}</h2>
                                <h2>Weakness</h2>
                                <ul v-for="(weakness,n) in card.weaknesses" :key="n">
                                  <li>{{weakness.type}}:{{weakness.value}}</li>
                                </ul>
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
