'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaYoutube, FaInstagram, FaMusic, FaGuitar, FaSpotify } from 'react-icons/fa';
import { HiMusicNote } from 'react-icons/hi';
import dynamic from 'next/dynamic';

const HolographicGuitar = dynamic(
  () => import('./ui/HolographicGuitar').then(m => m.HolographicGuitar),
  { ssr: false }
);

const HolographicCello = dynamic(
  () => import('./ui/HolographicCello').then(m => m.HolographicCello),
  { ssr: false }
);
// const HolographicCellist = dynamic(
//   () => import('./ui/HolographicCellist').then(m => m.HolographicCellist),
//   { ssr: false }
// );

// ─── Hobby cards ─────────────────────────────────────────────────────────
const hobbies = [
  {
    id: 1,
    icon: <FaMusic className="w-6 h-6" />,
    accent: 'from-amber-500/20 to-orange-600/10',
    border: 'hover:border-amber-500/40',
    dot: 'bg-amber-400',
    label: 'Classical Vocalist',
    title: 'Hindustani Classical Singing',
    description:
      'Trained in Khayal — the meditative North Indian classical vocal tradition. Music for me is what debugging is to code: a deeply focused pursuit of something precise and beautiful.',
    cta: { label: 'Watch on YouTube', href: 'https://www.youtube.com/@himanshumishra8864', icon: <FaYoutube className="w-4 h-4" /> },
    ctaSecondary: { label: 'Instagram', href: 'https://www.instagram.com/himanshumishra4257/', icon: <FaInstagram className="w-4 h-4" /> },
    tags: ['Khayal', 'Raga', 'Hindustani', 'Classical'],
  },
  {
    id: 2,
    icon: <FaGuitar className="w-6 h-6" />,
    accent: 'from-indigo-500/20 to-purple-600/10',
    border: 'hover:border-indigo-500/40',
    dot: 'bg-indigo-400',
    label: 'Guitar Enthusiast',
    title: 'Exploring Strings & Ragas',
    description:
      'Self-taught guitarist experimenting at the intersection of Western chord progressions and Indian classical ragas. The same systematic thinking that makes a good engineer makes a disciplined musician.',
    cta: { label: 'Follow on Instagram', href: 'https://www.instagram.com/himanshumishra4257/', icon: <FaInstagram className="w-4 h-4" /> },
    tags: ['Guitar', 'Fusion', 'Raga', 'Instrumental'],
  },
];

function MusicBars() {
  const heights = [40, 70, 55, 85, 45, 65, 50];
  return (
    <div className="flex items-end gap-[3px] h-10">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-amber-400/60"
          animate={{ scaleY: [1, h / 50, 0.4, h / 60, 1] }}
          transition={{ duration: 1.4 + i * 0.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
          style={{ height: `${h}%`, originY: 1 }}
        />
      ))}
    </div>
  );
}

// ─── Real Spotify data (from extended streaming history: 35,222 plays, 1,474 hrs) ──
const SPOTIFY_STATS = {
  totalPlays:  35222,
  totalHours:  1474,
  topArtist:   'Pritam',
  topTrack:    'Excuses — AP Dhillon',
  topGenres:   ['Bollywood', 'Punjabi Pop', 'Indian Indie', 'Ghazal'],
};

const TOP_ARTISTS = [
  'Pritam', 'AP Dhillon', 'Jagjit Singh', 'Shankar-Ehsaan-Loy',
  'Coldplay', 'Prateek Kuhad', 'A.R. Rahman', 'Arijit Singh',
];

// Genre → match score based on actual listening profile
const GENRE_SCORES: Record<string, number> = {
  'Bollywood / Hindi Film':         96,
  'Ghazal / Sufi':                  94,
  'Hindustani Classical':           95,
  'Punjabi Pop (AP Dhillon vibes)': 92,
  'Indian Indie / Singer-Songwriter': 88,
  'Western Pop / Soft Rock':        82,
  'Cinematic / OST (Hans Zimmer)':  72,
  'Jazz & Blues':                   68,
  'Folk / Indie':                   74,
  'K-Pop':                          28,
  'Electronic / EDM':               20,
  'Metal / Heavy Rock':             14,
};

const INSTRUMENT_BONUS: Record<string, number> = {
  'I sing / do vocals': 13,
  'Guitar':             13,
  'Tabla / Percussion': 14,
  'Violin / Strings':   10,
  'Piano / Keys':        7,
  'Flute / Wind':        9,
  'No instrument yet':   0,
};

const VIBE_SCORES: Record<string, number> = {
  'Soulful & emotional':     12,
  'Meditative & peaceful':   12,
  'Late-night feels':        10,
  'Energetic & upbeat':       3,
  'Dark & moody':             6,
  'Raw & acoustic':          10,
};

function getResultCopy(score: number, genre: string, vibe: string) {
  if (score >= 88) return {
    emoji: '🎵',
    headline: 'We are literally listening to the same playlist.',
    body: `${genre} + Hindustani classical + guitar? That's basically my whole identity on Spotify. 1,474 hours say I take music seriously. Let's create something.`,
    cta: 'Let\'s Collab →',
  };
  if (score >= 72) return {
    emoji: '🎸',
    headline: 'Our music worlds definitely overlap.',
    body: `${vibe} energy + ${genre} — there's a real conversation here. The intersection of your sound and mine could be interesting.`,
    cta: 'Start the Conversation →',
  };
  if (score >= 50) return {
    emoji: '🌊',
    headline: 'Different worlds, interesting intersection.',
    body: `A ${genre} listener walking into a Bollywood + classical studio. Honestly? That's where the best fusion comes from.`,
    cta: 'Let\'s Chat About It →',
  };
  return {
    emoji: '✨',
    headline: 'Opposite ends of the spectrum.',
    body: 'Which means if we ever collaborated, it would be genuinely unexpected. Curious what that would sound like.',
    cta: 'Why Not? →',
  };
}

// ─── Music Collab Chat ────────────────────────────────────────────────────
type Answers = { genre: string; instrument: string; vibe: string };

function MusicCollabChat() {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [result, setResult]   = useState<{ score: number; copy: ReturnType<typeof getResultCopy> } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  function select(key: keyof Answers, val: string) {
    const next = { ...answers, [key]: val };
    setAnswers(next);
    if (key === 'vibe' && next.genre && next.instrument) {
      const gScore = GENRE_SCORES[next.genre] ?? 35;
      const iBonus = INSTRUMENT_BONUS[next.instrument] ?? 0;
      const vBonus = VIBE_SCORES[next.vibe ?? ''] ?? 4;
      const score  = Math.min(99, Math.round(gScore + iBonus + vBonus));
      setTimeout(() => { setResult({ score, copy: getResultCopy(score, next.genre!, next.vibe!) }); setStep(4); }, 400);
    } else {
      setTimeout(() => setStep(s => s + 1), 300);
    }
  }

  function reset() { setStep(0); setAnswers({}); setResult(null); }

  const steps = [
    { key: 'genre'      as const, question: 'What music moves you most?',    sub: 'Pick the genre closest to your heart',        options: Object.keys(GENRE_SCORES) },
    { key: 'instrument' as const, question: 'Do you play anything?',          sub: 'Instruments, voice — anything counts',        options: Object.keys(INSTRUMENT_BONUS) },
    { key: 'vibe'       as const, question: 'What vibe do you live in?',      sub: 'The feeling you chase when you hit play',     options: Object.keys(VIBE_SCORES) },
  ];

  const currentStep = steps[step - 1];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
      className="mt-8 sm:mt-14 max-w-4xl mx-auto px-4"
    >
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-purple font-semibold mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-purple animate-pulse" />
          Music Collab Matcher · Powered by Spotify Data
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white dark:text-white">
          Want to <span className="text-purple">Collaborate?</span>
        </h2>
        <p className="text-white/40 text-sm mt-2 max-w-sm mx-auto">
          Tell me your music taste — I&apos;ll match it against my real Spotify listening history.
        </p>
      </div>

      <div className="relative rounded-2xl border border-white/10 bg-[#0a0c1e] overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-purple/8 blur-3xl rounded-full pointer-events-none" />

        {/* Real Spotify stats bar */}
        <div className="border-b border-white/[0.06] px-4 sm:px-6 py-2.5 flex items-center gap-4 sm:gap-6 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <FaSpotify className="w-3.5 h-3.5 text-[#1DB954]" />
            <span className="text-[10px] text-white/50 font-medium hidden sm:block">Real data</span>
          </div>
          {[
            { label: 'Plays', value: '35,222' },
            { label: 'Hours', value: '1,474' },
            { label: '#1 Artist', value: 'Pritam' },
            { label: 'Most Played', value: 'Excuses — AP Dhillon', hideMobile: true },
          ].map(s => (
            <div key={s.label} className={`shrink-0 ${(s as any).hideMobile ? 'hidden sm:block' : ''}`}>
              <span className="text-[9px] text-white/25 uppercase tracking-wider block">{s.label}</span>
              <span className="text-[11px] text-white/70 font-semibold">{s.value}</span>
            </div>
          ))}
          <div className="ml-auto shrink-0 flex gap-1.5">
            {TOP_ARTISTS.slice(0, 4).map(a => (
              <span key={a} className="text-[9px] px-2 py-0.5 rounded-full border border-white/10 text-white/30 hidden md:block">{a}</span>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-8 md:p-10 min-h-[300px] sm:min-h-[340px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="intro" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}
                className="flex flex-col items-center justify-center flex-1 text-center gap-6">
                <div className="flex items-end gap-1 h-12">
                  {[35, 60, 45, 80, 55, 90, 65, 75, 40, 60, 50, 85, 45].map((h, i) => (
                    <motion.div key={i} className="w-1.5 rounded-full bg-gradient-to-t from-purple/60 to-cyan-400/60"
                      animate={{ scaleY: [0.4, h / 60, 0.3, h / 70, 0.5] }}
                      transition={{ duration: 1.8 + i * 0.12, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
                      style={{ height: `${h}%`, originY: 1 }} />
                  ))}
                </div>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                  <span className="text-white/90 font-medium">1,474 hours</span>{' '}of Spotify, Khayal training, and guitar experiments.
                  My taste is all over the place — let&apos;s see if yours overlaps.
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {SPOTIFY_STATS.topGenres.map(g => (
                    <span key={g} className="text-[10px] px-2.5 py-1 rounded-full border border-purple/25 text-purple/80 bg-purple/5">{g}</span>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(1)}
                  className="px-7 py-3 rounded-full bg-purple/20 hover:bg-purple/30 border border-purple/40 text-white text-sm font-semibold transition-all duration-200 flex items-center gap-2">
                  <HiMusicNote className="w-4 h-4" />
                  Check our compatibility
                </motion.button>
                <p className="text-white/20 text-xs">3 quick questions · matched against real Spotify data</p>
              </motion.div>
            )}

            {step >= 1 && step <= 3 && currentStep && (
              <motion.div key={`step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.32 }}
                className="flex flex-col gap-6 flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map(n => (
                      <div key={n} className={`h-1 rounded-full transition-all duration-400 ${n <= step ? 'bg-purple w-8' : 'bg-white/10 w-4'}`} />
                    ))}
                  </div>
                  <span className="text-white/25 text-xs">{step} / 3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{currentStep.question}</h3>
                  <p className="text-white/35 text-xs mt-1">{currentStep.sub}</p>
                </div>
                <div className="flex flex-wrap gap-2.5 flex-1 content-start">
                  {currentStep.options.map(opt => {
                    const selected = answers[currentStep.key] === opt;
                    return (
                      <motion.button key={opt} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} onClick={() => select(currentStep.key, opt)}
                        className={`px-4 py-2 rounded-full border text-xs font-medium transition-all duration-200 ${selected ? 'border-purple bg-purple/25 text-white' : 'border-white/10 text-white/50 hover:border-purple/40 hover:text-white/80 hover:bg-purple/8'}`}>
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && result && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}
                className="flex flex-col items-center justify-center flex-1 gap-5 text-center">
                <div className="relative flex items-center justify-center w-28 h-28">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                    <motion.circle cx="50" cy="50" r="42" fill="none" stroke="url(#sg)" strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - result.score / 100) }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }} />
                    <defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#22d3ee" /></linearGradient></defs>
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-white">{result.score}%</span>
                    <span className="text-[9px] text-white/30 uppercase tracking-wider">match</span>
                  </div>
                </div>
                <div className="max-w-sm">
                  <p className="text-xl mb-1">{result.copy.emoji}</p>
                  <h3 className="text-lg font-bold text-white mb-2">{result.copy.headline}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{result.copy.body}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {Object.values(answers).map((v, i) => (
                    <span key={i} className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-white/30">{v}</span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a href="https://www.instagram.com/himanshumishra4257/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple/20 hover:bg-purple/30 border border-purple/40 text-white text-xs font-semibold transition-all duration-200">
                    <FaInstagram className="w-3.5 h-3.5" />
                    {result.copy.cta}
                  </a>
                  <a href="https://www.youtube.com/@himanshumishra8864" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 hover:border-white/25 text-white/50 hover:text-white/80 text-xs transition-all duration-200">
                    <FaYoutube className="w-3.5 h-3.5" />
                    Hear my music
                  </a>
                </div>
                <button onClick={reset} className="text-white/20 hover:text-white/50 text-xs transition-colors duration-200">↺ Try again</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-white/[0.06] px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaSpotify className="w-3.5 h-3.5 text-[#1DB954]/70" />
            <span className="text-[10px] text-white/30">Matched against 35,222 Spotify plays · 1,474 hrs · Real data</span>
          </div>
          {step > 0 && step < 4 && (
            <button onClick={reset} className="text-[10px] text-white/20 hover:text-white/40 transition-colors duration-200">Start over</button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────
const BeyondCode = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-20 relative overflow-x-hidden overflow-y-visible" id="beyond" ref={sectionRef}>

      {/* ── Holographic GUITAR — restored to exact "perfect" size/position ────
          Only change from the approved state: zIndex 0 → 3 so the transparent
          canvas always renders above the z-[2] content stacking context.
          The guitar lines are 1-2 px wide with no background, so raising the
          z-index makes them visible without covering any card text/backgrounds.
      ────────────────────────────────────────────────────────────────────── */}
      <div
        className="hidden xl:block absolute pointer-events-none"
        style={{
          zIndex: 3,
          left: 0,
          top: 0,
          width: 'calc((100% - 56rem) / 2)',
          height: '100%',
        }}
      >
        <div className="guitar-vignette-overlay absolute inset-0 z-10 pointer-events-none" />
        <div className="absolute inset-0 opacity-90">
          {inView && <HolographicGuitar />}
        </div>
      </div>

      {/* ── Holographic CELLO — exact mirror of the guitar on the right ──────
          Identical container; only left→right and gradient direction flipped.
          rotation.z = +0.22 in Three.js mirrors the guitar's -0.22 lean.
      ────────────────────────────────────────────────────────────────────── */}
      <div
        className="hidden xl:block absolute pointer-events-none"
        style={{
          zIndex: 3,
          right: 0,
          top: 0,
          width: 'calc((100% - 56rem) / 2)',
          height: '100%',
        }}
      >
        <div className="cello-vignette-overlay absolute inset-0 z-10 pointer-events-none" />
        <div className="absolute inset-0 opacity-90">
          {inView && <HolographicCello />}
        </div>
      </div>

      <div className="relative z-[2]">
        <h1 className="heading">
          Beyond{' '}
          <span className="text-purple">The Code</span>
        </h1>
        <p className="text-center text-white/40 mt-3 text-sm md:text-base max-w-lg mx-auto">
          The disciplines that keep me sharp — and human
        </p>

        {/* Hobby cards */}
        <div className="mt-8 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto px-4">
          {hobbies.map((h, i) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6, ease: 'easeOut' }}
              className={`relative group rounded-2xl border border-white/10 bg-[#0d0f23] p-5 sm:p-7 flex flex-col gap-4 sm:gap-5 transition-all duration-300 overflow-hidden hover:shadow-[0_0_28px_rgba(124,58,237,0.1)] ${h.border}`}
            >
              <div className={`absolute -top-8 -right-8 w-40 h-40 rounded-full bg-gradient-to-br ${h.accent} blur-2xl pointer-events-none`} />
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${h.accent} border border-white/10 flex items-center justify-center text-white/80`}>{h.icon}</div>
                  <div>
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-semibold">
                      <span className={`w-1.5 h-1.5 rounded-full ${h.dot}`} />
                      <span className="text-white/40">{h.label}</span>
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{h.title}</h3>
                  </div>
                </div>
                {h.id === 1 && <MusicBars />}
              </div>
              <p className="text-sm text-white/50 leading-relaxed relative z-10">{h.description}</p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {h.tags.map(t => <span key={t} className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-white/40 hover:border-purple/40 hover:text-white/65 transition-all duration-200 cursor-default">{t}</span>)}
              </div>
              <div className="flex items-center gap-3 mt-auto relative z-10">
                <a href={h.cta.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-semibold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all duration-200">
                  {h.cta.icon}{h.cta.label}
                </a>
                {h.ctaSecondary && (
                  <a href={h.ctaSecondary.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 px-3 py-2 rounded-full border border-white/[0.05] hover:border-white/15 transition-all duration-200">
                    {h.ctaSecondary.icon}{h.ctaSecondary.label}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Music Collab Chat */}
        <MusicCollabChat />

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 max-w-2xl mx-auto px-4 text-center"
        >
          <p className="text-white/20 text-sm italic leading-relaxed">
            &ldquo;The same discipline that holds a raga together holds a system together —
            precision, patience, and the courage to improvise.&rdquo;
          </p>
        </motion.div>
      </div>{/* end content */}
    </div>
  );
};

export default BeyondCode;
