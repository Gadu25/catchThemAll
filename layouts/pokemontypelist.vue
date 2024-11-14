<template>
    <div>
        <h3 class="text-lg font-bold">Types</h3>
        <div class="flex justify-center flex-wrap">
            <template v-for="typeClass in pokemonTypeClass">
                <div class="mx-3 my-1">
                    <PokemonTypeCard v-if="typeClass.name != 'unknown'"
                    :name="typeClass.name" 
                    :color="typeClass.color" 
                    :badge="typeClass.icon"/>
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
                pokemonTypeClass: pokemonTypeClass
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>