import React, { useEffect, useRef, useState } from 'react';
import { PenTool, Mail, Heart, ArrowUp } from 'lucide-react';
import gsap from 'gsap';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'YouTube', href: '#youtube' },
  { label: 'Contact', href: '#contact' },
];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socials = [
  { icon: GithubIcon, href: 'https://github.com/swar-101', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://linkedin.com/in/swarshinde', label: 'LinkedIn' },
  { icon: XIcon, href: 'https://x.com/Swars_page', label: 'X (Twitter)' },
  { icon: YoutubeIcon, href: 'https://youtube.com/@swarshinde', label: 'YouTube' },
  { icon: Mail, href: 'mailto:swarshinde101@gmail.com', label: 'Email' },
];

export const Footer = () => {
  const backTopRef = useRef(null);
  const [year] = useState(new Date().getFullYear());

  /* Floating back-to-top button visibility */
  useEffect(() => {
    const onScroll = () => {
      const show = window.scrollY > 400;
      if (backTopRef.current) {
        gsap.to(backTopRef.current, {
          opacity: show ? 1 : 0,
          scale: show ? 1 : 0.8,
          pointerEvents: show ? 'auto' : 'none',
          duration: 0.25,
          ease: 'power2.out'
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Back to Top Floating Button */}
      <button
        ref={backTopRef}
        onClick={scrollTop}
        aria-label="Back to top"
        style={{ opacity: 0, scale: 0.8 }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center
                   bg-[var(--color-surface)] border-3 border-[var(--color-ink)]
                   shadow-hard-md wobbly-circle
                   hover:bg-[#ff4d4d] hover:border-[var(--color-ink)] hover:text-white
                   transition-all duration-200 cursor-pointer"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Footer Section */}
      <footer className="w-full mt-auto flex-shrink-0 text-[var(--color-ink)] relative overflow-hidden transition-colors duration-300">

        {/* Subtle Hand-Drawn Dashed Divider with Tape Accent */}
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="border-t-2 border-dashed border-[var(--color-ink)]/25 relative">
            <div className="tape-strip" />
          </div>
        </div>

        {/* Subtle Sketch Doodles */}
        <span className="absolute top-6 left-12 font-handwriting font-bold text-xl text-[#ff4d4d] opacity-25 rotate-[-8deg] pointer-events-none select-none hidden md:block">
          {'</>'}
        </span>
        <span className="absolute top-8 right-16 font-handwriting font-bold text-lg text-[#F7DF1E] opacity-30 rotate-[6deg] pointer-events-none select-none hidden md:block">
          ✦
        </span>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-8 border-b-2 border-dashed border-[var(--color-ink)]/20">

            {/* Brand Column */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#ff4d4d] rounded-lg flex items-center justify-center border-2 border-[var(--color-ink)] shadow-hard-sm wobbly-1">
                  <PenTool className="w-4 h-4 text-white" />
                </div>
                <span className="font-heading text-2xl font-bold tracking-tight">
                  Swar Shinde
                </span>
              </div>
              <p className="font-handwriting text-base text-[var(--color-ink)]/80 leading-relaxed max-w-sm">
                Full-stack MERN developer. Building cinematic web apps that actually solve real problems.
              </p>
              <div className="flex items-center gap-2 font-handwriting text-xs text-[var(--color-ink)]/60">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#88CE02] border border-[var(--color-ink)] animate-pulse" />
                <span>Open for freelance & full-time roles</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-4 flex flex-col gap-2">
              <h4 className="font-heading font-bold text-lg text-[var(--color-ink)] mb-1">
                Navigation
              </h4>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                {navLinks.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    className="font-handwriting text-base text-[var(--color-ink)]/75 hover:text-[#ff4d4d] transition-colors hover:underline decoration-wavy underline-offset-4"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Socials & Connect */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <h4 className="font-heading font-bold text-lg text-[var(--color-ink)] mb-1">
                Connect
              </h4>
              <div className="flex items-center gap-2.5 flex-wrap">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 bg-[var(--color-bg)] border-2 border-[var(--color-ink)] rounded-xl flex items-center justify-center shadow-hard-sm hover:bg-[#ff4d4d] hover:text-white hover:-translate-y-1 transition-all duration-200"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
              <p className="font-handwriting text-xs text-[var(--color-ink)]/60 mt-1">
                📍 Navi Mumbai | Pune, India
              </p>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-handwriting text-sm text-[var(--color-ink)]/70">
            <p>© {year} Swar Shinde. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <span>Made with ease</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
