"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const RememberSection: React.FC = () => {
  const { candidate, activeStage, uiState } = useAgentStore();
  const isActive = activeStage === 'REMEMBER' || uiState === 'REMEMBERING';

  return (
    <section className="relative min-h-[70vh] py-16 px-6 max-w-4xl mx-auto flex flex-col justify-center border-b border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Section Header */}
        <div className="flex items-center space-x-3 font-mono text-xs">
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-oculus-cyan animate-ping' : 'bg-oculus-textMuted'}`} />
          <span className="text-oculus-cyan tracking-widest uppercase font-bold">02 // REMEMBER</span>
          {isActive && <span className="text-oculus-textMuted font-normal">— CROSS-REFERENCING MEMORY</span>}
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">
          MEMORY MATRIX COMPARISON
        </h3>

        {/* Minimal 3-Pillar Memory Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
          <div className="p-4 rounded bg-oculus-panel border border-white/10">
            <span className="text-oculus-textMuted block text-[10px] mb-1">PAST KNOWLEDGE</span>
            <span className="text-2xl font-bold text-white">3 RELATED RECORDS</span>
            <span className="text-[10px] text-oculus-textMuted block mt-1">Matched Incident Vectors</span>
          </div>

          <div className="p-4 rounded bg-oculus-panel border border-white/10">
            <span className="text-oculus-textMuted block text-[10px] mb-1">NOVELTY SCORE</span>
            <span className="text-2xl font-bold text-oculus-cyan">0.12</span>
            <span className="text-[10px] text-oculus-textMuted block mt-1">Unique Signal Bar Passed</span>
          </div>

          <div className="p-4 rounded bg-oculus-panel border border-white/10">
            <span className="text-oculus-textMuted block text-[10px] mb-1">VECTOR OVERLAP</span>
            <span className="text-2xl font-bold text-oculus-emerald">MEDIUM</span>
            <span className="text-[10px] text-oculus-textMuted block mt-1">Similarity Index 84.4%</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
