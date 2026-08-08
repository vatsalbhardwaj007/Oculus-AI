"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const HeroInitSection: React.FC = () => {
  const { initAgent, uiState, isAutonomousActive } = useAgentStore();
  const [loading, setLoading] = useState(false);

  const handleInit = async () => {
    setLoading(true);
    await initAgent();
    setLoading(false);
  };

  const isInitializing = uiState === 'INITIALIZING' || loading;
  const isInitialized = isAutonomousActive || uiState !== 'STANDBY';

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 py-20 max-w-5xl mx-auto selection:bg-oculus-cyan/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-8 w-full"
      >
        {/* Eyebrow / Metadata Label (SMALL, MONOSPACE - PER USER SPEC) */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-oculus-panel border border-oculus-cyan/20 text-oculus-cyan text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(0,242,255,0.15)]">
          <span className="w-2 h-2 rounded-full bg-oculus-cyan animate-pulse" />
          <span>AUTONOMOUS CYBERSECURITY RESEARCHER</span>
        </div>

        {/* DOMINANT HERO IDENTITY (OCULUS-AI - PER USER SPEC) */}
        <div className="space-y-4">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-white tracking-tight uppercase leading-none font-sans drop-shadow-2xl">
            OCULUS-AI
          </h1>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-oculus-cyan text-glow-cyan tracking-tight uppercase font-sans">
            SEPARATING SIGNAL FROM NOISE.
          </h2>
        </div>

        {/* Concise Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-oculus-textMain font-sans leading-relaxed text-slate-300">
          An autonomous intelligence agent that observes the security frontier, cross-references persistent memory, evaluates technical evidence, and publishes verified research briefings without operator input.
        </p>

        {/* Status Indicator & Initialization Control */}
        <div className="pt-6 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3 text-xs font-mono text-oculus-textMuted">
            <span className={`w-2 h-2 rounded-full ${isInitialized ? 'bg-oculus-emerald animate-pulse' : 'bg-oculus-amber animate-pulse'}`} />
            <span>
              STATUS · {isInitialized ? 'AUTONOMY ENABLED // ACTIVE' : 'SYSTEM STATUS · STANDBY'}
            </span>
          </div>

          {!isInitialized ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleInit}
              disabled={isInitializing}
              className="relative group inline-flex items-center space-x-3 px-8 py-4 rounded-lg bg-oculus-cyan/10 border border-oculus-cyan text-oculus-cyan font-mono font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_30px_rgba(0,242,255,0.25)] hover:bg-oculus-cyan hover:text-black hover:shadow-[0_0_50px_rgba(0,242,255,0.5)] cursor-pointer"
            >
              {isInitializing ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>INITIALIZING OCULUS-AI...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-oculus-cyan group-hover:text-black transition-colors" />
                  <span>INITIALIZE OCULUS-AI →</span>
                </>
              )}
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-lg bg-oculus-emerald/10 border border-oculus-emerald/40 text-oculus-emerald font-mono text-xs tracking-widest uppercase flex items-center space-x-3 shadow-[0_0_20px_rgba(0,255,157,0.2)]"
            >
              <ShieldCheck className="w-5 h-5 text-oculus-emerald" />
              <div>
                <div className="font-bold">AUTONOMY ENABLED</div>
                <div className="text-[10px] text-oculus-emerald/80">NO OPERATOR INPUT REQUIRED · CONTINUOUS MONITORING ACTIVE</div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
