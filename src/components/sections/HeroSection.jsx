import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  DashedArrow,
  SquigglyUnderline,
  PostItTag,
  SketchStar
} from '../decorations/HandDrawnDecorations';
import { Sparkles, Send, FileText, CheckCircle2, Terminal } from 'lucide-react';
import heroData from '../../All data/data/HeroData.json';

export const HeroSection = () => {
  const { name, availability, roles, stats, resumeLink } = heroData;

  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] pt-8 pb-14 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Left Column: Intro & Headline */}
      <div className="flex-1 space-y-6 text-center md:text-left relative">
        <PostItTag className="animate-float">
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

        {/* Roles */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
          {roles?.map((role, idx) => (
            <Badge
              key={idx}
              variant={idx === 0 ? 'red' : idx === 1 ? 'blue' : 'postit'}
              rotate={idx % 2 === 0 ? 'left' : 'right'}
            >
              {role}
            </Badge>
          ))}
        </div>

        <p className="text-xl sm:text-2xl text-[#2d2d2d]/85 max-w-xl font-bold">
          I build full-stack web applications that look cinematic and actually leave <code className="bg-[#e5e0d8] px-2 py-0.5 border border-[#2d2d2d] rounded font-mono text-lg">localhost</code>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 relative">
          <a href="#projects">
            <Button variant="primary" size="lg" icon={Sparkles}>
              View My Work
            </Button>
          </a>
          {resumeLink && (
            <a href={resumeLink} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" icon={FileText}>
                Resume
              </Button>
            </a>
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

      {/* Right Column: Hero Card & Stats */}
      <div className="relative flex-1 flex justify-center w-full max-w-md">
        <Card
          variant="postit"
          decoration="tape"
          rotate="right"
          className="w-full text-center relative p-8 shadow-hard-lg"
        >
          {/* Avatar / Profile Frame */}
          <div className="relative mx-auto w-36 h-36 mb-4">
            <div className="w-full h-full bg-white border-[3px] border-[#2d2d2d] wobbly-circle overflow-hidden shadow-hard flex items-center justify-center">
              <Terminal className="w-16 h-16 text-[#2d2d2d] stroke-[2]" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#ff4d4d] text-white p-2 border-2 border-[#2d2d2d] wobbly-tag shadow-hard-sm">
              <SketchStar className="w-5 h-5 text-white" />
            </div>
          </div>

          <h2 className="font-heading text-3xl font-bold text-[#2d2d2d]">
            {name}
          </h2>
          <p className="text-lg text-[#2d2d2d]/80 mt-1 font-bold">
            MERN Stack Developer & Tech Enthusiast
          </p>

          {/* Stats Bar */}
          <div className="mt-5 pt-4 border-t-2 border-dashed border-[#2d2d2d]/30 flex justify-around text-center">
            {stats?.map((stat, idx) => (
              <div key={idx}>
                <span className={`block font-heading text-2xl font-bold ${
                  idx === 0 ? 'text-[#ff4d4d]' : idx === 1 ? 'text-[#2d5da1]' : 'text-[#2d2d2d]'
                }`}>
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#2d2d2d]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Decorative Floating Accent */}
        <div className="hidden md:block absolute -top-6 -left-6 bg-[#2d5da1] text-white w-14 h-14 border-2 border-[#2d2d2d] wobbly-circle flex items-center justify-center font-heading text-xl font-bold shadow-hard animate-float pointer-events-none">
          ★
        </div>
      </div>
    </section>
  );
};
