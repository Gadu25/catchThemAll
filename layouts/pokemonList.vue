<template>
    <div>
        <template v-if="!loading">
            <div class="flex flex-wrap" v-if="!loading">
                <template v-for="pokemon in pokemons.results">
                    <div class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                        <Card :name="pokemon.name" :url="pokemon.url"/>
                    </div>
                </template>
            </div>
            <div class="flex justify-end">
                <div class="flex justify-center">
                    <div v-if="pokemons.previous != null" class="border rounded me-2 p-3 cursor-pointer hover:bg-pokemon-blue hover:text-pokeball-white" @click="paginatePrev()">
                        <i class="fa-solid fa-chevron-left"></i>
                    </div>
                    <div v-if="pokemons.next != null" class="border rounded p-3 cursor-pointer hover:bg-pokemon-blue hover:text-pokeball-white" @click="paginateNext()">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="flex justify-center align-items center w-full h-full overflow-hidden">
                <img src="~/assets/gifs/pikachuRun.gif"/>
            </div>
        </template>
    </div>
</template>

<script>
    import { usePokemonsStore } from '~/store/pokemons';
    import { mapState, mapActions } from 'pinia';
    import Card from '~/components/card.vue';

    export default {
        name: 'PokemonList',
        components: { Card },
        computed: {
            ...mapState(usePokemonsStore, ['pokemons', 'loading', 'error']),
        },
        methods: {
            ...mapActions(usePokemonsStore, ['fetchPokemons']),
            async handleFetch() {
                await this.fetchPokemons();
            },
            paginatePrev(){
                if(this.pokemons.previous){
                    console.log(this.loading)
                    this.fetchPokemons(this.pokemons.previous);
                    console.log(this.loading)

                }
            },
            paginateNext(){
                if(this.pokemons.next){
                    console.log(this.loading)
                    this.fetchPokemons(this.pokemons.next);
                    console.log(this.loading)

                }
            }
        },
        mounted() {
            this.handleFetch();
        },
    }
</script>

<style lang="scss" scoped>

</style>