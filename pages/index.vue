<template>
    <div>
        <div class="custom-index flex justify-center py-4 px-32 w-full">
            <SearchBar/>
        </div>
        <div class="py-5 px-32">
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