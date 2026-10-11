import React, { useRef } from "react";
import { aboutData, heroData } from "../../data/content";
import { sectionCopy } from "../../data/sectionCopy";
import { resolveAvatar } from "../../utils/assets";
import { gsap } from "../../utils/gsap";
import { clipReveal, parallax, revealUp } from "../../utils/scrollEffects";
import { useMotionMedia } from "../../hooks/useMotionMedia";
import { AssetImage } from "../ui/AssetImage";
import { SectionLabel } from "../ui/SectionLabel";
import { SplitWords } from "../ui/SplitWords";

export function About() {
  const rootRef = useRef<HTMLElement>(null);
  const avatar = resolveAvatar();
  const [lead, ...rest] = aboutData.paragraphs;

  useMotionMedia(rootRef, ({ reduce }, root) => {
    if (reduce) return;
    const q = gsap.utils.selector(root);
    const leadEl = q("[data-lead]")[0];
    if (leadEl) {
      gsap.fromTo(
        q("[data-lead-word]"),
        { opacity: 0.14 },
        { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: leadEl, start: "top 80%", end: "bottom 45%", scrub: true } }
      );
    }
    const media = q("[data-about-media]")[0];
    const img = q("[data-about-img]")[0];
    if (media) clipReveal(media, media);
    if (img && media) parallax(img, media, 7);
    q("[data-about-rest]").forEach((p) => revealUp(p, p, "top 85%"));
  });

  return (
    <section id="about" ref={rootRef} tabIndex={-1} aria-labelledby="about-title" className="relative z-[3] py-[18vh] outline-none">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <figure className="lg:col-span-4">
          <div data-about-media className="relative aspect-[3/4] w-full max-w-md overflow-hidden bg-transparent">
            <AssetImage
              data-about-img
              asset={avatar}
              alt={`${heroData.name}, smiling`}
              className="about-portrait absolute inset-0 h-full w-full object-contain object-bottom" />
            
          </div>
          <figcaption className="mt-3 font-mono text-xs text-muted">{heroData.name}</figcaption>
        </figure>

        <div className="lg:col-span-7 lg:col-start-6">
          <SectionLabel>
            <span id="about-title">{sectionCopy.about.label}</span>
          </SectionLabel>
          {lead &&
          <p data-lead className="text-balance mt-6 font-display text-[clamp(1.75rem,3.3vw,3.1rem)] font-light leading-[1.14] tracking-[-0.02em] text-ink">
              <SplitWords text={lead} mode="plain" wordAttr="data-lead-word" />
            </p>
          }
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {rest.map((p, i) =>
            <p key={i} data-about-rest className={`text-lg leading-relaxed text-muted ${i === 0 ? "md:col-span-2 md:max-w-2xl md:text-xl md:text-ink" : ""}`}>
                {p}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>);

}
