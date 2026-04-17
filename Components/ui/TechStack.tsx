'use client';

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Languages", "Frameworks", "Databases", "Testing", "Tools"] as const;
type Category = typeof categories[number];

interface Tech {
  name: string;
  level?: "core" | "proficient" | "familiar";
  years?: string;
  note?: string;
}

const techData: Record<Category, Tech[]> = {
  Languages: [
    { name: "Java",       level: "core",       years: "4+ yrs", note: "Primary language at Serko & Sabre" },
    { name: "TypeScript", level: "core",       years: "3 yrs",  note: "Used across all frontend & Node work" },
    { name: "JavaScript", level: "core",       years: "3 yrs",  note: "React, Next.js, Node.js" },
    { name: "Python",     level: "proficient", years: "2 yrs",  note: "Scripting, ML experiments, FastAPI" },
    { name: "C++",        level: "proficient", years: "2 yrs",  note: "DSA, competitive programming" },
    { name: "C",          level: "familiar",   years: "1 yr",   note: "Systems programming coursework" },
  ],
  Frameworks: [
    { name: "Spring Boot", level: "core",      years: "3+ yrs", note: "Microservices, REST APIs, Kafka consumers" },
    { name: "Next.js",     level: "core",      years: "2 yrs",  note: "App Router, SSR, this portfolio!" },
    { name: "React.js",    level: "core",      years: "3 yrs",  note: "Hooks, context, framer-motion" },
  ],
  Databases: [
    { name: "PostgreSQL", level: "core",       years: "3 yrs",  note: "Primary DB at Serko, complex queries" },
    { name: "MySQL",      level: "core",       years: "2 yrs",  note: "Used at Sabre for booking systems" },
    { name: "MongoDB",    level: "proficient", years: "1.5 yrs",note: "Document store for travel data" },
  ],
  Testing: [
    { name: "JUnit",     level: "core",        years: "3 yrs",  note: "Unit & integration testing in Java" },
    { name: "Selenium",  level: "proficient",  years: "1.5 yrs",note: "E2E automation for web flows" },
    { name: "Cypress",   level: "proficient",  years: "1 yr",   note: "Frontend E2E testing in Next.js projects" },
  ],
  Tools: [
    { name: "Docker",     level: "core",       years: "3 yrs",  note: "Containerised every service at Serko" },
    { name: "Kubernetes", level: "core",       years: "2 yrs",  note: "GKE deployments, HPA, ingress" },
    { name: "GCP",        level: "core",       years: "2 yrs",  note: "Cloud Run, Pub/Sub, BigQuery, GKE" },
    { name: "Git",        level: "core",       years: "4+ yrs", note: "GitOps, PR reviews, trunk-based dev" },
    { name: "Jenkins",    level: "proficient", years: "2 yrs",  note: "CI/CD pipelines at Sabre" },
    { name: "AWS",        level: "proficient", years: "1 yr",   note: "EC2, S3, Lambda — side projects" },
    { name: "Azure",      level: "familiar",   years: "6 mo",   note: "Azure DevOps, basic resource mgmt" },
  ],
};

const levelStyle: Record<string, string> = {
  core:       "border-purple/50 text-white/80 bg-purple/10 hover:border-purple/80 hover:bg-purple/20",
  proficient: "border-blue-500/40 text-white/60 bg-blue-500/5 hover:border-blue-500/70 hover:bg-blue-500/10",
  familiar:   "border-white/10 text-white/40 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]",
};

const levelDot: Record<string, string> = {
  core: 'bg-purple', proficient: 'bg-blue-500', familiar: 'bg-white/30',
};

// ─── Skill chip with portal tooltip ─────────────────────────────────────────
function SkillChip({ item }: { item: Tech }) {
  const [show, setShow]       = useState(false);
  const [coords, setCoords]   = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Avoid SSR mismatch — only render portal after hydration
  useEffect(() => { setMounted(true); }, []);

  const handleMouseEnter = () => {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      // Centre tooltip on chip; clamp so it never leaves the viewport
      const rawX   = r.left + r.width / 2;
      const halfW  = 100; // half of max-w-[200px]
      const clampX = Math.min(Math.max(rawX, halfW + 8), window.innerWidth - halfW - 8);
      setCoords({ x: clampX, y: r.top });
    }
    setShow(true);
  };

  const tooltip = (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.95 }}
          transition={{ duration: 0.12 }}
          style={{
            position:      'fixed',
            left:          coords.x,
            top:           coords.y - 8,
            transform:     'translate(-50%, -100%)',
            zIndex:        9999,
            pointerEvents: 'none',
            width:         'max-content',
            maxWidth:      '200px',
          }}
        >
          <div className="bg-[#0d0f23] border border-white/10 rounded-xl px-3.5 py-2.5 shadow-xl shadow-black/40 text-left">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`w-1.5 h-1.5 rounded-full ${levelDot[item.level ?? 'familiar']}`} />
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">{item.level}</span>
              {item.years && (
                <span className="text-[10px] text-white/30 ml-auto pl-1">· {item.years}</span>
              )}
            </div>
            {item.note && (
              <p className="text-[11px] text-white/45 leading-snug">{item.note}</p>
            )}
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white/10" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <span
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
    >
      <motion.span
        whileHover={{ y: -1 }}
        transition={{ duration: 0.15 }}
        className={`inline-block px-3 py-1 text-xs rounded-full border cursor-default transition-all duration-200 ${levelStyle[item.level ?? "familiar"]}`}
      >
        {item.name}
      </motion.span>

      {/* Render tooltip into document.body so overflow:hidden on parent cards can't clip it */}
      {mounted && createPortal(tooltip, document.body)}
    </span>
  );
}

export const TechStack = () => {
  const [active, setActive] = useState<Category>("Languages");

  return (
    <div className="flex flex-col gap-5 mt-6 w-full">
      {/* Tab row */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`relative px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 focus:outline-none ${
              active === cat
                ? "text-white border-transparent"
                : "text-white/40 border-white/10 hover:text-white/70 hover:border-white/20"
            }`}
          >
            {active === cat && (
              <motion.span
                layoutId="pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple/80 to-blue-600/80"
                style={{ zIndex: -1 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            {cat}
          </button>
        ))}
      </div>


      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {techData[active].map((item) => (
          <SkillChip key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
};
