<template>
  <div class="main-container w-screen h-screen overflow-hidden">
    <div :class="isClose ? 'custom-main': ''" class="bg-lightBackground dark:bg-darkBackground min-h-screen text-lightText dark:text-darkText" @mousemove="handleMouseMove" :style="pokeBallStyle">
      <Navbar :isClose="isClose"/>
      <button class="custom-circle" :class="isClose ? 'is-close': ''" @click="isClose=!isClose" @mousemove="resetTilt">
      </button>
      <!-- <Footer :isClose="isClose"/> -->
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

import { ref } from 'vue';

export default {
  name: 'Hero',
  components: { Navbar },
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
      if(this.isClose){
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
    .custom-circle{
      position: absolute;
      z-index: 5;
      transition: transform .2s linear;
      top: calc(50vh - $circleArea/2);
      left: calc(50vw - $circleArea/2);
      height: $circleArea;
      width: $circleArea;
      border-radius: 100%;
      border: 7px solid;
      background-color: #FFFFFF;
      opacity: 0;
      
      &.is-close {
        opacity: 1;
      }
  
      &:hover {
        transform: scale(1.3);
      }
  
      &:active {
        transform: scale(1);
      }
    }
  }

</style>