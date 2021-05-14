module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.jsx",
    "./src/layouts/**/*.jsx",
    "./src/components/**/*.jsx",
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
        gray: {
          450: "var(--color-gray-450)",
        },
      },
      screens: {
        "3xl": "1920px",
      },
      spacing: {
        72: "20rem",
        112: "28rem",
        124: "31rem",
        "23/30": "76.66666%",
        "7/30": "23.33333%",
      },
    },
  },
  variants: {},
  plugins: [],
};
