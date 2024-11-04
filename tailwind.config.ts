import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        "primary-orange": "#B17457",
        "primary-cream": "#D8D2C2",
        "primary-white-tone": "#FAF7F0",
        "primary-gray": "#4A4947",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        fadeOut: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        "scale-in": {
          "0%": {
            transform: "scale(0)",
          },
          "90%": { transform: "scale(1.25)" },
          "100%": {
            transform: "scale(1)",
          },
        },
        "scale-out": {
          "0%": {
            transform: "scale(1)",
          },
          "15%": {
            transform: "scale(1.25)"
          },
          "100%": {
            transform: "scale(0)",
          },
        },
        "scale-out-in": {
          "0%": {
            transform: "scale(1)",
          },
          "10%": {
            transform: "scale(1.25)",
          },
          "50%": {
            transform: "scale(0)",
          },
          "90%": {
            transform: "scale(1.25)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-out": "fadeOut 0.5s ease-in-out",
        "scale-in": "scale-in 0.5s ease-in-out",
        "scale-out": "scale-out 0.5s ease-in-out",
        "scale-out-in": "scale-out-in 1s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
