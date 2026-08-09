"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';
import { SignalFieldCanvas } from '../3d/SignalFieldCanvas';

export const Screen1Init: React.FC = () => {
  const { initAgent, uiState } = useAgentStore();
  const [loading, setLoading] = useState(false);

  const handleInit = async () => {
    setLoading(true);
    await initAgent();
  };

  const isInitializing = uiState === 'INITIALIZING' || loading;

  return (
    <div className="relative w-full min-h-screen bg-oculus-bg text-oculus-textMain flex flex-col justify-between p-6 md:p-12 overflow-hidden selection:bg-oculus-cyan/30">
      {/* 3D Spatial Grid Background */}
      <SignalFieldCanvas />

      {/* Top Quiet Header */}
      <header className="relative z-20 flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-oculus-panel border border-oculus-cyan/30 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4 text-oculus-cyan" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wider font-mono text-white">OCULUS-AI</h1>
            <p className="text-[11px] text-oculus-textMuted tracking-widest uppercase font-mono">
              AUTONOMOUS CYBERSECURITY RESEARCHER
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-oculus-textMuted">
          <span className="w-2 h-2 rounded-full bg-oculus-cyan animate-pulse" />
          <span>SYSTEM STANDBY</span>
        </div>
      </header>

      {/* Hero Content Center */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 w-full"
        >
          {/* Main Title Identity */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-oculus-cyan uppercase tracking-widest">
              AUTONOMOUS SYSTEM CORE
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-sans">
              OCULUS-AI
            </h2>
            <p className="text-sm font-mono text-oculus-textMuted uppercase tracking-wider">
              AUTONOMOUS CYBERSECURITY RESEARCHER
            </p>
          </div>

          {/* Short Sentence */}
          <p className="max-w-xl mx-auto text-base sm:text-lg text-oculus-textMain font-sans leading-relaxed">
            An autonomous agent that observes the security frontier, remembers what it has seen, evaluates evidence, and publishes what matters.
          </p>

          {/* Primary CTA Button */}
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleInit}
              disabled={isInitializing}
              className="relative group inline-flex items-center space-x-3 px-8 py-4 rounded-lg bg-oculus-cyan/10 border border-oculus-cyan text-oculus-cyan font-mono font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,242,255,0.25)] hover:bg-oculus-cyan hover:text-black hover:shadow-[0_0_40px_rgba(0,242,255,0.5)] cursor-pointer"
            >
              {isInitializing ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>INITIALIZING AGENT...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-oculus-cyan group-hover:text-black transition-colors" />
                  <span>INITIALIZE AGENT</span>
                  <ArrowRight className="w-4 h-4 text-oculus-cyan group-hover:text-black transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </main>

      {/* Footer Info Bar */}
      <footer className="relative z-20 flex items-center justify-between border-t border-white/5 pt-4 text-xs font-mono text-oculus-textMuted">
        <div>OCULUS-AI // AUTONOMOUS MODE</div>
        <div>V.2.0.4A</div>
      </footer>
    </div>
  );
};
