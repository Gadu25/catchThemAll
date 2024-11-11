<template>
    <div class="w-full m-2 p-5 border rounded-lg flex justify-between">
        <img class="w-3/6" :src="pokemonImage" :alt="name + '-image'" />
        <div>
            <p><strong>{{ name }}</strong></p>
            <div class="py-2">
                <template v-for="type in pokemonTypes">
                    <div :class="pokemonColor" class="p-1 my-1 rounded text-white text-center">
                        <small>{{ type.type.name }}</small>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
// import { usePokemonStore } from '~/store/pokemon';
// import { mapState, mapActions } from 'pinia';
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
                { "name": "stellar", "color": "bg-indigo-400" },  // Custom example for "stellar"
                { "name": "unknown", "color": "bg-gray-300" }
            ],
            loading: false,
            error: null,
            pokemonData: null
        }
    },
    computed: {
        pokemonImage() {
            return this.pokemonData?.sprites?.other['official-artwork']?.front_default;
        },
        pokemonTypes() {
            return this.pokemonData?.types
        },
        pokemonColor() {
            const typeName = this.pokemonData?.types?.[0]?.type?.name || 'unknown';
            const colorObj = this.colors.find((color) => color.name === typeName);
            return colorObj ? colorObj.color : 'bg-gray-300';
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
    }
}
</script>

<style lang="scss" scoped></style>