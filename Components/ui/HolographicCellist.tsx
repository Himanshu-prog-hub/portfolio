// 'use client';

// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// export function HolographicCellist() {
//   const mountRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const el = mountRef.current;
//     if (!el) return;

//     const W = el.clientWidth;
//     const H = el.clientHeight;

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.setSize(W, H);
//     renderer.setClearColor(0x000000, 0);
//     el.appendChild(renderer.domElement);

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);

//     const mkLine = (hex: number, opacity: number) =>
//       new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity });

//     const cyanBright = mkLine(0x7cf3ff, 0.96);
//     const cyanMid = mkLine(0x1fd6ff, 0.58);
//     const cyanFaint = mkLine(0x148fff, 0.18);
//     const violet = mkLine(0xb486ff, 0.24);

//     const lineSegment = (pts: THREE.Vector3[], mat: THREE.LineBasicMaterial) =>
//       new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);

//     const lineLoop = (pts: THREE.Vector3[], mat: THREE.LineBasicMaterial) =>
//       new THREE.Line(new THREE.BufferGeometry().setFromPoints([...pts, pts[0]]), mat);

//     function ellipsePoints(rx: number, ry: number, y: number, z: number, segments = 56) {
//       const pts: THREE.Vector3[] = [];
//       for (let i = 0; i <= segments; i++) {
//         const a = (i / segments) * Math.PI * 2;
//         pts.push(new THREE.Vector3(Math.cos(a) * rx, y + Math.sin(a) * ry, z));
//       }
//       return pts;
//     }

//     const cello = new THREE.Group();

//     const bodyShape = new THREE.Shape();
//     bodyShape.moveTo(0, 2.46);
//     bodyShape.bezierCurveTo(0.86, 2.38, 1.30, 1.72, 1.12, 0.92);
//     bodyShape.bezierCurveTo(1.02, 0.42, 1.12, 0.02, 1.38, -0.44);
//     bodyShape.bezierCurveTo(1.72, -1.10, 1.40, -2.20, 0.62, -2.98);
//     bodyShape.bezierCurveTo(0.20, -3.18, -0.24, -3.22, -0.64, -3.14);
//     bodyShape.bezierCurveTo(-1.36, -2.38, -1.66, -1.18, -1.26, -0.42);
//     bodyShape.bezierCurveTo(-1.00, 0.04, -1.00, 0.44, -1.24, 0.94);
//     bodyShape.bezierCurveTo(-1.58, 1.72, -1.10, 2.42, -0.16, 2.50);
//     bodyShape.bezierCurveTo(-0.08, 2.50, 0.0, 2.50, 0.0, 2.46);

//     const bodyPts2 = bodyShape.getPoints(120);
//     const frontPts = bodyPts2.map(p => new THREE.Vector3(p.x, p.y, 0.10));
//     const backPts = bodyPts2.map(p => new THREE.Vector3(p.x, p.y, -0.10));

//     cello.add(lineLoop(frontPts, cyanBright));
//     cello.add(lineLoop(frontPts, violet));
//     cello.add(lineLoop(backPts, cyanFaint));

//     [0, 16, 34, 52, 72, 92, 110].forEach(idx => {
//       const p = bodyPts2[Math.min(idx, bodyPts2.length - 1)];
//       cello.add(lineSegment([
//         new THREE.Vector3(p.x, p.y, 0.10),
//         new THREE.Vector3(p.x, p.y, -0.10),
//       ], cyanFaint));
//     });

//     cello.add(lineLoop(ellipsePoints(0.22, 0.46, 0.10, 0.11, 42), cyanBright));
//     cello.add(lineLoop(ellipsePoints(0.11, 0.24, 0.10, 0.11, 28), cyanMid));

//     cello.add(lineSegment([
//       new THREE.Vector3(-0.24, -2.66, 0.11),
//       new THREE.Vector3(0.24, -2.66, 0.11),
//     ], cyanMid));
//     cello.add(lineSegment([
//       new THREE.Vector3(0, -2.84, 0.03),
//       new THREE.Vector3(0, -3.84, 0.03),
//     ], cyanFaint));

//     const neckHalf = 0.12;
//     cello.add(lineSegment([
//       new THREE.Vector3(-neckHalf, 2.34, 0.03),
//       new THREE.Vector3(-0.14, 5.24, 0.03),
//     ], cyanBright));
//     cello.add(lineSegment([
//       new THREE.Vector3(neckHalf, 2.34, 0.03),
//       new THREE.Vector3(0.14, 5.24, 0.03),
//     ], cyanBright));
//     cello.add(lineSegment([
//       new THREE.Vector3(0, 2.34, 0.02),
//       new THREE.Vector3(0, 5.24, 0.02),
//     ], cyanFaint));

//     [2.74, 3.14, 3.50, 3.86, 4.22, 4.58, 4.92].forEach(fy => {
//       cello.add(lineSegment([
//         new THREE.Vector3(-0.12, fy, 0.02),
//         new THREE.Vector3(0.12, fy, 0.02),
//       ], cyanFaint));
//     });

//     cello.add(lineLoop([
//       new THREE.Vector3(-0.20, 5.24, 0.04),
//       new THREE.Vector3(-0.28, 5.68, 0.04),
//       new THREE.Vector3(0.28, 5.68, 0.04),
//       new THREE.Vector3(0.20, 5.24, 0.04),
//     ], cyanBright));

//     [-0.07, -0.022, 0.022, 0.07].forEach((sx, i) => {
//       cello.add(lineSegment([
//         new THREE.Vector3(sx, -2.62, 0.10),
//         new THREE.Vector3(sx * 1.08, 5.56, 0.04),
//       ], mkLine(0x63e9ff, 0.22 + i * 0.08)));
//     });

//     cello.add(lineSegment([
//       new THREE.Vector3(-0.14, 2.28, 0.03),
//       new THREE.Vector3(0.14, 2.28, 0.03),
//     ], cyanMid));

//     scene.add(cello);

//     const aura = new THREE.Mesh(
//       new THREE.CircleGeometry(2.1, 56),
//       new THREE.MeshBasicMaterial({ color: 0x0d7bd8, transparent: true, opacity: 0.06 })
//     );
//     aura.scale.set(1.0, 1.7, 1);
//     aura.position.set(0, -0.05, -0.35);
//     scene.add(aura);

//     const ground1 = lineSegment(ellipsePoints(2.4, 0.34, -3.84, -0.88, 56), cyanFaint);
//     const ground2 = lineSegment(ellipsePoints(1.78, 0.24, -3.70, -0.92, 48), violet);
//     scene.add(ground1);
//     scene.add(ground2);

//     const fitCameraToCello = () => {
//       const box = new THREE.Box3().setFromObject(cello);
//       const size = box.getSize(new THREE.Vector3());
//       const center = box.getCenter(new THREE.Vector3());
//       const paddedHeight = size.y + 0.9;
//       const paddedWidth = size.x + 0.7;
//       const halfFovY = THREE.MathUtils.degToRad(camera.fov * 0.5);
//       const fitHeightDistance = paddedHeight / (2 * Math.tan(halfFovY));
//       const fitWidthDistance = paddedWidth / (2 * camera.aspect * Math.tan(halfFovY));
//       const distance = Math.max(fitHeightDistance, fitWidthDistance) + 0.35;

//       camera.position.set(center.x, center.y + 0.08, center.z + distance);
//       camera.lookAt(center.x, center.y + 0.08, center.z);
//       camera.updateProjectionMatrix();
//     };

//     fitCameraToCello();

//     let raf = 0;
//     let t = 0;
//     function animate() {
//       raf = requestAnimationFrame(animate);
//       t += 0.008;

//       cello.position.y = Math.sin(t * 0.5) * 0.04;
//       aura.material.opacity = 0.05 + 0.015 * (0.5 + 0.5 * Math.sin(t * 1.8));

//       cello.traverse(obj => {
//         if (obj instanceof THREE.Line) {
//           const mat = obj.material as THREE.LineBasicMaterial;
//           if (mat.opacity < 0.25) {
//             mat.opacity = Math.max(0.12, 0.18 + 0.04 * Math.sin(t * 2.0));
//           }
//         }
//       });

//       renderer.render(scene, camera);
//     }
//     animate();

//     const ro = new ResizeObserver(() => {
//       const w = el.clientWidth;
//       const h = el.clientHeight;
//       camera.aspect = w / h;
//       fitCameraToCello();
//       renderer.setSize(w, h);
//     });
//     ro.observe(el);

//     return () => {
//       cancelAnimationFrame(raf);
//       ro.disconnect();
//       renderer.dispose();
//       if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} className="w-full h-full" />;
// }
