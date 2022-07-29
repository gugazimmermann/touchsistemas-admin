/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        pageBackgroung: "#e2e8f0",
        primary: "#f59e0b",
        secondary: "#10b981",
        warning: "#a855f7",
        danger: "#dc2626",
        background: "#f8fafc",
        text: "#475569",
      },
    },
  },
  plugins: [],
});
