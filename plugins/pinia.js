// plugins/pinia.js
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();

  if (process.client) {
    // Use the plugin only in the browser
    pinia.use(piniaPluginPersistedstate);
  }

  nuxtApp.vueApp.use(pinia);
});