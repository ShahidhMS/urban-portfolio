"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Cpu, Eye, Globe, Download, X, Trash2 } from "lucide-react";
import portfolioData from "../../data/portfolioData.json";

interface DownloadLog {
  id: string;
  name: string;
  email: string;
  org: string;
  timestamp: string;
  browser: string;
}

export default function DashboardStats() {
  const stats = portfolioData.stats;
  const [downloadLogs, setDownloadLogs] = useState<DownloadLog[]>([]);
  const [isLogsOpen, setIsLogsOpen] = useState(false);

  const loadLogs = () => {
    try {
      const historyStr = localStorage.getItem("cv_download_history") || "[]";
      setDownloadLogs(JSON.parse(historyStr));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadLogs();
    }, 0);
    window.addEventListener("cv-download-logged", loadLogs);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("cv-download-logged", loadLogs);
    };
  }, []);

  const clearLogs = () => {
    localStorage.removeItem("cv_download_history");
    setDownloadLogs([]);
  };

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
    },
    {
      id: "downloads",
      label: "CV Downloads",
      value: `${downloadLogs.length} Hits`,
      icon: <Download className="w-4 h-4 text-accent" />,
      description: "Click to view analytics logs",
      isAction: true,
      onClick: () => setIsLogsOpen(true)
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
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {statItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              onClick={item.isAction ? item.onClick : undefined}
              className={`glass-card p-5 border border-border-custom rounded-lg relative overflow-hidden transition-all duration-300 group hover:-translate-y-1 ${
                item.isAction ? "cursor-pointer border-accent/25 hover:border-accent/50" : ""
              }`}
            >
              {/* Card top border glow on hover */}
              <div
                className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${
                  item.isAction ? "from-accent to-secondary" : "from-primary via-secondary to-accent"
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
              
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

      {/* Logs Table Modal Overlay */}
      <AnimatePresence>
        {isLogsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-bg-card border border-border-custom rounded-lg max-w-2xl w-full p-8 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLogsOpen(false)}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-text-base rounded-full border border-border-custom transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between gap-4 mb-6 border-b border-border-custom/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-accent/10 rounded-md border border-accent/20 text-accent">
                    <Download className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-text-base leading-tight">
                    CV Download Access Logs
                  </h3>
                </div>

                {downloadLogs.length > 0 && (
                  <button
                    onClick={clearLogs}
                    className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-mono border border-red-500/10 hover:border-red-500/25 px-3 py-1.5 rounded-sm transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear Logs
                  </button>
                )}
              </div>

              {/* Logs Content list */}
              <div className="max-h-[350px] overflow-y-auto pr-2 space-y-3 select-text font-mono text-[10px]">
                {downloadLogs.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-custom text-text-muted font-bold text-[9px] uppercase tracking-wider">
                        <th className="py-2.5">Recruiter / Viewer</th>
                        <th className="py-2.5">Organization</th>
                        <th className="py-2.5">Email</th>
                        <th className="py-2.5 text-right">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-custom/50">
                      {downloadLogs.map((log) => (
                        <tr key={log.id} className="text-text-base">
                          <td className="py-2.5 pr-2 font-semibold">{log.name}</td>
                          <td className="py-2.5 pr-2 text-text-muted">{log.org}</td>
                          <td className="py-2.5 pr-2 text-secondary">{log.email}</td>
                          <td className="py-2.5 text-right text-text-muted/70 text-[9px]">{log.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-12 text-text-muted">
                    <Download className="w-8 h-8 mx-auto mb-3 stroke-1 text-text-muted/40" />
                    <span>No download hits recorded in local storage history yet.</span>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-border-custom/50 pt-4 flex justify-between items-center text-[9px] text-text-muted uppercase tracking-widest font-mono">
                <span>Total Hits: {downloadLogs.length}</span>
                <span>CRS Index Mapped</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
