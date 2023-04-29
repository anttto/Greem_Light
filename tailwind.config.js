/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // brand: "#5a9a1d",
        brand: "#8cdb01",
        button: "#4d8617",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
