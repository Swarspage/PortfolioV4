import React, { useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Code2, PenTool } from 'lucide-react';
import skillsData from '../../All data/data/SkillsData.json';
import gsap from 'gsap';

const icons = import.meta.glob('../../All data/assets/*.{webp,png,jpg,svg}', { eager: true, query: '?url', import: 'default' });

// Helper to get image URL in Vite
const getImageUrl = (imageSrc) => {
  if (!imageSrc) return null;
  const path = `../../All data/assets/${imageSrc}`;
  return icons[path] || null;
};

export const SkillsSection = () => {
  // Group skills by category
  const categories = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categoryRefs = useRef([]);
  categoryRefs.current = [];

  const addToRefs = (el) => {
    if (el && !categoryRefs.current.includes(el)) {
      categoryRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              entry.target,
              { opacity: 0, scale: 0.95, y: 30 },
              { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    categoryRefs.current.forEach((ref) => observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="relative pt-16 pb-12 scroll-mt-24 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="blue" rotate="right" icon={Code2}>
          Tech Stack
        </Badge>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#2d2d2d]">
          My Arsenal <PenTool className="inline-block w-8 h-8 -mt-2 text-[#ff4d4d]" />
        </h2>
        <p className="text-xl text-[#2d2d2d]/80 font-handwriting">
          The tools and technologies I use to bring ideas to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(categories).map(([category, skills], idx) => (
          <div key={category} ref={addToRefs} className="opacity-0">
            <Card
              variant="default"
              decoration={idx % 2 === 0 ? 'tape' : 'tack'}
              rotate={idx % 2 === 0 ? 'slightLeft' : 'slightRight'}
              className="p-6 space-y-5 shadow-hard-lg hover:shadow-hard-xl transition-shadow duration-300 h-full"
            >
              <h3 className="font-heading text-2xl font-bold text-[#2d2d2d] border-b-2 border-dashed border-[#2d2d2d]/30 pb-2">
                {category}
              </h3>
              
              <div className="flex flex-wrap gap-4">
                {skills.map((skill, index) => {
                  const iconPath = getImageUrl(skill.icon);
                  
                  return (
                    <div 
                      key={index} 
                      className="group relative flex flex-col items-center justify-center gap-2 p-2 w-[72px] transition-all duration-300 hover:-translate-y-2"
                    >
                      <div 
                        className="w-14 h-14 bg-white border-2 border-[#2d2d2d] wobbly-circle flex items-center justify-center shadow-hard-sm transition-all duration-300 group-hover:scale-110"
                        style={{ '--hover-glow': skill.glow }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = skill.glow;
                          e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${skill.glow}80`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#2d2d2d';
                          e.currentTarget.style.boxShadow = '4px 4px 0px 0px #2d2d2d';
                        }}
                      >
                        {iconPath && (
                          <img 
                            src={iconPath} 
                            alt={skill.skill} 
                            className="w-8 h-8 object-contain transition-transform duration-300 group-hover:rotate-12"
                          />
                        )}
                      </div>
                      <span className="font-handwriting font-bold text-xs sm:text-sm text-center text-[#2d2d2d]/80 group-hover:text-[#2d2d2d] transition-colors leading-tight">
                        {skill.skill}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
