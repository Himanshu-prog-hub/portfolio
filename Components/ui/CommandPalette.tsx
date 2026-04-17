'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaMusic, FaEnvelope, FaUser, FaBriefcase, FaChartBar, FaTerminal, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMusicNote, HiSearch } from 'react-icons/hi';

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  category: string;
  action: () => void;
  kbd?: string;
}

// ─── Command Palette — opened with Cmd+K / Ctrl+K ────────────────────────
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll-to helpers
  const scrollTo = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const commands: Command[] = [
    // Navigation
    { id: 'about',      label: 'About Himanshu',          icon: <FaUser />,      category: 'Navigate',   action: () => scrollTo('about'),      description: 'Bento grid · bio & skills' },
    { id: 'projects',   label: 'Projects',                 icon: <FaCode />,      category: 'Navigate',   action: () => scrollTo('projects'),   description: 'AI explorer · shipped work' },
    { id: 'stats',      label: 'Dev Stats',                icon: <FaChartBar />,  category: 'Navigate',   action: () => scrollTo('stats'),      description: '3+ years · 10+ microservices' },
    { id: 'experience', label: 'Work Experience',          icon: <FaBriefcase />, category: 'Navigate',   action: () => scrollTo('experience'), description: 'Serko · Sabre timeline' },
    { id: 'beyond',     label: 'Music & Beyond Code',      icon: <FaMusic />,     category: 'Navigate',   action: () => scrollTo('beyond'),     description: 'Vocalist · Guitar · Collab matcher' },
    { id: 'contact',    label: 'Contact',                  icon: <FaEnvelope />,  category: 'Navigate',   action: () => scrollTo('contact'),    description: 'Drop a message' },
    // Actions
    { id: 'terminal',   label: 'Launch Terminal',          icon: <FaTerminal />,  category: 'Actions',    action: () => { setOpen(false); setTimeout(() => triggerTerminal(), 200); }, description: 'Type "himanshu" · discover the Easter egg', kbd: 'h-i-m-a-n-s-h-u' },
    { id: 'email',      label: 'Copy Email Address',       icon: <FaEnvelope />,  category: 'Actions',    action: () => { navigator.clipboard?.writeText('hmishra@example.com'); setOpen(false); showToast('Email copied!'); }, description: 'himanshumishra@outlook.com' },
    // Links
    { id: 'github',     label: 'Open GitHub',              icon: <FaGithub />,    category: 'Links',      action: () => { setOpen(false); window.open('https://github.com/Himanshu-prog-hub', '_blank'); } },
    { id: 'linkedin',   label: 'Open LinkedIn',            icon: <FaLinkedin />,  category: 'Links',      action: () => { setOpen(false); window.open('https://linkedin.com/in/himanshu-mishra', '_blank'); } },
    { id: 'youtube',    label: 'Hear Himanshu sing',       icon: <HiMusicNote />, category: 'Links',      action: () => { setOpen(false); window.open('https://www.youtube.com/@himanshumishra8864', '_blank'); } },
  ];

  // Filter
  const q = query.toLowerCase().trim();
  const filtered = q
    ? commands.filter(c => c.label.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
    : commands;

  // Group by category
  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    (acc[cmd.category] ??= []).push(cmd);
    return acc;
  }, {});

  // Keyboard listener
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
        setQuery('');
        setSelected(0);
      }
      if (!open) return;
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
      if (e.key === 'Enter')     { filtered[selected]?.action(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, selected]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => { setSelected(0); }, [query]);

  return (
    <>
      {/* Hint badge — shows on first scroll down */}
      <KbdHint onClick={() => { setOpen(true); setQuery(''); }} />

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[9000] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="fixed top-[12%] left-0 right-0 mx-auto z-[9001] w-[calc(100%-2rem)] max-w-[560px]"
            >
              <div className="rounded-2xl border border-white/15 bg-[#0a0c1e]/95 shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* Search bar */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                  <HiSearch className="w-4 h-4 text-white/30 shrink-0" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search commands, sections, links…"
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
                  />
                  <kbd className="text-[10px] text-white/20 border border-white/10 px-2 py-0.5 rounded font-mono">ESC</kbd>
                </div>

                {/* Results */}
                <div className="max-h-[340px] overflow-y-auto py-2">
                  {Object.keys(grouped).length === 0 && (
                    <p className="text-center text-white/25 text-sm py-8">No results for &ldquo;{query}&rdquo;</p>
                  )}
                  {Object.entries(grouped).map(([cat, cmds]) => {
                    const _globalIdx = filtered.indexOf(cmds[0]);
                    return (
                      <div key={cat}>
                        <p className="text-[10px] uppercase tracking-widest text-white/25 px-5 pt-3 pb-1.5 font-semibold">{cat}</p>
                        {cmds.map((cmd, _ci) => {
                          const idx = filtered.indexOf(cmd);
                          const isSelected = idx === selected;
                          return (
                            <button
                              key={cmd.id}
                              onMouseEnter={() => setSelected(idx)}
                              onClick={cmd.action}
                              className={`w-full flex items-center gap-3.5 px-5 py-2.5 text-left transition-colors duration-100 ${isSelected ? 'bg-purple/15' : 'hover:bg-white/[0.03]'}`}
                            >
                              <span className={`text-sm shrink-0 ${isSelected ? 'text-purple' : 'text-white/30'}`}>
                                {cmd.icon}
                              </span>
                              <span className="flex-1 min-w-0">
                                <span className="block text-sm text-white/80">{cmd.label}</span>
                                {cmd.description && (
                                  <span className="block text-[11px] text-white/30 truncate">{cmd.description}</span>
                                )}
                              </span>
                              {isSelected && (
                                <kbd className="text-[10px] text-white/20 border border-white/10 px-1.5 py-0.5 rounded font-mono shrink-0">↵</kbd>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="border-t border-white/[0.06] px-5 py-2.5 flex items-center gap-4 text-[10px] text-white/20">
                  <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                  <span><kbd className="font-mono">↵</kbd> select</span>
                  <span><kbd className="font-mono">Esc</kbd> close</span>
                  <span className="ml-auto">⌘K to toggle</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Small floating hint badge
function KbdHint({ onClick }: { onClick: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 200) setVisible(true); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          onClick={onClick}
          className="fixed bottom-6 right-6 z-[8000] flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-[#0d0f23]/90 backdrop-blur-sm text-white/30 hover:text-white/60 hover:border-purple/30 transition-all duration-200 shadow-lg"
        >
          <HiSearch className="w-3.5 h-3.5" />
          <kbd className="text-[10px] font-mono">⌘K</kbd>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Trigger terminal easter egg programmatically
function triggerTerminal() {
  const secret = 'himanshu';
  secret.split('').forEach((ch, i) => {
    setTimeout(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: ch, bubbles: true }));
    }, i * 40);
  });
}

// Toast helper
let toastTimer: ReturnType<typeof setTimeout>;
function showToast(msg: string) {
  let el = document.getElementById('cp-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'cp-toast';
    el.style.cssText = 'position:fixed;bottom:80px;right:24px;z-index:9999;background:#1a1a2e;border:1px solid rgba(124,58,237,0.4);color:rgba(255,255,255,0.8);font-size:12px;padding:10px 16px;border-radius:12px;opacity:0;transition:opacity 0.2s;pointer-events:none;';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  (el as HTMLElement).style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { (el as HTMLElement).style.opacity = '0'; }, 2000);
}