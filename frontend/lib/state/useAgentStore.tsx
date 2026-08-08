"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AgentUIState, PipelineStage, Post, SignalCandidate } from '../adapter/types';
import { MOCK_SIGNAL_CANDIDATE, MOCK_REJECTED_CANDIDATE, mockAdapter } from '../adapter/mockAdapter';
import { apiAdapter } from '../adapter/apiAdapter';

interface AgentContextType {
  agentId: string | null;
  uiState: AgentUIState;
  activeStage: PipelineStage;
  candidate: SignalCandidate;
  posts: Post[];
  sourcesModalOpen: boolean;
  systemModalOpen: boolean;
  cycleCount: number;
  publishedCount: number;
  rejectedCount: number;
  isReducedMotion: boolean;
  initAgent: () => Promise<void>;
  triggerNextMockCycle: (forceReject?: boolean) => void;
  setSourcesModalOpen: (open: boolean) => void;
  setSystemModalOpen: (open: boolean) => void;
  setActiveStage: (stage: PipelineStage) => void;
}

const AgentContext = createContext<AgentContextType | null>(null);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agentId, setAgentId] = useState<string | null>(null);
  const [uiState, setUiState] = useState<AgentUIState>('STANDBY');
  const [activeStage, setActiveStage] = useState<PipelineStage>('OBSERVE');
  const [candidate, setCandidate] = useState<SignalCandidate>(MOCK_SIGNAL_CANDIDATE);
  const [posts, setPosts] = useState<Post[]>([]);
  const [sourcesModalOpen, setSourcesModalOpen] = useState(false);
  const [systemModalOpen, setSystemModalOpen] = useState(false);
  const [cycleCount, setCycleCount] = useState(1);
  const [publishedCount, setPublishedCount] = useState(1);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Fetch feed when agentId is set
  const refreshFeed = useCallback(async (id: string) => {
    try {
      const res = await apiAdapter.getFeed(id);
      setPosts(res.posts);
    } catch (err) {
      console.error('Error fetching feed:', err);
    }
  }, []);

  // Initialize Agent action
  const initAgent = useCallback(async () => {
    setUiState('INITIALIZING');
    try {
      const res = await apiAdapter.initAgent({
        name: "Oculus-AI",
        domain: "AI Security"
      });
      setAgentId(res.agentId);
      await refreshFeed(res.agentId);
      
      // Activation transition sequence: STANDBY -> INITIALIZING -> AUTONOMOUS MODE ACTIVE
      setTimeout(() => {
        setUiState('ACTIVE');
        startAutonomousSequence(false);
      }, 1200);
    } catch (err) {
      console.error('Failed to initialize agent:', err);
      setUiState('ERROR');
    }
  }, [refreshFeed]);

  // Runs one full autonomous pipeline step-by-step sequence: OBSERVE -> REMEMBER -> EVALUATE -> DECIDE -> PUBLISH/REJECT
  const startAutonomousSequence = useCallback((rejectCycle = false) => {
    const activeCand = rejectCycle ? MOCK_REJECTED_CANDIDATE : MOCK_SIGNAL_CANDIDATE;
    setCandidate(activeCand);

    // 1. OBSERVE
    setUiState('OBSERVING');
    setActiveStage('OBSERVE');

    // 2. REMEMBER after 3.5s
    setTimeout(() => {
      setUiState('REMEMBERING');
      setActiveStage('REMEMBER');
    }, 3500);

    // 3. EVALUATE after 7.0s
    setTimeout(() => {
      setUiState('EVALUATING');
      setActiveStage('EVALUATE');
    }, 7000);

    // 4. DECIDE after 10.5s
    setTimeout(() => {
      setUiState('DECIDING');
      setActiveStage('DECIDE');
    }, 10500);

    // 5. PUBLISH or REJECT after 14s
    setTimeout(() => {
      if (rejectCycle) {
        setUiState('REJECTED');
        setActiveStage('REJECT');
        setRejectedCount((prev) => prev + 1);
      } else {
        setUiState('PUBLISHED');
        setActiveStage('PUBLISH');
        setPublishedCount((prev) => prev + 1);

        // Add to posts feed if new
        const newPost: Post = {
          id: `PUB-2026-${Date.now().toString().slice(-6)}`,
          createdAt: new Date().toISOString(),
          text: activeCand.postText || '',
          rationale: activeCand.rationale || '',
          sources: activeCand.sources,
        };
        mockAdapter.addMockPost(newPost);
        setPosts((prev) => [newPost, ...prev]);
      }

      setCycleCount((prev) => prev + 1);

      // Return to IDLE after 6s of viewing publication/rejection
      setTimeout(() => {
        setUiState('IDLE');
      }, 6000);

    }, 14000);
  }, []);

  const triggerNextMockCycle = useCallback((forceReject = false) => {
    startAutonomousSequence(forceReject);
  }, [startAutonomousSequence]);

  return (
    <AgentContext.Provider
      value={{
        agentId,
        uiState,
        activeStage,
        candidate,
        posts,
        sourcesModalOpen,
        systemModalOpen,
        cycleCount,
        publishedCount,
        rejectedCount,
        isReducedMotion,
        initAgent,
        triggerNextMockCycle,
        setSourcesModalOpen,
        setSystemModalOpen,
        setActiveStage,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgentStore = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgentStore must be used within an AgentProvider');
  }
  return context;
};
