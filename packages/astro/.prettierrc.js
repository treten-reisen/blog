module.exports = {
  ...require("../../.prettierrc"),
  tailwindConfig: './tailwind.config.js',
  plugins: [require('prettier-plugin-tailwindcss')],
};
