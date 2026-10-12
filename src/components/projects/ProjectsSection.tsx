import { useLayoutEffect, useRef, useState } from 'react';
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
      style={{ height: `calc(${distance}px + 100vh)` }}>
      
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-stretch gap-8 px-10 lg:gap-12">
          <SectionIntro className="flex w-auto min-w-[320px] md:min-w-[420px] lg:min-w-[480px] shrink-0 flex-col justify-end pb-6 pr-8 lg:pr-12" />
          {projects.map((project, i) =>
          <div key={project.slug} className="h-[min(78vh,720px)] w-[min(60vw,860px)] shrink-0">
              <ProjectCard project={project} index={i} total={projects.length} layout="fill" />
            </div>
          )}
        </motion.div>
        <div className="mx-10 mt-8 flex items-center gap-6">
          <span className="font-mono text-xs text-bone">{String(current + 1).padStart(2, '0')}</span>
          <div className="h-px flex-1 bg-line">
            <motion.div className="h-full origin-left bg-signal" style={{ scaleX: scrollYProgress }} />
          </div>
          <span className="font-mono text-xs text-steel">{String(projects.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>);

}

/** Mobile: cards pin and stack over each other — pure CSS sticky, zero JS per frame. */
function ProjectsStack() {
  return (
    <section id="work" data-nav="dark" className="bg-ink px-4 pb-24 pt-20">
      <SectionIntro className="px-1" />
      <div className="mt-12 space-y-6">
        {projects.map((project, i) =>
        <div key={project.slug} className="sticky" style={{ top: 72 + i * 12 }}>
            <ProjectCard project={project} index={i} total={projects.length} layout="auto" />
          </div>
        )}
      </div>
    </section>);

}