"use client";

import React from 'react';
import { useAgentStore } from '../lib/state/useAgentStore';
import { Screen1Init } from '../components/screens/Screen1Init';
import { Screen2ContinuousOps } from '../components/screens/Screen2ContinuousOps';

export default function Home() {
  const { uiState } = useAgentStore();

  // Screen 1: Standby Initialization View
  if (uiState === 'STANDBY' || uiState === 'INITIALIZING') {
    return <Screen1Init />;
  }

  // Screen 2: Continuous Operations Experience
  return <Screen2ContinuousOps />;
}
