import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { prefersReducedMotion } from '../utils/device';

interface IntroProps {
  onReveal: () => void;
  onDone: () => void;
}

const COUNT_DURATION = 900;
const BAR_DURATION = 0.3;
const BAR_STAGGER = 0.045;

/** Fast counter, then the screen splits into shutters that slide up and down to reveal the hero. */
export function Intro({ onReveal, onDone }: IntroProps) {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const isNarrow = useMediaQuery('(max-width: 767px)');
  const bars = isNarrow ? 4 : 7;
  const callbacks = useRef({ onReveal, onDone });
  callbacks.current = { onReveal, onDone };

  useEffect(() => {
    if (prefersReducedMotion()) {
      callbacks.current.onReveal();
      callbacks.current.onDone();
      return;
    }
    let raf = 0;
    const timers: number[] = [];
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / COUNT_DURATION);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      timers.push(
        window.setTimeout(() => {
          setOpen(true);
          callbacks.current.onReveal();
          timers.push(
            window.setTimeout(
              () => callbacks.current.onDone(),
              (BAR_DURATION + BAR_STAGGER * 7) * 1000 + 80
            )
          );
        }, 120)
      );
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100]" aria-hidden={open} role="status" aria-label="Loading portfolio">
      <div className="absolute inset-0 flex">
        {Array.from({ length: bars }, (_, i) =>
        <motion.div
          key={i}
          className="-mr-px h-full flex-1 bg-ink"
          initial={{ y: 0 }}
          animate={{ y: open ? i % 2 === 0 ? '-100%' : '100%' : 0 }}
          transition={{ duration: BAR_DURATION, ease: [0.76, 0, 0.24, 1], delay: i * BAR_STAGGER }} />

        )}
      </div>
      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col justify-between px-5 py-6 md:px-10 md:py-10"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}>
        
        <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-steel">
          <span>Swar Shinde</span>
          <span>Portfolio — 2026</span>
        </div>
        <div>
          <p className="wide font-display text-[26vw] font-black leading-[0.8] tracking-[-0.04em] text-bone md:text-[16vw]">
            {String(count).padStart(3, '0')}
          </p>
          <div className="mt-6 h-[2px] w-full bg-line">
            <div className="h-full origin-left bg-signal" style={{ transform: `scaleX(${count / 100})` }} />
          </div>
        </div>
      </motion.div>
    </div>);

}