"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, Layers, Terminal } from "lucide-react";
import portfolioData from "../../data/portfolioData.json";

export default function Skills() {
  const { skills } = portfolioData;
  const [activeTab, setActiveTab] = useState<"urbanPlanning" | "gisRemoteSensing" | "programmingDesign">("gisRemoteSensing");

  const tabItems = [
    { id: "gisRemoteSensing", label: "GIS & Remote Sensing", icon: <Layers className="w-4 h-4" /> },
    { id: "urbanPlanning", label: "Urban Planning", icon: <Compass className="w-4 h-4" /> },
    { id: "programmingDesign", label: "Programming & Design", icon: <Terminal className="w-4 h-4" /> }
  ] as const;

  const getActiveSkills = () => {
    switch (activeTab) {
      case "urbanPlanning":
        return skills.urbanPlanning;
      case "gisRemoteSensing":
        return skills.gisRemoteSensing;
      case "programmingDesign":
        return skills.programmingDesign;
    }
  };

  const activeSkillsList = getActiveSkills();

  return (
    <section id="skills" className="py-24 bg-bg-base border-b border-border-custom relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_90%,rgba(0,137,123,0.015),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-secondary font-display text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Competencies
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text-base tracking-tight">
            Professional Toolkit
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-4"></div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 bg-bg-card border border-border-custom p-2 rounded-lg shadow-sm">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 text-xs font-display uppercase tracking-wider px-5 py-3 rounded-sm border transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-secondary text-white border-secondary shadow-md shadow-secondary/15"
                  : "border-transparent hover:border-border-custom hover:bg-slate-50 dark:hover:bg-slate-800/20 text-text-muted"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Skills Grid with Progress Bars */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-bg-card border border-border-custom p-8 rounded-lg shadow-md"
        >
          {activeSkillsList.map((skill, idx) => (
            <div key={idx} className="space-y-2 select-none">
              <div className="flex justify-between items-center text-xs">
                <span className="font-display font-bold text-text-base text-sm">
                  {skill.name}
                </span>
                <span className="font-mono font-semibold text-secondary">
                  {skill.level}%
                </span>
              </div>
              
              {/* Progress track */}
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-border-custom/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-secondary to-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.05 }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Summary Footer */}
        <p className="text-center font-mono text-[10px] text-text-muted uppercase tracking-widest mt-12">
          Interactive Index &bull; Click tabs to filter spatial and software technologies.
        </p>
      </div>
    </section>
  );
}
