import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { TapeStrip, Thumbtack, SketchStar } from '../decorations/HandDrawnDecorations';
import aboutData from '../../All data/data/AboutData.json';
import { User, Code2 } from 'lucide-react';

// Use this relative path for Vite to pick up the image correctly, 
// or import it if the bundler allows it. We'll use import so Vite hashes it.
import profileImage from '../../All data/assets/image.webp';

export const AboutSection = () => {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section id="about" className="relative pt-16 pb-12 scroll-mt-24">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Side: Image / Visuals */}
        <div className="w-full lg:w-5/12 flex justify-center relative">
          {/* Decorative Elements */}
          <div className="absolute -top-6 -left-6 z-10 text-[#2d5da1] hidden md:block">
            <SketchStar className="w-10 h-10 stroke-[2]" />
          </div>

          <Card
            variant="default"
            decoration="tape"
            rotate="left"
            className="w-full max-w-md p-3 shadow-hard-lg cursor-pointer group"
          >
            <div 
              className="relative w-full aspect-[4/5] bg-[var(--color-muted)] border-[3px] border-[var(--color-ink)] wobbly-card overflow-hidden"
              onClick={() => setActivePhoto({
                title: 'Swar Shinde',
                category: 'About Me',
                description: 'The Developer Behind The Screen ✏️',
                imageSrc: profileImage,
                date: 'Developer'
              })}
            >
              <img
                src={profileImage}
                alt="Swar Shinde"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
              />
              {/* Hover Tag */}
              <div className="absolute top-3 right-3 bg-[var(--color-surface)] border-2 border-[var(--color-ink)] rounded-md px-2 py-1 shadow-hard-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-handwriting text-xs font-bold z-20 transform rotate-3 text-[var(--color-ink)]">
                Click to enlarge 🔍
              </div>
            </div>
          </Card>
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

      <Modal 
        isOpen={!!activePhoto} 
        onClose={() => setActivePhoto(null)} 
        data={activePhoto}
        type="achievement"
      />
    </section>
  );
};
