import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { heroData } from "../../data/content";
import { sectionCopy } from "../../data/sectionCopy";
import { gsap } from "../../utils/gsap";
import { countUp } from "../../utils/scrollEffects";
import { useMotionMedia } from "../../hooks/useMotionMedia";
import { scrollToTarget } from "../../hooks/useSmoothScroll";

export function Hero({ ready }: {ready: boolean;}) {
  const rootRef = useRef<HTMLElement>(null);
  const introRef = useRef<gsap.core.Timeline | null>(null);
  const readyRef = useRef(ready);
  readyRef.current = ready;
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

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

    // Intro — bring the hero typography and copy into the landing view.
    const intro = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
    intro
      .fromTo(
        q("[data-intro-ghost]"),
        { yPercent: 18, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 1.1 },
        0
      )
      .fromTo(
        q("[data-char]"),
        { yPercent: 115, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, stagger: 0.025, duration: 0.75 },
        0.28
      )
      .fromTo(
        q("[data-intro-fade]"),
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.75 },
        0.38
      );
    q("[data-count]").forEach((el) => intro.add(countUp(el), 0.45));
    introRef.current = intro;
    if (readyRef.current) intro.play();

    if (desktop) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1
          }
        })
        .to(q("[data-scrub-ghost]"), { yPercent: -22, scale: 1.1, autoAlpha: 0, ease: "none", duration: 0.6 }, 0)
        .to(q("[data-scrub-copy]"), { y: -70, autoAlpha: 0, ease: "none", duration: 0.65 }, 0);
    }

    if (mobile) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0.8
          }
        })
        .to(q("[data-scrub-ghost]"), { yPercent: -30, autoAlpha: 0, ease: "none", duration: 0.6 }, 0)
        .to(q("[data-scrub-copy]"), { autoAlpha: 0, y: -30, ease: "none", duration: 0.6 }, 0);
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
      className="h-dvh-screen relative min-h-[580px] w-full overflow-hidden outline-none"
    >
      {/* Layer 1: Background Atmosphere, Watermark & Celestial Orbits (z-[1], behind 3D canvas at z-[2]) */}
      <div
        data-scrub-ghost
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center select-none overflow-hidden"
      >
        {/* Soft studio ambient corner glows */}
        <div className="absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 h-[520px] w-[520px] rounded-full bg-accent/15 blur-[130px]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[340px] w-[680px] rounded-full bg-accent/[0.04] blur-[110px]" />

        {/* Large graceful cursive script watermark centered behind the 3D sphere */}
        <span
          data-intro-ghost
          className="block font-script italic text-ghost text-[clamp(11rem,26vw,26rem)] leading-none select-none tracking-normal -translate-y-4 md:-translate-y-8"
          style={{ opacity: 0.055 }}
        >
          {firstName}
        </span>

        {/* Celestial Orbital Trajectory Rings & Glowing Satellite Node */}
        <svg
          viewBox="0 0 1000 1000"
          className="absolute inset-0 h-full w-full pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="orbit-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d9622b" stopOpacity="0.05" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="75%" stopColor="#d9622b" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#d9622b" stopOpacity="0.08" />
            </linearGradient>
            <radialGradient id="satellite-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffa05c" stopOpacity="1" />
              <stop offset="40%" stopColor="#e07038" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d9622b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Primary Orbit Ellipse with satellite dot (tilted ~17°) */}
          <g transform="rotate(-17 500 500)">
            <ellipse
              cx="500"
              cy="500"
              rx="375"
              ry="142"
              fill="none"
              stroke="url(#orbit-grad-1)"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              className="opacity-75"
            />
            {/* Satellite Node on the primary orbit */}
            <circle cx="828" cy="460" r="14" fill="url(#satellite-glow)" />
            <circle cx="828" cy="460" r="3.5" fill="#ffa870" />
            <circle cx="828" cy="460" r="1.5" fill="#ffffff" />
          </g>

          {/* Secondary Sweeping Orbit Ellipse */}
          <g transform="rotate(30 500 500)">
            <ellipse
              cx="500"
              cy="500"
              rx="480"
              ry="185"
              fill="none"
              stroke="rgba(245, 238, 230, 0.04)"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>

      {/* Layer 2: Copy & Metrics Layout sits above the 3D scene for crisp interaction */}
      <div
        data-scrub-copy
        className="relative z-[4] mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pt-24 pb-8 md:px-12 md:pt-28 md:pb-10 lg:px-16"
      >
        {/* Main Grid: Left copy, Center 3D stage, Right stats */}
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(300px,440px)_1fr_auto] w-full flex-1 items-center gap-6 lg:gap-12 my-auto">
          {/* Left Column: Badge, Stacked Name, Role, Tagline, Scroll */}
          <div className="flex flex-col items-start z-[5] w-full max-w-[460px]">
            <p
              data-intro-fade
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-raised/70 backdrop-blur-md px-3.5 py-1.5 text-xs text-ink/90 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-accent" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {heroData.availability}
            </p>

            <h1
              aria-label={heroData.name}
              className="mt-4 md:mt-5 font-serif font-light text-[clamp(2.75rem,7.2vw,7.2rem)] leading-[0.92] tracking-[-0.035em] text-ink"
            >
              {nameWords.map((word) => (
                <span key={word} className="block overflow-hidden whitespace-nowrap">
                  {Array.from(word).map((ch, ci) => (
                    <span key={ci} data-char className="inline-block">
                      {ch}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p data-intro-fade className="mt-3 md:mt-4 flex items-center gap-3 text-xl md:text-3xl">
              <span aria-hidden className="text-muted/60 font-light select-none">
                —
              </span>
              <span className="sr-only">{roles.join(", ")}</span>
              <span aria-hidden className="relative inline-flex h-[1.3em] overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={roles[roleIndex]}
                    initial={reduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={reduceMotion ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                    className="block font-serif italic font-normal leading-[1.3] text-accent tracking-wide"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>

            <p
              data-intro-fade
              className="mt-4 md:mt-6 max-w-[360px] font-mono text-xs md:text-[13px] leading-relaxed text-muted/90"
            >
              {sectionCopy.hero.tagline}
            </p>

            {/* Desktop Scroll Prompt */}
            <button
              type="button"
              data-intro-fade
              onClick={() => scrollToTarget("#about")}
              aria-label="Scroll to about section"
              className="hidden lg:inline-flex group mt-8 md:mt-12 items-center gap-3 text-muted transition-colors duration-200 hover:text-ink focus:outline-none"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-raised/40 transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10 group-hover:scale-105">
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
              <span className="font-mono text-xs tracking-wider text-muted group-hover:text-ink transition-colors duration-200">
                {sectionCopy.hero.scroll}
              </span>
            </button>
          </div>

          {/* Center Column Spacer: keeps center open for prominent 3D sphere on all viewports */}
          <div aria-hidden className="min-h-[200px] sm:min-h-[240px] lg:min-h-[300px] pointer-events-none" />

          {/* Right Column: Vertically stacked metric stats on desktop, responsive strip on mobile */}
          <div className="flex flex-col items-start lg:items-end justify-center z-[5] w-full lg:w-auto">
            <dl data-intro-fade className="grid grid-cols-3 gap-3 w-full sm:gap-6 lg:flex lg:flex-col lg:gap-10 lg:w-auto">
              {heroData.stats.map((stat) => (
                <div key={stat.label} className="relative pl-3 md:pl-5 group">
                  {/* Vertical accent bar */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-1 bottom-1 w-[2px] rounded-full bg-accent/60 group-hover:bg-accent transition-colors duration-200"
                  />

                  <dd
                    data-count={stat.value}
                    className="font-serif text-2xl sm:text-3xl lg:text-5xl font-light tracking-tight text-ink tabular-nums"
                  >
                    {stat.value}
                  </dd>
                  <dt className="mt-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-accent font-medium">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            {/* Mobile Scroll Prompt */}
            <button
              type="button"
              data-intro-fade
              onClick={() => scrollToTarget("#about")}
              aria-label="Scroll to about section"
              className="lg:hidden mx-auto mt-6 inline-flex items-center gap-2.5 text-muted transition-colors duration-200 hover:text-ink focus:outline-none"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full border border-line bg-raised/40">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
              <span className="font-mono text-xs tracking-wider text-muted">
                {sectionCopy.hero.scroll}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
