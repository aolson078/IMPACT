/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        blackish: {
          100: "#1b1b1f",
          200: "#151518",
          300: "#0f0f12",
        },
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-2%)" },
          "50%": { transform: "translateY(2%)" },
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
