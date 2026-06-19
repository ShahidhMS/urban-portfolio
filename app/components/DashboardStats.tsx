"use client";

import { motion } from "framer-motion";
import { AreaChart, Cpu, Eye, Globe } from "lucide-react";
import portfolioData from "../../data/portfolioData.json";

export default function DashboardStats() {
  const stats = portfolioData.stats;

  const statItems = [
    {
      id: "projects",
      label: "Spatial Projects",
      value: stats.projectsCount,
      icon: <Globe className="w-4 h-4 text-primary" />,
      description: "GIS & Planning analyses"
    },
    {
      id: "area",
      label: "Mapped Area",
      value: stats.mappedArea,
      icon: <AreaChart className="w-4 h-4 text-secondary" />,
      description: "Satellite land classification"
    },
    {
      id: "hours",
      label: "Spatial Coding",
      value: stats.codingHours,
      icon: <Cpu className="w-4 h-4 text-accent" />,
      description: "Python, GEE & SQL scripts"
    },
    {
      id: "accuracy",
      label: "Accuracy Score",
      value: stats.accuracyScore,
      icon: <Eye className="w-4 h-4 text-secondary" />,
      description: "Random Forest ML models"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="py-12 bg-bg-base border-b border-border-custom relative overflow-hidden select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,137,123,0.02),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6"
        >
          {statItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="glass-card p-5 border border-border-custom rounded-lg relative overflow-hidden transition-all duration-300 group hover:-translate-y-1"
            >
              {/* Card top border glow on hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[9px] tracking-wider text-text-muted uppercase font-bold">
                  {item.label}
                </span>
                <div className="p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-md border border-border-custom group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-display font-black text-xl md:text-2xl tracking-tight mb-0.5">
                  {item.value}
                </span>
                <span className="text-[10px] text-text-muted leading-tight">
                  {item.description}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
