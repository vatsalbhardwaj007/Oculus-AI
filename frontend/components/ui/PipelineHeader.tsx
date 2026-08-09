"use client";

import React from 'react';
import { Eye, Database, Cpu, Layers, FileText, Play, Square, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';
import { PipelineStage } from '../../lib/adapter/types';

export const PipelineHeader: React.FC = () => {
  const {
    activeStage,
    uiState,
    agentId,
    selectedAgent,
    agentsList,
    selectAgent,
    startAgent,
    stopAgent,
    runSingleCycle,
  } = useAgentStore();

  const stages: { key: PipelineStage; label: string }[] = [
    { key: 'OBSERVE', label: 'OBSERVE' },
    { key: 'REMEMBER', label: 'REMEMBER' },
    { key: 'EVALUATE', label: 'EVALUATE' },
    { key: 'DECIDE', label: 'DECIDE' },
    { key: 'PUBLISH', label: 'PUBLISH' },
  ];

  const isRunning = selectedAgent?.status === 'running' || selectedAgent?.scheduleEnabled;
  const isProcessing = uiState === 'OBSERVING' || uiState === 'EVALUATING' || uiState === 'DECIDING' || uiState === 'INITIALIZING';

  return (
    <>
      {/* Top Navigation & Agent Control Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between pointer-events-auto bg-black/90 border-b border-white/10 backdrop-blur-md gap-3">
        {/* Left: Brand Identity & Agent Switcher */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-oculus-panel border border-oculus-cyan/40 flex items-center justify-center shadow-[0_0_10px_rgba(0,242,255,0.2)]">
              <ShieldAlert className="w-4 h-4 text-oculus-cyan" />
            </div>
            <span className="font-mono font-bold text-base tracking-wider text-white">OCULUS-AI</span>
          </div>

          {/* Agent Switcher Dropdown / Tabs */}
          <div className="flex items-center bg-white/5 p-1 rounded-lg border border-white/10 space-x-1">
            <button
              onClick={() => selectAgent('2116492e-8019-425d-8ee9-af0686882c91')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                agentId === '2116492e-8019-425d-8ee9-af0686882c91' || selectedAgent?.name === 'Oculus Test'
                  ? 'bg-oculus-cyan/20 border border-oculus-cyan text-oculus-cyan shadow-[0_0_10px_rgba(0,242,255,0.2)]'
                  : 'text-oculus-textMuted hover:text-white'
              }`}
            >
              🧪 Oculus Test (Staging)
            </button>
            <button
              onClick={() => selectAgent('da694384-4f41-4204-8d25-df1abd2010fc')}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                agentId === 'da694384-4f41-4204-8d25-df1abd2010fc' || selectedAgent?.name === 'Oculus AI'
                  ? 'bg-amber-500/20 border border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'text-oculus-textMuted hover:text-white'
              }`}
            >
              🚀 Oculus AI (Prod)
            </button>
          </div>
        </div>

        {/* Center/Right: Status Badges & Controls */}
        <div className="flex items-center space-x-3">
          {/* Status Badge */}
          <div className="flex items-center space-x-2 font-mono text-xs px-3 py-1 rounded bg-white/5 border border-white/10">
            <span
              className={`w-2 h-2 rounded-full ${
                isProcessing
                  ? 'bg-oculus-cyan animate-spin'
                  : isRunning
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-gray-500'
              }`}
            />
            <span className="text-white uppercase font-bold">
              STATUS: {isProcessing ? 'PROCESSING' : isRunning ? 'RUNNING (15m CRON)' : 'STOPPED'}
            </span>
          </div>

          {/* Action Control Buttons */}
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
              title="Persistently start agent & enable 15-minute scheduler"
            >
              <Play className="w-3.5 h-3.5" />
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
              title="Persistently stop agent & disable scheduler"
            >
              <Square className="w-3.5 h-3.5" />
              <span>STOP</span>
            </button>

            {/* RUN 1 CYCLE NOW (Manual Test Button) */}
            <button
              onClick={runSingleCycle}
              disabled={isProcessing}
              className="px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center space-x-1.5 bg-oculus-cyan/20 border border-oculus-cyan text-oculus-cyan hover:bg-oculus-cyan hover:text-black transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)] cursor-pointer"
              title="Execute exactly ONE bounded test cycle immediately without enabling continuous cron"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>RUN 1 CYCLE NOW</span>
            </button>
          </div>
        </div>
      </header>


      {/* Benchmark Floating Bottom Pipeline Dock (Matching Stitch Screenshot) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 pointer-events-auto">
        <div className="glass-panel rounded-lg p-4 border border-oculus-cyan/20 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
          {/* System Mode Label */}
          <div className="flex items-center justify-between font-mono text-[10px] text-oculus-textMuted mb-3 tracking-widest uppercase">
            <span>SYS.OP.MODE: AUTONOMOUS</span>
            <span>Z-INDEX: 0.000 // ACTIVE</span>
          </div>

          {/* Diamond Node Pipeline Track */}
          <div className="flex items-center justify-between px-2">
            {stages.map((stg, idx) => {
              const isActive = activeStage === stg.key;
              const isCompleted = stages.findIndex((s) => s.key === activeStage) > idx;

              return (
                <React.Fragment key={stg.key}>
                  <div className="flex flex-col items-center space-y-1.5">
                    <div
                      className={`w-3.5 h-3.5 rotate-45 border transition-all duration-500 ${
                        isActive
                          ? 'bg-oculus-cyan border-oculus-cyan shadow-[0_0_12px_#00f2ff]'
                          : isCompleted
                          ? 'bg-oculus-emerald/40 border-oculus-emerald'
                          : 'bg-transparent border-oculus-textMuted/40'
                      }`}
                    />
                    <span
                      className={`font-mono text-[10px] font-bold tracking-wider ${
                        isActive
                          ? 'text-oculus-cyan text-glow-cyan'
                          : isCompleted
                          ? 'text-oculus-emerald'
                          : 'text-oculus-textMuted opacity-40'
                      }`}
                    >
                      {stg.label}
                    </span>
                  </div>

                  {idx < stages.length - 1 && (
                    <div
                      className={`flex-1 h-[1px] mx-2 transition-colors duration-500 ${
                        isCompleted || isActive ? 'bg-oculus-cyan/40' : 'bg-white/10'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <footer className="fixed bottom-2 left-6 right-6 z-30 flex items-center justify-between font-mono text-[10px] text-oculus-textMuted opacity-60 pointer-events-none">
        <div>TERMINAL.01</div>
        <div className="flex space-x-6">
          <span>MEM: 24%</span>
          <span>CPU: 4%</span>
        </div>
        <div>V.2.0.4A</div>
      </footer>
    </>
  );
};
