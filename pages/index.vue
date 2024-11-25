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
            <div class="flex-1 flex justify-end items-center">
                <!-- <div class="pokedex flex-col justify-center items-center cursor-pointer">
                    <img class="w-12" src="~/assets/images/pokedex.png">
                    <span class="font-bold "><small>PokeDex</small></span>
                </div> -->
            </div>
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
    .pokedex {
        span {
            opacity: 0;
            height: 0;
            transition: all .3s;
        }
        &:hover {
            img {
                animation: twitch .3s ease-in;
            }
            span {
                opacity: 1;
                height: auto;
            }
        }
    }
    @keyframes twitch {
        0%,
        100% {
        transform: translateX(0);
        }

        25% {
        transform: translateX(-3px) rotate(-5deg);
        }

        50% {
        transform: translateX(3px) rotate(5deg);
        }

        75% {
        transform: translateX(-3px) rotate(-3deg);
        }
    }
</style>