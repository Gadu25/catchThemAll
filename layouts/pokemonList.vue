<template>
    <div>
        <div class="pokemon-container flex flex-wrap pb-3 xl:px-32 lg:px-20 sm:px-10 px-4" @scroll="onScroll">
            <template v-for="pokemon in pokemons">
                <div class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2 card-wrapper" ref="card">
                    <Card :name="pokemon.name" :url="pokemon.url" @handleParentFunction="handleParentFunction"/>
                </div>
            </template>
            <div v-if="nextUrl" class="flex justify-center items-center w-full py-16">
                <p><i class="fa-solid fa-spinner fa-spin"></i> looking for pokemons..</p>
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
            ...mapState(usePokemonsStore, ['pokemons', 'loading', 'nextUrl', 'error']),
        },
        methods: {
            ...mapActions(usePokemonsStore, ['fetchPokemons']),
            handleParentFunction(){
                this.$emit('failedCatch');
            },
            onScroll(e) {
                const { scrollTop, scrollHeight, clientHeight } = e.target;
                if (scrollHeight - scrollTop <= clientHeight * 1.5) {
                    this.fetchPokemons(); 
                }
            }
        },
        watch: {
            // pokemons(newVal, oldVal){
            //     if (newVal.results.length > 0) {
            //         this.$nextTick(() => {
            //             const cards = this.$refs.card;
            //             for(let card of cards){
            //                 card.classList.add('animate-fadeInLoad')
            //             }
            //         })
            //     }
            // }
        },
        mounted() {
            this.fetchPokemons()
        },
        created() {
        },
    }
</script>

<style lang="scss" scoped>
.pokemon-container {
    height: calc(100vh - 60px);
    // background-color: pink;
    // min-height: 200px; 
    overflow: auto; 
    scroll-behavior: smooth;
}
</style>