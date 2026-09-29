/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          navy: '#0E2238',
          'navy-light': '#1A3350',
          'navy-lighter': '#264060',
        },
        anviti: {
          indigo: '#5B4FCF',
          'indigo-light': '#7B71DB',
          'indigo-lighter': '#9B93E7',
          'indigo-glow': 'rgba(91, 79, 207, 0.3)',
        },
        saffron: {
          amber: '#F2A93B',
          'amber-light': '#F5BD65',
        },
        verified: '#2DB87D',
        attention: '#E5A11C',
        risk: '#DC4A43',
        validated: '#1B9AAA',
        surface: {
          primary: '#FAFAF8',
          secondary: '#F2F1EE',
          tertiary: '#E8E7E3',
        },
        border: {
          DEFAULT: '#D4D3CF',
          subtle: '#E8E7E3',
        },
        'text-primary': '#1A1A1A',
        'text-secondary': '#5C5C5C',
        'text-tertiary': '#8C8C8C',
        dark: {
          surface: {
            primary: '#0A1628',
            secondary: '#0E2238',
            tertiary: '#1A3350',
          },
          border: {
            DEFAULT: '#2A4A6B',
            subtle: '#1E3A55',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.8125rem', { lineHeight: '1.25rem' }],
        'base': ['0.875rem', { lineHeight: '1.375rem' }],
        'md': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.5rem', { lineHeight: '2rem' }],
        '2xl': ['2rem', { lineHeight: '2.5rem' }],
        '3xl': ['2.5rem', { lineHeight: '3rem' }],
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.05)',
        'md': '0 4px 12px rgba(0,0,0,0.08)',
        'lg': '0 8px 24px rgba(0,0,0,0.12)',
        'glow-indigo': '0 0 20px rgba(91, 79, 207, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-up': 'slideInUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'count-up': 'countUp 1s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(91, 79, 207, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(91, 79, 207, 0.4)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
