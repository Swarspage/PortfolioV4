import React, { useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { GraduationCap, BookOpen, Award, Sparkles } from 'lucide-react';
import educationData from '../../All data/data/EducationData.json';
import gsap from 'gsap';

export const EducationSection = () => {
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
              { opacity: 0, y: 50, rotation: entry.target.dataset.rotate === 'left' ? -10 : 10, scale: 0.8 },
              { opacity: 1, y: 0, rotation: 0, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={containerRef} className="relative pt-16 pb-20 w-full max-w-6xl mx-auto px-4 overflow-hidden">
      
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

      {/* Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 relative z-10">
        {educationData.map((edu, idx) => (
          <div 
            key={idx} 
            ref={addToRefs} 
            data-rotate={idx % 2 === 0 ? 'left' : 'right'}
            className="opacity-0 h-full flex flex-col"
          >
            <Card
              variant="default"
              decoration={idx % 2 === 0 ? 'tape' : 'tack'}
              rotate={idx % 2 === 0 ? 'slightLeft' : 'slightRight'}
              className="p-8 shadow-hard-xl bg-[var(--color-surface)] w-full border-4 border-[var(--color-ink)] flex flex-col h-full items-center text-center group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
            >
              {/* Glorious Top Ribbon Decor */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ff4d4d] via-[#F7DF1E] to-[#61DAFB] opacity-80" />

              <div className="w-16 h-16 bg-[var(--color-ink)] rounded-full flex items-center justify-center mb-6 shadow-hard-sm group-hover:scale-110 transition-transform duration-300 wobbly-circle">
                <Award className="w-8 h-8 text-white" />
              </div>

              <h3 className="font-heading text-2xl font-bold text-[var(--color-ink)] mb-2 leading-tight">
                {edu.institution}
              </h3>
              
              <div className="w-12 h-1 bg-[var(--color-ink)]/20 rounded-full mb-4 wobbly-line" />

              <p className="font-handwriting font-bold text-lg text-[#00618A] mb-2">
                {edu.degree}
              </p>
              
              <p className="font-handwriting text-[var(--color-ink)]/70 text-base mb-6 flex-grow">
                {edu.details}
              </p>

              <div className="mt-auto w-full flex items-center justify-between border-t-2 border-dashed border-[var(--color-ink)]/20 pt-4">
                <span className="font-handwriting font-bold text-[var(--color-ink)]/90 bg-[var(--color-bg)] px-3 py-1 border-2 border-[var(--color-ink)] rounded-sm shadow-hard-sm text-sm transform -rotate-2">
                  {edu.years}
                </span>

                {edu.active ? (
                  <span className="text-xs font-bold px-3 py-1 bg-[#88CE02] text-white border-2 border-[#2d2d2d] shadow-hard-sm rounded-full uppercase tracking-wider transform rotate-2">
                    Pursuing
                  </span>
                ) : (
                  <span className="text-xs font-bold px-3 py-1 bg-[var(--color-ink)]/10 text-[var(--color-ink)] border-2 border-[var(--color-ink)] rounded-full uppercase tracking-wider transform rotate-2">
                    Graduated
                  </span>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
