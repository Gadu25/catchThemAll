<template>
    <nav :class="isClose ? 'is-close':''" class="w-100 flex justify-between items-center bg-pokeball-red shadow-xl border-b-2 border-b-slate-950 xl:px-32 lg:px-20 sm:px-10 px-4">
        <div>
            <NuxtLink to="/">
                <img class="h-10" src="~/assets/images/catchthemall.png" alt="catch them all icon"/>
            </NuxtLink>
        </div>
        <div class="custom-toggle pt-1.5" @click="toggleTheme" :class="themeStore.isDarkMode == true ? 'dark' : ''">
            <img class="poke-ball" src="~/assets/svg/pokeball.svg"/>
        </div>
    </nav>
</template>

<script setup>
    import { useThemeStore } from '@/store/theme'
    const themeStore = useThemeStore()

    const props = defineProps({
        isClose: {
            type: Boolean,
            default: true
        }
    })

    const toggleTheme = () => {
        themeStore.toggleTheme()
    }
</script>

<style lang="scss">
    $ballWidth: 25px;
    nav {
        z-index: 10;
        height: 60px;
        transition: all 1.5s;
        &.is-close{
            height: 50vh;
            border-bottom: 7px solid;
            border-radius: 0;
            img {
                opacity: 0;
            }
            .custom-toggle {
                opacity: 0;
            }
        }
        img {
            transition: all 3s;
        }
        .custom-toggle {
            position: relative;
            width: $ballWidth * 2;
            height: $ballWidth / 2 + 5;
            background-color: #3B4CCA;
            border-radius: ($ballWidth / 2 + 5) / 2;
            transition: background-color .3s ease, opacity 2s;
            border: 2px solid #333333; 
            cursor: pointer;
    
            .poke-ball {
                position: absolute;
                top: 0 - ($ballWidth / 4);
                width: $ballWidth;
                transition: transform .2s ease;
                animation: excessLeft .3s linear;
                animation-delay: .2s;
            }
    
            &.dark {
                background-color: #FFCB05;
                .poke-ball {
                    transform: translateX($ballWidth) rotate(360deg);
                    
                    animation: excessRight .2s linear;
                    animation-delay: .2s;
                }
    
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
