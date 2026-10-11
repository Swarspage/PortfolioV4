import type { SceneFrame } from "./sceneFrame";

// Scroll storyboard. Each keyframe is anchored to a section edge via ScrollTrigger "start" syntax.
export interface KeyframeDef {
  target: string;
  start: string;
  frame: Partial<SceneFrame>;
}

const HERO_DESKTOP: Partial<SceneFrame> = { core: 1, x: 0, y: -0.02, scale: 1.05, orbit: 1, tilt: 0.38 };
const ABOUT_DESKTOP: Partial<SceneFrame> = { core: 1, x: -0.82, y: 0.3, scale: 0.95, seam: 0.42, orbit: 0.25, tilt: 0.2 };
const PLANET_DESKTOP: Partial<SceneFrame> = { planet: 1, x: 0.42, y: 0, scale: 1.12, atmo: 1, orbit: 1, tilt: 0.42 };
const PLANET_FAR_DESKTOP: Partial<SceneFrame> = { planet: 1, x: 0.92, y: 0.62, scale: 0.48, atmo: 0.7, orbit: 0.5, tilt: 0.42 };
const GRID_DESKTOP: Partial<SceneFrame> = { grid: 1, x: 0.42, y: 0.04, scale: 1, tint: 1, tilt: 0 };
const RING_DESKTOP: Partial<SceneFrame> = { ring: 1, x: 0, y: -0.05, scale: 1, tilt: 0 };

const DESKTOP: KeyframeDef[] = [
{ target: "#hero", start: "top top", frame: HERO_DESKTOP },
{ target: "#about", start: "top bottom", frame: { core: 1, x: 0, y: 0, scale: 1.3, seam: 0.12, orbit: 0.7, tilt: 0.3 } },
{ target: "#about", start: "top 25%", frame: ABOUT_DESKTOP },
{ target: "#about", start: "bottom 75%", frame: { ...ABOUT_DESKTOP, y: -0.1 } },
{ target: "#singularity", start: "top top", frame: PLANET_DESKTOP },
{ target: "#projects", start: "top bottom", frame: PLANET_DESKTOP },
{ target: "#projects", start: "top 30%", frame: PLANET_FAR_DESKTOP },
{ target: "#projects", start: "bottom bottom", frame: PLANET_FAR_DESKTOP },
{ target: "#skills", start: "top top", frame: GRID_DESKTOP },
{ target: "#achievements", start: "top bottom", frame: GRID_DESKTOP },
{ target: "#achievements", start: "top top", frame: RING_DESKTOP },
{ target: "#journey", start: "top bottom", frame: RING_DESKTOP },
{ target: "#journey", start: "top 25%", frame: { core: 1, x: -0.9, y: 0.25, scale: 0.62, seam: 0.08, orbit: 0.5, tilt: 0.35 } },
{ target: "#youtube", start: "top 35%", frame: { core: 1, x: 0.92, y: -0.35, scale: 0.55, seam: 0.18, orbit: 0.4, tilt: 0.3 } },
{ target: "#contact", start: "top 35%", frame: { core: 1, x: 0.55, y: 0.32, scale: 0.95, orbit: 1, tilt: 0.38 } }];


const HERO_MOBILE: Partial<SceneFrame> = { core: 1, x: 0, y: 0, scale: 1.0, orbit: 1, tilt: 0.38 };

const MOBILE: KeyframeDef[] = [
{ target: "#hero", start: "top top", frame: HERO_MOBILE },
{ target: "#about", start: "top bottom", frame: { core: 1, x: 0, y: 0.05, scale: 1.15, seam: 0.15, orbit: 0.7, tilt: 0.3 } },
{ target: "#about", start: "top 25%", frame: { core: 1, x: 0.15, y: 0.25, scale: 0.85, seam: 0.35, orbit: 0.35, tilt: 0.2 } },
{ target: "#singularity", start: "top 60%", frame: { planet: 1, x: 0, y: 0.15, scale: 0.95, atmo: 1, orbit: 1, tilt: 0.42 } },
{ target: "#projects", start: "top 30%", frame: { planet: 1, x: 0.2, y: 0.3, scale: 0.75, atmo: 0.7, orbit: 0.5, tilt: 0.42 } },
{ target: "#skills", start: "top 60%", frame: { grid: 1, x: 0, y: 0.15, scale: 0.85, tint: 1, tilt: 0 } },
{ target: "#achievements", start: "top 60%", frame: { ring: 1, x: 0, y: 0.05, scale: 0.85, tilt: 0 } },
{ target: "#journey", start: "top 40%", frame: { core: 1, x: 0, y: 0.2, scale: 0.7, seam: 0.08, orbit: 0.5, tilt: 0.35 } },
{ target: "#contact", start: "top 50%", frame: { core: 1, x: 0, y: 0.15, scale: 0.95, orbit: 1, tilt: 0.38 } }];


export function getKeyframeDefs(desktop: boolean): KeyframeDef[] {
  return desktop ? DESKTOP : MOBILE;
}

export function getStaticFrame(desktop: boolean): Partial<SceneFrame> {
  return desktop ? HERO_DESKTOP : HERO_MOBILE;
}