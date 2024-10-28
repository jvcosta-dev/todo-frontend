/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B91FF",
        danger: "#FF3C38",
        success: "#3CFF66",
        light: "#E8E9F3",
        dark: "#1E1E1E",
      },
      fontFamily: {
        mukta: ["Mukta", "sans-serif"],
      },
    },
  },
  plugins: [],
};
