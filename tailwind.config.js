/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        danger: "#ff3c38",
        success: "#3cff66",
        light: "#e8e9f3",
        dark: "#141414",
        solid: "#FFF",
        solidDark: "#1e1e1e",
      },
      fontFamily: {
        mukta: ["Mukta", "sans-serif"],
      },
    },
  },
  plugins: [],
};
