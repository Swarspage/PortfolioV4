import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { heroData } from "../../data/content";
import { sectionCopy } from "../../data/sectionCopy";
import { resolveAvatar } from "../../utils/assets";
import { gsap } from "../../utils/gsap";
import { countUp } from "../../utils/scrollEffects";
import { useMotionMedia } from "../../hooks/useMotionMedia";
import { scrollToTarget } from "../../hooks/useSmoothScroll";
import { AssetImage } from "../ui/AssetImage";

export function Hero({ ready }: {ready: boolean;}) {
  const rootRef = useRef<HTMLElement>(null);
  const introRef = useRef<gsap.core.Timeline | null>(null);
  const readyRef = useRef(ready);
  readyRef.current = ready;
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  const avatar = resolveAvatar();
  const firstName = heroData.name.split(" ")[0];
  const nameWords = heroData.name.split(" ");
  const roles = heroData.roles;

  useEffect(() => {
    if (!ready || roles.length < 2) return;
    const id = window.setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600);
    return () => window.clearInterval(id);
  }, [ready, roles.length]);

  useMotionMedia(rootRef, ({ desktop, mobile, reduce }, root) => {
    if (reduce) return;
    const q = gsap.utils.selector(root);

    // Intro — inner wrappers only, so it never fights the scroll timeline on the outer wrappers.
    const intro = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 0.3 } });
    intro.
    from(q("[data-intro-ghost]"), { yPercent: 22, autoAlpha: 0 }).
    from(q("[data-intro-portrait]"), { clipPath: "inset(100% 0% 0% 0%)" }, "-=0.12").
    from(q("[data-char]"), { yPercent: 115, stagger: 0.025 }, "-=0.16").
    from(q("[data-intro-fade]"), { y: 14, autoAlpha: 0, stagger: 0.06 }, "-=0.2");
    q("[data-count]").forEach((el) => intro.add(countUp(el), "<"));
    introRef.current = intro;
    if (readyRef.current) intro.progress(1);

    if (desktop) {
      gsap.
      timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "+=90%", pin: true, scrub: 0.6, anticipatePin: 1 }
      }).
      to(q("[data-scrub-ghost]"), { yPercent: -22, scale: 1.1, autoAlpha: 0, ease: "none" }, 0).
      to(q("[data-scrub-copy]"), { y: -70, autoAlpha: 0, ease: "none", duration: 0.7 }, 0).
      to(q("[data-scrub-portrait]"), { yPercent: -8, scale: 0.92, autoAlpha: 0, ease: "none" }, 0.12);
    }

    if (mobile) {
      gsap.
      timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true } }).
      to(q("[data-scrub-ghost]"), { yPercent: -30, autoAlpha: 0, ease: "none" }, 0).
      to(q("[data-scrub-portrait]"), { yPercent: 12, ease: "none" }, 0).
      to(q("[data-scrub-copy]"), { autoAlpha: 0, y: -30, ease: "none", duration: 0.6 }, 0);
    }

    return () => {
      introRef.current = null;
    };
  });

  useEffect(() => {
    if (ready) introRef.current?.play();
  }, [ready]);

  return (
    <section
      id="hero"
      ref={rootRef}
      tabIndex={-1}
      aria-label="Introduction"
      className="h-dvh-screen relative z-[1] min-h-[540px] w-full overflow-hidden outline-none">
      
      {/* Layer 1: oversized type */}
      <div data-scrub-ghost aria-hidden className="pointer-events-none absolute inset-x-0 top-[12dvh] flex select-none justify-center md:top-[5dvh]">
        <span
          data-intro-ghost
          className="block font-display font-light italic leading-[0.8] tracking-[-0.05em] text-ghost text-[clamp(8rem,34vw,36rem)]">
          
          {firstName}
        </span>
      </div>

      {/* Layer 2: portrait (any aspect ratio — cover, top-anchored, masked) */}
      <div
        data-scrub-portrait
        className="absolute inset-x-0 bottom-0 mx-auto h-[72dvh] w-[min(86vw,26rem)] md:h-[84dvh] md:w-[min(40vw,34rem)]">
        
        <div data-intro-portrait className="portrait-frame h-full w-full" style={{ clipPath: "inset(0% 0% 0% 0%)" }}>
          <AssetImage
            asset={avatar}
            alt={`Portrait of ${heroData.name}`}
            loading="eager"
            className="portrait-img h-full w-full object-cover object-top" />
          
        </div>
      </div>

      {/* Layer 3 is the WebGL core (fixed canvas, above this section). Copy sits clear of it. */}
      <div data-scrub-copy className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-5 md:px-10 md:pb-8">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p data-intro-fade className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg px-3 py-1.5 text-xs text-ink">
              <span className="relative flex h-2 w-2">
                <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-accent" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {heroData.availability}
            </p>

            <h1 aria-label={heroData.name} className="mt-4 font-display text-[clamp(2.75rem,7vw,7rem)] font-light leading-[0.92] tracking-[-0.035em] text-ink">
              {nameWords.map((word, wi) =>
              <React.Fragment key={word}>
                  <span aria-hidden className="-mb-[0.1em] inline-block overflow-hidden whitespace-nowrap pb-[0.1em] align-bottom">
                    {Array.from(word).map((ch, ci) =>
                  <span key={ci} data-char className="inline-block">
                        {ch}
                      </span>
                  )}
                  </span>
                  {wi < nameWords.length - 1 ? " " : null}
                </React.Fragment>
              )}
            </h1>

            <p data-intro-fade className="mt-3 flex items-baseline gap-3 text-xl md:text-3xl">
              <span aria-hidden className="text-muted">
                —
              </span>
              <span className="sr-only">{roles.join(", ")}</span>
              <span aria-hidden className="relative inline-flex h-[1.25em] overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={roles[roleIndex]}
                    initial={reduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                    className="block font-display italic leading-[1.25] text-accent">
                    
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
          </div>

          <dl data-intro-fade className="grid grid-cols-3 gap-6 border-t border-line pt-4 md:min-w-[22rem] md:gap-10 md:border-t-0 md:pt-0">
            {heroData.stats.map((stat) =>
            <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="font-mono text-[11px] text-muted">{stat.label}</dt>
                <dd data-count={stat.value} className="font-display text-3xl font-light tabular-nums tracking-tight text-ink md:text-5xl">
                  {stat.value}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <button
          type="button"
          data-intro-fade
          onClick={() => scrollToTarget("#about")}
          className="mx-auto mt-6 flex flex-col items-center gap-2 font-mono text-[11px] text-muted transition-colors duration-200 ease-out hover:text-ink">
          
          <span>{sectionCopy.hero.scroll}</span>
          <span aria-hidden className="scroll-cue-line" />
        </button>
      </div>
    </section>);

}