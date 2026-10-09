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
import { Footer } from './components/layout/Footer';
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
      <div className="min-h-screen flex flex-col flex-1 bg-notebook text-[var(--color-ink)] font-handwriting selection:bg-accent-red selection:text-white">
        {/* 1. Navbar Component (All 9 sections configured) */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 mt-6 space-y-16">

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

        <Footer />
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
