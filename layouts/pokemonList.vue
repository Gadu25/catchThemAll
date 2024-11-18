<template>
    <div>
        <div class="flex flex-wrap">
            <template v-for="pokemon in pokemons.results">
                <div class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 p-2 card-wrapper" ref="card">
                    <Card :name="pokemon.name" :url="pokemon.url"/>
                </div>
            </template>
        </div>

        <!-- nav -->
        <div class="flex justify-end">
            <div class="flex justify-center">
                <button v-if="pokemons.previous != null" class="border rounded me-2 p-3 cursor-pointer hover:bg-pokemon-blue hover:text-pokeball-white" @click="paginatePrev()">
                    <i class="fa-solid" :class="loading ? 'fa-spinner fa-spin': 'fa-chevron-left'"></i>
                </button>
                <button v-if="pokemons.next != null" class="border rounded p-3 cursor-pointer hover:bg-pokemon-blue hover:text-pokeball-white" @click="paginateNext()">
                    <i class="fa-solid" :class="loading ? 'fa-spinner fa-spin': 'fa-chevron-right'"></i>
                </button>
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
            handleFetch() {
                this.fetchPokemons();
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
            },
        },
        watch: {
            pokemons(newVal, oldVal){
                if (newVal.results.length > 0) {
                    this.$nextTick(() => {
                        const cards = this.$refs.card;
                        for(let card of cards){
                            card.classList.add('animate-fadeInLoad')
                        }
                    })
                }
            }
        },
        mounted() {
            
        },
        created() {
            if(isEmpty(this.pokemons)){
                this.handleFetch();
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>