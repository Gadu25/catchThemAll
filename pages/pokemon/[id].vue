<template>
  <div class="show-off flex w-full h-full justify-center align-center">
    <div class="pokeball"><img src='~/assets/svg/pokeball.svg' alt='pokeball' /></div>
    <div class="pokemon" v-if="!loading" @click="playCry()">
      <img :src="pokemon.sprites?.other.showdown.front_default"/>
    </div>
  </div>
</template>

<script>
import { usePokemonStore } from '~/store/pokemon';
import { mapState, mapActions } from 'pinia';

export default {
  name: 'pokemon-id',
  async asyncData({ params }) {
    const { id } = params;
    return { id };
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
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
  },
  mounted(){
    this.handleFetch()
    this.initialCry()
  }
}
</script>
<style lang="scss" scoped>
.show-off {
  position: relative;
  .pokeball {
    position:absolute;
    width: 30px;
    animation: throwAndBounce 1.5s ease forwards, open .3s forwards 1.7s;
  }
  .pokemon {
    img{
      opacity: 0;
      animation: getOutAnimation .3s forwards 1.2s;
    }
  }
}

@keyframes throwAndBounce {
    /* Fall to the ground */
    0% {
        transform: translateY(0) scale(1);
    }
    40% {
        transform: translateY(300px) scale(1); /* Falling to the ground */
    }
    
    /* Bounce up */
    50% {
        transform: translateY(200px) scale(0.9);
    }
    60% {
        transform: translateY(300px) scale(1); /* Hits the ground */
    }
    
    /* Second smaller bounce */
    70% {
        transform: translateY(250px) scale(0.95);
    }
    80% {
        transform: translateY(300px) scale(1);
    }
    
    /* Settling after bounce */
    90% {
        transform: translateY(290px) scale(0.98);
    }
    100% {
        transform: translateY(300px) scale(1);
    }
}

@keyframes twitch {
    0%, 100% {
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
    transform: translateY(300px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(300px) scale(.5);
  }
}

@keyframes getOutAnimation {
    0% {
        transform: translateY(250px) scale(0);
        opacity: 0;
    }

    50% {
        transform: translateY(250px) scale(0.5);
        opacity: 0.5;
    }

    100% {
        transform: translateY(250px) scale(1);
        opacity: 1;
    }
}
</style>