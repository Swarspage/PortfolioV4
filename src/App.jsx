import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
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
import { ResumeModal } from './components/ui/ResumeModal';
import { PencilTrailCanvas } from './components/ui/PencilTrailCanvas';
import { DoodleCanvas } from './components/ui/DoodleCanvas';
import { PostItTag, SquigglyUnderline } from './components/decorations/HandDrawnDecorations';
import { PenTool } from 'lucide-react';
import resumePdf from './All data/assets/Swar-Res.pdf';

export const App = () => {
  const [showResume, setShowResume] = useState(false);
  const openResume = () => setShowResume(true);
  const closeResume = () => setShowResume(false);

  // Always start at the top of the page on refresh (Hero Section)
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <ThemeProvider>
      <PencilTrailCanvas />
      <DoodleCanvas />
      <div className="min-h-screen bg-notebook text-[var(--color-ink)] flex flex-col font-handwriting selection:bg-accent-red selection:text-white pb-16">
      {/* 1. Navbar Component (All 9 sections configured) */}
      <Navbar />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 space-y-16 flex-grow">
        
        {/* Section 1: Hero Section */}
        <HeroSection onOpenResume={openResume} />

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
        <ContactSection onOpenResume={openResume} />
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-12 text-center relative z-20 clear-both mt-auto flex-shrink-0">
        <div className="border-t-2 border-dashed border-[var(--color-ink)]/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-handwriting text-lg font-bold">
          <div className="flex items-center gap-2 font-heading text-xl">
            <span className="text-[#ff4d4d]"><PenTool className="w-5 h-5 inline-block -mt-1" /></span> Swar Shinde Portfolio
          </div>
          <p className="text-sm text-[var(--color-ink)]/70">
            Portfolio v4 - Fully built with the Hand-Drawn design system.
          </p>
        </div>
      </footer>
      </div>

      {/* Global Resume Modal */}
      <ResumeModal
        isOpen={showResume}
        onClose={closeResume}
        pdfUrl={resumePdf}
      />
    </ThemeProvider>
  );
};

export default App;
