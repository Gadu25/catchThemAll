import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import _ from 'lodash';

export const usePokemonsStore = defineStore('pokemons', () => {
  const pokemons = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Fetch function with Lodash to limit API calls (e.g., throttling or debouncing)
  const fetchPokemons = _.debounce(async (url='https://pokeapi.co/api/v2/pokemon?limit=12') => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(url);
      pokemons.value = response.data;
    } catch (err) {
      error.value = err.message || 'Failed to fetch data';
    } finally {
      loading.value = false;
    }
  }, 500); // Debounce set to 500ms

  return {
    pokemons,
    loading,
    error,
    fetchPokemons,
  };
});
