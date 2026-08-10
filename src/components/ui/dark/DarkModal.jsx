import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Code2, Play } from 'lucide-react';
import { DarkCard } from './DarkCard';
import { DarkButton } from './DarkButton';
import gsap from 'gsap';

/**
 * DarkModal — Dark-themed version of Modal.
 * Identical API to Modal.jsx, but styled for a dark/night aesthetic.
 * Props: isOpen, onClose, data, type ('project' | 'achievement')
 */
export const DarkModal = ({ isOpen, onClose, data, type }) => {
  const overlayRef = useRef(null);
  const modalRef  = useRef(null);

  useEffect(() => {
    if (isOpen && data) {
      document.body.style.overflow = 'hidden';

      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.2)' }
      );
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, data]);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 30,
      duration: 0.3,
      onComplete: onClose
    });
  };

  if (!isOpen || !data) return null;

  return (
    <div
      ref={overlayRef}
      /* Darker, slightly blue-tinted backdrop */
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 md:p-8"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-50 w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center border-4 border-[#555] shadow-[3px_3px_0px_rgba(100,100,100,0.3)] hover:bg-[#ff4d4d] hover:border-[#ff4d4d] transition-colors wobbly-circle group"
        >
          <X className="w-6 h-6 text-[#e8e3dc] group-hover:text-white" />
        </button>

        <DarkCard
          variant="default"
          decoration="tape"
          hoverJiggle={false}
          className="w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto no-scrollbar"
        >
          {/* Large Image Area */}
          <div className="w-full mb-6 flex-shrink-0">
            {data.imageSrc ? (
              <div className="relative p-2 pb-10 bg-[#111] border-2 border-[#444] shadow-[3px_3px_0px_rgba(100,100,100,0.2)] transform rotate-[-1deg]">
                <img
                  src={data.imageSrc}
                  alt={data.title}
                  className="w-full max-h-[50vh] object-cover border border-white/10 filter brightness-90"
                />
                {/* Date / label pill */}
                <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 bg-[#1a1a1a] px-4 py-1 border-2 border-[#555] rounded-full text-center font-handwriting font-bold text-[#c9c3b8] shadow-[2px_2px_0px_rgba(80,80,80,0.3)] text-sm md:text-base z-10 whitespace-nowrap">
                  {type === 'project' ? 'Featured Project' : data.date}
                </div>
              </div>
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-[#111] border-4 border-dashed border-[#333] rounded-3xl wobbly-circle transform rotate-[1deg]">
                {data.iconComponent && <data.iconComponent className="w-24 h-24 text-[#444]" />}
              </div>
            )}
          </div>

          {/* Details Area */}
          <div className="flex flex-col flex-grow mt-4">
            <span className="font-handwriting font-bold text-[#89b4fa] uppercase tracking-wider text-sm md:text-base mb-2">
              {type === 'project' ? 'Project Details' : data.category}
            </span>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#e8e3dc] leading-tight mb-4">
              {data.title}
            </h2>

            <div className="w-20 h-1 bg-[#f7df1e]/70 rounded-full mb-6 wobbly-line" />

            <div className="font-handwriting text-xl md:text-2xl text-[#a09a94] leading-relaxed mb-6 space-y-4">
              {data.description}
            </div>

            {/* Tags and Action Links (if project) */}
            {type === 'project' && (
              <div className="mt-auto pt-4 border-t-2 border-dashed border-[#333] space-y-4">
                {data.tags && (
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#111] border-2 border-[#444] rounded-md font-handwriting text-[#c9c3b8] font-bold text-sm shadow-[2px_2px_0px_rgba(80,80,80,0.2)] transform rotate-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {data.liveLink && (
                    <a href={data.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <DarkButton variant="primary" size="sm" className="w-full" icon={ExternalLink}>
                        Live
                      </DarkButton>
                    </a>
                  )}
                  {data.githubLink && (
                    <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <DarkButton variant="secondary" size="sm" className="w-full" icon={Code2}>
                        Code
                      </DarkButton>
                    </a>
                  )}
                  {data.demoLink && (
                    <a href={data.demoLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <DarkButton variant="outline" size="sm" className="w-full" icon={Play}>
                        Demo
                      </DarkButton>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </DarkCard>
      </div>
    </div>
  );
};
