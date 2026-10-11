import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "../utils/gsap";

export const PIN_MEDIA = "(min-width: 1024px) and (min-height: 640px)";

export const MOTION_QUERIES = {
  desktop: `${PIN_MEDIA} and (prefers-reduced-motion: no-preference)`,
  mobile:
  "(prefers-reduced-motion: no-preference) and (max-width: 1023px), (prefers-reduced-motion: no-preference) and (max-height: 639px)",
  reduce: "(prefers-reduced-motion: reduce)"
};

export interface MotionConditions {
  desktop: boolean;
  mobile: boolean;
  reduce: boolean;
}

type Setup = (conditions: MotionConditions, root: HTMLElement) => void | (() => void);

/** Runs scroll choreography per breakpoint/motion preference and reverts everything on change or unmount. */
export function useMotionMedia(scope: RefObject<HTMLElement>, setup: Setup) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(
      MOTION_QUERIES,
      (context) => setup(context.conditions as unknown as MotionConditions, root),
      root
    );
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}