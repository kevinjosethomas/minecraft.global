const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#2B3039",
          200: "#292E37",
          300: "#242932",
          400: "#222730",
          500: "#20242E",
          600: "#1B202A",
          700: "#141923",
          800: "#10141C",
          900: "#0C0F15",
        },
        olive: {
          100: "#82B398",
          200: "#82B398",
          300: "#70A889",
          400: "#5E9D7B",
          500: "#4C926C",
          600: "#448361",
          700: "#3D7556",
          800: "#35664C",
          900: "#2E5841",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F4F5F7",
          200: "#E5E7EB",
          300: "#D2D6DC",
          400: "#9FA6B2",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#252F3F",
          900: "#161E2E",
        },
        teal: colors.teal,
        orange: colors.orange,
      },
      screens: {
        "3xl": "1920px",
      },
      width: {
        80: "20rem",
        88: "22rem",
        100: "25rem",
      },
      height: {
        84: "21rem",
        88: "22rem",
        90: "22.5rem",
        92: "23rem",
      },
      scale: {
        102: "1.02",
      },
      spacing: {
        1200: "1200px",
      },
      cursor: {
        grab: "grab",
      },
    },
  },
  variants: {},
  plugins: [],
};
