import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette: deep black + neon yellow
        ink: {
          DEFAULT: "#0a0a0b",
          soft: "#0f0f11",
          card: "#141417",
          line: "#26262b",
        },
        neon: {
          DEFAULT: "#d7ff00", // primary neon yellow
          soft: "#e8ff5c",
          dim: "#aacc00",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(215,255,0,0.4), 0 0 24px -4px rgba(215,255,0,0.45)",
        "neon-lg": "0 0 40px -6px rgba(215,255,0,0.55)",
        card: "0 20px 60px -30px rgba(0,0,0,0.9)",
      },
      backgroundImage: {
        "grid-neon":
          "linear-gradient(to right, rgba(215,255,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(215,255,0,0.06) 1px, transparent 1px)",
        "radial-neon":
          "radial-gradient(circle at 50% 0%, rgba(215,255,0,0.18), transparent 60%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
