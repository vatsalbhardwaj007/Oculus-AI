"use client";

import React from 'react';
import { Eye, Database, Cpu, Layers, FileText, Play, XCircle, ShieldAlert } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';
import { PipelineStage } from '../../lib/adapter/types';

export const PipelineHeader: React.FC = () => {
  const {
    activeStage,
    uiState,
    agentId,
    setSourcesModalOpen,
    setSystemModalOpen,
    triggerNextMockCycle,
  } = useAgentStore();

  const stages: { key: PipelineStage; label: string }[] = [
    { key: 'OBSERVE', label: 'OBSERVE' },
    { key: 'REMEMBER', label: 'REMEMBER' },
    { key: 'EVALUATE', label: 'EVALUATE' },
    { key: 'DECIDE', label: 'DECIDE' },
    { key: 'PUBLISH', label: 'PUBLISH' },
  ];

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-auto bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded bg-oculus-panel border border-oculus-cyan/30 flex items-center justify-center">
            <ShieldAlert className="w-3.5 h-3.5 text-oculus-cyan" />
          </div>
          <span className="font-mono font-bold text-sm tracking-wider text-white">OCULUS-AI</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 font-mono text-xs text-oculus-textMuted">
            <span className="w-1.5 h-1.5 rounded-full bg-oculus-cyan animate-pulse" />
            <span>STATE: {uiState}</span>
          </div>

          {/* Quick Demo Triggers */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => triggerNextMockCycle(false)}
              className="px-2 py-1 rounded bg-oculus-cyan/10 border border-oculus-cyan/30 text-oculus-cyan font-mono text-[10px] hover:bg-oculus-cyan hover:text-black transition-colors"
              title="Run Autonomous Pass"
            >
              <Play className="w-3 h-3 inline mr-1" />
              PASS
            </button>
            <button
              onClick={() => triggerNextMockCycle(true)}
              className="px-2 py-1 rounded bg-oculus-crimson/10 border border-oculus-crimson/30 text-oculus-crimson font-mono text-[10px] hover:bg-oculus-crimson hover:text-white transition-colors"
              title="Simulate Rejected Pass"
            >
              <XCircle className="w-3 h-3 inline mr-1" />
              REJECT
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
