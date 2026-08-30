import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
        brand: "var(--brand)",
        "brand-ink": "var(--brand-ink)",
        border: "var(--border)",
      },
      borderRadius: { DEFAULT: "12px" },
      boxShadow: { card: "0 1px 3px rgba(0,0,0,.08)" },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
