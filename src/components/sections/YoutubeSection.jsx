import React, { useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MonitorPlay, Play, Lock, ExternalLink } from 'lucide-react';
import youtubeData from '../../All data/data/YoutubeData.json';
import utubeBanner from '../../All data/assets/utubebanner.webp';
import gsap from 'gsap';

export const YoutubeSection = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { opacity: 0, y: 50, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="youtube" ref={containerRef} className="relative pt-16 pb-20 w-full max-w-6xl mx-auto px-4 overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 relative z-10">
        <Badge variant="red" rotate="right" icon={MonitorPlay}>
          Content Creator
        </Badge>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-ink)]">
          YouTube & Live Builds
        </h2>
        <p className="text-xl text-[var(--color-ink)]/80 font-handwriting">
          Building in public and sharing the process.
        </p>
      </div>

      {/* Featured Video (Top) */}
      <div 
        ref={addToRefs}
        className="mb-12 w-full max-w-4xl mx-auto opacity-0"
      >
        <Card
          variant="default"
          decoration="tape"
          rotate="none"
          className="p-4 md:p-6 shadow-hard-xl bg-[var(--color-surface)] w-full border-4 border-[var(--color-ink)] group relative overflow-hidden"
        >
          {/* Decorative Banner Background */}
          <div className="absolute top-0 left-0 w-full h-40 opacity-20 hidden md:block">
            <img src={utubeBanner} alt="Youtube Banner" loading="lazy" width="640" height="360" className="w-full h-full object-cover" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#ff4d4d] rounded-full flex items-center justify-center border-2 border-[#2d2d2d] shadow-hard-sm wobbly-circle">
                <Play className="w-5 h-5 text-white fill-current" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[var(--color-ink)]">
                Featured Video
              </h3>
            </div>
            
            <div className="w-full aspect-video border-4 border-[var(--color-ink)] rounded-lg overflow-hidden bg-[var(--color-ink)] shadow-hard-sm isolate transform-gpu">
              <iframe 
                className="w-full h-full relative z-0"
                src={`https://www.youtube.com/embed/${youtubeData.featuredVideo.id}?rel=0`} 
                title="Featured YouTube Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {youtubeData.recentVideos.map((video, idx) => {
          const isLocked = video.isLocked;
          
          return (
            <div 
              key={idx} 
              ref={addToRefs}
              className="opacity-0 h-full flex flex-col"
            >
              <Card
                variant="default"
                decoration="tack"
                rotate={idx % 2 === 0 ? 'slightLeft' : 'slightRight'}
                className="p-4 md:p-5 shadow-hard-lg bg-[var(--color-surface)] w-full border-4 border-[var(--color-ink)] flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300 relative"
              >
                {/* Thumbnail Area */}
                <a 
                  href={video.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`block relative w-full aspect-video border-2 border-[var(--color-ink)] mb-4 overflow-hidden rounded-md shadow-hard-sm ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isLocked ? 'filter grayscale blur-[2px]' : ''}`} 
                  />
                  
                  {/* Overlay for Locked/Play */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#2d2d2d]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isLocked ? (
                      <div className="w-12 h-12 bg-[var(--color-surface)] rounded-full flex items-center justify-center border-2 border-[var(--color-ink)] transform -rotate-12 shadow-hard-sm">
                        <Lock className="w-6 h-6 text-[var(--color-ink)]" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-[#ff4d4d] rounded-full flex items-center justify-center border-2 border-[#2d2d2d] shadow-hard-sm">
                        <ExternalLink className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="absolute top-2 right-2 px-2 py-1 bg-[var(--color-surface)] border-2 border-[var(--color-ink)] rounded-full font-handwriting font-bold text-xs text-[var(--color-ink)] shadow-hard-sm transform rotate-3">
                    {video.label}
                  </div>
                </a>

                {/* Text Area */}
                <div className="flex flex-col flex-grow">
                  <h4 className="font-heading text-xl font-bold text-[var(--color-ink)] leading-tight mb-2">
                    {video.title}
                  </h4>
                  {isLocked && (
                    <p className="font-handwriting text-[#ff4d4d] font-bold text-sm mt-auto flex items-center gap-1">
                      <Lock className="w-4 h-4" /> Members Only / Locked
                    </p>
                  )}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
};
