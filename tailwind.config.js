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

        // for dynamic load of pokemon card types
        'bg-gray-400': '#cbd5e0',
        'bg-red-700': '#c53030',
        'bg-blue-300': '#90cdf4',
        'bg-purple-500': '#9f7aea',
        'bg-yellow-700': '#d69e2e',
        'bg-gray-600': '#4a5568',
        'bg-green-500': '#48bb78',
        'bg-indigo-700': '#434190',
        'bg-gray-500': '#a0aec0',
        'bg-red-500': '#f56565',
        'bg-blue-500': '#4299e1',
        'bg-green-400': '#68d391',
        'bg-yellow-400': '#ecc94b',
        'bg-pink-500': '#ed64a6',
        'bg-blue-200': '#bee3f8',
        'bg-purple-600': '#6b46c1',
        'bg-gray-800': '#2d3748',
        'bg-pink-300': '#fbb6ce',
        'bg-indigo-400': '#7f9cf5',
        'bg-gray-300': '#e2e8f0',
      },
    },
  },
  plugins: [],
}