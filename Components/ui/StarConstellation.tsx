'use client';

import { useEffect, useRef } from 'react';

// Named constellation templates — relative coords [x, y] in 0..1 space
const CONSTELLATIONS = [
  {
    name: 'Orion',
    stars: [[.50,.08],[.32,.20],[.68,.20],[.42,.36],[.58,.36],[.46,.54],[.54,.54],[.30,.78],[.70,.78],[.22,.90],[.78,.90]],
    links: [[0,1],[0,2],[1,3],[2,4],[3,4],[3,5],[4,6],[5,6],[5,7],[6,8],[7,9],[8,10]],
  },
  {
    name: 'BigDipper',
    stars: [[.08,.50],[.20,.44],[.36,.40],[.52,.36],[.64,.16],[.78,.22],[.84,.48],[.70,.54]],
    links: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,3]],
  },
  {
    name: 'Cassiopeia',
    stars: [[.10,.30],[.28,.62],[.50,.22],[.72,.62],[.90,.30]],
    links: [[0,1],[1,2],[2,3],[3,4]],
  },
  {
    name: 'SouthernCross',
    stars: [[.50,.08],[.50,.92],[.08,.50],[.92,.50],[.78,.20]],
    links: [[0,1],[2,3],[4,1]],
  },
  {
    name: 'Lyra',
    stars: [[.50,.08],[.28,.50],[.38,.82],[.62,.82],[.72,.50]],
    links: [[0,1],[0,4],[1,2],[2,3],[3,4],[1,4]],
  },
  {
    name: 'NorthernCross',
    stars: [[.50,.05],[.50,.50],[.50,.95],[.08,.50],[.92,.50]],
    links: [[0,1],[1,2],[3,4]],
  },
  {
    name: 'Leo',
    stars: [[.50,.18],[.32,.40],[.38,.62],[.60,.52],[.78,.32],[.66,.14],[.20,.80],[.55,.85]],
    links: [[0,5],[5,4],[4,3],[3,2],[2,1],[1,0],[3,1],[2,6],[6,7]],
  },
  {
    name: 'Scorpius',
    stars: [[.50,.08],[.40,.22],[.30,.36],[.34,.52],[.40,.64],[.50,.70],[.60,.76],[.65,.86],[.55,.94]],
    links: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8]],
  },
  {
    name: 'Aries',
    stars: [[.50,.16],[.32,.50],[.50,.72],[.68,.50]],
    links: [[0,1],[1,2],[2,3],[3,0]],
  },
  {
    name: 'Aquila',
    stars: [[.50,.08],[.36,.30],[.50,.50],[.64,.30],[.30,.62],[.70,.62],[.40,.80],[.60,.80]],
    links: [[0,1],[0,3],[1,2],[3,2],[2,4],[2,5],[4,6],[5,7],[6,7]],
  },
];

interface PlacedStar { x: number; y: number; twinkleOffset: number; }
interface Segment { x1: number; y1: number; x2: number; y2: number; }

// A "shooter" traces one edge segment of a constellation
interface Shooter {
  segments: Segment[];   // all edges for this constellation
  segIdx: number;        // which edge we're currently tracing
  progress: number;      // 0..1 along the current edge
  speed: number;         // progress units per frame
  tail: { x: number; y: number; alpha: number }[]; // recent positions
  done: boolean;
  pauseFrames: number;   // cool-down before restarting
}

export function StarConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const c = canvas!;
    const x = ctx!;
    let raf: number;
    let t = 0;

    function resize() {
      const parent = c.parentElement;
      c.width  = parent ? parent.clientWidth  : window.innerWidth;
      c.height = parent ? parent.clientHeight : window.innerHeight;
    }
    resize();
    const resizeObs = new ResizeObserver(resize);
    if (c.parentElement) resizeObs.observe(c.parentElement);
    window.addEventListener('resize', resize);

    /* ── Background stars — proportional coords (0-1) so they survive
         canvas resizes without re-clustering in a corner.
         Count scales with viewport area so small screens aren't cluttered. ── */
    // ~1 star per 6 500 px²; min 60, max 200
    const starCount = Math.max(60, Math.min(200, Math.floor(c.width * c.height / 6500)));
    const bgStars = Array.from({ length: starCount }, () => ({
      px: Math.random(), // 0-1 fraction of canvas width
      py: Math.random(), // 0-1 fraction of canvas height
      r:  0.3 + Math.random() * 0.9,
      base:  0.15 + Math.random() * 0.30,
      speed: 0.2  + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
    }));

    /* ── Pick constellations — fewer on smaller screens to avoid crowding ──
       Using fixed pixel sizes (based on the shorter canvas dimension)
       prevents constellations from appearing stretched on wide or tall
       viewports.  Zone CENTRES are normalised; the constellation template
       coords are then mapped into a CON_SIZE × CON_SIZE pixel square. */
    const shuffled = [...CONSTELLATIONS].sort(() => Math.random() - 0.5);
    // Wide screens: 5-6 constellations; medium: 3-4; small: 2-3
    const maxCons = c.width >= 1400 ? 5 + Math.floor(Math.random() * 2)
                  : c.width >= 1024 ? 3 + Math.floor(Math.random() * 2)
                  : 2 + Math.floor(Math.random() * 2);
    const chosen   = shuffled.slice(0, maxCons);

    // Square size: slightly smaller on compact screens to avoid crowding
    const sizePct  = c.width < 1100 ? 0.20 : 0.24;
    const CON_SIZE = Math.min(Math.min(c.width, c.height) * sizePct, 200);

    // Zone centres in 0-1 normalised space (cx, cy)
    const ZONE_CENTRES: [number, number][] = [
      [0.18, 0.24],
      [0.82, 0.24],
      [0.18, 0.76],
      [0.82, 0.76],
      [0.50, 0.14],
      [0.50, 0.84],
      [0.84, 0.50],
    ].sort(() => Math.random() - 0.5) as [number, number][];

    const placed = chosen.map((con, i) => {
      const [cx, cy] = ZONE_CENTRES[i % ZONE_CENTRES.length];
      const placedStars: PlacedStar[] = con.stars.map(([sx, sy]) => ({
        // Each template star mapped into the square region around the zone centre
        x: cx * c.width  + (sx - 0.5) * CON_SIZE,
        y: cy * c.height + (sy - 0.5) * CON_SIZE,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
      return { ...con, placedStars };
    });

    /* ── Build shooters — one per constellation, staggered start ──────── */
    const shooters: Shooter[] = placed.map((con, i) => {
      const segs: Segment[] = con.links.map(([a, b]) => ({
        x1: con.placedStars[a]?.x ?? 0,
        y1: con.placedStars[a]?.y ?? 0,
        x2: con.placedStars[b]?.x ?? 0,
        y2: con.placedStars[b]?.y ?? 0,
      }));
      return {
        segments: segs,
        segIdx: 0,
        progress: 0,
        // Halved speed vs original — more elegant, less frenetic
        speed: 0.006 + Math.random() * 0.005,
        tail: [],
        done: false,
        pauseFrames: i * 110,
      };
    });

    /* ── Reduced motion: single static frame, no rAF loop ───────────── */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      x.clearRect(0, 0, c.width, c.height);
      bgStars.forEach(s => {
        x.beginPath();
        x.arc(s.px * c.width, s.py * c.height, s.r, 0, Math.PI * 2);
        x.fillStyle = `rgba(210,215,255,${s.base})`;
        x.fill();
      });
      placed.forEach(con => {
        x.strokeStyle = 'rgba(180,160,255,0.09)';
        x.lineWidth = 0.6;
        con.links.forEach(([a, b]) => {
          if (!con.placedStars[a] || !con.placedStars[b]) return;
          x.beginPath();
          x.moveTo(con.placedStars[a].x, con.placedStars[a].y);
          x.lineTo(con.placedStars[b].x, con.placedStars[b].y);
          x.stroke();
        });
        con.placedStars.forEach(s => {
          x.beginPath();
          x.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
          x.fillStyle = 'rgba(230,225,255,0.5)';
          x.fill();
        });
      });
      return () => { resizeObs.disconnect(); window.removeEventListener('resize', resize); };
    }

    /* ── Draw loop ────────────────────────────────────────────────────── */
    function draw() {
      raf = requestAnimationFrame(draw);
      t += 0.006;
      x.clearRect(0, 0, c.width, c.height);

      /* Background field stars — proportional coords scaled to current canvas size */
      bgStars.forEach(s => {
        const a = Math.max(0, s.base + 0.10 * Math.sin(t * s.speed + s.phase));
        x.beginPath();
        x.arc(s.px * c.width, s.py * c.height, s.r, 0, Math.PI * 2);
        x.fillStyle = `rgba(210,215,255,${a})`;
        x.fill();
      });

      placed.forEach((con, ci) => {
        const shooter = shooters[ci];

        /* Constellation connecting lines — barely perceptible */
        x.strokeStyle = 'rgba(180,160,255,0.09)';
        x.lineWidth   = 0.6;
        con.links.forEach(([a, b]) => {
          if (!con.placedStars[a] || !con.placedStars[b]) return;
          x.beginPath();
          x.moveTo(con.placedStars[a].x, con.placedStars[a].y);
          x.lineTo(con.placedStars[b].x, con.placedStars[b].y);
          x.stroke();
        });

        /* Constellation stars — slightly brighter than background, soft glow */
        con.placedStars.forEach(s => {
          const tw = 0.35 + 0.15 * Math.sin(t * 1.2 + s.twinkleOffset);
          // soft whisper glow — only 5px radius, very low alpha
          const grd = x.createRadialGradient(s.x, s.y, 0, s.x, s.y, 5);
          grd.addColorStop(0, `rgba(200,185,255,${tw * 0.55})`);
          grd.addColorStop(1, 'rgba(200,185,255,0)');
          x.beginPath();
          x.arc(s.x, s.y, 5, 0, Math.PI * 2);
          x.fillStyle = grd;
          x.fill();
          // core dot — 1.2px, not huge
          x.beginPath();
          x.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
          x.fillStyle = `rgba(230,225,255,${tw + 0.15})`;
          x.fill();
        });

        /* ── Tracer — whisper-thin, very low opacity ───────────────────── */
        if (shooter.pauseFrames > 0) { shooter.pauseFrames--; return; }
        if (shooter.done) {
          shooter.pauseFrames = 300 + Math.floor(Math.random() * 400);
          shooter.segIdx   = 0;
          shooter.progress = 0;
          shooter.tail     = [];
          shooter.done     = false;
          return;
        }

        const seg = shooter.segments[shooter.segIdx];
        if (!seg) { shooter.done = true; return; }

        const tipX = seg.x1 + (seg.x2 - seg.x1) * shooter.progress;
        const tipY = seg.y1 + (seg.y2 - seg.y1) * shooter.progress;

        shooter.tail.unshift({ x: tipX, y: tipY, alpha: 1.0 });
        if (shooter.tail.length > 16) shooter.tail.pop();

        // Thin fading tail — max opacity 0.35
        for (let ti = 0; ti < shooter.tail.length - 1; ti++) {
          const a = (1 - ti / shooter.tail.length) * 0.35;
          x.beginPath();
          x.moveTo(shooter.tail[ti].x, shooter.tail[ti].y);
          x.lineTo(shooter.tail[ti + 1].x, shooter.tail[ti + 1].y);
          x.strokeStyle = `rgba(210,195,255,${a})`;
          x.lineWidth   = 0.9 * (1 - ti / shooter.tail.length);
          x.stroke();
        }

        // Tiny tip glow — 3px, subtle
        const tipGrd = x.createRadialGradient(tipX, tipY, 0, tipX, tipY, 3);
        tipGrd.addColorStop(0, 'rgba(240,235,255,0.80)');
        tipGrd.addColorStop(1, 'rgba(200,180,255,0)');
        x.beginPath();
        x.arc(tipX, tipY, 3, 0, Math.PI * 2);
        x.fillStyle = tipGrd;
        x.fill();

        shooter.progress += shooter.speed * 0.55; // slow, deliberate trace
        if (shooter.progress >= 1) {
          shooter.progress = 0;
          shooter.segIdx++;
          shooter.tail = [];
          if (shooter.segIdx >= shooter.segments.length) shooter.done = true;
        }
      });
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      resizeObs.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
      style={{ minHeight: '100%' }}
      aria-hidden
    />
  );
}
