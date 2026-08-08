"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const DecideSection: React.FC = () => {
  const { candidate, activeStage, uiState } = useAgentStore();
  const isActive = activeStage === 'DECIDE' || uiState === 'DECIDING';
  const isRejected = candidate.outcome === 'REJECT' || uiState === 'REJECTED';

  return (
    <section className="relative min-h-[70vh] py-16 px-6 max-w-4xl mx-auto flex flex-col justify-center border-b border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 text-center"
      >
        {/* Section Header */}
        <div className="flex items-center justify-center space-x-3 font-mono text-xs">
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-oculus-cyan animate-ping' : 'bg-oculus-textMuted'}`} />
          <span className="text-oculus-cyan tracking-widest uppercase font-bold">04 // DECIDE</span>
        </div>

        {/* Visual Focus: Verdict Badge */}
        <div className="py-4">
          <div
            className={`inline-block px-10 py-6 rounded-xl border text-4xl sm:text-5xl font-extrabold font-sans tracking-tight uppercase shadow-2xl transition-all duration-500 ${
              isRejected
                ? 'bg-oculus-crimson/10 border-oculus-crimson text-oculus-crimson shadow-[0_0_30px_rgba(255,51,102,0.3)]'
                : 'bg-oculus-emerald/10 border-oculus-emerald text-oculus-emerald shadow-[0_0_30px_rgba(0,255,157,0.3)]'
            }`}
          >
            {isRejected ? 'REJECT' : 'PUBLISH'}
          </div>
        </div>

        {/* Short Reason Underneath */}
        <p className="max-w-xl mx-auto text-sm sm:text-base font-sans text-oculus-textMain leading-relaxed">
          {isRejected
            ? candidate.rejectionReason || "Anomaly detected in evaluation matrix. Signal path terminated."
            : "High-confidence signal with low overlap and significant security relevance."}
        </p>
      </motion.div>
    </section>
  );
};
