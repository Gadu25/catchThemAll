<template>
    <div>
        <div :class="color" class="p-1 my-1 rounded text-white text-center shadow flex justify-between align-center">
            <img v-if="name != 'unknown'" class="h-7" :src="badge" :alt="name+'-badge'"/>
            <div class="mx-2">
                <small>{{ name }}</small>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PokemonTypeCard',
        props: {
            color: {
                type: String,
                default: 'bg-gray-300'
            },
            name: {
                type: String,
                default: 'unknown'
            },
            badge: {
                type: String,
                default: null
            }
        }
    }
</script>