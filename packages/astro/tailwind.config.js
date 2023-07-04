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
        responsive: "max(2rem, 4vw)",
        "responsive-1/2": "max(1rem, 2vw)",
        "responsive-3/4": "max(1.5rem, 3vw)",
        "responsive-1/4": "max(0.5rem, 1vw)",
      },
      height: {
        hero: "clamp(18rem, 50vw, 32rem)",
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
