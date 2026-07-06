"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Send,
  X,
  Briefcase,
  User,
  MapPin,
  Sparkles,
  Layers,
  GraduationCap,
  FileText,
  ArrowRight,
  Bot,
  Play,
  CheckCircle,
  RefreshCw,
  Search,
  Phone,
  HelpCircle,
  BookOpen
} from "lucide-react";
import portfolioData from "../../data/portfolioData.json";

interface Message {
  id: string;
  type: "user" | "bot";
  text: string;
  time: string;
  isWidget?: boolean;
  widgetType?: "recruiter" | "skill_match" | "interview" | "nav_suggestions" | "timeline";
  widgetData?: any;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [currentMode, setCurrentMode] = useState<"normal" | "recruiter" | "interview" | "skill_match">("normal");
  const [interviewStep, setInterviewStep] = useState(0);
  const [jdText, setJdText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Helper to format markdown bold text
  const formatText = (text: string) => {
    if (!text) return "";
    const parts = text.split("**");
    return parts.map((part, index) => 
      index % 2 === 1 ? (
        <strong key={index} className="font-semibold text-text-base">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          type: "bot",
          text: "👋 Welcome! I'm Shahidh AI.\n\nI'm your guide to Shahidh Saliheen's professional portfolio. Whether you're a recruiter, researcher, client, or fellow student, I can help you explore his projects, technical expertise, research, and professional experience.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isWidget: true,
          widgetType: "nav_suggestions"
        }
      ]);
    }
  }, [messages]);

  // Handle system actions
  const triggerAction = (action: string) => {
    switch (action) {
      case "download_cv":
        window.dispatchEvent(new CustomEvent("open-cv-modal"));
        break;
      case "open_linkedin":
        window.open("https://www.linkedin.com/in/shahidh-saliheen", "_blank");
        break;
      case "scroll_about":
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "scroll_skills":
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "scroll_projects":
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "scroll_resume":
        document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "scroll_contact":
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  // Match queries dynamically against portfolioData database
  const parseQueryAndAnswer = (query: string): { text: string; mode?: string; isWidget?: boolean; wType?: "recruiter" | "skill_match" | "interview" | "nav_suggestions" | "timeline"; wData?: any } => {
    const q = query.toLowerCase().trim();

    // Check modes first
    if (q.includes("interview") || q.includes("mock") || q.includes("test me")) {
      setInterviewStep(1);
      setCurrentMode("interview");
      return {
        text: "🎯 **Welcome to Mock Interview Mode!**\n\nI will ask you 3 typical planning & GIS questions to evaluate your fit. Let's start:\n\n**Question 1: Can you explain a GIS project you worked on and the methodologies you applied?**",
        mode: "interview"
      };
    }

    if (q.includes("job description") || q.includes("jd") || q.includes("matcher") || q.includes("match")) {
      setCurrentMode("skill_match");
      return {
        text: "📋 **Welcome to the Skill Matcher!**\n\nPlease paste the requirements or text of your Job Description (JD) below, and I will analyze how my skills and experience match it.",
        mode: "skill_match",
        isWidget: true,
        wType: "skill_match"
      };
    }

    if (q.includes("hiring") || q.includes("recruiting") || q.includes("recruiter") || q.includes("job opening")) {
      setCurrentMode("recruiter");
      return {
        text: "🏢 **Recruiter Mode Activated!**\n\nBased on your role, here is a custom summary of why I may be a strong fit for your team:",
        mode: "recruiter",
        isWidget: true,
        wType: "recruiter"
      };
    }

    // Dynamic Search in Projects
    const projects = portfolioData.projects;
    let matchedProject = null;
    let maxProjectScore = 0;

    for (const proj of projects) {
      let score = 0;
      const titleTokens = proj.title.toLowerCase().split(/\s+/);
      const descTokens = proj.description.toLowerCase().split(/\s+/);
      const idTokens = proj.id.toLowerCase().split("-");
      const categoryTokens = proj.category.toLowerCase().split(/\s+/);
      const toolsTokens = proj.tools.map(t => t.toLowerCase());

      const queryWords = q.split(/\s+/);
      queryWords.forEach(word => {
        if (word.length < 3) return;
        if (titleTokens.some(t => t.includes(word))) score += 4;
        if (idTokens.some(t => t.includes(word))) score += 5;
        if (descTokens.some(t => t.includes(word))) score += 2;
        if (categoryTokens.some(t => t.includes(word))) score += 3;
        if (toolsTokens.some(t => t.includes(word) || word.includes(t))) score += 3;
      });

      // Special exact phrase boosts
      if (proj.id === "groundwater-recharge" && (q.includes("groundwater") || q.includes("ground water") || q.includes("water"))) {
        score += 20;
      }
      if (proj.id === "pettah-urban-regeneration" && (q.includes("pettah") || q.includes("regeneration"))) {
        score += 20;
      }
      if (proj.id === "nighttime-food-culture" && (q.includes("night") || q.includes("food") || q.includes("economy"))) {
        score += 20;
      }
      if (proj.id === "traffic-analysis-yolo" && (q.includes("traffic") || q.includes("yolo") || q.includes("computer vision"))) {
        score += 20;
      }
      if (proj.id === "human-elephant-conflict" && (q.includes("elephant") || q.includes("hec") || q.includes("mitigation"))) {
        score += 20;
      }
      if (proj.id === "nuwara-eliya-heritage-planning" && (q.includes("nuwara") || q.includes("eliya") || q.includes("heritage"))) {
        score += 20;
      }
      if (proj.id === "trincomalee-local-plan" && (q.includes("trinco") || q.includes("trincomalee") || q.includes("local plan"))) {
        score += 20;
      }

      if (score > maxProjectScore && score >= 3) {
        maxProjectScore = score;
        matchedProject = proj;
      }
    }

    if (matchedProject) {
      const p = matchedProject;
      let reply = `🗺️ **Project Case Study: ${p.title}**\n\n`;
      reply += `**Category**: ${p.category}\n\n`;
      reply += `**Overview**:\n${p.description}\n\n`;
      reply += `**Methodology & Tools**:\n` + p.tools.map((t: string) => `• ${t}`).join("\n") + `\n\n`;
      reply += `**Key Outcomes**:\n` + p.outcomes.map((o: string) => `• ${o}`).join("\n") + `\n\n`;
      if (p.stats && p.stats.datasets) {
        reply += `**Datasets Used**:\n${p.stats.datasets}\n\n`;
      }
      return {
        text: reply,
        isWidget: true,
        wType: "nav_suggestions",
        wData: { reportUrl: p.reportLink, id: p.id }
      };
    }

    // Dynamic Search in Professional Experience
    const experiences = portfolioData.resume.experience;
    let matchedExp = null;
    let maxExpScore = 0;

    for (const exp of experiences) {
      let score = 0;
      const org = exp.organization.toLowerCase();
      const role = exp.role.toLowerCase();

      if (q.includes(org) || org.includes(q)) score += 10;
      if (q.includes(role) || role.includes(q)) score += 5;
      
      if (org.includes("eml") && q.includes("eml")) score += 15;
      if (org.includes("global gis") && (q.includes("global") || q.includes("gis"))) score += 15;
      if (org.includes("aida") && q.includes("aida")) score += 15;

      if (score > maxExpScore && score >= 5) {
        maxExpScore = score;
        matchedExp = exp;
      }
    }

    if (matchedExp) {
      const e = matchedExp;
      let reply = `💼 **Professional Role: ${e.role}**\n`;
      reply += `**Organization**: ${e.organization}\n`;
      reply += `**Duration**: ${e.period}\n\n`;
      reply += `**Key Responsibilities**:\n` + e.description.map((d: string) => `• ${d}`).join("\n");
      return {
        text: reply
      };
    }

    // Dynamic Search in Skills
    const rsSkills = portfolioData.skills.gisRemoteSensing.map(s => s.name.toLowerCase());
    const upSkills = portfolioData.skills.urbanPlanning.map(s => s.name.toLowerCase());
    const pdSkills = portfolioData.skills.programmingDesign.map(s => s.name.toLowerCase());
    const allSkills = [...rsSkills, ...upSkills, ...pdSkills];
    
    let matchedSkill = "";
    for (const s of allSkills) {
      if (q.includes(s) || s.includes(q)) {
        matchedSkill = s;
        break;
      }
    }

    if (matchedSkill) {
      let category = "";
      let level = 90;
      
      const rsMatch = portfolioData.skills.gisRemoteSensing.find(s => s.name.toLowerCase() === matchedSkill);
      const upMatch = portfolioData.skills.urbanPlanning.find(s => s.name.toLowerCase() === matchedSkill);
      const pdMatch = portfolioData.skills.programmingDesign.find(s => s.name.toLowerCase() === matchedSkill);

      if (rsMatch) { category = "GIS & Remote Sensing"; level = rsMatch.level; }
      else if (upMatch) { category = "Urban Planning & Design"; level = upMatch.level; }
      else if (pdMatch) { category = "Programming & Design Tools"; level = pdMatch.level; }

      let reply = `📊 **Technical Skill: ${matchedSkill.toUpperCase()}**\n\n`;
      reply += `**Category**: ${category}\n`;
      reply += `**Proficiency**: ${level}%\n\n`;
      
      const relatedProjects = projects.filter(p => 
        p.tools.some(t => t.toLowerCase().includes(matchedSkill) || matchedSkill.includes(t.toLowerCase()))
      );

      if (relatedProjects.length > 0) {
        reply += `**Applied in Projects**:\n` + relatedProjects.map(p => `• **${p.title}** (${p.category})`).join("\n");
      }

      return {
        text: reply
      };
    }

    // Specific FAQ or conceptual checks
    if (q.includes("gwr") || q.includes("geographically weighted")) {
      return {
        text: "📊 **Geographically Weighted Regression (GWR)** is a spatial statistical modeling technique I used in my **Night-Time Food Culture Research**.\n\nUnlike standard regression models that assume relationships are constant across space, GWR calculates local coefficients to capture how relationships vary geographically across different neighborhoods of Colombo."
      };
    }
    if (q.includes("sccm") || q.includes("coupling")) {
      return {
        text: "🔗 **Spatial Coupling Coordination Model (SCCM)** is an analytical model I applied in my undergraduate research to evaluate the level of coordination and interaction between night-time food activity nodes and transport network accessibility in Colombo."
      };
    }

    // Static matches fallback
    if (q.includes("who are you") || q.includes("about") || q.includes("tell me about yourself")) {
      return {
        text: "I am Shahidh Saliheen, an Urban Planning graduate from the University of Moratuwa. I specialize in integrating traditional urban planning with GIS, Remote Sensing, Spatial Analytics, and urban data science. My goal is to create sustainable, resilient, and data-driven solutions for cities."
      };
    }

    if (q.includes("education") || q.includes("university") || q.includes("gpa")) {
      return {
        text: "🎓 **Education Profile**:\n\n• **Degree**: Bachelor of Science (Honours) in Urban Informatics and Planning\n• **Institution**: University of Moratuwa\n• **Duration**: April 2022 – May 2026\n• **CGPA**: 3.81 / 4.20 (First Class Standing)\n• **Achievements**: Dean's List recipient in 5 semesters (L1S1, L1S2, L2S3, L3S5, L4S7)"
      };
    }

    if (q.includes("timeline") || q.includes("journey") || q.includes("career") || q.includes("experience")) {
      return {
        text: "Here is a brief timeline of my professional journey:",
        isWidget: true,
        wType: "timeline"
      };
    }

    if (q.includes("cv") || q.includes("resume") || q.includes("download")) {
      setTimeout(() => triggerAction("download_cv"), 1000);
      return {
        text: "Opening the CV download modal for you right now! Let me know if you would like me to summarize my experience or technical skills."
      };
    }

    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("linkedin")) {
      return {
        text: "You can reach me directly via:\n\n• **Email**: msshahidh30701@gmail.com\n• **LinkedIn**: [linkedin.com/in/shahidh-saliheen](https://www.linkedin.com/in/shahidh-saliheen)\n\nAlternatively, I can scroll you down to the contact form. Shall I do that?",
        isWidget: true,
        wType: "nav_suggestions",
        wData: "contact"
      };
    }

    return {
      text: "I don't currently have specific details about that in my portfolio records. However, I can help you explore my:\n\n• **GIS & Remote Sensing projects**\n• **Undergraduate Research**\n• **Professional Timeline**\n• **Core Skills**\n\nWould you like me to guide you to one of these?",
      isWidget: true,
      wType: "nav_suggestions"
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      type: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      // Handle modes
      if (currentMode === "interview") {
        let replyText = "";
        if (interviewStep === 1) {
          replyText = "Excellent answer. Demonstrating specific tools (like QGIS/ArcGIS) and how they relate to the spatial methodology is exactly what hiring managers seek.\n\n**Question 2: How do you balance heritage conservation with modern commercial needs in your urban regeneration projects?**";
          setInterviewStep(2);
        } else if (interviewStep === 2) {
          replyText = "Spot on. Adaptive reuse and public realm integration are critical for heritage longevity. Let's finish with:\n\n**Question 3: Why are you interested in specializing in Urban Informatics over traditional planning?**";
          setInterviewStep(3);
        } else {
          replyText = "Fantastic mock interview! You demonstrated strong planning concepts, clear expression of methodologies, and practical technology application. Excellent work.\n\nI have switched back to normal mode. Feel free to ask any other questions!";
          setCurrentMode("normal");
          setInterviewStep(0);
        }

        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            type: "bot",
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        return;
      }

      // Normal parsing
      const result = parseQueryAndAnswer(text);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: "bot",
          text: result.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isWidget: result.isWidget,
          widgetType: result.wType,
          widgetData: result.wData
        }
      ]);
    }, 1000);
  };

  const handleJDSubmit = () => {
    if (!jdText.trim()) return;

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const textLower = jdText.toLowerCase();

      // Simple keyword matching for JD requirements
      const skillsChecked = [
        { name: "ArcGIS Pro / QGIS", match: textLower.includes("gis") || textLower.includes("arcgis") || textLower.includes("qgis") || textLower.includes("mapping") },
        { name: "Urban Planning", match: textLower.includes("planning") || textLower.includes("urban") || textLower.includes("development") },
        { name: "Python / R", match: textLower.includes("python") || textLower.includes(" r ") || textLower.includes("programming") || textLower.includes("analytics") },
        { name: "Remote Sensing / Drone Mapping", match: textLower.includes("remote") || textLower.includes("satellite") || textLower.includes("drone") || textLower.includes("uav") || textLower.includes("lidar") },
        { name: "SQL Databases", match: textLower.includes("sql") || textLower.includes("database") || textLower.includes("query") }
      ];

      const matchedCount = skillsChecked.filter(s => s.match).length;
      const matchPercentage = Math.round((matchedCount / skillsChecked.length) * 100);

      const botReply: Message = {
        id: Math.random().toString(),
        type: "bot",
        text: `📊 **Job Description Match Analysis**\n\nOverall Match: **${matchPercentage}%**\n\nHere is how my background aligns with your JD requirements:`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isWidget: true,
        widgetType: "skill_match",
        widgetData: { percentage: matchPercentage, skills: skillsChecked }
      };

      setMessages((prev) => [...prev, botReply]);
      setJdText("");
      setCurrentMode("normal");
    }, 1200);
  };

  const selectPersona = (persona: "recruiter" | "client" | "student" | "general") => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let text = "";
      let wType: any = undefined;

      if (persona === "recruiter") {
        setCurrentMode("recruiter");
        text = "🏢 **Welcome Recruiter!**\n\nI have adapted the digital office to highlight my professional experience, core software, and deliverables. Here is a custom summary:";
        wType = "recruiter";
      } else if (persona === "client") {
        text = "🤝 **Welcome Prospective Client / Collaborator!**\n\nI specialize in providing spatial analysis consultancy, land-use planning studies, drone mapping, and technical reporting. Let me know what planning challenges you are looking to solve, or ask me about similar client projects I have delivered.";
        wType = "nav_suggestions";
      } else if (persona === "student") {
        text = "🎓 **Hello Fellow Student!**\n\nI am glad you are exploring my portfolio. I love sharing spatial resources, discussing research methods, or providing tips on learning QGIS/ArcGIS Pro. Let me know what you are working on!";
        wType = "nav_suggestions";
      } else {
        text = "👋 Feel free to look around! I can show you my timeline, map of project locations, or guide you to my featured projects.";
        wType = "nav_suggestions";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: "bot",
          text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isWidget: true,
          widgetType: wType
        }
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 bg-secondary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-secondary/25 transition-all duration-300 hover:scale-105 cursor-pointer border border-teal-500/20 group"
          aria-label="Open AI Portfolio Assistant"
        >
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-400 rounded-full border-2 border-bg-base animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-400 rounded-full border-2 border-bg-base"></span>
          <MessageSquare className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
        </button>
      </div>

      {/* Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-[420px] h-[600px] bg-bg-card/95 border border-border-custom rounded-2xl shadow-2xl backdrop-blur-md flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-bg-base border-b border-border-custom flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary relative">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-bg-card"></span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-text-base">Shahidh's AI Assistant</h3>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-text-muted">Digital Twin Assistant</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {currentMode !== "normal" && (
                  <button 
                    onClick={() => {
                      setCurrentMode("normal");
                      setInterviewStep(0);
                    }}
                    className="p-1.5 hover:bg-bg-card rounded-md text-text-muted hover:text-text-base transition-colors"
                    title="Exit specialized mode"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-bg-card rounded-md text-text-muted hover:text-text-base transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 select-none">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  <div className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 text-xs md:text-sm shadow-sm leading-relaxed whitespace-pre-wrap ${
                        msg.type === "user"
                          ? "bg-secondary text-white rounded-br-none"
                          : "bg-bg-base border border-border-custom text-text-base rounded-bl-none font-light"
                      }`}
                    >
                      {formatText(msg.text)}

                      {/* Render custom widgets */}
                      {msg.isWidget && msg.widgetType === "nav_suggestions" && (
                        <div className="mt-4 pt-3 border-t border-border-custom/50 flex flex-col gap-2">
                          {msg.widgetData && msg.widgetData.reportUrl ? (
                            <>
                              <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Project Actions</p>
                              <div className="flex flex-wrap gap-1.5">
                                <button 
                                  onClick={() => window.open(msg.widgetData.reportUrl.startsWith('/') ? `/urban-portfolio${msg.widgetData.reportUrl}` : msg.widgetData.reportUrl, "_blank")} 
                                  className="text-[11px] bg-secondary text-white font-semibold px-2.5 py-1.5 rounded-md hover:bg-secondary/90 transition-all cursor-pointer flex items-center gap-1"
                                >
                                  📄 Open Report
                                </button>
                                <button 
                                  onClick={() => {
                                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                                  }} 
                                  className="text-[11px] bg-bg-card border border-border-custom hover:border-secondary px-2.5 py-1.5 rounded-md text-text-base transition-all cursor-pointer"
                                >
                                  🏙️ View in Projects Grid
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Suggested Prompts</p>
                              <div className="flex flex-wrap gap-1.5">
                                <button onClick={() => handleSendMessage("Tell me about your GIS experience")} className="text-[11px] bg-bg-card border border-border-custom hover:border-secondary px-2.5 py-1.5 rounded-md text-text-base transition-all cursor-pointer">🗺️ GIS Experience</button>
                                <button onClick={() => handleSendMessage("Explain your Night-time Food Research")} className="text-[11px] bg-bg-card border border-border-custom hover:border-secondary px-2.5 py-1.5 rounded-md text-text-base transition-all cursor-pointer">📚 Food Research</button>
                                <button onClick={() => handleSendMessage("Show Pettah Regeneration Project")} className="text-[11px] bg-bg-card border border-border-custom hover:border-secondary px-2.5 py-1.5 rounded-md text-text-base transition-all cursor-pointer">🏙️ Pettah Project</button>
                                <button onClick={() => handleSendMessage("Show professional timeline")} className="text-[11px] bg-bg-card border border-border-custom hover:border-secondary px-2.5 py-1.5 rounded-md text-text-base transition-all cursor-pointer">💼 Experience Timeline</button>
                                <button onClick={() => triggerAction("download_cv")} className="text-[11px] bg-bg-card border border-border-custom hover:border-secondary px-2.5 py-1.5 rounded-md text-text-base transition-all cursor-pointer">📄 Download CV</button>
                                <button onClick={() => triggerAction("scroll_contact")} className="text-[11px] bg-bg-card border border-border-custom hover:border-secondary px-2.5 py-1.5 rounded-md text-text-base transition-all cursor-pointer">📞 Contact Details</button>
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      {msg.isWidget && msg.widgetType === "recruiter" && (
                        <div className="mt-4 space-y-3 bg-bg-card border border-border-custom/80 p-3 rounded-lg">
                          <div className="space-y-1.5 text-xs text-text-base">
                            <div className="flex items-center gap-2"><span className="text-secondary">✔</span> 4+ Years Academic & Industry GIS Expertise</div>
                            <div className="flex items-center gap-2"><span className="text-secondary">✔</span> Hands-on UAV Drone Surveying & Photogrammetry</div>
                            <div className="flex items-center gap-2"><span className="text-secondary">✔</span> Strong Spatial Stats & Modelling (GWR, SCCM, MCDM)</div>
                            <div className="flex items-center gap-2"><span className="text-secondary">✔</span> Experience at EML Consultants & Global GIS</div>
                          </div>
                          <div className="flex gap-2 pt-2 border-t border-border-custom/50">
                            <button onClick={() => triggerAction("download_cv")} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-secondary text-white text-[10px] uppercase font-semibold tracking-wider rounded-md hover:bg-secondary/90 transition-colors cursor-pointer">
                              <FileText className="w-3 h-3" /> Get Resume
                            </button>
                            <button onClick={() => triggerAction("scroll_contact")} className="flex-1 py-2 border border-border-custom bg-bg-base text-[10px] uppercase font-semibold tracking-wider rounded-md text-text-base hover:border-secondary/30 transition-colors cursor-pointer">
                              Email Shahidh
                            </button>
                          </div>
                        </div>
                      )}

                      {msg.isWidget && msg.widgetType === "skill_match" && msg.widgetData && (
                        <div className="mt-4 space-y-3 bg-bg-card border border-border-custom/80 p-3 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-text-muted">JD Fit Score</span>
                            <span className={`text-sm font-bold ${msg.widgetData.percentage > 70 ? 'text-green-500' : 'text-yellow-500'}`}>{msg.widgetData.percentage}% Match</span>
                          </div>
                          
                          <div className="space-y-2">
                            {msg.widgetData.skills.map((skill: any, sIdx: number) => (
                              <div key={sIdx} className="flex items-center justify-between text-xs">
                                <span className="font-light text-text-muted">{skill.name}</span>
                                <span className={skill.match ? "text-green-500 font-semibold" : "text-text-muted"}>{skill.match ? "✓ Matches" : "—"}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {msg.isWidget && msg.widgetType === "timeline" && (
                        <div className="mt-4 space-y-3 pl-2 border-l border-secondary/30">
                          <div className="relative pl-4">
                            <div className="absolute left-[-13px] top-1 w-2 h-2 rounded-full bg-secondary"></div>
                            <span className="text-[10px] font-mono text-secondary font-bold">2026</span>
                            <p className="text-xs font-semibold text-text-base">Assistant Project Manager</p>
                            <p className="text-[10px] text-text-muted">EML Consultants PLC</p>
                          </div>
                          <div className="relative pl-4">
                            <div className="absolute left-[-13px] top-1 w-2 h-2 rounded-full bg-secondary"></div>
                            <span className="text-[10px] font-mono text-secondary font-bold">2025</span>
                            <p className="text-xs font-semibold text-text-base">GIS & Drone Specialist (Assistant & Intern)</p>
                            <p className="text-[10px] text-text-muted">Global GIS (Pvt) Ltd</p>
                          </div>
                          <div className="relative pl-4">
                            <div className="absolute left-[-13px] top-1 w-2 h-2 rounded-full bg-secondary"></div>
                            <span className="text-[10px] font-mono text-secondary font-bold">2023 - Present</span>
                            <p className="text-xs font-semibold text-text-base">Freelance Urban Designer</p>
                            <p className="text-[10px] text-text-muted">Masterplans, 3D Renderings & Concepts</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className={`text-[10px] text-text-muted ${msg.type === "user" ? "text-right" : "text-left"}`}>{msg.time}</p>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-bg-base border border-border-custom text-text-muted rounded-xl rounded-bl-none px-4 py-3 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Persona Setup Selector when messages is short */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 pb-2">
                <div className="bg-bg-base border border-border-custom rounded-xl p-3">
                  <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-2 text-center">Customize Your Experience</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button onClick={() => selectPersona("recruiter")} className="text-[10px] py-1.5 bg-bg-card hover:border-secondary border border-border-custom rounded text-text-base transition-colors flex items-center justify-center gap-1 cursor-pointer">🏢 Recruiter</button>
                    <button onClick={() => selectPersona("client")} className="text-[10px] py-1.5 bg-bg-card hover:border-secondary border border-border-custom rounded text-text-base transition-colors flex items-center justify-center gap-1 cursor-pointer">🤝 Client</button>
                    <button onClick={() => selectPersona("student")} className="text-[10px] py-1.5 bg-bg-card hover:border-secondary border border-border-custom rounded text-text-base transition-colors flex items-center justify-center gap-1 cursor-pointer">🎓 Student</button>
                    <button onClick={() => selectPersona("general")} className="text-[10px] py-1.5 bg-bg-card hover:border-secondary border border-border-custom rounded text-text-base transition-colors flex items-center justify-center gap-1 cursor-pointer">👀 Browser</button>
                  </div>
                </div>
              </div>
            )}

            {/* Specialized Input for Skill Matcher */}
            {currentMode === "skill_match" ? (
              <div className="p-4 border-t border-border-custom bg-bg-base space-y-2">
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste Job Description text here..."
                  className="w-full h-20 p-2.5 text-xs bg-bg-card border border-border-custom rounded-md text-text-base focus:border-secondary outline-none resize-none"
                />
                <div className="flex gap-2">
                  <button onClick={() => setCurrentMode("normal")} className="flex-1 py-2 text-xs bg-bg-card border border-border-custom rounded text-text-muted hover:text-text-base transition-colors cursor-pointer">Cancel</button>
                  <button onClick={handleJDSubmit} className="flex-1 py-2 text-xs bg-secondary text-white rounded font-semibold hover:bg-secondary/90 transition-colors cursor-pointer">Match Skills</button>
                </div>
              </div>
            ) : (
              /* Footer Input Box */
              <div className="p-4 border-t border-border-custom bg-bg-base flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={currentMode === "interview" ? "Type your answer..." : "Ask me anything..."}
                  className="flex-1 px-3 py-2 text-xs bg-bg-card border border-border-custom rounded-md text-text-base placeholder-text-muted outline-none focus:border-secondary"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="px-3.5 bg-secondary text-white rounded-md flex items-center justify-center hover:bg-secondary/90 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
