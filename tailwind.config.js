module.exports = {
  mode: "jit",
  purge: ["./src/**/*.jsx"],
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
      spacing: {
        88: "22rem",
        160: "40rem",
      },
    },
  },
  variants: {},
  plugins: [],
};
