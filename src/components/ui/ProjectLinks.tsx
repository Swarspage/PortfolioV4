import React from "react";
import { ArrowUpRightIcon, CodeIcon, LockIcon, PlayIcon } from "lucide-react";
import type { ProjectItem } from "../../types/content";

interface LinkSpec {
  key: string;
  label: string;
  emptyLabel: string;
  href: string | null;
  Icon: typeof CodeIcon;
}

/** GitHub / live / demo links. Null links render as an explicit, non-interactive state. */
export function ProjectLinks({ project }: {project: ProjectItem;}) {
  const links: LinkSpec[] = [
  { key: "live", label: "Live site", emptyLabel: "Not deployed", href: project.liveLink, Icon: ArrowUpRightIcon },
  { key: "source", label: "Source", emptyLabel: "Source private", href: project.githubLink, Icon: CodeIcon }];

  if (project.demoLink) {
    links.push({ key: "demo", label: "Watch demo", emptyLabel: "", href: project.demoLink, Icon: PlayIcon });
  }

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {links.map(({ key, label, emptyLabel, href, Icon }, i) =>
      <li key={key}>
          {href ?
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${label} — ${project.name} (opens in a new tab)`}
          className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm transition-colors duration-200 ease-out ${
          i === 0 ?
          "bg-ink text-bg hover:bg-accent" :
          "border border-line text-ink hover:border-[color:var(--ink)]"}`
          }>
          
              {label}
              <Icon aria-hidden className="h-4 w-4" />
            </a> :

        <span className="inline-flex h-10 items-center gap-2 rounded-full border border-dashed border-line px-4 text-sm text-muted">
              <LockIcon aria-hidden className="h-3.5 w-3.5" />
              {emptyLabel}
            </span>
        }
        </li>
      )}
    </ul>);

}