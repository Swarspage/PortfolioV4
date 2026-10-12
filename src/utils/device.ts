export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isCoarsePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

/** Phones, tablets and weak laptops get the lite 3D path (lower DPR, fewer packets, no AA). */
export function isLowPower(): boolean {
  if (typeof navigator === 'undefined') return true;
  const nav = navigator as Navigator & {deviceMemory?: number;};
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  return isCoarsePointer() || cores <= 4 || memory <= 4;
}