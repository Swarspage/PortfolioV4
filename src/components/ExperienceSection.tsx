import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { career } from '../data/career';
import type { CareerItem } from '../types/portfolio';

export function ExperienceSection() {
  const experience = career.filter((c) => c.kind === 'experience');
  const education = career.filter((c) => c.kind === 'education');

  return (
    <section id="experience" data-nav="light" className="overflow-x-clip bg-bone px-5 py-24 text-ink md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px] md:grid md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <h2 className="wide font-display text-[clamp(2.75rem,5vw,5.25rem)] font-black uppercase leading-[0.86] tracking-[-0.03em]">
              Track
              <br />
              record<span className="text-signal">.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-smoke md:text-lg">
              Where I've put in the work — and what came out the other side.
            </p>
          </div>
        </div>
        <div className="mt-16 md:col-span-7 md:mt-0">
          <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-smoke">Experience</h3>
          <ol className="mt-8 space-y-14 md:space-y-20">
            {experience.map((item) =>
            <TimelineEntry key={item.title} item={item} />
            )}
          </ol>
          <h3 className="mt-20 font-mono text-xs uppercase tracking-[0.16em] text-smoke md:mt-28">Education</h3>
          <ol className="mt-8 space-y-14">
            {education.map((item) =>
            <TimelineEntry key={item.title} item={item} />
            )}
          </ol>
        </div>
      </div>
    </section>);

}

function TimelineEntry({ item }: {item: CareerItem;}) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 0.3], [90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 1, 1, 0.15]);

  return (
    <motion.li ref={ref} style={{ x, opacity }} className="relative border-l border-ink/15 pl-6 md:pl-10">
      <span
        aria-hidden
        className={`absolute -left-[5px] top-2 h-[9px] w-[9px] ${item.active ? 'bg-signal' : 'bg-ink'}`} />
      
      <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-smoke">
        <span>{item.period}</span>
        {item.active && <span className="bg-ink px-2 py-0.5 text-[10px] text-bone">Now</span>}
      </div>
      <p className="mt-3 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight md:text-5xl">
        {item.title}
      </p>
      <p className="mt-2 text-lg font-semibold md:text-xl">{item.org}</p>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-smoke">{item.summary}</p>
      {item.highlights.length > 0 &&
      <ul className="mt-5 flex flex-wrap gap-2">
          {item.highlights.map((h) =>
        <li key={h} className="border border-ink/20 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em]">
              {h}
            </li>
        )}
        </ul>
      }
    </motion.li>);

}