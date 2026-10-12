/** Shared scroll choreography between the WebGL stack and the HTML captions (progress 0 → 1). */
export const STACK_TIMELINE = {
  heroFadeEnd: 0.12,
  explodeStart: 0.13,
  explodeEnd: 0.42,
  captionStart: 0.24,
  captionStep: 0.115,
  captionHold: 0.095,
  dismantleStart: 0.7,
  dismantleEnd: 0.94,
  finaleStart: 0.73,
  finaleEnd: 0.97
};

export function captionRange(index: number): [number, number] {
  const start = STACK_TIMELINE.captionStart + index * STACK_TIMELINE.captionStep;
  return [start, start + STACK_TIMELINE.captionHold];
}

export function activeLayerIndex(progress: number, count: number): number {
  for (let i = 0; i < count; i++) {
    const [start, end] = captionRange(i);
    if (progress >= start - 0.015 && progress <= end + 0.015) return i;
  }
  return -1;
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}