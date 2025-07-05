/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2f8",
          100: "#dbe2ee",
          200: "#b8c7dc",
          300: "#94acca",
          400: "#708fb6",
          500: "#52729c",
          600: "#415a7b",
          700: "#31445d",
          800: "#222e3e",
          900: "#141c26",
          950: "#0b1117",
        },
        accent: {
          50: "#f9f8f1",
          100: "#f2f0e2",
          200: "#e2dfc0",
          300: "#d2ce9e",
          400: "#bfb973",
          500: "#a5a057",
          600: "#868242",
          700: "#696533",
          800: "#4b4824",
          900: "#2f2c16",
          950: "#1d1b0e",
        },
      },
    },
  },
  plugins: [],
};
