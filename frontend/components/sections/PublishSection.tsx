"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, ShieldAlert, Clock, Sparkles } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';
import { WhyRationaleCard } from './WhyRationaleCard';

export const PublishSection: React.FC = () => {
  const { candidate, activeStage, uiState } = useAgentStore();
  const isActive = activeStage === 'PUBLISH' || uiState === 'PUBLISHED';
  const isPublish = candidate.outcome === 'PUBLISH';

  const [displayedText, setDisplayedText] = useState('');
  const fullText = candidate.postText || '';

  // Typewriter reveal animation for post text
  useEffect(() => {
    if (isActive && fullText) {
      setDisplayedText('');
      let index = 0;
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setDisplayedText((prev) => prev + fullText.charAt(index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 15);
      return () => clearInterval(timer);
    } else {
      setDisplayedText(fullText);
    }
  }, [isActive, fullText]);

  if (!isPublish) {
    return null; // When rejected, the RejectOutcomeCard renders instead
  }

  return (
    <section id="publish-stage" className="relative min-h-[80vh] py-20 px-6 max-w-4xl mx-auto flex flex-col justify-center border-b border-white/10 selection:bg-oculus-cyan/30">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`space-y-8 glass-panel p-6 sm:p-10 rounded-xl transition-all duration-500 ${
          isActive ? 'border-oculus-emerald/60 shadow-[0_0_40px_rgba(0,255,157,0.2)]' : 'border-white/10 opacity-70'
        }`}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3 font-mono text-xs">
            <FileText className={`w-4 h-4 ${isActive ? 'text-oculus-emerald animate-pulse' : 'text-oculus-textMuted'}`} />
            <span className="text-oculus-emerald font-bold tracking-widest uppercase text-sm">05 // PUBLISH</span>
            <span className="text-oculus-textMuted hidden sm:inline-block">— VERIFIED RESEARCH ARTIFACT</span>
          </div>

          <div className="flex items-center space-x-2 font-mono text-xs text-oculus-emerald bg-oculus-emerald/10 px-2.5 py-1 rounded border border-oculus-emerald/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ARTIFACT GENERATED</span>
          </div>
        </div>

        {/* Research Briefing Card */}
        <div className="p-6 sm:p-8 rounded-xl bg-black/60 border border-white/10 space-y-6">
          {/* Top Metadata Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-oculus-textMuted border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-oculus-cyan" />
              <span className="text-white font-bold tracking-wider uppercase">OCULUS-AI BRIEFING</span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-oculus-emerald">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CONFIDENCE {(candidate.confidenceScore * 100).toFixed(0)}%</span>
              </div>
              <div className="flex items-center space-x-1 text-oculus-textMuted">
                <Clock className="w-3.5 h-3.5" />
                <span>CREATED JUST NOW</span>
              </div>
            </div>
          </div>

          {/* Research Title */}
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-sans">
            {candidate.title}
          </h2>

          {/* Research Content Body (Typewriter effect) */}
          <div className="font-sans text-base sm:text-lg text-slate-200 leading-relaxed space-y-4 whitespace-pre-line border-l-2 border-oculus-cyan/40 pl-4 py-1">
            {displayedText}
            {isActive && displayedText.length < fullText.length && (
              <span className="inline-block w-2 h-5 bg-oculus-cyan animate-pulse ml-1" />
            )}
          </div>

          {/* Why Selected & Why It Matters Now Breakdown */}
          <WhyRationaleCard candidate={candidate} />
        </div>
      </motion.div>
    </section>
  );
};
