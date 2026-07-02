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
        // Core brand palette: deep black + premium gold
        ink: {
          DEFAULT: "#0a0a0b",
          soft: "#100f0d",
          card: "#16150f",
          line: "#2c2a22",
        },
        // "neon" token retained as the accent key across the app, now a rich gold
        neon: {
          DEFAULT: "#e7b53c", // primary gold
          soft: "#f6d989", // light champagne gold
          dim: "#b78a2b", // deep gold
          deep: "#8a6518",
        },
        gold: {
          DEFAULT: "#e7b53c",
          soft: "#f6d989",
          dim: "#b78a2b",
          deep: "#8a6518",
        },
        // subtle blue accent that complements the gold
        azure: {
          DEFAULT: "#4da6ff",
          soft: "#8fc7ff",
          dim: "#2f7fd0",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(231,181,60,0.4), 0 0 24px -4px rgba(231,181,60,0.45)",
        "neon-lg": "0 0 40px -6px rgba(231,181,60,0.55)",
        azure: "0 0 0 1px rgba(77,166,255,0.35), 0 0 28px -6px rgba(77,166,255,0.5)",
        card: "0 20px 60px -30px rgba(0,0,0,0.9)",
      },
      backgroundImage: {
        "grid-neon":
          "linear-gradient(to right, rgba(231,181,60,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(231,181,60,0.06) 1px, transparent 1px)",
        "radial-neon":
          "radial-gradient(circle at 50% 0%, rgba(231,181,60,0.18), transparent 60%)",
        "radial-azure":
          "radial-gradient(circle at 50% 50%, rgba(77,166,255,0.16), transparent 62%)",
        "gold-metal":
          "linear-gradient(135deg, #8a6518 0%, #e7b53c 30%, #f6d989 50%, #e7b53c 70%, #8a6518 100%)",
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
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-14px) rotate(2deg)" },
        },
        drive: {
          "0%": { transform: "translateX(-30vw)", opacity: "0" },
          "8%": { opacity: "1" },
          "92%": { opacity: "1" },
          "100%": { transform: "translateX(130vw)", opacity: "0" },
        },
        wheel: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "gold-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.7)" },
          "50%": { opacity: "0.9", transform: "scale(1.15)" },
        },
        "blue-sheen": {
          "0%": { transform: "translateX(-120%)" },
          "60%, 100%": { transform: "translateX(220%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        drive: "drive 5s cubic-bezier(0.4,0,0.5,1) 0.3s both",
        wheel: "wheel 0.6s linear infinite",
        marquee: "marquee 32s linear infinite",
        "gold-pan": "gold-pan 5s linear infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        "blue-sheen": "blue-sheen 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
