/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6e44ff',
        dark: '#1e1e2e',
        secondary: '#2d2d3a',
      },
    },
  },
  plugins: [],
}