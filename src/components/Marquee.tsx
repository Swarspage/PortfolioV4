import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { skills } from '../data/skills';

const WORDS = skills.slice(0, 10).map((s) => s.name);

/** Two crossing bands that slide with scroll — the seam between the 3D intro and the content. */
export function Marquee() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const xA = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const xB = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);

  return (
    <section ref={ref} data-nav="dark" aria-hidden className="relative overflow-x-clip bg-ink py-16 md:py-24">
      <div className="-rotate-2">
        <Band x={xA} className="bg-signal text-ink" />
      </div>
      <div className="-mt-2 rotate-[1.5deg]">
        <Band x={xB} className="border-y border-line bg-char text-bone" />
      </div>
    </section>);

}

function Band({ x, className }: {x: MotionValue<string>;className: string;}) {
  const row = [...WORDS, ...WORDS, ...WORDS];
  return (
    <div className={`w-[200%] py-3 md:py-5 ${className}`}>
      <motion.div style={{ x }} className="flex w-max items-center gap-6 md:gap-10">
        {row.map((word, i) =>
        <span key={`${word}-${i}`} className="flex items-center gap-6 md:gap-10">
            <span className="wide whitespace-nowrap font-display text-3xl font-black uppercase tracking-tight md:text-6xl">
              {word}
            </span>
            <span className="h-2.5 w-2.5 shrink-0 bg-current md:h-3.5 md:w-3.5" />
          </span>
        )}
      </motion.div>
    </div>);

}