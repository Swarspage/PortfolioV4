// One "frame" of the Singularity Core: formation weights + placement + look.
export interface SceneFrame {
  core: number; // compact singularity sphere
  planet: number; // Singularity planet (terrain, atmosphere, telemetry nodes)
  grid: number; // tech-stack wall + floor lattice
  ring: number; // achievements orbit track
  x: number; // -1..1 of half viewport width
  y: number; // -1..1 of half viewport height
  scale: number;
  seam: number; // tiles breathe apart
  atmo: number;
  orbit: number;
  tint: number; // skill colours
  tilt: number;
}

export interface TimedFrame {
  at: number; // scroll px
  frame: SceneFrame;
}

export const FRAME_KEYS: (keyof SceneFrame)[] = [
"core",
"planet",
"grid",
"ring",
"x",
"y",
"scale",
"seam",
"atmo",
"orbit",
"tint",
"tilt"];


export const DEFAULT_FRAME: SceneFrame = {
  core: 1,
  planet: 0,
  grid: 0,
  ring: 0,
  x: 0,
  y: 0,
  scale: 1,
  seam: 0,
  atmo: 0,
  orbit: 0,
  tint: 0,
  tilt: 0.3
};

export function makeFrame(partial: Partial<SceneFrame>): SceneFrame {
  const otherFormation = (partial.planet ?? 0) + (partial.grid ?? 0) + (partial.ring ?? 0) > 0;
  return { ...DEFAULT_FRAME, core: otherFormation ? 0 : 1, ...partial };
}

export function lerpFrame(out: SceneFrame, a: SceneFrame, b: SceneFrame, t: number): SceneFrame {
  for (const key of FRAME_KEYS) out[key] = a[key] + (b[key] - a[key]) * t;
  return out;
}