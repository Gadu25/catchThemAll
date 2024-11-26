<template>
    <div class="card-container w-full min-h-72 relative overflow-hidden bg-pokeball-red dark:bg-pokeball-blue">
        <div class="circle-highlight flex justify-center items-center bg-card-light dark:bg-card-dark">
            <p>Hello pika pika ⚡</p>
        </div>
        <div class="card-desc">
            <h4 class="font-bold text-5xl">Pikachu</h4>
            <PokemonTypeList :pokemonTypes="mockTypes" :isCentered="false" :isShowTitle="false"/>
            <div class="my-2">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim consequatur iste ab obcaecati dolorum labore dolores cumque magni. Recusandae quia explicabo vitae sint cumque ea doloribus quod quae dolore nihil?</p>
            </div>
        </div>
        <div class="absolute top-0 right-0 p-2">
            <p class="text-3xl">#18</p>
        </div>
        <div class="absolute bottom-0 right-0 p-2 flex justify-end">
            <div class="w-4 h-4 bg rounded-lg bg-fire-red ms-2 border-2"></div>
            <div class="w-4 h-4 bg rounded-lg bg-grass-green ms-2 border-2"></div>
            <div class="w-4 h-4 bg rounded-lg bg-electric-yellow ms-2 border-2"></div>
        </div>
    </div>
</template>

<script>
    import PokemonTypeList from '~/layouts/pokemontypelist.vue';
    export default {
        name: 'PokedexCard',
        components: { PokemonTypeList },
        data() {
            return {
                mockTypes: [
                    {
                        name: 'grass'
                    },
                    {
                        name: 'water'
                    } 
                ]
            }
        },
        props: {}
    }
</script>

<style lang="scss" scoped>
    .card-container {
        border: 8px solid #333333;
        border-radius: 20px;
        z-index: 1;
        .circle-highlight {
            position: absolute;
            top: calc(-150%/6);
            left: 0;
            height: 150%;
            border-radius: 100%;
            aspect-ratio: 1 / 1;
            outline: 48px solid #333333;
            z-index: 2;
        }
        .card-desc {
            padding: 15px;
            margin-left: 500px;
        }
    }
</style>