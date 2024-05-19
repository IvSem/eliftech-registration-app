/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Open Sans', 'sans-serif']
    },
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {}
  },
  plugins: []
}
