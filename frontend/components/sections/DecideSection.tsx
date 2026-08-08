"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, XCircle, CheckCircle2, Bot } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';
import { WhyRationaleCard } from './WhyRationaleCard';

export const DecideSection: React.FC = () => {
  const { candidate, activeStage, uiState } = useAgentStore();
  const isActive = activeStage === 'DECIDE' || uiState === 'DECIDING';
  const isPublish = candidate.outcome === 'PUBLISH';

  return (
    <section id="decide-stage" className="relative min-h-[75vh] py-20 px-6 max-w-4xl mx-auto flex flex-col justify-center border-b border-white/10">
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
            <Layers className={`w-4 h-4 ${isActive ? 'text-oculus-cyan animate-pulse' : 'text-oculus-textMuted'}`} />
            <span className="text-oculus-cyan font-bold tracking-widest uppercase text-sm">04 // DECIDE</span>
            <span className="text-oculus-textMuted hidden sm:inline-block">— AUTONOMOUS EDITORIAL JUDGMENT</span>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs text-oculus-cyan">
            <Bot className="w-4 h-4 text-oculus-cyan animate-bounce" />
            <span>AUTONOMY EXECUTING</span>
          </div>
        </div>

        {/* Big Decision Card Banner (AUTONOMOUS EXECUTION DISPLAY) */}
        <div className={`p-6 sm:p-8 rounded-xl border font-mono space-y-4 shadow-2xl transition-colors duration-500 ${
          isPublish 
            ? 'bg-oculus-emerald/10 border-oculus-emerald/40 shadow-[0_0_40px_rgba(0,255,157,0.15)]' 
            : 'bg-oculus-crimson/10 border-oculus-crimson/40 shadow-[0_0_40px_rgba(255,51,102,0.15)]'
        }`}>
          <div className="flex items-center justify-between text-xs tracking-widest text-oculus-textMuted uppercase border-b border-white/10 pb-3">
            <span>AUTONOMOUS DECISION ENGINE</span>
            <span>NO HUMAN OPERATOR REQUIRED</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs text-oculus-textMuted uppercase font-bold tracking-wider">EDITORIAL STANDARD</div>
              <div className={`text-2xl font-black tracking-tight ${isPublish ? 'text-oculus-emerald' : 'text-oculus-crimson'}`}>
                {isPublish ? 'EDITORIAL STANDARD · PASSED' : 'EDITORIAL STANDARD · NOT MET'}
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="text-xs text-oculus-textMuted uppercase font-bold tracking-wider">DECISION OUTCOME</div>
              <div className={`text-4xl font-black uppercase tracking-wider flex items-center ${isPublish ? 'text-oculus-emerald text-glow-emerald' : 'text-oculus-crimson text-glow-crimson'}`}>
                {isPublish ? (
                  <>
                    <CheckCircle2 className="w-8 h-8 mr-2 inline" />
                    <span>PUBLISH</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-8 h-8 mr-2 inline" />
                    <span>REJECTED</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Why Selected & Why It Matters Now Breakdown */}
        {isPublish && <WhyRationaleCard candidate={candidate} />}
      </motion.div>
    </section>
  );
};
