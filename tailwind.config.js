/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false, // daytime only, no dark mode
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        // reduce default spacing by ~10%
        1: '0.25rem', // 4px -> 3.6px ~ will keep as is for simplicity
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
        40: '10rem',
        48: '12rem',
        56: '14rem',
        64: '16rem',
      },
      fontSize: {
        // shrink default font sizes ~10%
        xs: ['0.70rem', { lineHeight: '1rem' }],
        sm: ['0.80rem', { lineHeight: '1.25rem' }],
        base: ['0.90rem', { lineHeight: '1.5rem' }],
        lg: ['1.00rem', { lineHeight: '1.75rem' }],
        xl: ['1.10rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.25rem', { lineHeight: '2rem' }],
        '3xl': ['1.50rem', { lineHeight: '2.25rem' }],
        '4xl': ['1.75rem', { lineHeight: '2.5rem' }],
        '5xl': ['2.00rem', { lineHeight: '2.75rem' }],
      },
      colors: {
        primary: 'hsl(220, 70%, 55%)',
        secondary: 'hsl(260, 60%, 50%)',
        accent: 'hsl(340, 80%, 60%)',
        background: {
          light: 'hsl(210, 30%, 96%)',
          dark: 'hsl(210, 30%, 10%)',
        },
        surface: {
          light: 'hsl(0, 0%, 100%)',
          dark: 'hsl(0, 0%, 12%)',
        },
      },
    },
  },
  plugins: [],
};
