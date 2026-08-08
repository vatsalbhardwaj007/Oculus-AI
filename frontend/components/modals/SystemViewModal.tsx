"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Activity, HardDrive, Zap, Server } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const SystemViewModal: React.FC = () => {
  const { systemModalOpen, setSystemModalOpen, agentId, cycleCount, publishedCount, rejectedCount } = useAgentStore();

  if (!systemModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-xl h-full bg-oculus-panel border-l border-oculus-border p-6 flex flex-col justify-between overflow-y-auto shadow-2xl font-mono text-xs"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-oculus-border/40 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-oculus-cyan" />
                <h3 className="font-bold text-lg text-white">SYSTEM DIAGNOSTICS</h3>
              </div>
              <button
                onClick={() => setSystemModalOpen(false)}
                className="p-1 rounded bg-oculus-panel border border-white/10 text-oculus-textMuted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics List */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-oculus-card rounded border border-white/5">
                  <span className="text-oculus-textMuted block text-[10px]">AGENT ID</span>
                  <span className="text-oculus-cyan font-bold truncate block">{agentId || 'AUTONOMOUS'}</span>
                </div>
                <div className="p-3 bg-oculus-card rounded border border-white/5">
                  <span className="text-oculus-textMuted block text-[10px]">SYSTEM STATUS</span>
                  <span className="text-oculus-emerald font-bold">ONLINE // STABLE</span>
                </div>
              </div>

              <div className="p-4 bg-oculus-card rounded border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-oculus-textMuted flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-oculus-cyan" /> CPU USAGE
                  </span>
                  <span className="text-white font-bold">12%</span>
                </div>
                <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-oculus-cyan h-full w-[12%]" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-oculus-textMuted flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-oculus-cyan" /> MEMORY ALLOCATION
                  </span>
                  <span className="text-white font-bold">1870 / 4400 MB</span>
                </div>
                <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-oculus-cyan h-full w-[42%]" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-oculus-card rounded border border-white/5 text-center">
                  <span className="text-oculus-textMuted block text-[10px]">CYCLES</span>
                  <span className="text-xl font-bold text-white">{cycleCount}</span>
                </div>
                <div className="p-3 bg-oculus-card rounded border border-white/5 text-center">
                  <span className="text-oculus-textMuted block text-[10px]">PUBLISHED</span>
                  <span className="text-xl font-bold text-oculus-emerald">{publishedCount}</span>
                </div>
                <div className="p-3 bg-oculus-card rounded border border-white/5 text-center">
                  <span className="text-oculus-textMuted block text-[10px]">REJECTED</span>
                  <span className="text-xl font-bold text-oculus-crimson">{rejectedCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-oculus-border/40 flex justify-end">
            <button
              onClick={() => setSystemModalOpen(false)}
              className="px-4 py-2 rounded bg-oculus-cyan text-black font-bold text-xs hover:bg-cyan-300"
            >
              CLOSE DIAGNOSTICS
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
