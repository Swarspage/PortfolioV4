import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Code2, Play } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import gsap from 'gsap';

export const Modal = ({ isOpen, onClose, data, type }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && data) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      // Animate in
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3 }
      );
      
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.2)' }
      );
    } else {
      // Restore body scroll
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d2d2d]/60 backdrop-blur-sm p-4 md:p-8"
      onClick={handleClose}
    >
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-50 w-12 h-12 bg-white rounded-full flex items-center justify-center border-4 border-[#2d2d2d] shadow-hard-md hover:bg-[#ff4d4d] hover:text-white transition-colors wobbly-circle group"
        >
          <X className="w-6 h-6 text-[#2d2d2d] group-hover:text-white" />
        </button>

        <Card
          variant="default"
          decoration="tape"
          hoverJiggle={false}
          className="w-full h-full flex flex-col p-4 md:p-8 bg-white border-4 border-[#2d2d2d] shadow-hard-2xl overflow-y-auto no-scrollbar"
        >
          {/* Large Image Area */}
          <div className="w-full mb-6 flex-shrink-0">
            {data.imageSrc ? (
              <div className="relative p-2 pb-10 bg-white border-2 border-[#2d2d2d] shadow-hard-md transform rotate-[-1deg]">
                <img 
                  src={data.imageSrc} 
                  alt={data.title} 
                  className="w-full max-h-[50vh] object-cover border border-[#2d2d2d]/20 filter sepia-[5%]" 
                />
                <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 bg-white px-4 py-1 border-2 border-[#2d2d2d] rounded-full text-center font-handwriting font-bold text-[#2d2d2d] shadow-hard-sm text-sm md:text-base z-10 whitespace-nowrap">
                  {type === 'project' ? 'Featured Project' : data.date}
                </div>
              </div>
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-[#fdfbf7] border-4 border-dashed border-[#2d2d2d]/20 rounded-3xl wobbly-circle transform rotate-[1deg]">
                {data.iconComponent && <data.iconComponent className="w-24 h-24 text-[#2d2d2d]/20" />}
              </div>
            )}
          </div>

          {/* Details Area */}
          <div className="flex flex-col flex-grow">
            <span className="font-handwriting font-bold text-[#00618A] uppercase tracking-wider text-sm md:text-base mb-2">
              {type === 'project' ? 'Project Details' : data.category}
            </span>
            
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2d2d2d] leading-tight mb-4">
              {data.title}
            </h2>
            
            <div className="w-20 h-1 bg-[#F7DF1E] rounded-full mb-6 wobbly-line" />
            
            <div className="font-handwriting text-xl md:text-2xl text-[#2d2d2d]/80 leading-relaxed mb-6 space-y-4">
              {data.description}
            </div>

            {/* Tags and Action Links (if project) */}
            {type === 'project' && (
              <div className="mt-auto pt-4 border-t-2 border-dashed border-[#2d2d2d]/20 space-y-4">
                {data.tags && (
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-[#fdfbf7] border-2 border-[#2d2d2d] rounded-md font-handwriting text-[#2d2d2d] font-bold text-sm shadow-hard-sm transform rotate-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {data.liveLink && (
                    <a href={data.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="primary" size="sm" className="w-full" icon={ExternalLink}>
                        Live
                      </Button>
                    </a>
                  )}
                  {data.githubLink && (
                    <a href={data.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full" icon={Code2}>
                        Code
                      </Button>
                    </a>
                  )}
                  {data.demoLink && (
                    <a href={data.demoLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-white" icon={Play}>
                        Demo
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
