import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { skillCategoryOrder, skills } from '../data/skills';
import { Placeholder } from './Placeholder';
import type { Skill, SkillCategory } from '../types/portfolio';

/** Sticky heading on the left; skill groups slide in from the right and fade out as they pass. */
export function SkillsSection() {
  return (
    <section id="skills" data-nav="dark" className="overflow-x-clip bg-ink px-5 py-24 text-bone md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px] md:grid md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <h2 className="wide font-display text-[clamp(2.75rem,5vw,5.25rem)] font-black uppercase leading-[0.86] tracking-[-0.03em]">
              The
              <br />
              arsenal<span className="text-signal">.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-steel md:text-lg">
              {skills.length} tools I reach for without thinking — grouped by where they live in the stack.
            </p>
          </div>
        </div>
        <div className="mt-16 space-y-20 md:col-span-7 md:mt-0 md:space-y-32">
          {skillCategoryOrder.map((category) =>
          <SkillGroup
            key={category}
            category={category}
            items={skills.filter((s) => s.category === category)} />

          )}
        </div>
      </div>
    </section>);

}

function SkillGroup({ category, items }: {category: SkillCategory;items: Skill[];}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [80, 0, 0, -60]);

  return (
    <motion.div ref={ref} style={{ opacity, x }}>
      <div className="flex items-baseline justify-between border-b border-line pb-4">
        <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-5xl">{category}</h3>
        <span className="font-mono text-xs text-steel">{String(items.length).padStart(2, '0')}</span>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
        {items.map((skill) =>
        <li key={skill.name} className="flex items-center gap-3">
            <Placeholder
            variant="icon"
            src={skill.icon}
            label={skill.name}
            accent={skill.glow}
            className="h-11 w-11 shrink-0" />
          
            <span className="text-base font-medium md:text-lg">{skill.name}</span>
          </li>
        )}
      </ul>
    </motion.div>);

}