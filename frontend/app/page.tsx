"use client";

import React from 'react';
import { SignalFieldCanvas } from '../components/3d/SignalFieldCanvas';
import { DemoSchedulerHeader } from '../components/ui/DemoSchedulerHeader';
import { CheckpointRail } from '../components/ui/CheckpointRail';
import { LiveActivityTrace } from '../components/ui/LiveActivityTrace';
import { HeroInitSection } from '../components/sections/HeroInitSection';
import { ObserveSection } from '../components/sections/ObserveSection';
import { RememberSection } from '../components/sections/RememberSection';
import { EvaluateSection } from '../components/sections/EvaluateSection';
import { DecideSection } from '../components/sections/DecideSection';
import { RejectOutcomeCard } from '../components/sections/RejectOutcomeCard';
import { PublishSection } from '../components/sections/PublishSection';
import { MemoryHistorySection } from '../components/sections/MemoryHistorySection';
import { SourcesViewModal } from '../components/modals/SourcesViewModal';
import { SystemViewModal } from '../components/modals/SystemViewModal';

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-oculus-bg text-oculus-textMain selection:bg-oculus-cyan/30 overflow-x-hidden">
      {/* 3D Spatial Intelligence Network Field Canvas */}
      <SignalFieldCanvas />

      {/* Top 15-Minute Demo Clock & Telemetry Header */}
      <DemoSchedulerHeader />

      {/* Left Sticky Checkpoint Rail (01 OBSERVE -> 07 CYCLE COMPLETE) */}
      <CheckpointRail />

      {/* Right Live Terminal Activity Log Stream */}
      <LiveActivityTrace />

      {/* Main Continuous Vertical Narrative Flow */}
      <main className="relative z-10 space-y-12 pb-32 pt-16">
        {/* Section 1: Hero & Persona Initialization Experience */}
        <HeroInitSection />

        {/* Section 2: 01 // OBSERVE */}
        <ObserveSection />

        {/* Section 3: 02 // REMEMBER */}
        <RememberSection />

        {/* Section 4: 03 // EVALUATE */}
        <EvaluateSection />

        {/* Section 5: 04 // DECIDE */}
        <DecideSection />

        {/* Section 6: REJECT OUTCOME (When candidate is rejected) */}
        <RejectOutcomeCard />

        {/* Section 7: 05 // PUBLISH (Verified Research Artifact) */}
        <PublishSection />

        {/* Section 8: 06 // MEMORY / RESEARCH HISTORY */}
        <MemoryHistorySection />
      </main>

      {/* Modals & Inspection Drawers */}
      <SourcesViewModal />
      <SystemViewModal />
    </div>
  );
}
