<template>
    <div class="card rounded-lg" :style="borderValue+'; padding: 2px;'" :class="{'clicked': cardClicked, 'twitching': twitching, 'escaped': isEscaped}" @click="clickCard(pokemonData.name)">
        <div class="w-full h-full p-5 rounded-md flex justify-between cursor-pointer hover:shadow bg-card-light dark:bg-card-dark">
            <img v-if="!imageIsLoaded" class="pokemon-egg animate-upDown" src="~/assets/images/pokemonEgg.webp" :alt="name + '-image'" />
            <img v-if="!loading" @load="imageLoaded" ref="cardImage" class="pokemon w-3/6" :class="!pokemonStore.isCaught(name) ? 'silhouette': ''" :src="pokemonImage" :alt="name + '-image'"/>
            <div v-if="imageIsLoaded">
                <p class="first-letter:uppercase"><strong>{{ pokemonStore.isCaught(name) ? name : '???' }}</strong></p>
                <div v-if="!loading && pokemonStore.isCaught(name)" class="py-2">
                    <template v-for="type in pokemonTypes">
                        <PokemonTypeCard :name="type.type.name" :color="pokemonColor(type.type.name)" :badge="pokemonTypeBadge(type.type.name)"/>
                    </template>
                </div>
            </div>
            <div v-if="!pokemonStore.isCaught(name)" class="pokeball"><img src='~/assets/svg/pokeball.svg' alt='pokeball' /></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import pokemonTypeClass from '~/data/pokemonTypeClass';
import PokemonTypeCard from '~/components/pokemontypecard.vue'
import { useCaughtPokemonStore } from '~/store/caughtpokemon';

export default {
    name: 'Card',
    data() {
        return {
            colors: pokemonTypeClass,
            loading: false,
            error: null,
            pokemonData: null,
            cardClicked: false,
            imageIsLoaded: false,
            borderValue: 'transparent',
            twitching: false,
            getOut: false,
            isEscaped: false
        }
    },
    components: {
        PokemonTypeCard
    },
    computed: {
        pokemonImage() {
            return this.pokemonData?.sprites?.other['official-artwork']?.front_default;
        },
        pokemonTypes() {
            return this.pokemonData?.types
        },
        pokemonStore() {
            return useCaughtPokemonStore();
        },
    },
    methods: {
        async handleFetch() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(this.url);
                this.pokemonData = response.data;
            } catch (err) {
                this.error = 'Failed to load Pokémon data';
            } finally {
                this.loading = false;
            }
        },
        imageLoaded(){
            let cardImage = this.$refs.cardImage
            cardImage.style.opacity = 1;
        },
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        pokemonColor(typeName) {
            const colorObj = this.colors.find((color) => color.name === typeName);
            return colorObj ? colorObj.color : 'bg-gray-300';
        },
        pokemonTypeBadge(typeName){
            const typeObj = this.colors.find((color) => color.name === typeName);
            return typeObj.icon;
        }
        ,
        getBorderGradient(){
            if(this.pokemonData?.types){
                let result = 'linear-gradient(to right top,'
                if(this.pokemonData.types.length > 1){
                    for(let type of this.pokemonData?.types){
                        let color = this.pokemonColor(type.type.name)+'73'
                        let extension = type.type.name == this.pokemonData.types[this.pokemonData.types.length-1].type.name ? ' ':','
                        result += (color+ extension)
                    }
                    this.borderValue = 'background-image: '+result+')'
                }else {
                    this.borderValue = 'background-color: '+this.pokemonColor(this.pokemonData.types[0].type.name)+'73'
                }
            }
        },
        getChance(percentage) {
            // Generate a random number between 0 and 100
            const random = Math.random() * 100;
            return random < percentage;
        },
        async clickCard(id) {
            if(this.cardClicked == false){
                if(this.pokemonStore.isCaught(this.name)){
                    this.$router.push({ name: 'pokemon-id', params: { id } });
                }
                this.cardClicked = true
                await this.delay(950);
                this.twitching = true;
                await this.delay(3000);
                if(this.getChance(50)){
                    this.pokemonStore.catchPokemon(this.name);
                    this.$router.push({ name: 'pokemon-id', params: { id } });
                }
                else {
                    this.twitching= false
                    this.isEscaped = true
                    this.$emit('handleParentFunction');
                    await this.delay(2000);
                    this.cardClicked = false
                    this.isEscaped = false
                }
            }
        }
    },
    mounted() {
        this.handleFetch();
    },
    props: {
        name: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    watch: {
        url(newValue, oldValue) {
            this.imageIsLoaded = false
            this.handleFetch()
        },
        pokemonData(newVal, oldVal){
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

                this.getBorderGradient()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    position: relative;
    &:hover {
        animation: jumpUp .2s linear;

        .pokemon {
            transform: .3s scale(.8) linear;
            animation: upDown 1.5s ease-in-out infinite;
        }

        .pokeball {
            opacity: 1;
        }
    }
    .pokemon {
        opacity: 0;
        transition: .3s;
        pointer-events: none;
        user-select: none;
        &.silhouette {
            filter: brightness(0) saturate(100%);
            pointer-events: none;
            user-select: none;
        }
    }
    .pokemon-egg {
        width: 40.5%;
        scale: .5;
    }

    .pokeball {
        position: absolute;
        left: 15px;
        bottom: 15px;
        animation: spin 1s linear infinite;
        width: 30px;
        opacity: 0;
        transition: opacity .3s linear 0s;
    }

    &.clicked {
        .pokeball {
            animation: throwBall .4s linear forwards;
            opacity: 1;
        }

        .pokemon {
            animation: catchAnimation 0.5s forwards .4s;
        }

        &.twitching {
            .pokeball {
                animation: twitch 1s forwards infinite;
            }
        }

        &.escaped {
            .pokeball {
                animation: open .3s forwards
            }
            .pokemon {
                animation: getOutAnimation .3s forwards;
            }
        }
    }

}

@keyframes jumpUp {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes throwBall {
    0% {
        transform: translate(0px, 0px) rotate(0deg);
        scale: 1;
    }

    14% {
        transform: translate(0px, -40px) rotate(20deg);
        scale: 1;
    }

    28% {
        transform: translate(0px, -60px) rotate(40deg);
        scale: .9;
    }

    42% {
        transform: translate(10px, -80px) rotate(60deg);
        scale: .9;
    }

    57% {
        transform: translate(35px, -100px) rotate(90deg);
        scale: .8;
    }

    71% {
        transform: translate(55px, -120px) rotate(120deg);
        scale: .8;
    }

    100% {
        transform: translate(75px, -90px) rotate(360deg);
        scale: .8;
    }
}

@keyframes catchAnimation {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(0.5);
        opacity: 0.5;
    }

    100% {
        transform: scale(0);
        opacity: 0;
    }
}

@keyframes upDown {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-3px);
    }
    100% {
        transform: translateY(0);
    }
}

@keyframes twitch {
  0%, 20% {
    transform: translate(75px, -90px);
    scale: .8;
  }
  25% {
    transform: translate(72px, -90px) rotate(-3deg);
  }
  50% {
    transform: translate(78px, -90px) rotate(3deg);
  }
  75% {
    transform: translate(72px, -90px) rotate(-3deg);
  }
  80%, 100% {
    transform: translate(75px, -90px);
    scale: .8;
  }
}

@keyframes open {
  0% {
    opacity: 1;
    scale: .8;
    transform: translate(75px, -90px);
  }

  100% {
    opacity: 0;
    scale: .8;
    transform: translate(75px, -90px);
  }
}

@keyframes getOutAnimation {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(0.5);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>