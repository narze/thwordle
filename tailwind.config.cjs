const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",

  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        md: "3rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },

  plugins: [],
}

module.exports = config
