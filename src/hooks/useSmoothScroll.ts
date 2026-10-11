import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../utils/gsap";

let lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      if (lenis === instance) lenis = null;
    };
  }, [enabled]);
}

export function scrollToTarget(selector: string) {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  const focus = () => el.focus({ preventScroll: true });
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.2, onComplete: focus });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  focus();
}