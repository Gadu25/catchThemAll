import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import _ from 'lodash';

export const useAllPokemonStore = defineStore('allPokemons', () => {
  const allPokemons = ref([]); // Store all Pokémon data
  const loading = ref(false);
  const error = ref(null);

  // Fetch function with Lodash to limit API calls (debouncing)
  const fetchAllPokemons = _.debounce(async (url = 'https://pokeapi.co/api/v2/pokemon/') => {
    loading.value = true;
    error.value = null;
    try {
      let pokemons = [];
      let hasNextPage = true;
      while (hasNextPage) {
        const response = await axios.get(url);
        pokemons = pokemons.concat(response.data.results);

        if (response.data.next) {
          url = response.data.next; // Move to next page if there is more data
        } else {
          hasNextPage = false;
        }
      }
      allPokemons.value = pokemons; // Store the Pokémon data in the state
    } catch (err) {
      error.value = err.message || 'Failed to fetch data';
    } finally {
      loading.value = false;
    }
  }, 500); // Debounce set to 500ms

  // Function to search for Pokémon by name
  const searchPokemons = (query) => {
    return _.filter(allPokemons.value, (pokemon) =>
      _.includes(pokemon.name.toLowerCase(), query.toLowerCase())
    );
  };

  return {
    allPokemons,
    loading,
    error,
    fetchAllPokemons,
    searchPokemons,
  };
});
