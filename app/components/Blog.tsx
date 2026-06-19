"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, Clock, Search, X } from "lucide-react";
import portfolioData from "../../data/portfolioData.json";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  content: string;
}

export default function Blog() {
  const posts = portfolioData.blog as unknown as BlogPost[];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-24 bg-bg-base border-b border-border-custom relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(0,137,123,0.015),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-secondary font-display text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
            Spatial Notebook
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text-base tracking-tight">
            GIS & Planning Insights
          </h2>
          <div className="w-12 h-1 bg-secondary mt-4"></div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center bg-bg-card border border-border-custom p-4 rounded-lg shadow-sm">
          {/* Categories Tab Row */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-display uppercase tracking-wider px-4 py-2 rounded-sm border transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-secondary text-white border-secondary shadow-md shadow-secondary/15"
                    : "border-border-custom hover:border-secondary hover:bg-slate-50 dark:hover:bg-slate-800/20 text-text-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-xs flex-shrink-0">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2 bg-bg-base border border-border-custom rounded-sm text-text-base placeholder-text-muted/60 focus:outline-none focus:border-secondary transition-all"
            />
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                layoutId={`blog-${post.id}`}
                onClick={() => setActivePost(post)}
                className="glass-card p-6 border border-border-custom rounded-lg flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4 font-mono text-[9px] uppercase tracking-wider text-text-muted">
                    <span className="text-secondary font-bold bg-secondary/5 px-2 py-0.5 rounded-sm border border-secondary/10">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base md:text-lg text-text-base mb-3 leading-snug group-hover:text-secondary transition-colors duration-200">
                    {post.title}
                  </h3>

                  <p className="text-xs text-text-muted leading-relaxed font-light mb-6 line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[8px] px-1.5 py-0.5 rounded-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-border-custom/50 pt-3 flex items-center justify-between text-xs font-mono text-secondary font-semibold">
                    <span>Read Full Post &rarr;</span>
                    <div className="flex items-center gap-1.5 text-text-muted font-normal text-[10px]">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-10 h-10 text-text-muted mx-auto mb-4 stroke-1" />
            <p className="text-sm text-text-muted font-light">
              No articles found matching search query or filters.
            </p>
          </div>
        )}
      </div>

      {/* Expanded Article Modal Overlay */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              layoutId={`blog-${activePost.id}`}
              className="bg-bg-card border border-border-custom rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-text-base rounded-full border border-border-custom transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 mb-4 font-mono text-[10px] uppercase tracking-wider text-text-muted border-b border-border-custom/50 pb-4">
                  <span className="text-secondary font-bold">{activePost.category}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {activePost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {activePost.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-black text-xl md:text-2xl text-text-base leading-snug mb-6">
                  {activePost.title}
                </h3>

                {/* Content body */}
                <div className="text-sm text-text-muted leading-relaxed font-light space-y-4 text-justify select-text">
                  <p className="text-text-base font-medium italic mb-4">
                    {activePost.summary}
                  </p>
                  <div className="border-t border-border-custom/30 pt-4">
                    {activePost.content}
                  </div>
                </div>

                {/* Tags row */}
                <div className="mt-8 pt-4 border-t border-border-custom/50 flex flex-wrap gap-2">
                  {activePost.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[9px] px-2 py-0.5 rounded-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
