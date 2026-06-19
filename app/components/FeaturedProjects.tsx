"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Search, X } from "lucide-react";
import { Github } from "./Icons";
import portfolioData from "../../data/portfolioData.json";

interface GalleryLink {
  id: number;
  label: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  outcomes: string[];
  githubLink: string;
  reportLink: string;
  panelLink?: string;
  customLink?: string;
  customLinkLabel?: string;
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  stats: {
    areaMapped?: string;
    timeRange?: string;
    datasets?: string;
  };
  imageUrl: string;
  galleryLinks?: GalleryLink[];
}

export default function FeaturedProjects() {
  const projects = portfolioData.projects as unknown as Project[];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Helper to open gallery item lightbox
  const handleOpenGalleryItem = (galleryId: number) => {
    setActiveProject(null);
    window.history.pushState({}, "", `#gallery-item-${galleryId}`);
    window.dispatchEvent(new CustomEvent("open-gallery-item", { detail: { id: galleryId } }));
  };

  // Listen for hash changes to support opening projects directly via map or other links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const found = projects.find((p) => p.id === hash);
        if (found) {
          setSelectedCategory("All");
          setSearchQuery("");
          setActiveProject(found);
          
          // Scroll to the projects section
          setTimeout(() => {
            const section = document.getElementById("projects");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }, 100);
        } else if (hash.startsWith("gallery-item-")) {
          // Auto-close project modal if moving to a gallery item
          setActiveProject(null);
        }
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [projects]);

  // Extract categories dynamically
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filter logic
  const filteredProjects = projects.filter((proj) => {
    const matchesCategory = selectedCategory === "All" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 bg-bg-base border-b border-border-custom relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,137,123,0.015),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-secondary font-display text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Portfolio Index
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text-base tracking-tight">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-secondary mt-4"></div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center bg-bg-card border border-border-custom p-4 rounded-lg shadow-sm">
          {/* Categories Tab Row */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-display uppercase tracking-wider px-4 py-2.5 rounded-sm border transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-secondary text-white border-secondary shadow-md shadow-secondary/15"
                    : "border-border-custom hover:border-secondary hover:bg-slate-50 dark:hover:bg-slate-800/20 text-text-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-xs flex-shrink-0">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-bg-base border border-border-custom rounded-sm text-text-base placeholder-text-muted/60 focus:outline-none focus:border-secondary transition-all"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.id}
                id={proj.id}
                layoutId={`proj-${proj.id}`}
                onClick={() => setActiveProject(proj)}
                className="glass-card flex flex-col h-full overflow-hidden border border-border-custom rounded-lg transition-all duration-300 group cursor-pointer hover:-translate-y-1.5"
              >
                {/* Thumbnail image or video container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900/5 border-b border-border-custom">
                  {proj.imageUrl.endsWith(".mp4") || proj.imageUrl.endsWith(".webm") ? (
                    <video
                      src={proj.imageUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-102 transition-all duration-500 ease-out"
                    />
                  ) : (
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover mix-blend-luminosity opacity-60 group-hover:mix-blend-normal group-hover:opacity-85 group-hover:scale-102 transition-all duration-500 ease-out"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-60 pointer-events-none"></div>

                  <div className="absolute top-4 left-4 z-10 bg-bg-card/85 backdrop-blur-md border border-border-custom px-3 py-1 rounded-sm">
                    <span className="font-display text-[9px] font-bold uppercase tracking-widest text-secondary">
                      {proj.category}
                    </span>
                  </div>
                </div>

                {/* Description content */}
                <div className="p-6 flex flex-col flex-grow justify-between select-none">
                  <div>
                    <h3 className="font-display font-bold text-base md:text-lg text-text-base tracking-tight leading-snug mb-3 group-hover:text-secondary transition-colors duration-200">
                      {proj.title}
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed font-light mb-6 line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 border-t border-border-custom/50 pt-4 mt-auto">
                    {proj.tools.slice(0, 3).map((tool) => (
                      <span
                        key={tool}
                        className="font-mono text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-sm"
                      >
                        {tool}
                      </span>
                    ))}
                    {proj.tools.length > 3 && (
                      <span className="font-mono text-[8px] text-text-muted px-1.5 py-0.5">
                        +{proj.tools.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="font-mono text-xs text-text-muted">No projects found.</span>
          </div>
        )}
      </div>

      {/* Expanded Project Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              layoutId={`proj-${activeProject.id}`}
              className="bg-bg-card border border-border-custom rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setActiveProject(null);
                  if (window.location.hash) {
                    window.history.replaceState({}, "", window.location.pathname + window.location.search);
                  }
                }}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-text-base rounded-full border border-border-custom transition-colors cursor-pointer z-10 animate-fade-in"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative w-full aspect-[16/9] bg-slate-900 border-b border-border-custom">
                {activeProject.imageUrl.endsWith(".mp4") || activeProject.imageUrl.endsWith(".webm") ? (
                  <video
                    src={activeProject.imageUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-cover opacity-80"
                  />
                ) : (
                  <img
                    src={activeProject.imageUrl}
                    alt={activeProject.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-85"></div>
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="bg-secondary text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-md">
                    {activeProject.category}
                  </span>
                  <h3 className="font-display font-black text-xl md:text-2xl text-text-base mt-3 leading-snug">
                    {activeProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-8">
                {/* Project Specs Grid */}
                <div className="grid grid-cols-3 gap-4 border-b border-border-custom/50 pb-6 mb-6 font-mono text-[10px] text-text-muted">
                  <div>
                    <span className="block font-bold text-secondary uppercase">Mapped Scope:</span>
                    <span className="text-text-base font-semibold">{activeProject.stats.areaMapped || "N/A"}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-secondary uppercase">Analysis Period:</span>
                    <span className="text-text-base font-semibold">{activeProject.stats.timeRange || "N/A"}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-secondary uppercase">Primary Sensors:</span>
                    <span className="text-text-base font-semibold">{activeProject.stats.datasets || "N/A"}</span>
                  </div>
                </div>

                <div className="space-y-6 select-text text-sm">
                  {/* Detailed Description */}
                  <div>
                    <h4 className="font-display font-bold text-text-base mb-2 text-xs uppercase tracking-wider text-secondary">
                      Analysis Framework
                    </h4>
                    <p className="text-text-muted leading-relaxed font-light">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Project Outcomes */}
                  <div>
                    <h4 className="font-display font-bold text-text-base mb-3 text-xs uppercase tracking-wider text-secondary">
                      Key Outcomes & Findings
                    </h4>
                    <ul className="space-y-2.5 list-disc pl-4 text-text-muted font-light leading-relaxed text-xs">
                      {activeProject.outcomes.map((out, idx) => (
                        <li key={idx}>{out}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools List */}
                  <div>
                    <h4 className="font-display font-bold text-text-base mb-3 text-xs uppercase tracking-wider text-secondary">
                      Technologies & Libraries
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tools.map((tool) => (
                        <span
                          key={tool}
                          className="font-mono text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-sm border border-border-custom/50"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="mt-8 pt-6 border-t border-border-custom/50 flex flex-wrap gap-4">
                  {activeProject.githubLink !== "#" && activeProject.githubLink !== "" && (
                    <a
                      href={activeProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-border-custom bg-bg-card hover:bg-slate-50 dark:hover:bg-slate-800/30 text-text-base font-mono text-xs uppercase tracking-wider px-5 py-3 rounded-sm transition-all"
                    >
                      <Github className="w-4 h-4 text-secondary" />
                      Spatial Repository
                    </a>
                  )}

                  {activeProject.reportLink !== "#" && activeProject.reportLink !== "" && (
                    <a
                      href={activeProject.reportLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-secondary hover:bg-secondary/95 text-white font-mono text-xs uppercase tracking-wider px-5 py-3 rounded-sm transition-all shadow-md shadow-secondary/15"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {activeProject.reportLink.endsWith(".mp4") || activeProject.reportLink.endsWith(".webm") ? "Watch Sample Video" : "Project Report"}
                    </a>
                  )}

                  {activeProject.panelLink && activeProject.panelLink !== "" && (
                    <a
                      href={activeProject.panelLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-border-custom bg-bg-card hover:bg-slate-50 dark:hover:bg-slate-800/30 text-text-base font-mono text-xs uppercase tracking-wider px-5 py-3 rounded-sm transition-all"
                    >
                      <ExternalLink className="w-4 h-4 text-secondary" />
                      View Final Panel
                    </a>
                  )}

                  {activeProject.customLink && activeProject.customLink !== "" && (
                    <a
                      href={activeProject.customLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 border border-border-custom bg-bg-card hover:bg-slate-50 dark:hover:bg-slate-800/30 text-text-base font-mono text-xs uppercase tracking-wider px-5 py-3 rounded-sm transition-all"
                    >
                      <ExternalLink className="w-4 h-4 text-secondary" />
                      {activeProject.customLinkLabel || "External Link"}
                    </a>
                  )}

                  {activeProject.galleryLinks && activeProject.galleryLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleOpenGalleryItem(link.id)}
                      className="flex items-center gap-2 border border-secondary/35 bg-secondary/5 hover:bg-secondary/10 dark:hover:bg-secondary/20 text-secondary font-mono text-xs uppercase tracking-wider px-5 py-3 rounded-sm transition-all cursor-pointer shadow-md shadow-secondary/5 hover:shadow-secondary/10 hover:-translate-y-0.5 active:translate-y-0 duration-200"
                    >
                      <ExternalLink className="w-4 h-4 text-secondary" />
                      View {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
