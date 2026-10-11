// Precomputed target positions for every tile in each formation.
export interface Formations {
  count: number;
  dirs: Float32Array; // unit sphere directions (core + planet)
  terrain: Float32Array; // planet relief
  grid: Float32Array; // skills wall + floor lattice
  gridN: Float32Array;
  gridScale: Float32Array;
  ring: Float32Array; // achievements orbit track (untransformed)
  seeds: Float32Array; // 3 randoms per tile
  skillSlot: Int16Array; // tile -> skill index (or -1)
  skillCat: Int16Array; // skill index -> category index
}

function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = s + 0x6d2b79f5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function buildFormations(count: number, skillCategories: number[], categoryCount: number, compact: boolean): Formations {
  const rand = mulberry32(2006);
  const dirs = new Float32Array(count * 3);
  const terrain = new Float32Array(count);
  const grid = new Float32Array(count * 3);
  const gridN = new Float32Array(count * 3);
  const gridScale = new Float32Array(count);
  const ring = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 3);
  const skillSlot = new Int16Array(count).fill(-1);
  const skillCat = Int16Array.from(skillCategories);

  // Fibonacci sphere — even tiling, no poles bunching.
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i + 0.5) / count * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const x = Math.cos(th) * r;
    const z = Math.sin(th) * r;
    dirs.set([x, y, z], i * 3);
    terrain[i] = 0.055 * (Math.sin(x * 3.4 + 1.1) * Math.cos(y * 2.6 - 0.4) + 0.6 * Math.sin(z * 4.6 + 0.8) * Math.cos(x * 1.9));
    seeds.set([rand(), rand(), rand()], i * 3);
  }

  // Spread skill tiles evenly through the sphere so the break-apart reads as the whole body opening.
  const skillCount = skillCategories.length;
  const used = new Set<number>();
  for (let k = 0; k < skillCount; k++) {
    let idx = Math.min(count - 1, Math.floor((k + 0.5) * count / skillCount));
    while (used.has(idx)) idx = (idx + 1) % count;
    used.add(idx);
    skillSlot[idx] = k;
  }

  // Skills wall: one column per category.
  const perCat: number[][] = Array.from({ length: categoryCount }, () => []);
  skillCategories.forEach((c, k) => perCat[c]?.push(k));
  const wall = new Map<number, [number, number]>();
  perCat.forEach((list, c) =>
  list.forEach((k, r) => wall.set(k, [(c - (categoryCount - 1) / 2) * 0.84, ((list.length - 1) / 2 - r) * 0.66]))
  );

  // Floor lattice: every other tile becomes the ground the stack stands on.
  const cols = compact ? 16 : 26;
  const spacing = 0.6;
  let floorIndex = 0;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const slot = skillSlot[i];
    if (slot >= 0) {
      const [gx, gy] = wall.get(slot) ?? [0, 0];
      grid.set([gx, gy, 0.4], i3);
      gridN.set([0, 0, 1], i3);
      gridScale[i] = 1.55;
    } else {
      const col = floorIndex % cols;
      const row = Math.floor(floorIndex / cols);
      floorIndex++;
      grid.set([(col - (cols - 1) / 2) * spacing, -3.15, -0.8 - row * spacing], i3);
      gridN.set([0, 0.94, 0.34], i3);
      gridScale[i] = 1.75;
    }
  }

  // Orbit track: three precise lanes.
  const lanes = 3;
  const perLane = Math.ceil(count / lanes);
  for (let i = 0; i < count; i++) {
    const lane = i % lanes;
    const k = Math.floor(i / lanes);
    const a = k / perLane * Math.PI * 2 + lane * (Math.PI / perLane);
    const rad = 4.5 + (lane - 1) * 0.42;
    ring.set([Math.cos(a) * rad, (rand() - 0.5) * 0.06, Math.sin(a) * rad], i * 3);
  }

  return { count, dirs, terrain, grid, gridN, gridScale, ring, seeds, skillSlot, skillCat };
}