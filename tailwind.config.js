module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      'tiny': '0.7rem',
    },
    extend: {
      spacing:{
        '100':'50rem',
        '200':'80rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
