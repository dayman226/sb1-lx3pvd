/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          400: '#FF8533', // Lighter, less irritating orange
          500: '#FF6600', // Original orange color (kept for reference)
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}