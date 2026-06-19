import { ArrowUp, Mail, FileText } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import portfolioData from "../../data/portfolioData.json";

export default function Footer() {
  const { profile } = portfolioData;

  return (
    <footer className="bg-bg-card py-12 border-t border-border-custom relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-3 select-none">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Shahidh Saliheen"
              className="h-9 w-auto object-contain mix-blend-multiply dark:invert dark:mix-blend-screen transition-all duration-300"
            />
          </div>
          <p className="text-text-muted text-[10px] font-light tracking-wide text-center md:text-left">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved. Urbanist & Spatial Analyst.
          </p>
        </div>

        {/* Anchors */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-text-muted hover:text-secondary transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            Email
          </a>
          
          <a
            href={profile.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-text-muted hover:text-secondary transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>

          <a
            href={profile.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-text-muted hover:text-secondary transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            GitHub
          </a>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-cv-modal"))}
            className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-text-muted hover:text-secondary transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            CV
          </button>

          <a
            href="#home"
            className="w-8 h-8 rounded-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-border-custom flex items-center justify-center text-text-base hover:text-secondary transition-all duration-300 cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
}
