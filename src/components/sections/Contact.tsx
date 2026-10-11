import React, { useRef } from "react";
import { ArrowDownIcon, ArrowUpIcon, ArrowUpRightIcon } from "lucide-react";
import { heroData } from "../../data/content";
import { sectionCopy } from "../../data/sectionCopy";
import { siteConfig } from "../../data/siteConfig";
import { resolveResumeUrl, resolveSocialIcon } from "../../utils/assets";
import { gsap } from "../../utils/gsap";
import { maskWords, revealUp } from "../../utils/scrollEffects";
import { useMotionMedia } from "../../hooks/useMotionMedia";
import { scrollToTarget } from "../../hooks/useSmoothScroll";
import { AssetImage } from "../ui/AssetImage";
import { Magnetic } from "../ui/Magnetic";
import { SectionLabel } from "../ui/SectionLabel";
import { SplitWords } from "../ui/SplitWords";

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const copy = sectionCopy.contact;
  const resumeUrl = resolveResumeUrl(heroData.resumeLink);

  useMotionMedia(rootRef, ({ reduce }, root) => {
    if (reduce) return;
    const q = gsap.utils.selector(root);
    maskWords(q("[data-word]"), root, "top 65%");
    const actions = q("[data-contact-actions]")[0];
    if (actions) revealUp(actions.children, actions, "top 90%");
    const socials = q("[data-socials]")[0];
    if (socials) revealUp(socials.children, socials, "top 92%");
  });

  return (
    <section id="contact" ref={rootRef} tabIndex={-1} aria-labelledby="contact-title" className="relative z-[3] flex min-h-[100dvh] flex-col pt-[18vh] outline-none">
      <div className="mx-auto grid w-full max-w-[1600px] flex-1 gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionLabel>{copy.label}</SectionLabel>
          <h2 id="contact-title" className="mt-6 font-display text-[clamp(3rem,8vw,8.5rem)] font-light leading-[0.88] tracking-[-0.04em] text-ink">
            <SplitWords text={copy.title} />
          </h2>

          <div data-contact-actions className="mt-10 grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4 md:mt-12">
            <Magnetic>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-ink px-5 text-base text-bg transition-colors duration-200 ease-out hover:bg-accent sm:px-7 md:text-lg">
                
                {siteConfig.email}
                <ArrowUpRightIcon aria-hidden className="h-5 w-5" />
              </a>
            </Magnetic>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-line px-5 text-ink transition-colors duration-200 ease-out hover:border-[color:var(--ink)] sm:px-6">
              
              {copy.resume}
              <ArrowDownIcon aria-hidden className="h-4 w-4" />
            </a>
          </div>
        </div>

        <ul data-socials className="grid grid-cols-2 gap-3 self-end lg:col-span-4 lg:col-start-9 lg:block lg:border-t lg:border-line">
          {siteConfig.socials.map((s) => {
            const icon = resolveSocialIcon(s.icon, s.label);
            return (
              <li key={s.id} className="rounded-[8px] border border-line lg:rounded-none lg:border-x-0 lg:border-t-0">
                <a href={s.url} target={s.url.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="group flex items-center gap-3 p-3 lg:gap-4 lg:p-0 lg:py-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-raised">
                    <AssetImage asset={icon} alt="" className={icon.isPlaceholder ? "h-full w-full" : "h-4 w-4 object-contain"} />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-ink lg:text-base">{s.label}</span>
                  <span className="hidden font-mono text-xs text-muted sm:inline">{s.handle}</span>
                  <ArrowUpRightIcon aria-hidden className="h-4 w-4 text-muted transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </a>
              </li>);

          })}
        </ul>
      </div>

      <footer className="mx-auto mt-[12vh] flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-7 text-sm text-muted md:px-10">
        <p>
          © {new Date().getFullYear()} {heroData.name} · {siteConfig.location}
        </p>
        <button type="button" onClick={() => scrollToTarget("#hero")} className="inline-flex items-center gap-2 text-ink transition-colors duration-200 ease-out hover:text-accent">
          {copy.backToTop}
          <ArrowUpIcon aria-hidden className="h-4 w-4" />
        </button>
      </footer>
    </section>);

}
