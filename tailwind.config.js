export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      screens: {
        pin: { raw: "(min-width: 1024px) and (min-height: 640px)" },
      },
      colors: {
        bg: "var(--bg)",
        raised: "var(--bg-raised)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        ghost: "var(--ghost)",
        accent: "var(--accent-ink)",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
