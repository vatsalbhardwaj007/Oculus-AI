"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Database, Search, Cpu, Layers, GitCompare } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const RememberSection: React.FC = () => {
  const { candidate, activeStage, uiState } = useAgentStore();
  const isActive = activeStage === 'REMEMBER' || uiState === 'REMEMBERING';

  return (
    <section id="remember-stage" className="relative min-h-[75vh] py-20 px-6 max-w-4xl mx-auto flex flex-col justify-center border-b border-white/10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`space-y-8 glass-panel p-6 sm:p-10 rounded-xl transition-all duration-500 ${
          isActive ? 'border-oculus-cyan/50 shadow-[0_0_30px_rgba(0,242,255,0.15)]' : 'border-white/10 opacity-70'
        }`}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3 font-mono text-xs">
            <Database className={`w-4 h-4 ${isActive ? 'text-oculus-cyan animate-pulse' : 'text-oculus-textMuted'}`} />
            <span className="text-oculus-cyan font-bold tracking-widest uppercase text-sm">02 // REMEMBER</span>
            <span className="text-oculus-textMuted hidden sm:inline-block">— PERSISTENT MEMORY MATRIX</span>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs text-oculus-textMuted">
            <Search className="w-3.5 h-3.5 text-oculus-cyan animate-spin" />
            <span>VECTOR SEARCH ACTIVE</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold font-mono text-white tracking-wider uppercase">
            MEMORY MATRIX COMPARISON
          </h3>
          <p className="text-sm font-sans text-oculus-textMain">
            Cross-referencing incoming signal vector embedding against persistent vector index of previously published research.
          </p>
        </div>

        {/* 4 Stat Cards Grid (EXACT VALUES FROM USER PROMPT) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
          <div className="p-4 rounded-lg bg-black/50 border border-white/10 space-y-1">
            <div className="text-[10px] text-oculus-textMuted uppercase tracking-wider">RELATED RECORDS</div>
            <div className="text-2xl font-extrabold text-white">{candidate.relatedRecordsCount} RECORDS</div>
            <div className="text-[10px] text-oculus-cyan">INDEX MATCHED</div>
          </div>

          <div className="p-4 rounded-lg bg-black/50 border border-white/10 space-y-1">
            <div className="text-[10px] text-oculus-textMuted uppercase tracking-wider">NOVELTY SCORE</div>
            <div className="text-2xl font-extrabold text-oculus-cyan">{candidate.noveltyScore.toFixed(2)}</div>
            <div className="text-[10px] text-oculus-emerald">HIGH UN uniqueness</div>
          </div>

          <div className="p-4 rounded-lg bg-black/50 border border-white/10 space-y-1">
            <div className="text-[10px] text-oculus-textMuted uppercase tracking-wider">VECTOR OVERLAP</div>
            <div className={`text-2xl font-extrabold ${candidate.overlapLevel === 'LOW' ? 'text-oculus-emerald' : 'text-oculus-crimson'}`}>
              {candidate.overlapLevel}
            </div>
            <div className="text-[10px] text-oculus-textMuted">EMBEDDING DISTANCE</div>
          </div>

          <div className="p-4 rounded-lg bg-black/50 border border-white/10 space-y-1">
            <div className="text-[10px] text-oculus-textMuted uppercase tracking-wider">SIMILARITY INDEX</div>
            <div className="text-2xl font-extrabold text-white">{candidate.similarityIndex.toFixed(1)}%</div>
            <div className="text-[10px] text-oculus-emerald">BELOW THRESHOLD</div>
          </div>
        </div>

        {/* Visual Memory Graph Node Scan Matrix */}
        <div className="p-4 rounded-lg bg-black/60 border border-white/10 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs text-oculus-textMuted border-b border-white/5 pb-2">
            <span>VECTOR INDEX EMBEDDING NEIGHBORHOOD</span>
            <span className="text-oculus-cyan font-bold">COSINE DISTANCE: 0.836</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded bg-oculus-panel border border-oculus-cyan/30 flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-oculus-cyan animate-ping" />
              <div className="truncate">
                <span className="text-oculus-textMuted block text-[9px]">MATCH 01</span>
                <span className="text-white text-[11px] truncate">SEC-2026-11 Isolation</span>
              </div>
            </div>
            <div className="p-2.5 rounded bg-oculus-panel border border-white/10 flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-oculus-textMuted" />
              <div className="truncate">
                <span className="text-oculus-textMuted block text-[9px]">MATCH 02</span>
                <span className="text-white text-[11px] truncate">CVE-2026-8902 Token Esc</span>
              </div>
            </div>
            <div className="p-2.5 rounded bg-oculus-panel border border-white/10 flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-oculus-textMuted" />
              <div className="truncate">
                <span className="text-oculus-textMuted block text-[9px]">MATCH 03</span>
                <span className="text-white text-[11px] truncate">RUNT-2024-04 Sandbox</span>
              </div>
            </div>
          </div>
        </div>

        {/* Explicit Informational Callout */}
        <div className="p-3 rounded bg-oculus-cyan/10 border border-oculus-cyan/30 font-mono text-xs text-oculus-cyan flex items-center space-x-3">
          <GitCompare className="w-4 h-4 shrink-0" />
          <span>The agent remembers what it has already published — previously published topics visibly influence decision scoring.</span>
        </div>
      </motion.div>
    </section>
  );
};
