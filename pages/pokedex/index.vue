<template>
    <div class="py-4 xl:px-32 lg:px-20 sm:px-10 px-4">
        <div class="flex justify-start items-center">
            <img class="w-16" src="~/assets/images/pokedex.png">
            <h2 class="font-extrabold text-2xl lg:text-5xl ms-2">Pokedex</h2>
            <!-- <Searchbar class="mx-6"/>
            <div class="rounded-full border py-2 px-3 cursor-pointer hover:bg-pokeball-red dark:hover:bg-pokeball-blue hover:text-slate-50">
                <i class="fa-solid fa-filter"></i>
            </div> -->
        </div>
        <PokedexSwipping/>
    </div>
</template>

<script>
    import Searchbar from '~/components/searchbar.vue';
    import PokedexSwipping from '~/components/pokedexswipping.vue';
    export default {
        name: 'Pokedex',
        components: { PokedexSwipping, Searchbar }
    }
</script>

<style lang="scss" scoped>

</style>