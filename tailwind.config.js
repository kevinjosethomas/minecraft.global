module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          60: "#222822",
          70: "#181E18",
          80: "#090F09",
          90: "#0A0A0A",
        },
        olive: {
          50: "#52B788",
          60: "#40916C",
          70: "#2D6A4F",
          80: "#275D45",
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
