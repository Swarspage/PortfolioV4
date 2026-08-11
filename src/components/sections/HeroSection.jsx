import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
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
import profileImage from '../../All data/Cloudy Face.webp';
import { Typewriter } from '../ui/Typewriter';
import { DraggableStickers } from '../ui/DraggableStickers';
import { MiniCodeSandbox } from '../ui/MiniCodeSandbox';

export const HeroSection = ({ onOpenResume }) => {
  const { name, availability, roles, stats, resumeLink } = heroData;
  const cardRef = useRef(null);
  const sectionRef = useRef(null);

  const speechBubbles = [
    "Hey! Welcome to my notebook! 📝",
    "Looking for a Full-Stack Dev? You found him! 💻",
    "Pro tip: Try switching to Dark Mode! 🌙",
    "Stop poking me! 😂",
    "Let's build something epic! 🚀"
  ];
  const [speechIndex, setSpeechIndex] = useState(null);

  const handleAvatarClick = () => {
    setSpeechIndex(prev => prev === null ? 0 : (prev + 1) % speechBubbles.length);
  };

  // ── GSAP Entrance Timeline ──────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Set everything invisible before animating
      gsap.set('[data-hero="doodle"]', { opacity: 0 });
      gsap.set('[data-hero="tag"]',    { opacity: 0, x: -50 });
      gsap.set('[data-hero="h1"]',     { opacity: 0, scale: 0.4 });
      gsap.set('[data-hero="role"]',   { opacity: 0, y: 24 });
      gsap.set('[data-hero="desc"]',   { opacity: 0, y: 24 });
      gsap.set('[data-hero="btns"]',   { opacity: 0, y: 24 });
      gsap.set('[data-hero="stickers"]', { opacity: 0, y: 40 });
      gsap.set('[data-hero="avatar"]', { opacity: 0, y: -80 });
      gsap.set('[data-hero="star-badge"]', { opacity: 0, scale: 0, rotation: -180 });
      gsap.set('[data-hero="card-name"]',  { opacity: 0, y: 20 });
      gsap.set('[data-hero="stat"]',       { opacity: 0, y: 16 });
      gsap.set('[data-hero="sandbox"]',    { opacity: 0, y: 30 });
      gsap.set('[data-hero="accent"]',     { opacity: 0, scale: 0 });

      // 1. "Available" tag — slides in from left
      tl.to('[data-hero="tag"]', { opacity: 1, x: 0, duration: 0.6 }, 0);

      // 2. Profile photo — drops from above with a bounce thud
      tl.to('[data-hero="avatar"]', {
        opacity: 1, y: 0, duration: 0.8, ease: 'bounce.out'
      }, 0.2);

      // 3. H1 — bangs in with elastic overshoot
      tl.to('[data-hero="h1"]', {
        opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(3)'
      }, 0.35);

      // 4. Star badge spins in
      tl.to('[data-hero="star-badge"]', {
        opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(3.5)'
      }, 0.55);

      // 5. Typewriter line fades up
      tl.to('[data-hero="role"]', { opacity: 1, y: 0, duration: 0.5 }, 0.5);

      // 6. Description fades up
      tl.to('[data-hero="desc"]', { opacity: 1, y: 0, duration: 0.5 }, 0.65);

      // 7. Card name + subtitle
      tl.to('[data-hero="card-name"]', { opacity: 1, y: 0, duration: 0.5 }, 0.7);

      // 8. Buttons slide up
      tl.to('[data-hero="btns"]', { opacity: 1, y: 0, duration: 0.5 }, 0.8);

      // 9. Stats stagger up
      tl.to('[data-hero="stat"]', {
        opacity: 1, y: 0, duration: 0.4,
        stagger: 0.1, ease: 'power2.out'
      }, 0.85);

      // 10. Mini code sandbox flies up
      tl.to('[data-hero="sandbox"]', { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' }, 0.95);

      // 11. Decorative accent circle pops in
      tl.to('[data-hero="accent"]', {
        opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)'
      }, 1.0);

      // 12. Draggable stickers fly up last with stagger
      tl.to('[data-hero="stickers"]', { opacity: 1, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' }, 1.1);

      // 13. Background doodles fade in softly
      tl.to('[data-hero="doodle"]', { opacity: 1, duration: 1 }, 1.2);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── 3D Parallax Mouse Tilt Effect ──────────────────────────────────────────
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
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
    <section ref={sectionRef} id="hero" className="relative min-h-fit py-6 sm:py-8 lg:py-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-10">

      {/* Decorative Floating Background Elements */}
      <div data-hero="doodle" className="absolute top-10 left-4 md:left-20 opacity-40 animate-float" style={{ animationDelay: '0s' }}>
        <span className="font-handwriting font-bold text-4xl text-[var(--color-ink)]">{'{ }'}</span>
      </div>
      <div data-hero="doodle" className="absolute bottom-32 left-10 md:left-1/3 opacity-40 animate-float" style={{ animationDelay: '1.5s' }}>
        <span className="font-handwriting font-bold text-3xl text-[var(--color-ink)]">{'</>'}</span>
      </div>
      <div data-hero="doodle" className="absolute top-20 right-4 md:right-1/4 opacity-30 animate-float" style={{ animationDelay: '0.7s' }}>
        <SketchCircle className="w-16 h-16 text-[#ff4d4d]" />
      </div>

      {/* Left Column: Intro & Headline */}
      <div className="flex-1 space-y-6 text-center md:text-left relative order-2 lg:order-1">

        <div data-hero="tag">
          <PostItTag className="animate-float flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10b981] border border-[var(--color-ink)]"></span>
            </span>
            {availability || 'Available for Opportunities'}
          </PostItTag>
        </div>

        <h1 data-hero="h1" className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-wide font-heading">
          I'm{' '}
          <span className="relative inline-block text-[#ff4d4d]">
            {name || 'Swar Shinde'}
            <SquigglyUnderline className="absolute -bottom-2 left-0" color="#ff4d4d" />
          </span>{' '}
          <span className="inline-block hover:rotate-12 transition-transform cursor-pointer text-[#2d5da1]">
            <Sparkles className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 inline-block stroke-[2.5]" />
          </span>
        </h1>

        {/* Roles - Typing Animation */}
        <div data-hero="role" className="font-handwriting font-bold text-xl sm:text-2xl text-[var(--color-ink)]/90 h-8">
          I am a <Typewriter words={roles || ['Full-Stack Developer', 'Tech Enthusiast']} />
        </div>

        <p data-hero="desc" className="text-lg sm:text-xl text-[var(--color-ink)]/85 max-w-xl font-bold">
          I build full-stack web applications that look cinematic and actually leave <code className="bg-[var(--color-muted)] px-2 py-0.5 border border-[var(--color-ink)] rounded font-mono text-base sm:text-lg">localhost</code>.
        </p>

        {/* Action Buttons */}
        <div data-hero="btns" className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 relative">
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
          <div className="hidden xl:block absolute -right-24 -bottom-10 pointer-events-none">
            <DashedArrow color="#ff4d4d" className="rotate-12" />
            <span className="font-heading font-bold text-sm text-[#ff4d4d] -rotate-6 block ml-6">
              Check this out!
            </span>
          </div>
        </div>

        {/* Draggable & Bouncy Notebook Stickers */}
        <div data-hero="stickers" className="pt-[100px]">
          <DraggableStickers />
        </div>
      </div>

      <div className="relative flex-1 flex justify-center w-full max-w-sm lg:max-w-md order-1 lg:order-2">
        <div ref={cardRef} className="w-full transition-transform duration-200 ease-out" style={{ transformStyle: 'preserve-3d' }}>
          <div className="w-full text-center relative p-5 sm:p-6 lg:p-8 flex flex-col items-center group">

            {/* Avatar / Profile Frame */}
            <div
              onClick={handleAvatarClick}
              data-hero="avatar"
              className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mb-3 cursor-pointer group/avatar"
              style={{ transform: 'translateZ(20px)' }}
            >
              <div className="w-full h-full animate-float relative">
                {/* Interactive Speech Bubble */}
                {speechIndex !== null && (
                  <div
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--color-surface)] border-2 border-[var(--color-ink)] px-4 py-2 rounded-2xl font-handwriting font-bold text-sm md:text-base shadow-hard-xl text-[var(--color-ink)] z-[100] animate-bounce whitespace-nowrap pointer-events-none"
                    style={{ transform: 'translateX(-50%) translateZ(60px)' }}
                  >
                    {speechBubbles[speechIndex]}
                    {/* Speech Bubble Tail */}
                    <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-4 h-4 bg-[var(--color-surface)] border-b-2 border-r-2 border-[var(--color-ink)] rotate-45" />
                  </div>
                )}

                <img src={profileImage} alt={name} className="w-full h-full object-contain drop-shadow-xl group-hover/avatar:scale-105 transition-all duration-300" />

                <div data-hero="star-badge" className="absolute -bottom-2 -right-2 bg-[#ff4d4d] text-white p-2 border-2 border-[#2d2d2d] wobbly-tag shadow-hard-sm group-hover/avatar:rotate-12 transition-transform">
                  <SketchStar className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div data-hero="card-name">
              <h2 className="font-heading text-3xl font-bold text-[var(--color-ink)] drop-shadow-sm">
                {name}
              </h2>
              <p className="text-lg text-[var(--color-ink)]/80 mt-1 font-bold drop-shadow-sm">
                MERN Stack Developer & Tech Enthusiast
              </p>
            </div>

            {/* Stats Bar */}
            <div className="mt-5 pt-4 border-t-2 border-dashed border-[var(--color-ink)]/30 flex justify-around w-full max-w-sm text-center">
              {stats?.map((stat, idx) => (
                <div data-hero="stat" key={idx}>
                  <span className={`block font-heading text-2xl font-bold ${idx === 0 ? 'text-[#ff4d4d]' : idx === 1 ? 'text-[#2d5da1]' : 'text-[#88CE02]'}`}>
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--color-ink)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Code Sandbox */}
          <div data-hero="sandbox" className="mt-6">
            <MiniCodeSandbox />
          </div>
        </div>

        {/* Decorative Floating Accent */}
        <div data-hero="accent" className="hidden md:block absolute -top-6 -left-6 bg-[#2d5da1] text-white w-14 h-14 border-2 border-[#2d2d2d] wobbly-circle flex items-center justify-center font-heading text-xl font-bold shadow-hard animate-float pointer-events-none">
          ★
        </div>
      </div>
    </section>
  );
};
