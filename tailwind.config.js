/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './slices/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        'main-black': '#121213',
        'main-blue': '#184CA1',
        'accent-green': '#92D633',
        'gray-100': '#EAEAEC',
        'gray-200': '#E0E1E4',
        'gray-300': '#E0E1E6',
        'gray-400': '#C7C7C7',
        'gray-500': '#C0C0C0',
        'gray-600': '#A4A4A4',
        'gray-700': '#707070',
        'gray-800': '#6D6D6D',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.2rem',  // 35px
        '6xl': '3.125rem', // 50px
        '7xl': '4rem', // 64px
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
