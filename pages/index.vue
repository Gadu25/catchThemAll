<template>
    <div>
        <div class="custom-index flex justify-center w-full py-4 xl:px-32 lg:px-20 sm:px-10 px-4">
            <SearchBar/>
        </div>
        <div class="py-4 xl:px-32 lg:px-20 sm:px-10 px-4">
            <PokemonTypeList/>
        </div>
        <div class="pb-3 xl:px-32 lg:px-20 sm:px-10 px-4">
            <PokemonList/>
        </div>
    </div>
</template>

<script>
import SearchBar from '~/components/searchbar.vue'
import PokemonList from '~/layouts/pokemonList.vue';
import PokemonTypeList from '~/layouts/pokemontypelist.vue';

export default {
    name: 'Home',
    components: { SearchBar, PokemonList, PokemonTypeList },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
    },
    props: {
        isClose: {
            default: true,
            value: Boolean
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>