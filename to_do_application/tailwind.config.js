/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A628A',
          light: '#5e7397',
          dark: '#42577b',
        },
        secondary: { 
          DEFAULT: '#7AB2D3',
          light: '#89bbd8',
          dark: '#6c9ebc',
        },
        primaryLight: {
          DEFAULT: '#DFF2EB',
          light: '#e3f3ed',
          dark: '#c6d7d1',
        },
        secondaryLight: { 
          DEFAULT: '#B9E5E8',
          light: '#c1e8eb',
          dark: '#a4ccce',
        },
      },
    },
  },
  plugins: [],
};
