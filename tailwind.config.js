/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'c0902c': '#c0902c',
        '667DD1':'#667DD1'
      },
      borderColor: {
        '667DD1': '#667DD1',
      },
      textColor:{
        '131523': '#131523' , 
        '70747B':'#70747B'
      }
    },
  },
  plugins: [],
}