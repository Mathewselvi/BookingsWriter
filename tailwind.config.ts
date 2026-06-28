import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      sm: '600px',
      lg: '1024px',
    },
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Inter',
          'Arial',
          'sans-serif'
        ]
      },
      colors: {
        apple: {
          blue: 'var(--color-blue)',
          hover: 'var(--color-blue-hover)'
        },
        bg: 'var(--color-bg)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          2: 'var(--color-surface-2)'
        },
        t1: 'var(--color-t1)',
        t2: 'var(--color-t2)',
        t3: 'var(--color-t3)',
        separator: 'var(--color-separator)',
        success: '#34c759',
        warning: '#ff9f0a',
        danger: '#ff3b30'
      },
      boxShadow: {
        card: '0 1px 0 rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.07)',
        modal: '0 28px 80px rgba(0,0,0,0.14)',
        focus: '0 0 0 4px rgba(0,113,227,0.25)'
      },
      borderRadius: {
        input: '12px',
        card: '20px',
        button: '980px',
        chip: '980px'
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.28, 0.11, 0.32, 1)'
      }
    }
  },
  plugins: []
};

export default config;
