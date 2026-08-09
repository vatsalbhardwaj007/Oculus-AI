"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldAlert, Filter, CheckCircle2, XCircle } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const EvaluateSection: React.FC = () => {
  const { candidate, activeStage, uiState } = useAgentStore();
  const isActive = activeStage === 'EVALUATE' || uiState === 'EVALUATING';
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  const targetConfidence = Math.round(candidate.confidenceScore * 100);

  // Counter animation for confidence percentage
  useEffect(() => {
    if (isActive) {
      setAnimatedConfidence(0);
      const duration = 1500;
      const steps = 30;
      const stepTime = duration / steps;
      const increment = targetConfidence / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetConfidence) {
          setAnimatedConfidence(targetConfidence);
          clearInterval(timer);
        } else {
          setAnimatedConfidence(Math.round(current));
        }
      }, stepTime);

      return () => clearInterval(timer);
    } else {
      setAnimatedConfidence(targetConfidence);
    }
  }, [isActive, targetConfidence]);

  return (
    <section id="evaluate-stage" className="relative min-h-[75vh] py-20 px-6 max-w-4xl mx-auto flex flex-col justify-center border-b border-white/10">
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
            <Cpu className={`w-4 h-4 ${isActive ? 'text-oculus-cyan animate-pulse' : 'text-oculus-textMuted'}`} />
            <span className="text-oculus-cyan font-bold tracking-widest uppercase text-sm">03 // EVALUATE</span>
            <span className="text-oculus-textMuted hidden sm:inline-block">— EVIDENCE SYNTHESIS</span>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs text-oculus-cyan bg-oculus-cyan/10 px-2.5 py-1 rounded border border-oculus-cyan/30">
            <Filter className="w-3.5 h-3.5" />
            <span>EDITORIAL FILTER ACTIVE</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold font-mono text-white tracking-wider uppercase">
            EVIDENCE SYNTHESIS
          </h3>
          <p className="text-sm font-sans text-oculus-textMain">
            Evaluating multi-source threat vectors against editorial publishing criteria, technical reproducibility, and severity thresholds.
          </p>
        </div>

        {/* Main Metrics Row (EXACT VALUES FROM USER PROMPT) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
          <div className="p-4 rounded-lg bg-black/50 border border-white/10 space-y-1">
            <div className="text-[10px] text-oculus-textMuted uppercase tracking-wider">SOURCE QUALITY</div>
            <div className="text-lg font-extrabold text-oculus-cyan">{candidate.sourceQuality}</div>
            <div className="text-[10px] text-oculus-emerald">PEER-REVIEWED / CVE</div>
          </div>

          <div className="p-4 rounded-lg bg-black/50 border border-white/10 space-y-1">
            <div className="text-[10px] text-oculus-textMuted uppercase tracking-wider">NOVELTY</div>
            <div className="text-lg font-extrabold text-oculus-emerald">HIGH</div>
            <div className="text-[10px] text-oculus-textMuted">NEW EXPLOIT PATH</div>
          </div>

          <div className="p-4 rounded-lg bg-black/50 border border-white/10 space-y-1">
            <div className="text-[10px] text-oculus-textMuted uppercase tracking-wider">THREAT RELEVANCE</div>
            <div className="text-lg font-extrabold text-oculus-crimson">{candidate.threatRelevance}</div>
            <div className="text-[10px] text-oculus-crimson">INFRASTRUCTURE IMPACT</div>
          </div>

          <div className="p-4 rounded-lg bg-black/50 border border-oculus-cyan/40 bg-oculus-cyan/5 space-y-1">
            <div className="text-[10px] text-oculus-cyan uppercase tracking-wider font-bold">CONFIDENCE</div>
            <div className="text-3xl font-extrabold text-white text-glow-cyan">{animatedConfidence}%</div>
            <div className="text-[10px] text-oculus-cyan">THRESHOLD &gt; 75%</div>
          </div>
        </div>

        {/* Candidate Signal Filtering Visualization */}
        <div className="p-4 rounded-lg bg-black/60 border border-white/10 space-y-3 font-mono">
          <div className="text-xs text-oculus-textMuted border-b border-white/5 pb-2 uppercase tracking-wider">
            CANDIDATE SIGNAL FILTERING MATRIX (NOT EVERYTHING GETS PUBLISHED)
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded bg-black/40 border border-red-500/20 text-oculus-textMuted flex items-center justify-between opacity-50">
              <span className="truncate">[REJECTED] Consumer Browser Extension Launch</span>
              <span className="text-red-400 font-bold flex items-center"><XCircle className="w-3.5 h-3.5 mr-1" /> REJECTED (PROMOTIONAL)</span>
            </div>
            <div className="p-2.5 rounded bg-black/40 border border-red-500/20 text-oculus-textMuted flex items-center justify-between opacity-50">
              <span className="truncate">[REJECTED] Generic LLM Benchmark Repost</span>
              <span className="text-red-400 font-bold flex items-center"><XCircle className="w-3.5 h-3.5 mr-1" /> REJECTED (LOW NOVELTY)</span>
            </div>
            <div className="p-3 rounded bg-oculus-cyan/10 border border-oculus-cyan text-white flex items-center justify-between font-bold shadow-[0_0_15px_rgba(0,242,255,0.2)]">
              <span className="truncate text-oculus-cyan">[PASSED] {candidate.title}</span>
              <span className="text-oculus-emerald flex items-center"><CheckCircle2 className="w-4 h-4 mr-1" /> PASSED (CONFIDENCE {targetConfidence}%)</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
