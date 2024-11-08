<template>
    <div>
        <div class="custom-index flex justify-center py-4">
            <SearchBar/>
        </div>
    </div>
</template>

<script>
import SearchBar from '~/components/searchbar.vue'

export default {
    name: 'Home',
    components: { SearchBar },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
    },
    props: {
        isClose: {
            default: true,
            value: Boolean
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>