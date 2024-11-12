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
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
        }
      ],
    },
  },
  modules: ['nuxt-lodash', '@nuxtjs/tailwindcss'],
  compatibilityDate: '2024-11-07',
};