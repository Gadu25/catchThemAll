<template>
  <div>
    <div v-if="!isPageLoading" class="scene scene--card">
      <div class="card my-5 xl:mx-32 lg:mx-20 sm:mx-4 mx-2 bg-card-light dark:bg-card-dark rounded-lg" :class="isFlipped ? 'is-flipped':'cursor-pointer border'" @click="finishShowOff()">
        <div class="card__face card__face--front">
            <div class="show-off" :class="isFlipped ? 'done' : ''">
              <div class="pokeball"><img src='~/assets/svg/pokeball.svg' alt='pokeball' /></div>
              <div class="pokemon" v-if="!loading" @click="playCry()">
                <div class="container">
                  <img @load="imageLoaded" ref="cardImage" :src="pokemon.sprites?.other.showdown.front_default"/>
                  <div class="pokemon-ground">
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!loading" class="dialogue-box border-4 border-card-dark dark:border-card-light" :class="!isShowingOff ? 'done' : ''">
              <div class="text">{{ getRandomMessage() }}</div>
            </div>
        </div>
        <div class="card__face card__face--back p-1 rounded-lg" :style="borderValue">
          <div class="p-5 bg-card-light dark:bg-card-dark rounded-md">
            <div @click="goToPrev()" class="absolute top-1 left-1 h-8 w-auto px-3 py-2 rounded-tl-md rounded-r-md text-slate-50 dark:bg-slate-900 bg-pokeball-red flex items-center justify-center cursor-pointer group transition-all">
              <i class="fa-solid fa-chevron-left"></i>
              <span class="w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 group-hover:px-2 transition-all"><small>back</small></span>
            </div>
            <div class="flex lg:flex-row-reverse justify-between flex-col mt-2">
              <div class="flex-col flex-1 justify-center align-center w-full h-full">
                <div class="flex justify-center">
                <div class="pokemon-image relative">
                  <img class="animate-upDown" :src="this.pokemonDisplays.pokemonFrontImage" :alt="pokemon+'-image'"/>
                  <template v-if="type == 'shiny'">
                    <div class="sparkle" style="top: 10%; left: 20%; animation-delay: .5s"></div>
                    <div class="sparkle" style="top: 70%; left: 20%; animation-delay: 1s"></div>
                    <div class="sparkle" style="top: 50%; left: 80%; animation-delay: 1.5s"></div>
                    <div class="sparkle" style="top: 20%; left: 60%; animation-delay: .2s"></div>
                    <div class="sparkle" style="top: 90%; left: 50%; animation-delay: .8s"></div>
                  </template>
                </div>
                </div>
                <div class="flex justify-center">
                  <div class="flex justify-center border rounded-md text-slate-950 dark:text-slate-50 mb-4">
                    <div class="p-2 flex-1 rounded-tl rounded-bl border-r transition-all" :class="type == 'normal' ? 'bg-pokemon-blue text-darkText': 'cursor-pointer'" @click="changeImage('normal')">
                      <p>Normal</p>
                    </div>
                    <div class="p-2 flex-1 rounded-tr rounded-br transition-all" :class="type == 'shiny' ? 'bg-pokemon-blue text-darkText': 'cursor-pointer'" @click="changeImage('shiny')">
                      <p>Shiny</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex-1 text-start text-pokeball-black dark:text-pokeball-white">
                <div class="flex justify-start mb-2 align-center">
                  <h1 class="first-letter:uppercase text-4xl md:text-7xl font-bold">{{ pokemon.name }}</h1>
                  <div class="my-auto mx-3 text-gray-500 text-xl cursor-pointer hover:scale-105 hover:text-gray-400 transition-all" @click="playCry()">
                    <i class="fa-solid fa-volume-high"></i>
                  </div>
                </div>
                <template v-if="fullyLoaded">
                  <p>{{ this.pokemonDisplays.flavoredText }}</p>
                  <PokemonTypeList :pokemonTypes="pokemon.types" :isShowTitle="false" :isCentered="false"/>
                  <table class="table-auto w-full leading-10">
                    <tbody>
                      <tr class="border-b">
                        <td>Pokedex No.</td>
                        <td>#{{ pokemonDisplays.pokedexNumber }}</td>
                      </tr>
                      <tr class="border-b">
                        <td>Introduced</td>
                        <td>{{ pokemonDisplays.generation }}</td>
                      </tr>
                      <tr class="border-b">
                        <td>Weight</td>
                        <td>{{ pokemon.weight / 10 }} kg</td>
                      </tr>
                      <tr class="border-b">
                        <td>Height</td>
                        <td>{{ pokemon.height / 10 }} m</td>
                      </tr>
                      <tr class="border-b">
                        <td>Abilities</td>
                        <td>
                          <template v-for="(ability, index) in pokemon.abilities">
                            <p>{{ index+1 }}. {{ ability.ability.name }}</p>
                          </template>
                        </td>
                      </tr>
                      <tr class="border-b">
                        <td>Shape</td>
                        <td>{{ pokemonDisplays.shape }}</td>
                      </tr>
                      <tr class="border-b">
                        <td>Color</td>
                        <td>{{ pokemonDisplays.color}}</td>
                      </tr>
                    </tbody>
                  </table>
                </template>
              </div>
            </div>
            <div class="w-full my-3 text-slate-950 dark:text-slate-50">
              <h3 class="text-2xl">Base Stats</h3>
              <table class="table-auto w-full leading-10">
                <template v-for="stat in pokemon.stats">
                  <tr>
                    <td class=" px-2">{{ stat.stat.name }}</td>
                    <td class=" px-2">{{ stat.base_stat }}</td>
                    <td class="w-1/2 px-2">
                      <div class="w-full bg-gray-300 h-6 rounded-full w-full">
                        <div class="bg-blue-500 h-full rounded-full" :style="'width:'+getStatPercentage(stat.stat.name, stat.base_stat)+'%'"></div>
                      </div>
                    </td>
                    <td class="px-2">{{ getMinStat(stat.stat.name, stat.base_stat) }}</td>
                    <td class=" px-2">{{ getMaxStat(stat.stat.name, stat.base_stat) }}</td>
                  </tr>
                </template>
                <tr>
                  <td class=" px-2">TOTAL</td>
                  <td class=" px-2">{{ this.pokemonDisplays.totalstats }}</td>
                  <td class=" px-2"></td>
                  <td class="px-2">Min</td>
                  <td class=" px-2">Max</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePokemonStore } from '~/store/pokemon';
import { useSpeciesStore } from '~/store/species';
import { useCaughtPokemonStore } from '~/store/caughtpokemon';
import { mapState, mapActions } from 'pinia';
import PokemonTypeCard from '~/components/pokemontypecard.vue';
import PokemonTypeList from '~/layouts/pokemontypelist.vue';
import pokemonTypeClass from '~/data/pokemonTypeClass';
import caughtAudio from '~/assets/audio/caught-pokemon.mp3'

export default {
  name: 'pokemon-id',
  data() {
    return {
      isShowingOff: true,
      isFlipped: false,
      isPageLoading: true,
      pokemonDisplays: {
        pokemonFrontImage: '',
        flavoredText: '',
        pokedexNumber: 0,
        totalstats: 0,
        generation: '',
        shape: '',
        color: ''
      },
      colors: pokemonTypeClass,
      type: 'normal',
      pokemonMessages: [
        "A new Pokémon, {{pokemonName}}, has joined your journey!",
        "Looks like you’ve found a rare one, {{pokemonName}}!",
        "The adventure continues with your new ally, {{pokemonName}}!",
        "What a find! {{pokemonName}} awaits you!",
        "Another Pokémon discovered—what’s next for {{pokemonName}}?",
        "Your team just got stronger with {{pokemonName}}!",
        "{{pokemonName}} is ready for the next challenge!",
        "A new Pokémon, {{pokemonName}}, has appeared, ready for adventure!",
        "A wild Pokémon, {{pokemonName}}, has caught your attention!",
        "Looks like you’ve encountered something special, {{pokemonName}}!",
        "A new companion, {{pokemonName}}, has arrived on your journey!",
        "{{pokemonName}} is ready to join the team!",
        "A new ally, {{pokemonName}}, is here to help you out!",
        "It’s time to make a new friend, {{pokemonName}}!",
        "Something exciting has appeared—{{pokemonName}}!",
        "You’ve found something worth your attention—{{pokemonName}}!",
        "A new Pokémon, {{pokemonName}}, is ready for action!",
        "Looks like a new adventure awaits with {{pokemonName}}!",
        "The path ahead just got more interesting with {{pokemonName}}!",
        "A new chapter begins with {{pokemonName}}!"
      ],
      borderValue: 'background-color: transparent',
      fullyLoaded: false,
      caughtAudio: caughtAudio,
    }
  },
  components: { PokemonTypeCard, PokemonTypeList },
  computed: {
    ...mapState(usePokemonStore, ['pokemon', 'loading', 'error']),
    ...mapState(useSpeciesStore, ['species', 'speciesLoading', 'speciesError']),
    ...mapState(useCaughtPokemonStore, ['getCaughtPokemons', 'getRecentCatch', 'isCaught']),
    pokemonStore() {
        return useCaughtPokemonStore();
    },
  },
  methods: {
    ...mapActions(usePokemonStore, ['fetchPokemon']),
    ...mapActions( useSpeciesStore, ['fetchSpecies']),
    handleFetch() {
      this.isPageLoading = true
      this.fetchPokemon(this.$route.params.id)
      this.isPageLoading = false
    },
    getPokemonImage(image){
      this.pokemonDisplays.pokemonFrontImage = this.type == 'normal' ? image.front_default : image.front_shiny
      // return this.type == 'normal' ? image.front_default : image.front_shiny
    },
    playCry() {
      const audio = new Audio(this.pokemon.cries.latest);
      audio.play();
    },
    async initialCry() {
      await this.delay(1000);
      this.playCry()
    },
    async transition() {
      await this.delay(2000)
      this.isShowingOff = false
    },
    changeImage(type){
      this.type = type
      this.getPokemonImage(this.pokemon.sprites?.other['official-artwork'])
    },
    async playCaught(){
      const audio = new Audio(this.caughtAudio);
      audio.volume = 0.5;
      await this.delay(1000)
      audio.play();
    },
    finishShowOff(){
      if(!this.isFlipped){
        this.isFlipped= !this.isFlipped
      }
    },
    getTotalStat(){
      let total = 0
      for(let value of this.pokemon.stats){
        total += value.base_stat
      }
      this.pokemonDisplays.totalstats =  total
    },
    getStatPercentage(name, value){
      let maxStat = (this.getMinStat(name, value) + this.getMaxStat(name, value)) / 2
      return (value/maxStat) * 100
    },
    getMinStat(name, value){
      if(name == 'hp') {
        return Math.floor((value * 2 * 100) / 100) + 100 + 10;
      }else {
        const min = Math.floor((value * 2 * 100) / 100) + 5;
        return Math.floor(min * 0.9)
      }
    },
    getMaxStat(name, value){
      if(name == 'hp') {
        return value * 2 + 204
      }else {
        return Math.floor((value * 2 +99) * 1.1)
      }
    },
    imageLoaded(){
      let cardImage = this.$refs.cardImage
      cardImage.classList.add('animate-fadeInLoad')
    },
    filteredFlavorText(str){
      this.pokemonDisplays.flavoredText = this.isPageLoading ? '' : str.replace(/\n/g, ' ').replace(/\f/g, ' ')
    },
    pokemonColor(typeName) {
        const colorObj = this.colors.find((color) => color.name === typeName);
        return colorObj ? colorObj.color : 'bg-gray-300';
    },
    pokemonTypeBadge(typeName){
        const typeObj = this.colors.find((color) => color.name === typeName);
        return typeObj.icon;
    },
    getBorderGradient(){
        if(this.pokemon?.types){
            let result = 'linear-gradient(to right,'
            if(this.pokemon.types.length > 1){
                for(let type of this.pokemon?.types){
                    let color = this.pokemonColor(type.type.name)+'73'
                    let extension = type.type.name == this.pokemon.types[this.pokemon.types.length-1].type.name ? ' ':','
                    result += (color+ extension)
                }
                this.borderValue = 'background-image: '+result+')'
            }else {
                this.borderValue = 'background-color: '+this.pokemonColor(this.pokemon.types[0].type.name)+'73'
            }
        }
    },
    getRandomMessage() {
      const randomIndex = Math.floor(Math.random() * this.pokemonMessages.length);
      return this.pokemonMessages[randomIndex].replace("{{pokemonName}}", this.pokemon.name);
    },
    goToPrev() {
      this.$router.go(-1);
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
  },
  watch: {
      pokemon(newVal, oldVal){
          this.$nextTick(() => {
            this.fetchSpecies(this.$route.params.id)
            let recentCatch = this.getRecentCatch()
            if(recentCatch == newVal.name){
              this.playCaught()
              this.pokemonStore.removeRecentCatch()
            }
            this.initialCry()
            this.getBorderGradient()
            this.getPokemonImage(this.pokemon.sprites?.other['official-artwork'])
            this.fullyLoaded = true
          })
      },
      species(newVal, oldVal){
        this.$nextTick(() => {
          this.pokemonDisplays.pokedexNumber = newVal?.pokedex_numbers[0].entry_number
          this.filteredFlavorText(newVal?.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text)
          this.getTotalStat()
          this.pokemonDisplays.generation = newVal?.generation.name
          this.pokemonDisplays.shape = newVal?.shape.name
          this.pokemonDisplays.color = newVal?.color.name 
        })
      }
  },
  mounted() {
    if(this.isCaught(this.$route.params.id)){

      this.handleFetch()
      this.transition()
    } else {
      navigateTo('/')
    }
  }
}
</script>
<style lang="scss" scoped>

.scene { 
  display: inline-block;
  width: 100%;
  height: 100%;
  perspective: 600px;
  .card {
    position: relative;
    min-height: 85vh;
    transform-style: preserve-3d;
    transform-origin: center right;
    transition: transform 1s;

    &.is-flipped {
      transform: translateX(-100%) rotateY(-180deg);
    }

    .card__face {
      color: white;
      backface-visibility: hidden;

        .show-off {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: .3s;
          
          &.done {
            opacity: 0;
          }

          .pokeball {
            position: absolute;
            width: 30px;
            transition: .3s;
            animation: throwAndBounce 1.5s ease forwards, open .3s forwards 1.7s;
            z-index: 1;
          }

          .pokemon {
            position: absolute;
            transition: all .5s;

            .container {
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;

              img {
                opacity: 0;
                animation: getOutAnimation .3s forwards 1.2s;
                z-index: 1;
                transition: .3s;
              }

              .pokemon-ground {
                opacity: 0;
                width: 200px;
                height: 60px;
                background: #1e4d1f;
                border-radius: 50%;
                box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
                transform: perspective(1000px) rotateX(10deg);
                overflow: hidden;
                animation: getGroundAnimation .1s linear forwards 1.2s;
                transition: .3s;
              }
            }
          }


        }

        $box-width: 80%; // Width of the dialogue box
        $box-height: 120px; // Height of the dialogue box
        $box-bg-color: rgba(0, 0, 0, 0.7); // Background color with transparency
        $box-border-color: #fff; // Border color (white)
        $box-border-width: 4px; // Thickness of the border
        $text-color: #fff; // Text color (white)
        $font-family: 'Press Start 2P', monospace; // Pixel/retro font (Google Fonts)
        $typing-speed: 0.05s; // Typing speed for the effect

        // The dialogue box styling
        .dialogue-box {
          position: absolute;
          top: 60vh;
          left: 10%;
          width: $box-width;
          min-height: $box-height;
          background-color: $box-bg-color;
          // border: $box-border-width solid $box-border-color;
          padding: 10px;
          font-family: $font-family;
          color: $text-color;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          opacity: 0;
          border-radius: 8px;

          &.done {
            animation: fadeIn .1s linear forwards;
          }

          // Inner text container
          .text {
            font-size: 16px;
            line-height: 1.5;
            text-wrap: wrap;
            overflow: hidden;

            // Typewriter effect
            &::after {
              content: "";
              display: inline-block;
              width: 1ch;
              height: 1em;
              background-color: $text-color;
              animation: blink 1s steps(2, start) infinite;
            }
          }
        }

        // Typing animation for the text content
        @keyframes typing {
          from {
            width: 0;
          }

          to {
            width: 100%;
          }
        }

        @keyframes blink {

          0%,
          100% {
            opacity: 0;
          }

          50% {
            opacity: 1;
          }
        }
      // }

      &--front {

      }

      &--back {
        transform: rotateY(180deg);
      }
    }
  }
}

.sparkle {
  position: absolute;
  width: 20px; /* Size of the sparkle */
  height: 20px;
  background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  animation: sparkle-animation 2s infinite;
  opacity: 0; /* Start hidden */
}


$screen-center: 30vh;
$bounce-height: 20vh;

@keyframes throwAndBounce {
  0% {
    transform: translateY(0) scale(1);
  }

  40% {
    transform: translateY($screen-center) scale(1);
  }

  50% {
    transform: translateY(calc(#{$screen-center} - #{$bounce-height})) scale(0.9);
  }

  60% {
    transform: translateY($screen-center) scale(1);
  }

  70% {
    transform: translateY(calc(#{$screen-center} - #{$bounce-height} / 2)) scale(0.95);
  }

  80% {
    transform: translateY($screen-center) scale(1);
  }

  90% {
    transform: translateY(calc(#{$screen-center} - #{$bounce-height} / 4)) scale(0.98);
  }

  100% {
    transform: translateY($screen-center) scale(1);
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

@keyframes open {
  0% {
    opacity: 1;
    transform: translateY($screen-center) scale(1);
  }

  100% {
    opacity: 0;
    transform: translateY($screen-center) scale(.5);
  }
}

@keyframes getOutAnimation {
  0% {
    transform: translateY(calc($screen-center - 10px)) scale(0);
    opacity: 0;
  }

  50% {
    transform: translateY(calc($screen-center - 10px)) scale(0.5);
    opacity: 0.5;
  }

  100% {
    transform: translateY(calc($screen-center - 10px)) scale(1.2);
    opacity: 1;
  }
}

@keyframes getGroundAnimation {
  0% {
    transform: translateY(calc($screen-center - 45px)) scale(0);
    opacity: 0;
  }

  100% {
    transform: translateY(calc($screen-center - 45px)) scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    transform: scale(.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes sparkle-animation {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>