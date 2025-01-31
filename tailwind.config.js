/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', // Include all .ejs files in the views folder
    './public/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        bgWhite: '#f8f8f8',
        gray: '#676767',
        lightGray: '#d9d9d9', 
      },
      fontFamily: {
        hanken: ['Hanken Grotesk', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
        gruppo: ['Gruppo', 'serif']
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

