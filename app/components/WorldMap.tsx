"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import portfolioData from "../../data/portfolioData.json";

interface MapProject {
  id: string;
  title: string;
  category: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  tools: string[];
}

export default function WorldMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstance = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tileLayerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersGroupRef = useRef<any>(null);
  const { theme } = useTheme();
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [LInstance, setLInstance] = useState<any>(null);

  // Dynamic import Leaflet on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => {
        setLInstance(leaflet.default);
        setLeafletLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !LInstance || !mapRef.current) return;

    // Initialize map if not already initialized
    if (!mapInstance.current) {
      mapInstance.current = LInstance.map(mapRef.current, {
        center: [7.8731, 80.7718],
        zoom: 7.5,
        minZoom: 5,
        maxZoom: 12,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      // Add custom scale control
      LInstance.control.scale({ imperial: false, position: "bottomright" }).addTo(mapInstance.current);
    }

    const map = mapInstance.current;

    // Clean up old tile layer if exists
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    // Use standard OpenStreetMap base map tiles
    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    tileLayerRef.current = LInstance.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Clean up old markers
    if (markersGroupRef.current) {
      map.removeLayer(markersGroupRef.current);
    }

    markersGroupRef.current = LInstance.layerGroup().addTo(map);

    // Plot project markers
    const projects = portfolioData.projects as unknown as MapProject[];
    projects.forEach((proj) => {
      const { lat, lng, name } = proj.location;

      // Custom marker color using HTML divs for a premium look
      const markerHtml = `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-6 h-6 bg-secondary/35 rounded-full animate-ping pointer-events-none"></div>
          <div class="w-3.5 h-3.5 bg-accent border-2 border-white rounded-full shadow-md hover:scale-125 transition-transform duration-300"></div>
        </div>
      `;

      const customIcon = LInstance.divIcon({
        html: markerHtml,
        className: "custom-div-icon",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const popupContent = `
        <div class="p-2 select-none">
          <span class="text-[9px] font-mono font-bold uppercase tracking-wider text-secondary">
            ${proj.category}
          </span>
          <h3 class="font-display font-bold text-sm text-text-base leading-tight mt-0.5 mb-1.5">
            ${proj.title}
          </h3>
          <div class="flex items-center gap-1 text-[10px] text-text-muted mb-2">
            <span class="font-semibold text-accent">📍 Zone:</span> ${name}
          </div>
          <div class="flex flex-wrap gap-1 mb-2">
            ${proj.tools
              .slice(0, 3)
              .map((t) => `<span class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[8px] px-1 rounded-sm">${t}</span>`)
              .join("")}
          </div>
          <a href="#${proj.id}" class="text-[10px] text-primary hover:underline font-bold">
            View details &rarr;
          </a>
        </div>
      `;

      LInstance.marker([lat, lng], { icon: customIcon })
        .bindPopup(popupContent)
        .addTo(markersGroupRef.current);
    });

  }, [leafletLoaded, LInstance, theme]);

  return (
    <div className="relative w-full h-[450px] rounded-lg border border-border-custom overflow-hidden shadow-lg bg-bg-card">
      {/* Map Element */}
      <div ref={mapRef} className={`w-full h-full z-0 ${theme === "dark" ? "dark-map" : ""}`} />

      {/* Loading Overlay */}
      {!leafletLoaded && (
        <div className="absolute inset-0 bg-bg-card flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              Rendering Coordinates...
            </span>
          </div>
        </div>
      )}

      {/* Floating HUD Panel */}
      <div className="absolute top-4 right-4 z-10 glass-card px-4 py-3 border border-border-custom rounded-md pointer-events-none select-none max-w-[200px]">
        <span className="font-mono text-[9px] uppercase tracking-widest text-secondary font-bold block mb-1">
          Geo-Location Index
        </span>
        <h4 className="text-[11px] font-bold text-text-base leading-snug">
          Interactive World Project Map
        </h4>
        <p className="text-[10px] text-text-muted mt-1 leading-tight">
          Click on any marker to inspect geospatial analyses conducted across project regions.
        </p>
      </div>

      {/* Leaflet Custom Marker Styling */}
      <style jsx global>{`
        .custom-div-icon {
          background: none;
          border: none;
        }
        .dark-map .leaflet-tile-container {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }
      `}</style>
    </div>
  );
}
