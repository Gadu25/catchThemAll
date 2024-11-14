<template>
    <div class="main-container w-full" :class="isClose ? 'w-screen overflow-hidden h-screen' : ''">
        <div :class="!isClose ? 'is-open' : ''"
            class="custom-main bg-lightBackground dark:bg-darkBackground min-h-screen text-lightText dark:text-darkText"
            @mousemove="handleMouseMove" :style="pokeBallStyle">
            <Navbar :isClose="isClose" />
            <div class="custom-circle" :class="!isClose ? 'is-open' : ''" @click="isClose = !isClose"
                @mousemove="resetTilt">
                <div class="inner-circle" :class="!isClose ? 'is-open' : ''"></div>
            </div>
            <NuxtPage v-if="pageShow" />
            <Foot :isClose="isClose" />
        </div>
    </div>
</template>

<script>
import Navbar from '~/components/navbar.vue'
import Foot from '~/components/footer.vue';
export default {
    components: { Navbar, Foot },
    data() {
        return {
            isClose: true,
            rotationX: 0,
            rotationY: 0,
            pageShow: false
        }
    },
    computed: {
        pokeBallStyle() {
            return {
                transform: `rotateX(${this.rotationX}deg) rotateY(${this.rotationY}deg)`,
            };
        },
    },
    methods: {
        handleMouseMove(event) {
            if (this.isClose) {
                const { clientX, clientY, currentTarget } = event;
                const { left, top, width, height } = currentTarget.getBoundingClientRect();

                const x = (clientX - left) / width - 0.5;
                const y = (clientY - top) / height - 0.5;

                this.rotationX = y * 25;
                this.rotationY = x * 25;
            }
        },
        async showPage(){
            await this.delay(1000);
            this.pageShow = true
        },
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        resetTilt() {
            this.rotationX = 0;
            this.rotationY = 0;
        },
    },
    watch: {
        // Watching `pokemonId` for changes
        isClose(newVal, oldVal) {
            if(newVal == false){
                this.showPage()
            }else{
                this.pageShow = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$circleArea: 12vh;

.custom-main {
    scale: 1.5;
    transition: all .3s;

    &.is-open {
        scale: 1;
    }

    .custom-circle {
        position: absolute;
        z-index: 100;
        transition: all .3s linear;
        top: calc(50vh - $circleArea/2);
        left: calc(50vw - $circleArea/2);
        height: $circleArea;
        width: $circleArea;
        border-radius: 100%;
        border: 7px solid;
        background-color: #FFFFFF;
        opacity: 1;
        cursor: pointer;

        .inner-circle {

            transition: all .3s;
            position: absolute;
            height: $circleArea / 2;
            width: $circleArea / 2;
            border-radius: 100%;
            border: 3px solid;
            top: calc(50% - $circleArea / 4);
            left: calc(50% - $circleArea / 4);
            scale: 1;
            box-shadow: 0 0 20px;
            opacity: 1;

            &.is-open {
                opacity: 0;

            }
        }


        &.is-open {
            opacity: 0;
            z-index: 0;
            cursor: default;
        }

        &:hover {
            transform: scale(1.3);

            .inner-circle {
                scale: .8;
            }
        }

        &:active {
            transform: scale(1);
        }
    }
}
</style>
