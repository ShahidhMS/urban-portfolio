"use client";

import { motion } from "framer-motion";
import { GraduationCap, Map, LayoutGrid, Box, Lightbulb } from "lucide-react";

export default function Snapshot() {
  const stats = [
    {
      icon: <GraduationCap className="w-5 h-5 text-emerald-accent" />,
      value: "B.Sc. (Hons)",
      label: "Town & Country Planning",
      desc: "First-class honors, environmental zoning focus",
    },
    {
      icon: <Map className="w-5 h-5 text-emerald-accent" />,
      value: "20+",
      label: "GIS & Spatial Projects",
      desc: "Advanced MCDA, network analysis, remote sensing",
    },
    {
      icon: <LayoutGrid className="w-5 h-5 text-emerald-accent" />,
      value: "15+",
      label: "Planning & Design Projects",
      desc: "Transit corridors, masterplans, zoning codes",
    },
    {
      icon: <Box className="w-5 h-5 text-emerald-accent" />,
      value: "5+",
      label: "3D City Models & Renders",
      desc: "Massing models, streetscapes, architectural viz",
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-emerald-accent" />,
      value: "100%",
      label: "Research-Driven Solutions",
      desc: "Policy reports, statistical modeling, datasets",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 80, damping: 15 },
    },
  };

  return (
    <section className="py-20 border-y border-white/5 bg-charcoal relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="glass-card p-6 border border-white/5 rounded-sm flex flex-col justify-between min-h-[180px] transition-all duration-300 group hover:translate-y-[-4px]"
              variants={cardVariants}
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-accent/30 group-hover:bg-emerald-accent/5 transition-colors duration-300">
                    {stat.icon}
                  </div>
                  <span className="font-mono text-[10px] text-stone-500 group-hover:text-emerald-accent/50 transition-colors">
                    0{idx + 1}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-2xl tracking-tight text-white mb-1">
                  {stat.value}
                </h3>
                
                <h4 className="font-display font-medium text-xs tracking-wider uppercase text-emerald-accent mb-2">
                  {stat.label}
                </h4>
              </div>
              
              <p className="text-stone-400 text-[11px] leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
