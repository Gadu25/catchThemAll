<template>
    <footer :class="isClose ? 'is-close':''" class="w-screen bg-pokeball-white">
    </footer>
</template>

<script setup>
    const props = defineProps({
        isClose: {
            type: Boolean,
            default: true
        }
    })
</script>

<style lang="scss">
    footer {
        position: absolute;
        bottom: 0;
        height: 0;
        transition: all 1.5s;
        &.is-close {
            height: 50vh;
        }
    }
</style>