"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Mail } from "lucide-react";
import portfolioData from "../../data/portfolioData.json";

export default function Hero() {
  const { profile } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };


  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-bg-base">
      {/* Background Animated Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--border-custom)_1px,transparent_1px),linear-gradient(90deg,var(--border-custom)_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none z-0 opacity-40 dark:opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 w-full z-10 py-12">
        
        {/* Left Side: Copywriting Content */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="text-secondary font-display text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
            variants={itemVariants}
          >
            Spatial Portfolio
          </motion.span>
          
          <motion.h1
            className="font-display font-black text-5xl md:text-7xl xl:text-8xl tracking-tight leading-[0.9] text-text-base flex flex-col mb-6"
            variants={itemVariants}
          >
            <span>PLANNING.</span>
            <span>DESIGNING.</span>
            <span className="text-text-muted">ANALYZING SPACE.</span>
          </motion.h1>
          
          <motion.h2
            className="font-display mb-6 flex flex-col gap-1"
            variants={itemVariants}
          >
            <span className="text-xl md:text-2xl font-bold tracking-wider text-text-base uppercase">
              {profile.name}
            </span>
            <span className="text-xs md:text-sm font-semibold tracking-[0.15em] text-secondary uppercase">
              {profile.title}
            </span>
          </motion.h2>
          
          <motion.p
            className="text-text-muted text-sm md:text-base leading-relaxed max-w-xl mb-10 font-light"
            variants={itemVariants}
          >
            {profile.introduction}
          </motion.p>
          
          {/* CTA Button Row */}
          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            <a
              href="#projects"
              className="group flex items-center gap-2 bg-secondary hover:bg-secondary/95 text-white font-display font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_20px_-6px_rgba(0,137,123,0.5)]"
            >
              View Projects
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
            
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-cv-modal"))}
              className="flex items-center gap-2 border border-border-custom bg-bg-card hover:bg-slate-50 dark:hover:bg-slate-800/20 text-text-base font-display text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm transition-all duration-300 hover:translate-y-[-2px] cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-secondary" />
              Download CV
            </button>
            
            <a
              href="#contact"
              className="flex items-center gap-2 border border-border-custom bg-bg-card hover:bg-slate-50 dark:hover:bg-slate-800/20 text-text-base font-display text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm transition-all duration-300 hover:translate-y-[-2px]"
            >
              <Mail className="w-3.5 h-3.5 text-secondary" />
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Spatial Imagery / Interactive Vector Graphic */}
        <motion.div
          className="lg:col-span-5 relative flex items-center justify-center min-h-[400px] lg:min-h-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main Visual Container */}
          <div className="relative w-full aspect-square max-w-[420px] lg:max-w-full overflow-hidden border border-border-custom rounded-lg bg-bg-card shadow-xl group">
            <img
              src={profile.profileImage}
              alt={profile.name}
              className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out select-none pointer-events-none group-hover:scale-105"
              loading="eager"
            />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
