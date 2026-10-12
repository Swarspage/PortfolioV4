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
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-smoke md:mb-8">About</h2>
          <div className="grid items-start gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
            {/* Left Column: 40% width with large blended portrait pulled right to the top alongside lead text */}
            <div className="flex flex-col md:col-span-5 md:sticky md:top-24 md:self-start">
              <div className="relative w-full max-w-[480px] self-center md:self-start">
                <div
                  className="relative aspect-[3/4] w-full overflow-hidden"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
                  }}>
                  <img
                    src={profile.about.image || profile.portrait || ''}
                    alt="Swar Shinde · Portrait"
                    loading="lazy"
                    className="h-full w-full object-cover object-top mix-blend-multiply filter contrast-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bone via-bone/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* Right Column: remaining 60% layout starting alongside */}
            <div className="md:col-span-7">
              <p
                ref={textRef}
                className="font-display text-[clamp(1.75rem,3.4vw,3.2rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                
                {words.map((word, i) =>
                <Word key={`${word}-${i}`} progress={read} range={[i / words.length, (i + 1) / words.length]}>
                    {word}
                  </Word>
                )}
              </p>

              <div className="mt-12 grid gap-6 text-base leading-relaxed text-smoke md:mt-16 md:grid-cols-2 md:gap-8 md:text-lg">
                {profile.about.paragraphs.map((p) =>
                <p key={p.slice(0, 24)}>{p}</p>
                )}
              </div>

              <div className="mt-14 grid gap-8 border-t border-ink/15 pt-8 md:mt-20 md:grid-cols-12 md:items-end">
                <div className="md:col-span-6">
                  <p className="wide font-display text-[4.5rem] font-black leading-[0.85] tracking-[-0.04em] md:text-[6.5rem] lg:text-[7.5rem]">
                    {hero.value}
                  </p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-smoke">{hero.label}</p>
                </div>
                {rest.map((s) =>
                <div key={s.label} className="md:col-span-3">
                    <p className="wide font-display text-3xl font-black tracking-tight md:text-4xl lg:text-5xl">{s.value}</p>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-smoke">{s.label}</p>
                  </div>
                )}
              </div>
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