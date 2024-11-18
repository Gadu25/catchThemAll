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
        // Light and Dark backgrounds
        lightBackground: '#FAFAFC',  // Subtle off-white for light mode
        darkBackground: '#121212',  // Darker gray-black for dark mode
        darkText: '#E0E0E0',
        lightText: '#333333',

        'card-light': '#f0f2f5',
        'card-dark': '#2d3748',
        'dialog-light': '#ffffff',
        'dialog-dark': 'rgba(0, 0, 0, 0.85)',
        primary: '#F9C74F',
        secondary: '#3A5BA0',
        disabledGray: '#c0c4cc',
        'pokeball-red': '#D7263D',
        'pokeball-white': '#FFFFFF',
        'pokeball-black': '#1F1F1F', 
        'pokemon-yellow': '#F9C74F',
        'pokemon-blue': '#3A5BA0',
        'grass-green': '#77C545',
        'fire-red': '#E63946',
        'water-blue': '#457B9D',
        'dark-purple': '#5D3B90',
        'electric-yellow': '#F1C40F',
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
        },
        fadeInLoad: {
          '0%': {
            opacity: 0,
            transform: 'translateY(15px)'
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        upDown: 'upDown 1.5s ease-in-out infinite',
        fadeInLoad: 'fadeInLoad .3s linear'
      },
    }
  },
  plugins: [],
}