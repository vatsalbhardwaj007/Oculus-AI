"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { AgentUIState, PipelineStage, Post, SignalCandidate, ActivityLogEntry } from '../adapter/types';
import { MOCK_SIGNAL_CANDIDATE_PUBLISH, MOCK_SIGNAL_CANDIDATE_REJECT, INITIAL_HISTORICAL_POSTS, mockAdapter } from '../adapter/mockAdapter';
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
  memoryIndex: number;
  isReducedMotion: boolean;
  demoCountdownSeconds: number; // 15-minute countdown clock
  isAutonomousActive: boolean;
  traceLogs: ActivityLogEntry[];
  
  // Actions
  initAgent: () => Promise<void>;
  triggerNextMockCycle: (forceReject?: boolean) => void;
  setSourcesModalOpen: (open: boolean) => void;
  setSystemModalOpen: (open: boolean) => void;
  setActiveStage: (stage: PipelineStage) => void;
  scrollToStage: (stageId: string) => void;
  toggleAutonomousMode: () => void;
}

const AgentContext = createContext<AgentContextType | null>(null);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agentId, setAgentId] = useState<string | null>(null);
  const [uiState, setUiState] = useState<AgentUIState>('STANDBY');
  const [activeStage, setActiveStage] = useState<PipelineStage>('OBSERVE');
  const [candidate, setCandidate] = useState<SignalCandidate>(MOCK_SIGNAL_CANDIDATE_PUBLISH);
  const [posts, setPosts] = useState<Post[]>(INITIAL_HISTORICAL_POSTS);
  const [sourcesModalOpen, setSourcesModalOpen] = useState(false);
  const [systemModalOpen, setSystemModalOpen] = useState(false);
  
  // Metrics
  const [cycleCount, setCycleCount] = useState(1);
  const [publishedCount, setPublishedCount] = useState(4);
  const [rejectedCount, setRejectedCount] = useState(1);
  const [memoryIndex, setMemoryIndex] = useState(1284);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isAutonomousActive, setIsAutonomousActive] = useState(false);

  // 15-Minute Countdown Clock (900 seconds)
  const [demoCountdownSeconds, setDemoCountdownSeconds] = useState(872); // starts around 14:32

  // Activity Trace Logs
  const [traceLogs, setTraceLogs] = useState<ActivityLogEntry[]>([
    { id: '1', timestamp: '00:39:51', message: 'INITIALIZING MEMORY INDEX', type: 'INFO' },
    { id: '2', timestamp: '00:39:52', message: 'EVALUATION ENGINE READY', type: 'INFO' },
    { id: '3', timestamp: '00:39:53', message: 'SYSTEM STANDBY', type: 'INFO' },
  ]);

  const sequenceTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  // Format timestamp for logs
  const getFormattedTime = () => {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const addTraceLog = useCallback((message: string, stage?: PipelineStage, type: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR' = 'INFO') => {
    const entry: ActivityLogEntry = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: getFormattedTime(),
      message,
      stage,
      type,
    };
    setTraceLogs((prev) => [entry, ...prev.slice(0, 49)]); // keep last 50 logs
  }, []);

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

  // Ticking Demo Scheduler Countdown Clock
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoCountdownSeconds((prev) => {
        if (prev <= 1) {
          return 900; // Reset to 15:00
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth Scroll Helper to navigate between continuous stages
  const scrollToStage = useCallback((stageId: string) => {
    const element = document.getElementById(stageId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Runs full autonomous pipeline sequence with clean logging & transitions
  const startAutonomousSequence = useCallback((rejectCycle = false) => {
    // Clear any existing step timers
    sequenceTimeoutRef.current.forEach(clearTimeout);
    sequenceTimeoutRef.current = [];

    const activeCand = rejectCycle ? MOCK_SIGNAL_CANDIDATE_REJECT : MOCK_SIGNAL_CANDIDATE_PUBLISH;
    setCandidate(activeCand);

    // 1. OBSERVE (Immediate)
    setUiState('OBSERVING');
    setActiveStage('OBSERVE');
    addTraceLog(`SCANNING SECURITY FRONTIER // INGESTING SIGNAL ${activeCand.signalId}`, 'OBSERVE', 'INFO');
    scrollToStage('observe-stage');

    // Telemetry log cascade
    const t1 = setTimeout(() => addTraceLog(`SOURCE DISCOVERED: ${activeCand.source}`, 'OBSERVE', 'INFO'), 1000);
    const t2 = setTimeout(() => addTraceLog(`SIGNAL INGESTED: ${activeCand.title.substring(0, 32)}...`, 'OBSERVE', 'INFO'), 1800);
    const t3 = setTimeout(() => addTraceLog(`TELEMETRY VERIFIED // SIGNAL NORMALIZED`, 'OBSERVE', 'INFO'), 2600);

    // 2. REMEMBER after 3.5s
    const t4 = setTimeout(() => {
      setUiState('REMEMBERING');
      setActiveStage('REMEMBER');
      addTraceLog(`MEMORY MATRIX LOOKUP // COMPARING WITH ${activeCand.relatedRecordsCount} RECORDS`, 'REMEMBER', 'INFO');
      scrollToStage('remember-stage');
    }, 3500);

    // 3. EVALUATE after 7.0s
    const t5 = setTimeout(() => {
      setUiState('EVALUATING');
      setActiveStage('EVALUATE');
      addTraceLog(`EVIDENCE SYNTHESIS // CONFIDENCE: ${(activeCand.confidenceScore * 100).toFixed(0)}%`, 'EVALUATE', 'INFO');
      scrollToStage('evaluate-stage');
    }, 7000);

    // 4. DECIDE after 10.5s
    const t6 = setTimeout(() => {
      setUiState('DECIDING');
      setActiveStage('DECIDE');
      addTraceLog(`AUTONOMOUS EDITORIAL JUDGMENT RUNNING...`, 'DECIDE', 'INFO');
      scrollToStage('decide-stage');
    }, 10500);

    // 5. PUBLISH or REJECT after 14.0s
    const t7 = setTimeout(() => {
      if (rejectCycle) {
        setUiState('REJECTED');
        setActiveStage('REJECT');
        setRejectedCount((prev) => prev + 1);
        addTraceLog(`DECISION: REJECTED // ${activeCand.rejectionCode}`, 'REJECT', 'WARN');
        scrollToStage('reject-stage');
      } else {
        setUiState('PUBLISHED');
        setActiveStage('PUBLISH');
        setPublishedCount((prev) => prev + 1);
        setMemoryIndex((prev) => prev + 1);
        addTraceLog(`DECISION: PUBLISH // GENERATING RESEARCH ARTIFACT`, 'PUBLISH', 'SUCCESS');

        const newPost: Post = {
          id: `PUB-2026-${Date.now().toString().slice(-6)}`,
          createdAt: new Date().toISOString(),
          title: activeCand.title,
          text: activeCand.postText || '',
          rationale: activeCand.rationale || '',
          sources: activeCand.sources,
          confidenceScore: activeCand.confidenceScore,
          noveltyScore: activeCand.noveltyScore,
          overlapLevel: activeCand.overlapLevel,
          whySelected: activeCand.whySelected || [],
          whyItMattersNow: activeCand.whyItMattersNow || []
        };

        mockAdapter.addMockPost(newPost);
        setPosts((prev) => [newPost, ...prev]);
        scrollToStage('publish-stage');
      }

      setCycleCount((prev) => prev + 1);

      // Return to IDLE & scroll to memory after 6.5s of viewing outcome
      const t8 = setTimeout(() => {
        setUiState('IDLE');
        setActiveStage('MEMORY');
        addTraceLog(`CYCLE COMPLETE // MEMORY INDEX UPDATED (${memoryIndex + 1})`, 'MEMORY', 'INFO');
      }, 6500);

      sequenceTimeoutRef.current.push(t8);
    }, 14000);

    sequenceTimeoutRef.current.push(t1, t2, t3, t4, t5, t6, t7);
  }, [addTraceLog, scrollToStage, memoryIndex]);

  // Fetch feed
  const refreshFeed = useCallback(async (id: string) => {
    try {
      const res = await apiAdapter.getFeed(id);
      if (res.posts && res.posts.length > 0) {
        setPosts(res.posts);
      }
    } catch (err) {
      console.error('Error fetching feed:', err);
    }
  }, []);

  // Init Agent
  const initAgent = useCallback(async () => {
    setUiState('INITIALIZING');
    addTraceLog('INITIALIZING OCULUS-AI PERSONA...', undefined, 'INFO');
    try {
      const res = await apiAdapter.initAgent({
        name: "Oculus-AI",
        domain: "AI Security"
      });
      setAgentId(res.agentId);
      await refreshFeed(res.agentId);

      setTimeout(() => {
        setUiState('ACTIVE');
        setIsAutonomousActive(true);
        addTraceLog('AUTONOMY ENABLED // NO OPERATOR INPUT REQUIRED', undefined, 'SUCCESS');
        startAutonomousSequence(false);
      }, 1200);
    } catch (err) {
      console.error('Failed to initialize agent:', err);
      setUiState('ERROR');
      addTraceLog('ERROR INITIALIZING AGENT', undefined, 'ERROR');
    }
  }, [refreshFeed, addTraceLog, startAutonomousSequence]);

  const triggerNextMockCycle = useCallback((forceReject = false) => {
    startAutonomousSequence(forceReject);
  }, [startAutonomousSequence]);

  const toggleAutonomousMode = useCallback(() => {
    setIsAutonomousActive((prev) => !prev);
  }, []);

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
        memoryIndex,
        isReducedMotion,
        demoCountdownSeconds,
        isAutonomousActive,
        traceLogs,
        initAgent,
        triggerNextMockCycle,
        setSourcesModalOpen,
        setSystemModalOpen,
        setActiveStage,
        scrollToStage,
        toggleAutonomousMode,
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
