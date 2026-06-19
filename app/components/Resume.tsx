"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, Download, FileCheck, GraduationCap } from "lucide-react";
import portfolioData from "../../data/portfolioData.json";

export default function Resume() {
  const { resume } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 90, damping: 14 }
    }
  };

  return (
    <section id="resume" className="py-24 bg-bg-base border-b border-border-custom relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,137,123,0.015),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-secondary font-display text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
              Curriculum Vitae
            </span>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-text-base tracking-tight">
              Education & Experience
            </h2>
            <div className="w-12 h-1 bg-secondary mt-4"></div>
          </div>
          
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-cv-modal"))}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white font-display text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_8px_20px_-6px_rgba(30,58,95,0.4)] cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download PDF CV
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Education & Experience Timeline (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Timeline wrapper */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative border-l border-border-custom pl-8 ml-4 space-y-12"
            >
              {/* Timeline Header - Education */}
              <div className="relative">
                <div className="absolute -left-[49px] top-0.5 w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-display font-black text-lg tracking-wider text-text-base uppercase mb-8 pl-1">
                  Academic Timeline
                </h3>
              </div>

              {resume.education.map((edu, idx) => (
                <motion.div key={idx} variants={itemVariants} className="relative group">
                  {/* Timeline node dot */}
                  <div className="absolute -left-[38px] top-1.5 w-3 h-3 rounded-full bg-bg-base border-2 border-primary group-hover:bg-primary transition-colors duration-200"></div>

                  <div className="glass-card p-6 border border-border-custom rounded-lg relative">
                    <span className="font-mono text-[10px] text-primary font-bold uppercase tracking-wider block mb-1">
                      {edu.period}
                    </span>
                    <h4 className="font-display font-bold text-base md:text-lg text-text-base mb-1">
                      {edu.degree}
                    </h4>
                    <div className="text-xs text-text-muted mb-3 font-semibold">
                      {edu.institution}
                    </div>
                    {edu.gpa && (
                      <div className="text-xs text-text-muted font-mono mb-2">
                        <span className="font-semibold text-secondary">GPA:</span> {edu.gpa}
                      </div>
                    )}
                    {edu.highlights && (
                      <p className="text-xs text-text-muted leading-relaxed font-light">
                        {edu.highlights}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Timeline Header - Experience */}
              <div className="relative pt-6">
                <div className="absolute -left-[49px] top-6.5 w-8 h-8 rounded-full bg-secondary/10 dark:bg-secondary/20 border border-secondary flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-secondary" />
                </div>
                <h3 className="font-display font-black text-lg tracking-wider text-text-base uppercase mb-8 pl-1">
                  Professional Experience
                </h3>
              </div>

              {resume.experience.map((exp, idx) => (
                <motion.div key={idx} variants={itemVariants} className="relative group">
                  {/* Timeline node dot */}
                  <div className="absolute -left-[38px] top-1.5 w-3 h-3 rounded-full bg-bg-base border-2 border-secondary group-hover:bg-secondary transition-colors duration-200"></div>

                  <div className="glass-card p-6 border border-border-custom rounded-lg relative">
                    <span className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider block mb-1">
                      {exp.period}
                    </span>
                    <h4 className="font-display font-bold text-base md:text-lg text-text-base mb-1">
                      {exp.role}
                    </h4>
                    <div className="text-xs text-text-muted mb-4 font-semibold">
                      {exp.organization}
                    </div>
                    <ul className="space-y-2 list-disc pl-4 text-xs text-text-muted font-light leading-relaxed">
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Certifications, Awards, Volunteering (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Certifications Card */}
            <div className="glass-card p-6 border border-border-custom rounded-lg relative">
              <div className="flex items-center gap-2 mb-6 border-b border-border-custom pb-4">
                <FileCheck className="w-5 h-5 text-secondary" />
                <h3 className="font-display font-bold text-sm tracking-wider uppercase text-text-base">
                  Certifications
                </h3>
              </div>
              <div className="space-y-4">
                {resume.certifications.map((cert, idx) => (
                  <div key={idx} className="text-xs">
                    <h4 className="font-semibold text-text-base leading-snug">{cert.name}</h4>
                    <p className="text-text-muted mt-0.5">{cert.issuer} &bull; {cert.date}</p>
                    {cert.credentialId && (
                      <p className="font-mono text-[10px] text-text-muted/60 mt-1 select-all">
                        ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Awards Card */}
            <div className="glass-card p-6 border border-border-custom rounded-lg relative">
              <div className="flex items-center gap-2 mb-6 border-b border-border-custom pb-4">
                <Award className="w-5 h-5 text-accent" />
                <h3 className="font-display font-bold text-sm tracking-wider uppercase text-text-base">
                  Honor & Awards
                </h3>
              </div>
              <div className="space-y-4">
                {resume.awards.map((award, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className="font-semibold text-text-base leading-snug">{award.name}</h4>
                      <span className="font-mono text-[9px] text-accent/80 font-bold flex-shrink-0 bg-accent/5 px-1 py-0.5 rounded-sm border border-accent/10">
                        {award.date}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-text-muted mb-2">{award.issuer}</p>
                    <p className="text-text-muted font-light leading-relaxed">{award.description}</p>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
