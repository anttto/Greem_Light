/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#5a9a1d",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
