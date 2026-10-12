import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { ArrowDownIcon, MenuIcon, XIcon } from 'lucide-react';
import { navLinks } from '../data/navigation';
import { profile } from '../data/profile';
import { scrollToId } from '../hooks/useSmoothScroll';

interface NavbarProps {
  visible: boolean;
}

type NavTheme = 'dark' | 'light';

export function Navbar({ visible }: NavbarProps) {
  const [theme, setTheme] = useState<NavTheme>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  // Swap text colour based on whichever section sits under the bar
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-nav]'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setTheme((entry.target as HTMLElement).dataset.nav as NavTheme);
        });
      },
      { rootMargin: '0px 0px -94% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  const color = theme === 'light' && !menuOpen ? 'text-ink' : 'text-bone';

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ease-out ${color}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}>
        
        <motion.div className="h-[2px] origin-left bg-signal" style={{ scaleX: scrollYProgress }} aria-hidden />
        <nav className="flex items-center justify-between px-5 py-4 md:px-10 md:py-5" aria-label="Primary">
          <button
            onClick={() => go('top')}
            className="wide font-display text-lg font-black tracking-tight"
            aria-label="Back to top">
            
            SS<span className="text-signal">.</span>
          </button>
          <ul className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) =>
            <li key={link.id}>
                <button
                onClick={() => go(link.id)}
                className="font-mono text-xs uppercase tracking-[0.14em] opacity-80 transition-opacity duration-150 hover:opacity-100">
                
                  {link.label}
                </button>
              </li>
            )}
          </ul>
          <a
            href={profile.resumeLink}
            download
            className="hidden items-center gap-2 border border-current px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-150 hover:border-signal hover:bg-signal hover:text-ink md:inline-flex">
            
            Résumé <ArrowDownIcon className="h-3.5 w-3.5" aria-hidden />
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            
            {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen &&
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-5 pb-10 pt-24 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}>
          
            <ul className="space-y-2">
              {navLinks.map((link, i) =>
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1], delay: 0.04 * i }}>
              
                  <button
                onClick={() => go(link.id)}
                className="font-display text-6xl font-black uppercase tracking-tight text-bone">
                
                    {link.label}
                  </button>
                </motion.li>
            )}
            </ul>
            <a
            href={profile.resumeLink}
            download
            className="mt-10 inline-flex w-fit items-center gap-2 bg-signal px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink">
            
              Download résumé <ArrowDownIcon className="h-4 w-4" aria-hidden />
            </a>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}