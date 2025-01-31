/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', // Include all .ejs files in the views folder
    './public/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        bghWhite: '#f8f8f8',
        gray: '#676767',
        lightGray: '#d9d9d9', 
      },
      fontFamily: {
        hanken: ['Hanken Grotesk', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
        prompt: ['Prompt', 'sans-serif'],
        archivo: ['Archivo Black', 'sans-serif'],
        gruppo: ['Gruppo', 'serif']
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

