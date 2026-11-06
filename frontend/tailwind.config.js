/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: '#00bfff',
        electric: '#168dff',
      },
      fontFamily: {
        display: ['Orbitron', 'ui-sans-serif', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'hyperspace-expand': {
          '0%': { opacity: '.2', transform: 'scale(.1)' },
          '15%': { opacity: '.68', transform: 'scale(.16)' },
          '55%': { opacity: '1', transform: 'scale(.85)' },
          '82%': { opacity: '.9', transform: 'scale(1.85)' },
          '100%': { opacity: '0', transform: 'scale(2.5)' },
        },
        'hyperspace-fade': {
          '0%': { opacity: '0' },
          '10%, 76%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'ray-appear': {
          '0%, 8%': { opacity: '.1' },
          '38%, 72%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        hyperspace: 'hyperspace-expand 1.2s cubic-bezier(.2,.65,.18,1) both',
        'hyperspace-fade': 'hyperspace-fade 1.2s ease-out both',
        'ray-appear': 'ray-appear 1.2s ease-out both',
      },
    },
  },
  plugins: [],
}
