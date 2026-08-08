"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, AlertOctagon, Terminal } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const RejectOutcomeCard: React.FC = () => {
  const { candidate, activeStage, uiState } = useAgentStore();
  const isRejected = candidate.outcome === 'REJECT' || uiState === 'REJECTED';

  if (!isRejected && activeStage !== 'REJECT') return null;

  return (
    <section className="relative py-12 px-4 md:px-8 max-w-7xl mx-auto border-b border-oculus-border/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel-crimson rounded-xl p-8 relative overflow-hidden text-center max-w-4xl mx-auto"
      >
        <div className="w-16 h-16 rounded-full bg-oculus-crimson/20 border border-oculus-crimson flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(255,51,102,0.4)]">
          <XCircle className="w-8 h-8 text-oculus-crimson animate-pulse" />
        </div>

        <div className="text-xs font-mono text-oculus-crimson uppercase tracking-widest mb-2 font-bold">
          INTENTIONAL EDITORIAL REJECTION
        </div>

        <h3 className="text-4xl font-extrabold text-white font-sans uppercase tracking-tight mb-4 text-glow-crimson">
          DECISION: REJECTED
        </h3>

        <p className="max-w-2xl mx-auto font-mono text-xs text-oculus-crimson/90 leading-relaxed mb-6 bg-black/40 p-4 rounded border border-oculus-crimson/30">
          {candidate.rejectionCode || "[SYS.ERR.409]"} {candidate.rejectionReason || "Anomaly detected in evaluation matrix. Signal path terminated due to quality / duplicate standards."}
        </p>

        {/* Pipeline Termination Map */}
        <div className="flex justify-center items-center space-x-2 font-mono text-xs text-oculus-textMuted max-w-lg mx-auto pt-4 border-t border-oculus-crimson/20">
          <span className="text-oculus-emerald">OBSERVE ✓</span>
          <span>→</span>
          <span className="text-oculus-emerald">REMEMBER ✓</span>
          <span>→</span>
          <span className="text-oculus-emerald">EVALUATE ✓</span>
          <span>→</span>
          <span className="text-oculus-crimson font-bold">DECIDE ✕</span>
          <span>→</span>
          <span className="opacity-40">PUBLISH</span>
        </div>
      </motion.div>
    </section>
  );
};
