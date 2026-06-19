"use client";

import { motion } from "framer-motion";
import { BookOpen, Compass, Target, Award } from "lucide-react";
import portfolioData from "../../data/portfolioData.json";

export default function About() {
  const { profile } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="about" className="py-24 bg-bg-base border-b border-border-custom relative overflow-hidden">
      {/* Subtle backdrop accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_70%_30%,rgba(0,137,123,0.02),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-secondary font-display text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Profile Index
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text-base tracking-tight">
            About Me & Philosophy
          </h2>
          <div className="w-12 h-1 bg-secondary mt-4"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Column: Biography & Background */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-bold text-xl md:text-2xl text-text-base">
              Bridging the gap between traditional urban planning and spatial data science.
            </h3>
            
            <p className="text-text-muted text-sm md:text-base leading-relaxed font-light">
              {profile.bio}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-secondary/10 flex items-center justify-center border border-secondary/20">
                  <BookOpen className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-text-base mb-1">GIS Specialization</h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Applying advanced geospatial technologies to spatial analysis, land-use assessment, urban growth monitoring, site suitability modeling, and decision-support systems for planning and development.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center border border-accent/20">
                  <Compass className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-text-base mb-1">Sustainable Growth</h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Promoting sustainable urban development through strategic land-use planning, environmental stewardship, climate resilience, transit-oriented development, and equitable access to urban opportunities.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 border-l-4 border-secondary bg-slate-50 dark:bg-slate-800/40 rounded-r-md">
              <span className="font-mono text-[10px] tracking-wider text-secondary font-bold uppercase block mb-1">
                Urban Philosophy
              </span>
              <p className="text-xs text-text-muted leading-relaxed italic">
                &quot;{profile.philosophy}&quot;
              </p>
            </div>
          </motion.div>

          {/* Right Column: Key Metric cards */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
            {/* Academic Card */}
            <div className="glass-card p-6 border border-border-custom rounded-lg relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-primary/10 rounded-md border border-primary/20">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-display font-bold text-sm tracking-wider uppercase text-text-base">
                  Academic Highlights
                </h4>
              </div>
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                {profile.academicBackground}
              </p>
              <div className="flex items-center justify-between border-t border-border-custom pt-4 font-mono text-xs">
                <span className="text-text-muted">Cumulative GPA:</span>
                <span className="text-primary font-bold">{portfolioData.resume.education[0]?.gpa}</span>
              </div>
            </div>

            {/* Career Goals Card */}
            <div className="glass-card p-6 border border-border-custom rounded-lg relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-accent/10 rounded-md border border-accent/20">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <h4 className="font-display font-bold text-sm tracking-wider uppercase text-text-base">
                  Future Vision
                </h4>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                {profile.careerGoals}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
