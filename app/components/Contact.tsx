"use client";

import { useState } from "react";
import { Mail, Phone, Send, AlertCircle, CheckCircle } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import portfolioData from "../../data/portfolioData.json";

export default function Contact() {
  const { profile } = portfolioData;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMsg("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      setStatus("error");
      setErrorMsg("Contact form key is not configured. Please add your Web3Forms Access Key in your .env.local file.");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          message: message,
          subject: `New Portfolio Message from ${name}`,
          from_name: "Shahidh Saliheen Portfolio"
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMsg(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Network error. Please check your internet connection.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-bg-base border-b border-border-custom relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,137,123,0.015),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-secondary font-display text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Engagement
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text-base tracking-tight">
            Start a Spatial Project
          </h2>
          <div className="w-12 h-1 bg-secondary mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-xl md:text-2xl text-text-base tracking-tight mb-4 leading-snug">
                Let&apos;s collaborate on sustainable, data-driven urban solutions.
              </h3>
              <p className="text-text-muted font-light text-xs md:text-sm leading-relaxed mb-8">
                Open to spatial modeling consultancy, remote sensing analyses, active transit auditing, and academic research partnerships. Reach out with your parameters and spatial boundaries.
              </p>
            </div>

            <div className="space-y-4">
              {/* Email Detail Card */}
              <div className="flex items-center gap-4 p-4 border border-border-custom bg-bg-card rounded-md hover:border-secondary/20 transition-all duration-300 shadow-sm">
                <div className="w-10 h-10 rounded-md bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block font-semibold">Direct Inquiry</span>
                  <a href={`mailto:${profile.email}`} className="text-xs md:text-sm font-semibold text-text-base hover:text-secondary transition-colors">
                    {profile.email}
                  </a>
                </div>
              </div>

              {/* Phone Detail Card */}
              {profile.phone && (
                <div className="flex items-center gap-4 p-4 border border-border-custom bg-bg-card rounded-md hover:border-secondary/20 transition-all duration-300 shadow-sm">
                  <div className="w-10 h-10 rounded-md bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block font-semibold">Phone Contact</span>
                    <a href={`tel:${profile.phone}`} className="text-xs md:text-sm font-semibold text-text-base hover:text-secondary transition-colors">
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Social Links Row */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 border border-border-custom bg-bg-card rounded-md hover:border-secondary/20 hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4 text-secondary" />
                  <span className="text-[11px] font-display font-bold text-text-base uppercase tracking-wider">LinkedIn</span>
                </a>

                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 border border-border-custom bg-bg-card rounded-md hover:border-secondary/20 hover:bg-slate-50 dark:hover:bg-slate-800/10 transition-all shadow-sm"
                >
                  <Github className="w-4 h-4 text-secondary" />
                  <span className="text-[11px] font-display font-bold text-text-base uppercase tracking-wider">GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 md:p-10 border border-border-custom rounded-lg shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-display font-bold text-xs text-text-base uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Sarah Jenkins"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      className="bg-bg-base/30 border border-border-custom rounded-sm px-4 py-3 text-xs md:text-sm text-text-base placeholder-text-muted/50 focus:outline-none focus:border-secondary focus:bg-bg-base/50 transition-all duration-200"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-display font-bold text-xs text-text-base uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="sarah@academic.edu"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      className="bg-bg-base/30 border border-border-custom rounded-sm px-4 py-3 text-xs md:text-sm text-text-base placeholder-text-muted/50 focus:outline-none focus:border-secondary focus:bg-bg-base/50 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-display font-bold text-xs text-text-base uppercase tracking-wider">
                    Message / Project Details
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Describe your spatial parameters, GIS modeling guidelines, or dataset types..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    className="bg-bg-base/30 border border-border-custom rounded-sm px-4 py-3 text-xs md:text-sm text-text-base placeholder-text-muted/50 focus:outline-none focus:border-secondary focus:bg-bg-base/50 transition-all duration-200"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/95 disabled:bg-secondary/50 disabled:cursor-not-allowed text-white font-display font-bold text-xs uppercase tracking-wider py-4 rounded-sm transition-all duration-300 shadow-md cursor-pointer"
                >
                  {status === "submitting" ? (
                    "Analyzing Parameters..."
                  ) : status === "success" ? (
                    "Inquiry Sent!"
                  ) : (
                    <>
                      Send Message
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                {/* Status Banners */}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-500/5 border border-red-500/25 p-3.5 rounded-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-[11px] font-mono leading-none">{errorMsg}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="flex items-center gap-2 text-secondary bg-secondary/5 border border-secondary/25 p-3.5 rounded-sm">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-[11px] font-mono leading-relaxed">
                      Coordinates sent. Your message was processed. I will reply to your email coordinates soon.
                    </span>
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
