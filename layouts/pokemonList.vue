<template>
    <div class="flex flex-wrap">
        <template v-for="pokemon in pokemons">
            <div class="w-full sm:w-1/2 lg:w-1/4 p-2">
                <Card :name="pokemon.name" :url="pokemon.url"/>
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
                this.localLoading = true;
                await this.fetchPokemons();
                this.localLoading = false;
            },
        },
        mounted() {
            // Fetch data when the component mounts
            this.handleFetch();
        },
    }
</script>

<style lang="scss" scoped>

</style>