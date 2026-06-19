"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DashboardStats from "./components/DashboardStats";
import About from "./components/About";
import Skills from "./components/Skills";
import FeaturedProjects from "./components/FeaturedProjects";
import WorldMap from "./components/WorldMap";
import Showcase from "./components/Showcase";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import CVDownloadModal from "./components/CVDownloadModal";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsCVModalOpen(true);
    window.addEventListener("open-cv-modal", handleOpenModal);
    return () => window.removeEventListener("open-cv-modal", handleOpenModal);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen bg-bg-base text-text-base overflow-x-hidden selection:bg-secondary selection:text-white">
          {/* Navigation Bar */}
          <Navbar />

          <main>
            {/* Hero Section */}
            <Hero />

            {/* Dashboard Analytics Snapshot */}
            <DashboardStats />

            {/* About Me Section */}
            <About />

            {/* Core Competencies & Progress bars */}
            <Skills />

            {/* Featured Projects Grid */}
            <FeaturedProjects />

            {/* Project Locations Map Layer */}
            <section className="py-24 bg-bg-base border-b border-border-custom relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                  <span className="text-secondary font-display text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
                    Spatial Coordinates
                  </span>
                  <h2 className="font-display font-bold text-3xl md:text-5xl text-text-base tracking-tight">
                    Project Geographic Index
                  </h2>
                  <div className="w-12 h-1 bg-secondary mt-4"></div>
                </div>
                
                <WorldMap />
              </div>
            </section>

            {/* Maps & Visualizations Showcase Gallery */}
            <Showcase />

            {/* Experience & Education timeline */}
            <Resume />

            {/* Contact Details & Validate form */}
            <Contact />
          </main>

          {/* Footer details */}
          <Footer />

          {/* CV Download Analytics Modal */}
          <CVDownloadModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
        </div>
      )}
    </>
  );
}
