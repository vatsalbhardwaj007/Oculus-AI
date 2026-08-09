"use client";

import React from 'react';
import { ShieldCheck, Zap, ExternalLink } from 'lucide-react';
import { SignalCandidate } from '../../lib/adapter/types';

interface Props {
  candidate: SignalCandidate;
}

export const WhyRationaleCard: React.FC<Props> = ({ candidate }) => {
  const whySelected = candidate.whySelected || [
    "High security relevance",
    "Strong evidence quality",
    "Low overlap with previous research",
    "Significant architectural implications"
  ];

  const whyItMattersNow = candidate.whyItMattersNow || [
    "Agentic systems are rapidly entering production",
    "Attack surface is expanding",
    "New deployment patterns increase exposure"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-mono text-xs">
      {/* WHY SELECTED Column */}
      <div className="p-5 rounded-lg bg-black/60 border border-oculus-cyan/30 space-y-3">
        <div className="flex items-center space-x-2 text-oculus-cyan font-bold tracking-wider uppercase border-b border-white/10 pb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>WHY SELECTED</span>
        </div>
        <ul className="space-y-2 text-oculus-textMain">
          {whySelected.map((bullet, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-oculus-cyan font-bold">•</span>
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* WHY IT MATTERS NOW Column */}
      <div className="p-5 rounded-lg bg-black/60 border border-oculus-amber/30 space-y-3">
        <div className="flex items-center space-x-2 text-oculus-amber font-bold tracking-wider uppercase border-b border-white/10 pb-2">
          <Zap className="w-4 h-4" />
          <span>WHY IT MATTERS NOW</span>
        </div>
        <ul className="space-y-2 text-oculus-textMain">
          {whyItMattersNow.map((bullet, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-oculus-amber font-bold">•</span>
              <span className="leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* VERIFIED SOURCES Bar */}
      <div className="md:col-span-2 p-4 rounded-lg bg-black/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-oculus-textMuted uppercase font-bold tracking-wider">VERIFIED SOURCES ({candidate.sources.length}):</span>
        <div className="flex flex-wrap gap-2">
          {candidate.sources.map((src, idx) => (
            <a
              key={idx}
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-3 py-1 rounded bg-oculus-panel border border-oculus-cyan/30 text-oculus-cyan hover:bg-oculus-cyan hover:text-black transition-colors"
            >
              <span>[ source 0{idx + 1} ]</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
