const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    g: ({theme}) => theme('spacing'),
    extend: {},
  },
  plugins: [
    plugin(function ({matchUtilities: matchUtils, theme}) {
      matchUtils({g: value => ({gap: value})}, {values: theme('g')});
    }),
  ],
};
