import React, { useRef } from "react";
import { achievementsData } from "../../data/content";
import { sectionCopy } from "../../data/sectionCopy";
import { resolveAchievementImage } from "../../utils/assets";
import { gsap } from "../../utils/gsap";
import { revealUp } from "../../utils/scrollEffects";
import { useMotionMedia } from "../../hooks/useMotionMedia";
import { sceneSignals } from "../scene/sceneSignals";
import { AchievementIcon } from "../ui/AchievementIcon";
import { AssetImage } from "../ui/AssetImage";
import { SectionLabel } from "../ui/SectionLabel";

/** Pinned scene 4: cards travel horizontally along the orbit track. */
export function Achievements() {
  const rootRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const total = achievementsData.length;
  const pad = (n: number) => String(n).padStart(2, "0");

  useMotionMedia(rootRef, ({ desktop, mobile, reduce }, root) => {
    if (reduce) return;
    const q = gsap.utils.selector(root);
    const track = q("[data-ach-track]")[0];
    if (!track) return;

    if (desktop) {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const horizontal = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (s) => {
            sceneSignals.achievements = s.progress;
            if (counterRef.current) counterRef.current.textContent = pad(Math.min(total, Math.floor(s.progress * total) + 1));
          }
        }
      });
      gsap.fromTo(q("[data-ach-progress]"), { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true }
      });

      // Depth: cards settle forward as they reach the reading line.
      q("[data-ach-card]").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.4, scale: 0.94 },
          { opacity: 1, scale: 1, ease: "none", scrollTrigger: { trigger: card, containerAnimation: horizontal, start: "left 98%", end: "left 60%", scrub: true } }
        );
        const img = card.querySelector("[data-ach-img]");
        if (img) {
          gsap.fromTo(img, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: card, containerAnimation: horizontal, start: "left right", end: "right left", scrub: true } });
        }
      });
    }

    if (mobile) {
      gsap.timeline({
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", onUpdate: (s) => sceneSignals.achievements = s.progress }
      });
      q("[data-ach-card]").forEach((card) => revealUp(card, card, "top 88%"));
    }
  });

  return (
    <section
      id="achievements"
      ref={rootRef}
      tabIndex={-1}
      aria-labelledby="achievements-title"
      className="relative z-[3] py-24 outline-none pin:h-dvh-screen pin:overflow-hidden pin:py-0">
      
      <div className="flex h-full flex-col justify-center">
        <header className="mx-auto flex w-full max-w-[1600px] items-end justify-between gap-6 px-5 md:px-10">
          <div>
            <SectionLabel>{sectionCopy.achievements.label}</SectionLabel>
            <h2 id="achievements-title" className="mt-5 font-display text-[clamp(2.25rem,4.4vw,4.25rem)] font-light leading-[0.98] tracking-[-0.03em] text-ink">
              {sectionCopy.achievements.title}
            </h2>
          </div>
          <p aria-hidden className="hidden font-mono text-sm text-muted pin:block">
            <span ref={counterRef} className="text-ink">
              01
            </span>{" "}
            / {pad(total)}
          </p>
        </header>

        <ol
          data-ach-track
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:grid md:overflow-visible md:pb-0 md:grid-cols-2 md:gap-x-8 md:gap-y-14 md:px-10 pin:mt-10 pin:flex pin:w-max pin:gap-8 pin:pl-[max(2.5rem,calc((100vw-1600px)/2+2.5rem))] pin:pr-[20vw]">
          
          {achievementsData.map((item) => {
            const photo = resolveAchievementImage(item.title);
            return (
              <li key={item.title} data-ach-card className="min-w-[82vw] snap-start md:min-w-0 pin:w-[clamp(19rem,28vw,27rem)] pin:shrink-0">
                <article className="h-full rounded-[8px] border border-line bg-bg/70 p-4 backdrop-blur md:rounded-none md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-0">
                  <figure className="relative aspect-[3/2] overflow-hidden rounded-[8px] bg-raised md:rounded-[18px]">
                    <AssetImage
                      data-ach-img
                      asset={photo}
                      alt={item.title}
                      className="absolute inset-y-0 -left-[7%] h-full w-[114%] max-w-none object-cover" />
                    
                    <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-bg text-accent">
                      <AchievementIcon name={item.iconName} />
                    </span>
                  </figure>
                  <div className="mt-5 flex items-center gap-2 font-mono text-xs">
                    <span className="text-accent">{item.category}</span>
                    <span aria-hidden className="text-muted">
                      ·
                    </span>
                    <time className="text-muted">{item.date}</time>
                  </div>
                  <h3 className="mt-2 font-display text-[1.45rem] leading-tight tracking-[-0.01em] text-ink md:text-2xl">{item.title}</h3>
                  <p className="mt-2 line-clamp-[6] text-sm leading-relaxed text-muted md:line-clamp-none">{item.description}</p>
                </article>
              </li>);

          })}
        </ol>

        <span aria-hidden className="mx-5 mt-10 hidden h-px bg-line pin:block md:mx-10">
          <span data-ach-progress className="block h-full origin-left bg-accent" />
        </span>
      </div>
    </section>);

}
