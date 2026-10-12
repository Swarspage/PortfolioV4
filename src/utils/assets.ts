// Asset resolver using Vite's eager import.meta.glob to load assets from 'src/All data'

const assetModules = import.meta.glob<{ default: string }>(
  [
    '/src/All data/**/*.{webp,png,jpg,jpeg,avif,gif,svg,pdf}',
    '/src/All data/*.{webp,png,jpg,jpeg,avif,gif,svg,pdf}'
  ],
  { eager: true }
);

const assetMap = new Map<string, string>();

for (const [path, mod] of Object.entries(assetModules)) {
  const url = mod.default || (mod as unknown as string);
  if (!url || typeof url !== 'string') continue;

  const normalized = path.replace(/\\/g, '/');
  // Full path
  assetMap.set(normalized.toLowerCase(), url);

  // Extract relative after 'All data/'
  const marker = '/all data/';
  const idx = normalized.toLowerCase().indexOf(marker);
  if (idx !== -1) {
    const rel = normalized.slice(idx + marker.length).toLowerCase();
    assetMap.set(rel, url);
    // If inside assets/, also map without 'assets/' prefix
    if (rel.startsWith('assets/')) {
      assetMap.set(rel.slice('assets/'.length), url);
    }
    // Map just filename
    const filename = rel.split('/').pop();
    if (filename) {
      assetMap.set(filename, url);
    }
  }
}

/**
 * Resolves a filename or relative path (e.g., 'Singularity.webp', '../assets/sims.webp', 'CSITechLead.webp')
 * to its Vite-bundled URL.
 */
export function getAssetUrl(ref: string | null | undefined): string | null {
  if (!ref) return null;
  if (/^(https?:|data:|blob:)/i.test(ref)) return ref;

  const clean = ref
    .trim()
    .replace(/\\/g, '/')
    .replace(/^(\.\.\/)+/, '')
    .replace(/^\/+/, '')
    .toLowerCase();

  if (assetMap.has(clean)) {
    return assetMap.get(clean)!;
  }

  // Try checking just the filename
  const filename = clean.split('/').pop()?.toLowerCase();
  if (filename && assetMap.has(filename)) {
    return assetMap.get(filename)!;
  }

  // Try checking with assets/ prefix
  if (assetMap.has(`assets/${clean}`)) {
    return assetMap.get(`assets/${clean}`)!;
  }

  return null;
}
