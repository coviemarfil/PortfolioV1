import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { background: "hsl(var(--background))", surface: "hsl(var(--surface))", foreground: "hsl(var(--foreground))", muted: "hsl(var(--muted))", subtle: "hsl(var(--subtle))", border: "hsl(var(--border))" },
      fontFamily: { sans: ["var(--font-geist)", "system-ui", "sans-serif"], mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"] },
      maxWidth: { content: "72rem" },
      keyframes: { "fade-up": { "0%": { opacity: "0", transform: "translateY(1rem)" }, "100%": { opacity: "1", transform: "translateY(0)" } } },
      animation: { "fade-up": "fade-up 700ms cubic-bezier(0.4, 0, 0.2, 1) both" }
    }
  },
  plugins: []
};

export default config;
