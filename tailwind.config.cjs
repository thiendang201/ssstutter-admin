/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans', 'sans-serif']
    },
    extend: {
      boxShadow: {
        primary: '0px 1px 2px rgba(133, 140, 148, 0.05)',
        secondary: '0px 4px 30px rgba(133, 140, 148, 0.05)',
        popup: '2px 6px 23px rgba(133, 140, 148, 0.2)'
      },
      colors: {
        primary: {
          purple: '#7166F9'
        },
        'dark-blue': '#2B2F42',
        icon: '#9FA7D0',
        background: '#F6F6FB',
        'light-blue-grey': '#DFE6EF',
        'dark-blue-grey': '#D1DDEB'
      },
      width: {
        66: '16.5rem',
        69: '17.25rem'
      },
      minWidth: {
        66: '16.5rem'
      },
      gridTemplateRows: {
        '3-max-tail': ' 1fr 2fr 1fr'
      }
    }
  },
  plugins: []
};
