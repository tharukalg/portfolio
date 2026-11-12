import type { Config } from "tailwindcss";

const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** Colour tokens live in app/globals.css as raw OKLCH channels so Tailwind
 *  opacity modifiers (bg-lime/20, text-ink/70 …) keep working. */
const token = (name: string) => `oklch(var(--${name}) / <alpha-value>)`;

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        paper: token("paper"),
        ink: { DEFAULT: token("ink"), 2: token("ink-2") },
        mute: token("mute"),
        line: token("line"),
        petrol: { DEFAULT: token("petrol"), deep: token("petrol-deep") },
        verm: token("verm"),
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      zIndex: {
        base: "1",
        raised: "10",
        sticky: "100",
        nav: "200",
        overlay: "300",
        cursor: "400",
        boot: "500",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        quart: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        "marquee-rev": {
          from: { transform: "translate3d(-50%,0,0)" },
          to: { transform: "translate3d(0,0,0)" },
        },
        blink: { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        sweep: { to: { transform: "rotate(360deg)" } },
        pulsering: {
          "0%": { transform: "scale(0.6)", opacity: "0.9" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        flicker: {
          "0%,100%": { opacity: "1" },
          "8%": { opacity: "0.55" },
          "9%": { opacity: "1" },
          "52%": { opacity: "0.8" },
          "53%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-speed, 32s) linear infinite",
        "marquee-rev": "marquee-rev var(--marquee-speed, 32s) linear infinite",
        blink: "blink 1.1s steps(1) infinite",
        sweep: "sweep 3.2s linear infinite",
        pulsering: "pulsering 2s cubic-bezier(0.16,1,0.3,1) infinite",
        flicker: "flicker 4s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="48" height="48" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
} satisfies Config;

export default config;
