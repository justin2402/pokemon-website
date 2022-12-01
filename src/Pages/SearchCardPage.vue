<template>
<div>
    <search-cards @search-card="searchPokemon" :selectOptions="selectOptions"></search-cards><br>
    <v-progress-circular :size="50" v-if="loading" indeterminate color="primary"></v-progress-circular>
    <pokemon-card @add-wishlist="addWishList" @add-card="addCard" v-else :card="card" :key="card.id" v-for="card in cards"></pokemon-card>
</div>
</template>

<script>
import SearchCards from "@/components/SearchCards";
import pokemonCard from "@/components/PokemonCard";
import pokemon from "pokemontcgsdk";
export default {
    name: "SearchCardPage",
    components: {
        SearchCards,
        pokemonCard
    },
    data() {
        return {
            cards: [],
            loading: false,

            group: null,
            query: '',
            selectOptions: {
                subtypes: [],
                rarity: [],
                types: [],
                set: [],
                setNames: []
            },

        }
    },

    methods: {
        addCard(cardToBeAdded) {
            this.$emit('add-cardcollection', cardToBeAdded)
        },
        addWishList(cardToAdd) {
            this.$emit('add-wishlist', cardToAdd)
        },
        async searchPokemon(item) {

            this.query = ''
            if (item.cardName !== '') {

                this.query += ` name:"*${item.cardName}*"`
            }
            if (item.subType !== '') {
                this.query += ` subtypes:"${item.subType}"`
            }
            if (item.rarity !== '') {
                this.query += ` rarity:"${item.rarity}" `
            }
            if (item.type !== '') {
                this.query += ` types:"${item.type}" `
            }
            if (item.set !== '') {

              item.set.replaceAll(' ','%')
              this.query += ` set.name:"${item.set}" `
            }

            //this needs to be updated to accept the SearchCards Component search
            this.loading = true;
            await pokemon.card.where({
                q: `${this.query}`
            }).then(res => {
                this.cards = res.data.sort();
                console.log(res.data)

            })

            this.loading = false;

        },
        async getSelects() {

            await pokemon.subtype.all().then(c => {
                this.selectOptions.subtypes = c
            })

            await pokemon.rarity.all().then(c => {
                this.selectOptions.rarity = c
            })

            await pokemon.type.all().then(c => {
                this.selectOptions.types = c
            })

            await pokemon.set.all().then(c => {
                this.selectOptions.set = c;
            })

            await this.selectOptions.set.forEach(l => {
                this.selectOptions.setNames.push(l.name)
            })

        }

    },
    beforeMount() {
        this.getSelects();
    }
}
</script>

<style scoped>

</style>
