const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontSize: theme("fontSize.h1") },
        h2: { fontSize: theme("fontSize.h2") },
        h3: { fontSize: theme("fontSize.h3") },
        h4: { fontSize: theme("fontSize.h4") },
        h5: { fontSize: theme("fontSize.h5") },
      });
    }),
  ]
}