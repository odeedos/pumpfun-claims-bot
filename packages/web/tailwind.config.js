/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tg-bg':       '#17212b',
        'tg-sidebar':  '#0e1621',
        'tg-chat':     '#0e1621',
        'tg-header':   '#17212b',
        'tg-input':    '#242f3d',
        'tg-hover':    '#202b36',
        'tg-border':   '#1c2733',
        'tg-blue':     '#5eb5f7',
        'tg-green':    '#4fae4e',
        'tg-bubble':   '#2b5278',
        'tg-bubble-in':'#182533',
        'pump-green':  '#00e676',
        'pump-pink':   '#ff6b9d',
        'pump-yellow': '#ffd54f',
        'pump-purple': '#b388ff',
        'pump-orange': '#ff9100',
        'pump-cyan':   '#00e5ff',
      },
    },
  },
  plugins: [],
}
