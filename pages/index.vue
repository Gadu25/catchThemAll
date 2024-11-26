<template>
    <div>
        <!-- <div class="custom-index flex justify-center w-full py-4 xl:px-32 lg:px-20 sm:px-10 px-4">
            <SearchBar/>
        </div> -->
        <!-- <div class="py-4 xl:px-32 lg:px-20 sm:px-10 px-4">
            <PokemonTypeList :isCentered="false"/>
        </div> -->
        <div class="py-4 xl:px-32 lg:px-20 sm:px-10 px-4 lg:flex-row flex flex-col-reverse space-between">
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
        </div>
        <div class="pb-3 xl:px-32 lg:px-20 sm:px-10 px-4">
            <PokemonList @failedCatch="failedCatch"/>
        </div>
        <div v-if="toggleHelp" @click="toggleHelp = false" class="modal-overlay w-screen h-screen overflow-hidden bg-slate-950 bg-opacity-80 fixed top-0 left-0 flex justify-center items-center z-50">
            <div class="modal-body w-11/12 lg:w-1/2 min-h-32 bg-card-light dark:bg-card-dark bg-opacity-100 rounded-lg border p-4">
                <h3 class="text-4xl font-bold">Let's go and Catch 'em All!</h3>
                <div class="lg:flex-row flex flex-col-reverse space-between mt-4">
                    <div class="leading-8 max-h-7xl max-h-[40vh] overflow-auto px-2">
                        <p>Hi there! I’m Professor Oak, your guide to this exciting adventure. Let me show you how to get started:</p>
                        
                        <div class="my-2">
                            <h1 class="text-xl mb-1"><strong>Main Page</strong></h1>
                            <ul class="ms-2">
                                <li><i>Click on Pokémon:</i> Try your luck catching Pokémon by clicking on them!</li>
                                <li><i>Daily Pokéballs:</i> I’ll provide you with 10 Pokéballs every day to help you explore and catch Pokémon. Use them wisely!</li>
                            </ul>
                        </div>

                        <div class="my-2">
                            <h1 class="text-xl mb-1"><strong>Pokédex Page</strong></h1>
                            <ul class="ms-2">
                                <li><p><i>Your Pokémon Collection:</i> Browse all the Pokémon you’ve successfully caught here. Can you catch them all?</p></li>
                            </ul>
                            
                        </div>

                        <!-- Closing Note -->
                        <p>Ready to begin your journey? Adventure awaits—good luck, Trainer!</p>
                    </div>
                    <div class="w-3/4 flex justify-center items-center">
                        <img src="~/assets/images/profOak.png" alt="prof-oak-image"/>
                    </div>
                </div>
                
            </div>
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
const toggleHelp = ref(false);

function failedCatch() {
  if (ash.value) {
    console.log('clicked')
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