import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownIcon, ArrowUpIcon, ArrowUpRightIcon, CheckIcon, CopyIcon } from 'lucide-react';
import { profile } from '../data/profile';
import { scrollToId } from '../hooks/useSmoothScroll';
import { Placeholder } from './Placeholder';

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const xLeft = useTransform(scrollYProgress, [0, 1], ['-12%', '0%']);
  const xRight = useTransform(scrollYProgress, [0, 1], ['12%', '0%']);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section ref={ref} id="contact" data-nav="light" className="overflow-x-clip bg-signal px-5 pb-8 pt-24 text-ink md:px-10 md:pt-36">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="font-display text-[14vw] font-black uppercase leading-[0.82] tracking-[-0.04em] md:text-[10.5vw] md:[font-stretch:125%] 2xl:text-[10rem]">
          <motion.span className="block" style={{ x: xLeft }}>
            Let's build
          </motion.span>
          <motion.span className="block" style={{ x: xRight }}>
            something
          </motion.span>
          <motion.span className="block" style={{ x: xLeft }}>
            sharp.
          </motion.span>
        </h2>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.16em]">Fastest way to reach me</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 block break-all font-display text-3xl font-extrabold tracking-tight underline decoration-2 underline-offset-[6px] md:text-5xl">
              
              {profile.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 border border-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] transition-colors duration-150 hover:bg-ink hover:text-signal">
                
                {copied ? <CheckIcon className="h-4 w-4" aria-hidden /> : <CopyIcon className="h-4 w-4" aria-hidden />}
                {copied ? 'Copied' : 'Copy email'}
              </button>
              <a
                href={profile.resumeLink}
                download
                className="inline-flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-bone transition-colors duration-150 hover:bg-char">
                
                Download résumé <ArrowDownIcon className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Email copied to clipboard' : ''}
            </span>
          </div>

          <ul className="border-t border-ink/25 md:col-span-5">
            {profile.socials.map((social) =>
            <li key={social.label} className="border-b border-ink/25">
                <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 py-4">
                
                  <Placeholder
                  variant="icon"
                  src={social.icon}
                  label={social.label}
                  tone="light"
                  className="h-9 w-9 shrink-0 !border-ink/40 !bg-transparent !text-ink" />
                
                  <span className="flex-1 font-display text-xl font-bold md:text-2xl">{social.label}</span>
                  <span className="hidden font-mono text-xs sm:inline">{social.handle}</span>
                  <ArrowUpRightIcon
                  className="h-5 w-5 transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden />
                
                </a>
              </li>
            )}
          </ul>
        </div>

        <footer className="mt-24 flex flex-col gap-4 border-t border-ink/25 pt-6 font-mono text-xs uppercase tracking-[0.12em] md:mt-32 md:flex-row md:items-center md:justify-between">
          <span>© 2026 {profile.firstName} {profile.lastName}. Designed & built by me.</span>
          <button onClick={() => scrollToId('top')} className="inline-flex items-center gap-2 hover:underline">
            Back to top <ArrowUpIcon className="h-3.5 w-3.5" aria-hidden />
          </button>
        </footer>
      </div>
    </section>);

}