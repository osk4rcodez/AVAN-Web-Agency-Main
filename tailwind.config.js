/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#2E1A47',
        silver: '#A79FC4',
        accent: '#8B5CF6',
        lilac: '#F1ECFE',
        lilacDeep: '#E4DAFB',
        ink: '#1E1B2E',
        mist: '#F7F5FC',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)',
        cardHover: '0 12px 32px rgba(27, 42, 77, 0.14)',
        nav: '0 1px 0 rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.06)',
      },
      maxWidth: {
        container: '1200px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
        neonPulse: {
          '0%, 100%': {
            boxShadow:
              '0 0 0px rgba(139,92,246,0.0), 0 0 18px rgba(139,92,246,0.45)',
          },
          '50%': {
            boxShadow:
              '0 0 10px rgba(139,92,246,0.5), 0 0 32px rgba(139,92,246,0.7)',
          },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseDot: 'pulseDot 2s ease-in-out infinite',
        'neon-pulse': 'neonPulse 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
