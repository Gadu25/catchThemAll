// store/theme.js
import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false,
  }),
  actions: {
    initializeTheme() {
      if (process.client) {
        document.documentElement.classList.toggle('dark', this.isDarkMode);
      }
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      if (process.client) {
        document.documentElement.classList.toggle('dark', this.isDarkMode);
      }
    },
  },
  persist: {
    key: 'theme-store',
    storage: process.client ? window.localStorage : null, // Handle SSR
    paths: ['isDarkMode'],
  },
});
