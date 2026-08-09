import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oculus: {
          bg: "#04060a",
          panel: "#080c14",
          card: "#0d1320",
          border: "rgba(0, 242, 255, 0.15)",
          cyan: "#00f2ff",
          cyanGlow: "rgba(0, 242, 255, 0.3)",
          emerald: "#00ff9d",
          crimson: "#ff3366",
          amber: "#ffb703",
          textMain: "#e2e8f0",
          textMuted: "#64748b",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Space Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-cyan": "glowCyan 2s ease-in-out infinite alternate",
        "scan-line": "scanLine 8s linear infinite",
        "float-node": "floatNode 6s ease-in-out infinite",
      },
      keyframes: {
        glowCyan: {
          "0%": { boxShadow: "0 0 10px rgba(0, 242, 255, 0.2), inset 0 0 5px rgba(0, 242, 255, 0.1)" },
          "100%": { boxShadow: "0 0 25px rgba(0, 242, 255, 0.6), inset 0 0 15px rgba(0, 242, 255, 0.3)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        floatNode: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
