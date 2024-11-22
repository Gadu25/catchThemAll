import { defineStore } from 'pinia';

export const useCaughtPokemonStore = defineStore('caughtPokemon', {
    state: () => ({
        caughtPokemons: []
    }),
    actions: {
        catchPokemon(pokemonName) {
            if (!this.caughtPokemons.includes(pokemonName)) {
                this.caughtPokemons.push(pokemonName);
            }
        },
        // Check if a Pokémon is already caught
        isCaught(pokemonName) {
            return this.caughtPokemons.includes(pokemonName);
        },
    },
    persist: {
        key: 'caught-pokemons',
        storage: process.client ? window.localStorage : null,
        paths: ['caughtPokemons']
    }
})