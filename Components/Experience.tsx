'use client';

import { workExperience } from '@/data';
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const dotColors = ['#7c3aed', '#2563eb', '#0891b2'];

const Experience = () => {
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
    <div className="py-20" id="experience" ref={sectionRef}>
      <h1 className="heading">
        My <span className="text-purple">Work Experience</span>
      </h1>
      <p className="text-center text-white/40 mt-3 text-sm md:text-base max-w-lg mx-auto">
        The places that shaped how I build software
      </p>

      <div className="relative mt-16 max-w-3xl mx-auto px-4">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-2 bottom-2 w-px bg-gradient-to-b from-purple/60 via-blue-600/30 to-transparent" />

        <div className="flex flex-col gap-12">
          {workExperience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6, ease: 'easeOut' }}
              className="relative flex gap-8 md:gap-10"
            >
              {/* Dot */}
              <div className="relative flex-shrink-0 w-12 md:w-16 flex justify-center">
                <div
                  className="w-3.5 h-3.5 rounded-full mt-1.5 ring-4 ring-black-100 z-10"
                  style={{ backgroundColor: dotColors[index] ?? '#7c3aed' }}
                />
              </div>

              {/* Card */}
              <div className="flex-1 group pb-2">
                <div className="rounded-2xl border border-white/10 bg-[#0d0f23] p-6 md:p-8 hover:border-purple/30 transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                        {exp.role}
                      </h3>
                      <p className="text-purple font-semibold text-sm md:text-base mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 text-right">
                      <span className="text-xs font-medium text-white/50 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.duration}
                      </span>
                      <span className="text-xs text-white/30">{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-white/50 leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs rounded-full border border-white/10 text-white/50 bg-white/[0.03] hover:border-purple/40 hover:text-white/80 transition-all duration-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
