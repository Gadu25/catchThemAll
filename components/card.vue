<template>
    <div class="card w-full h-full p-5 border rounded-lg flex justify-between cursor-pointer hover:shadow bg-card-light dark:bg-card-dark"
        :class="cardClicked ? 'clicked' : ''" @click="clickCard(pokemonData.name)">
        <img v-if="!imageIsLoaded" class="pokemon-egg w-3/6 animate-upDown" src="~/assets/images/pokemonEgg.png" :alt="name + '-image'" />
        <img v-if="!loading" @load="imageLoaded" ref="cardImage" class="pokemon w-3/6" :src="pokemonImage" :alt="name + '-image'" :class="!imageIsLoaded ? 'position-absolute':''" />
        <div v-if="imageIsLoaded">
            <p class="first-letter:uppercase"><strong>{{ name }}</strong></p>
            <div v-if="!loading" class="py-2">
                <template v-for="type in pokemonTypes">
                    <PokemonTypeCard :name="type.type.name" :color="pokemonColor(type.type.name)" :badge="pokemonTypeBadge(type.type.name)"/>
                </template>
            </div>
        </div>
        <div class="pokeball"><img src='~/assets/svg/pokeball.svg' alt='pokeball' /></div>
    </div>
</template>

<script>
import axios from 'axios';
import pokemonTypeClass from '~/data/pokemonTypeClass';
import PokemonTypeCard from '~/components/pokemontypecard.vue'

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
        }
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
        },
        async clickCard(id) {
            this.cardClicked = true
            await this.delay(950);
            this.$router.push({ name: 'pokemon-id', params: { id } });
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
            console.log(newVal)
            this.$nextTick(() => {
                const image = this.$refs.cardImage;
                console.log(image)

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
    }
    .pokemon-egg {
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
</style>