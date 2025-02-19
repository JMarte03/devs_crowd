/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', // Include all .ejs files in the views folder
    './public/**/*.js',
  ],
  theme: {
    extend: {
    //breakpoints for small, medium, large and xlarge screens
      screens: {
        sm: "600px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1500px"
      },
      colors: {
        bgWhite: '#f8f8f8',
        gray: '#676767',
        lightGray: '#d9d9d9', 
        grayHover: '#9b9b9b',
        darkGray: '#010101'
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
    require('preline/plugin'),
  ],
}

