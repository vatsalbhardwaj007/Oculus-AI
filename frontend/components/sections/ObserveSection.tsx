"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const ObserveSection: React.FC = () => {
  const { candidate, activeStage, uiState } = useAgentStore();
  const isActive = activeStage === 'OBSERVE' || uiState === 'OBSERVING';

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
          <span className="text-oculus-cyan tracking-widest uppercase font-bold">01 // OBSERVE</span>
          {isActive && <span className="text-oculus-textMuted font-normal">— DISCOVERING SIGNAL</span>}
        </div>

        {/* Main Discovered Signal Headline */}
        <h3 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight leading-tight">
          {candidate.title}
        </h3>

        {/* Small Supporting Metadata Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs border-t border-white/10">
          <div>
            <span className="text-oculus-textMuted block text-[10px]">SOURCE</span>
            <span className="text-white font-semibold">arXiv / Security Advisory</span>
          </div>

          <div>
            <span className="text-oculus-textMuted block text-[10px]">SEVERITY</span>
            <span className="text-oculus-crimson font-bold">HIGH</span>
          </div>

          <div>
            <span className="text-oculus-textMuted block text-[10px]">CONFIDENCE</span>
            <span className="text-oculus-cyan font-bold">{(candidate.confidenceScore * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* Subtle Live Trace Log */}
        <div className="p-3 rounded bg-black/40 border border-white/5 font-mono text-[11px] text-oculus-textMuted flex items-center justify-between">
          <span>[TRACE] Ingested signal id: {candidate.signalId} // telemetry verified</span>
          <span className="text-oculus-cyan">LIVE</span>
        </div>
      </motion.div>
    </section>
  );
};
