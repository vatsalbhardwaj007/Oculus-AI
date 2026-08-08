"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PipelineHeader } from '../ui/PipelineHeader';
import { ObserveSection } from '../sections/ObserveSection';
import { RememberSection } from '../sections/RememberSection';
import { EvaluateSection } from '../sections/EvaluateSection';
import { DecideSection } from '../sections/DecideSection';
import { PublishSection } from '../sections/PublishSection';
import { RejectOutcomeCard } from '../sections/RejectOutcomeCard';
import { SourcesViewModal } from '../modals/SourcesViewModal';
import { SystemViewModal } from '../modals/SystemViewModal';
import { SignalFieldCanvas } from '../3d/SignalFieldCanvas';

export const Screen2ContinuousOps: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-oculus-bg text-oculus-textMain selection:bg-oculus-cyan/30 overflow-x-hidden">
      {/* Sparse 3D Spatial Field Grid Canvas */}
      <SignalFieldCanvas />

      {/* Floating Bottom Pipeline Dock */}
      <PipelineHeader />

      {/* Main Continuous Operations Timeline */}
      <main className="relative z-10 space-y-8 pb-32 pt-20">
        {/* Cinematic Hero Title (Matching Exact Benchmark Stitch Screenshot) */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-2 max-w-4xl"
          >
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[0.9] font-sans">
              SEPARATING<br />
              <span className="text-oculus-cyan text-glow-cyan">SIGNAL</span> FROM<br />
              NOISE.
            </h2>
          </motion.div>
        </section>

        {/* Stage 01: OBSERVE */}
        <div id="observe-stage">
          <ObserveSection />
        </div>

        {/* Stage 02: REMEMBER */}
        <div id="remember-stage">
          <RememberSection />
        </div>

        {/* Stage 03: EVALUATE */}
        <div id="evaluate-stage">
          <EvaluateSection />
        </div>

        {/* Stage 04: DECIDE */}
        <div id="decide-stage">
          <DecideSection />
        </div>

        {/* Stage 05: REJECT OUTCOME (When rejected) */}
        <RejectOutcomeCard />

        {/* Stage 05: PUBLISH (Verified Research Artifact) */}
        <div id="publish-stage">
          <PublishSection />
        </div>
      </main>

      {/* Modals & Inspection Drawers */}
      <SourcesViewModal />
      <SystemViewModal />
    </div>
  );
};
