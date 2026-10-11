import React, { useRef } from "react";
import { projectsData } from "../../data/content";
import { sectionCopy } from "../../data/sectionCopy";
import { resolveProjectImage } from "../../utils/assets";
import { gsap } from "../../utils/gsap";
import { maskWords, revealUp } from "../../utils/scrollEffects";
import { useMotionMedia } from "../../hooks/useMotionMedia";
import { sceneSignals } from "../scene/sceneSignals";
import { AssetImage } from "../ui/AssetImage";
import { ProjectLinks } from "../ui/ProjectLinks";
import { SectionLabel } from "../ui/SectionLabel";
import { SplitWords } from "../ui/SplitWords";

function hostOf(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/** Pinned scene 2: the core becomes the Singularity planet while the project unfolds. */
export function FeaturedProject() {
  const rootRef = useRef<HTMLElement>(null);
  const project = projectsData.projectsData[0];
  const shot = resolveProjectImage(project);
  const host = hostOf(project.liveLink);

  useMotionMedia(rootRef, ({ desktop, mobile, reduce }, root) => {
    if (reduce) {
      sceneSignals.singularity = 1;
      return;
    }
    const q = gsap.utils.selector(root);
    maskWords(q("[data-word]"), root, "top 70%");

    if (desktop) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (s) => sceneSignals.singularity = s.progress
        }
      });
      tl.fromTo(q("[data-impact-word]"), { opacity: 0.12 }, { opacity: 1, stagger: 0.08, ease: "none", duration: 1 }).
      from(q("[data-sg-desc]"), { y: 30, autoAlpha: 0, ease: "none", duration: 0.6 }).
      from(q("[data-tech]"), { y: 18, autoAlpha: 0, stagger: 0.08, ease: "none", duration: 0.5 }).
      from(q("[data-sg-links]"), { y: 16, autoAlpha: 0, ease: "none", duration: 0.4 }).
      fromTo(
        q("[data-sg-shot]"),
        { clipPath: "inset(100% 0% 0% 0% round 18px)" },
        { clipPath: "inset(0% 0% 0% 0% round 18px)", ease: "none", duration: 0.8 },
        "-=0.3"
      ).
      to({}, { duration: 0.4 });
      tl.fromTo(q("[data-sg-progress]"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: tl.duration() }, 0);
    }

    if (mobile) {
      gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 60%", end: "bottom 40%", onUpdate: (s) => sceneSignals.singularity = s.progress }
      });
      revealUp(q("[data-sg-desc], [data-tech], [data-sg-links], [data-sg-shot]"), root, "top 60%");
    }
  });

  if (!project) return null;

  return (
    <section
      id="singularity"
      ref={rootRef}
      tabIndex={-1}
      aria-labelledby="singularity-title"
      className="relative z-[3] overflow-hidden py-24 outline-none pin:h-dvh-screen pin:py-0">
      
      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-center px-5 md:px-10">
        <div className="max-w-xl lg:max-w-[42%]">
          <SectionLabel>{sectionCopy.featured.label}</SectionLabel>
          <h2 id="singularity-title" className="mt-5 font-display text-[clamp(3.5rem,9vw,9rem)] font-light italic leading-[0.86] tracking-[-0.04em] text-ink">
            <SplitWords text={project.name} />
          </h2>
          <p className="text-balance mt-6 font-display text-2xl leading-snug text-ink md:text-[2rem]">
            <SplitWords text={project.impactStatement} mode="plain" wordAttr="data-impact-word" />
          </p>
          <p data-sg-desc className="mt-5 max-w-md leading-relaxed text-muted">
            {project.description}
          </p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technologies">
            {project.technologies.map((t) =>
            <li key={t} data-tech className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-xs text-ink">
                {t}
              </li>
            )}
          </ul>
          <div data-sg-links className="mt-8">
            <ProjectLinks project={project} />
          </div>
        </div>

        <figure
          data-sg-shot
          className="mt-12 w-full max-w-md overflow-hidden rounded-[18px] border border-line bg-raised pin:absolute pin:bottom-[9dvh] pin:right-10 pin:mt-0 pin:w-[24vw] pin:max-w-[420px]">
          
          <AssetImage asset={shot} alt={`${project.name} dashboard screenshot`} className="aspect-[16/10] w-full object-cover" />
          <figcaption className="flex items-center justify-between gap-3 px-4 py-3 font-mono text-[11px] text-muted">
            <span>{sectionCopy.featured.shotCaption}</span>
            {host && <span className="truncate text-ink">{host}</span>}
          </figcaption>
        </figure>
      </div>

      <span aria-hidden className="absolute inset-x-5 bottom-6 hidden h-px bg-line pin:block md:inset-x-10">
        <span data-sg-progress className="absolute inset-0 origin-left bg-accent" />
      </span>
    </section>);

}