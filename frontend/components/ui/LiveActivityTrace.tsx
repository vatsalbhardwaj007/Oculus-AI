"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronRight, ChevronLeft, Activity } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const LiveActivityTrace: React.FC = () => {
  const { traceLogs } = useAgentStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`fixed right-6 bottom-8 z-40 hidden 2xl:flex flex-col transition-all duration-300 pointer-events-auto selection:bg-oculus-cyan/30 ${
        isCollapsed ? 'w-12' : 'w-80'
      }`}
    >
      <div className="glass-panel rounded-lg border border-oculus-cyan/20 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        {/* Panel Header */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/60 border-b border-white/10 text-xs font-mono">
          <div className="flex items-center space-x-2 text-oculus-cyan">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            {!isCollapsed && <span className="font-bold tracking-wider uppercase text-[11px]">LIVE ACTIVITY TRACE</span>}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-oculus-textMuted hover:text-white transition-colors p-1"
            title={isCollapsed ? 'Expand Trace' : 'Collapse Trace'}
          >
            {isCollapsed ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Panel Log Stream Body */}
        {!isCollapsed && (
          <div className="p-3 max-h-72 overflow-y-auto space-y-2 font-mono text-[11px] leading-relaxed text-oculus-textMain custom-scrollbar">
            <AnimatePresence initial={false}>
              {traceLogs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-start space-x-2 p-1.5 rounded bg-black/30 border ${
                    log.type === 'SUCCESS'
                      ? 'border-oculus-emerald/30 text-oculus-emerald'
                      : log.type === 'WARN'
                      ? 'border-oculus-crimson/30 text-oculus-crimson'
                      : log.type === 'ERROR'
                      ? 'border-red-500/40 text-red-400'
                      : 'border-white/5 text-oculus-textMain'
                  }`}
                >
                  <span className="text-oculus-cyan font-semibold text-[10px] shrink-0">
                    [{log.timestamp}]
                  </span>
                  <span className="break-words font-medium">{log.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </aside>
  );
};
