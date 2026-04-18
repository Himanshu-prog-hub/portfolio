'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECRET = 'himanshu';

const bootLines = [
  '> Initializing Himanshu.exe ...',
  '> Loading personality modules ... ✓',
  '> Mounting music stack [khayal, guitar] ... ✓',
  '> Connecting to GCP cluster ... ✓',
  '> Spinning up microservices ... ✓',
  '> Calibrating holographic globe ... ✓',
  '',
  '  NAME    : Himanshu Mishra',
  '  ROLE    : Software Developer 2 @ Serko',
  '  STACK   : Java · Spring Boot · GCP · React · TypeScript',
  '  CITY    : Bengaluru, India 🇮🇳',
  '  MUSIC   : Hindustani Classical · Guitar',
  '  STATUS  : 🟢 Open to freelance',
  '',
  '> All systems nominal. Welcome. 🚀',
];

function useTypeLines(lines: string[], speed = 28) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [done, setDone]           = useState(false);

  useEffect(() => {
    setDisplayed([]);
    setDone(false);
    let lineIdx = 0;
    let charIdx = 0;
    let current = '';

    const id = setInterval(() => {
      if (lineIdx >= lines.length) { clearInterval(id); setDone(true); return; }
      const line = lines[lineIdx];
      if (charIdx <= line.length) {
        current = line.slice(0, charIdx);
        setDisplayed(prev => {
          const copy = [...prev];
          copy[lineIdx] = current;
          return copy;
        });
        charIdx++;
      } else {
        lineIdx++;
        charIdx = 0;
        current = '';
      }
    }, speed);

    return () => clearInterval(id);
  }, [lines.join('')]);

  return { displayed, done };
}

export function TerminalEgg() {
  const [open, setOpen]         = useState(false);
  const [_typed, setTyped]      = useState('');
  const bufRef                  = useRef('');
  const closeButtonRef          = useRef<HTMLButtonElement>(null);
  const dialogRef               = useRef<HTMLDivElement>(null);
  const { displayed, done }     = useTypeLines(open ? bootLines : []);

  // Move focus into dialog on open; trap Tab within it
  useEffect(() => {
    if (open) {
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])')
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    window.addEventListener('keydown', onTab);
    return () => window.removeEventListener('keydown', onTab);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open) {
        if (e.key === 'Escape') { setOpen(false); bufRef.current = ''; setTyped(''); }
        return;
      }
      if (e.key.length === 1) {
        bufRef.current = (bufRef.current + e.key).slice(-SECRET.length);
        setTyped(bufRef.current);
        if (bufRef.current === SECRET) {
          setOpen(true);
          bufRef.current = '';
          setTyped('');
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="terminal"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Terminal easter egg"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0a0c1a] overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
              <button
                ref={closeButtonRef}
                onClick={() => setOpen(false)}
                aria-label="Close terminal"
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors focus-visible:ring-1 focus-visible:ring-red-400 focus-visible:outline-none"
              />
              <div className="w-3 h-3 rounded-full bg-amber-500/40" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/40" />
              <span className="ml-2 text-[11px] text-white/30 font-mono">himanshu — zsh</span>
              <span className="ml-auto text-[10px] text-white/20 font-mono">ESC to close</span>
            </div>

            {/* Terminal body */}
            <div className="p-5 font-mono text-xs leading-relaxed min-h-[320px]">
              {displayed.map((line, i) => (
                <div key={i} className={
                  line.startsWith('>') ? 'text-purple/90' :
                  line.startsWith('  NAME') || line.startsWith('  ROLE') || line.startsWith('  STACK') ||
                  line.startsWith('  CITY') || line.startsWith('  MUSIC') || line.startsWith('  STATUS')
                    ? 'text-white/80 pl-2'
                    : 'text-white/30'
                }>
                  {line || '\u00A0'}
                </div>
              ))}
              {!done && (
                <span className="inline-block w-2 h-[1em] bg-purple/80 align-middle animate-pulse ml-0.5" />
              )}
            </div>

            {/* Hint */}
            <div className="px-5 pb-4 text-[10px] text-white/20 font-mono">
              💡 You found a secret — type <span className="text-purple/60">himanshu</span> anywhere to open this
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
