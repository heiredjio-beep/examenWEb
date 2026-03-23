/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.js",
  ],
  theme: {
    extend: {
      colors: {
        brandRed: '#b0101b',
        bgCream: '#fbfaf8',
        textDark: '#1a1a1a',
        textMuted: '#6b7280',
        tagBlue: '#5ea2ef',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
