import React, { useRef } from "react";
import { educationData, experienceData } from "../../data/content";
import { sectionCopy } from "../../data/sectionCopy";
import { gsap } from "../../utils/gsap";
import { revealUp } from "../../utils/scrollEffects";
import { useMotionMedia } from "../../hooks/useMotionMedia";
import { SectionLabel } from "../ui/SectionLabel";

interface TimelineEntry {
  key: string;
  title: string;
  org: string;
  period: string;
  active: boolean;
  status: string;
  body: string;
}

export function Journey() {
  const rootRef = useRef<HTMLElement>(null);
  const { journey } = sectionCopy;

  const groups: {label: string;entries: TimelineEntry[];}[] = [
  {
    label: journey.experience,
    entries: experienceData.map((e) => ({
      key: `${e.role}-${e.org}`,
      title: e.role,
      org: e.org,
      period: e.duration,
      active: e.active,
      status: e.active ? "Current" : "Completed",
      body: e.description
    }))
  },
  {
    label: journey.education,
    entries: educationData.map((e) => ({
      key: `${e.degree}-${e.institution}`,
      title: e.degree,
      org: e.institution,
      period: e.years,
      active: e.active,
      status: e.active ? "In progress" : "Completed",
      body: e.details
    }))
  }];


  useMotionMedia(rootRef, ({ reduce }, root) => {
    if (reduce) return;
    const q = gsap.utils.selector(root);
    const list = q("[data-timeline]")[0];
    if (list) {
      gsap.fromTo(
        q("[data-line]"),
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 72%", end: "bottom 55%", scrub: true } }
      );
    }
    q("[data-entry]").forEach((el) => revealUp(el, el, "top 80%"));
  });

  return (
    <section id="journey" ref={rootRef} tabIndex={-1} aria-labelledby="journey-title" className="relative z-[3] py-[16vh] outline-none">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:px-10 lg:grid-cols-12">
        <header className="lg:sticky lg:top-[24vh] lg:col-span-4 lg:self-start">
          <SectionLabel>{journey.label}</SectionLabel>
          <h2 id="journey-title" className="text-balance mt-5 font-display text-[clamp(2.25rem,4vw,3.75rem)] font-light leading-[1] tracking-[-0.03em] text-ink">
            {journey.title}
          </h2>
        </header>

        <div data-timeline className="relative min-w-0 lg:col-span-7 lg:col-start-6">
          <span aria-hidden className="absolute bottom-2 left-[7px] top-2 hidden w-px bg-line md:block">
            <span data-line className="absolute inset-0 origin-top bg-accent" />
          </span>

          {groups.map((group) =>
          <div key={group.label} className="mb-12 last:mb-0 md:mb-14">
              <h3 className="mb-4 font-mono text-xs text-muted md:mb-6 md:pl-10">{group.label}</h3>
              <ol className="-mx-5 flex w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:block md:space-y-12 md:overflow-visible md:px-0 md:pb-0">
                {group.entries.map((entry) =>
              <li key={entry.key} data-entry className="relative min-w-[82vw] snap-start rounded-[8px] border border-line bg-bg/70 p-5 backdrop-blur md:min-w-0 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:pl-10 md:backdrop-blur-0">
                    <span
                  aria-hidden
                  className={`absolute left-0 top-2 hidden h-[15px] w-[15px] rounded-full border-2 border-[color:var(--accent-ink)] md:block ${
                  entry.active ? "bg-accent" : "bg-bg"}`
                  } />
                
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                      <span className="text-muted">{entry.period}</span>
                      <span
                    className={`rounded-full px-2 py-0.5 ${entry.active ? "bg-accent text-[color:var(--on-accent)]" : "border border-line text-muted"}`}>
                    
                        {entry.status}
                      </span>
                    </div>
                    <p className="mt-3 font-display text-[clamp(1.45rem,2.6vw,2.4rem)] leading-tight tracking-[-0.015em] text-ink">{entry.title}</p>
                    <p className="mt-1 text-ink">{entry.org}</p>
                    <p className="mt-3 line-clamp-[7] max-w-xl leading-relaxed text-muted md:line-clamp-none">{entry.body}</p>
                  </li>
              )}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>);

}
