import React, { useRef } from "react";
import { skillsData } from "../../data/content";
import { sectionCopy } from "../../data/sectionCopy";
import { SKILL_CATEGORIES } from "../../types/content";
import { gsap } from "../../utils/gsap";
import { useMotionMedia } from "../../hooks/useMotionMedia";
import { sceneSignals } from "../scene/sceneSignals";
import { SectionLabel } from "../ui/SectionLabel";
import { SkillChip } from "../ui/SkillChip";

/** Pinned scene 3: the planet breaks into tiles; categories light up one by one. */
export function Skills() {
  const rootRef = useRef<HTMLElement>(null);
  const groups = SKILL_CATEGORIES.map((cat) => ({ cat, items: skillsData.filter((s) => s.category === cat) })).filter(
    (g) => g.items.length > 0
  );

  useMotionMedia(rootRef, ({ desktop, mobile, reduce }, root) => {
    if (reduce) {
      sceneSignals.skills = groups.length + 1;
      return;
    }
    const q = gsap.utils.selector(root);
    const rows = q("[data-cat-row]");

    if (desktop) {
      // Timeline length in "category units": one unit per row + the closing hold.
      const total = rows.length + 0.5;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (s) => sceneSignals.skills = s.progress * total
        }
      });
      rows.forEach((row, i) => {
        tl.fromTo(row, { opacity: 0.2 }, { opacity: 1, duration: 0.3, ease: "none" }, i).from(
          row.querySelectorAll("[data-skill]"),
          { y: 14, autoAlpha: 0, stagger: 0.06, duration: 0.5, ease: "none" },
          i
        );
      });
      tl.to({}, { duration: 0.6 });
    }

    if (mobile) {
      gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 60%",
          onUpdate: (s) => sceneSignals.skills = s.progress * (groups.length + 0.6)
        }
      });
      rows.forEach((row) =>
      gsap.from(row.querySelectorAll("[data-skill]"), {
        y: 12,
        autoAlpha: 0,
        stagger: 0.04,
        duration: 0.3,
        ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 85%", once: true }
      })
      );
    }
  });

  return (
    <section
      id="skills"
      ref={rootRef}
      tabIndex={-1}
      aria-labelledby="skills-title"
      className="relative z-[3] py-24 outline-none pin:h-dvh-screen pin:py-0">
      
      <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-center px-5 md:px-10">
        <div className="lg:w-[48%] xl:w-[44%]">
          <SectionLabel>{sectionCopy.skills.label}</SectionLabel>
          <h2 id="skills-title" className="mt-5 font-display text-[clamp(2.25rem,4.4vw,4.25rem)] font-light leading-[0.98] tracking-[-0.03em] text-ink">
            {skillsData.length} <em className="italic">{sectionCopy.skills.titleSuffix}</em>
          </h2>

          <div className="-mx-5 mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:block md:space-y-4 md:overflow-visible md:px-0 md:pb-0">
            {groups.map((g) =>
            <div key={g.cat} data-cat-row className="min-w-[78vw] snap-start rounded-[8px] border border-line bg-bg/70 p-5 backdrop-blur md:grid md:min-w-0 md:grid-cols-[6.5rem_1fr] md:items-start md:gap-4 md:rounded-none md:border-x-0 md:border-b-0 md:bg-transparent md:p-0 md:pt-4 md:backdrop-blur-0 sm:md:grid-cols-[8rem_1fr]">
                <div className="mb-4 flex items-baseline justify-between pr-2 md:mb-0">
                  <h3 className="font-mono text-xs text-ink">{g.cat}</h3>
                  <span className="font-mono text-xs text-muted">{String(g.items.length).padStart(2, "0")}</span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) =>
                <li key={s.skill} data-skill>
                      <SkillChip skill={s} />
                    </li>
                )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}
