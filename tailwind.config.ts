import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          bg: "#020617",
          card: "#0e1c34",          /* subtle lift above content bg */
          "card-secondary": "#111f38",
          "card-raised": "#142040", /* slightly raised, still navy */
        },
        border: {
          subtle: "rgba(255,255,255,0.08)",
        },
        primary: {
          blue: "#3B82F6",
          light: "#93C5FD",
        },
        accent: {
          amber: "#F59E0B",
          green: "#22c55e",
        },
        text: {
          primary: "#ffffff",
          secondary: "#dde6f5",
          tertiary: "#b0c4de",    /* bumped — tertiary must be readable on raised panes */
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
