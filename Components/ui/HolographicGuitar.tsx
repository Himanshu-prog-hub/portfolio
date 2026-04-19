'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ─── Holographic Acoustic Guitar — proper figure-8 silhouette ────────────────
// Body traced with bezier curves (THREE.Shape), neck + headstock + strings
export function HolographicGuitar() {
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
    // FOV 64° gives a wider horizontal frustum for narrow containers
    // (guitar fits even at clamp-minimum ~150 px wide).
    // z=7.5 keeps the full neck + body in the vertical frame.
    // lookAt(0, 0.3) centres the instrument visually.
    const camera = new THREE.PerspectiveCamera(54, W / H, 0.1, 100);

    // ── Materials ─────────────────────────────────────────────────────────
    const mkLine = (hex: number, alpha: number) =>
      new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: alpha });

    // Golden hologram palette — amber/warm gold on dark, deep amber on light
    const isDark = document.documentElement.classList.contains('dark');
    const cyanBright  = isDark ? mkLine(0xf59e0b, 0.95) : mkLine(0xb45309, 0.90);
    const cyanMid     = isDark ? mkLine(0xd97706, 0.55) : mkLine(0x92400e, 0.55);
    const cyanFaint   = isDark ? mkLine(0xb45309, 0.28) : mkLine(0x78350f, 0.32);
    const purple      = isDark ? mkLine(0xfbbf24, 0.50) : mkLine(0xd97706, 0.55);
    const purpleFaint = isDark ? mkLine(0xf59e0b, 0.22) : mkLine(0xb45309, 0.26);

    // ── Helper: closed line loop from 2D points (at z offset) ─────────────
    function lineLoop(pts2d: THREE.Vector2[], z: number, mat: THREE.LineBasicMaterial) {
      const pts3d = [...pts2d, pts2d[0]].map(p => new THREE.Vector3(p.x, p.y, z));
      const geo = new THREE.BufferGeometry().setFromPoints(pts3d);
      return new THREE.Line(geo, mat);
    }

    function lineSegment(pts: THREE.Vector3[], mat: THREE.LineBasicMaterial) {
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      return new THREE.Line(geo, mat);
    }

    // ── Guitar group ──────────────────────────────────────────────────────
    const guitar = new THREE.Group();

    /* ── Body — figure-8 shape via bezier curve ─── */
    const bodyShape = new THREE.Shape();
    // Starting at top-center of body, going clockwise
    bodyShape.moveTo(0, 1.05);
    // Upper bout right
    bodyShape.bezierCurveTo( 0.50, 1.05,  0.96, 0.80,  0.96, 0.40);
    bodyShape.bezierCurveTo( 0.96, 0.10,  0.68,-0.02,  0.62,-0.08);
    // Waist right
    bodyShape.bezierCurveTo( 0.56,-0.14,  0.56,-0.22,  0.60,-0.30);
    // Lower bout right
    bodyShape.bezierCurveTo( 0.68,-0.48,  1.10,-0.72,  1.10,-1.10);
    bodyShape.bezierCurveTo( 1.10,-1.52,  0.72,-1.90,  0.00,-1.90);
    // Lower bout left
    bodyShape.bezierCurveTo(-0.72,-1.90, -1.10,-1.52, -1.10,-1.10);
    bodyShape.bezierCurveTo(-1.10,-0.72, -0.68,-0.48, -0.60,-0.30);
    // Waist left
    bodyShape.bezierCurveTo(-0.56,-0.22, -0.56,-0.14, -0.62,-0.08);
    // Upper bout left
    bodyShape.bezierCurveTo(-0.68,-0.02, -0.96, 0.10, -0.96, 0.40);
    bodyShape.bezierCurveTo(-0.96, 0.80, -0.50, 1.05,  0.00, 1.05);

    const bodyPts = bodyShape.getPoints(100);

    // Front outline (z=0.08)
    guitar.add(lineLoop(bodyPts, 0.08, cyanBright));
    guitar.add(lineLoop(bodyPts, 0.08, purple));

    // Back outline (z=-0.08)
    guitar.add(lineLoop(bodyPts, -0.08, cyanFaint));
    guitar.add(lineLoop(bodyPts, -0.08, purpleFaint));

    // Edge connectors — evenly spaced vertical struts front→back
    const struts = [0, 8, 16, 24, 32, 40, 50, 60, 70, 80, 90, 100].map(i =>
      Math.min(i, bodyPts.length - 1)
    );
    struts.forEach(idx => {
      const p = bodyPts[idx];
      guitar.add(lineSegment([
        new THREE.Vector3(p.x, p.y,  0.08),
        new THREE.Vector3(p.x, p.y, -0.08),
      ], cyanFaint));
    });

    /* ── Sound hole ─── */
    const holeGeo  = new THREE.TorusGeometry(0.24, 0.018, 8, 48);
    const holeMesh = new THREE.LineSegments(new THREE.WireframeGeometry(holeGeo), mkLine(isDark ? 0xf59e0b : 0xb45309, 0.70));
    holeMesh.position.set(0, -0.35, 0.09);
    guitar.add(holeMesh);
    // inner ring
    const holeInner = new THREE.TorusGeometry(0.14, 0.010, 6, 32);
    const holeInnerMesh = new THREE.LineSegments(new THREE.WireframeGeometry(holeInner), mkLine(isDark ? 0xd97706 : 0x92400e, 0.40));
    holeInnerMesh.position.set(0, -0.35, 0.09);
    guitar.add(holeInnerMesh);

    /* ── Bridge ─── */
    guitar.add(lineSegment([
      new THREE.Vector3(-0.42, -1.10, 0.09),
      new THREE.Vector3( 0.42, -1.10, 0.09),
    ], cyanBright));
    // bridge saddle
    guitar.add(lineSegment([
      new THREE.Vector3(-0.38, -1.06, 0.09),
      new THREE.Vector3( 0.38, -1.06, 0.09),
    ], cyanMid));

    /* ── Neck — tapered slightly ─── */
    const neckW  = 0.16;
    const neckPts: THREE.Vector3[] = [];
    // left rail
    neckPts.push(new THREE.Vector3(-neckW, 1.05, 0));
    neckPts.push(new THREE.Vector3(-neckW * 0.85, 3.80, 0));
    guitar.add(lineSegment([...neckPts], cyanBright));
    // right rail
    guitar.add(lineSegment([
      new THREE.Vector3( neckW, 1.05, 0),
      new THREE.Vector3( neckW * 0.85, 3.80, 0),
    ], cyanBright));
    // center line (fretboard centerline faint)
    guitar.add(lineSegment([
      new THREE.Vector3(0, 1.05, 0),
      new THREE.Vector3(0, 3.80, 0),
    ], cyanFaint));

    /* ── Nut (top of neck) ─── */
    guitar.add(lineSegment([
      new THREE.Vector3(-neckW * 0.85, 3.80, 0),
      new THREE.Vector3( neckW * 0.85, 3.80, 0),
    ], cyanBright));

    /* ── Frets (12 frets, spaced by equal temperament approximation) ─── */
    const fretColor = isDark ? 0xd97706 : 0x92400e;
    const fretYs = [1.28, 1.52, 1.74, 1.94, 2.12, 2.28, 2.44, 2.58, 2.71, 2.82, 2.94, 3.04, 3.20, 3.40, 3.60, 3.80];
    fretYs.forEach(fy => {
      const t = (fy - 1.05) / (3.80 - 1.05);
      const w = neckW * (1 - t * 0.15);
      guitar.add(lineSegment([
        new THREE.Vector3(-w, fy, 0.01),
        new THREE.Vector3( w, fy, 0.01),
      ], mkLine(fretColor, 0.32)));
    });

    /* ── Strings (6) ─── */
    const stringColor = isDark ? 0xfbbf24 : 0xd97706;
    const stringXs = [-0.11, -0.066, -0.022, 0.022, 0.066, 0.11];
    stringXs.forEach((sx, i) => {
      const opacity = 0.22 + i * 0.08;
      guitar.add(lineSegment([
        new THREE.Vector3(sx * 0.85, -1.08, 0.09),
        new THREE.Vector3(sx * 0.90,  3.80, 0.01),
      ], mkLine(stringColor, opacity)));
    });

    /* ── Headstock ─── */
    const hsW = 0.36, hsH = 0.38, hsY = 3.80;
    const headPts = [
      new THREE.Vector3(-hsW / 2, hsY,        0),
      new THREE.Vector3(-hsW / 2, hsY + hsH,  0),
      new THREE.Vector3( hsW / 2, hsY + hsH,  0),
      new THREE.Vector3( hsW / 2, hsY,        0),
      new THREE.Vector3(-hsW / 2, hsY,        0),
    ];
    guitar.add(lineSegment(headPts, cyanBright));
    // headstock notch
    guitar.add(lineSegment([
      new THREE.Vector3(-hsW / 4, hsY + 0.05, 0),
      new THREE.Vector3( hsW / 4, hsY + 0.05, 0),
    ], cyanMid));

    /* ── Tuning pegs (3 per side) ─── */
    [hsY + 0.10, hsY + 0.20, hsY + 0.30].forEach(py => {
      [[-hsW / 2 - 0.08, py], [hsW / 2 + 0.08, py]].forEach(([px, y]) => {
        const pegGeo = new THREE.CircleGeometry(0.042, 8);
        const peg = new THREE.LineSegments(new THREE.WireframeGeometry(pegGeo), cyanMid);
        peg.position.set(px as number, y as number, 0);
        guitar.add(peg);
      });
    });

    // Raise guitar so body + neck are both fully visible in camera frustum
    guitar.scale.setScalar(1.5);
    guitar.position.set(0.1, -1.05, 0);
    // Permanent diagonal tilt (~12.5°): neck points upper-left, body rests
    // lower-right — natural leaning pose without any CSS rotation.
    // Done in 3D so overflow-hidden on the parent never clips the neck.
    guitar.rotation.z = -0.22;
    scene.add(guitar);

    const fitCameraToGuitar = () => {
      const box = new THREE.Box3().setFromObject(guitar);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      const paddedHeight = size.y + 2.6;
      const paddedWidth  = size.x + 1.3;
      const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
      const fitHeightDistance = paddedHeight / (2 * Math.tan(halfFovY));
      const fitWidthDistance = paddedWidth / (2 * camera.aspect * Math.tan(halfFovY));
      const distance = Math.max(fitHeightDistance, fitWidthDistance) + 0.18;

      camera.position.set(center.x + 0.12, center.y - 0.04, center.z + distance);
      camera.lookAt(center.x + 0.12, center.y - 0.04, center.z);
      camera.updateProjectionMatrix();
    };

    fitCameraToGuitar();

    // ── Drag-to-rotate ─────────────────────────────────────────────────────
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
      guitar.rotation.y += velX;
      guitar.rotation.x = Math.max(-0.6, Math.min(0.6, guitar.rotation.x + velY));
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
      t += 0.007;
      if (!isDragging) {
        velX *= 0.88;
        velY *= 0.92;
        // Continuous slow Y-axis rotation — true hologram display on a turntable.
        // One full revolution every ~30 s at 60 fps (t increments 0.007/frame).
        // velX lets the user spin it faster with a drag, then it decays back.
        guitar.rotation.y = t * 0.5 + velX;
        // Very subtle forward/back nod for depth
        guitar.rotation.x = Math.sin(t * 0.22) * 0.05 + velY;
        // Gentle float
        guitar.position.y = -1.05 + Math.sin(t * 0.65) * 0.08;
        // rotation.z = -0.22 (set once) stays — the lean is permanent.
      }
      // Subtle string pulse
      const pulse = 0.5 + 0.3 * Math.sin(t * 2.0);
      guitar.children.forEach(child => {
        if (child instanceof THREE.Line) {
          const mat = child.material as THREE.LineBasicMaterial;
          if (mat.opacity < 0.30) mat.opacity = pulse * 0.35;
        }
      });
      renderer.render(scene, camera);
    }
    animate();

    // ── Resize ──────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      fitCameraToGuitar();
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
