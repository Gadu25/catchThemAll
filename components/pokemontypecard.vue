<template>
    <div>
        <div :style="'background-color:'+color" class="custom-type p-1 my-1 rounded text-white text-center shadow-md flex justify-between align-center" :class="willJumpOnHover ? 'hover-animation':''">
            <img v-if="name != 'unknown'" class="h-7" :src="badge" :alt="name+'-badge'"/>
            <div class="mx-2">
                <small>{{ name }}</small>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PokemonTypeCard',
        props: {
            color: {
                type: String,
                default: '#D1D5DB'
            },
            name: {
                type: String,
                default: 'unknown'
            },
            badge: { 
                type: String,
                default: null
            },
            willJumpOnHover: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .custom-type {
        cursor: pointer;
        &.hover-animation {
            &:hover {
                animation: jumpUp 0.2s linear;
            }
        }
    }

    @keyframes jumpUp {
        0% {
            transform: translateY(0);
        }

        50% {
            transform: translateY(-8px);
        }

        100% {
            transform: translateY(0);
        }
    }
</style>