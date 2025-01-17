/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: '#272727',
        primaryhover: '#0F0F0F',
        secondary: '#FED766',
        secondaryHover: '#F1C12E',
        danger: '#dc3545',
        third: '#696773',
        fourth: '#009FB7',
        fifth:'#EFF1F3',
      },
      fontFamily: {
        sans: ['sans-serif'],
      },
    },
  },
  plugins: [],
}

