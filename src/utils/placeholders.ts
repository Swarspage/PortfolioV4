import { relativeLuminance } from "./color";

// Designed SVG placeholders, generated as data URIs. Used only when a real file is missing.

type PlateVariant = "landscape" | "wide" | "banner";

const PLATE_SIZES: Record<PlateVariant, [number, number]> = {
  landscape: [1600, 1000],
  wide: [1600, 900],
  banner: [2400, 760]
};

const PLATE_PALETTES: [string, string][] = [
["#241c17", "#7a3d22"],
["#1d1b18", "#5d4a34"],
["#261d1c", "#8a4b3a"],
["#1b1916", "#4a443b"],
["#2a2117", "#94653a"],
["#201b19", "#6b4a44"]];


const cache = new Map<string, string>();

function svgUri(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function memo(key: string, build: () => string): string {
  const hit = cache.get(key);
  if (hit) return hit;
  const value = build();
  cache.set(key, value);
  return value;
}

export function monogram(label: string): string {
  const trimmed = label.trim();
  if (/^[A-Za-z]\+\+$/.test(trimmed) || trimmed.length <= 2) return trimmed;
  const words = trimmed.split(/[\s.\-]+/).filter(Boolean);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  return trimmed[0].toUpperCase() + trimmed[1].toLowerCase();
}

/** Skill / social placeholder: a rounded tile in the skill's glow colour with a serif monogram. */
export function monogramTile(label: string, color: string): string {
  return memo(`m:${label}:${color}`, () => {
    const text = monogram(label);
    const ink = relativeLuminance(color) > 0.45 ? "#1a1612" : "#fbf7f1";
    const size = text.length > 2 ? 40 : 54;
    return svgUri(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect x="1" y="1" width="126" height="126" rx="64" fill="${color}" stroke="rgba(20,16,12,0.25)" stroke-width="2"/><circle cx="64" cy="64" r="52" fill="none" stroke="${ink}" stroke-opacity="0.18"/><text x="64" y="64" dy="0.35em" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="${size}" fill="${ink}">${esc(text)}</text></svg>`
    );
  });
}

/** Project / achievement / thumbnail placeholder: a warm plate with registration marks and a label. */
export function plate(label: string, caption: string, variant: PlateVariant = "landscape"): string {
  return memo(`p:${label}:${caption}:${variant}`, () => {
    const [w, h] = PLATE_SIZES[variant];
    const [from, to] = PLATE_PALETTES[hash(label) % PLATE_PALETTES.length];
    const pad = Math.round(Math.min(w, h) * 0.08);
    const titleSize = Math.round(Math.min(h * 0.13, (w - pad * 3) / Math.max(label.length * 0.52, 1)));
    const capSize = Math.round(Math.min(h, w) * 0.028);
    const m = Math.round(pad * 0.6);
    const marks = [
    `M${pad} ${pad + m}V${pad}H${pad + m}`,
    `M${w - pad - m} ${pad}H${w - pad}V${pad + m}`,
    `M${pad} ${h - pad - m}V${h - pad}H${pad + m}`,
    `M${w - pad - m} ${h - pad}H${w - pad}V${h - pad - m}`].
    join("");
    return svgUri(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient><pattern id="p" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M80 0H0V80" fill="none" stroke="#fff" stroke-opacity="0.05"/></pattern></defs><rect width="${w}" height="${h}" fill="url(#g)"/><rect width="${w}" height="${h}" fill="url(#p)"/><path d="${marks}" fill="none" stroke="#f4ede3" stroke-opacity="0.5" stroke-width="2"/><text x="${pad * 1.5}" y="${pad * 1.5 + capSize}" font-family="ui-monospace, Menlo, monospace" font-size="${capSize}" letter-spacing="3" fill="#f4ede3" fill-opacity="0.7">PLACEHOLDER · ${esc(caption.toUpperCase())}</text><text x="${pad * 1.5}" y="${h - pad * 1.5}" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="${titleSize}" fill="#f8f2ea">${esc(label)}</text></svg>`
    );
  });
}

/** Portrait placeholder: a soft silhouette in a portrait-shaped slot. */
export function portraitSilhouette(): string {
  return memo("portrait", () =>
  svgUri(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMin slice"><defs><filter id="b" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="16"/></filter></defs><g fill="#9a8f83" fill-opacity="0.42" filter="url(#b)"><ellipse cx="400" cy="400" rx="130" ry="160"/><path d="M80 1000C100 780 250 660 400 660s300 120 320 340Z"/></g><ellipse cx="400" cy="400" rx="130" ry="160" fill="none" stroke="#9a8f83" stroke-opacity="0.35" stroke-width="1.5"/><text x="400" y="170" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="17" letter-spacing="3" fill="#9a8f83">PORTRAIT · CLOUDY FACE.WEBP</text></svg>`
  )
  );
}