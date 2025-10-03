/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        warmWhite: '#f9f7f4',
        softGray: '#e2e2e2',
        mutedBlue: '#5c7cfa',
        charcoal: '#1c1c1e',
        slate: '#2c2c2e',
        accent: '#ffb347',
        darkMode: 'class',
      },
    },
  },
  plugins: [],
};
