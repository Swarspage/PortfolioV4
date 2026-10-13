import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon, CodeIcon } from 'lucide-react';
import { moreWork } from '../data/moreWork';
import type { MoreWorkItem } from '../types/portfolio';

export function MoreWorkSection() {
  return (
    <section
      id="more-work"
      data-nav="dark"
      className="overflow-x-clip border-t border-line/40 bg-ink px-5 py-24 text-bone md:px-10 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] md:grid md:grid-cols-12 md:gap-10">
        {/* Sticky Editorial Intro */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-signal">
              Archive & Side Builds
            </span>
            <h2 className="wide mt-3 font-display text-[clamp(2.75rem,5vw,5.25rem)] font-black uppercase leading-[0.86] tracking-[-0.03em]">
              More
              <br />
              work<span className="text-signal">.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-steel md:text-lg">
              {moreWork.length} secondary builds, hackathon prototypes, and college platforms. Real
              code that solved real problems without the spotlight.
            </p>
            <div className="mt-8 flex items-center gap-3 font-mono text-xs text-smoke">
              <span className="flex h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
              <span>{String(moreWork.length).padStart(2, '0')} entries recorded</span>
            </div>
          </div>
        </div>

        {/* Compact Secondary Tier List */}
        <div className="mt-14 md:col-span-7 md:mt-0">
          <ul className="divide-y divide-line border-y border-line">
            {moreWork.map((item, index) => (
              <MoreWorkRow key={item.name} item={item} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function MoreWorkRow({ item, index }: { item: MoreWorkItem; index: number }) {
  const hasLinks = Boolean(item.liveLink || item.githubLink);

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative -mx-4 rounded-xl px-4 py-6 transition-colors duration-200 hover:bg-char/40 md:-mx-6 md:px-6 md:py-8"
    >
      <div className="flex flex-col gap-3">
        {/* Top Header: Index + Name + Tag pill + Action Links */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-smoke transition-colors duration-150 group-hover:text-signal">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="wide font-display text-xl font-black uppercase tracking-tight text-bone transition-colors group-hover:text-bone md:text-2xl">
              {item.name}
            </h3>
            <span className="border border-line bg-char/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-steel transition-colors group-hover:border-signal/40 group-hover:text-bone md:text-[11px]">
              {item.tag}
            </span>
          </div>

          {/* Conditional External Links */}
          <div className="flex shrink-0 items-center gap-2">
            {item.liveLink && (
              <a
                href={item.liveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border border-bone/30 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-bone transition-colors duration-150 hover:border-signal hover:bg-signal hover:text-ink"
                title={`Visit ${item.name} live`}
              >
                <ArrowUpRightIcon className="h-3.5 w-3.5" aria-hidden />
                <span>Live</span>
              </a>
            )}
            {item.githubLink && (
              <a
                href={item.githubLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border border-bone/30 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-bone transition-colors duration-150 hover:border-signal hover:bg-signal hover:text-ink"
                title={`View ${item.name} on GitHub`}
              >
                <CodeIcon className="h-3.5 w-3.5" aria-hidden />
                <span>Code</span>
              </a>
            )}
            {!hasLinks && (
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-smoke">
                Archive
              </span>
            )}
          </div>
        </div>

        {/* 2-Line Editorial Description */}
        <p className="max-w-2xl text-sm leading-relaxed text-steel transition-colors group-hover:text-bone/80 md:text-base">
          {item.description}
        </p>
      </div>
    </motion.li>
  );
}
