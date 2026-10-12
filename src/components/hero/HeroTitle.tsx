import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRightIcon, ArrowDownIcon } from 'lucide-react';
import { profile } from '../../data/profile';
import { scrollToId } from '../../hooks/useSmoothScroll';
import { Placeholder } from '../Placeholder';

interface HeroTitleProps {
  revealed: boolean;
  showPortrait: boolean;
}

const EASE = [0.23, 1, 0.32, 1] as const;

export function HeroTitle({ revealed, showPortrait }: HeroTitleProps) {
  const first = profile.firstName.toUpperCase();
  const last = profile.lastName.toUpperCase();

  return (
    <div className="relative z-10 flex h-full flex-col justify-between px-5 pb-6 pt-24 md:px-10 md:pb-10 md:pt-28">
      <FadeIn revealed={revealed} delay={0.35}>
        <div className="flex items-start justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.14em] text-steel md:text-xs">
          <p className="flex items-center gap-2 text-bone">
            <span className="h-1.5 w-1.5 bg-[#3BD671]" aria-hidden />
            {profile.availability}
          </p>
          <p className="hidden md:block">Full-stack developer — {profile.location}</p>
        </div>
      </FadeIn>

      <div>
        <h1
          className="font-display text-[17vw] font-black uppercase leading-[0.8] tracking-[-0.035em] text-bone md:text-[14vw] md:[font-stretch:125%]"
          aria-label={`${profile.firstName} ${profile.lastName}`}>
          
          <span className="flex items-center gap-[0.12em]" aria-hidden>
            <SplitWord text={first} revealed={revealed} offset={0} />
            {showPortrait &&
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={revealed ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, ease: EASE, delay: 0.3 }}>
              
                <Placeholder
                variant="portrait"
                src={profile.portrait}
                label="Your photo"
                hideLabel
                className="h-[0.7em] w-[1.15em] rounded-[0.1em]" />
              
              </motion.span>
            }
          </span>
          <span className="block" aria-hidden>
            <SplitWord text={last} revealed={revealed} offset={first.length} />
            <SplitWord text="." revealed={revealed} offset={first.length + last.length} className="text-signal" />
          </span>
        </h1>

        <FadeIn revealed={revealed} delay={0.45}>
          <div className="mt-6 grid gap-5 md:mt-8 md:grid-cols-12 md:items-end md:gap-8">
            <p className="text-xl font-medium leading-snug text-bone md:col-span-5 md:text-2xl">
              I'm a <RoleRotator roles={profile.roles} /> {profile.tagline}
            </p>
            <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-steel md:col-span-4 md:text-xs">
              {profile.stats.map((s) => `${s.value} ${s.label.split(' ').slice(0, 2).join(' ')}`).join('  ·  ')}
            </p>
            <div className="flex gap-3 md:col-span-3 md:justify-end">
              <button
                onClick={() => scrollToId('work')}
                className="inline-flex items-center gap-2 bg-signal px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink transition-colors duration-150 hover:bg-bone">
                
                See the work <ArrowDownRightIcon className="h-4 w-4" aria-hidden />
              </button>
              <a
                href={profile.resumeLink}
                download
                className="inline-flex items-center gap-2 border border-bone/40 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-bone transition-colors duration-150 hover:border-bone">
                
                Résumé <ArrowDownIcon className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>);

}

function SplitWord({
  text,
  revealed,
  offset,
  className = ''





}: {text: string;revealed: boolean;offset: number;className?: string;}) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.04em] ${className}`}>
      {text.split('').map((char, i) =>
      <motion.span
        key={`${char}-${i}`}
        className="inline-block"
        initial={{ y: '105%' }}
        animate={revealed ? { y: '0%' } : {}}
        transition={{ duration: 0.3, ease: EASE, delay: 0.12 + (offset + i) * 0.03 }}>
        
          {char}
        </motion.span>
      )}
    </span>);

}

function FadeIn({ children, revealed, delay }: {children: React.ReactNode;revealed: boolean;delay: number;}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={revealed ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, ease: EASE, delay }}>
      
      {children}
    </motion.div>);

}

function RoleRotator({ roles }: {roles: string[];}) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % roles.length), 2200);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span className="relative inline-flex overflow-hidden align-bottom text-signal">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[index]}
          className="inline-block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}>
          
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>);

}