<template>
    <div>
        <h3 v-if="isShowTitle" class="text-lg font-bold">Types</h3>
        <div class="flex justify-start flex-wrap">
            <template v-for="typeClass in pokemonTypes">
                <div class="me-3 my-1">
                    <PokemonTypeCard 
                        v-if="typeClass.name != 'unknown'"
                        :name="typeClass.name ? typeClass.name : typeClass.type.name" 
                        :color="pokemonColor(typeClass.name ? typeClass.name : typeClass.type.name)" 
                        :badge="pokemonTypeBadge(typeClass.name ? typeClass.name : typeClass.type.name)"
                    />
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import pokemonTypeClass from '~/data/pokemonTypeClass';
    import PokemonTypeCard from '~/components/pokemontypecard.vue';

    export default {
        name: 'PokemonTypeList',
        components: { PokemonTypeCard },
        data(){
            return {
                colors: pokemonTypeClass
            }
        },
        methods: {
            pokemonColor(typeName) {
                const colorObj = this.colors.find((color) => color.name === typeName);
                return colorObj ? colorObj.color : 'bg-gray-300';
            },
            pokemonTypeBadge(typeName){
                const typeObj = this.colors.find((color) => color.name === typeName);
                return typeObj.icon;
            },
        },
        props: {
            pokemonTypes: {
                type: Array,
                default: pokemonTypeClass
            },
            isShowTitle: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>