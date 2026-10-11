export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function readAccent(): string {
  if (typeof window === "undefined") return "#d9622b";
  const value = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  return value || "#d9622b";
}