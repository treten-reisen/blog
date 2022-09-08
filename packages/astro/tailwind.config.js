const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "fit-sm": "repeat(auto-fit, minmax(20rem, 1fr))",
        "fit-lg": "repeat(auto-fit, minmax(24rem, 1fr))",
      },
      spacing: {
        responsive: "4vw",
      },
      height: {
        hero: "clamp(15rem, 50vw, 40rem)",
      },
    },
    colors: {
      gray: colors.gray,
      lime: colors.lime,
    },
    fontFamily: {
      sans: '"Open Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      serif: 'Merriweather, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
      mono: 'Inconsolata, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    container: {
      center: true,
    },
    screens: {
      sm: "576px",
      md: "960px",
      lg: "1440px",
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
