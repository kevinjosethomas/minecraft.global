module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,jsx}",
    "./layouts/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          60: "#232323",
          70: "#1E1E1E",
          80: "#141414",
          90: "#0A0A0A",
        },
        olive: {
          50: "#52B788",
          60: "#40916C",
          70: "#2D6A4F",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
