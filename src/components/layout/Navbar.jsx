import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { Button } from '../ui/Button';
import { PostItTag, SquigglyUnderline } from '../decorations/HandDrawnDecorations';
import {
  Sparkles,
  User,
  Briefcase,
  FolderGit2,
  Code2,
  Trophy,
  GraduationCap,
  Video,
  Mail,
  Menu,
  X,
  PenTool,
  FileText,
  Sun,
  Moon
} from 'lucide-react';
import heroData from '../../All data/data/HeroData.json';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: 'hero', label: 'Home', icon: Sparkles },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'youtube', label: 'YouTube', icon: Video },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  // Smooth scroll handler
  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy to update active link dynamically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeToggle = (e) => {
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <header className="sticky top-3 z-50 max-w-7xl mx-auto px-3 sm:px-6">
      <nav className="bg-[var(--color-bg)] border-[3px] border-[var(--color-ink)] wobbly-card shadow-hard px-4 py-2.5 flex items-center justify-between relative transition-all">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 bg-[var(--color-postit)] border-2 border-[var(--color-ink)] wobbly-circle flex items-center justify-center font-heading font-bold text-xl shadow-hard-sm group-hover:rotate-12 transition-transform">
            <PenTool className="w-5 h-5 text-[#ff4d4d]" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-2xl tracking-tight text-[var(--color-ink)] flex items-center gap-1.5">
              {heroData.name || 'Swar Shinde'}
              <PostItTag className="text-xs px-1.5 py-0.5 ml-1 hidden lg:inline-block">
                Dev
              </PostItTag>
            </span>
          </div>
        </div>

        {/* Desktop Nav Items (All 9 Sections) */}
        <div className="hidden xl:flex items-center gap-5 font-handwriting text-lg font-bold">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-2 py-1 flex items-center gap-1 transition-all hover:-rotate-2 ${
                  isActive ? 'text-[#ff4d4d]' : 'text-[var(--color-ink)] hover:text-[#2d5da1]'
                }`}
              >
                <Icon className="w-4 h-4 stroke-[2.5]" />
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-0 w-full">
                    <SquigglyUnderline color="#ff4d4d" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Medium Screen Nav Items (Compact dropdown / key sections) */}
        <div className="hidden lg:flex xl:hidden items-center gap-3 font-handwriting text-lg font-bold">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-1.5 py-1 flex items-center gap-1 ${
                  isActive ? 'text-[#ff4d4d]' : 'text-[var(--color-ink)] hover:text-[#2d5da1]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-0 w-full">
                    <SquigglyUnderline color="#ff4d4d" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={handleThemeToggle}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 bg-[var(--color-muted)] border-2 border-[var(--color-ink)] wobbly-tag shadow-hard-sm text-[var(--color-ink)] hover:bg-[var(--color-postit)] transition-colors group"
            aria-label="Toggle dark mode"
          >
            {isDark 
              ? <Sun className="w-5 h-5 stroke-[2.5] group-hover:rotate-45 transition-transform duration-300" />
              : <Moon className="w-5 h-5 stroke-[2.5] group-hover:-rotate-12 transition-transform duration-300" />
            }
          </button>

          {/* Mobile / Tablet Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 bg-[var(--color-muted)] border-2 border-[var(--color-ink)] wobbly-tag shadow-hard-sm text-[var(--color-ink)] hover:bg-[var(--color-postit)] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2.5]" /> : <Menu className="w-6 h-6 stroke-[2.5]" />}
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-2 bg-[var(--color-postit)] border-[3px] border-[var(--color-ink)] wobbly-card shadow-hard-lg p-4 flex flex-col gap-2 font-handwriting text-xl font-bold animate-float">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b-2 border-dashed border-[var(--color-ink)]/30">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2.5 p-2 rounded-lg text-left border border-dashed border-[var(--color-ink)]/20 transition-all ${
                    isActive ? 'bg-[#ff4d4d] text-white' : 'hover:bg-[var(--color-muted)] text-[var(--color-ink)]'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.5]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      )}
    </header>
  );
};
