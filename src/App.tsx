import React, { useEffect, useState } from 'react';
import { Intro } from './components/Intro';
import { Navbar } from './components/Navbar';
import { HeroStack } from './components/hero/HeroStack';
import { Marquee } from './components/Marquee';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { AchievementsSection } from './components/AchievementsSection';
import { YoutubeSection } from './components/YoutubeSection';
import { ContactSection } from './components/ContactSection';
import { useSmoothScroll } from './hooks/useSmoothScroll';

interface AppProps {
  /** Puts your photo inline between first and last name in the hero. */
  showPortrait?: boolean;
  /** Plays the counter + shutter reveal on load. */
  playIntro?: boolean;
}

export function App({ showPortrait = false, playIntro = true }: AppProps) {
  const [revealed, setRevealed] = useState(!playIntro);
  const [introDone, setIntroDone] = useState(!playIntro);

  useSmoothScroll(introDone);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = introDone ? '' : 'hidden';
  }, [introDone]);

  return (
    <div className="min-h-screen w-full bg-ink font-sans text-bone">
      {!introDone && <Intro onReveal={() => setRevealed(true)} onDone={() => setIntroDone(true)} />}
      <Navbar visible={revealed} />
      <main>
        <HeroStack revealed={revealed} showPortrait={showPortrait} />
        <Marquee />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementsSection />
        <YoutubeSection />
        <ContactSection />
      </main>
    </div>);

}