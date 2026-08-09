"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Compass } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';
import { PipelineStage } from '../../lib/adapter/types';

interface Checkpoint {
  id: string;
  stageKey: PipelineStage;
  num: string;
  label: string;
}

const CHECKPOINTS: Checkpoint[] = [
  { id: 'observe-stage', stageKey: 'OBSERVE', num: '01', label: 'OBSERVE' },
  { id: 'remember-stage', stageKey: 'REMEMBER', num: '02', label: 'REMEMBER' },
  { id: 'evaluate-stage', stageKey: 'EVALUATE', num: '03', label: 'EVALUATE' },
  { id: 'decide-stage', stageKey: 'DECIDE', num: '04', label: 'DECIDE' },
  { id: 'publish-stage', stageKey: 'PUBLISH', num: '05', label: 'PUBLISH' },
  { id: 'memory-stage', stageKey: 'MEMORY', num: '06', label: 'MEMORY' },
  { id: 'cycle-complete-stage', stageKey: 'COMPLETE', num: '07', label: 'CYCLE COMPLETE' },
];

export const CheckpointRail: React.FC = () => {
  const { activeStage, scrollToStage } = useAgentStore();
  const [currentVisibleId, setCurrentVisibleId] = useState<string>('observe-stage');

  // IntersectionObserver to highlight rail checkpoint on active scroll
  useEffect(() => {
    const handleScroll = () => {
      const stageElements = CHECKPOINTS.map((cp) => document.getElementById(cp.id)).filter(Boolean);
      
      let currentId = 'observe-stage';
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const el of stageElements) {
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentId = el.id;
          }
        }
      }
      setCurrentVisibleId(currentId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getStageIndex = (key: PipelineStage) => {
    return CHECKPOINTS.findIndex((cp) => cp.stageKey === key);
  };

  const activeIndex = getStageIndex(activeStage);

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col space-y-4 pointer-events-auto selection:bg-oculus-cyan/30">
      <div className="flex items-center space-x-2 font-mono text-[10px] text-oculus-textMuted uppercase tracking-widest pb-2 border-b border-white/10">
        <Compass className="w-3 h-3 text-oculus-cyan animate-pulse" />
        <span>CYCLES & CHECKPOINTS</span>
      </div>

      <div className="relative flex flex-col space-y-3.5 pl-2 border-l border-white/10">
        {CHECKPOINTS.map((cp, idx) => {
          const isCurrentActive = activeStage === cp.stageKey || currentVisibleId === cp.id;
          const isCompleted = activeIndex > idx;

          return (
            <button
              key={cp.id}
              onClick={() => scrollToStage(cp.id)}
              className="group flex items-center space-x-3 text-left focus:outline-none transition-all duration-300"
            >
              {/* Checkpoint Node Marker */}
              <div
                className={`relative w-4 h-4 rounded-sm flex items-center justify-center transition-all duration-300 border ${
                  isCurrentActive
                    ? 'bg-oculus-cyan border-oculus-cyan shadow-[0_0_12px_#00f2ff]'
                    : isCompleted
                    ? 'bg-oculus-cyan/20 border-oculus-cyan/60 text-oculus-cyan'
                    : 'bg-oculus-panel border-white/20 text-oculus-textMuted group-hover:border-oculus-cyan/40'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-2.5 h-2.5 text-oculus-cyan font-bold" />
                ) : (
                  <div
                    className={`w-1 h-1 rounded-full ${
                      isCurrentActive ? 'bg-black' : 'bg-white/40 group-hover:bg-oculus-cyan'
                    }`}
                  />
                )}
              </div>

              {/* Checkpoint Label */}
              <div className="flex items-center space-x-2 font-mono text-xs tracking-wider">
                <span className={isCurrentActive ? 'text-oculus-cyan font-bold' : 'text-oculus-textMuted'}>
                  {cp.num}
                </span>
                <span
                  className={`transition-colors duration-300 ${
                    isCurrentActive
                      ? 'text-white font-bold text-glow-cyan'
                      : isCompleted
                      ? 'text-oculus-textMain/80'
                      : 'text-oculus-textMuted/60 group-hover:text-oculus-textMain'
                  }`}
                >
                  {cp.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
