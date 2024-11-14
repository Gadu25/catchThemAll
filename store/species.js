import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import _ from 'lodash';

export const useSpeciesStore = defineStore('species', () => {
  const species = ref({});
  const speciesLoading = ref(false);
  const speciesError = ref(null);

  // Fetch function with Lodash to limit API calls (e.g., throttling or debouncing)
  const fetchSpecies = _.debounce(async (id) => {
    speciesLoading.value = true;
    speciesError.value = null;
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/'+id);
      species.value = response.data;
    } catch (err) {
        speciesError.value = err.message || 'Failed to fetch data';
    } finally {
        speciesLoading.value = false;
    }
  }, 500); // Debounce set to 500ms

  return {
    species,
    speciesLoading,
    speciesError,
    fetchSpecies,
  };
});
