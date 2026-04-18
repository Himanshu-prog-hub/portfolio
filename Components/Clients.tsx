'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: "Years of Experience", value: 3, suffix: "+", description: "Building production-grade software" },
  { label: "Companies", value: 2, suffix: "", description: "Serko & Sabre Travel Technologies" },
  { label: "Technologies", value: 15, suffix: "+", description: "Across languages, frameworks & cloud" },
  { label: "Microservices Shipped", value: 10, suffix: "+", description: "Scalable, cloud-native services" },
];

const focusAreas = [
  "System Design",
  "Cloud Architecture",
  "Microservices",
  "CI/CD Pipelines",
  "Backend Engineering",
  "Travel Tech",
  "Observability",
  "Payment Workflows",
  "Database Optimization",
  "API Design",
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, index, inView }: { stat: typeof stats[0]; index: number; inView: boolean }) {
  const count = useCountUp(stat.value, 1800, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
      className="relative group flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 bg-[#0d0f23] hover:border-purple/40 transition-all duration-300"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="text-5xl md:text-6xl font-bold text-white tabular-nums">
        {count}
        <span className="text-purple">{stat.suffix}</span>
      </span>
      <span className="mt-3 text-base font-semibold text-white/80">{stat.label}</span>
      <span className="mt-1 text-sm text-white/40">{stat.description}</span>
    </motion.div>
  );
}

const DevStats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-20" id="stats" ref={sectionRef}>
      <h2 className="heading">
        By The{' '}
        <span className="text-purple">Numbers</span>
      </h2>
      <p className="text-center text-white/40 mt-3 text-sm md:text-base max-w-lg mx-auto">
        A snapshot of my journey as a software engineer
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14 max-w-5xl mx-auto px-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
        ))}
      </div>

      {/* Focus areas */}
      <div className="mt-16 max-w-4xl mx-auto px-4">
        <p className="text-center text-white/50 text-xs uppercase tracking-widest mb-6">
          Technical Focus Areas
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {focusAreas.map((area, i) => (
            <motion.span
              key={area}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.35 }}
              className="px-4 py-2 text-sm rounded-full border border-white/10 text-white/60 bg-[#0d0f23] hover:border-purple/50 hover:text-white transition-all duration-200"
            >
              {area}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevStats;
