'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─── Holographic Cello — line-art silhouette matching guitar coordinate scale ──
// Body: cello proportions (small upper bout, deep waist, large lower bout)
// Top ornament: simplified scroll instead of headstock
// Sound holes: F-holes (top+bottom serifs + vertical stem) instead of round hole
// 4 strings; same cyan/purple holographic palette as the guitar
export function HolographicCello() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth;
    const H = el.clientHeight;

    // ── Renderer ─────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(64, W / H, 0.1, 100);

    // ── Materials ─────────────────────────────────────────────────────────
    const mkLine = (hex: number, alpha: number) =>
      new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: alpha });

    // Golden hologram palette — amber/warm gold on dark, deep amber on light
    const isDark = document.documentElement.classList.contains('dark');
    const cyanBright  = isDark ? mkLine(0xf59e0b, 0.92) : mkLine(0xb45309, 0.88);
    const cyanMid     = isDark ? mkLine(0xd97706, 0.52) : mkLine(0x92400e, 0.52);
    const cyanFaint   = isDark ? mkLine(0xb45309, 0.26) : mkLine(0x78350f, 0.30);
    const purple      = isDark ? mkLine(0xfbbf24, 0.48) : mkLine(0xd97706, 0.52);
    const purpleFaint = isDark ? mkLine(0xf59e0b, 0.20) : mkLine(0xb45309, 0.24);

    // ── Helpers ───────────────────────────────────────────────────────────
    function lineSegment(pts: THREE.Vector3[], mat: THREE.LineBasicMaterial) {
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      return new THREE.Line(geo, mat);
    }
    function lineLoop(pts2d: THREE.Vector2[], z: number, mat: THREE.LineBasicMaterial) {
      const pts3d = [...pts2d, pts2d[0]].map(p => new THREE.Vector3(p.x, p.y, z));
      const geo = new THREE.BufferGeometry().setFromPoints(pts3d);
      return new THREE.Line(geo, mat);
    }

    // ── Cello group ───────────────────────────────────────────────────────
    const cello = new THREE.Group();

    // ─ Body — cello proportions ───────────────────────────────────────────
    // Compared to guitar:
    //   • Upper bout noticeably narrower (0.78 vs 0.96)
    //   • Waist deeply pinched (0.40 vs 0.56)
    //   • Lower bout same width (1.08) but longer body overall
    const bodyShape = new THREE.Shape();
    bodyShape.moveTo(0, 0.85);
    // Upper bout RIGHT
    bodyShape.bezierCurveTo( 0.38, 0.85,  0.78, 0.62,  0.78, 0.28);
    bodyShape.bezierCurveTo( 0.78, 0.04,  0.56,-0.05,  0.48,-0.14);
    // Waist RIGHT — deeply pinched
    bodyShape.bezierCurveTo( 0.36,-0.26,  0.34,-0.40,  0.42,-0.54);
    // Lower bout RIGHT — largest part
    bodyShape.bezierCurveTo( 0.55,-0.75,  1.08,-1.02,  1.08,-1.40);
    bodyShape.bezierCurveTo( 1.08,-1.76,  0.72,-2.00,  0.00,-2.00);
    // Lower bout LEFT
    bodyShape.bezierCurveTo(-0.72,-2.00, -1.08,-1.76, -1.08,-1.40);
    bodyShape.bezierCurveTo(-1.08,-1.02, -0.55,-0.75, -0.42,-0.54);
    // Waist LEFT
    bodyShape.bezierCurveTo(-0.34,-0.40, -0.36,-0.26, -0.48,-0.14);
    // Upper bout LEFT
    bodyShape.bezierCurveTo(-0.56,-0.05, -0.78, 0.04, -0.78, 0.28);
    bodyShape.bezierCurveTo(-0.78, 0.62, -0.38, 0.85,  0.00, 0.85);

    const bodyPts = bodyShape.getPoints(100);

    // Front face (z=+0.09)
    cello.add(lineLoop(bodyPts,  0.09, cyanBright));
    cello.add(lineLoop(bodyPts,  0.09, purple));
    // Back face (z=-0.09)
    cello.add(lineLoop(bodyPts, -0.09, cyanFaint));
    cello.add(lineLoop(bodyPts, -0.09, purpleFaint));

    // Edge struts — front→back depth connectors
    [0, 10, 22, 34, 48, 62, 76, 88, 100].forEach(i => {
      const p = bodyPts[Math.min(i, bodyPts.length - 1)];
      cello.add(lineSegment([
        new THREE.Vector3(p.x, p.y,  0.09),
        new THREE.Vector3(p.x, p.y, -0.09),
      ], cyanFaint));
    });

    // ─ F-holes (top serif + stem + middle notch + bottom serif) ──────────
    // One on each side — the iconic feature that separates cello from guitar
    ([-1, 1] as const).forEach(side => {
      const fx   = side * 0.43;          // horizontal centre of this F-hole
      const topY = -0.05, botY = -0.82;
      const midY = topY + (botY - topY) * 0.44; // slightly above mid

      // Top serif
      cello.add(lineSegment([
        new THREE.Vector3(fx - side * 0.07, topY, 0.10),
        new THREE.Vector3(fx + side * 0.05, topY, 0.10),
      ], cyanBright));
      // Vertical stem
      cello.add(lineSegment([
        new THREE.Vector3(fx, topY, 0.10),
        new THREE.Vector3(fx + side * 0.02, botY, 0.10),
      ], cyanMid));
      // Middle notch
      cello.add(lineSegment([
        new THREE.Vector3(fx - side * 0.06, midY, 0.10),
        new THREE.Vector3(fx + side * 0.04, midY, 0.10),
      ], cyanFaint));
      // Bottom serif
      cello.add(lineSegment([
        new THREE.Vector3(fx - side * 0.07, botY, 0.10),
        new THREE.Vector3(fx + side * 0.05, botY, 0.10),
      ], cyanBright));
    });

    // ─ Bridge — prominent cello bridge with feet ──────────────────────────
    cello.add(lineSegment([
      new THREE.Vector3(-0.42, -0.68, 0.10),
      new THREE.Vector3( 0.42, -0.68, 0.10),
    ], cyanBright));
    // Feet
    ([-0.26, 0.26] as const).forEach(bx => {
      cello.add(lineSegment([
        new THREE.Vector3(bx, -0.68, 0.10),
        new THREE.Vector3(bx, -0.88, 0.10),
      ], cyanMid));
    });
    // Waist arch (decorative cut-out in bridge)
    cello.add(lineSegment([
      new THREE.Vector3(-0.11, -0.68, 0.10),
      new THREE.Vector3( 0.11, -0.68, 0.10),
    ], cyanFaint));

    // ─ Tailpiece ──────────────────────────────────────────────────────────
    cello.add(lineSegment([
      new THREE.Vector3(-0.16, -1.66, 0.10),
      new THREE.Vector3(-0.07, -1.86, 0.10),
      new THREE.Vector3( 0.07, -1.86, 0.10),
      new THREE.Vector3( 0.16, -1.66, 0.10),
      new THREE.Vector3(-0.16, -1.66, 0.10),
    ], cyanMid));
    // Fine-tuners row
    cello.add(lineSegment([
      new THREE.Vector3(-0.12, -1.72, 0.10),
      new THREE.Vector3( 0.12, -1.72, 0.10),
    ], cyanFaint));

    // ─ Endpin ─────────────────────────────────────────────────────────────
    cello.add(lineSegment([
      new THREE.Vector3(0, -2.00, 0.10),
      new THREE.Vector3(0, -2.18, 0.10),
    ], cyanBright));

    // ─ Neck — tapered, narrower than guitar ──────────────────────────────
    const neckW = 0.11;
    // Left rail
    cello.add(lineSegment([
      new THREE.Vector3(-neckW,        0.85, 0),
      new THREE.Vector3(-neckW * 0.85, 3.55, 0),
    ], cyanBright));
    // Right rail
    cello.add(lineSegment([
      new THREE.Vector3( neckW,        0.85, 0),
      new THREE.Vector3( neckW * 0.85, 3.55, 0),
    ], cyanBright));
    // Centerline (fretboard guideline)
    cello.add(lineSegment([
      new THREE.Vector3(0, 0.85, 0),
      new THREE.Vector3(0, 3.55, 0),
    ], cyanFaint));

    // ─ Nut ────────────────────────────────────────────────────────────────
    cello.add(lineSegment([
      new THREE.Vector3(-neckW * 0.85, 3.55, 0),
      new THREE.Vector3( neckW * 0.85, 3.55, 0),
    ], cyanBright));

    // ─ Position markers (simplified — 4 thumb positions) ─────────────────
    const markerColor = isDark ? 0xd97706 : 0x92400e;
    [1.22, 1.58, 1.90, 2.22, 2.52, 2.80, 3.08, 3.30, 3.45].forEach(fy => {
      const t2 = (fy - 0.85) / (3.55 - 0.85);
      const w  = neckW * (1 - t2 * 0.15);
      cello.add(lineSegment([
        new THREE.Vector3(-w, fy, 0.01),
        new THREE.Vector3( w, fy, 0.01),
      ], mkLine(markerColor, 0.28)));
    });

    // ─ Pegbox + scroll ────────────────────────────────────────────────────
    // Pegbox sides (short extensions above neck)
    cello.add(lineSegment([
      new THREE.Vector3(-neckW * 0.85, 3.55, 0),
      new THREE.Vector3(-neckW * 0.85, 3.76, 0),
    ], cyanMid));
    cello.add(lineSegment([
      new THREE.Vector3( neckW * 0.85, 3.55, 0),
      new THREE.Vector3( neckW * 0.85, 3.76, 0),
    ], cyanMid));

    // Tuning pegs (2 per side)
    [3.62, 3.74].forEach(py => {
      ([-0.20, 0.20] as const).forEach(px => {
        const pegGeo = new THREE.CircleGeometry(0.038, 7);
        const peg    = new THREE.LineSegments(new THREE.WireframeGeometry(pegGeo), cyanMid);
        peg.position.set(px, py, 0);
        cello.add(peg);
      });
    });

    // Scroll — tight decreasing spiral above pegbox
    const scrollCX = 0, scrollCY = 3.90;
    const scrollPts: THREE.Vector3[] = [];
    for (let a = 0; a <= Math.PI * 2.1; a += 0.09) {
      const r = 0.16 * (1 - a / (Math.PI * 2.4));
      if (r <= 0.01) break;
      scrollPts.push(new THREE.Vector3(
        scrollCX + r * Math.cos(Math.PI * 0.5 + a),
        scrollCY + r * Math.sin(Math.PI * 0.5 + a),
        0,
      ));
    }
    if (scrollPts.length > 1) cello.add(lineSegment(scrollPts, cyanBright));

    // ─ 4 Strings ──────────────────────────────────────────────────────────
    const stringColor = isDark ? 0xfbbf24 : 0xd97706;
    const stringXs4 = [-0.08, -0.027, 0.027, 0.08];
    stringXs4.forEach((sx, i) => {
      cello.add(lineSegment([
        new THREE.Vector3(sx * 0.9, -0.87, 0.10),
        new THREE.Vector3(sx * 0.9,  3.55, 0.01),
      ], mkLine(stringColor, 0.22 + i * 0.09)));
    });

    // ─ Position & lean ────────────────────────────────────────────────────
    // Shift down so scroll + body both fit the camera frustum, centred near y=0.15.
    // rotation.z = +0.22 → counter-clockwise lean: neck upper-LEFT (toward content),
    // body lower-RIGHT (toward edge) — mirror image of the guitar on the right side.
    cello.position.y = -0.70;
    cello.rotation.z = +0.22;
    scene.add(cello);

    // Auto-fit camera — same logic as guitar so the cello stays the same
    // apparent size regardless of how tall the container is.
    const fitCameraToCello = () => {
      const box    = new THREE.Box3().setFromObject(cello);
      const size   = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
      const paddedH  = size.y + 2.6;
      const paddedW  = size.x + 1.3;
      const distH    = paddedH / (2 * Math.tan(halfFovY));
      const distW    = paddedW / (2 * camera.aspect * Math.tan(halfFovY));
      const dist     = Math.max(distH, distW) + 0.18;
      camera.position.set(center.x, center.y, center.z + dist);
      camera.lookAt(center.x, center.y, center.z);
      camera.updateProjectionMatrix();
    };
    fitCameraToCello();

    // ── Drag-to-rotate (same as guitar) ───────────────────────────────────
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
      velX = (cx - prevX) * 0.011; velY = (cy - prevY) * 0.008;
      cello.rotation.y += velX;
      cello.rotation.x  = Math.max(-0.6, Math.min(0.6, cello.rotation.x + velY));
      prevX = cx; prevY = cy;
    }
    function onUp() { isDragging = false; }

    renderer.domElement.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    renderer.domElement.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    // ── Animation loop ─────────────────────────────────────────────────────
    let raf: number, t = 0;
    function animate() {
      raf = requestAnimationFrame(animate);
      t += 0.007;
      if (!isDragging) {
        velX *= 0.88; velY *= 0.92;
        // Same hologram rotation speed as guitar (~30 s per revolution)
        // rotation.z (+0.22) is set once above and never touched here.
        cello.rotation.y = t * 0.5 + velX;
        cello.rotation.x = Math.sin(t * 0.22) * 0.05 + velY;
        cello.position.y = -0.70 + Math.sin(t * 0.65) * 0.08;
      }
      // Subtle string/faint-line pulse
      const pulse = 0.5 + 0.3 * Math.sin(t * 2.0);
      cello.children.forEach(child => {
        if (child instanceof THREE.Line) {
          const mat = child.material as THREE.LineBasicMaterial;
          if (mat.opacity < 0.30) mat.opacity = pulse * 0.32;
        }
      });
      renderer.render(scene, camera);
    }
    animate();

    // ── Resize ─────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      fitCameraToCello();
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
