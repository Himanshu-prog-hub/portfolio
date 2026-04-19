"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

// Vanilla Three.js — no R3F, so no React 18.3 internal conflicts
const World = dynamic(() => import("./Globe").then((m) => m.World), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border border-amber-400/30 border-t-amber-400 animate-spin" />
    </div>
  ),
});

const GridGlobe = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isLight = mounted && resolvedTheme === 'light';

  const cardBg = isLight ? '#FDFAF5' : '#0D0A18';

  const globeConfig = {
    pointSize: 3,
    globeColor: isLight ? "#E8E2F8" : "#0D0A18",
    showAtmosphere: true,
    atmosphereColor: isLight ? "#E8366A" : "#00d4ff",
    atmosphereAltitude: isLight ? 0.22 : 0.18,
    emissive: isLight ? "#DDD5F0" : "#0D0A18",
    emissiveIntensity: 0.05,
    shininess: isLight ? 30 : 0.9,
    polygonColor: isLight ? "rgba(158,24,71,0.45)" : "rgba(232,54,106,0.12)",
    ambientLight: isLight ? "#f0ecff" : "#E8366A",
    directionalLeftLight: isLight ? "#E8366A" : "#c4204f",
    directionalTopLight: isLight ? "#e8e0d8" : "#9e1847",
    pointLight: isLight ? "#e8e0d8" : "#9e1847",
    arcTime: 1200,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 12.9716, lng: 77.5946 },  // Bengaluru
    autoRotate: true,
    autoRotateSpeed: 0.4,
    gridOpacity: isLight ? 0.18 : 0.08,
  };

  const colors = ["#E8366A", "#c4204f", "#f06288", "#9e1847"];

  const sampleArcs = [
    // Bengaluru → New York
    { order: 1, startLat: 12.9716, startLng: 77.5946, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5, color: colors[0] },
    // Bengaluru → London
    { order: 2, startLat: 12.9716, startLng: 77.5946, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.4, color: colors[1] },
    // Bengaluru → Singapore
    { order: 3, startLat: 12.9716, startLng: 77.5946, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.2, color: colors[2] },
    // Bengaluru → Auckland (Serko HQ)
    { order: 4, startLat: 12.9716, startLng: 77.5946, endLat: -36.8485, endLng: 174.7633, arcAlt: 0.6, color: colors[3] },
    // Singapore → Tokyo
    { order: 5, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: colors[0] },
    // London → New York
    { order: 6, startLat: 51.5072, startLng: -0.1276, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: colors[1] },
    // New York → San Francisco
    { order: 7, startLat: 40.7128, startLng: -74.006, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.1, color: colors[2] },
    // Bengaluru → Sydney
    { order: 8, startLat: 12.9716, startLng: 77.5946, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.5, color: colors[0] },
    // Tokyo → San Francisco
    { order: 9, startLat: 35.6762, startLng: 139.6503, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.4, color: colors[3] },
    // London → Berlin
    { order: 10, startLat: 51.5072, startLng: -0.1276, endLat: 52.52, endLng: 13.405, arcAlt: 0.1, color: colors[1] },
    // Auckland → Sydney
    { order: 11, startLat: -36.8485, startLng: 174.7633, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.1, color: colors[2] },
    // San Francisco → London
    { order: 12, startLat: 37.7749, startLng: -122.4194, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.35, color: colors[0] },
    // Berlin → Singapore
    { order: 13, startLat: 52.52, startLng: 13.405, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.4, color: colors[3] },
    // Bengaluru → Dubai
    { order: 14, startLat: 12.9716, startLng: 77.5946, endLat: 25.2048, endLng: 55.2708, arcAlt: 0.15, color: colors[2] },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[60%] overflow-hidden z-0">
      {/* Globe canvas */}
      <div key={isLight ? 'light' : 'dark'} className="absolute inset-0">
        <World data={sampleArcs} globeConfig={globeConfig} />
      </div>

      {/* Top fade — blends globe into card above */}
      <div
        className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10"
        style={{ background: `linear-gradient(to bottom, ${cardBg}, transparent)` }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-12 pointer-events-none z-10"
        style={{ background: `linear-gradient(to top, ${cardBg}, transparent)` }}
      />

      {/* Base glow */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-4 rounded-full pointer-events-none z-10"
        style={{
          background: `radial-gradient(ellipse at center, ${isLight ? 'rgba(232,54,106,0.25)' : 'rgba(232,54,106,0.35)'} 0%, transparent 70%)`,
          filter: "blur(8px)",
        }}
        animate={{ opacity: [0.3, 0.8, 0.3], scaleX: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sweep line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/30 to-transparent pointer-events-none z-10"
        animate={{ top: ["5%", "95%", "5%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default GridGlobe;
