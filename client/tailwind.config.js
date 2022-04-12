// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'alis-1': '#FEE05A',
        'alis-2': '#74C7D2',
        'alis-3': '#C9D5FB',
        'alis-dark': '#181818',
        'bg-blue-isis' : '#c0f4ec',
      },
      fontFamily: {
        'system': ['System', 'monospace']
      },
      zIndex: {
        '60': 60,
        '70': 70,
        '80': 80,
        '90': 90,
        '100': 100
      },
      minHeight: {
        'px': '1px',
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
        '60': '15rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem'
      },
      rotate: {
        '1x': '360deg',
        '2x': '720deg',
        '3x': '1080deg',
        '4x': '1440deg',
        '6x': '2160deg',
        '8x': '2880deg',
        '10x': '3600deg'
      }
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
}