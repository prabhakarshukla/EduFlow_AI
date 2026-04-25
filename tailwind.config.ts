import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary:   '#6EE7D8',
          secondary: '#14B8A6',
          accent:    '#5EEAD4',
          bg:        '#222022',
          card:      '#2a282a',
          surface:   '#302e30',
        },
      },
      animation: {
        fadeIn:    'fadeIn 0.25s ease-out',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
      },
      boxShadow: {
        glow:    '0 0 24px rgba(110,231,216,0.25)',
        'glow-sm': '0 0 12px rgba(110,231,216,0.18)',
      },
    },
  },
  plugins: [],
};

export default config;
