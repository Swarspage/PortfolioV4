import React, { useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { GraduationCap, BookOpen, Award, Sparkles } from 'lucide-react';
import educationData from '../../All data/data/EducationData.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EducationSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.education-card');

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;

        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 10%',
            endTrigger: cards[index + 1],
            end: 'top 30%',
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={containerRef} className="relative pt-16 pb-32 w-full max-w-4xl mx-auto px-4">
      {/* Background Decor */}
      <div className="absolute top-20 left-10 opacity-20 hidden md:block">
        <Sparkles className="w-16 h-16 text-[#ff4d4d]" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 hidden md:block">
        <Sparkles className="w-20 h-20 text-[#88CE02]" />
      </div>

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 relative z-10">
        <Badge variant="green" rotate="right" icon={GraduationCap}>
          Education
        </Badge>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-ink)]">
          My Academic Path <BookOpen className="inline-block w-8 h-8 -mt-2 text-[#00618A]" />
        </h2>
        <p className="text-xl text-[var(--color-ink)]/80 font-handwriting">
          The foundation of my knowledge and growth.
        </p>
      </div>

      {/* Sticky Stacking Container */}
      <div className="relative flex flex-col gap-12 pb-24">
        {educationData.map((edu, idx) => (
          <div 
            key={idx} 
            className="education-card sticky top-24 w-full"
            style={{ zIndex: idx }}
          >
            <Card
              variant="default"
              decoration={idx % 2 === 0 ? 'tape' : 'tack'}
              rotate={idx % 2 === 0 ? 'slightLeft' : 'slightRight'}
              className="p-6 md:p-8 shadow-hard-xl bg-[var(--color-surface)] w-full border-4 border-[var(--color-ink)] transform-gpu origin-top relative overflow-hidden"
            >
              {/* Glorious Top Ribbon Decor */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ff4d4d] via-[#F7DF1E] to-[#61DAFB] opacity-80" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b-2 border-dashed border-[var(--color-ink)]/30 pb-4 mb-4">
                <div className="space-y-1">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-ink)]">
                    {edu.institution}
                  </h3>
                  <div className="flex items-center gap-2 font-handwriting text-lg text-[#00618A] font-bold">
                    <Award className="w-5 h-5" /> {edu.degree}
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2">
                  <span className="font-handwriting font-bold text-[var(--color-ink)]/90 bg-[var(--color-bg)] px-3 py-1 border-2 border-[var(--color-ink)] rounded-sm shadow-hard-sm text-sm transform -rotate-2 w-max">
                    {edu.years}
                  </span>
                  {edu.active ? (
                    <span className="text-xs font-bold px-3 py-1 bg-[#88CE02] text-white border-2 border-[#2d2d2d] shadow-hard-sm rounded-full uppercase tracking-wider w-max">
                      Pursuing
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-3 py-1 bg-[var(--color-ink)]/10 text-[var(--color-ink)] border-2 border-[var(--color-ink)] rounded-full uppercase tracking-wider w-max">
                      Graduated
                    </span>
                  )}
                </div>
              </div>

              <p className="font-handwriting text-lg md:text-xl text-[var(--color-ink)]/80 leading-relaxed">
                {edu.details}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
