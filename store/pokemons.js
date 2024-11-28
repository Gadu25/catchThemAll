import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import _ from 'lodash';

export const usePokemonsStore = defineStore('pokemons', () => {
  const pokemons = ref([]); // Array to hold all fetched Pokémon
  const nextUrl = ref('https://pokeapi.co/api/v2/pokemon?limit=20'); // URL for the next page
  const loading = ref(false);
  const error = ref(null);

  // Fetch function with Lodash debounce
  const fetchPokemons = _.debounce(async () => {
    if (!nextUrl.value || loading.value) return; // Prevent multiple calls or if no more data
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get(nextUrl.value);
      pokemons.value.push(...response.data.results); // Append new Pokémon to the list
      nextUrl.value = response.data.next; // Update next page URL
    } catch (err) {
      error.value = err.message || 'Failed to fetch data';
    } finally {
      loading.value = false;
    }
  }, 500); // Debounce set to 500ms

  return {
    pokemons,
    nextUrl,
    loading,
    error,
    fetchPokemons,
  };
});
