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
        'primary-orange': '#B17457',
        'primary-cream': '#D8D2C2',
        'primary-white-tone': '#FAF7F0',
        'primary-gray': '#4A4947',
        
      },
    },
  },
  plugins: [],
} satisfies Config;

