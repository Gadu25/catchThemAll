<template>
    <div>
        <div class="w-full flex justify-center items-center gap-4">
            <div v-if="prevData" @click="handleClick(prevData.id)" class="card relative p-4 flex-1 flex border rounded-md hover:font-bold justify-center items-center cursor-pointer hover:rounded-xl hover:shadow transition-all border-2" @mouseenter="(event) => handleMouseMove(event, '.prev')" @mouseleave="(event) => resetAnimation(event, '.prev')">
                <i class="fa fa-chevron-left fa-lg absolute left-0 m-2"></i>
                <div class="flex flex-col justify-center items-center">
                    <img class="prev transition-all" :src="prevData ? prevData.sprites.other['official-artwork'].front_default : '~/assets/images/pokemonEgg.webp'" alt="previous pokemon icon"/>
                    <p class="transition-all">{{ prevData?.name }}</p>
                </div>
            </div>
            <div v-if="nextData" @click="handleClick(nextData.id)" class="card relative p-4 flex-1 flex border rounded-md hover:font-bold justify-center items-center cursor-pointer hover:rounded-xl hover:shadow transition-all border-2" @mouseenter="(event) => handleMouseMove(event, '.next')" @mouseleave="(event) => resetAnimation(event, '.next')">
                <i class="fa fa-chevron-right fa-lg absolute right-0 me-2"></i>
                <div class="flex flex-col justify-center items-center">
                    <img class="next transition-all" :src="nextData ? nextData.sprites.other['official-artwork'].front_default : '~/assets/images/pokemonEgg.webp'" alt="previous pokemon icon"/>
                    <p class="transition-all">{{ nextData?.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import pokeapibaseurl from '~/utils/pokeapibaseurl';
    import axios from 'axios';

    const router = useRouter();

    let prevData = ref(null)
    let nextData = ref(null)


    const props = defineProps({
        prevPokemon: {
            default: '',
            type: String
        },
        nextPokemon: {
            default: '',
            type: String
        },
    })

    const handleMouseMove = (event, item) => {
        const card = event.currentTarget.querySelector(item);
        const data = item == '.prev' ? prevData.value : nextData.value
        card.src = data.sprites.other.showdown.front_default
    }

    const resetAnimation = (event, item) => {
        const card = event.currentTarget.querySelector(item);
        const data = item == '.prev' ? prevData.value : nextData.value
        card.src = data.sprites.other['official-artwork'].front_default
    }

    const handleClick = (id) => {
        router.push({ name: 'pokedex-id', params: { id } });
    }

    // watch(prevPokemon, (newVal, oldVal) => {
        
    // });

    // watch(nextPokemon, (newVal, oldVal) => {

    // });

    onMounted(() => {
        axios.get(pokeapibaseurl+'pokemon/'+props.prevPokemon).then(result => {
            prevData.value = result.data
        })
        axios.get(pokeapibaseurl+'pokemon/'+props.nextPokemon).then(result => {
            nextData.value = result.data
        })
    })
</script>

<style lang="scss" scoped>
.card {
    &:hover {
        img {
            height: 50px;
        }
    }
}
img {
    height: 40px;
}
</style>