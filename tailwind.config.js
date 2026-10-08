/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // pulled from the Miranoir logo ink and the stones themselves
        noir: '#2C3434',   // logo ink — headings, buttons
        slab: '#1E2424',   // nero marble — dark sections, footer
        stone: '#F3F4F2',  // page background, cool white like polished statuario
        mist: '#E3E6E4',   // panels, borders
        vein: '#8C9592',   // secondary text, the grey of a marble vein
        verd: '#4F6E66',   // the green hidden in the logo ink — links, focus
      },
      fontFamily: {
        display: ['Marcellus', 'Georgia', 'serif'],
        body: ['Figtree', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '1240px' },
    },
  },
  plugins: [],
}
