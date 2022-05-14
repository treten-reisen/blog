module.exports = {
  theme: {
    extend: {
      gridTemplateColumns: {
        "fit-sm": "repeat(auto-fit, minmax(20rem, 1fr))",
        "fit-lg": "repeat(auto-fit, minmax(24rem, 1fr))",
      },
      spacing: {
        responsive: "4vw",
      },
    },
    fontFamily: {
      sans: 'Open Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
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
  plugins: [],
}
