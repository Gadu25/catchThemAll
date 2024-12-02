<template>
    <div class="fixed bottom-12 right-5 md:bottom-10 md:right-10">
        <div class="fab-wrapper" @click="showMenu=!showMenu" :class="{'shown':showMenu}">
            <!-- <img class="fab-bg" src="~/assets/images/fabBg.svg" alt="fab-icon-bg"/> -->
             <div class="fab-bg"></div>
            <img class="fab-head" src="~/assets/images/ash.svg" alt="ash-head"/>
            <div class="menu">
                <template v-for="(item, index) in list">
                    <div class="menu-item" :style="showMenu ? getCustomDistance(index): ''" @click="item.action">
                        <div class="circle">
                            <img :src="item.icon" :alt="item.title+'-icon'"
                        </div>
                        <span><small>{{ item.title }}</small></span>
                    </div>
                </template>
            </div>
        </div>
        <!-- <div class="absolute top-0 m-2 bg-pink">
            <AshHead/>
        </div> -->
        <div v-if="toggleHelp" @click="toggleHelp = false" class="modal-overlay w-screen h-screen overflow-hidden bg-slate-950 bg-opacity-80 fixed top-0 left-0 flex justify-center items-center z-50">
            <div class="modal-body w-11/12 lg:w-1/2 min-h-32 bg-card-light dark:bg-card-dark bg-opacity-100 rounded-lg border p-4">
                <h3 class="text-4xl font-bold">Let's go and Catch 'em All!</h3>
                <div class="lg:flex-row flex flex-col-reverse space-between mt-4">
                    <div class="leading-8 max-h-7xl max-h-[40vh] overflow-auto px-2">
                        <p>Hi there! I’m Professor Oak, your guide to this exciting adventure. Let me show you how to get started:</p>
                        
                        <div class="my-2">
                            <h1 class="text-xl mb-1"><strong>Main Page</strong></h1>
                            <ul class="ms-2">
                                <li><i>Click on Pokémon:</i> Try your luck catching Pokémon by clicking on them!</li>
                                <li><i>Daily Pokéballs:</i> I’ll provide you with 10 Pokéballs every day to help you explore and catch Pokémon. Use them wisely!</li>
                            </ul>
                        </div>

                        <div class="my-2">
                            <h1 class="text-xl mb-1"><strong>Pokédex Page</strong></h1>
                            <ul class="ms-2">
                                <li><p><i>Your Pokémon Collection:</i> Browse all the Pokémon you’ve successfully caught here.</p></li>
                            </ul>
                            
                        </div>

                        <!-- Closing Note -->
                         <p>Can you catch them all?</p>
                        <p>Ready to begin your journey? Adventure awaits—good luck, Trainer!</p>
                    </div>
                    <div class="w-3/4 flex justify-center items-center">
                        <img src="~/assets/images/profOak.png" alt="prof-oak-image"/>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import pokedex from '~/assets/images/pokedex.png'
    import unown from '~/assets/images/unown.png'
    import AshHead from './ashhead.vue';

    export default {
        name: 'Fab',
        components: {AshHead},
        data() {
            return {
                showMenu: false,
                toggleHelp: false,
                list: [
                    {
                        title: 'Help',
                        icon: unown,
                        action: () => this.toggleHelp = true
                    },
                    {
                        title: 'Pokedex',
                        icon: pokedex,
                        action: () => this.navigate('/pokedex')
                    }
                ]
            }
        },
        methods: {
            getCustomDistance(index){
                return 'top: -'+(index*90)+'px';
            },
            navigate(location) {
                return navigateTo(location)
            }

        }
    }
</script>

<style lang="scss" scoped>
    $fabWidth: 70px;
    .fab-wrapper {
        width: $fabWidth;
        height: $fabWidth;
        position: relative;
        z-index: 11;
        border-radius: 100%;
        transition: all .2s;
        cursor: pointer;

        .fab-bg{
            position: absolute;
            width: $fabWidth;
            height: $fabWidth;
            top: 0;
            left: 0;
            z-index: 9;
            background: linear-gradient(to bottom, #D32F2F 0 45%, #000000 45% 55%, #ffffff 55% 100%); 
            border-radius: 100%;
        }

        .fab-head {
            position: absolute;
            width: $fabWidth - 26px;
            top: 13px;
            left: 13px;
            z-index: 10;
            border-radius: 100%;
        }

        &:hover {
            // transform: scale(1.1);
            box-shadow: 0 0 10px 4px rgba(211, 47, 47, 0.8), 
                        0 0 20px 5px rgba(211, 47, 47, 0.6),
                        0 0 30px 10px rgba(211, 47, 47, 0.4);
        }
        
        &:active {
            transform: scale(.9);
        }

        .menu {
            position: absolute;
            top: ($fabWidth / 3) / 2;
            left: ($fabWidth / 3) / 2;
            transition: all .2s;
            z-index: 5;
            .menu-item {
                position: absolute;
                display: flex;
                flex-direction: column;
                justify-content: center;
                transition: all .3s;
                .circle {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: calc($fabWidth / 1.5);
                    height: calc($fabWidth / 1.5);
                    border-radius: 100%;
                }
                span {
                    text-align: center;
                    opacity: 0;
                }
            }
        }

        &.shown {
            box-shadow: 0 0 10px 4px rgba(13, 71, 161, 0.8), 
            0 0 20px 5px rgba(13, 71, 161, 0.6), 
            0 0 30px 10px rgba(13, 71, 161, 0.4);

            .fab-bg {
                animation: spin 2s linear infinite;
            }

            .menu {
                position: absolute;
                top: -100px;
                left: ($fabWidth / 3) / 2;

                .menu-item {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .circle {
                        width: calc($fabWidth / 1.5);
                        height: calc($fabWidth / 1.5);
                        border-radius: 100%;
                        // background-color: pink;
                    }
                    span {
                        text-align: center;
                        opacity: 0;
                    }
                    &:hover {
                        transform: scale(1.1);
                        
                        span {
                            opacity: 1;
                        }
                    }
                }
            }
        }

    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(160deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>