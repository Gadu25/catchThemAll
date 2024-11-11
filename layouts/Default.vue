<template>
    <div class="main-container w-full" :class="isClose? 'w-screen overflow-hidden h-screen':''">
        <div :class="isClose ? 'custom-main' : ''"
            class="bg-lightBackground dark:bg-darkBackground min-h-screen text-lightText dark:text-darkText"
            @mousemove="handleMouseMove" :style="pokeBallStyle">
            <Navbar :isClose="isClose"/>
            <div class="custom-circle" :class="isClose ? 'is-close' : ''" @click="isClose = !isClose"
                @mousemove="resetTilt">
                <div class="inner-circle" :class="isClose ? 'is-close' : ''"></div>
            </div>
            <div class="main-page" :class="isClose ? 'is-close':''">
                <NuxtPage />
            </div>
            <Footer :isClose="isClose"/>
        </div>
    </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/footer.vue';
export default {
    components: { Navbar, Footer },
    data() {
        return {
            isClose: true,
            rotationX: 0,
            rotationY: 0,
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
        resetTilt() {
            this.rotationX = 0;
            this.rotationY = 0;
        },
    }
}
</script>

<style lang="scss" scoped>
$circleArea: 12vh;
.custom-main {
    scale: 1.5;
    transition: all .1s;

    .custom-circle {
        position: absolute;
        z-index: 11;
        transition: transform .2s linear;
        top: calc(50vh - $circleArea/2);
        left: calc(50vw - $circleArea/2);
        height: $circleArea;
        width: $circleArea;
        border-radius: 100%;
        border: 7px solid;
        background-color: #FFFFFF;
        opacity: 0;
        cursor: pointer;

        .inner-circle {
            opacity: 0;
            scale: 4;
            transition: all .2s;

            &.is-close {
                position: absolute;
                height: $circleArea / 2;
                width: $circleArea / 2;
                border-radius: 100%;
                border: 3px solid;
                top: calc(50% - $circleArea / 4);
                left: calc(50% - $circleArea / 4);
                opacity: 1;
                scale: 1;
                transition: all .2s;
                box-shadow: 0 0 20px;
            }
        }


        &.is-close {
            opacity: 1;
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

    .main-page {
        height: 100%;
        opacity: 1;
        transition: all 5s linear;
        &.is-close {
            opacity: 0;
            height: 0;
        }
    }
}
</style>