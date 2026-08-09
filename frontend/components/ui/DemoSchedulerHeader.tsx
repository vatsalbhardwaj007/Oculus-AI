"use client";

import React from 'react';
import { ShieldAlert, Play, Square, RotateCcw, Sparkles, Clock, Database, CheckCircle2, Zap } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const DemoSchedulerHeader: React.FC = () => {
  const {
    uiState,
    agentId,
    selectedAgent,
    selectAgent,
    startAgent,
    stopAgent,
    resetTimer,
    runSingleCycle,
    publishedCount,
    memoryIndex,
    demoCountdownSeconds,
  } = useAgentStore();

  const isRunning = selectedAgent?.status === 'running' || selectedAgent?.scheduleEnabled;
  const isProcessing = uiState === 'OBSERVING' || uiState === 'EVALUATING' || uiState === 'DECIDING' || uiState === 'INITIALIZING';

  // Format seconds into MM:SS
  const formatCountdown = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3 bg-black/90 backdrop-blur-md border-b border-white/10 pointer-events-auto flex flex-wrap items-center justify-between text-xs font-mono select-none gap-3 shadow-lg">
      {/* Left Identity & Agent Switcher */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded bg-oculus-panel border border-oculus-cyan/40 flex items-center justify-center shadow-[0_0_12px_rgba(0,242,255,0.2)]">
            <ShieldAlert className="w-4 h-4 text-oculus-cyan" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white tracking-widest text-sm">OCULUS-AI</span>
              <span className="px-1.5 py-0.5 rounded bg-oculus-cyan/10 border border-oculus-cyan/30 text-[10px] text-oculus-cyan font-bold tracking-wider">
                V2.0
              </span>
            </div>
          </div>
        </div>

        {/* Single Agent Identity Badge */}
        <div className="flex items-center bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30 space-x-2 shadow-[0_0_10px_rgba(245,158,11,0.15)]">
          <span className="text-amber-400 font-bold font-mono text-xs flex items-center gap-1.5">
            <span>🚀</span> Oculus AI <span className="text-[10px] text-amber-300/70 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-400/30">PRODUCTION AGENT</span>
          </span>
        </div>
      </div>

      {/* Center Telemetry & Status Bar */}
      <div className="hidden xl:flex items-center space-x-6 px-4 py-1.5 rounded-lg bg-oculus-panel/80 border border-white/10 shadow-inner">
        {/* Status Badge */}
        <div className="flex items-center space-x-2 border-r border-white/10 pr-4">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isProcessing
                ? 'bg-oculus-cyan animate-spin'
                : isRunning
                ? 'bg-emerald-400 animate-pulse'
                : 'bg-gray-500'
            }`}
          />
          <div>
            <span className="text-[9px] text-oculus-textMuted block uppercase">AGENT STATUS</span>
            <span className="text-white font-bold tracking-wider">
              {isProcessing ? 'PROCESSING' : isRunning ? 'RUNNING (15m CRON)' : 'STOPPED'}
            </span>
          </div>
        </div>

        {/* 15-Min Timer */}
        <div className="flex items-center space-x-2 border-r border-white/10 pr-4">
          <Clock className={`w-3.5 h-3.5 ${isRunning ? 'text-oculus-amber animate-pulse' : 'text-gray-500'}`} />
          <div>
            <span className="text-[9px] text-oculus-textMuted block uppercase">CRON TIMER</span>
            <span className={`font-bold tracking-wider ${isRunning ? 'text-oculus-amber' : 'text-amber-200/70'}`}>
              {isRunning ? formatCountdown(demoCountdownSeconds) : `PAUSED (${formatCountdown(demoCountdownSeconds)})`}
            </span>
          </div>
        </div>

        {/* Memory Index */}
        <div className="flex items-center space-x-2">
          <Database className="w-3.5 h-3.5 text-oculus-cyan" />
          <div>
            <span className="text-[9px] text-oculus-textMuted block uppercase">MEMORY INDEX</span>
            <span className="text-white font-bold tracking-wider">{memoryIndex.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Right Action Control Buttons */}
      <div className="flex items-center space-x-2">
        {/* START BUTTON */}
        <button
          onClick={startAgent}
          disabled={isRunning}
          className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
            isRunning
              ? 'bg-emerald-950/40 border border-emerald-800/40 text-emerald-600 cursor-not-allowed opacity-50'
              : 'bg-emerald-500/20 border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]'
          }`}
          title="Persistently start agent & resume 15-minute scheduler"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>START</span>
        </button>

        {/* STOP BUTTON */}
        <button
          onClick={stopAgent}
          disabled={!isRunning}
          className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
            !isRunning
              ? 'bg-rose-950/40 border border-rose-900/30 text-rose-700 cursor-not-allowed opacity-50'
              : 'bg-rose-500/20 border border-rose-500 text-rose-400 hover:bg-rose-500 hover:text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]'
          }`}
          title="Persistently stop agent & pause timer where it is"
        >
          <Square className="w-3.5 h-3.5 fill-current" />
          <span>STOP</span>
        </button>

        {/* RESET BUTTON */}
        <button
          onClick={resetTimer}
          className="px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center space-x-1.5 bg-amber-500/20 border border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-black transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] cursor-pointer"
          title="Reset 15-minute cron timer back to 15:00"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET</span>
        </button>

        {/* RUN 1 CYCLE NOW */}
        <button
          onClick={runSingleCycle}
          disabled={isProcessing}
          className="px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center space-x-1.5 bg-oculus-cyan/20 border border-oculus-cyan text-oculus-cyan hover:bg-oculus-cyan hover:text-black transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)] cursor-pointer"
          title="Execute exactly ONE bounded test cycle immediately without waiting 15 minutes"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>RUN 1 CYCLE NOW</span>
        </button>
      </div>
    </header>
  );
};

