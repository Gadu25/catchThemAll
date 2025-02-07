<template>
    <div>
        <div class="stack-container" ref="stackContainer" @wheel="handleMouseWheel" @touchstart="startTouch"
            @touchmove="handleTouchMove" @touchend="endTouch">
            <PokedexCard class="w-full lg:10/12 xl:w-9/12" v-for="(card, index) in caughtPokemons" :key="index"
                :class="['card', { 'is-active': index === activeIndex }]" :style="getCardStyle(index)"
                :pokemonName='card' :isActive="index === activeIndex"
                />
        </div>
    </div>
</template>

<script>
import swipeAudio from '~/assets/audio/swipe.mp3';
import PokedexCard from "./pokedexcard.vue";
import { useCaughtPokemonStore } from '~/store/caughtpokemon';

export default {
    name: "PokedexSwiping",
    components: { PokedexCard },
    data() {
        return {
            activeIndex: 1, // Start with the second card as active
            startTouchY: 0, // Starting touch position,
            swipeAudio: swipeAudio
        };
    },
    computed: {
        pokemonStore() {
            return useCaughtPokemonStore();
        },
        caughtPokemons() {
            return this.pokemonStore.getCaughtPokemons()
        }
    },
    methods: {
        getCardStyle(index) {
            const offset = index - this.activeIndex;
            const zIndex = 100 - Math.abs(offset); // Higher z-index for the active card
            const scale = 1 - Math.abs(offset) * 0.1;
            const translateY = offset * 90;
            const opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.4);
            const isVisible = Math.abs(offset) < 3;

            return {
                transform: `translateY(${translateY}px) scale(${scale})`,
                zIndex,
                opacity,
                display: isVisible ? 'block' : 'none'
            };
        },
        handleKeyDown(event) {
            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                this.nextCard();
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                this.prevCard();
            }
        },
        handleMouseWheel(event) {
            // Handle mouse wheel scroll to move the stack
            if (event.deltaY > 0) {
                this.nextCard();
            } else {
                this.prevCard();
            }
        },
        startTouch(event) {
            // Record touch start position
            this.startTouchY = event.touches[0].clientY;
        },
        handleTouchMove(event) {
            // Prevent default scrolling behavior
            event.preventDefault();

            const touchMoveY = event.touches[0].clientY;
            const deltaY = this.startTouchY - touchMoveY;

            if (deltaY > 50) {
                this.nextCard();
                this.startTouchY = touchMoveY; // reset touch start
            } else if (deltaY < -50) {
                this.prevCard();
                this.startTouchY = touchMoveY; // reset touch start
            }
        },
        endTouch() {
            // Handle touch end (optional, if needed for cleanup)
        },
        nextCard() {
            if (this.activeIndex < this.caughtPokemons.length - 1) {
                const audio = new Audio(this.swipeAudio);
                audio.volume = 0.5;
                audio.play();
                this.activeIndex++;
            }
        },
        prevCard() {
            if (this.activeIndex > 0) {
                const audio = new Audio(this.swipeAudio);
                audio.volume = 0.5;
                audio.play();
                this.activeIndex--;
            }
        },
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeyDown);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
};
</script>

<style lang="scss" scoped>
.stack-container {
    position: relative;
    width: 100%;
    height: 70vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* Stack the cards vertically */

    .card {
        position: absolute;
        // width: 100%;
        height: 280px;
        transition: transform 0.3s, opacity 0.3s, z-index 0.3s;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        &.is-active {
            transform: translateY(0) scale(1.05);
            z-index: 10;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
    }
}

.controls {
    margin-top: 20px;
    text-align: center;

    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        margin: 0 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #0056b3;
        }

        &:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
    }
}
</style>