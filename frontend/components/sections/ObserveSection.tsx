"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, AlertTriangle, Eye, Shield, CheckCircle } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const ObserveSection: React.FC = () => {
  const { candidate, activeStage, uiState } = useAgentStore();
  const isActive = activeStage === 'OBSERVE' || uiState === 'OBSERVING';
  const [telemetryStep, setTelemetryStep] = useState(0);

  // Sequential telemetry log animation
  useEffect(() => {
    if (isActive) {
      setTelemetryStep(1); // SOURCE DISCOVERED
      const t1 = setTimeout(() => setTelemetryStep(2), 800);  // SIGNAL INGESTED
      const t2 = setTimeout(() => setTelemetryStep(3), 1600); // TELEMETRY VERIFIED
      const t3 = setTimeout(() => setTelemetryStep(4), 2400); // SIGNAL NORMALIZED
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    } else {
      setTelemetryStep(4);
    }
  }, [isActive]);

  return (
    <section id="observe-stage" className="relative min-h-[75vh] py-20 px-6 max-w-4xl mx-auto flex flex-col justify-center border-b border-white/10">
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
            <Radio className={`w-4 h-4 ${isActive ? 'text-oculus-cyan animate-pulse' : 'text-oculus-textMuted'}`} />
            <span className="text-oculus-cyan font-bold tracking-widest uppercase text-sm">01 // OBSERVE</span>
            <span className="text-oculus-textMuted hidden sm:inline-block">— LIVE SIGNAL INGESTION</span>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs text-oculus-cyan bg-oculus-cyan/10 px-2.5 py-1 rounded border border-oculus-cyan/30">
            <span className="w-1.5 h-1.5 rounded-full bg-oculus-cyan animate-ping" />
            <span>SIGNAL {candidate.signalId}</span>
          </div>
        </div>

        {/* Signal Title */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-oculus-textMuted uppercase tracking-wider">INCOMING TOPIC / SIGNAL</div>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight leading-tight">
            {candidate.title}
          </h3>
        </div>

        {/* Ingestion Wave / Scanner Visualizer */}
        <div className="relative h-2 rounded bg-black/60 overflow-hidden border border-white/10">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: isActive ? "100%" : "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-oculus-cyan/20 via-oculus-cyan to-oculus-emerald shadow-[0_0_15px_#00f2ff]"
          />
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 font-mono text-xs">
          <div className="p-3 rounded bg-black/40 border border-white/5">
            <span className="text-oculus-textMuted block text-[10px] uppercase">SOURCE</span>
            <span className="text-white font-semibold">{candidate.source}</span>
          </div>

          <div className="p-3 rounded bg-black/40 border border-white/5">
            <span className="text-oculus-textMuted block text-[10px] uppercase">SEVERITY</span>
            <span className="text-oculus-crimson font-bold">{candidate.severity}</span>
          </div>

          <div className="p-3 rounded bg-black/40 border border-white/5">
            <span className="text-oculus-textMuted block text-[10px] uppercase">INITIAL CONFIDENCE</span>
            <span className="text-oculus-cyan font-bold">{(candidate.initialConfidence * 100).toFixed(0)}%</span>
          </div>

          <div className="p-3 rounded bg-black/40 border border-white/5">
            <span className="text-oculus-textMuted block text-[10px] uppercase">VECTOR MATCH</span>
            <span className="text-white font-semibold">{(candidate.vectorMatchScore * 100).toFixed(1)}%</span>
          </div>
        </div>

        {/* Sequential Telemetry Events Logging */}
        <div className="pt-2">
          <div className="text-[10px] font-mono text-oculus-textMuted uppercase tracking-widest mb-2">TELEMETRY EVENT STREAM</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
            <div className={`p-2 rounded border flex items-center space-x-1.5 transition-colors ${telemetryStep >= 1 ? 'border-oculus-cyan/40 bg-oculus-cyan/10 text-oculus-cyan' : 'border-white/5 text-oculus-textMuted/40'}`}>
              <CheckCircle className="w-3 h-3 shrink-0" />
              <span>SOURCE DISCOVERED</span>
            </div>
            <div className={`p-2 rounded border flex items-center space-x-1.5 transition-colors ${telemetryStep >= 2 ? 'border-oculus-cyan/40 bg-oculus-cyan/10 text-oculus-cyan' : 'border-white/5 text-oculus-textMuted/40'}`}>
              <CheckCircle className="w-3 h-3 shrink-0" />
              <span>SIGNAL INGESTED</span>
            </div>
            <div className={`p-2 rounded border flex items-center space-x-1.5 transition-colors ${telemetryStep >= 3 ? 'border-oculus-cyan/40 bg-oculus-cyan/10 text-oculus-cyan' : 'border-white/5 text-oculus-textMuted/40'}`}>
              <CheckCircle className="w-3 h-3 shrink-0" />
              <span>TELEMETRY VERIFIED</span>
            </div>
            <div className={`p-2 rounded border flex items-center space-x-1.5 transition-colors ${telemetryStep >= 4 ? 'border-oculus-emerald/40 bg-oculus-emerald/10 text-oculus-emerald' : 'border-white/5 text-oculus-textMuted/40'}`}>
              <CheckCircle className="w-3 h-3 shrink-0" />
              <span>SIGNAL NORMALIZED</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
