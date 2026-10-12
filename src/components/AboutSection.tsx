import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { profile } from '../data/profile';
import { Placeholder } from './Placeholder';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress: enter } = useScroll({ target: sectionRef, offset: ['start end', 'start start'] });
  const clipPath = useTransform(
    enter,
    [0, 1],
    ['inset(7% 5% 0% 5% round 40px)', 'inset(0% 0% 0% 0% round 0px)']
  );
  const { scrollYProgress: read } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.5'] });
  const words = profile.about.lead.split(' ');
  const [hero, ...rest] = profile.stats;

  return (
    <section ref={sectionRef} id="about" data-nav="light" className="relative bg-ink">
      <motion.div style={{ clipPath }} className="bg-bone px-5 py-24 text-ink md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-smoke">About</h2>
            <div className="mt-6 aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-[18px] border border-ink/15 shadow-sm">
              <Placeholder
                variant="portrait"
                src={profile.about.image || profile.portrait}
                label="Swar Shinde · Portrait"
                tone="light"
                className="h-full w-full object-cover object-top" />
            </div>
          </div>

          <div className="md:col-span-9">
            <p
              ref={textRef}
              className="font-display text-[clamp(1.75rem,3.8vw,3.6rem)] font-bold leading-[1.1] tracking-[-0.02em]">
              
              {words.map((word, i) =>
              <Word key={`${word}-${i}`} progress={read} range={[i / words.length, (i + 1) / words.length]}>
                  {word}
                </Word>
              )}
            </p>

            <div className="mt-12 grid gap-6 text-base leading-relaxed text-smoke md:mt-16 md:grid-cols-2 md:gap-10 md:text-lg">
              {profile.about.paragraphs.map((p) =>
              <p key={p.slice(0, 24)}>{p}</p>
              )}
            </div>

            <div className="mt-14 grid gap-8 border-t border-ink/15 pt-8 md:mt-20 md:grid-cols-12 md:items-end">
              <div className="md:col-span-6">
                <p className="wide font-display text-[5.5rem] font-black leading-[0.85] tracking-[-0.04em] md:text-[9rem]">
                  {hero.value}
                </p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-smoke">{hero.label}</p>
              </div>
              {rest.map((s) =>
              <div key={s.label} className="md:col-span-3">
                  <p className="wide font-display text-4xl font-black tracking-tight md:text-5xl">{s.value}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-smoke">{s.label}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>);

}

function Word({
  children,
  progress,
  range




}: {children: string;progress: MotionValue<number>;range: [number, number];}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </>);

}