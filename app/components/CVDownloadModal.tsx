"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, X, ShieldAlert, Award } from "lucide-react";
import { getAssetPath } from "../utils/assetPath";

interface CVDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVDownloadModal({ isOpen, onClose }: CVDownloadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const logDownload = (viewerName: string, viewerEmail: string, viewerOrg: string) => {
    try {
      const historyStr = localStorage.getItem("cv_download_history") || "[]";
      const history = JSON.parse(historyStr);

      const logEntry = {
        id: Math.random().toString(36).substring(2, 9),
        name: viewerName || "Anonymous Recruiter",
        email: viewerEmail || "N/A",
        org: viewerOrg || "Unknown Org / Direct Visit",
        timestamp: new Date().toLocaleString(),
        browser: typeof navigator !== "undefined" ? navigator.userAgent.split(" ")[0] : "Unknown"
      };

      history.unshift(logEntry); // Add to the top
      localStorage.setItem("cv_download_history", JSON.stringify(history));

      // Trigger a custom event to notify DashboardStats to reload
      window.dispatchEvent(new CustomEvent("cv-download-logged"));
    } catch (e) {
      console.error("Failed to log download", e);
    }

    // Open PDF in a new tab
    window.open(getAssetPath("/cv.pdf"), "_blank");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !org.trim()) {
      setError("Please fill out all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    logDownload(name, email, org);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-bg-card border border-border-custom rounded-lg max-w-md w-full p-8 shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-text-base rounded-full border border-border-custom transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-md bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-text-base leading-tight">
            CV Access Analytics Portal
          </h3>
        </div>

        <p className="text-xs text-text-muted leading-relaxed font-light mb-6">
          To view and download Shahidh Saliheen&apos;s CV, please fill out your credentials. The download event is logged in the portfolio analytics dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="modal-name" className="font-display font-bold text-[10px] text-text-base uppercase tracking-wider">
              Your Name / Title
            </label>
            <input
              type="text"
              id="modal-name"
              placeholder="Jane Doe (Recruiter)"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="bg-bg-base/30 border border-border-custom rounded-sm px-3.5 py-2 text-xs text-text-base placeholder-text-muted/40 focus:outline-none focus:border-secondary transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="modal-org" className="font-display font-bold text-[10px] text-text-base uppercase tracking-wider">
              Organization
            </label>
            <input
              type="text"
              id="modal-org"
              placeholder="Urban Development Authority"
              value={org}
              onChange={(e) => {
                setOrg(e.target.value);
                setError("");
              }}
              className="bg-bg-base/30 border border-border-custom rounded-sm px-3.5 py-2 text-xs text-text-base placeholder-text-muted/40 focus:outline-none focus:border-secondary transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="modal-email" className="font-display font-bold text-[10px] text-text-base uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              id="modal-email"
              placeholder="recruitment@uda.lk"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className="bg-bg-base/30 border border-border-custom rounded-sm px-3.5 py-2 text-xs text-text-base placeholder-text-muted/40 focus:outline-none focus:border-secondary transition-all"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-500/5 border border-red-500/20 p-2.5 rounded-sm">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span className="text-[10px] font-mono leading-none">{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/95 text-white font-display font-bold text-xs uppercase tracking-wider py-3 rounded-sm transition-all shadow-md cursor-pointer"
            >
              Verify & Download CV
              <Download className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => logDownload("Anonymous Recruiter", "N/A", "Unknown Organization")}
              className="w-full text-center text-text-muted hover:text-text-base font-mono text-[10px] uppercase py-2 cursor-pointer transition-colors"
            >
              Skip & Access Anonymously
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
