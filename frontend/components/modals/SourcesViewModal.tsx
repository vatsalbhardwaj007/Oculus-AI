"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, FileText, Globe, CheckCircle2 } from 'lucide-react';
import { useAgentStore } from '../../lib/state/useAgentStore';

export const SourcesViewModal: React.FC = () => {
  const { sourcesModalOpen, setSourcesModalOpen, candidate } = useAgentStore();

  if (!sourcesModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-xl h-full bg-oculus-panel border-l border-oculus-border p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between border-b border-oculus-border/40 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-oculus-cyan" />
                <h3 className="font-mono font-bold text-lg text-white">LIVE SOURCES INSPECTOR</h3>
              </div>
              <button
                onClick={() => setSourcesModalOpen(false)}
                className="p-1 rounded bg-oculus-panel border border-white/10 text-oculus-textMuted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6 font-mono text-xs">
              <div>
                <span className="text-oculus-textMuted uppercase block mb-2">VERIFIED SOURCE URLs</span>
                <div className="space-y-2">
                  {candidate.sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded bg-oculus-card border border-oculus-border/40 text-oculus-cyan hover:border-oculus-cyan flex items-center justify-between transition-colors"
                    >
                      <span className="truncate max-w-[340px]">{src}</span>
                      <ExternalLink className="w-4 h-4 text-oculus-textMuted" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Raw Ingestion Payload */}
              <div>
                <span className="text-oculus-textMuted uppercase block mb-2">RAW SOURCE INGESTION PAYLOAD</span>
                <pre className="p-4 rounded bg-black/60 border border-white/10 text-oculus-cyan text-[11px] overflow-x-auto leading-relaxed">
                  {candidate.rawPayload}
                </pre>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-oculus-border/40 flex justify-end">
            <button
              onClick={() => setSourcesModalOpen(false)}
              className="px-4 py-2 rounded bg-oculus-cyan text-black font-mono font-bold text-xs hover:bg-cyan-300"
            >
              CLOSE INSPECTOR
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
