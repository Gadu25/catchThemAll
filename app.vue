<template>
  <div class="bg-lightBackground dark:bg-darkBackground min-h-screen text-lightText dark:text-darkText">
    <Navbar/>
    <h1 class="text-primary">Catch Them All</h1>
    <p class="text-secondary">Explore your favorite Pokémon!</p>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
  name: 'Hero',
  components: { Navbar },
  data() {
    return {
      // lottieOptions: {
      //   animationData: 'https://lottie.host/6a253a45-361e-42e0-bcc2-16abb1d54141/z4x30S26Kr.json', // replace with your own Lottie animation JSON file
      //   loop: true,
      //   autoplay: true
      // }
    }
  },
  // mounted() {
  //   // Check if the Lottie library is loaded
  //   if (window.lottie) {
  //     window.lottie.loadAnimation({
  //       container: this.$refs.lottieContainer, // DOM element to render the animation
  //       renderer: 'svg', // 'svg', 'canvas', or 'html'
  //       loop: true, // Loop the animation
  //       autoplay: true, // Autoplay on load
  //       path: 'https://lottie.host/6a253a45-361e-42e0-bcc2-16abb1d54141/z4x30S26Kr.json', // JSON URL
  //     });
  //   } else {
  //     console.error('Lottie library not loaded');
  //   }
  // }
}
</script>

<!-- <style scoped>
.lottie-animation {
  width: 300px;
  height: 200px;
  margin: 0 auto;
}
</style> -->