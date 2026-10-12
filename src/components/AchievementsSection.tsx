import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../data/achievements';
import { Placeholder } from './Placeholder';
import type { Achievement } from '../types/portfolio';

/** Bento of receipts — cards tip up out of the page in 3D as they enter. */
export function AchievementsSection() {
  return (
    <section id="achievements" data-nav="dark" className="bg-ink px-5 py-24 text-bone md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="wide font-display text-[clamp(3rem,7vw,7.5rem)] font-black uppercase leading-[0.84] tracking-[-0.035em]">
            Receipts<span className="text-signal">.</span>
          </h2>
          <p className="max-w-sm text-base leading-relaxed text-steel md:text-lg">
            Proof over promises. Wins, roles and recognition — with the photos to back them up.
          </p>
        </div>
        <ul
          className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-4"
          style={{ perspective: 1400 }}>
          
          {achievements.map((a, i) =>
          <AchievementCard key={a.title} achievement={a} index={i} />
          )}
        </ul>
      </div>
    </section>);

}

function AchievementCard({ achievement, index }: {achievement: Achievement;index: number;}) {
  const featured = Boolean(achievement.featured);
  return (
    <motion.li
      className={`flex flex-col overflow-hidden rounded-[18px] border border-line bg-char ${
      featured ? 'md:col-span-2 lg:row-span-2' : ''}`
      }
      style={{ transformOrigin: 'top center' }}
      initial={{ opacity: 0, y: 48, rotateX: -16 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: index % 4 * 0.05 }}>
      
      <div className={`relative ${featured ? 'aspect-[4/3] lg:aspect-auto lg:min-h-0 lg:flex-1' : 'aspect-[4/3]'}`}>
        <Placeholder
          src={achievement.image}
          label={`${achievement.title.split(' · ')[0]} photo`}
          className="absolute inset-0 h-full w-full border-0 border-b" />
        
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6 lg:flex-none">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em]">
          <span className="text-signal">{achievement.category}</span>
          <span className="text-steel">{achievement.date}</span>
        </div>
        <h3
          className={`mt-3 font-display font-extrabold uppercase leading-[1] tracking-tight ${
          featured ? 'text-3xl md:text-4xl' : 'text-xl'}`
          }>
          
          {achievement.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-steel">{achievement.description}</p>
      </div>
    </motion.li>);

}