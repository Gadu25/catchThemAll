export default {
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: ['~/plugins/pinia.js'],

  modules: ['nuxt-lodash', '@nuxtjs/tailwindcss'],
  compatibilityDate: '2024-11-07',
};