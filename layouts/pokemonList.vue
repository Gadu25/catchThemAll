<template>
    <div>
        <div class="flex flex-wrap">
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
                this.localLoading = true;
                await this.fetchPokemons();
                this.localLoading = false;
            },
            paginatePrev(){
                if(this.pokemons.previous){
                    this.fetchPokemons(this.pokemons.previous);

                }
            },
            paginateNext(){
                if(this.pokemons.next){
                    this.fetchPokemons(this.pokemons.next);

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