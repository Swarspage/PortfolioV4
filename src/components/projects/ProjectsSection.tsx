import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { projects } from '../../data/projects';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { ProjectCard } from './ProjectCard';

export function ProjectsSection() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  return isDesktop ? <ProjectsTrack /> : <ProjectsStack />;
}

function SectionIntro({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <h2 className="wide font-display text-[clamp(2.5rem,4.5vw,5rem)] font-black uppercase leading-[0.86] tracking-[-0.035em] text-bone">
        Selected
        <br />
        work<span className="text-signal">.</span>
      </h2>
      <p className="mt-6 max-w-xs text-base leading-relaxed text-steel md:text-lg">
        {projects.length} products, all shipped. Scroll to move through them.
      </p>
    </div>
  );
}

/** Clean CSS arrow line — no emoji, no Unicode */
function ArrowLine({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="h-px w-8 bg-signal/50" />
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        aria-hidden
        className="text-signal ml-0.5"
      >
        <path
          d="M8 1l5 5-5 5M1 6h12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** Live dot indicator */
function LiveDot() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60"
          style={{ animationDuration: '1.6s' }}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal">
        Currently building
      </span>
    </div>
  );
}

/** Desktop divider — tall panel that sits inside the horizontal scroll track */
function WipDivider() {
  return (
    <div className="flex h-[min(78vh,720px)] w-[min(36vw,460px)] shrink-0 items-center pl-12 pr-16">
      {/* Left accent border */}
      <div className="mr-8 self-stretch w-px bg-signal/30 shrink-0" />

      <div className="flex flex-col">
        <LiveDot />

        <h3 className="wide mt-7 font-display text-[clamp(1.5rem,2.4vw,2.8rem)] font-black uppercase leading-[0.88] tracking-[-0.03em] text-bone">
          Currently
          <br />
          building
        </h3>

        <p className="mt-5 max-w-[240px] text-sm leading-relaxed text-steel">
          These are active works in progress - shipping as I go.
        </p>

        <ArrowLine className="mt-8" />
      </div>
    </div>
  );
}

/** Mobile divider — full-width horizontal banner between stacked cards */
function WipDividerMobile() {
  return (
    <div className="my-8 border-l-2 border-signal py-10 pl-6 pr-4">
      <LiveDot />

      <h3 className="wide mt-6 font-display text-[clamp(2rem,8vw,3rem)] font-black uppercase leading-[0.88] tracking-[-0.03em] text-bone">
        Currently
        <br />
        building
      </h3>

      <p className="mt-4 max-w-sm text-sm leading-relaxed text-steel">
        These are active works in progress - shipping as I go.
      </p>

      <ArrowLine className="mt-7" />
    </div>
  );
}

/** Desktop: vertical scroll drives a horizontal track of cards that slide left. */
function ProjectsTrack() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (v) => -v * distance);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCurrent(Math.min(projects.length - 1, Math.floor(v * projects.length)));
  });

  return (
    <section
      ref={sectionRef}
      id="work"
      data-nav="dark"
      className="relative bg-ink"
      style={{ height: `calc(${distance}px + 100vh)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-stretch gap-12 px-10 lg:gap-16"
        >
          <SectionIntro className="flex w-auto min-w-[320px] md:min-w-[420px] lg:min-w-[480px] shrink-0 flex-col justify-end pb-6 pr-8 lg:pr-12" />

          {projects.map((project, i) => {
            const isFirstWip = project.wip && !projects[i - 1]?.wip;
            return (
              <React.Fragment key={project.slug}>
                {isFirstWip && <WipDivider />}
                <div className="h-[min(78vh,720px)] w-[min(60vw,860px)] shrink-0">
                  <ProjectCard project={project} index={i} total={projects.length} layout="fill" />
                </div>
              </React.Fragment>
            );
          })}
        </motion.div>

        <div className="mx-10 mt-8 flex items-center gap-6">
          <span className="font-mono text-xs text-bone">{String(current + 1).padStart(2, '0')}</span>
          <div className="h-px flex-1 bg-line">
            <motion.div className="h-full origin-left bg-signal" style={{ scaleX: scrollYProgress }} />
          </div>
          <span className="font-mono text-xs text-steel">{String(projects.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}

/** Mobile: cards pin and stack over each other — pure CSS sticky, zero JS per frame. */
function ProjectsStack() {
  const shippedProjects = projects.filter((p) => !p.wip);
  const wipProjects = projects.filter((p) => p.wip);

  return (
    <section id="work" data-nav="dark" className="bg-ink px-4 pb-24 pt-20">
      <SectionIntro className="px-1" />

      {/* Shipped projects — sticky stacking, scoped to this container */}
      <div className="relative mt-12">
        {shippedProjects.map((project, i) => (
          <div key={project.slug} className="sticky" style={{ top: 72 + i * 12 }}>
            <ProjectCard project={project} index={i} total={projects.length} layout="auto" />
          </div>
        ))}
      </div>

      {/* WIP divider — normal flow, fully after the sticky shipped block */}
      <WipDividerMobile />

      {/* WIP projects — regular non-sticky cards, won't overlap divider */}
      <div className="space-y-6">
        {wipProjects.map((project, i) => (
          <div key={project.slug}>
            <ProjectCard
              project={project}
              index={shippedProjects.length + i}
              total={projects.length}
              layout="auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
}