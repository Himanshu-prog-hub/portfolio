'use client';

import { useRef, ReactNode } from 'react';
import { motion, useSpring } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
  maxTilt?: number;    // max degrees to tilt (default 8)
  glare?: boolean;     // show moving glare highlight (default true)
}

// 3-D perspective tilt card. Wraps any content.
// Mouse position within the card drives rotateX / rotateY via springs.
export function TiltCard({ children, className = '', maxTilt = 8, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const cfg = { stiffness: 260, damping: 28 };
  const rotX  = useSpring(0, cfg);
  const rotY  = useSpring(0, cfg);
  const glareX = useSpring(50, cfg);
  const glareY = useSpring(50, cfg);
  const scale  = useSpring(1, { stiffness: 300, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0→1
    const py = (e.clientY - rect.top)  / rect.height;  // 0→1

    rotY.set((px - 0.5) * maxTilt * 2);
    rotX.set(-(py - 0.5) * maxTilt * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
    scale.set(1.015);
  }

  function onMouseLeave() {
    rotX.set(0);
    rotY.set(0);
    glareX.set(50);
    glareY.set(50);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        scale,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className={`relative ${className}`}
    >
      {children}

      {/* Moving glare highlight */}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-20"
          style={{
            background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.07) 0%, transparent 65%)`,
          }}
        />
      )}
    </motion.div>
  );
}
