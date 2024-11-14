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
        'card-light': '#f8f9fa', // light mode card background
        'card-dark': '#1f2937', // dark mode card background
        primary: '#FFCB05', // Pokémon yellow
        secondary: '#3B4CCA', // Pokémon blue
        lightBackground: '#F4F4F9',
        darkBackground: '#1A1A1A',
        darkText: '#FFFFFF',
        lightText: '#333333',
        disabledGray: '#d1d5db',
        'pokeball-red': '#E60000',
        'pokeball-white': '#FFFFFF',
        'pokeball-black': '#2A2A2A',
        'pokemon-yellow': '#FFCB05',
        'pokemon-blue': '#3B4CCA',
        'grass-green': '#6DAA3C',
        'fire-red': '#FF4500',
        'water-blue': '#1E90FF',
        'dark-purple': '#4B0082',
        'electric-yellow': '#FFDD00',
      },
    }
  },
  plugins: [],
}