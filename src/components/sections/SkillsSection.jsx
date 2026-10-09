import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Code2, PenTool, ChevronDown, ChevronUp } from 'lucide-react';
import { SketchCircle } from '../decorations/HandDrawnDecorations';
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
  const requiresDarkBg = ['Tailwind', 'GSAP', 'Framer Motion', 'Three.js', 'Express', 'Vite'];

  // Group skills by category
  const categories = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categoryNames = Object.keys(categories);
  const [activeCategory, setActiveCategory] = useState(categoryNames[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCategory = (cat) => {
    setActiveCategory(prev => prev === cat ? null : cat);
  };

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

    const timeoutId = setTimeout(() => {
      categoryRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [isMobile]);

  return (
    <section id="skills" className="relative pt-16 pb-12 scroll-mt-24 space-y-12">
      {/* Floating Code Accents */}
      <div className="absolute top-2 left-8 opacity-35 animate-float pointer-events-none hidden md:block" style={{ animationDelay: '0.8s' }}>
        <span className="font-handwriting font-bold text-3xl text-[#2d5da1]">{`( )`}</span>
      </div>
      <div className="absolute top-8 right-6 opacity-35 animate-float pointer-events-none hidden md:block" style={{ animationDelay: '1.4s' }}>
        <SketchCircle className="w-12 h-12 text-[#ff4d4d]" />
      </div>
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="blue" rotate="right" icon={Code2}>
          Tech Stack
        </Badge>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-ink)]">
          My Arsenal <PenTool className="inline-block w-8 h-8 -mt-2 text-[#ff4d4d]" />
        </h2>
        <p className="text-xl text-[var(--color-ink)]/80 font-handwriting">
          The tools and technologies I use to bring ideas to life.
        </p>
      </div>

      {!isMobile ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(categories).map(([category, skills], idx) => (
            <div key={category} ref={addToRefs} className="opacity-0">
              <Card
                variant="default"
                decoration={idx % 2 === 0 ? 'tape' : 'tack'}
                rotate={idx % 2 === 0 ? 'slightLeft' : 'slightRight'}
                className="p-6 space-y-5 shadow-hard-lg hover:shadow-hard-xl transition-shadow duration-300 h-full"
              >
                <h3 className="font-heading text-2xl font-bold text-[var(--color-ink)] border-b-2 border-dashed border-[var(--color-ink)]/30 pb-2">
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
                          className={`w-14 h-14 ${requiresDarkBg.includes(skill.skill) ? 'bg-[#2d2d2d]' : 'bg-[var(--color-surface)]'} border-2 border-[var(--color-ink)] wobbly-circle flex items-center justify-center shadow-hard-sm transition-all duration-300 group-hover:scale-110`}
                          style={{ '--hover-glow': skill.glow }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = skill.glow;
                            e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${skill.glow}80`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#2d2d2d';
                            e.currentTarget.style.boxShadow = `4px 4px 0px 0px var(--color-shadow)`;
                          }}
                        >
                          {iconPath && (
                            <img 
                              src={iconPath} 
                              alt={skill.skill} 
                              loading="lazy"
                              width="32"
                              height="32"
                              className="w-8 h-8 object-contain transition-transform duration-300 group-hover:rotate-12"
                            />
                          )}
                        </div>
                        <span className="font-handwriting font-bold text-xs sm:text-sm text-center text-[var(--color-ink)]/80 group-hover:text-[var(--color-ink)] transition-colors leading-tight">
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
      ) : (
        <div className="max-w-3xl mx-auto mt-8 flex flex-col gap-6 relative z-10">
          {categoryNames.map((category, idx) => {
            const isOpen = activeCategory === category;
            
            return (
              <div key={category} ref={addToRefs} className="opacity-0">
                <Card
                  variant="default"
                  decoration={idx % 2 === 0 ? 'tape' : 'tack'}
                  rotate={idx % 2 === 0 ? 'slightLeft' : 'slightRight'}
                  className="p-0 shadow-hard-lg hover:shadow-hard-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between p-6 md:p-8 focus:outline-none"
                  >
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-ink)]">
                      {category}
                    </h3>
                    {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </button>
                  
                  {/* Accordion Body */}
                  <div 
                    className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 border-t-2 border-dashed border-[var(--color-ink)]/30' : 'max-h-0 opacity-0 border-transparent overflow-hidden'}`}
                  >
                    <div className="p-6 md:p-8 pt-6 flex flex-wrap justify-center gap-6 md:gap-8 bg-[var(--color-ink)]/5">
                      {categories[category].map((skill, index) => {
                        const iconPath = getImageUrl(skill.icon);
                        
                        return (
                          <div 
                            key={index} 
                            className="group relative flex flex-col items-center justify-center gap-2 p-2 w-[72px] md:w-[80px] transition-all duration-300 hover:-translate-y-2"
                          >
                            <div 
                              className={`w-14 h-14 md:w-16 md:h-16 ${requiresDarkBg.includes(skill.skill) ? 'bg-[#2d2d2d]' : 'bg-[var(--color-surface)]'} border-2 border-[var(--color-ink)] wobbly-circle flex items-center justify-center shadow-hard-sm transition-all duration-300 group-hover:scale-110`}
                              style={{ '--hover-glow': skill.glow }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = skill.glow;
                                e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${skill.glow}80`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#2d2d2d';
                                e.currentTarget.style.boxShadow = `4px 4px 0px 0px var(--color-shadow)`;
                              }}
                            >
                              {iconPath && (
                                <img 
                                  src={iconPath} 
                                  alt={skill.skill} 
                                  loading="lazy"
                                  width="32"
                                  height="32"
                                  className="w-8 h-8 md:w-10 md:h-10 object-contain transition-transform duration-300 group-hover:rotate-12"
                                />
                              )}
                            </div>
                            <span className="font-handwriting font-bold text-xs sm:text-sm text-center text-[var(--color-ink)]/80 group-hover:text-[var(--color-ink)] transition-colors leading-tight">
                              {skill.skill}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
