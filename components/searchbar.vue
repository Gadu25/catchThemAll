<template>
    <label class="relative block w-full">
        <span class="sr-only">Search</span>
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <i class="fa-solid fa-magnifying-glass"></i>
        </span>
        <input 
            class="custom-search-bar pl-9 placeholder:italic placeholder:text-slate-400 block bg-card-white dark:bg-card-dark w-full border border-slate-300 rounded-lg shadow focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" 
            placeholder="Search for a pokemon..." 
            type="text" 
            name="search" 
            v-model="searchQuery"
            @input="updateFilteredPokemons"
            @keydown.up.prevent="navigateResults('up')"
            @keydown.down.prevent="navigateResults('down')"
            @keydown.enter.prevent="selectResult"
        />
        <ul 
            v-if="allPokemons.length > 0 && searchQuery" 
            class="absolute w-full mt-1 bg-card-light dark:bg-card-dark border border-slate-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10"
        >
            <li 
                v-for="(pokemon, index) in filteredPokemons" 
                :key="pokemon.name" 
                ref="listItems"
                class="px-4 py-2 cursor-pointer hover:bg-sky-100 dark:hover:bg-sky-700 dark:text-white"
                :class="{ 'bg-sky-100 dark:bg-sky-700 active-item': selectedIndex === index }"
                @click="clickCard(pokemon.name)"
            >
                {{ pokemon.name }}
            </li>
        </ul>
    </label>
</template>


<script>
import { mapActions, mapState } from 'pinia';
import { useAllPokemonStore } from '~/store/allpokemon';

export default {
    name: 'SearchBar',
    data() {
        return {
            searchQuery: '',
            filteredPokemons: [],
            selectedIndex: 0 // Tracks the highlighted index
        };
    },
    computed: {
        ...mapState(useAllPokemonStore, ['allPokemons', 'loading', 'error'])
    },
    methods: {
        ...mapActions(useAllPokemonStore, ['searchPokemons', 'fetchAllPokemons']),
        clickCard(id) {
            this.$router.push({ name: 'pokemon-id', params: { id } });
            this.resetSearch();
        },
        handleFetch() {
            this.fetchAllPokemons();
        },
        updateFilteredPokemons() {
            this.filteredPokemons = this.searchPokemons(this.searchQuery);
            this.selectedIndex = 0;
        },
        navigateResults(direction) {
            if (direction === 'down') {
                this.selectedIndex = (this.selectedIndex + 1) % this.filteredPokemons.length;
            } else if (direction === 'up') {
                this.selectedIndex = (this.selectedIndex - 1 + this.filteredPokemons.length) % this.filteredPokemons.length;
            }
            this.scrollToSelected()
        },
        scrollToSelected() {
            this.$nextTick(() => {
                const listItems = this.$refs.listItems;
                if (listItems && listItems[this.selectedIndex]) {
                    listItems[this.selectedIndex].scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }
            });
        },
        selectResult() {
            if (this.selectedIndex !== -1 && this.filteredPokemons.length > 0) {
                const selectedPokemon = this.filteredPokemons[this.selectedIndex];
                this.clickCard(selectedPokemon.name);
            }
        },
        resetSearch() {
            this.searchQuery = '';
            this.filteredPokemons = [];
            this.selectedIndex = -1;
        }
    },
    created() {
        if (this.allPokemons.length === 0) {
            this.handleFetch();
        }
    },
    watch: {
        searchQuery(query) {
            this.filteredPokemons = this.searchPokemons(query);
            this.selectedIndex = 0; // Reset the index when the query changes
        }
    }
};
</script>


<style lang="scss" scoped>
.custom-search-bar {
    width: 100%;
    height: 40px;
}

.active-item {
    font-weight: bold;
}
</style>