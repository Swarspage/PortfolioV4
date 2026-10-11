import type React from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";
import { heroData } from "../../data/content";
import { sectionCopy } from "../../data/sectionCopy";
import { resolveResumeUrl } from "../../utils/assets";
import { scrollToTarget } from "../../hooks/useSmoothScroll";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar({ ready }: {ready: boolean;}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>("about");
  const resumeUrl = resolveResumeUrl(heroData.resumeLink);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > last && y > 480);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = sectionCopy.nav.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(`#${id}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[transform,opacity,background-color,border-color] duration-300 ease-out ${
      scrolled || open ? "nav-solid" : ""} ${
      hidden && !open ? "-translate-y-full" : "translate-y-0"} ${ready ? "opacity-100" : "opacity-0"}`}>
      
      <nav aria-label="Primary" className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-4 md:px-10">
        <a href="#hero" onClick={go("hero")} className="font-serif text-lg md:text-xl italic font-light tracking-wide text-ink hover:text-accent transition-colors">
          {heroData.name}
        </a>

        <ul className="hidden items-center gap-7 text-sm lg:flex">
          {sectionCopy.nav.map((item) =>
          <li key={item.id}>
              <a
              href={`#${item.id}`}
              onClick={go(item.id)}
              aria-current={active === item.id ? "true" : undefined}
              className={`relative py-1 font-sans text-sm transition-colors duration-200 ease-out ${
              active === item.id ? "text-ink font-medium" : "text-muted hover:text-ink"}`
              }>
              
                {item.label}
                <span
                aria-hidden
                className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-accent transition-transform duration-200 ease-out ${
                active === item.id ? "scale-x-100" : "scale-x-0"}`
                } />
              
              </a>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 items-center rounded-full bg-ink px-5 text-sm font-medium text-bg shadow-sm transition-colors duration-200 ease-out hover:bg-accent hover:text-white sm:inline-flex">
            
            {sectionCopy.resume}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink lg:hidden">
            
            {open ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open &&
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="border-t border-line px-5 pb-8 pt-4 lg:hidden">
          
            <ul className="space-y-1">
              {sectionCopy.nav.map((item) =>
            <li key={item.id}>
                  <a href={`#${item.id}`} onClick={go(item.id)} className="block py-2 font-display text-3xl text-ink">
                    {item.label}
                  </a>
                </li>
            )}
            </ul>
            <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm text-bg">
            
              {sectionCopy.resume}
            </a>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}