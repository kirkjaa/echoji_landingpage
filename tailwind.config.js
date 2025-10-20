/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Crimson Pro"', 'serif'],
      },
      colors: {
        background: '#000000',
        text: '#f5f4f5',
        accent: '#292828',
        'glow-start': 'rgba(158, 127, 255, 0.1)',
        'glow-end': 'rgba(0, 0, 0, 0)',
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out forwards',
        'fade-in-slow': 'fadeIn 2.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
