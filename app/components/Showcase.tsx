"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, Compass } from "lucide-react";
import portfolioData from "../../data/portfolioData.json";
import { getAssetPath } from "../utils/assetPath";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  type: 'Map' | 'Model & Visualization';
  mediaGroup?: string[];
}

export default function Showcase() {
  const galleryItems = portfolioData.gallery as unknown as GalleryItem[];
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'maps' | 'models'>('all');
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const maps = galleryItems.filter(item => item.type === 'Map');
  const models = galleryItems.filter(item => item.type === 'Model & Visualization');

  // Listen for hash changes or custom events to support opening specific gallery items directly
  useEffect(() => {
    const handleOpenGalleryItem = (galleryId: number) => {
      const item = galleryItems.find((gi) => gi.id === galleryId);
      if (item) {
        // Set correct category tab
        if (item.type === "Map") {
          setActiveTab("maps");
        } else {
          setActiveTab("models");
        }
        
        // Open the gallery item
        setActiveItem(item);
        setCurrentMediaIndex(0);

        // Scroll to the gallery section smoothly
        setTimeout(() => {
          const section = document.getElementById("gallery");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && hash.startsWith("gallery-item-")) {
        const idStr = hash.replace("gallery-item-", "");
        const itemId = parseInt(idStr, 10);
        if (!isNaN(itemId)) {
          handleOpenGalleryItem(itemId);
        }
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: number }>;
      if (customEvent.detail && typeof customEvent.detail.id === "number") {
        handleOpenGalleryItem(customEvent.detail.id);
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("open-gallery-item", handleCustomEvent);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("open-gallery-item", handleCustomEvent);
    };
  }, [galleryItems]);

  const handleOpenItem = (item: GalleryItem) => {
    setActiveItem(item);
    setCurrentMediaIndex(0);
  };

  const handleNextMedia = (mediaGroup: string[]) => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaGroup.length);
  };

  const handlePrevMedia = (mediaGroup: string[]) => {
    setCurrentMediaIndex((prev) => (prev - 1 + mediaGroup.length) % mediaGroup.length);
  };

  // Aspect helper to create a dynamic grid spacing look
  const getAspectClass = (id: number) => {
    switch (id % 6) {
      case 1: return "aspect-[4/3]";
      case 2: return "aspect-[3/4]";
      case 3: return "aspect-square";
      case 4: return "aspect-[16/10]";
      case 5: return "aspect-[3/4]";
      default: return "aspect-[4/3]";
    }
  };

  const renderGrid = (items: GalleryItem[]) => (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {items.map((item) => (
        <motion.div
          key={item.id}
          onClick={() => handleOpenItem(item)}
          className={`relative break-inside-avoid w-full ${getAspectClass(item.id)} overflow-hidden border border-border-custom rounded-lg bg-slate-900 group cursor-pointer shadow-sm`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: (item.id % 10) * 0.05 }}
        >
          {/* Image */}
          <img
            src={getAssetPath(item.imageUrl)}
            alt={item.title}
            className="w-full h-full object-cover mix-blend-luminosity opacity-50 group-hover:mix-blend-normal group-hover:opacity-90 group-hover:scale-102 transition-all duration-500 ease-out"
            loading="lazy"
          />

          {/* Group Tag */}
          {item.mediaGroup && item.mediaGroup.length > 1 && (
            <div className="absolute top-3 right-3 bg-secondary text-white font-mono text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm z-10 shadow-md">
              Group ({item.mediaGroup.length})
            </div>
          )}

          {/* Hover overlay details panel */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6 pointer-events-none">
            <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300 text-white">
              <span className="font-display text-[9px] uppercase tracking-widest text-secondary font-bold block mb-1">
                {item.category}
              </span>
              <h3 className="font-display font-bold text-base text-white leading-tight flex items-center justify-between">
                {item.title}
                <ZoomIn className="w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2 flex-shrink-0" />
              </h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section id="gallery" className="py-24 bg-bg-base border-b border-border-custom relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,137,123,0.01),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-secondary font-display text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Visual Index
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text-base tracking-tight">
            Maps & Visualizations Gallery
          </h2>
          <div className="w-12 h-1 bg-secondary mt-4"></div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-border-custom/50 pb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-mono font-medium rounded-full border transition-all cursor-pointer ${
              activeTab === 'all'
                ? "bg-secondary/10 border-secondary text-secondary"
                : "border-border-custom hover:border-text-muted text-text-muted"
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveTab('maps')}
            className={`px-4 py-2 text-xs font-mono font-medium rounded-full border transition-all cursor-pointer ${
              activeTab === 'maps'
                ? "bg-secondary/10 border-secondary text-secondary"
                : "border-border-custom hover:border-text-muted text-text-muted"
            }`}
          >
            GIS Maps & Cartography ({maps.length})
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`px-4 py-2 text-xs font-mono font-medium rounded-full border transition-all cursor-pointer ${
              activeTab === 'models'
                ? "bg-orange-500/10 border-orange-500 text-orange-500"
                : "border-border-custom hover:border-text-muted text-text-muted"
            }`}
          >
            3D Models & Dashboards ({models.length})
          </button>
        </div>

        {/* Gallery Sections */}
        <div className="space-y-16">
          {(activeTab === 'all' || activeTab === 'maps') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-text-base">
                  GIS Maps & Cartography
                </h3>
              </div>
              <p className="text-xs text-text-muted mb-8 max-w-2xl font-light">
                Geospatial analysis outputs, terrain models, land use classifications, and hydrological mapping layouts.
              </p>
              {renderGrid(maps)}
            </motion.div>
          )}

          {(activeTab === 'all' || activeTab === 'models') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: activeTab === 'all' ? 0.2 : 0 }}
              className={activeTab === 'all' ? "pt-8 border-t border-border-custom/50" : ""}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-text-base">
                  3D Models & Visualizations
                </h3>
              </div>
              <p className="text-xs text-text-muted mb-8 max-w-2xl font-light">
                3D urban massing, density models, web-based spatial dashboards, and architectural visualizations.
              </p>
              {renderGrid(models)}
            </motion.div>
          )}
        </div>

      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-bg-card border border-border-custom rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setActiveItem(null);
                  if (window.location.hash && window.location.hash.startsWith("#gallery-item-")) {
                    window.history.replaceState({}, "", window.location.pathname + window.location.search);
                  }
                }}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-text-base rounded-full border border-border-custom transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Media Display Area */}
              <div className="w-full aspect-[16/10] bg-black relative flex items-center justify-center group/media">
                {activeItem.mediaGroup && activeItem.mediaGroup.length > 0 ? (
                  <>
                    {/* Active Slide Media */}
                    {activeItem.mediaGroup[currentMediaIndex].endsWith(".mp4") ? (
                      <video
                        src={getAssetPath(activeItem.mediaGroup[currentMediaIndex])}
                        controls
                        autoPlay
                        loop
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <img
                        src={getAssetPath(activeItem.mediaGroup[currentMediaIndex])}
                        alt={`${activeItem.title} - view ${currentMediaIndex + 1}`}
                        className="w-full h-full object-contain"
                      />
                    )}

                    {/* Navigation Buttons (Only if group contains multiple items) */}
                    {activeItem.mediaGroup.length > 1 && (
                      <>
                        <button
                          onClick={() => handlePrevMedia(activeItem.mediaGroup!)}
                          className="absolute left-4 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/10 hover:scale-105 transition-all cursor-pointer select-none"
                        >
                          &larr;
                        </button>
                        <button
                          onClick={() => handleNextMedia(activeItem.mediaGroup!)}
                          className="absolute right-4 p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white border border-white/10 hover:scale-105 transition-all cursor-pointer select-none"
                        >
                          &rarr;
                        </button>

                        {/* Visual Navigation Index indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded-full border border-white/5 font-mono text-[9px] text-white/85">
                          <span>{currentMediaIndex + 1}</span>
                          <span className="opacity-40">/</span>
                          <span>{activeItem.mediaGroup.length}</span>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <img
                    src={getAssetPath(activeItem.imageUrl)}
                    alt={activeItem.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="p-6 select-text">
                <div className="flex items-center gap-2 mb-2">
                  <Compass className="w-4 h-4 text-secondary" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-secondary">
                    {activeItem.category}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-lg text-text-base leading-tight mb-2">
                  {activeItem.title}
                </h3>
                
                <p className="text-xs text-text-muted leading-relaxed font-light font-sans">
                  {activeItem.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
