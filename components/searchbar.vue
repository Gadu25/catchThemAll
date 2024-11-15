<template>
        <label class="relative block w-full">
            <span class="sr-only">Search</span>
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input 
                class="custom-search-bar pl-9 placeholder:italic placeholder:text-slate-400 block bg-card-white dark:bg-card-dark w-full border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                placeholder="Search for a pokemon..." 
                type="text" 
                name="search" 
                v-model="searchQuery"/>
               <ul v-if="allPokemons.length > 0 && searchQuery" class="absolute w-full mt-1 bg-card-light dark:bg-card-dark border border-slate-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                   <li v-for="pokemon in filteredPokemons" :key="pokemon.name" class="px-4 py-2 cursor-pointer hover:bg-sky-100 dark:hover:bg-sky-700 dark:text-white" @click="clickCard(pokemon.name)">
                       {{ pokemon.name }}
                   </li>
               </ul>
        </label>

</template>

<script>
    import { mapActions, mapState } from 'pinia';
    import {useAllPokemonStore } from '~/store/allpokemon'
    export default {
        name: 'SearchBar',
        data(){
            return {
                searchQuery:'',
                filteredPokemons: []
            }
        },
        computed: {
            ...mapState(useAllPokemonStore, ['allPokemons', 'loading', 'error'])
        },
        methods: {
            ...mapActions(useAllPokemonStore, ['searchPokemons', 'fetchAllPokemons']),
            clickCard(id) {
                this.$router.push({ name: 'pokemon-id', params: { id } });
            },
            handleFetch(){
                this.fetchAllPokemons()
            }
        },
        created() {
            if(isEmpty(this.allPokemons)){
                this.handleFetch()
            }
        },
        watch: {
            searchQuery(query) {
                this.filteredPokemons = this.searchPokemons(query)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .custom-search-bar {
        width: 100%;
        height: 40px;
    }
</style>