"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── Types ────────────────────────────────────────────────────────────────────
export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  gridOpacity?: number;
};

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function hexToRgb(hex: string) {
  const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthand, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (!arr.includes(r)) arr.push(r);
  }
  return arr;
}

/** Convert lat/lng to a THREE.Vector3 on a sphere of given radius */
function latLngToVec3(lat: number, lng: number, radius = 100): THREE.Vector3 {
  const phi   = (90 - lat)  * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
     (radius * Math.cos(phi)),
     (radius * Math.sin(phi) * Math.sin(theta))
  );
}

/** Build a curved arc (quadratic bezier) as a THREE.Line */
function buildArc(
  startLat: number, startLng: number,
  endLat: number,   endLng: number,
  arcAlt: number,   color: string
): THREE.Line {
  const R = 100;
  const start = latLngToVec3(startLat, startLng, R);
  const end   = latLngToVec3(endLat,   endLng,   R);
  // Control point pushed outward for the arc height
  const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(R * (1 + arcAlt));
  const curve  = new THREE.QuadraticBezierCurve3(start, mid, end);
  const points = curve.getPoints(60);
  const geo    = new THREE.BufferGeometry().setFromPoints(points);
  const rgb    = hexToRgb(color) ?? { r: 0, g: 212, b: 255 };
  const mat    = new THREE.LineBasicMaterial({
    color: new THREE.Color(`rgb(${rgb.r},${rgb.g},${rgb.b})`),
    transparent: true,
    opacity: 0.75,
  });
  return new THREE.Line(geo, mat);
}

/** Build a glowing dot at a lat/lng */
function buildDot(lat: number, lng: number, color: string): THREE.Mesh {
  const pos = latLngToVec3(lat, lng, 102);
  const geo = new THREE.SphereGeometry(1.2, 8, 8);
  const rgb = hexToRgb(color) ?? { r: 0, g: 212, b: 255 };
  const mat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(`rgb(${rgb.r},${rgb.g},${rgb.b})`),
    transparent: true,
    opacity: 0.9,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(pos);
  return mesh;
}

// ─── World Component ──────────────────────────────────────────────────────────
export function World({ globeConfig, data }: WorldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 2000);
    camera.position.z = 280;

    // ── Lights ────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(globeConfig.ambientLight ?? "#E8366A", 0.4));
    const dl = new THREE.DirectionalLight(globeConfig.directionalLeftLight ?? "#c4204f", 1.2);
    dl.position.set(-400, 100, 400);
    scene.add(dl);

    // ── Globe group ───────────────────────────────────────────────────────────
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Solid dark sphere (base)
    const baseMesh = new THREE.Mesh(
      new THREE.SphereGeometry(100, 64, 64),
      new THREE.MeshPhongMaterial({
        color:       new THREE.Color(globeConfig.globeColor ?? "#0D0A18"),
        emissive:    new THREE.Color(globeConfig.emissive ?? "#0a0704"),
        shininess:   60,
        transparent: true,
        opacity:     0.92,
      })
    );
    globeGroup.add(baseMesh);

    // 2. Lat/lng grid lines (holographic wireframe)
    const gridMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(globeConfig.atmosphereColor ?? "#00d4ff"),
      transparent: true,
      opacity: globeConfig.gridOpacity ?? 0.08,
    });
    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const pts: THREE.Vector3[] = [];
      for (let lng = 0; lng <= 360; lng += 3) pts.push(latLngToVec3(lat, lng - 180, 101));
      globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }
    // Longitude lines
    for (let lng = 0; lng < 360; lng += 20) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 3) pts.push(latLngToVec3(lat, lng - 180, 101));
      globeGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat));
    }

    // 3. Atmosphere glow (outer shell)
    const atmMesh = new THREE.Mesh(
      new THREE.SphereGeometry(108, 64, 64),
      new THREE.MeshBasicMaterial({
        color:       new THREE.Color(globeConfig.atmosphereColor ?? "#00d4ff"),
        transparent: true,
        opacity:     0.06,
        side:        THREE.BackSide,
      })
    );
    globeGroup.add(atmMesh);

    // 4. Arcs + dots
    const arcLines: THREE.Line[] = [];
    const allColors = ["#E8366A", "#c4204f", "#f06288", "#9e1847"];
    data.forEach((arc, i) => {
      const color = allColors[i % allColors.length];
      const line  = buildArc(arc.startLat, arc.startLng, arc.endLat, arc.endLng, arc.arcAlt, color);
      globeGroup.add(line);
      arcLines.push(line);
      globeGroup.add(buildDot(arc.startLat, arc.startLng, color));
      globeGroup.add(buildDot(arc.endLat,   arc.endLng,   color));
    });

    // ── Interaction ───────────────────────────────────────────────────────────
    let isDragging = false;
    let prevMouse  = { x: 0, y: 0 };
    let rotY = 0, rotX = 0;

    const onDown  = (e: MouseEvent) => { isDragging = true;  prevMouse = { x: e.clientX, y: e.clientY }; };
    const onMove  = (e: MouseEvent) => {
      if (!isDragging) return;
      rotY += (e.clientX - prevMouse.x) * 0.005;
      rotX  = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotX + (e.clientY - prevMouse.y) * 0.005));
      prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onUp    = () => { isDragging = false; };

    const onTDown = (e: TouchEvent) => { isDragging = true;  prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    const onTMove = (e: TouchEvent) => {
      if (!isDragging) return;
      rotY += (e.touches[0].clientX - prevMouse.x) * 0.005;
      rotX  = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotX + (e.touches[0].clientY - prevMouse.y) * 0.005));
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTUp   = () => { isDragging = false; };

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    container.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove",    onMove);
    window.addEventListener("mouseup",      onUp);
    container.addEventListener("touchstart", onTDown);
    window.addEventListener("touchmove",    onTMove);
    window.addEventListener("touchend",     onTUp);
    window.addEventListener("resize",       onResize);

    // ── Animate arcs opacity (pulsing) ────────────────────────────────────────
    let t = 0;
    const autoSpeed = (globeConfig.autoRotateSpeed ?? 0.5) * 0.002;

    // ── Render loop ───────────────────────────────────────────────────────────
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.01;

      if (!isDragging && globeConfig.autoRotate !== false) rotY += autoSpeed;
      globeGroup.rotation.y = rotY;
      globeGroup.rotation.x = rotX;

      // Pulse arc brightness
      arcLines.forEach((line, i) => {
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = 0.4 + 0.35 * Math.sin(t + i * 0.7);
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove",    onMove);
      window.removeEventListener("mouseup",      onUp);
      container.removeEventListener("touchstart", onTDown);
      window.removeEventListener("touchmove",    onTMove);
      window.removeEventListener("touchend",     onTUp);
      window.removeEventListener("resize",       onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full" style={{ cursor: "grab" }} />
  );
}
