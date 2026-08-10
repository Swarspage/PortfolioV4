import React, { useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  DashedArrow,
  SquigglyUnderline,
  PostItTag,
  SketchStar,
  SketchCircle
} from '../decorations/HandDrawnDecorations';
import { Sparkles, Send, FileText, CheckCircle2, Terminal } from 'lucide-react';
import heroData from '../../All data/data/HeroData.json';
import profileImage from '../../All data/assets/image.webp';
import { Typewriter } from '../ui/Typewriter';

export const HeroSection = ({ onOpenResume }) => {
  const { name, availability, roles, stats, resumeLink } = heroData;
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
    <section id="hero" className="relative min-h-[calc(100vh-80px)] pt-8 pb-14 flex flex-col md:flex-row items-center justify-between gap-10">
      
      {/* Decorative Floating Background Elements */}
      <div className="absolute top-10 left-4 md:left-20 opacity-40 animate-float" style={{ animationDelay: '0s' }}>
        <span className="font-handwriting font-bold text-4xl text-[var(--color-ink)]">{'{ }'}</span>
      </div>
      <div className="absolute bottom-32 left-10 md:left-1/3 opacity-40 animate-float" style={{ animationDelay: '1.5s' }}>
        <span className="font-handwriting font-bold text-3xl text-[var(--color-ink)]">{'</>'}</span>
      </div>
      <div className="absolute top-20 right-4 md:right-1/4 opacity-30 animate-float" style={{ animationDelay: '0.7s' }}>
        <SketchCircle className="w-16 h-16 text-[#ff4d4d]" />
      </div>
      {/* Left Column: Intro & Headline */}
      <div className="flex-1 space-y-6 text-center md:text-left relative">
        <PostItTag className="animate-float flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10b981] border border-[var(--color-ink)]"></span>
          </span>
          {availability || 'Available for Opportunities'}
        </PostItTag>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-wide font-heading">
          Hey, I'm{' '}
          <span className="relative inline-block text-[#ff4d4d]">
            {name || 'Swar Shinde'}
            <SquigglyUnderline className="absolute -bottom-2 left-0" color="#ff4d4d" />
          </span>{' '}
          <span className="inline-block hover:rotate-12 transition-transform cursor-pointer text-[#2d5da1]">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 inline-block stroke-[2.5]" />
          </span>
        </h1>

        {/* Roles - Typing Animation */}
        <div className="font-handwriting font-bold text-2xl text-[var(--color-ink)]/90 h-8">
          I am a <Typewriter words={roles || ['Full-Stack Developer', 'Tech Enthusiast']} />
        </div>

        <p className="text-xl sm:text-2xl text-[var(--color-ink)]/85 max-w-xl font-bold">
          I build full-stack web applications that look cinematic and actually leave <code className="bg-[var(--color-muted)] px-2 py-0.5 border border-[var(--color-ink)] rounded font-mono text-lg">localhost</code>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 relative">
          <a href="#projects">
            <Button variant="primary" size="lg" icon={Sparkles}>
              View My Work
            </Button>
          </a>
          {resumeLink && (
            <Button onClick={onOpenResume} variant="secondary" size="lg" icon={FileText}>
              Resume
            </Button>
          )}

          {/* Hand-Drawn Arrow (Desktop only) */}
          <div className="hidden md:block absolute -right-28 -bottom-10 pointer-events-none">
            <DashedArrow color="#ff4d4d" className="rotate-12" />
            <span className="font-heading font-bold text-sm text-[#ff4d4d] -rotate-6 block ml-6">
              Check this out!
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex-1 flex justify-center w-full max-w-md">
        <div ref={cardRef} className="w-full transition-transform duration-200 ease-out" style={{ transformStyle: 'preserve-3d' }}>
          <Card
            variant="postit"
            decoration="tape"
            rotate="right"
            className="w-full text-center relative p-8 shadow-hard-lg"
          >
          {/* Avatar / Profile Frame */}
          <div className="relative mx-auto w-40 h-40 mb-4" style={{ transform: 'translateZ(20px)' }}>
            <div className="w-full h-full bg-[var(--color-muted)] border-[3px] border-[var(--color-ink)] wobbly-circle overflow-hidden shadow-hard flex items-center justify-center p-1">
              <img src={profileImage} alt={name} className="w-full h-full object-cover rounded-full grayscale-[10%] hover:grayscale-0 transition-all duration-300" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#ff4d4d] text-white p-2 border-2 border-[#2d2d2d] wobbly-tag shadow-hard-sm">
              <SketchStar className="w-5 h-5 text-white" />
            </div>
          </div>

          <h2 className="font-heading text-3xl font-bold text-[var(--color-ink)]">
            {name}
          </h2>
          <p className="text-lg text-[var(--color-ink)]/80 mt-1 font-bold">
            MERN Stack Developer & Tech Enthusiast
          </p>

          {/* Stats Bar */}
          <div className="mt-5 pt-4 border-t-2 border-dashed border-[var(--color-ink)]/30 flex justify-around text-center">
            {stats?.map((stat, idx) => (
              <div key={idx}>
                <span className={`block font-heading text-2xl font-bold ${
                  idx === 0 ? 'text-[#ff4d4d]' : idx === 1 ? 'text-[#2d5da1]' : 'text-[#2d2d2d]'
                }`}>
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[var(--color-ink)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          </Card>
        </div>

        {/* Decorative Floating Accent */}
        <div className="hidden md:block absolute -top-6 -left-6 bg-[#2d5da1] text-white w-14 h-14 border-2 border-[#2d2d2d] wobbly-circle flex items-center justify-center font-heading text-xl font-bold shadow-hard animate-float pointer-events-none">
          ★
        </div>
      </div>
    </section>
  );
};
