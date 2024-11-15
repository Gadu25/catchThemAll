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
        'card-light': '#f0f2f5', // Softer light mode card background
        'card-dark': '#2d3748', // Softer dark mode card background
        'dialog-light': '#ffffff',
        'dialog-dark': 'rgba(0, 0, 0, 0.85)', // Increased opacity for better readability
        primary: '#F9C74F', // Softer, golden-yellow for primary color
        secondary: '#3A5BA0', // Muted Pokémon blue
        lightBackground: '#FAFAFC', // Softer light background
        darkBackground: '#121212', // True dark for dark mode background
        darkText: '#E0E0E0', // Softer white for dark mode text
        lightText: '#333333', // Keeps readability for light mode
        disabledGray: '#c0c4cc', // Slightly softer disabled color
        'pokeball-red': '#D7263D', // Muted red for Pokéball
        'pokeball-white': '#FFFFFF',
        'pokeball-black': '#1F1F1F', // Darker black for contrast
        'pokemon-yellow': '#F9C74F', // Softer Pokémon yellow
        'pokemon-blue': '#3A5BA0', // Softer Pokémon blue
        'grass-green': '#77C545', // Softer green for grass type
        'fire-red': '#E63946', // More balanced red for fire type
        'water-blue': '#457B9D', // Muted blue for water type
        'dark-purple': '#5D3B90', // Softer purple for dark type
        'electric-yellow': '#F1C40F', // Softer electric yellow
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'], // Set Quicksand as the default sans font
      },
      keyframes: {
        upDown: {
          '0%': {
              transform: 'translateY(0)'
          },
          '50%': {
              transform: 'translateY(-5px)'
          },
          '100%': {
              transform: 'translateY(0)'
          }
        }
      },
      animation: {
        upDown: 'upDown 1.5s ease-in-out infinite', // define duration and looping here
      },
    }
  },
  plugins: [],
}