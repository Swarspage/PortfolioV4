export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): Rgb {
  const clean = hex.replace("#", "").trim();
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean.slice(0, 6);
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return { r: 128, g: 128, b: 128 };
  return { r: n >> 16 & 255, g: n >> 8 & 255, b: n & 255 };
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** "light" glows vanish on paper, "dark" glows vanish on charcoal. */
export function glowTone(hex: string): "light" | "dark" | "mid" {
  const l = relativeLuminance(hex);
  if (l > 0.5) return "light";
  if (l < 0.12) return "dark";
  return "mid";
}