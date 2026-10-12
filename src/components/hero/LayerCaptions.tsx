import React from 'react';
import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { skills, stackLayers } from '../../data/skills';
import { STACK_TIMELINE, captionRange } from '../../utils/stackTimeline';
import type { StackLayer } from '../../types/portfolio';

interface LayerCaptionsProps {
  progress: MotionValue<number>;
}

export function LayerCaptions({ progress }: LayerCaptionsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {stackLayers.map((layer, i) =>
      <LayerCaption key={layer.kind} layer={layer} index={i} progress={progress} />
      )}
      <Finale progress={progress} />
    </div>);

}

function LayerCaption({ layer, index, progress }: {layer: StackLayer;index: number;progress: MotionValue<number>;}) {
  const [start, end] = captionRange(index);
  const opacity = useTransform(progress, [start - 0.03, start, end, end + 0.03], [0, 1, 1, 0]);
  const y = useTransform(progress, [start - 0.03, start, end, end + 0.03], [40, 0, 0, -40]);
  const layerSkills = skills.filter((s) => layer.categories.includes(s.category));

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-5 bottom-8 md:inset-x-auto md:bottom-auto md:left-10 md:top-1/2 md:w-[min(40vw,520px)] md:-translate-y-1/2">
      
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal md:text-xs">
        Layer 0{index + 1} — {layer.label}
      </p>
      <h2 className="wide mt-3 font-display text-[2.6rem] font-black uppercase leading-[0.88] tracking-[-0.02em] text-bone md:text-[4.5rem]">
        {layer.title}
      </h2>
      <p className="mt-4 max-w-md text-base leading-relaxed text-steel md:text-lg">{layer.description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {layerSkills.map((s) =>
        <li
          key={s.name}
          className="border border-line bg-ink/70 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-bone">
          
            {s.name}
          </li>
        )}
      </ul>
    </motion.div>);

}

function Finale({ progress }: {progress: MotionValue<number>;}) {
  const { finaleStart, finaleEnd } = STACK_TIMELINE;
  const opacity = useTransform(progress, [finaleStart, finaleStart + 0.05, finaleEnd - 0.03, finaleEnd], [0, 1, 1, 0]);
  const scale = useTransform(progress, [finaleStart, finaleEnd], [0.96, 1.04]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
      
      <h2 className="wide font-display text-[15vw] font-black uppercase leading-[0.82] tracking-[-0.035em] text-bone md:text-[9vw]">
        Full stack<span className="text-signal">.</span>
        <br />
        No handoffs<span className="text-signal">.</span>
      </h2>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-steel">
        Four layers. One builder. Keep going.
      </p>
    </motion.div>);

}