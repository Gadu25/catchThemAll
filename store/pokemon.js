import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import _ from 'lodash';

export const usePokemonStore = defineStore('pokemon', (url) => {
  const pokemon = ref({});
  const loading = ref(false);
  const error = ref(null);

  // Fetch function with Lodash to limit API calls (e.g., throttling or debouncing)
  const fetchPokemon = _.debounce(async (url) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(url);
      pokemon.value = response.data;
    } catch (err) {
      error.value = err.message || 'Failed to fetch data';
    } finally {
      loading.value = false;
    }
  }, 500); // Debounce set to 500ms

  return {
    pokemon,
    loading,
    error,
    fetchPokemon,
  };
});
