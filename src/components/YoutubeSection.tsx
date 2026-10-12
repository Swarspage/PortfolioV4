import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon, LockIcon, PlayIcon } from 'lucide-react';
import { youtube } from '../data/youtube';
import { Placeholder } from './Placeholder';

export function YoutubeSection() {
  return (
    <section id="youtube" data-nav="light" className="bg-bone px-5 py-24 text-ink md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="wide font-display text-[clamp(3rem,7vw,7.5rem)] font-black uppercase leading-[0.84] tracking-[-0.035em]">
            I also
            <br />
            Stream<span className="text-signal">.</span>
          </h2>
          <div className="max-w-sm">
            <p className="text-base leading-relaxed text-smoke md:text-lg">{youtube.pitch}</p>
            <a
              href={youtube.channelLink}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-bone transition-colors duration-150 hover:bg-signal hover:text-ink">

              Visit channel <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-8">
          <motion.a
            href={youtube.featured.link}
            target="_blank"
            rel="noreferrer"
            className="group block md:col-span-7"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>

            <div className="relative aspect-video overflow-hidden rounded-[18px]">
              <Placeholder
                src={youtube.featured.thumbnail}
                label="Featured video thumbnail · 16:9"
                tone="light"
                className="absolute inset-0 h-full w-full rounded-[18px]" />

              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-ink text-signal transition-transform duration-150 ease-out group-hover:scale-105 md:h-20 md:w-20">
                  <PlayIcon className="h-6 w-6 fill-current md:h-7 md:w-7" aria-hidden />
                </span>
              </span>
            </div>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-smoke">Featured</p>
            <p className="mt-2 font-display text-2xl font-extrabold leading-tight md:text-3xl">{youtube.featured.title}</p>
          </motion.a>

          <ul className="divide-y divide-ink/15 border-y border-ink/15 md:col-span-5 md:self-start">
            {youtube.recent.map((video) => {
              const content =
                <>
                  <div className="relative aspect-video w-28 shrink-0 md:w-36">
                    <Placeholder
                      src={video.thumbnail}
                      label="16:9"
                      tone="light"
                      hideLabel
                      className="absolute inset-0 h-full w-full" />

                    {video.locked &&
                      <span className="absolute inset-0 grid place-items-center">
                        <LockIcon className="h-4 w-4 text-smoke" aria-hidden />
                      </span>
                    }
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-smoke">{video.label}</p>
                    <p className="mt-1 font-semibold leading-snug md:text-lg">{video.title}</p>
                  </div>
                </>;

              return (
                <li key={video.title}>
                  {video.locked ?
                    <div className="flex items-center gap-4 py-4 opacity-60" aria-disabled>
                      {content}
                    </div> :

                    <a
                      href={video.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 py-4 transition-colors duration-150 hover:text-signal">

                      {content}
                    </a>
                  }
                </li>);

            })}
          </ul>
        </div>
      </div>
    </section>);

}