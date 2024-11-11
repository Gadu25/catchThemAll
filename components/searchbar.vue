<template>
        <label class="relative block w-full">
            <span class="sr-only">Search</span>
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input class="custom-search-bar placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
        </label>
</template>

<script>
    export default {
        name: 'SearchBar'
    }
</script>

<style lang="scss" scoped>
    .custom-search-bar {
        width: 100%;
        height: 40px;
        border-radius: 20px;
        padding: 0 20px;
    }
</style>