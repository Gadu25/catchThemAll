<template>
    <nav class="w-screen flex justify-center py-1.5">
        <!-- Other Navbar elements -->
        <div class="custom-toggle" @click="toggleTheme" 
        :class="themeStore.isDarkMode == true ? 'dark' : ''">
            <img class="poke-ball" src="~/assets/svg/pokeball.svg"/>
        </div>
    </nav>
</template>

<script setup>
import { useThemeStore } from '@/store/theme'
const themeStore = useThemeStore()

const toggleTheme = () => {
    themeStore.toggleTheme()
}
</script>

<style lang="scss">
    $ballWidth: 22px;
    .custom-toggle {
        position: relative;
        width: $ballWidth * 2;
        height: $ballWidth / 2 + 3;
        background-color: #3B4CCA;
        border-radius: ($ballWidth / 2 + 3) / 2;
        transition: all .3s;
        cursor: pointer;

        .poke-ball {
            position: absolute;
            top: 0 - ($ballWidth / 4);
            left: 0;
            width: $ballWidth;
            transition: transform .2s ease;
            animation: excessLeft .3s linear;
            animation-delay: .2s;
        }

        &.dark {
            background-color: #FFCB05;
            .poke-ball {
                transform: translateX($ballWidth) rotate(360deg);
                
                animation: excessRight .3s linear;
                animation-delay: .2s;
            }

        }
    }

    @keyframes excessRight {
        0% {
            left: $ballWidth;
            transform: rotate(0deg);
        }
        50% {
            left: $ballWidth;
            transform: rotate(30deg);
        }
        100% {
            left: $ballWidth;
            transform: rotate(-30deg);
        }
    }

    @keyframes excessLeft {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(-30deg);
        }
        100% {
            transform: rotate(30deg);
        }
    }

    @keyframes shake {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(10deg);
        }
        50% {
            transform: rotate(0deg);
        }
        75% {
            transform: rotate(-10deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
</style>