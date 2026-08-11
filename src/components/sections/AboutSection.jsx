import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TapeStrip, Thumbtack, SketchStar } from '../decorations/HandDrawnDecorations';
import aboutData from '../../All data/data/AboutData.json';
import { User, Code2 } from 'lucide-react';

// Use this relative path for Vite to pick up the image correctly, 
// or import it if the bundler allows it. We'll use import so Vite hashes it.
import profileImage from '../../All data/Cloudy Face.webp';

export const AboutSection = () => {
  const cardRef = useRef(null);

  // 3D Parallax Mouse Tilt Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    const cardEl = cardRef.current;
    if (cardEl) {
      cardEl.addEventListener('mousemove', handleMouseMove);
      cardEl.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (cardEl) {
        cardEl.removeEventListener('mousemove', handleMouseMove);
        cardEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section id="about" className="relative pt-16 pb-12 scroll-mt-24">
      {/* Subtle Doodle Floating Accents */}
      <div className="absolute top-4 right-10 opacity-35 animate-float pointer-events-none hidden md:block" style={{ animationDelay: '0.5s' }}>
        <span className="font-handwriting font-bold text-3xl text-[#2d5da1]">{'=>'}</span >
      </div>
      <div className="absolute bottom-4 left-6 opacity-35 animate-float pointer-events-none hidden md:block" style={{ animationDelay: '1.2s' }}>
        <span className="font-handwriting font-bold text-3xl text-[#ff4d4d]">{`[ ]`}</span >
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Side: Image / Visuals */}
        <div className="w-full lg:w-5/12 flex justify-center relative">
          {/* Decorative Elements */}
          <div className="absolute -top-6 -left-6 z-10 text-[#2d5da1] hidden md:block">
            <SketchStar className="w-10 h-10 stroke-[2]" />
          </div>

          <div
            ref={cardRef}
            className="w-full max-w-lg p-3 group flex justify-center transition-transform duration-200 ease-out"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              className="relative w-full aspect-[4/5] flex items-center justify-center animate-float"
              style={{ transform: 'translateZ(20px)' }}
            >
              <img
                src={profileImage}
                alt="Swar Shinde"
                className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full lg:w-7/12 space-y-6">
          <div className="space-y-2">
            <Badge variant="blue" rotate="right" icon={User}>
              About Me
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-[var(--color-ink)]">
              The Developer Behind The Screen ✏️
            </h2>
          </div>

          <Card variant="postit" decoration="none" rotate="slightRight" className="p-6 sm:p-8 space-y-4">
            {aboutData.paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-xl font-handwriting font-bold leading-relaxed text-[var(--color-ink)]/90"
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))}
            
            <div className="pt-4 mt-2 border-t-2 border-dashed border-[var(--color-ink)]/30 flex items-center justify-between">
              <span className="font-heading font-bold text-[#ff4d4d] text-lg flex items-center gap-1.5">
                <Code2 className="w-5 h-5 stroke-[2.5]" /> Keep Building
              </span>
            </div>
          </Card>
        </div>

      </div>

    </section>
  );
};
