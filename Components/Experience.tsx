'use client';

import { workExperience } from '@/data';
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const dotGradients = [
  'linear-gradient(135deg, #FF6B9D 0%, #E8366A 45%, #C0384A 100%)',
  'linear-gradient(135deg, #A78BFA 0%, #7C3AED 45%, #6B48D0 100%)',
  'linear-gradient(135deg, #38BDF8 0%, #0EA5E9 45%, #0891b2 100%)',
];

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
      <h2 className="heading">
        My <span className="text-purple">Work Experience</span>
      </h2>
      <p className="text-center text-white/65 mt-3 text-sm md:text-base max-w-lg mx-auto">
        The places that shaped how I build software
      </p>

      <div className="relative mt-16 max-w-3xl mx-auto px-4">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-2 bottom-2 w-px bg-gradient-to-b from-purple/60 to-transparent" />

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
                  style={{ background: dotGradients[index] ?? 'linear-gradient(135deg, #FF6B9D, #C0384A)' }}
                />
              </div>

              {/* Card */}
              <div className="flex-1 group pb-2">
                <div className="rounded-2xl border border-white/[0.05] bg-[#141020] p-6 md:p-8 hover:border-white/[0.15] hover:shadow-[0_0_24px_rgba(232,54,106,0.06)] transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-heading text-white leading-tight">
                        {exp.role}
                      </h3>
                      <p className="text-purple font-heading font-semibold text-sm md:text-base mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs font-medium text-white/50 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                        {exp.duration}
                      </span>
                      <span className="text-xs text-white/30 text-right">{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm md:text-base text-white/75 leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs rounded-full border border-white/[0.05] text-white/50 bg-white/[0.03] hover:border-purple/40 hover:text-white/80 transition-all duration-200"
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
