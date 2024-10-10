/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#393e46",
        secondary: "#ed6a5e",
        "secondary-hover": "#eb584a",
        tertiary: "#45566d",
        quaternary: "#f1faff",
        footer: "#4f545c",
      },
      width: {
        layout: "1100px",
      },
    },
  },
  plugins: [],
};
