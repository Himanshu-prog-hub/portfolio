'use client';

import { useRef, ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';

interface Props {
  children: ReactNode;
  strength?: number;   // how many px to pull toward cursor (default 18)
  radius?: number;     // detection radius in px (default 90)
  className?: string;
}

// Wraps any element with a magnetic pull effect.
// When the cursor enters within `radius` px the element drifts toward it.
export function MagneticButton({ children, strength = 18, radius = 90, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 200, damping: 20, mass: 0.8 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
      const pull = (1 - dist / radius);
      x.set(dx * pull * (strength / radius) * 2.2);
      y.set(dy * pull * (strength / radius) * 2.2);
    }
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
