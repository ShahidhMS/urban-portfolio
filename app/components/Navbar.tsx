"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Gallery", href: "#gallery" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-card/90 backdrop-blur-md border-b border-border-custom py-3 shadow-sm"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 select-none">
          <img
            src="/logo.png"
            alt="Shahidh Saliheen"
            className="h-10 w-auto object-contain mix-blend-multiply dark:invert dark:mix-blend-screen transition-all duration-300"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs font-display uppercase tracking-wider text-text-muted hover:text-secondary hover:translate-y-[-1px] transition-all duration-200"
            >
              {item.name}
            </a>
          ))}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-text-base rounded-full border border-border-custom transition-all duration-200 cursor-pointer"
            aria-label="Toggle light/dark mode"
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-accent" /> : <Moon className="w-3.5 h-3.5 text-primary" />}
          </button>
        </nav>

        {/* Mobile controls: Theme + Toggle Menu */}
        <div className="flex xl:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-text-base rounded-full border border-border-custom transition-all duration-200 cursor-pointer"
            aria-label="Toggle light/dark mode"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-primary" />}
          </button>

          <button
            className="text-text-base hover:text-secondary transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-[57px] left-0 w-full h-[calc(100vh-57px)] bg-bg-card/95 backdrop-blur-lg border-t border-border-custom transition-all duration-300 ease-in-out z-30 xl:hidden flex flex-col items-center justify-center gap-6 ${
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-base font-display uppercase tracking-widest text-text-base hover:text-secondary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.name}
          </a>
        ))}
      </div>
    </header>
  );
}
