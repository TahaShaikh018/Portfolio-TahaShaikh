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
        dark: {
          bg: '#060b13',
          card: 'rgba(10, 17, 30, 0.85)',
          border: 'rgba(0, 240, 255, 0.25)',
          hover: 'rgba(0, 240, 255, 0.15)'
        },
        light: {
          bg: '#0a111e',
          card: 'rgba(12, 20, 36, 0.9)',
          border: 'rgba(0, 240, 255, 0.2)',
          hover: 'rgba(0, 240, 255, 0.1)'
        },
        ctos: {
          cyan: '#00f0ff',
          green: '#00ff66',
          red: '#ff0055',
          amber: '#ffb703',
          bg: '#060b13',
          panel: 'rgba(10, 17, 30, 0.88)'
        }
      },
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
        mono: ['Share Tech Mono', 'JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'glitch': 'glitch 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
