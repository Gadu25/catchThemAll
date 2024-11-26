<template>
    <div class="py-4 xl:px-32 lg:px-20 sm:px-10 px-4">
        <div class="flex justify-start">
            <h2 class="font-extrabold text-5xl">Pokedex</h2>
        </div>
        <PokedexSwipping/>
    </div>
</template>

<script>
    import PokedexSwipping from '~/components/pokedexswipping.vue';
    export default {
        name: 'Pokedex',
        components: { PokedexSwipping }
    }
</script>

<style lang="scss" scoped>

</style>