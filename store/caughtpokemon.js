import { defineStore } from 'pinia';

export const useCaughtPokemonStore = defineStore('caughtPokemon', {
    state: () => ({
        caughtPokemons: [],
        recentCatch: ''
    }),
    actions: {
        catchPokemon(pokemonName) {
            if (!this.caughtPokemons.includes(pokemonName)) {
                this.caughtPokemons.push(pokemonName);
                this.recentCatch = pokemonName
            }
        },
        isCaught(pokemonName) {
            return this.caughtPokemons.includes(pokemonName);
        },
        removeRecentCatch() {
            this.recentCatch = ''
        },
        getRecentCatch() {
            return this.recentCatch;
        },
        getCaughtPokemons(){
            return this.caughtPokemons;
        }
    },
    persist: {
        key: 'caught-pokemons',
        storage: process.client ? window.localStorage : null,
        paths: ['caughtPokemons', 'recentCatch']
    }
})