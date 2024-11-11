<template>
    <div>
        <div class="custom-index flex justify-center w-full py-4 xl:px-32 lg:px-20 sm:px-10 px-4">
            <SearchBar/>
        </div>
        <div class="py-5 xl:px-32 lg:px-20 sm:px-10 px-4">
            <PokemonList/>
        </div>
    </div>
</template>

<script>
import SearchBar from '~/components/searchbar.vue'
import PokemonList from '~/layouts/pokemonList.vue';

export default {
    name: 'Home',
    components: { SearchBar, PokemonList },
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