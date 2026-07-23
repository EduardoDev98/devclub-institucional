import type { Config } from "tailwindcss";

/**
 * Design system do DevClub.
 * As cores foram extraídas da plataforma real (verde de marca sobre fundo quase preto).
 * Mantemos os tokens aqui para termos uma única fonte de verdade e zero cor mágica no JSX.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: "#22C55E",
          neon: "#4ADE80",
          deep: "#16A34A",
        },
        bg: {
          black: "#0A0A0A",
          panel: "#111827",
          elevated: "#1A1A1A",
        },
        accent: {
          orange: "#F59E0B",
          purple: "#A855F7",
        },
        text: {
          primary: "#FFFFFF",
          muted: "#9CA3AF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "hex-pulse": {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.4" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "glow-breathe": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "hex-pulse": "hex-pulse 4s ease-in-out infinite",
        "marquee-slow": "marquee 60s linear infinite",
        marquee: "marquee 40s linear infinite",
        "glow-breathe": "glow-breathe 3s ease-in-out infinite",
      },
      boxShadow: {
        "green-glow": "0 0 40px -8px rgba(34, 197, 94, 0.5)",
        "green-glow-lg": "0 0 80px -12px rgba(34, 197, 94, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
