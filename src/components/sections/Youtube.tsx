import React, { useRef, useState } from "react";
import { ArrowUpRightIcon, LockIcon, PlayIcon } from "lucide-react";
import { youtubeData } from "../../data/content";
import { sectionCopy } from "../../data/sectionCopy";
import { resolveBanner, resolveThumbnail, type ResolvedAsset } from "../../utils/assets";
import { plate } from "../../utils/placeholders";
import { gsap } from "../../utils/gsap";
import { clipReveal, parallax, revealUp } from "../../utils/scrollEffects";
import { useMotionMedia } from "../../hooks/useMotionMedia";
import { AssetImage } from "../ui/AssetImage";
import { Magnetic } from "../ui/Magnetic";
import { SectionLabel } from "../ui/SectionLabel";

export function Youtube() {
  const rootRef = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState(false);
  const { featuredVideo, recentVideos } = youtubeData;
  const copy = sectionCopy.youtube;
  const banner = resolveBanner();
  const featuredPoster: ResolvedAsset = {
    src: `https://i.ytimg.com/vi/${featuredVideo.id}/hqdefault.jpg`,
    placeholder: plate(copy.featured, featuredVideo.id, "wide"),
    isPlaceholder: false,
    path: featuredVideo.id
  };

  useMotionMedia(rootRef, ({ reduce }, root) => {
    if (reduce) return;
    const q = gsap.utils.selector(root);
    const media = q("[data-yt-banner]")[0];
    const img = q("[data-yt-banner-img]")[0];
    if (media) clipReveal(media, media);
    if (img && media) parallax(img, media, 10);
    const header = q("[data-yt-header]")[0];
    if (header) revealUp(header.children, header);
    const list = q("[data-yt-list]")[0];
    if (list) revealUp(list.children, list, "top 85%");
  });

  return (
    <section id="youtube" ref={rootRef} aria-labelledby="youtube-title" className="relative z-[3] py-[14vh]">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div data-yt-banner className="relative aspect-[16/7] overflow-hidden rounded-[22px] bg-raised md:aspect-[16/5]">
          <AssetImage data-yt-banner-img asset={banner} alt="" className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover" />
        </div>

        <header data-yt-header className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel>{copy.label}</SectionLabel>
            <h2 id="youtube-title" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.75rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-ink">
              {copy.title}
            </h2>
          </div>
          <p className="self-end text-muted lg:col-span-4 lg:col-start-9">{copy.intro}</p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-video overflow-hidden rounded-[18px] bg-raised">
              {playing ?
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${featuredVideo.id}?autoplay=1&rel=0`}
                title={copy.featured}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full" /> :


              <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${copy.featured.toLowerCase()}`} className="group absolute inset-0">
                  <AssetImage asset={featuredPoster} alt="" className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]" />
                  <span className="absolute inset-0 grid place-items-center">
                    <Magnetic strength={0.4}>
                      <span className="grid h-20 w-20 place-items-center rounded-full bg-bg text-ink shadow-lg transition-colors duration-200 ease-out group-hover:bg-accent group-hover:text-[color:var(--on-accent)]">
                        <PlayIcon aria-hidden className="ml-1 h-7 w-7" />
                      </span>
                    </Magnetic>
                  </span>
                </button>
              }
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="font-mono text-xs text-muted">{copy.featured}</p>
              <a
                href={featuredVideo.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-ink underline-offset-4 hover:underline">
                
                {copy.watch}
                <ArrowUpRightIcon aria-hidden className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3 className="font-mono text-xs text-muted">{copy.recent}</h3>
            <ul data-yt-list className="mt-4 divide-y divide-[color:var(--line)] border-y border-line">
              {recentVideos.map((video) => {
                const thumb = resolveThumbnail(video.thumbnail, video.title);
                const inner =
                <>
                    <span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-[10px] bg-raised sm:w-40">
                      <AssetImage asset={thumb} alt="" className="h-full w-full object-cover" />
                      {video.isLocked &&
                    <span className="absolute inset-0 grid place-items-center text-ink" style={{ backgroundColor: "color-mix(in oklab, var(--bg) 65%, transparent)" }}>
                          <LockIcon aria-hidden className="h-4 w-4" />
                        </span>
                    }
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[11px] text-muted">{video.label}</span>
                      <span className="mt-1 block leading-snug text-ink">{video.title}</span>
                      {video.isLocked && <span className="mt-1 block font-mono text-[11px] text-accent">{copy.locked}</span>}
                    </span>
                  </>;

                return (
                  <li key={video.title}>
                    {video.isLocked ?
                    <div aria-disabled="true" className="flex items-center gap-4 py-4 opacity-80">
                        {inner}
                      </div> :

                    <a href={video.link} target="_blank" rel="noreferrer" className="group flex items-center gap-4 py-4">
                        {inner}
                        <ArrowUpRightIcon aria-hidden className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                      </a>
                    }
                  </li>);

              })}
            </ul>
          </div>
        </div>
      </div>
    </section>);

}