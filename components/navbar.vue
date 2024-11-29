<template>
    <nav :class="isClose ? 'is-close':''" class="w-100 sticky top-0 flex justify-between items-center bg-pokeball-red dark:bg-pokeball-blue shadow-xl border-b-2 border-b-slate-950 xl:px-32 lg:px-20 sm:px-10 px-4">
        <div v-if="state.isDarkMode" class="stripe-left"></div>
        <div v-if="state.isDarkMode" class="stripe-right"></div>
        <template v-if="!isClose">
            <NuxtLink to="/">
                <img class="h-10" src="~/assets/images/catchthemall.png" alt="catch them all icon"/>
            </NuxtLink>
            <div class="custom-toggle pt-1.5" @click="toggleTheme" :class="state.isDarkMode ? 'dark' : ''">
                <img class="poke-ball" src="~/assets/svg/pokeball.svg"/>
            </div>
        </template>
    </nav>
</template>

<script setup>
    import { useThemeStore } from '@/store/theme'
    const themeStore = useThemeStore()

    const state = reactive({
        isDarkMode: false,
        toggleHelp: false
    });

    const props = defineProps({
        isClose: {
            type: Boolean,
            default: true
        }
    })

    const toggleTheme = () => {
        themeStore.toggleTheme()
        state.isDarkMode = themeStore.isDarkMode
    }

    onBeforeMount(() => {
        themeStore.initializeTheme()
        state.isDarkMode = themeStore.isDarkMode
        console.log(state.isDarkMode    )
    })

</script>

<style lang="scss">
    $ballWidth: 25px;
    nav {
        z-index: 10;
        height: 60px;
        transition: all 1.5s;
        .stripe-left{
            display: none;
        }
        .stripe-right{
            display: none;
        }
        &.is-close{
            height: 50vh;
            border-bottom: 7px solid #333333;
            border-radius: 0;

            .stripe-left {
                display: block;
                position: absolute;
                height: 30vh;
                width: 10vw;
                background-color: #D32F2F;
                top: 10vh;
                left: 25vw;
                border-radius: 25px;
                transform: skew(15deg, 15deg);
                border: 5px solid #333333;
            }
            .stripe-right {
                display: block;
                position: absolute;
                height: 30vh;
                width: 10vw;
                background-color: #D32F2F;
                top: 10vh;
                left: 65vw;
                border-radius: 25px;
                transform: skew(345deg, 345deg);
                border: 5px solid #333333;
            }

            @media screen and (max-width: 768px) {
                .stripe-left {
                    top: 5vh;
                    left: 8vw;
                }
                .stripe-right {
                    top: 5vh;
                    left: 82vw;
                }
            }

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
