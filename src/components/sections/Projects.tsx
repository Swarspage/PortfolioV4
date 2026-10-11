import React, { useRef } from "react";
import { projectsData } from "../../data/content";
import { sectionCopy } from "../../data/sectionCopy";
import { resolveProjectImage } from "../../utils/assets";
import { gsap } from "../../utils/gsap";
import { clipReveal, maskWords, parallax, revealUp } from "../../utils/scrollEffects";
import { useMotionMedia } from "../../hooks/useMotionMedia";
import { AssetImage } from "../ui/AssetImage";
import { ProjectLinks } from "../ui/ProjectLinks";
import { SectionLabel } from "../ui/SectionLabel";
import { SplitWords } from "../ui/SplitWords";

export function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const projects = projectsData.projectsData.slice(1);

  useMotionMedia(rootRef, ({ reduce }, root) => {
    if (reduce) return;
    const q = gsap.utils.selector(root);
    const header = q("[data-projects-header]")[0];
    if (header) revealUp(header.children, header);
    q("[data-project]").forEach((row) => {
      const media = row.querySelector("[data-project-media]");
      const img = row.querySelector("[data-project-img]");
      if (media) clipReveal(media, row);
      if (img) parallax(img, row, 7);
      maskWords(row.querySelectorAll("[data-word]"), row, "top 72%");
      revealUp(row.querySelectorAll("[data-project-fade]"), row, "top 68%");
    });
  });

  return (
    <section id="projects" ref={rootRef} aria-labelledby="projects-title" className="relative z-[3] py-[14vh]">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <header data-projects-header className="mb-[8vh] grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel>{sectionCopy.projects.label}</SectionLabel>
            <h2 id="projects-title" className="text-balance mt-5 font-display text-[clamp(2.25rem,4.6vw,4.5rem)] font-light leading-[0.98] tracking-[-0.03em] text-ink">
              {sectionCopy.projects.title}
            </h2>
          </div>
          <p className="self-end text-muted lg:col-span-4 lg:col-start-9">{sectionCopy.projects.intro}</p>
        </header>

        <ol>
          {projects.map((project, i) => {
            const image = resolveProjectImage(project);
            const flip = i % 2 === 1;
            return (
              <li key={project.name} data-project className="grid items-center gap-8 border-t border-line py-[9vh] lg:grid-cols-12 lg:gap-12">
                <div
                  data-project-media
                  className={`relative aspect-[16/10] overflow-hidden rounded-[20px] bg-raised lg:row-start-1 lg:col-span-7 ${
                  flip ? "lg:col-start-6" : "lg:col-start-1"}`
                  }>
                  
                  <AssetImage
                    data-project-img
                    asset={image}
                    alt={`${project.name} preview`}
                    className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover" />
                  
                </div>

                <article className={`lg:row-start-1 lg:col-span-5 ${flip ? "lg:col-start-1" : "lg:col-start-8"}`}>
                  <h3 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light italic leading-[0.9] tracking-[-0.03em] text-ink">
                    <SplitWords text={project.name} />
                  </h3>
                  <p data-project-fade className="text-balance mt-4 font-display text-xl text-accent md:text-2xl">
                    {project.impactStatement}
                  </p>
                  <p data-project-fade className="mt-4 max-w-md leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <p data-project-fade className="mt-5 font-mono text-xs leading-relaxed text-muted">
                    {project.technologies.join("  ·  ")}
                  </p>
                  <div data-project-fade className="mt-7">
                    <ProjectLinks project={project} />
                  </div>
                </article>
              </li>);

          })}
        </ol>
      </div>
    </section>);

}