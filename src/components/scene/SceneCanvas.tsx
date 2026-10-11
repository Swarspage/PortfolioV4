import React, { useEffect, useRef, useState } from "react";
import { skillsData } from "../../data/content";
import { SKILL_CATEGORIES } from "../../types/content";
import { ScrollTrigger } from "../../utils/gsap";
import { hasWebGL, readAccent } from "../../utils/webgl";
import { PIN_MEDIA } from "../../hooks/useMotionMedia";
import { OrbitalEngine, type SceneTheme } from "./OrbitalEngine";
import { makeFrame } from "./sceneFrame";
import { getKeyframeDefs, getStaticFrame } from "./sceneKeyframes";
import { sceneSignals } from "./sceneSignals";
import { SceneFallback } from "./SceneFallback";

interface SceneCanvasProps {
  theme: SceneTheme;
  reducedMotion: boolean;
  introPlaying: boolean;
  onReady: () => void;
}

/** The one persistent WebGL canvas, fixed behind the page. */
export function SceneCanvas({ theme, reducedMotion, introPlaying, onReady }: SceneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<OrbitalEngine | null>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const [supported, setSupported] = useState(() => hasWebGL());

  useEffect(() => {
    if (!supported) {
      onReadyRef.current();
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const desktop = window.matchMedia(PIN_MEDIA).matches;
    const compact = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;

    let engine: OrbitalEngine;
    try {
      engine = new OrbitalEngine({
        canvas,
        compact,
        reducedMotion,
        theme: themeRef.current,
        accent: readAccent(),
        skillColors: skillsData.map((s) => s.glow),
        skillCategories: skillsData.map((s) => Math.max(0, SKILL_CATEGORIES.indexOf(s.category))),
        categoryCount: SKILL_CATEGORIES.length,
        staticFrame: getStaticFrame(desktop),
        onFirstFrame: () => onReadyRef.current()
      });
    } catch {
      setSupported(false);
      return;
    }
    engineRef.current = engine;
    engine.start();

    // Keyframes are anchored to section edges; refreshPriority -1 so pins are measured first.
    const triggers = reducedMotion ?
    [] :
    getKeyframeDefs(desktop).flatMap((def) => {
      const el = document.querySelector(def.target);
      if (!el) return [];
      return [{ st: ScrollTrigger.create({ trigger: el, start: def.start, refreshPriority: -1 }), frame: makeFrame(def.frame) }];
    });
    const sync = () =>
    engine.setKeyframes(triggers.map((t) => ({ at: t.st.start, frame: t.frame })).sort((a, b) => a.at - b.at));
    ScrollTrigger.addEventListener("refresh", sync);
    sync();

    const onPointer = (e: PointerEvent) => {
      sceneSignals.pointerX = e.clientX / window.innerWidth * 2 - 1;
      sceneSignals.pointerY = e.clientY / window.innerHeight * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointer);
      ScrollTrigger.removeEventListener("refresh", sync);
      triggers.forEach((t) => t.st.kill());
      engine.dispose();
      engineRef.current = null;
    };
  }, [supported, reducedMotion]);

  useEffect(() => {
    engineRef.current?.setTheme(theme, readAccent());
  }, [theme]);

  useEffect(() => {
    if (introPlaying) engineRef.current?.playIntro();
  }, [introPlaying]);

  if (!supported) return <SceneFallback />;

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[2] block h-full w-full" />;
}