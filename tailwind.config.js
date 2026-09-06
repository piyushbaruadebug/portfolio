/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#020202',
        abyss: '#080808',
        red: {
          500: '#e50914',
          600: '#d10813',
          700: '#b00710',
        }
      },
      fontFamily: {
        cinema: ['Anton', 'Syne', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        editorial: ['Oswald', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['Onest', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
