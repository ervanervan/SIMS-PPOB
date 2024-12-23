/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FF7A7A",
          DEFAULT: "#FF2929",
          dark: "#CC2020",
        },
        secondary: {
          light: "#FFE066",
          DEFAULT: "#FFD700",
          dark: "#CCAA00",
        },
        neutral: {
          light: "#F5F5F5",
          DEFAULT: "#E0E0E0",
          dark: "#A0A0A0",
        },
      },
    },
  },
  plugins: [],
}

