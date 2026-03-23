
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",   // Scanne index.html, blog.html, etc.
    "./*.js",     // Scanne home.js, app.js, tokimahery.data.js
  ],
  theme: {
    extend: {
      colors: {
        brandRed: '#b0101b', // Ta couleur rouge
        // ajoute tes autres couleurs personnalisées ici
      },
    },
  },
  plugins: [],
}