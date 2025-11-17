/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e1f2ff',
          100: '#b3ddff',
          200: '#80c4ff',
          300: '#4dabff',
          400: '#2697ff',
          500: '#0082ff',
          600: '#0065cc',
          700: '#004a99',
          800: '#003266',
          900: '#001933',
        },
        accent: {
          50: '#e3fff8',
          100: '#c0ffef',
          200: '#8dffe4',
          300: '#52ffd8',
          400: '#1ff7c5',
          500: '#00d1a3',
          600: '#00a581',
          700: '#007862',
          800: '#004f40',
          900: '#002520',
        },
        slate: {
          950: '#0b1a2b',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 140, 255, 0.08)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}

