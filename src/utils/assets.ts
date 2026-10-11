import { achievementImages } from "../data/achievementImages";
import { siteConfig } from "../data/siteConfig";
import type { ProjectItem, SkillItem } from "../types/content";
import { monogramTile, plate, portraitSilhouette } from "./placeholders";

/**
 * The single asset resolver.
 * Every file under "src/All data/" is discovered at build time with import.meta.glob.
 * A reference resolves to the real file when it exists, otherwise to a designed placeholder.
 * Drop a real file at the same path and it appears automatically — no code changes.
 */

export interface ResolvedAsset {
  src: string;
  placeholder: string;
  isPlaceholder: boolean;
  path: string;
}

const ROOT_MARKER = "all data/";

function loadAssetModules(): Record<string, string> {
  try {
    // @ts-ignore — import.meta.glob is provided by Vite at build time.
    const modules = import.meta.glob(
      [
        "/src/All data/**/*.{webp,png,jpg,jpeg,avif,gif,svg,pdf}",
        "/src/All data/*.{webp,png,jpg,jpeg,avif,gif,svg,pdf}",
        "/src/src/All data/**/*.{webp,png,jpg,jpeg,avif,gif,svg,pdf}",
        "/src/src/All data/*.{webp,png,jpg,jpeg,avif,gif,svg,pdf}"
      ],
      { eager: true, query: "?url", import: "default" }
    ) as Record<string, string>;
    return modules ?? {};
  } catch {
    return {};
  }
}

const byPath = new Map<string, string>();
const byName = new Map<string, string>();

for (const [key, url] of Object.entries(loadAssetModules())) {
  if (typeof url !== "string") continue;
  const lower = key.replace(/\\/g, "/").toLowerCase();
  const at = lower.indexOf(ROOT_MARKER);
  const rel = at >= 0 ? lower.slice(at + ROOT_MARKER.length) : lower.replace(/^\/+/, "");
  if (rel.includes("/backups/")) continue;
  byPath.set(rel, url);
  const name = rel.split("/").pop() ?? rel;
  if (!byName.has(name)) byName.set(name, url);
}

export function normalizeAssetRef(ref: string): string {
  let r = ref.trim().replace(/\\/g, "/").split("?")[0].toLowerCase();
  const at = r.indexOf(ROOT_MARKER);
  if (at >= 0) r = r.slice(at + ROOT_MARKER.length);
  return r.replace(/^(\.\.?\/)+/, "").replace(/^\/+/, "");
}

/** Real URL for a reference such as "../assets/Singularity.webp", "/Swar-Res.pdf" or "Cloudy Face.webp". */
export function findAssetUrl(ref: string): string | null {
  if (!ref) return null;
  if (/^(https?:|data:|blob:)/i.test(ref)) return ref;
  const n = normalizeAssetRef(ref);
  return byPath.get(n) ?? byPath.get(`assets/${n}`) ?? byName.get(n.split("/").pop() ?? "") ?? null;
}

function resolve(ref: string, placeholder: string): ResolvedAsset {
  const url = findAssetUrl(ref);
  return { src: url ?? placeholder, placeholder, isPlaceholder: !url, path: ref };
}

function fileName(ref: string): string {
  return ref.split("/").pop() ?? ref;
}

export function resolveAvatar(): ResolvedAsset {
  return resolve("Swar Portrait Cutout.png", portraitSilhouette());
}

export function resolveSkillIcon(skill: SkillItem): ResolvedAsset {
  return resolve(`assets/${skill.icon}`, monogramTile(skill.skill, skill.glow));
}

export function resolveProjectImage(project: ProjectItem): ResolvedAsset {
  return resolve(project.imageSrc, plate(project.name, fileName(project.imageSrc)));
}

export function resolveAchievementImage(title: string): ResolvedAsset {
  const path = achievementImages[title] ?? "";
  return resolve(path, plate(title, path ? fileName(path) : "Achievements"));
}

export function resolveThumbnail(thumbnail: string, title: string): ResolvedAsset {
  const ref = /^(https?:|data:)/i.test(thumbnail) || thumbnail.includes("/") ? thumbnail : `assets/${thumbnail}`;
  return resolve(ref, plate(title.replace(/^Placeholder:\s*/i, ""), thumbnail, "wide"));
}

export function resolveBanner(): ResolvedAsset {
  return resolve("assets/utubebanner.webp", plate("On YouTube", "utubebanner.webp", "banner"));
}

export function resolveSocialIcon(file: string, label: string): ResolvedAsset {
  return resolve(`assets/${file}`, monogramTile(label, "#2a2420"));
}

export function resolveResumeUrl(link: string): string {
  return findAssetUrl(link) ?? siteConfig.resumeFallbackUrl;
}

export function hasRealAsset(ref: string): boolean {
  return findAssetUrl(ref) !== null;
}
