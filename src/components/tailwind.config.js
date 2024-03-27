/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    './src/pages/**/*.{html,js,jsx,ts,tsx}',
    './src/components/**/*.{html,js,jsx,ts,tsx}',],
  theme: {
    extend: {
      colors: {
       // primary: "#50fc4b",
       primary: "#196a5c",
        light: "#6f9888",
      },
    },
  },
  plugins: [],
};
