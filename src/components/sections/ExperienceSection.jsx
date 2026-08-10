import React, { useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Briefcase, Calendar, MapPin, Target } from 'lucide-react';
import experienceData from '../../All data/data/ExperienceData.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.experience-card');

      cards.forEach((card, index) => {
        // We don't animate the last card scaling down
        if (index === cards.length - 1) return;

        // Scale down the card as the next one scrolls up over it
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 10%', // When it sticks to the top
            endTrigger: cards[index + 1],
            end: 'top 30%', // When the next card comes up
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="relative pt-16 pb-32 w-full max-w-4xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
        <Badge variant="orange" rotate="left" icon={Briefcase}>
          My Journey
        </Badge>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-ink)]">
          Experience <Target className="inline-block w-8 h-8 -mt-2 text-[#ff4d4d]" />
        </h2>
        <p className="text-xl text-[var(--color-ink)]/80 font-handwriting">
          Where I've been and what I've built.
        </p>
      </div>

      {/* Sticky Stacking Container */}
      <div className="relative flex flex-col gap-12 pb-24">
        {experienceData.map((exp, idx) => (
          <div 
            key={idx} 
            className="experience-card sticky top-24 w-full"
            style={{ zIndex: idx }}
          >
            <Card
              variant="default"
              decoration={idx % 2 === 0 ? 'tape' : 'tack'}
              rotate={idx % 2 === 0 ? 'slightLeft' : 'slightRight'}
              className="p-6 md:p-8 shadow-hard-xl bg-[var(--color-bg)] w-full border-4 border-[var(--color-ink)] transform-gpu origin-top"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b-2 border-dashed border-[var(--color-ink)]/30 pb-4 mb-4">
                <div className="space-y-1">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-ink)]">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 font-handwriting text-lg text-[#ff4d4d] font-bold">
                    <MapPin className="w-5 h-5" /> {exp.org}
                  </div>
                </div>
                
                <div className="flex flex-col md:items-end gap-2">
                  <span className="font-handwriting font-bold text-[var(--color-ink)]/70 flex items-center gap-1 bg-[var(--color-ink)]/5 px-3 py-1 rounded-full border border-[var(--color-ink)]/20 w-max">
                    <Calendar className="w-4 h-4" /> {exp.duration}
                  </span>
                  {exp.active && (
                    <span className="text-xs font-bold px-2 py-1 bg-[#88CE02]/20 text-[#88CE02] border border-[#88CE02] rounded-full uppercase tracking-wider w-max">
                      Current
                    </span>
                  )}
                </div>
              </div>
              
              <p className="font-handwriting text-lg md:text-xl text-[var(--color-ink)]/80 leading-relaxed">
                {exp.description}
              </p>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
