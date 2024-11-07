/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: 'class', // Enables dark mode with a class (e.g., 'dark')
  theme: {
    extend: {
      colors: {
        primary: '#FFCB05', // Pokémon yellow
        secondary: '#3B4CCA', // Pokémon blue
        lightBackground: '#F4F4F9',
        darkBackground: '#1A1A1A',
        darkText: '#FFFFFF',
        lightText: '#333333',
      },
    },
  },
  plugins: [],
}