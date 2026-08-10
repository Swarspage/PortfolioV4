import React, { useRef, useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Trophy, Rocket, HeartHandshake, GraduationCap, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import achievementsData from '../../All data/data/AchievementsData.json';
import gsap from 'gsap';

const imageModules = import.meta.glob('../../All data/assets/Achievements/*.{webp,png,jpg,jpeg}', { eager: true, query: '?url', import: 'default' });

// Image mapping based on titles
const imageMapping = {
  "Shipped to 500+ Users · SIMS": "soloInternHODPic.webp",
  "Internship · Full Dev Team": "internshipGroupPhoto.webp",
  "Internship Certificate · DMCE": "InternCertificate.webp",
  "Letter of Appreciation": "LOA.webp",
  "Official Certificate · TT Doubles": "LetterofAppreciationInternship.webp",
  "Top 8 Finalist · Code-A-Thon 2.0": "CodeAThonehackthon.webp",
  "The Team Behind Singularity": "codeAThon2.0withTeam.webp",
  "2nd Place · Table Tennis Doubles": "Tabletennisdoubles2ndprize.webp"
};

const getImageUrl = (title) => {
  const fileName = imageMapping[title];
  if (!fileName) return null;
  const path = `../../All data/assets/Achievements/${fileName}`;
  return imageModules[path] || null;
};

const IconMap = {
  "trophy": Trophy,
  "rocket": Rocket,
  "volunteer": HeartHandshake,
  "academic": GraduationCap
};

export const AchievementsSection = () => {
  const containerRef = useRef(null);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeAchievement, setActiveAchievement] = useState(null);
  const itemsPerPage = 2;
  
  const totalPages = Math.ceil(achievementsData.length / itemsPerPage);
  
  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
      setIsAnimating(false);
    }, 300);
  };
  
  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
      setIsAnimating(false);
    }, 300);
  };
  
  const currentAchievements = achievementsData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <section id="achievements" ref={containerRef} className="relative pt-16 pb-20 w-full max-w-6xl mx-auto px-4 overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 relative z-10">
        <Badge variant="blue" rotate="left" icon={Star}>
          Highlights
        </Badge>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-ink)]">
          Achievements & Wins
        </h2>
        <p className="text-xl text-[var(--color-ink)]/80 font-handwriting">
          Moments I'm genuinely proud of.
        </p>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-end gap-4 mb-8">
        <button 
          onClick={handlePrev}
          className="p-3 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-bg)] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors wobbly-circle shadow-hard-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNext}
          className="p-3 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-bg)] hover:bg-[var(--color-ink)] hover:text-[var(--color-bg)] transition-colors wobbly-circle shadow-hard-sm"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Grid Layout with Transition */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 transition-opacity duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {currentAchievements.map((achievement, idx) => {
          // Keep visual variety consistent with global index
          const globalIdx = currentPage * itemsPerPage + idx;
          const isEven = globalIdx % 2 === 0;
          const imageSrc = getImageUrl(achievement.title);
          const IconComponent = IconMap[achievement.iconName] || Star;

          return (
            <div 
              key={globalIdx} 
              className="h-full flex flex-col cursor-pointer"
              onClick={() => setActiveAchievement({
                title: achievement.title,
                category: achievement.category,
                description: achievement.description,
                imageSrc: imageSrc,
                date: achievement.date,
                iconComponent: IconComponent
              })}
            >
              <Card
                variant="default"
                decoration={isEven ? 'tape' : 'tack'}
                rotate={isEven ? 'slightLeft' : 'slightRight'}
                className="p-6 md:p-8 shadow-hard-xl bg-[var(--color-surface)] w-full border-4 border-[var(--color-ink)] flex flex-col h-full group hover:-translate-y-2 transition-transform duration-300"
              >
                {/* Photo Area */}
                <div className="w-full mb-6">
                  {imageSrc ? (
                    <div className="relative p-2 pb-8 bg-[var(--color-surface)] border-2 border-[var(--color-ink)] shadow-hard-sm transform rotate-[-2deg] group-hover:rotate-0 transition-transform duration-300 overflow-hidden group-image">
                      <img 
                        src={imageSrc} 
                        alt={achievement.title} 
                        className="w-full h-56 object-cover border border-[#2d2d2d]/20 filter grayscale-[20%] sepia-[10%] group-hover:filter-none transition-all duration-500" 
                      />
                      {/* Hover Tag */}
                      <div className="absolute top-4 right-4 bg-[var(--color-surface)] border-2 border-[var(--color-ink)] rounded-md px-2 py-1 shadow-hard-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-handwriting text-xs font-bold z-20 transform rotate-3 text-[var(--color-ink)]">
                        Click to enlarge 🔍
                      </div>
                      <div className="absolute bottom-2 left-0 w-full text-center font-handwriting font-bold text-[var(--color-ink)] text-sm px-2">
                        {achievement.date}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-56 flex items-center justify-center bg-[var(--color-bg)] border-4 border-dashed border-[var(--color-ink)]/20 rounded-3xl wobbly-circle transform rotate-[2deg]">
                      <IconComponent className="w-24 h-24 text-[var(--color-ink)]/20" />
                    </div>
                  )}
                </div>

                {/* Text Area */}
                <div className="flex flex-col flex-grow">
                  <span className="font-handwriting font-bold text-[#00618A] uppercase tracking-wider text-sm mb-2">
                    {achievement.category}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-[var(--color-ink)] leading-tight mb-4">
                    {achievement.title}
                  </h3>
                  
                  <div className="w-16 h-1 bg-[#F7DF1E] rounded-full mb-4 wobbly-line" />
                  
                  <p className="font-handwriting text-lg text-[var(--color-ink)]/80 leading-relaxed flex-grow">
                    {achievement.description}
                  </p>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      
      {/* Page Indicators */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === currentPage) return;
              setIsAnimating(true);
              setTimeout(() => {
                setCurrentPage(i);
                setIsAnimating(false);
              }, 300);
            }}
            className={`h-3 rounded-full transition-all duration-300 border-2 border-[var(--color-ink)] ${i === currentPage ? 'w-8 bg-[var(--color-ink)]' : 'w-3 bg-[var(--color-surface)]'}`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
      {/* Interactive Modal */}
      <Modal 
        isOpen={!!activeAchievement} 
        onClose={() => setActiveAchievement(null)} 
        data={activeAchievement}
        type="achievement"
      />
    </section>
  );
};
