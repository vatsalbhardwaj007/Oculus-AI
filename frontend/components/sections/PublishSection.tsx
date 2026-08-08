"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';
import { Post } from '../../lib/adapter/types';

export const PublishSection: React.FC = () => {
  const { posts, candidate, activeStage, uiState } = useAgentStore();
  const [copied, setCopied] = useState(false);

  const latestPost: Post | undefined = posts[0] || (candidate.postText ? {
    id: "PUB-2026-08-08-41",
    createdAt: new Date().toISOString(),
    text: candidate.postText,
    rationale: candidate.rationale || '',
    sources: candidate.sources,
  } : undefined);

  const handleCopyJson = () => {
    if (!latestPost) return;
    navigator.clipboard.writeText(JSON.stringify(latestPost, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isActive = activeStage === 'PUBLISH' || uiState === 'PUBLISHED';

  return (
    <section className="relative min-h-[90vh] py-16 px-6 max-w-4xl mx-auto flex flex-col justify-center border-b border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0.6, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-oculus-emerald animate-ping' : 'bg-oculus-textMuted'}`} />
            <span className="text-oculus-emerald tracking-widest uppercase font-bold">05 // VERIFIED RESEARCH ARTIFACT</span>
          </div>
          <button
            onClick={handleCopyJson}
            className="px-2.5 py-1 rounded bg-oculus-panel border border-oculus-emerald/30 text-oculus-emerald text-[10px] hover:bg-oculus-emerald hover:text-black transition-colors flex items-center space-x-1"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'COPIED' : 'API JSON'}</span>
          </button>
        </div>

        {latestPost ? (
          <div className="space-y-8">
            {/* Artifact Title */}
            <h3 className="text-3xl sm:text-4xl font-bold text-white font-sans leading-tight">
              {candidate.title || "AI Agent Permission Boundary Vulnerability in Cloud Runtimes"}
            </h3>

            {/* Post Text Body */}
            <div className="prose prose-invert max-w-none text-oculus-textMain font-sans leading-relaxed space-y-4 text-base">
              {latestPost.text.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Structured Editorial Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="p-4 rounded bg-oculus-panel border border-white/5 space-y-2">
                <span className="text-oculus-cyan block text-[10px] font-bold">WHY SELECTED</span>
                <p className="text-white text-xs font-sans leading-relaxed">
                  High-confidence signal with low overlap and significant security relevance across distributed honeypots.
                </p>
              </div>

              <div className="p-4 rounded bg-oculus-panel border border-white/5 space-y-2">
                <span className="text-oculus-cyan block text-[10px] font-bold">WHY IT MATTERS NOW</span>
                <p className="text-white text-xs font-sans leading-relaxed">
                  Immediate threat to multi-tenant LLM environments as enterprise agentic adoption expands rapid attack surface.
                </p>
              </div>
            </div>

            {/* Sources List */}
            <div className="pt-2 font-mono text-xs">
              <span className="text-oculus-textMuted block text-[10px] mb-2 uppercase">VERIFIED SOURCES</span>
              <div className="flex flex-wrap gap-2">
                {latestPost.sources.map((src, i) => (
                  <a
                    key={i}
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded bg-oculus-panel border border-oculus-border/40 text-oculus-cyan hover:border-oculus-cyan flex items-center space-x-1.5 transition-colors"
                  >
                    <span className="truncate max-w-[220px]">{src}</span>
                    <ExternalLink className="w-3 h-3 text-oculus-textMuted" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-oculus-textMuted font-mono text-xs">
            AWAITING AUTONOMOUS PUBLICATION...
          </div>
        )}
      </motion.div>
    </section>
  );
};
