<template>
    <div>
        <!-- <div class="custom-index flex justify-center w-full py-4 xl:px-32 lg:px-20 sm:px-10 px-4">
            <SearchBar/>
        </div> -->
        <!-- <div class="py-4 xl:px-32 lg:px-20 sm:px-10 px-4">
            <PokemonTypeList :isCentered="false"/>
        </div> -->
        <div class="py-4 xl:px-32 lg:px-20 sm:px-10 px-4 flex:col xl:flex space-between">
            <Ashhead class="flex-1" ref="ash"/>
            <div class="flex-1"></div>
        </div>
        <div class="pb-3 xl:px-32 lg:px-20 sm:px-10 px-4">
            <PokemonList @failedCatch="failedCatch"/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchBar from '~/components/searchbar.vue'
import PokemonList from '~/layouts/pokemonList.vue';
import PokemonTypeList from '~/layouts/pokemontypelist.vue';
import Ashhead from '~/components/ashhead.vue';

const ash = ref(null);

function failedCatch() {
  if (ash.value) {
    console.log('clicked')
    ash.value.failedToCatch();
  }
}

</script>

<style lang="scss" scoped>
    
</style>