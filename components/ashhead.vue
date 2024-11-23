<template>
    <div class="flex justify-start items-center cursor-pointer" @click="changePhrase()">
        <div>
            <img class="w-24 pe-4" src="~/assets/images/ash.png" alt="ash-image" />
        </div>
        <div class="dialogue-box border-4 border-card-dark dark:border-card-light">
            <div class="text">{{ currentPhrase }}</div>
        </div>
    </div>
</template>

<script>
import idlePhrases from '~/data/idlePhrases';
import failedCatchPhrases from '~/data/failedCatchPhrases';

export default {
    name: 'AshHead',
    data() {
        return {
            idlePhrases: idlePhrases,
            failedCatchPhrases: failedCatchPhrases,
            currentPhrase: "Hello everone I'm Ash Ketchum"
        }
    },
    methods: {
        getRandomIndex(max, exclude) {
            let index;
            do {
                index = Math.floor(Math.random() * max);
            } while (index === exclude); // Ensure it's not the same as the previous one
            return index;
        },
        startPhraseRotation() {
            let previousIndex = 0;
            return setInterval(() => {
                const newIndex = this.getRandomIndex(this.idlePhrases.length, this.currentPhrase);
                this.currentPhrase = this.idlePhrases[newIndex];
                previousIndex = newIndex;
            }, 12000); 
        },
        async failedToCatch(){
            clearInterval(this.intervalId);
            const newIndex = this.getRandomIndex(this.failedCatchPhrases.length, -1);
            this.currentPhrase = this.failedCatchPhrases[newIndex];
            this.intervalId = this.startPhraseRotation()
        },
        async changePhrase(){
            clearInterval(this.intervalId);
            const newIndex = this.getRandomIndex(this.idlePhrases.length, -1);
            this.currentPhrase = this.idlePhrases[newIndex];
            this.intervalId = this.startPhraseRotation()
        },
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

    },
    mounted() {
        this.intervalId = this.startPhraseRotation()
    },
    beforeUnmount() {
        clearInterval(this.intervalId);
    }
}
</script>

<style lang="scss">
$box-width: 100%; // Width of the dialogue box
$box-height: auto; // Height of the dialogue box
$box-bg-color: rgba(0, 0, 0, 0.7); // Background color with transparency
$box-border-color: #fff; // Border color (white)
$box-border-width: 4px; // Thickness of the border
$text-color: #fff; // Text color (white)
$font-family: 'Press Start 2P', monospace; // Pixel/retro font (Google Fonts)
$typing-speed: 0.05s; // Typing speed for the effect

// The dialogue box styling
.dialogue-box {
    width: $box-width;
    height: $box-height;
    background-color: $box-bg-color;
    // border: $box-border-width solid $box-border-color;
    padding: 10px;
    font-family: $font-family;
    color: $text-color;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    // opacity: 0;
    border-radius: 8px;

    &.done {}

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
</style>
