import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      colors: {
        cream: "#f7efe3",
        porcelain: "#fffaf3",
        clay: "#b5835a",
        cocoa: "#5a3d2b",
        moss: "#6f735b",
        ink: "#2e251d"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(90, 61, 43, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
