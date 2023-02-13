/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        lightModeBG: '#FFFFFF',
        darkModeBG: '#0f172a',
        lightModeCard: '#164e63',
        darkModeCard: '#0c4a6e',
        pureBlackBG: '#1c1917',
        pureBlackCard: '#292524',
      },
    },
  },
  plugins: [require('daisyui')],
}
