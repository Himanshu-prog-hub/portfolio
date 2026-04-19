'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[9998] origin-left"
        style={{
          scaleX,
          background: '#E8366A',
        }}
      />
      {/* Glowing tip that follows the bar's right edge */}
      <motion.div
        className="fixed top-0 h-[2px] w-6 z-[9999]"
        style={{
          left: 0,
          scaleX,
          transformOrigin: 'left',
          background: 'rgba(232,54,106,0)',
        }}
      />
    </>
  );
}
