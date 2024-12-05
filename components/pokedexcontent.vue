<template>
    <div>
        <template v-if="active == 'About'">
            <p>{{ filteredFlavorText(species?.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text) }}</p>
            <table class="table-auto w-full leading-10 mt-2">
                <tbody>
                    <tr class="border-b">
                    <td>Pokedex No.</td>
                    <td>#{{ species.pokedex_numbers[0].entry_number }}</td>
                    </tr>
                    <tr class="border-b">
                    <td>Introduced</td>
                    <td>{{ species.generation.name }}</td>
                    </tr>
                    <tr class="border-b">
                    <td>Weight</td>
                    <td>{{ pokemon.weight / 10 }} kg</td>
                    </tr>
                    <tr class="border-b">
                    <td>Height</td>
                    <td>{{ pokemon.height / 10 }} m</td>
                    </tr>
                    <tr class="border-b">
                    <td>Abilities</td>
                    <td>
                        <template v-for="(ability, index) in pokemon.abilities">
                        <p>{{ index+1 }}. {{ ability.ability.name }}</p>
                        </template>
                    </td>
                    </tr>
                    <tr class="border-b">
                    <td>Shape</td>
                    <td>{{ species.shape.name }}</td>
                    </tr>
                    <tr class="border-b">
                    <td>Color</td>
                    <td>{{ species.color.name }}</td>
                    </tr>
                </tbody>
            </table>
        </template>
        <template v-if="active == 'Stats'">
            <table class="table-auto w-full leading-10">
                <template v-for="stat in pokemon.stats">
                  <tr>
                    <td class=" px-2"><p class="first-letter:uppercase">{{ stat.stat.name }}</p></td>
                    <td class=" px-2">{{ stat.base_stat }}</td>
                    <td class="w-1/2 px-2">
                      <div class="w-full bg-gray-300 h-6 rounded-full w-full">
                        <div class="bg-blue-500 h-full rounded-full" :style="'width:'+getStatPercentage(stat.stat.name, stat.base_stat)+'%'"></div>
                      </div>
                    </td>
                    <td class="px-2">{{ getMinStat(stat.stat.name, stat.base_stat) }}</td>
                    <td class=" px-2">{{ getMaxStat(stat.stat.name, stat.base_stat) }}</td>
                  </tr>
                </template>
                <tr>
                  <td class=" px-2">TOTAL</td>
                  <td class=" px-2">{{ getTotalStat() }}</td>
                  <td class=" px-2"></td>
                  <td class="px-2">Min</td>
                  <td class=" px-2">Max</td>
                </tr>
              </table>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'PokedexContent',
        data() {
            return {

            }
        },
        methods: {
            filteredFlavorText(str){
                return str.replace(/\n/g, ' ').replace(/\f/g, ' ')
            },
            getTotalStat(){
                let total = 0
                for(let value of this.pokemon.stats){
                    total += value.base_stat
                }
                return total
            },
            getStatPercentage(name, value){
                let maxStat = (this.getMinStat(name, value) + this.getMaxStat(name, value)) / 2
                return (value/maxStat) * 100
            },
            getMinStat(name, value){
                if(name == 'hp') {
                    return Math.floor((value * 2 * 100) / 100) + 100 + 10;
                }else {
                    const min = Math.floor((value * 2 * 100) / 100) + 5;
                    return Math.floor(min * 0.9)
                }
            },
            getMaxStat(name, value){
                if(name == 'hp') {
                    return value * 2 + 204
                }else {
                    return Math.floor((value * 2 +99) * 1.1)
                }
            },
        },
        computed: {
            active(){
                return this.modelValue.find(entry => entry.isActive == true).name
            }
        },
        props: {
            modelValue: {
                type: Array,
                default: []
            },
            pokemon: {
                type: Object,
                default: {}
            },
            species: {
                type: Object,
                default: {}
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>