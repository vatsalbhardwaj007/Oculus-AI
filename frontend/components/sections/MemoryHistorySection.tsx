"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, ShieldCheck, Zap, ExternalLink, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const MemoryHistorySection: React.FC = () => {
  const { posts, memoryIndex } = useAgentStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (id: string) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  return (
    <section id="memory-stage" className="relative min-h-screen py-20 px-6 max-w-5xl mx-auto selection:bg-oculus-cyan/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center space-x-3 font-mono text-xs text-oculus-cyan">
              <Database className="w-4 h-4 animate-pulse" />
              <span className="font-bold tracking-widest uppercase text-sm">06 // MEMORY / RESEARCH HISTORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-sans mt-2">
              PERSISTENT MEMORY ARCHIVE
            </h2>
            <p className="text-sm font-sans text-oculus-textMuted mt-1">
              "Everything OCULUS-AI has chosen to publish."
            </p>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-oculus-panel border border-oculus-cyan/30 text-white">
              <span className="text-oculus-textMuted block text-[10px] uppercase">MEMORY INDEX</span>
              <span className="text-xl font-extrabold text-oculus-cyan">{memoryIndex.toLocaleString()} RECORDS</span>
            </div>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-xs">
          <Search className="w-4 h-4 text-oculus-cyan" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SEARCH MEMORY MATRIX BY KEYWORD, EXPLOIT, OR CVE..."
            className="w-full bg-transparent text-white focus:outline-none placeholder-oculus-textMuted/60 uppercase"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-oculus-textMuted hover:text-white">
              CLEAR
            </button>
          )}
        </div>

        {/* Post Archive Cards List */}
        <div className="space-y-6" id="cycle-complete-stage">
          <AnimatePresence>
            {filteredPosts.map((post, idx) => {
              const isExpanded = expandedPostId === post.id;
              const isLatest = idx === 0;

              return (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`glass-panel p-6 sm:p-8 rounded-xl border transition-all duration-300 ${
                    isLatest
                      ? 'border-oculus-cyan/50 shadow-[0_0_30px_rgba(0,242,255,0.12)]'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Card Metadata Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-oculus-textMuted border-b border-white/10 pb-4">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isLatest ? 'bg-oculus-cyan text-black font-extrabold' : 'bg-white/10 text-white'}`}>
                        {isLatest ? 'LATEST PUBLICATION' : `RECORD #${filteredPosts.length - idx}`}
                      </span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Metrics Row */}
                    <div className="flex items-center space-x-4">
                      <span className="text-oculus-emerald font-bold">
                        NOVELTY {(post.noveltyScore * 100).toFixed(0)}%
                      </span>
                      <span className="text-oculus-cyan">
                        OVERLAP {post.overlapLevel}
                      </span>
                      <span className="text-white font-bold">
                        CONFIDENCE {(post.confidenceScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Post Title & Preview */}
                  <div className="py-4 space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-sm font-sans text-slate-300 leading-relaxed line-clamp-3">
                      {post.text}
                    </p>
                  </div>

                  {/* Accordion Expand Trigger */}
                  <div className="pt-2 flex items-center justify-between font-mono text-xs border-t border-white/10">
                    <div className="flex items-center space-x-4 text-oculus-textMuted">
                      <span>{post.sources.length} VERIFIED SOURCES</span>
                    </div>

                    <button
                      onClick={() => toggleExpand(post.id)}
                      className="inline-flex items-center space-x-1.5 text-oculus-cyan hover:underline cursor-pointer font-bold"
                    >
                      <span>{isExpanded ? 'COLLAPSE DETAILS' : 'INSPECT RATIONALE & SOURCES'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Expanded Breakdown */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pt-6 space-y-6 border-t border-white/10 mt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                        <div className="p-4 rounded bg-black/50 border border-oculus-cyan/30 space-y-2">
                          <div className="text-oculus-cyan font-bold flex items-center space-x-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>WHY SELECTED</span>
                          </div>
                          <ul className="space-y-1 text-slate-300">
                            {post.whySelected?.map((w, i) => (
                              <li key={i}>• {w}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded bg-black/50 border border-oculus-amber/30 space-y-2">
                          <div className="text-oculus-amber font-bold flex items-center space-x-1">
                            <Zap className="w-3.5 h-3.5" />
                            <span>WHY IT MATTERS NOW</span>
                          </div>
                          <ul className="space-y-1 text-slate-300">
                            {post.whyItMattersNow?.map((w, i) => (
                              <li key={i}>• {w}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Verified Sources Links */}
                      <div className="p-3 rounded bg-black/50 border border-white/10 font-mono text-xs flex items-center justify-between">
                        <span className="text-oculus-textMuted uppercase font-bold">VERIFIED SOURCES:</span>
                        <div className="flex space-x-3">
                          {post.sources.map((src, i) => (
                            <a
                              key={i}
                              href={src}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-oculus-cyan hover:underline inline-flex items-center space-x-1"
                            >
                              <span>[ source 0{i + 1} ]</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
