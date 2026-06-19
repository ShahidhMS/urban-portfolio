"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Database, Globe, Layers, MapPin } from "lucide-react";

const logs = [
  "Initializing Geospatial Environment...",
  "Setting Projection Coordinate System to EPSG:4326 (WGS 84)...",
  "Loading Sentinel-2 and Landsat raster tiles...",
  "Querying PostgreSQL/PostGIS spatial databases...",
  "Parsing GeoJSON vectors and topological network layers...",
  "Rendering Smart Cities indicators...",
  "Systems Ready. Launching Spatial Dashboard..."
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const icons = [
    <Globe className="w-8 h-8 animate-spin text-secondary" key="globe" />,
    <Layers className="w-8 h-8 text-primary" key="layers" />,
    <Database className="w-8 h-8 text-accent" key="db" />,
    <Compass className="w-8 h-8 text-secondary" key="compass" />,
    <MapPin className="w-8 h-8 animate-bounce text-accent" key="pin" />
  ];

  useEffect(() => {
    // Progress increment timer
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    // Step increment timer
    const stepInterval = setInterval(() => {
      setStep((prev) => {
        if (prev >= logs.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 350);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0F19] text-white select-none">
      {/* Background Spatial Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.015)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40"></div>
      
      {/* Animated Radar Circle */}
      <div className="absolute w-[300px] h-[300px] border border-secondary/10 rounded-full flex items-center justify-center animate-pulse">
        <div className="w-[200px] h-[200px] border border-secondary/20 rounded-full flex items-center justify-center">
          <div className="w-[100px] h-[100px] border border-secondary/35 rounded-full"></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg px-6 w-full text-center">
        {/* Animated Icon Container */}
        <div className="mb-8 w-16 h-16 flex items-center justify-center rounded-lg bg-bg-card/10 border border-secondary/30 shadow-lg shadow-secondary/10">
          {icons[step % icons.length]}
        </div>

        {/* Name and Title */}
        <h1 className="font-display font-black text-3xl tracking-wider text-white uppercase mb-2">
          Shahidh MS <span className="text-secondary">Spatial</span>
        </h1>
        <p className="font-mono text-xs tracking-widest text-[#94A3B8] uppercase mb-8">
          Geographic Information Systems • Urban Analytics
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-6 border border-slate-700/50">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          ></motion.div>
        </div>

        {/* Logs terminal */}
        <div className="w-full text-left font-mono text-[10px] h-20 text-[#94A3B8]/80 select-all overflow-hidden p-3 bg-black/40 border border-slate-800 rounded-sm">
          <div className="text-secondary/70 mb-1 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 bg-secondary rounded-full animate-ping"></span>
            <span>$ cat /sys/gis/boot.log</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="text-[#94A3B8] leading-relaxed truncate"
            >
              &gt; {logs[step]}
            </motion.p>
          </AnimatePresence>
          <div className="mt-2 text-[#94A3B8]/40">
            Progress: {progress}% | EPSG:4326 | LatLng: 30.267, -97.743
          </div>
        </div>
      </div>
    </div>
  );
}
