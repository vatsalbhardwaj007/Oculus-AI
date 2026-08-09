"use client";

import React from 'react';
import { ShieldAlert, Play, XCircle, Clock, Database, CheckCircle2, Zap } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const DemoSchedulerHeader: React.FC = () => {
  const {
    uiState,
    cycleCount,
    publishedCount,
    memoryIndex,
    demoCountdownSeconds,
    triggerNextMockCycle,
    uiState: agentState,
  } = useAgentStore();

  // Format seconds into MM:SS
  const formatCountdown = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formattedCycle = String(cycleCount).padStart(2, '0');

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3 bg-black/80 backdrop-blur-md border-b border-white/10 pointer-events-auto flex items-center justify-between text-xs font-mono select-none">
      {/* Left Identity & Mode */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded bg-oculus-panel border border-oculus-cyan/40 flex items-center justify-center shadow-[0_0_12px_rgba(0,242,255,0.2)]">
          <ShieldAlert className="w-4 h-4 text-oculus-cyan animate-pulse" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white tracking-widest text-sm">OCULUS-AI</span>
            <span className="px-1.5 py-0.5 rounded bg-oculus-cyan/10 border border-oculus-cyan/30 text-[10px] text-oculus-cyan font-bold tracking-wider">
              V2.0
            </span>
          </div>
          <p className="text-[10px] text-oculus-textMuted tracking-wider uppercase flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-oculus-cyan animate-ping inline-block" />
            <span>AUTONOMOUS MODE · {agentState}</span>
          </p>
        </div>
      </div>

      {/* Center 15-Minute Demo Clock & Telemetry Bar */}
      <div className="hidden lg:flex items-center space-x-6 px-4 py-1.5 rounded-lg bg-oculus-panel/80 border border-white/10 shadow-inner">
        {/* Current Cycle */}
        <div className="flex items-center space-x-2 border-r border-white/10 pr-4">
          <Zap className="w-3.5 h-3.5 text-oculus-cyan" />
          <div>
            <span className="text-[9px] text-oculus-textMuted block uppercase">CURRENT CYCLE</span>
            <span className="text-white font-bold tracking-wider">{formattedCycle}</span>
          </div>
        </div>

        {/* Next Cycle Countdown */}
        <div className="flex items-center space-x-2 border-r border-white/10 pr-4">
          <Clock className="w-3.5 h-3.5 text-oculus-amber animate-pulse" />
          <div>
            <span className="text-[9px] text-oculus-textMuted block uppercase">NEXT CYCLE</span>
            <span className="text-oculus-amber font-bold tracking-wider">{formatCountdown(demoCountdownSeconds)}</span>
          </div>
        </div>

        {/* Memory Index */}
        <div className="flex items-center space-x-2 border-r border-white/10 pr-4">
          <Database className="w-3.5 h-3.5 text-oculus-cyan" />
          <div>
            <span className="text-[9px] text-oculus-textMuted block uppercase">MEMORY INDEX</span>
            <span className="text-white font-bold tracking-wider">{memoryIndex.toLocaleString()}</span>
          </div>
        </div>

        {/* Publications */}
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-oculus-emerald" />
          <div>
            <span className="text-[9px] text-oculus-textMuted block uppercase">PUBLICATIONS</span>
            <span className="text-oculus-emerald font-bold tracking-wider">{publishedCount}</span>
          </div>
        </div>
      </div>

      {/* Right Demo Action Controls */}
      <div className="flex items-center space-x-2">
        <span className="hidden sm:inline-block text-[10px] text-oculus-textMuted uppercase tracking-widest mr-2">
          DEMO CONTROLS:
        </span>
        <button
          onClick={() => triggerNextMockCycle(false)}
          className="px-2.5 py-1.5 rounded bg-oculus-cyan/10 border border-oculus-cyan/40 text-oculus-cyan font-mono font-bold text-[11px] tracking-wider hover:bg-oculus-cyan hover:text-black transition-all duration-200 flex items-center space-x-1 cursor-pointer shadow-[0_0_10px_rgba(0,242,255,0.15)]"
          title="Trigger Published Signal Cycle"
        >
          <Play className="w-3 h-3 fill-current" />
          <span>PASS SIGNAL</span>
        </button>
        <button
          onClick={() => triggerNextMockCycle(true)}
          className="px-2.5 py-1.5 rounded bg-oculus-crimson/10 border border-oculus-crimson/40 text-oculus-crimson font-mono font-bold text-[11px] tracking-wider hover:bg-oculus-crimson hover:text-white transition-all duration-200 flex items-center space-x-1 cursor-pointer"
          title="Trigger Rejected Signal Cycle"
        >
          <XCircle className="w-3 h-3" />
          <span>REJECT SIGNAL</span>
        </button>
      </div>
    </header>
  );
};
