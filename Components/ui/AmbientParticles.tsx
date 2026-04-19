'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

// Tiny floating orbs drifting in the Hero background.
// All values are deterministic (seeded) so SSR & client match exactly.
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface Particle {
  id: number;
  x: number;   // vw %
  y: number;   // vh %
  size: number; // px
  duration: number;
  delay: number;
  drift: number; // px horizontal drift
  opacity: number;
  color: 'purple' | 'cyan' | 'white';
}

const COLORS = {
  purple: 'rgba(232,54,106,0.55)',
  cyan:   'rgba(217,119,6,0.50)',
  white:  'rgba(255,255,255,0.30)',
};

export function AmbientParticles({ count = 28 }: { count?: number }) {
  const shouldReduce = useReducedMotion();
  const particles: Particle[] = useMemo(() => {
    const rand = seededRandom(42);
    const colorMap: Particle['color'][] = ['purple', 'purple', 'cyan', 'cyan', 'white'];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: 1.5 + rand() * 3,
      duration: 8 + rand() * 18,
      delay: rand() * -20,
      drift: (rand() - 0.5) * 60,
      opacity: 0.2 + rand() * 0.5,
      color: colorMap[Math.floor(rand() * colorMap.length)],
    }));
  }, [count]);

  if (shouldReduce) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: COLORS[p.color],
            boxShadow: `0 0 ${p.size * 3}px ${COLORS[p.color]}`,
          }}
          animate={{
            y: [0, -40 - Math.abs(p.drift * 0.4), 0],
            x: [0, p.drift * 0.5, 0],
            opacity: [p.opacity * 0.3, p.opacity, p.opacity * 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
