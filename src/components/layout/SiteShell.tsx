import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { getLenis, useSmoothScroll } from "../../hooks/useSmoothScroll";
import { ScrollTrigger } from "../../utils/gsap";
import { SceneCanvas } from "../scene/SceneCanvas";
import { About } from "../sections/About";
import { Achievements } from "../sections/Achievements";
import { Contact } from "../sections/Contact";
import { FeaturedProject } from "../sections/FeaturedProject";
import { Hero } from "../sections/Hero";
import { Journey } from "../sections/Journey";
import { Projects } from "../sections/Projects";
import { Skills } from "../sections/Skills";
import { Youtube } from "../sections/Youtube";
import { Navbar } from "./Navbar";
import { Preloader } from "./Preloader";

export function SiteShell() {
  const { theme } = useTheme();
  const reduced = usePrefersReducedMotion();
  const [sceneReady, setSceneReady] = useState(false);
  const [ready, setReady] = useState(false);

  useSmoothScroll(!reduced);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Lock scrolling under the preloader, then measure everything once fonts and layout are final.
  useEffect(() => {
    const root = document.documentElement;
    if (!ready) {
      root.classList.add("is-loading");
      getLenis()?.stop();
      return;
    }
    root.classList.remove("is-loading");
    getLenis()?.start();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [ready]);

  const handleSceneReady = useCallback(() => setSceneReady(true), []);
  const handleDone = useCallback(() => setReady(true), []);

  return (
    <div className="w-full bg-bg text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
        
        Skip to content
      </a>

      <Preloader sceneReady={sceneReady} onDone={handleDone} />
      <SceneCanvas theme={theme} reducedMotion={reduced} introPlaying={ready} onReady={handleSceneReady} />
      <div aria-hidden className="grain" />
      <Navbar ready={ready} />

      <main id="main">
        <Hero ready={ready} />
        <About />
        <FeaturedProject />
        <Projects />
        <Skills />
        <Achievements />
        <Journey />
        <Youtube />
        <Contact />
      </main>
    </div>);

}