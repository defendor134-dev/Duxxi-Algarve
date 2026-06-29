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
        "ultra-black": "#000000",
        "ultra-dark": "#0a0a0a",
        "ultra-gray": "#1a1a1a",
        "ultra-green": "#00833E",
        "ultra-green-bright": "#00FF66",
        "ultra-gold": "#C4A747",
        "ultra-red": "#DC2626",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-green": "pulseGreen 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseGreen: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 102, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 102, 0.4)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;