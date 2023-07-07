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
        responsive: "clamp(2rem, 4vw, 6rem)",
        "responsive-1/2": "clamp(1rem, 2vw, 3rem)",
        "responsive-3/4": "clamp(1.5rem, 3vw, 4.5rem)",
        "responsive-1/4": "clamp(0.5rem, 1vw, 1.5rem)",
        "cq-responsive": "clamp(2rem, 8cqw, 6rem)",
        "cq-responsive-1/4": "clamp(0.5rem, 2cqw, 1.5rem)",
        "cq-responsive-1/2": "clamp(1rem, 4cqw, 3rem)",
        "cq-responsive-3/4": "clamp(1.5rem, 6cqw, 4.5rem)",
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
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/container-queries")],
}
