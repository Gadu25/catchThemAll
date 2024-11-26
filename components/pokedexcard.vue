<template>
    <div class="card-container w-full min-h-72 relative overflow-hidden bg-pokeball-red dark:bg-pokeball-blue">
        <div class="circle-highlight flex flex-col justify-center items-center bg-card-light dark:bg-card-dark">
            <img v-if="!imageIsLoaded" class="pokemon-egg animate-upDown" src="~/assets/images/pokemonEgg.webp"
                :alt="pokemonName + '-image'" />
            <img v-if="!loading" @load="imageLoaded" ref="cardImage" class="pokemon w-3/6"
                :class="isActive ? 'animate-upDown' : ''" :src="pokemonImage" :alt="pokemonName + '-image'" />
            <span class="block lg:hidden">
                <p class="first-letter:uppercase">
                   #{{ pokeNumber }} {{pokemonName}}
                </p>
            </span>
        </div>
        <div class="information">
            <div class="card-desc">
                <h4 class="font-bold text-5xl mb-2 first-letter:uppercase">{{ pokemonName }}</h4>
                <PokemonTypeList :pokemonTypes="types" :isCentered="false" :isShowTitle="false" />
                <div v-if="!loading" class="my-2">
                    <p>{{ pokemonDesc }}</p>
                </div>
            </div>
            <div class="absolute top-0 right-0 p-2">
                <p class="text-3xl">#{{ pokeNumber }}</p>
            </div>
            <div class="absolute bottom-0 right-0 p-2 flex justify-end">
                <div class="w-4 h-4 bg rounded-lg bg-fire-red ms-2 border-2"></div>
                <div class="w-4 h-4 bg rounded-lg bg-grass-green ms-2 border-2"></div>
                <div class="w-4 h-4 bg rounded-lg bg-electric-yellow ms-2 border-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PokemonTypeList from '~/layouts/pokemontypelist.vue';
import pokemonTypeClass from '~/data/pokemonTypeClass';
import { useSpeciesStore } from '~/store/species';
import { mapState, mapActions } from 'pinia';

export default {
    name: 'PokedexCard',
    components: { PokemonTypeList },
    data() {
        return {
            types: [
                {
                    name: 'grass'
                },
                {
                    name: 'water'
                }
            ],
            pokeNumber: '0',
            pokemonDesc: '',
            colors: pokemonTypeClass,
            loading: false,
            error: null,
            pokemonData: null,
            imageIsLoaded: false,
            pokemonSpecies: null
        }
    },
    computed: {
        pokemonImage() {
            return this.pokemonData?.sprites?.other['official-artwork']?.front_default;
        },
        pokemonTypes() {
            return this.pokemonData?.types
        },
        pokedexNumber() {
            return this.pokemonSpecies?.pokedex_numbers[0].entry_number
        }
    },
    methods: {
        async handleFetch() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + this.pokemonName);
                this.pokemonData = response.data;
            } catch (err) {
                this.error = 'Failed to load Pokémon data';
            } finally {
                this.customTypes();
                this.fetchSpecies();
                this.loading = false;
            }
        },
        fetchSpecies() {
            axios.get('https://pokeapi.co/api/v2/pokemon-species/' + this.pokemonData.id).then(res => {
                this.pokemonSpecies = res.data;
                this.pokeNumber = res.data.pokedex_numbers[0].entry_number
                // console.log(res.data.flavor_text_entries.find(entry => entry.language.name === 'en'))
                this.pokemonDesc = this.filteredFlavorText(res.data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text)
            });
        },
        filteredFlavorText(str) {
            return this.loading ? '' : str.replace(/\n/g, ' ').replace(/\f/g, ' ')
        },
        imageLoaded() {
            let cardImage = this.$refs.cardImage
            cardImage.style.opacity = 1;
        },
        customTypes() {
            let simplifiedTypes = []
            for (let type of this.pokemonTypes) {
                simplifiedTypes.push({ 'name': type.type.name })
            }
            this.types = simplifiedTypes
        }
    },
    props: {
        pokemonName: {
            default: 'Pokemon Name',
            type: String
        },
        isActive: {
            default: false,
            type: Boolean
        }
    },
    watch: {
        pokemonData(newVal, oldVal) {
            this.$nextTick(() => {
                const image = this.$refs.cardImage;

                // Check if the image is already loaded
                if (image.complete && image.naturalWidth > 0 && image.naturalHeight > 0) {
                    this.imageIsLoaded = true
                } else {
                    // Wait for the image to load
                    image.onload = () => {
                        this.imageIsLoaded = true
                    };

                    image.onerror = () => {
                        this.imageIsLoaded = false
                    };
                }
            })
        }
    },
    mounted() {
        this.handleFetch();
    },
}
</script>

<style lang="scss" scoped>
.card-container {
    border-right: 8px solid #333333;
    border-radius: 20px;
    z-index: 1;

    .circle-highlight {
        position: absolute;
        top: calc(-150%/6);
        left: 0;
        height: 150%;
        border-radius: 100%;
        aspect-ratio: 1 / 1;
        outline: 48px solid #333333;
        z-index: 2;

        .pokemon {
            opacity: 0;
            transition: .3s;
            pointer-events: none;
            user-select: none;
        }

        .pokemon-egg {
            width: 40.5%;
            scale: .5;
        }
    }

    .information {
        .card-desc {
            padding: 15px;
            margin-left: 500px;
        }
    }
}

@media screen and (max-width: 1024px) {
    .card-container {
        display: flex;
        justify-content: center;
        border-right: unset;
        .information {
            display: none;
        }

        .circle-highlight {
            position: relative;
        }
    }
}
@media  screen and (max-width: 425px) {
    .card-container {
        .circle-highlight {
            top: 0;
            outline: 25px solid #333333;
            height: 100%;
        }
    }
}
</style>