<template>
    <div>
        <div class="w-full flex justify-between overflow-auto">
            <template v-for="(item, index) in menu">
                <div class="border-b-2 w-full text-center pt-3 pb-4 hover:text-pokeball-blue cursor-pointer menu-item" :class="{'border-b-pokeball-blue': item.isActive, 'px-2': index !== 0 && index !== menu.length - 1}" @click="changeActive(index)">{{ item.name }}</div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PokeDexNav',
        data() {
            return {
                menu: []
            }
        },
        methods: {
            changeActive(index){
                const currActive = this.menu.find((item) => item.isActive === true);
                let currIndex = this.menu.indexOf(currActive)
                this.menu[currIndex].isActive = false
                this.menu[index].isActive = true
                this.$emit('update:modelValue', this.menu); // Emit the update event
            },
            delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            },
        },
        mounted(){
            this.menu = this.modelValue
        },
        props: {
            modelValue: {
                type: Array,
                default: []
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu-item {
        transition: all .2s;
    }
</style>