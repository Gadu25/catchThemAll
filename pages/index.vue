<template>
    <div>
        <!-- <div class="custom-index flex justify-center w-full py-4 xl:px-32 lg:px-20 sm:px-10 px-4">
            <SearchBar/>
        </div> -->
        <!-- <div class="py-4 xl:px-32 lg:px-20 sm:px-10 px-4">
            <PokemonTypeList :isCentered="false"/>
        </div> -->
        <!-- <div class="py-4 xl:px-32 lg:px-20 sm:px-10 px-4 lg:flex-row flex flex-col-reverse space-between">
            <Ashhead class="flex-1 me-2" ref="ash"/>
            <div class="flex-1 flex justify-end items-center lg:mb-0 mb-2">
                <div class="item" @click="toggleHelp = true">
                    <i class="fa-regular fa-circle-question fa-xl p-4"></i>
                    <span class="font-bold "><small>Help</small></span>
                </div>
                <NuxtLink to="/pokedex">
                    <div class="item">
                        <img class="w-10" src="~/assets/images/pokedex.png">
                        <span class="font-bold "><small>PokeDex</small></span>
                    </div>
                </NuxtLink>
            </div>
        </div> -->
            <PokemonList @failedCatch="failedCatch"/>
        <Fab/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchBar from '~/components/searchbar.vue'
import PokemonList from '~/layouts/pokemonList.vue';
import PokemonTypeList from '~/layouts/pokemontypelist.vue';
import Ashhead from '~/components/ashhead.vue';
import Fab from '~/components/fab.vue';

const ash = ref(null);
const toggleHelp = ref(false);

function failedCatch() {
  if (ash.value) {
    ash.value.failedToCatch();
  }
}

watch(toggleHelp, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  } else {
    document.body.style.overflow = ''; // Restore scrolling
  }
});


</script>

<style lang="scss" scoped>
    .item {
        transition: all .3s;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        span {
            opacity: 0;
            transition: all .3s;
        }
        &:hover {
            animation: twitch .3s ease-in;
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