import React, { useEffect, useRef, useState } from "react";
import { heroData } from "../../data/content";
import { sectionCopy } from "../../data/sectionCopy";
import { gsap } from "../../utils/gsap";

interface PreloaderProps {
  sceneReady: boolean;
  onDone: () => void;
}

/** Tracks fonts + first WebGL frame, then lifts away and hands off to the hero intro. */
export function Preloader({ sceneReady, onDone }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const sceneReadyRef = useRef(sceneReady);
  sceneReadyRef.current = sceneReady;
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let fontsReady = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => fontsReady = true).catch(() => fontsReady = true);
    } else {
      fontsReady = true;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let shown = 0;
    let raf = 0;
    let finished = false;

    const paint = (v: number) => {
      if (countRef.current) countRef.current.textContent = String(Math.round(v * 100)).padStart(2, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${v})`;
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      paint(1);
      const root = rootRef.current;
      if (!root || reduce) {
        onDoneRef.current();
        setGone(true);
        return;
      }
      gsap.
      timeline({ onComplete: () => setGone(true) }).
      to(root.querySelectorAll("[data-pl-item]"), { y: -14, autoAlpha: 0, duration: 0.22, ease: "power3.out", stagger: 0.04 }).
      add(() => onDoneRef.current()).
      to(root, { yPercent: -100, duration: 0.3, ease: "power3.inOut" }, "<");
    };

    const loop = (now: number) => {
      const t = now - start;
      const goal = (fontsReady ? 0.35 : 0.1) + (sceneReadyRef.current ? 0.45 : 0.15) + Math.min(t / 1100, 1) * 0.2;
      shown += (goal - shown) * 0.1;
      if (goal >= 0.999 && shown > 0.985) shown = 1;
      paint(shown);
      if (shown >= 1 || t > 7000) {
        finish();
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg px-5 py-6 md:px-10 md:py-10">
      
      <span data-pl-item className="font-mono text-xs text-muted">
        {sectionCopy.preloader.status}
      </span>
      <p data-pl-item className="font-display text-[clamp(3rem,10vw,9rem)] font-light italic leading-none tracking-[-0.03em] text-ink">
        {heroData.name}
      </p>
      <div className="flex items-end justify-between">
        <span data-pl-item className="font-mono text-xs text-muted">
          {heroData.roles.join(" · ")}
        </span>
        <span data-pl-item className="font-display text-6xl font-light tabular-nums text-ink md:text-8xl">
          <span ref={countRef}>00</span>
        </span>
      </div>
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line">
        <span ref={barRef} className="absolute inset-0 origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
      </span>
    </div>);

}