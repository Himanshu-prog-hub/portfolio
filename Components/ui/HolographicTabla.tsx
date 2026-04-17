'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─── Holographic Tabla Set — 3/4 top-down view, amber-gold palette ───────────
// Bayan (large left drum) + Dayan (small right drum), viewed from above-front

export function HolographicTabla() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    // 3/4 view from above-front so tops of drums are clearly visible
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 2.8, 6.5);
    camera.lookAt(0, 0.4, 0);

    // ── Materials ─────────────────────────────────────────────────────────
    const mkL = (hex: number, a: number) =>
      new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: a });

    const gold      = mkL(0xffb300, 0.90);
    const goldMid   = mkL(0xffa000, 0.60);
    const goldFaint = mkL(0xffe082, 0.30);
    const rose      = mkL(0xf06292, 0.60);   // bright rose for syahi
    const roseFaint = mkL(0xe91e63, 0.30);

    function lineLoop3(pts: THREE.Vector3[], mat: THREE.LineBasicMaterial) {
      const closed = [...pts, pts[0]];
      return new THREE.Line(new THREE.BufferGeometry().setFromPoints(closed), mat);
    }
    function line3(pts: THREE.Vector3[], mat: THREE.LineBasicMaterial) {
      return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
    }

    // ── Helper: ellipse ring at given y, tilted for 3d top ───────────────
    function ellipseRing(rx: number, rz: number, y: number, segs: number, mat: THREE.LineBasicMaterial) {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * rx, y, Math.sin(a) * rz));
      }
      return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
    }

    // ── Helper: drum builder ──────────────────────────────────────────────
    function buildDrum(
      topRx: number, topRz: number, // top ellipse radii (X, Z)
      botRx: number, botRz: number, // bottom ellipse radii
      height: number,               // drum height
      syahiR: number,               // syahi (black marking) radius
      x: number,                    // position offset
    ) {
      const g = new THREE.Group();
      g.position.x = x;

      const topY = height / 2;
      const botY = -height / 2;

      // ── Top membrane ellipse ─────
      g.add(ellipseRing(topRx, topRz, topY, 48, gold));
      g.add(ellipseRing(topRx * 0.98, topRz * 0.98, topY + 0.01, 48, goldMid)); // double ring

      // ── Syahi (center dark marking on membrane) ──
      g.add(ellipseRing(syahiR, syahiR * (topRz / topRx), topY + 0.015, 32, rose));
      g.add(ellipseRing(syahiR * 0.55, syahiR * 0.55 * (topRz / topRx), topY + 0.015, 24, rose));
      // Syahi cross-hatch fill
      for (let i = -2; i <= 2; i++) {
        const s = syahiR * 0.4;
        const tz = topRz / topRx;
        g.add(line3([
          new THREE.Vector3(i * s * 0.5, topY + 0.02, -s * tz),
          new THREE.Vector3(i * s * 0.5, topY + 0.02,  s * tz),
        ], roseFaint));
        g.add(line3([
          new THREE.Vector3(-s, topY + 0.02, i * s * 0.4 * tz),
          new THREE.Vector3( s, topY + 0.02, i * s * 0.4 * tz),
        ], roseFaint));
      }

      // ── Body cross-section rings ─────
      const ringCount = 5;
      for (let r = 0; r <= ringCount; r++) {
        const t  = r / ringCount;
        const ry = botY + t * height;
        const rx = botRx + (topRx - botRx) * t;
        const rz = botRz + (topRz - botRz) * t;
        const mat = r === 0 || r === ringCount ? goldMid : goldFaint;
        g.add(ellipseRing(rx, rz, ry, 32, mat));
      }

      // ── Vertical struts (tuning rope simulation) ─────
      const numRopes = 14;
      for (let i = 0; i < numRopes; i++) {
        const a = (i / numRopes) * Math.PI * 2;
        const tpx = Math.cos(a) * topRx * 1.04;
        const tpz = Math.sin(a) * topRz * 1.04;
        const bpx = Math.cos(a) * botRx * 1.06;
        const bpz = Math.sin(a) * botRz * 1.06;
        g.add(line3([
          new THREE.Vector3(tpx, topY,  tpz),
          new THREE.Vector3(bpx, botY,  bpz),
        ], mkL(0xffb300, 0.16 + (i % 2) * 0.06)));
      }

      // ── Rim ring at top ─────
      g.add(ellipseRing(topRx * 1.06, topRz * 1.06, topY, 48, goldMid));

      // ── Bottom plate ─────
      g.add(ellipseRing(botRx, botRz, botY, 24, goldFaint));

      return g;
    }

    const tabla = new THREE.Group();

    // Bayan — bigger drum, slightly to the left, tipped forward
    const bayan = buildDrum(0.78, 0.70, 0.85, 0.78, 1.30, 0.30, -1.02);
    bayan.rotation.z =  0.04;
    bayan.rotation.x = -0.06;
    tabla.add(bayan);

    // Dayan — smaller drum, to the right, slightly elevated
    const dayan = buildDrum(0.56, 0.50, 0.60, 0.56, 1.05, 0.22, 0.88);
    dayan.rotation.z = -0.04;
    dayan.rotation.x = -0.05;
    dayan.position.y =  0.12;  // slightly raised
    tabla.add(dayan);

    // Connecting wooden block (hammered tuning)
    const blockPts = [
      new THREE.Vector3(-0.18, -0.55, -0.05),
      new THREE.Vector3( 0.18, -0.55, -0.05),
      new THREE.Vector3( 0.18, -0.55,  0.05),
      new THREE.Vector3(-0.18, -0.55,  0.05),
    ];
    tabla.add(lineLoop3(blockPts, goldMid));
    tabla.add(line3([
      new THREE.Vector3(-0.18, -0.55,  0), new THREE.Vector3(-0.18, -0.70,  0),
    ], goldFaint));
    tabla.add(line3([
      new THREE.Vector3( 0.18, -0.55,  0), new THREE.Vector3( 0.18, -0.70,  0),
    ], goldFaint));

    // Ground shadow rings beneath each drum
    [[- 1.02, 0.68, 0.60], [0.88, 0.50, 0.45]].forEach(([_dx, rx, rz]) => {
      tabla.add(ellipseRing(rx, rz, -0.68, 24, mkL(0xffb300, 0.10)));
    });

    tabla.position.y = -0.6;
    scene.add(tabla);

    // ── Drag to rotate ─────────────────────────────────────────────────────
    let isDragging = false, prevX = 0, prevY = 0, velX = 0, velY = 0;

    function onDown(e: MouseEvent | TouchEvent) {
      isDragging = true;
      prevX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      prevY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      velX = velY = 0;
    }
    function onMove(e: MouseEvent | TouchEvent) {
      if (!isDragging) return;
      const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const cy = 'touches' in e ? e.touches[0].clientY : e.clientY;
      velX = (cx - prevX) * 0.012;
      velY = (cy - prevY) * 0.006;
      tabla.rotation.y += velX;
      tabla.rotation.x = Math.max(-0.5, Math.min(0.5, tabla.rotation.x + velY));
      prevX = cx; prevY = cy;
    }
    function onUp() { isDragging = false; }

    renderer.domElement.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    renderer.domElement.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    // ── Animation loop ──────────────────────────────────────────────────────
    let raf: number, t = 0;
    function animate() {
      raf = requestAnimationFrame(animate);
      t += 0.008;
      if (!isDragging) {
        velX *= 0.92; velY *= 0.92;
        tabla.rotation.y += velX + 0.0025;
        tabla.rotation.x += velY;
        tabla.position.y = -0.6 + Math.sin(t * 0.6) * 0.10;
      }
      // Pulse syahi rose lines
      const pulse = 0.45 + 0.30 * Math.sin(t * 2.5);
      tabla.children.forEach(drum => {
        if (!(drum instanceof THREE.Group)) return;
        drum.children.forEach(child => {
          if (child instanceof THREE.Line) {
            const mat = child.material as THREE.LineBasicMaterial;
            if (mat.color.getHex() === 0xf06292) mat.opacity = pulse * 0.65;
          }
        });
      });
      renderer.render(scene, camera);
    }
    animate();

    // ── Resize ──────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }} />
  );
}
