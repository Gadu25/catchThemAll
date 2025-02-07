<template>
    <div>
        <div v-if="!isPageLoading" class="main-background flex justify-center relative" :style="backgroundValue">
            <div class="toppers">
                <div class="topper-contents">
                    <div class="flex justify-between items-center py-4">
                        <i class="fa fa-chevron-left fa-xl transition-all hover:text-pokeball-red cursor-pointer" @click="goBack()"></i>
                        <i class="fa fa-heart fa-xl transition-all hover:text-pokeball-red cursor-pointer"></i>
                    </div>
                    <div class="flex justify-between items-start py-4">
                        <h2 class="first-letter:uppercase text-4xl sm:text-5xl md:text-7xl font-bold">{{ pokemon.name }}</h2>
                        <p class="text-xl">#{{ pokemonDisplays.pokedexNumber }}</p>
                    </div>
                    <PokemonTypeList :pokemonTypes="pokemon.types" :isShowTitle="false" :isCentered="false"/>
                </div>
            </div>
            <div class="pokeball-bg">
                <img src="~/assets/images/pokeball-black.png" alt="pokeball-bg-icon"/>
            </div>
            <div class="pokemon-image">
                <img class="hover:animate-upDown" :src="this.pokemonDisplays.pokemonFrontImage" :alt="pokemon+'-image'"/>
                <template v-if="type == 'shiny'">
                <div class="sparkle" style="top: 10%; left: 20%; animation-delay: .5s"></div>
                <div class="sparkle" style="top: 70%; left: 20%; animation-delay: 1s"></div>
                <div class="sparkle" style="top: 50%; left: 80%; animation-delay: 1.5s"></div>
                <div class="sparkle" style="top: 20%; left: 60%; animation-delay: .2s"></div>
                <div class="sparkle" style="top: 90%; left: 50%; animation-delay: .8s"></div>
                </template>
            </div>
            <div class="container bg-card-light dark:bg-card-dark shadow-lg">
                <PokeDexNav v-model="menu"/>
                <div class="mt-8">
                    <PokedexContent v-model="menu" :pokemon="pokemon" :species="species"/>
                    <!-- <p>{{ pokemonDisplays.flavoredText }}</p> -->
                     <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis perspiciatis quisquam voluptatibus! Sit magni laudantium obcaecati modi. Labore, aspernatur. In iure dignissimos excepturi illum expedita ab saepe. Obcaecati, quos facere?</p> -->
                    <PrevNext :prevPokemon="prevNext.prev" :nextPokemon="prevNext.next" class="mt-6"/>    
                </div>
            </div>
        </div>
        <template v-else>
            <div class="h-screen flex justify-center items-center">
                <p><i class="fa-solid fa-spinner fa-spin"></i> loading pokemon...</p>
            </div>
        </template>
        <!-- <div class="hidden-buttons">
            <div class="prev-wrapper">
                <div class="prev bg-pokeball-red dark:card-dark"></div>
            </div>
            <div class="next-wrapper">
                <div class="next bg-pokeball-red dark:card-dark"></div>
            </div>
        </div> -->
    </div>
</template>

<script>
    import { usePokemonStore } from '~/store/pokemon';
    import { useSpeciesStore } from '~/store/species';
    import { mapActions, mapState } from 'pinia';
    import { useCaughtPokemonStore } from '~/store/caughtpokemon';
    import PokemonTypeList from '~/layouts/pokemontypelist.vue';
    import PokeDexNav from '../../components/pokedexnav.vue';
    import PokedexContent from '~/components/pokedexcontent.vue';
    import PrevNext from '~/components/prevnext.vue';
    import pokeapibaseurl from '~/utils/pokeapibaseurl';
    import axios from 'axios';
    import pokemonTypeClass from '~/data/pokemonTypeClass';

    export default {
        name: 'pokedex-id',
        components: {PokemonTypeList, PokeDexNav, PokedexContent, PrevNext},
        data() {
            return {
                isPageLoading: true,
                pokemonData: null,
                colors: pokemonTypeClass,
                backgroundValue: '',
                type: 'normal',
                pokemonDisplays: {
                    pokemonFrontImage: '',
                    flavoredText: '',
                    pokedexNumber: 0,
                    totalstats: 0,
                    generation: '',
                    shape: '',
                    color: '',
                },
                menu: [
                    {
                        name: 'About',
                        isActive: true
                    },
                    {
                        name: 'Stats',
                        isActive: false
                    },
                    {
                        name: 'Evolution',
                        isActive: false
                    },
                    {
                        name: 'Moves',
                        isActive: false
                    },
                ],
                prevNext: {
                    prev: null,
                    next: null
                }
            }
        },
        computed: {
            ...mapState(usePokemonStore, ['pokemon', 'loading', 'error']),
            ...mapState(useSpeciesStore, ['species', 'speciesLoading', 'speciesError']),
            ...mapState(useCaughtPokemonStore, ['getCaughtPokemons', 'getRecentCatch', 'isCaught']),
            caughtPokemons() {
                return this.pokemonStore.getCaughtPokemons()
            },
            pokemonStore() {
                return useCaughtPokemonStore()
            }
        },
        methods: {
            ...mapActions(usePokemonStore, ['fetchPokemon']),
            ...mapActions( useSpeciesStore, ['fetchSpecies']),
            goBack(){
                this.$router.go(-1);
            },
            handleFetch(){
                this.fetchPokemon(this.$route.params.id)
            },
            pokemonColor(typeName) {
                const colorObj = this.colors.find((color) => color.name === typeName);
                return colorObj ? colorObj.color : 'bg-gray-300';
            },
            getGradient(){
                if(this.pokemon?.types){
                    let result = 'linear-gradient(to top right,'
                    if(this.pokemon.types.length > 1){
                        for(let type of this.pokemon?.types){
                            let color = this.pokemonColor(type.type.name)+'cc'
                            let extension = type.type.name == this.pokemon.types[this.pokemon.types.length-1].type.name ? ' ':','
                            result += (color+ extension)
                        }
                        this.backgroundValue = 'background-image: '+result+')'
                    }else {
                        this.backgroundValue = 'background-color: '+this.pokemonColor(this.pokemon.types[0].type.name)+'cc'
                    }
                }
            },
            getPokemonImage(image){
                this.pokemonDisplays.pokemonFrontImage = this.type == 'normal' ? image.front_default : image.front_shiny
            },
            filteredFlavorText(str){
                console.log('test')
                this.pokemonDisplays.flavoredText = str.replace(/\n/g, ' ').replace(/\f/g, ' ')
            },
            changeImage(type){
                this.type = type
                this.getPokemonImage(this.pokemon.sprites?.other['official-artwork'])
            },
            getPrevAndNext(){
                let currIndex = this.caughtPokemons.indexOf(this.pokemon.name)
                //prev
                if(currIndex -1 >= 0){
                    axios.get(pokeapibaseurl+'pokemon/'+this.caughtPokemons[currIndex - 1]).then(res => {
                        console.log(res)
                        this.prevNext.prev = res.data.id
                    })
                }
                //next
                if(currIndex +1 < this.caughtPokemons.length){
                    axios.get(pokeapibaseurl+'pokemon/'+this.caughtPokemons[currIndex + 1]).then(res => {
                        this.prevNext.next = res.data.id
                    })
                }
                // this.prevNext.prev = currIndex - 1 >= 0 ? currIndex : null
                // this.prevNext.next = currIndex + 1 < this.caughtPokemons.length ? currIndex + 1 : null
            }
        },
        mounted() {
            this.isPageLoading = true;
            this.handleFetch();
        },
        watch: {
            pokemon(newVal, oldVal){
                this.$nextTick(() => {
                    this.fetchSpecies(this.$route.params.id)
                    // this.initialCry()
                    this.getGradient()
                    this.getPokemonImage(this.pokemon.sprites?.other['official-artwork'])
                    this.getPrevAndNext()
                })
            },
            species(newVal, oldVal){
                this.$nextTick(() => {
                    this.pokemonDisplays.pokedexNumber = newVal?.pokedex_numbers[0].entry_number    
                    this.filteredFlavorText(newVal?.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text)
                    // this.getTotalStat()
                    this.pokemonDisplays.generation = newVal?.generation.name
                    this.pokemonDisplays.shape = newVal?.shape.name
                    this.pokemonDisplays.color = newVal?.color.name
                    this.isPageLoading = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    $topDistance: 382px;
    .main-background {
        width: 100%;
        min-height: calc(100vh - 60px);
        background-color: white;
        transition: all .2s;
        .toppers {
            position: absolute;
            width: 75vw;
            left: 12.5vw;
            padding: 15px 0;

            @media screen and (max-width: 1024px) {
                width: 90vw;
                left: 5vw;
            }
            .topper-contents {
                
            }
        };

        .pokeball-bg {
            position: absolute;
            width: 280px;
            top: 0;
            margin-top: $topDistance;
            transform: translateY(-220px);
            right: calc(36vw - 140px);
            opacity: .2;
            z-index: 0;
            overflow:hidden;
            @media screen and (max-width: 768px) {
                right: calc(45vw - 140px);
            }
            @media screen and (max-width: 310px) {
                display: none;
            }
        }

        .pokemon-image {
            position: absolute;
            width: 260px;
            top: 0;
            margin-top: $topDistance;
            transform: translateY(-180px);
            left: calc(50vw - 130px);
            z-index: 2;
        }

        .container {
            width: 75vw;
            margin-top: $topDistance;
            padding: 65px 35px;
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
            z-index: 1;

            @media screen and (max-width: 1024px) {
                width: 90%;
                border-radius: 15px;
                margin-bottom: 15px;
            }
        }

    }
//     .hidden-buttons{
//         position: fixed;
//   display: block;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//         background-image: linear-gradient(to bottom, #000000, #ffffff);
//         // overflow: hidden;
//         z-index: 100;
//         .prev-wrapper, .next-wrapper {
//             position: absolute;
//             height: 100%;
//             width: 100px;

//             .prev, .next {
//                 position: absolute;
//                 top: calc(50vh - 50px);
//                 height: 100px;
//                 width: 80px;
//                 transition: all .3s;
//                 cursor: pointer;

//                 &:hover {
//                     scale: 1.1;
//                 }

//             }

//             .prev {
//                 left: -80px;
//                 border-top-right-radius: 50px;
//                 border-bottom-right-radius: 50px;
//                 border-right: 5px solid #333333;
//             }
            
//             .next {
//                 right: -80px;
//                 border-top-left-radius: 50px;
//                 border-bottom-left-radius: 50px;
//                 border-left: 5px solid #333333;
//             }

//         }
//         .prev-wrapper {
//             left: 0;
//             &:hover {
//                 .prev {
//                     left: 0;
//                 }
//             }
//         }
//         .next-wrapper {
//             right: 0;
//             &:hover {
//                 .next {
//                     right: 0;
//                 }
//             }
//         }
//     }
</style>