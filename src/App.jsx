import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { EducationSection } from './components/sections/EducationSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { YoutubeSection } from './components/sections/YoutubeSection';
import { ContactSection } from './components/sections/ContactSection';
import { Card } from './components/ui/Card';
import { Badge } from './components/ui/Badge';
import { PostItTag, SquigglyUnderline } from './components/decorations/HandDrawnDecorations';
import { PenTool, Clock } from 'lucide-react';

export const App = () => {
  return (
    <div className="min-h-screen bg-notebook text-[#2d2d2d] flex flex-col font-handwriting selection:bg-[#ff4d4d] selection:text-white pb-16">
      {/* 1. Navbar Component (All 9 sections configured) */}
      <Navbar />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 space-y-16 flex-grow">
        
        {/* Section 1: Hero Section */}
        <HeroSection />

        {/* Section 2: About Section */}
        <AboutSection />

        {/* Section 3: Projects Section */}
        <ProjectsSection />

        {/* Section 4: Skills Section */}
        <SkillsSection />

        {/* Section 5: Experience Section */}
        <ExperienceSection />

        {/* Section 6: Education Section */}
        <EducationSection />

        {/* Section 7: Achievements Section */}
        <AchievementsSection />

        {/* Section 8: YouTube & Live Builds Section */}
        <YoutubeSection />

        {/* Section 9: Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 mt-20 text-center">
        <div className="border-t-2 border-dashed border-[#2d2d2d]/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-handwriting text-lg font-bold">
          <div className="flex items-center gap-2 font-heading text-xl">
            <span className="text-[#ff4d4d]"><PenTool className="w-5 h-5 inline-block -mt-1" /></span> Swar Shinde Portfolio
          </div>
          <p className="text-sm text-[#2d2d2d]/70">
            Portfolio v4 - Fully built with the Hand-Drawn design system.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
