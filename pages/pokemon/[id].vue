<template>
  <div>
    <div class="card my-5 xl:mx-32 lg:mx-20 sm:mx-4 mx-2 border shadow-md rounded-lg bg-card-light dark:bg-card-dark">
      <div class="show-off" :class="!isShowingOff ? 'done' : ''">
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

    <!-- <div v-else>
      <p>Hello World</p>
    </div> -->
  </div>
</template>

<script>
import { usePokemonStore } from '~/store/pokemon';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'pokemon-id',
  data() {
    return {
      isShowingOff: true
    }
  },
  computed: {
    ...mapState(usePokemonStore, ['pokemon', 'loading', 'error']),
  },
  methods: {
    ...mapActions(usePokemonStore, ['fetchPokemon']),
    async handleFetch() {
      await this.fetchPokemon(this.$route.params.id);
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
.card {
  min-height: 90vh;

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