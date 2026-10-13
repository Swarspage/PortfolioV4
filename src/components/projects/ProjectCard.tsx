import React from 'react';
import { ArrowUpRightIcon, CodeIcon, PlayIcon } from 'lucide-react';
import { Placeholder } from '../Placeholder';
import type { Project } from '../../types/portfolio';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  /** "fill" stretches the image to the card's height (desktop track); "auto" uses a fixed ratio. */
  layout: 'fill' | 'auto';
}

export function ProjectCard({ project, index, total, layout }: ProjectCardProps) {
  const links = [
    { href: project.links.live, label: 'Live', Icon: ArrowUpRightIcon },
    { href: project.links.github, label: 'Code', Icon: CodeIcon },
    { href: project.links.demo, label: 'Demo', Icon: PlayIcon },
  ].filter((l): l is { href: string; label: string; Icon: typeof ArrowUpRightIcon } => Boolean(l.href));

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-char">
      <div className={`relative ${layout === 'fill' ? 'min-h-0 flex-1' : 'aspect-[16/10]'}`}>
        <Placeholder
          src={project.image}
          label={`${project.name} preview · 16:10`}
          className="absolute inset-0 h-full w-full border-0 border-b object-cover"
        />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="bg-ink px-2 py-1 font-mono text-[11px] tracking-[0.1em] text-bone">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          {project.wip && (
            <span className="border border-signal/40 bg-signal/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-signal">
              WIP
            </span>
          )}
        </div>
      </div>

      <div className="shrink-0 p-5 md:p-8">
        <div className="flex items-start justify-between gap-6">
          <h3 className="wide font-display text-3xl font-black uppercase tracking-tight text-bone md:text-5xl">
            {project.name}
          </h3>
          <span className="pt-2 font-mono text-xs text-steel">{project.year}</span>
        </div>
        <p className="mt-2 text-lg font-semibold leading-snug text-signal md:text-xl">{project.impactStatement}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel md:text-base">
          {project.description}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-steel md:text-[11px]"
              >
                {tech}
              </li>
            ))}
          </ul>
          {links.length > 0 ? (
            <div className="flex gap-2">
              {links.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 border border-bone/30 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-bone transition-colors duration-150 hover:border-signal hover:bg-signal hover:text-ink"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </a>
              ))}
            </div>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-steel">
              {project.wip ? 'In Development' : 'Links coming soon'}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}