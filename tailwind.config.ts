import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#070B14",
        surface: "#111827",
        accent: "#8B5CF6",
      },
      boxShadow: {
        glow: "0 0 40px rgba(139,92,246,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
