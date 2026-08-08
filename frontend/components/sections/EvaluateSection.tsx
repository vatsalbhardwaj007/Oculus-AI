"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const EvaluateSection: React.FC = () => {
  const { candidate, activeStage, uiState } = useAgentStore();
  const isActive = activeStage === 'EVALUATE' || uiState === 'EVALUATING';

  const metrics = [
    { label: 'EVIDENCE', value: 'VERIFIED (94%)', color: 'text-oculus-emerald' },
    { label: 'SOURCE QUALITY', value: 'AUTHORITATIVE', color: 'text-white' },
    { label: 'NOVELTY', value: 'HIGH (0.12)', color: 'text-oculus-cyan' },
    { label: 'THREAT RELEVANCE', value: 'CRITICAL', color: 'text-oculus-crimson' },
    { label: 'CONFIDENCE', value: '94%', color: 'text-oculus-cyan' },
  ];

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
          <span className="text-oculus-cyan tracking-widest uppercase font-bold">03 // EVALUATE</span>
          {isActive && <span className="text-oculus-textMuted font-normal">— SYNTHESIZING EVIDENCE</span>}
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight">
          EVIDENCE SYNTHESIS
        </h3>

        {/* Restrained 5 Metrics List (Zero Giant Charts) */}
        <div className="space-y-2.5 font-mono text-xs">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded bg-oculus-panel border border-white/5 flex items-center justify-between"
            >
              <span className="text-oculus-textMuted">{item.label}</span>
              <span className={`font-bold ${item.color}`}>{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
