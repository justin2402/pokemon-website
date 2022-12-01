<template>
<div>
    <v-form class="text-right" @submit.prevent="searchPokemon()">

        <v-card elevation="4" style="background-color: rgb(243, 243, 243)" width="100%" class="pa-4">

            <v-row>
                <v-col>
                    <v-text-field prepend-icon="mdi-magnify" counter="25" solo label="Card Search" class="form-group" v-model="searchPrompt.cardName"> </v-text-field>
                    <v-select prepend-icon="mdi-cards" solo v-model="searchPrompt.subType" :items="selectOptions.subtypes" label="Card Subtype (GX, EX, VMAX  )" persistent-hint return-object single-line></v-select>
                    <v-select prepend-icon="mdi-star" solo v-model="searchPrompt.rarity" :items="selectOptions.rarity" label="Card Rarity (Rare, Promo, Rare Holo)" persistent-hint return-object single-line></v-select>

                </v-col>
                <v-col>
                    <v-select prepend-icon="mdi-cards" solo v-model="searchPrompt.type" :items="selectOptions.types" label="Card Type (Water, Grass, Fire)" persistent-hint return-object single-line></v-select>
                    <v-select prepend-icon="mdi-cards" solo v-model="searchPrompt.set" :items="selectOptions.setNames" label="Card Set" persistent-hint return-object single-line></v-select>
                </v-col>

            </v-row>




            <v-card-text class="text-right">
                <v-btn type="submit">Search Cards</v-btn>
            </v-card-text>

        </v-card>

    </v-form>
</div>
</template>

<script>
export default {
    name: "SearchCards",
    props: {
        selectOptions: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            searchPrompt: {
                cardName: '',
                subType: '',
                type: '',
                rarity: '',
                set: ''
            }
        }
    },
    methods: {
        searchPokemon() {
            this.$emit('search-card', this.searchPrompt)
            this.searchPrompt.cardName = '';
            this.searchPrompt.subType = '';
            this.searchPrompt.type = '';
            this.searchPrompt.rarity = ''
            this.searchPrompt.set = '';
        }
    }

}
</script>

<style scoped>

</style>
