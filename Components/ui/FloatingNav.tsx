"use client";
import React, { JSX, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/utils/cn";
import Link from "next/link";

const SECTION_IDS = ['about', 'projects', 'stats', 'experience', 'beyond', 'contact'];

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: { name: string; link: string; icon?: JSX.Element }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState<string>('');
  const [menuOpen, setMenuOpen]       = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Navbar is always visible; close mobile menu on scroll-down only
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      if (direction > 0) setMenuOpen(false);
    }
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const linkToId = (link: string) => link.replace('#', '');

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "fixed top-6 inset-x-0 mx-auto z-[5000] flex flex-col items-center",
          className
        )}
        style={{ width: 'fit-content' }}
      >
        {/* Pill */}
        <div className="flex items-center gap-1 border rounded-full px-4 py-2.5 border-white/[0.08] bg-black-100/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.22)]">

          {/* Logo */}
          <a href="#" className="group select-none px-2" aria-label="Home">
            <span className="text-sm font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-200 whitespace-nowrap">
              Himanshu<span className="text-purple">.</span>
            </span>
          </a>

          {/* Divider */}
          <div className="w-px h-4 bg-white/10 mx-1 shrink-0" />

          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-1">
            {navItems.map((navItem, idx) => {
              const sectionId = linkToId(navItem.link);
              const isActive  = activeSection === sectionId;
              return (
                <Link
                  key={`link-${idx}`}
                  href={navItem.link}
                  className={cn(
                    "relative px-3 py-2 rounded-full text-xs transition-all duration-200 cursor-pointer whitespace-nowrap",
                    isActive ? "text-white" : "text-white/40 hover:text-white/80"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.07] border border-white/[0.05]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{navItem.name}</span>
                </Link>
              );
            })}
            <div className="w-px h-4 bg-white/10 mx-1 shrink-0" />
          </div>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="relative flex items-center w-10 h-5 rounded-full border border-white/[0.12] bg-white/[0.06] dark:bg-white/[0.06] hover:bg-white/[0.10] transition-colors duration-200 mx-1 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/60"
            >
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute w-3.5 h-3.5 rounded-full bg-purple shadow-sm"
                style={{ left: theme === 'dark' ? 'calc(100% - 18px)' : '3px' }}
              />
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="sm:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-full hover:bg-white/[0.06] transition-colors duration-200"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-4 h-[1.5px] bg-white/70 rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              className="block w-4 h-[1.5px] bg-white/70 rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-4 h-[1.5px] bg-white/70 rounded-full origin-center"
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="sm:hidden mt-2 w-[min(calc(100vw-2rem),12rem)] rounded-2xl border border-white/[0.08] bg-black-100/90 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              {navItems.map((navItem, idx) => {
                const sectionId = linkToId(navItem.link);
                const isActive  = activeSection === sectionId;
                return (
                  <Link
                    key={`mobile-link-${idx}`}
                    href={navItem.link}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-5 py-3 text-sm transition-colors duration-150",
                      isActive
                        ? "text-white bg-white/[0.06]"
                        : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                    )}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple shrink-0" />
                    )}
                    {!isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                    )}
                    {navItem.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
