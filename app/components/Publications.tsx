"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, ChevronDown, ChevronUp, ExternalLink, Presentation, Users } from "lucide-react";
import portfolioData from "../../data/portfolioData.json";

interface Publication {
  id: string;
  title: string;
  type: string;
  publisher: string;
  date: string;
  authors: string;
  abstract: string;
  link: string;
}

export default function Publications() {
  const publications = portfolioData.publications as unknown as Publication[];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Paper":
        return <BookOpen className="w-4 h-4 text-primary" />;
      case "Conference":
        return <Presentation className="w-4 h-4 text-secondary" />;
      default:
        return <BookOpen className="w-4 h-4 text-accent" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Paper":
        return (
          <span className="bg-primary/10 text-primary border border-primary/20 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm font-bold">
            Journal Paper
          </span>
        );
      case "Conference":
        return (
          <span className="bg-secondary/10 text-secondary border border-secondary/20 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm font-bold">
            Conference Talk
          </span>
        );
      default:
        return (
          <span className="bg-accent/10 text-accent border border-accent/20 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm font-bold">
            Technical Report
          </span>
        );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="publications" className="py-24 bg-bg-base border-b border-border-custom relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,137,123,0.015),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-secondary font-display text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Academic Index
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text-base tracking-tight">
            Research & Publications
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-4"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          {publications.map((pub) => {
            const isExpanded = expandedId === pub.id;
            return (
              <motion.div
                key={pub.id}
                variants={itemVariants}
                className="glass-card border border-border-custom rounded-lg overflow-hidden transition-all duration-300"
              >
                {/* Header panel */}
                <div
                  className="p-6 cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-colors duration-200"
                  onClick={() => toggleExpand(pub.id)}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(pub.type)}
                      {getTypeBadge(pub.type)}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-text-muted font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      {pub.date}
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base md:text-lg text-text-base leading-snug mb-3 hover:text-secondary transition-colors duration-200">
                    {pub.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-secondary" />
                      <span>{pub.authors}</span>
                    </div>
                    <div className="text-[11px] font-mono border-l border-border-custom pl-4">
                      {pub.publisher}
                    </div>
                  </div>

                  {/* Expand button bar */}
                  <div className="mt-4 flex items-center justify-between border-t border-border-custom/50 pt-3 text-xs text-secondary font-semibold font-mono">
                    <span className="flex items-center gap-1">
                      {isExpanded ? (
                        <>
                          Hide Abstract <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          View Abstract <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </span>

                    {pub.link !== "#" && (
                      <a
                        href={pub.link}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-text-muted hover:text-accent font-semibold transition-colors duration-200"
                      >
                        Source Link <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Abstract expandable body */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden bg-slate-50/50 dark:bg-slate-900/30 border-t border-border-custom/50"
                    >
                      <div className="p-6">
                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
                          Abstract / Summary
                        </h4>
                        <p className="text-xs text-text-muted leading-relaxed font-light text-justify">
                          {pub.abstract}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
