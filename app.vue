<template>
  <div class="w-100 text-center">
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
      <Lottie :options="lottieOptions" height="400" width="400" />
  </div>
</template>

<script>
export default {
  name: 'Hero',
  data() {
    return {
      lottieOptions: {
        animationData: 'https://lottie.host/6a253a45-361e-42e0-bcc2-16abb1d54141/z4x30S26Kr.json', // replace with your own Lottie animation JSON file
        loop: true,
        autoplay: true
      }
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