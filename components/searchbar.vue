<template>
    <div>
        <input class="custom-search-bar" type="text" placeholder="Search a Pokemon"/>
    </div>
</template>

<script>
    export default {
        name: 'SearchBar'
    }
</script>

<style lang="scss" scoped>
    .custom-search-bar {
        width: 80vw;
        height: 40px;
        border-radius: 20px;
        padding: 0 20px;
    }
</style>