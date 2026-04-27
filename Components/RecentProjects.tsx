'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '@/data';
import { FaGithub, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';
import { TiltCard } from './ui/TiltCard';
import { FadeIn } from './ui/FadeIn';

// ─── AI brain: keyword → matched tags + response text ─────────────────────
const aiRules: { keywords: string[]; tags: string[]; reply: string }[] = [
  {
    keywords: ['ai', 'llm', 'rag', 'machine learning', 'ml', 'gpt', 'intelligent'],
    tags: ['AI', 'LLM', 'RAG'],
    reply: 'Found projects where I worked with AI, LLMs, and Retrieval-Augmented Generation.',
  },
  {
    keywords: ['backend', 'java', 'spring', 'api', 'microservice', 'server'],
    tags: ['Java', 'Spring Boot', 'Microservices', 'REST API', 'Backend'],
    reply: 'Here are my backend-heavy projects: Java, Spring Boot, microservices architecture.',
  },
  {
    keywords: ['cloud', 'gcp', 'kubernetes', 'k8s', 'docker', 'devops', 'ci', 'cd'],
    tags: ['GCP', 'Kubernetes', 'Cloud', 'CI/CD'],
    reply: 'Showing cloud-native and DevOps-focused work: GCP, Kubernetes, CI/CD pipelines.',
  },
  {
    keywords: ['frontend', 'react', 'next', 'ui', 'three', 'animation', 'portfolio'],
    tags: ['Next.js', 'Three.js', 'TypeScript', 'Frontend', 'React'],
    reply: 'Here are the frontend and UI-heavy projects using React, Next.js, and Three.js.',
  },
  {
    keywords: ['travel', 'booking', 'serko', 'sabre', 'corporate', 'flight'],
    tags: ['Microservices', 'REST API', 'Backend', 'Cloud'],
    reply: 'Showing projects related to travel tech: booking systems, corporate travel platforms.',
  },
  {
    keywords: ['typescript', 'ts', 'javascript', 'js'],
    tags: ['TypeScript', 'Next.js', 'Frontend'],
    reply: 'Projects built with TypeScript / JavaScript at their core.',
  },
];

function matchQuery(query: string): { matchedTags: string[]; reply: string } | null {
  const q = query.toLowerCase().trim();
  if (!q) return null;
  for (const rule of aiRules) {
    if (rule.keywords.some(k => q.includes(k))) {
      return { matchedTags: rule.tags, reply: rule.reply };
    }
  }
  return {
    matchedTags: [],
    reply: `Showing all projects. No specific match for "${query}". Try keywords like "AI", "backend", or "cloud".`,
  };
}

// ─── Typing animation hook ─────────────────────────────────────────────────
function useTypewriter(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    if (!text) return;
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text]);
  return displayed;
}

// ─── Status badge ──────────────────────────────────────────────────────────
const statusColor: Record<string, string> = {
  'In Progress': 'text-amber-400 border-amber-400/30 bg-amber-400/5',
  'Shipped':     'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
  'Live':        'text-amber-400 border-amber-400/30 bg-amber-400/5',
};

// ─── Project Card ──────────────────────────────────────────────────────────
function ProjectCard({ project, highlighted, index }: { project: Project; highlighted: boolean; index: number }) {
  return (
    <TiltCard maxTilt={6} className="rounded-2xl h-full">
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`relative group rounded-2xl border p-6 flex flex-col gap-4 h-full transition-all duration-300 ${
        highlighted
          ? 'border-purple/60 bg-purple/5 shadow-[0_0_30px_rgba(124,58,237,0.15)]'
          : 'border-white/[0.05] bg-[#141020] hover:border-white/20'
      }`}
    >
      {/* Status + icons row */}
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${statusColor[project.status] ?? 'text-white/40 border-white/[0.05]'}`}>
          {project.status}
        </span>
        <div className="flex gap-1.5">
          {project.iconLists.map((icon, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-black/40 border border-white/[0.05] flex items-center justify-center">
              <img src={icon} alt="" loading="lazy" className="w-3.5 h-3.5 object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base md:text-lg font-heading text-white leading-snug group-hover:text-purple transition-colors duration-200">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-white/50 leading-relaxed flex-1">
        {project.des}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {(project.tags ?? []).map((tag: string) => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.05] text-white/40">
            {tag}
          </span>
        ))}
      </div>

      {/* Links row */}
      <div className="flex items-center gap-3 mt-1 flex-wrap">
        {/* Launch button — shown when project has a liveUrl */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target={project.liveUrl.startsWith('/') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="group/launch flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold
                       bg-purple/15 border border-purple/40
                       text-white hover:bg-purple/25 hover:border-purple/70
                       transition-all duration-200 shadow-[0_0_12px_rgba(232,54,106,0.12)]
                       hover:shadow-[0_0_20px_rgba(232,54,106,0.25)]"
          >
            <FaPlay className="w-2.5 h-2.5 text-purple group-hover/launch:scale-110 transition-transform duration-150" />
            {project.liveLabel ?? 'Launch App'}
            <FaExternalLinkAlt className="w-2 h-2 text-purple/60" />
          </a>
        )}

        {/* GitHub link — hidden for internal/proprietary projects with no public repo */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-white/35 hover:text-white/60 transition-colors duration-200 w-fit"
          >
            <FaGithub className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        )}
        {!project.link && (
          <span className="flex items-center gap-1.5 text-xs text-white/20 italic">
            Internal tool, not open source
          </span>
        )}
      </div>
    </motion.div>
    </TiltCard>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────
const RecentProjects = () => {
  const [query, setQuery]             = useState('');
  const [submitted, setSubmitted]     = useState('');
  const [aiReply, setAiReply]         = useState('');
  const [highlightedTags, setHighlighted] = useState<string[]>([]);
  const [isThinking, setIsThinking]   = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const typedReply = useTypewriter(aiReply, 22);

  const chips = ['AI & LLM', 'Backend / Java', 'Cloud & GCP', 'Frontend'];

  const handleSubmit = (q = query) => {
    if (!q.trim()) return;
    setSubmitted(q);
    setAiReply('');
    setIsThinking(true);
    setTimeout(() => {
      const result = matchQuery(q);
      setIsThinking(false);
      setHighlighted(result?.matchedTags ?? []);
      setAiReply(result?.reply ?? '');
    }, 800);
  };

  const filteredProjects =
    highlightedTags.length === 0
      ? projects
      : projects.filter(p =>
          (p.tags ?? []).some((t: string) => highlightedTags.includes(t))
        );

  const allProjects = projects;

  return (
    <div className="py-20" id="projects">
      <FadeIn direction="up" duration={0.6}>
        <h2 className="heading">
          Things I&apos;ve{' '}
          <span className="text-purple">Built</span>
        </h2>
      </FadeIn>
      <FadeIn direction="up" delay={0.12} duration={0.5}>
        <p className="text-center text-white/40 mt-3 text-sm md:text-base max-w-lg mx-auto">
          From enterprise travel tech to personal experiments
        </p>
      </FadeIn>

      {/* ── AI Search bar ─────────────────────────────────────────────────── */}
      <FadeIn direction="up" delay={0.2} duration={0.55}>
      <div className="mt-12 max-w-2xl mx-auto px-4">
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-purple/15 blur-sm" />
          <div className="relative flex items-center gap-3 rounded-2xl border border-white/[0.05] bg-[#0D0A18] px-4 py-3">
            {/* Animated AI dot */}
            <div className="flex-shrink-0 flex items-center gap-1">
              <motion.div
                className="w-2 h-2 rounded-full bg-purple"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            </div>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder='Ask about my projects... e.g. "show me AI projects"'
              className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/25 outline-none"
            />
            <button
              onClick={() => handleSubmit()}
              className="flex-shrink-0 text-xs font-semibold text-purple/70 hover:text-purple transition-colors px-2"
            >
              Ask →
            </button>
          </div>
        </div>

        {/* Quick chips */}
        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          {chips.map(chip => (
            <button
              key={chip}
              onClick={() => { setQuery(chip); handleSubmit(chip); }}
              className="text-xs px-3 py-1.5 rounded-full border border-white/[0.05] text-white/40 hover:border-purple/40 hover:text-white/70 transition-all duration-200"
            >
              {chip}
            </button>
          ))}
          {submitted && (
            <button
              onClick={() => { setQuery(''); setSubmitted(''); setAiReply(''); setHighlighted([]); }}
              className="text-xs px-3 py-1.5 rounded-full border border-white/[0.05] text-white/30 hover:text-white/60 transition-all"
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* AI reply */}
        <AnimatePresence>
          {(isThinking || typedReply) && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-start gap-3 bg-purple/5 border border-purple/15 rounded-xl px-4 py-3"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple/20 flex items-center justify-center mt-0.5">
                <motion.div
                  className="w-2 h-2 rounded-full bg-purple"
                  animate={isThinking ? { scale: [1, 1.4, 1], opacity: [1, 0.4, 1] } : {}}
                  transition={{ duration: 0.7, repeat: isThinking ? Infinity : 0 }}
                />
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                {isThinking ? (
                  <span className="text-white/30 animate-pulse">Thinking...</span>
                ) : (
                  <>
                    {typedReply}
                    {typedReply.length < aiReply.length && (
                      <span className="inline-block w-0.5 h-3.5 bg-purple ml-0.5 animate-pulse" />
                    )}
                  </>
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </FadeIn>

      {/* ── Project grid ───────────────────────────────────────────────────────────────────────────── */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto px-4">
        <AnimatePresence mode="popLayout">
          {(highlightedTags.length > 0 ? filteredProjects : allProjects).map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              highlighted={highlightedTags.length > 0 && (project.tags ?? []).some((t: string) => highlightedTags.includes(t))}
              index={i}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecentProjects;
