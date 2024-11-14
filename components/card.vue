<template>
    <div v-if="!loading" class="card w-full p-5 border rounded-lg flex justify-between cursor-pointer hover:shadow bg-card-light dark:bg-card-dark"
        :class="cardClicked ? 'clicked' : ''" @click="clickCard(pokemonData.id)">
        <img class="pokemon w-3/6" :src="pokemonImage" :alt="name + '-image'" />
        <div>
            <p><strong>{{ name }}</strong></p>
            <div class="py-2">
                <template v-for="type in pokemonTypes">
                    <div :class="pokemonColor(type.type.name)" class="p-1 my-1 rounded text-white text-center">
                        <small>{{ type.type.name }}</small>
                    </div>
                </template>
            </div>
        </div>
        <div class="pokeball"><img src='~/assets/svg/pokeball.svg' alt='pokeball' /></div>
    </div>
    <div v-else class="p-5 border rounded-lg flex justify-center w-full h-56 align-center">
        <div class="m-20">
            <i class="fa-solid fa-spinner fa-spin"></i>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Card',
    data() {
        return {
            colors: [
                { "name": "normal", "color": "bg-gray-400" },
                { "name": "fighting", "color": "bg-red-700" },
                { "name": "flying", "color": "bg-blue-300" },
                { "name": "poison", "color": "bg-purple-500" },
                { "name": "ground", "color": "bg-yellow-700" },
                { "name": "rock", "color": "bg-gray-600" },
                { "name": "bug", "color": "bg-green-500" },
                { "name": "ghost", "color": "bg-indigo-700" },
                { "name": "steel", "color": "bg-gray-500" },
                { "name": "fire", "color": "bg-red-500" },
                { "name": "water", "color": "bg-blue-500" },
                { "name": "grass", "color": "bg-green-400" },
                { "name": "electric", "color": "bg-yellow-400" },
                { "name": "psychic", "color": "bg-pink-500" },
                { "name": "ice", "color": "bg-blue-200" },
                { "name": "dragon", "color": "bg-purple-600" },
                { "name": "dark", "color": "bg-gray-800" },
                { "name": "fairy", "color": "bg-pink-300" },
                { "name": "stellar", "color": "bg-indigo-400" },    
                { "name": "unknown", "color": "bg-gray-300" }
            ],
            loading: false,
            error: null,
            pokemonData: null,
            cardClicked: false,
        }
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
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        pokemonColor(typeName) {
            const colorObj = this.colors.find((color) => color.name === typeName);
            return colorObj ? colorObj.color : 'bg-gray-300';
        },
        async clickCard(id) {
            this.cardClicked = true
            await this.delay(1200);
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
            this.handleFetch()
        },
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