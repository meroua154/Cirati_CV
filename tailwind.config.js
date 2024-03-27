/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    './src/pages/**/*.{html,js,jsx,ts,tsx}',
    './src/components/**/*.{html,js,jsx,ts,tsx}',
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",],

  darkMode:"class",
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
    },
    extend: {
      colors:{
        'blueColor' : '#2a68ff',
        'grey' : '#f1f4f8',
        'cardShadow' : '#f7f8f9',
        'cardShadow' : '#252b36',
        primary: "#196a5c",
        light: "#6f9888",
        
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
