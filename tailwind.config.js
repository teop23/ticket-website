/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ticket-red': '#e63946',
        'ticket-black': '#1d3557',
        'ticket-white': '#f1faee',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(230, 57, 70, 0.5)',
      },
    },
  },
  plugins: [],
};