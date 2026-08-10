import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TapeStrip, Thumbtack, SketchStar } from '../decorations/HandDrawnDecorations';
import aboutData from '../../All data/data/AboutData.json';
import { User, Code2 } from 'lucide-react';

// Use this relative path for Vite to pick up the image correctly, 
// or import it if the bundler allows it. We'll use import so Vite hashes it.
import profileImage from '../../All data/assets/image.webp';

export const AboutSection = () => {
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
            className="w-full max-w-sm p-3 shadow-hard-lg"
          >
            <div className="relative w-full aspect-[4/5] bg-[#e5e0d8] border-[3px] border-[#2d2d2d] wobbly-card overflow-hidden">
              <img
                src={profileImage}
                alt="Swar Shinde"
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </Card>
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full lg:w-7/12 space-y-6">
          <div className="space-y-2">
            <Badge variant="blue" rotate="right" icon={User}>
              About Me
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-[#2d2d2d]">
              The Developer Behind The Screen ✏️
            </h2>
          </div>

          <Card variant="postit" decoration="none" rotate="slightRight" className="p-6 sm:p-8 space-y-4">
            {aboutData.paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-xl font-handwriting font-bold leading-relaxed text-[#2d2d2d]/90"
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))}
            
            <div className="pt-4 mt-2 border-t-2 border-dashed border-[#2d2d2d]/30 flex items-center justify-between">
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
