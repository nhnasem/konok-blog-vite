/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 1px 4px rgba(169, 64, 100, 0.5)",
        card2: "0 .1rem 1rem rgba(0, 0, 0, 0.1);"
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
