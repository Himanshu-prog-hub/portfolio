'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spotlight } from './ui/Spotlight';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import MagicButton from './ui/MagicButton';
import { AmbientParticles } from './ui/AmbientParticles';
import { MagneticButton } from './ui/MagneticButton';
import { StarConstellation } from './ui/StarConstellation';
import { FaLocationArrow, FaCopy, FaCheck } from 'react-icons/fa';

const EMAIL = 'mishra00.11himanshu@gmail.com';

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-200 group"
    >
      <span className="text-xs text-white/40 group-hover:text-white/70 font-mono transition-colors duration-200">
        {EMAIL}
      </span>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="check"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-emerald-400"
          >
            <FaCheck className="w-3 h-3" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-white/20 group-hover:text-white/50 transition-colors duration-200"
          >
            <FaCopy className="w-3 h-3" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

const Hero = () => {
  return (
    <div className="pb-4 pt-28 relative">
      <StarConstellation />

      <div
        className="hero-bottom-fade absolute bottom-0 left-0 right-0 pointer-events-none z-[5]"
        style={{ height: '180px' }}
      />

      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="-top-10 -left-full h-[80vh] w-[50vw]" fill="purple" />
        <Spotlight className="-top-28 -left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AmbientParticles count={26} />
      </div>

      <div className="flex justify-center relative my-10 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center gap-4">

          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mishra00.11himanshu%40gmail.com&su=Freelance%20Opportunity&body=Hi%20Himanshu%2C%20I%27d%20love%20to%20discuss%20a%20potential%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-400/25 bg-emerald-400/8 backdrop-blur-sm cursor-pointer hover:border-emerald-400/50 hover:bg-emerald-400/[0.12] transition-all duration-200"
            title="Open a freelance conversation"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs font-semibold text-emerald-400 tracking-wide">
              Open to Freelance Opportunities
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-emerald-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </motion.a>

          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Hi! I'm Himanshu"
          />

          <p className="text-center md:tracking-wider text-sm md:text-lg lg:text-2xl text-white/80">
            Fullstack Developer &amp; Classical Vocalist · Bengaluru
          </p>

          <CopyEmail />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="text-[10px] text-white/20 font-mono tracking-widest mt-1"
          >
            psst — try typing your name on the keyboard 🤫
          </motion.p>

          <MagneticButton strength={22}>
            <a href="#about">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
