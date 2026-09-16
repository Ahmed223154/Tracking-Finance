/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Must be 'class' so toggling .dark on <html> applies dark styles
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
