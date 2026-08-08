"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, XCircle, RefreshCw, Slash, Flame } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const RejectOutcomeCard: React.FC = () => {
  const { candidate, activeStage, uiState, scrollToStage } = useAgentStore();
  const isRejectedStage = activeStage === 'REJECT' || uiState === 'REJECTED' || candidate.outcome === 'REJECT';

  if (!isRejectedStage && candidate.outcome !== 'REJECT') {
    return null;
  }

  const whyRejected = candidate.whyRejected || [
    "Promotional content",
    "Insufficient technical evidence",
    "Low security relevance",
    "Limited new information"
  ];

  return (
    <section id="reject-stage" className="relative min-h-[60vh] py-16 px-6 max-w-4xl mx-auto flex flex-col justify-center border-b border-white/10 selection:bg-oculus-crimson/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 glass-panel-crimson p-6 sm:p-10 rounded-xl border border-oculus-crimson/50 shadow-[0_0_40px_rgba(255,51,102,0.2)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-oculus-crimson/30 pb-4">
          <div className="flex items-center space-x-3 font-mono text-xs text-oculus-crimson">
            <AlertOctagon className="w-5 h-5 animate-bounce" />
            <span className="font-bold tracking-widest uppercase text-sm">SIGNAL TERMINATION ENCLAVE</span>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs text-oculus-crimson bg-oculus-crimson/20 px-2.5 py-1 rounded border border-oculus-crimson/40">
            <Slash className="w-3.5 h-3.5" />
            <span>ARTIFACT · NONE PUBLISHED</span>
          </div>
        </div>

        {/* Status Callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3.5 rounded bg-black/60 border border-oculus-crimson/30 text-oculus-crimson space-y-1">
            <span className="text-[10px] text-oculus-textMuted uppercase block">EDITORIAL STATUS</span>
            <span className="font-extrabold text-sm block">EDITORIAL STANDARD · NOT MET</span>
          </div>

          <div className="p-3.5 rounded bg-black/60 border border-oculus-crimson/30 text-oculus-crimson space-y-1">
            <span className="text-[10px] text-oculus-textMuted uppercase block">SIGNAL STATE</span>
            <span className="font-extrabold text-sm block">SIGNAL · TERMINATED</span>
          </div>

          <div className="p-3.5 rounded bg-black/60 border border-oculus-crimson/30 text-oculus-crimson space-y-1">
            <span className="text-[10px] text-oculus-textMuted uppercase block">REJECTION CODE</span>
            <span className="font-extrabold text-sm block">{candidate.rejectionCode || '[SYS.ERR.409]'}</span>
          </div>
        </div>

        {/* WHY REJECTED Bullet List */}
        <div className="p-5 rounded-lg bg-black/70 border border-oculus-crimson/30 space-y-3 font-mono text-xs">
          <div className="flex items-center space-x-2 text-oculus-crimson font-bold tracking-wider uppercase border-b border-oculus-crimson/20 pb-2">
            <Flame className="w-4 h-4" />
            <span>WHY REJECTED</span>
          </div>
          <ul className="space-y-2 text-slate-200">
            {whyRejected.map((bullet, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-oculus-crimson font-bold">•</span>
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Animated Signal Dissolution Progress Bar */}
        <div className="space-y-2 font-mono text-xs">
          <div className="flex justify-between text-oculus-textMuted text-[10px]">
            <span>DISSOLVING UNRELIABLE SIGNAL DATA...</span>
            <span className="text-oculus-crimson">100% DISCARDED</span>
          </div>
          <div className="h-1.5 rounded bg-black overflow-hidden border border-oculus-crimson/40">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "easeOut" }}
              className="h-full bg-oculus-crimson shadow-[0_0_15px_#ff3366]"
            />
          </div>
        </div>

        {/* Return to Observe Footer Indicator */}
        <div className="pt-2 flex items-center justify-between text-xs font-mono text-oculus-textMuted border-t border-white/10">
          <span>FILTERING COMPLETE // NO MEMORY CREATED</span>
          <button
            onClick={() => scrollToStage('observe-stage')}
            className="text-oculus-cyan hover:underline flex items-center space-x-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            <span>SEARCHING NEXT SIGNAL →</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
