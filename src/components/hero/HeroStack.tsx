import React, { useRef } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useStackScene } from '../../hooks/useStackScene';
import { STACK_TIMELINE } from '../../utils/stackTimeline';
import { HeroTitle } from './HeroTitle';
import { LayerCaptions } from './LayerCaptions';

interface HeroStackProps {
  revealed: boolean;
  showPortrait: boolean;
}

/** Hero + the pinned "exploded stack" teardown share one sticky viewport and one WebGL canvas. */
export function HeroStack({ revealed, showPortrait }: HeroStackProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v;
  });
  const { failed } = useStackScene({ canvasRef, progressRef });

  const heroOpacity = useTransform(scrollYProgress, [0, STACK_TIMELINE.heroFadeEnd], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, STACK_TIMELINE.heroFadeEnd], [0, -90]);
  const canvasOpacity = useTransform(scrollYProgress, [0.94, 1], [1, 0]);

  return (
    <section ref={sectionRef} id="top" data-nav="dark" className="relative h-[360vh] bg-ink md:h-[440vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <GridBackdrop />
        <motion.div
          className="absolute inset-0"
          style={{ opacity: canvasOpacity }}
          initial={{ scale: 1.06 }}
          animate={revealed ? { scale: 1 } : {}}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}>
          
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
          {failed && <StaticStack />}
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: heroOpacity, y: heroY }}>
          <HeroTitle revealed={revealed} showPortrait={showPortrait} />
        </motion.div>
        <LayerCaptions progress={scrollYProgress} />
      </div>
    </section>);

}

function GridBackdrop() {
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <pattern id="hero-grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M64 0H0V64" fill="none" stroke="#18181B" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
    </svg>);

}

/** Fallback when WebGL is unavailable: a CSS isometric stack. */
function StaticStack() {
  return (
    <div className="absolute inset-0 grid place-items-center md:justify-end md:pr-[12vw]" aria-hidden>
      <div
        className="relative h-48 w-48 md:h-64 md:w-64"
        style={{ transform: 'rotateX(58deg) rotateZ(-45deg)', transformStyle: 'preserve-3d' }}>
        
        {[0, 1, 2, 3].map((i) =>
        <div
          key={i}
          className="absolute inset-0 border border-signal bg-char"
          style={{ transform: `translateZ(${(3 - i) * 36}px)` }} />

        )}
      </div>
    </div>);

}