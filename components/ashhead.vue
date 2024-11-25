<template>
    <div class="flex justify-start items-center cursor-pointer" @click="changePhrase()">
        <div>
            <img class="w-24 pe-4" src="~/assets/images/ash.png" alt="ash-image" />
        </div>
        <div class="dialogue-box border-4 border-card-dark dark:border-card-light">
            <div class="text">{{ displayedPhrase }}</div>
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
            currentPhrase: "Hello Trainer! I'm Ash Ketchum",
            displayedPhrase: "",
            intervalId: null,
            typingSpeed: 30 // Typing speed in ms
        };
    },
    methods: {
        getRandomIndex(max, exclude) {
            let index;
            do {
                index = Math.floor(Math.random() * max);
            } while (index === exclude);
            return index;
        },
        async typePhrase(phrase) {
            this.displayedPhrase = ""; // Reset displayed phrase
            for (let i = 0; i < phrase.length; i++) {
                this.displayedPhrase += phrase[i];
                await this.delay(this.typingSpeed); // Wait for the typing effect
            }
        },
        async changePhrase() {
            clearInterval(this.intervalId);
            const newIndex = this.getRandomIndex(this.idlePhrases.length, -1);
            this.currentPhrase = this.idlePhrases[newIndex];
            await this.typePhrase(this.currentPhrase); // Animate the new phrase
            this.intervalId = this.startPhraseRotation();
        },
        async failedToCatch() {
            clearInterval(this.intervalId);
            const newIndex = this.getRandomIndex(this.failedCatchPhrases.length, -1);
            this.currentPhrase = this.failedCatchPhrases[newIndex];
            await this.typePhrase(this.currentPhrase); // Animate the failed catch phrase
            this.intervalId = this.startPhraseRotation();
        },
        startPhraseRotation() {
            return setInterval(() => {
                const newIndex = this.getRandomIndex(this.idlePhrases.length, -1);
                this.currentPhrase = this.idlePhrases[newIndex];
                this.typePhrase(this.currentPhrase); // Animate during rotation
            }, 12000);
        },
        delay(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
    },
    async mounted() {
        await this.typePhrase(this.currentPhrase); // Type the initial phrase
        this.intervalId = this.startPhraseRotation();
    },
    beforeUnmount() {
        clearInterval(this.intervalId);
    }
};
</script>

<style lang="scss">
$box-width: 100%;
$box-height: auto;
$box-bg-color: rgba(0, 0, 0, 0.7);
$box-border-color: #fff; 
$box-border-width: 4px; 
$text-color: #fff; 
$font-family: 'Press Start 2P', monospace;

.dialogue-box {
    width: $box-width;
    height: $box-height;
    background-color: $box-bg-color;
    padding: 10px;
    font-family: $font-family;
    color: $text-color;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 8px;

    .text {
        font-size: 16px;
        line-height: 1.5;
        position: relative;

        &::after {
            content: "";
            display: inline-block;
            width: 1ch;
            height: 1em;
            background-color: $text-color;
            animation: blink 1s steps(2, start) infinite;
        }
    }

    @keyframes blink {
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
}
</style>
