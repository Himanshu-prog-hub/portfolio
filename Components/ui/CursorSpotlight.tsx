'use client';
import { useEffect, useRef, useState } from 'react';

export function CursorSpotlight() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf: number;
    let mx = 0, my = 0;
    let cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);

    const tick = () => {
      // Smooth follow for glow
      cx += (mx - cx) * 0.09;
      cy += (my - cy) * 0.09;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  return (
    <>
      {/* Large soft glow (lags behind cursor) */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[9990]"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, rgba(6,182,212,0.03) 50%, transparent 70%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
          willChange: 'transform',
        }}
      />
      {/* Tiny precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          background: 'rgba(124,58,237,0.6)',
          boxShadow: '0 0 8px rgba(124,58,237,0.8)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
