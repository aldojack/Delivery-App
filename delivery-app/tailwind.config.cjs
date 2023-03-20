/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        //3 page grid
        '3-auto': 'repeat(auto-fit, minmax(385px, 1fr));'
      }
    },
  },
  plugins: [],
}