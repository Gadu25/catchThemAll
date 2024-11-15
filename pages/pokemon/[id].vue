<template>
  <div v-if="!isPageLoading" class="scene scene--card">
    <div class="card my-5 xl:mx-32 lg:mx-20 sm:mx-4 mx-2 border shadow-md rounded-lg bg-card-light dark:bg-card-dark" :class="isFlipped ? 'is-flipped':'cursor-pointer'" @click="finishShowOff()">
      <div class="card__face card__face--front">
        <div class="show-off " :class="!isShowingOff ? 'done' : ''">
          <div class="pokeball"><img src='~/assets/svg/pokeball.svg' alt='pokeball' /></div>
          <div class="pokemon" v-if="!loading" @click="playCry()">
            <div class="container">
              <img :src="pokemon.sprites?.other.showdown.front_default" />
              <div class="pokemon-ground">
              </div>
            </div>
          </div>
        </div>
        <div class="dialogue-box" :class="!isShowingOff ? 'done' : ''">
          <div class="text">Amazing! <span class="first-letter:uppercase">{{pokemon.name}}</span> was successfully caught!</div>
        </div>
      </div>
      <div class="card__face card__face--back">
        <div class="flex flex-row-reverse justify-between p-5">
          <div class="flex justify-center align-center w-full h-full">
            <img class="animate-upDown" :src="pokemon.sprites?.other['official-artwork'].front_default" :alt="pokemon+'-image'"/>
          </div>
          <div class="text-start text-pokeball-black dark:text-pokeball-white">
            <div class="flex justify-start mb-2 align-center">
              <h1 class="first-letter:uppercase text-4xl font-bold">{{ pokemon.name }}</h1>
              <div class="my-auto mx-3 text-gray-500 text-xl cursor-pointer hover:scale-105 hover:text-gray-400 transition-all" @click="playCry()">
                <i class="fa-solid fa-volume-high"></i>
              </div>
            </div>
            <p class="">{{ filteredFlavorText(species?.flavor_text_entries[0]?.flavor_text) }}</p>
            <PokemonTypeList :pokemonTypes="pokemon.types" :isShowTitle="false" :isCentered="false"/>
            <!-- <templates v-for="type in pokemon.types">
              <PokemonTypeCard :name="type.type.name" :color="pokemonColor(type.type.name)" :badge="pokemonTypeBadge(type.type.name)"/>
            </templates> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePokemonStore } from '~/store/pokemon';
import { useSpeciesStore } from '~/store/species';
import { mapState, mapActions } from 'pinia';
import PokemonTypeCard from '~/components/pokemontypecard.vue';
import PokemonTypeList from '~/layouts/pokemontypelist.vue';
import pokemonTypeClass from '~/data/pokemonTypeClass';

export default {
  name: 'pokemon-id',
  data() {
    return {
      isShowingOff: true,
      isFlipped: false,
      isPageLoading: true,
      colors: pokemonTypeClass
    }
  },
  components: { PokemonTypeCard, PokemonTypeList },
  computed: {
    ...mapState(usePokemonStore, ['pokemon', 'loading', 'error']),
    ...mapState(useSpeciesStore, ['species', 'speciesLoading', 'speciesError'])
  },
  methods: {
    ...mapActions(usePokemonStore, ['fetchPokemon']),
    ...mapActions( useSpeciesStore, ['fetchSpecies']),
    handleFetch() {
      this.isPageLoading = true
      this.fetchPokemon(this.$route.params.id);
      this.fetchSpecies(this.$route.params.id);
      this.isPageLoading = false
    },
    playCry() {
      const audio = new Audio(this.pokemon.cries.latest);
      audio.play();
    },
    async initialCry() {
      await this.delay(1400);
      this.playCry()
    },
    async transition() {
      await this.delay(2000)
      this.isShowingOff = false
    },
    finishShowOff(){
      if(!this.isFlipped){
        this.isFlipped= !this.isFlipped
      }
    },
    filteredFlavorText(str){
      return this.isPageLoading ? '' : str.replace(/\n/g, ' ').replace(/\f/g, ' ')
      // return str
    },
    pokemonColor(typeName) {
        const colorObj = this.colors.find((color) => color.name === typeName);
        return colorObj ? colorObj.color : 'bg-gray-300';
    },
    pokemonTypeBadge(typeName){
        const typeObj = this.colors.find((color) => color.name === typeName);
        return typeObj.icon;
    },
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
  },
  mounted() {
    this.handleFetch()
    this.initialCry()
    this.transition()
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
      // position: absolute;
      // width: 100%;
      // height: 100%;
      color: white;
      backface-visibility: hidden;

        .show-off {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;

          &.done {
            // .pokeball {
            //   opacity: 0;
            //   height: 0;
            // }
            // .pokemon {
            //   .container {
            //     opacity: 0;
            //     height: 0;
            //     image {
            //       height: 0;
            //       opacity: 0;
            //     }
            //     .pokemon-ground {
            //       height: 0;
            //       opacity: 0;
            //     }
            //   }
            // }
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
          bottom: 10vh;
          left: 10%;
          width: $box-width;
          height: $box-height;
          background-color: $box-bg-color;
          border: $box-border-width solid $box-border-color;
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
            white-space: nowrap;
            text-wrap: wrap;
            overflow: hidden;
            display: inline-block;

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
    transform: translateY(calc($screen-center - 10px)) scale(1);
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
</style>