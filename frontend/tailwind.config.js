/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        surface: "#0f172a",
        neon: {
          purple: "#a855f7",
          blue: "#38bdf8",
          cyan: "#22d3ee",
        },
      },
      boxShadow: {
        glow: "0 0 30px rgba(56, 189, 248, 0.3)",
        card: "0 20px 45px -25px rgba(15, 23, 42, 0.7)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(56, 189, 248, 0)" },
          "50%": { boxShadow: "0 0 40px rgba(56, 189, 248, 0.35)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

