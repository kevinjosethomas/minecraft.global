module.exports = {
  mode: "jit",
  purge: ["./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        dark: {
          60: "var(--color-dark-60)",
          70: "var(--color-dark-70)",
          80: "var(--color-dark-80)",
          90: "var(--color-dark-90)",
        },
        olive: {
          50: "var(--color-olive-50)",
          60: "var(--color-olive-60)",
          70: "var(--color-olive-70)",
        },
        gray: {
          450: "var(--color-gray-450)",
        },
      },
      spacing: {
        72: "20rem",
        124: "31rem",
        "23/30": "76.66666%",
        "7/30": "23.33333%",
      },
    },
  },
  variants: {},
  plugins: [],
};
