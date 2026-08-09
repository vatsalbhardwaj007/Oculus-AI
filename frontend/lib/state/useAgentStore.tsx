"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { AgentUIState, PipelineStage, Post, SignalCandidate, ActivityLogEntry, AgentRecord } from '../adapter/types';
import { MOCK_SIGNAL_CANDIDATE_PUBLISH, MOCK_SIGNAL_CANDIDATE_REJECT } from '../adapter/mockAdapter';
import { apiAdapter } from '../adapter/apiAdapter';

interface AgentContextType {
  agentId: string | null;
  selectedAgent: AgentRecord | null;
  agentsList: AgentRecord[];
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
  resetTimer: () => void;
  selectAgent: (id: string) => void;
  initAgent: () => Promise<void>;
  startAgent: () => Promise<void>;
  stopAgent: () => Promise<void>;
  runSingleCycle: () => Promise<void>;
  triggerNextMockCycle: (forceReject?: boolean) => void;
  setSourcesModalOpen: (open: boolean) => void;
  setSystemModalOpen: (open: boolean) => void;
  setActiveStage: (stage: PipelineStage) => void;
  scrollToStage: (stageId: string) => void;
  toggleAutonomousMode: () => void;
  refreshAgentList: () => Promise<void>;
}

const AgentContext = createContext<AgentContextType | null>(null);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agentsList, setAgentsList] = useState<AgentRecord[]>([]);
  const [agentId, setAgentId] = useState<string | null>('da694384-4f41-4204-8d25-df1abd2010fc'); // Oculus AI (Prod)
  const [uiState, setUiState] = useState<AgentUIState>('STANDBY');
  const [activeStage, setActiveStage] = useState<PipelineStage>('OBSERVE');
  const [candidate, setCandidate] = useState<SignalCandidate>(MOCK_SIGNAL_CANDIDATE_PUBLISH);
  const [posts, setPosts] = useState<Post[]>([]);
  const [sourcesModalOpen, setSourcesModalOpen] = useState(false);
  const [systemModalOpen, setSystemModalOpen] = useState(false);
  
  // Metrics
  const [cycleCount, setCycleCount] = useState(1);
  const [publishedCount, setPublishedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isAutonomousActive, setIsAutonomousActive] = useState(false);

  // 15-Minute Countdown Clock (900 seconds)
  const [demoCountdownSeconds, setDemoCountdownSeconds] = useState(900);

  // Activity Trace Logs
  const [traceLogs, setTraceLogs] = useState<ActivityLogEntry[]>([
    { id: '1', timestamp: '00:39:51', message: 'OCULUS SYSTEM INITIALIZED // STANDBY MODE', type: 'INFO' },
    { id: '2', timestamp: '00:39:52', message: 'EVALUATION ENGINE READY (GROQ LLM)', type: 'INFO' },
    { id: '3', timestamp: '00:39:53', message: 'SCHEDULER STATUS: STOPPED (DISCRETE CYCLES ONLY)', type: 'INFO' },
  ]);

  const sequenceTimeoutRef = useRef<NodeJS.Timeout[]>([]);

  const selectedAgent = agentsList.find((a) => a.id === agentId) || (agentsList.length > 0 ? agentsList[0] : null);

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
    setTraceLogs((prev) => [entry, ...prev.slice(0, 49)]);
  }, []);

  // Reset 15-minute countdown timer to 900s (15:00)
  const resetTimer = useCallback(() => {
    setDemoCountdownSeconds(900);
    addTraceLog('CRON TIMER RESET TO 15:00', undefined, 'INFO');
  }, [addTraceLog]);

  // Fetch feed from Supabase database and update candidate dynamically from latest real post
  const refreshFeed = useCallback(async (id: string) => {
    try {
      const res = await apiAdapter.getFeed(id);
      if (res.posts && res.posts.length > 0) {
        setPosts(res.posts);
        setPublishedCount(res.posts.length);
        setMemoryIndex(res.posts.length);

        const latest = res.posts[0];
        setCandidate({
          id: latest.id,
          signalId: latest.id.substring(0, 8),
          title: latest.title,
          source: latest.sources?.[0] ? new URL(latest.sources[0]).hostname : 'Live Threat Intel',
          severity: 'HIGH',
          initialConfidence: 0.45,
          confidenceScore: latest.confidenceScore || 0.92,
          threshold: 0.75,
          noveltyScore: latest.noveltyScore || 0.85,
          overlapLevel: latest.overlapLevel || 'LOW',
          similarityIndex: 12.4,
          relatedRecordsCount: 3,
          vectorMatchScore: 0.88,
          sourceQuality: 'AUTHORITATIVE',
          threatRelevance: 'CRITICAL',
          sources: latest.sources || [],
          outcome: 'PUBLISH',
          postText: latest.text,
          rationale: latest.rationale,
          whySelected: latest.whySelected || [
            'High cybersecurity relevance',
            'Verified telemetry & evidence quality',
            'Low correlation with past research records',
          ],
          whyItMattersNow: latest.whyItMattersNow || [
            'Timely discovery from live security RSS feeds',
            'Immediate relevance to enterprise systems defense',
          ],
        });
      }
    } catch (err: any) {
      console.error('Error fetching feed:', err);
      addTraceLog(`FEED FETCH ERROR: ${err.message || 'Unknown error'}`, undefined, 'ERROR');
    }
  }, [addTraceLog]);

  // Fetch list of agents from backend
  const refreshAgentList = useCallback(async () => {
    try {
      const res = await apiAdapter.listAgents();
      if (res.agents && res.agents.length > 0) {
        setAgentsList(res.agents);
        if (!agentId || !res.agents.some((a: AgentRecord) => a.id === agentId)) {
          setAgentId(res.agents[0].id);
        }
      }
    } catch (err) {
      console.warn('Backend not available yet for agent list:', err);
    }
  }, [agentId]);

  useEffect(() => {
    refreshAgentList();
  }, [refreshAgentList]);

  useEffect(() => {
    if (agentId) {
      refreshFeed(agentId);
    }
  }, [agentId, refreshFeed]);

  // Select agent tab
  const selectAgent = useCallback((id: string) => {
    setAgentId(id);
    const target = agentsList.find((a) => a.id === id);
    addTraceLog(`SWITCHED ACTIVE AGENT TO: ${target ? target.name : id}`, undefined, 'INFO');
    refreshFeed(id);
  }, [agentsList, addTraceLog, refreshFeed]);

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

  // Smooth Scroll Helper
  const scrollToStage = useCallback((stageId: string) => {
    const element = document.getElementById(stageId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Run real pipeline cycle on backend
  const runPipelineCycle = useCallback(async (id: string) => {
    setUiState('OBSERVING');
    setActiveStage('OBSERVE');
    addTraceLog(`EXECUTING ONE BOUNDED CYCLE FOR AGENT ${id}...`, 'OBSERVE', 'INFO');
    scrollToStage('observe-stage');

    try {
      setUiState('EVALUATING');
      setActiveStage('EVALUATE');
      addTraceLog('RUNNING GROQ EDITORIAL EVALUATION...', 'EVALUATE', 'INFO');
      scrollToStage('evaluate-stage');

      const summary = await apiAdapter.runPipeline(id);

      addTraceLog(`CYCLE RESULT: Discovered ${summary.discovered}, New: ${summary.newTopics}, Published: ${summary.published}, Rejected: ${summary.rejected}`, 'DECIDE', 'SUCCESS');

      if (!summary.isProduction) {
        addTraceLog(`AGENT POLICY: ${summary.agentId} IS TEST AGENT // PRODUCTION PUBLISHING BLOCKED`, 'PUBLISH', 'INFO');
      }

      setPublishedCount((prev) => prev + (summary.published || 0));
      setRejectedCount((prev) => prev + (summary.rejected || 0));
      setCycleCount((prev) => prev + 1);

      if (summary.published > 0) {
        setUiState('PUBLISHED');
        setActiveStage('PUBLISH');
        setMemoryIndex((prev) => prev + summary.published);
        addTraceLog(`DECISION: PUBLISHED ${summary.published} RESEARCH ARTIFACT(S)`, 'PUBLISH', 'SUCCESS');
        scrollToStage('publish-stage');
      } else {
        setUiState('REJECTED');
        setActiveStage('REJECT');
        addTraceLog(`DECISION: ${summary.rejected} TOPICS REJECTED`, 'REJECT', 'WARN');
        scrollToStage('reject-stage');
      }

      await refreshFeed(id);
      await refreshAgentList();

      setTimeout(() => {
        setUiState('IDLE');
        setActiveStage('MEMORY');
        addTraceLog(`CYCLE COMPLETE // AGENT WAIT STATE`, 'MEMORY', 'INFO');
      }, 4000);

    } catch (err: any) {
      console.error('Error running pipeline cycle:', err);
      setUiState('STANDBY');
      addTraceLog(`PIPELINE CYCLE FAILED: ${err.message || 'Unknown error'}`, undefined, 'ERROR');
    }
  }, [addTraceLog, scrollToStage, refreshFeed, refreshAgentList]);

  // Countdown clock & auto-run trigger when 15-minute cycle expires
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoCountdownSeconds((prev) => {
        if (!agentId) return prev;

        const currentAgent = agentsList.find((a) => a.id === agentId);
        const isAgentRunning = currentAgent?.status === 'running' || currentAgent?.scheduleEnabled;

        // Pause timer exactly where it is when agent is stopped
        if (!isAgentRunning) {
          return prev;
        }

        if (prev <= 1) {
          if (uiState !== 'OBSERVING' && uiState !== 'EVALUATING' && uiState !== 'DECIDING') {
            addTraceLog(`15-MINUTE SCHEDULER TICK // AUTO-STARTING PIPELINE SCAN FOR AGENT ${agentId}`, undefined, 'SUCCESS');
            runPipelineCycle(agentId);
          }
          return 900;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [agentId, agentsList, uiState, runPipelineCycle, addTraceLog]);

  // Persistently start agent and resume 15-minute cron timer
  const startAgent = useCallback(async () => {
    if (!agentId) return;
    try {
      await apiAdapter.startAgent(agentId);
      setAgentsList((prev) =>
        prev.map((a) =>
          a.id === agentId ? { ...a, status: 'running', scheduleEnabled: true } : a
        )
      );
      addTraceLog(`AGENT STARTED // STATUS: RUNNING // SCHEDULER ENABLED`, undefined, 'SUCCESS');
      await refreshAgentList();
    } catch (err: any) {
      console.error('Error starting agent:', err);
      addTraceLog(`START ERROR: ${err.message}`, undefined, 'ERROR');
    }
  }, [agentId, addTraceLog, refreshAgentList]);

  // Persistently stop agent and pause 15-minute cron timer where it is
  const stopAgent = useCallback(async () => {
    if (!agentId) return;
    try {
      await apiAdapter.stopAgent(agentId);
      setAgentsList((prev) =>
        prev.map((a) =>
          a.id === agentId ? { ...a, status: 'stopped', scheduleEnabled: false } : a
        )
      );
      addTraceLog(`AGENT PAUSED // STATUS: STOPPED // TIMER PAUSED`, undefined, 'WARN');
      await refreshAgentList();
    } catch (err: any) {
      console.error('Error stopping agent:', err);
      addTraceLog(`STOP ERROR: ${err.message}`, undefined, 'ERROR');
    }
  }, [agentId, addTraceLog, refreshAgentList]);

  // Execute ONE bounded test cycle manually
  const runSingleCycle = useCallback(async () => {
    if (!agentId) return;
    await runPipelineCycle(agentId);
  }, [agentId, runPipelineCycle]);

  // Initialize Agent
  const initAgent = useCallback(async () => {
    setUiState('INITIALIZING');
    addTraceLog('INITIALIZING OCULUS-AI AGENT...', undefined, 'INFO');
    
    try {
      if (agentId) {
        await refreshFeed(agentId);
      }
      await refreshAgentList();

      setUiState('IDLE');
      setActiveStage('OBSERVE');
      addTraceLog('OCULUS-AI CORE LOADED // STANDBY', undefined, 'SUCCESS');
      scrollToStage('observe-stage');
    } catch (err: any) {
      setUiState('STANDBY');
      addTraceLog(`INIT ERROR: ${err.message || 'Unknown error'}`, undefined, 'ERROR');
    }
  }, [agentId, refreshFeed, refreshAgentList, addTraceLog, scrollToStage]);

  // Trigger Mock Cycle (For local demo testing)
  const triggerNextMockCycle = useCallback((forceReject = false) => {
    sequenceTimeoutRef.current.forEach(clearTimeout);
    sequenceTimeoutRef.current = [];

    const selectedCandidate = forceReject ? MOCK_SIGNAL_CANDIDATE_REJECT : MOCK_SIGNAL_CANDIDATE_PUBLISH;
    setCandidate(selectedCandidate);

    setUiState('OBSERVING');
    setActiveStage('OBSERVE');
    addTraceLog('STAGE 01: OBSERVE // SCANNING SIGNAL VECTOR FIELDS', 'OBSERVE', 'INFO');
    scrollToStage('observe-stage');

    const t1 = setTimeout(() => {
      setActiveStage('REMEMBER');
      addTraceLog('STAGE 02: REMEMBER // CROSS-REFERENCING VECTOR INDEX', 'REMEMBER', 'INFO');
      scrollToStage('remember-stage');
    }, 1800);

    const t2 = setTimeout(() => {
      setUiState('EVALUATING');
      setActiveStage('EVALUATE');
      addTraceLog('STAGE 03: EVALUATE // COMPUTING NOVELTY & THREAT SCORES', 'EVALUATE', 'INFO');
      scrollToStage('evaluate-stage');
    }, 3600);

    const t3 = setTimeout(() => {
      setUiState('DECIDING');
      setActiveStage('DECIDE');
      addTraceLog(`STAGE 04: DECIDE // THRESHOLD EVALUATION: ${selectedCandidate.outcome}`, 'DECIDE', 'INFO');
      scrollToStage('decide-stage');
    }, 5400);

    const t4 = setTimeout(() => {
      if (forceReject) {
        setUiState('REJECTED');
        setActiveStage('REJECT');
        setRejectedCount((prev) => prev + 1);
        addTraceLog('DECISION: REJECTED // SIGNAL BELOW NOVELTY THRESHOLD', 'REJECT', 'WARN');
        scrollToStage('reject-stage');
      } else {
        setUiState('PUBLISHED');
        setActiveStage('PUBLISH');
        setPublishedCount((prev) => prev + 1);
        setMemoryIndex((prev) => prev + 1);
        setPosts((prev) => [
          {
            id: `post-${Date.now()}`,
            agentId: agentId || 'da694384-4f41-4204-8d25-df1abd2010fc',
            title: selectedCandidate.title,
            text: selectedCandidate.postText || '',
            rationale: selectedCandidate.rationale || 'Verified threat intelligence artifact.',
            createdAt: new Date().toISOString(),
            confidenceScore: selectedCandidate.confidenceScore,
            noveltyScore: selectedCandidate.noveltyScore,
            overlapLevel: selectedCandidate.overlapLevel,
            sources: selectedCandidate.sources,
            whySelected: selectedCandidate.whySelected || [],
            whyItMattersNow: selectedCandidate.whyItMattersNow || [],
          },
          ...prev,
        ]);
        addTraceLog('DECISION: PUBLISHED // VERIFIED RESEARCH ARTIFACT GENERATED', 'PUBLISH', 'SUCCESS');
        scrollToStage('publish-stage');
      }
      setCycleCount((prev) => prev + 1);
    }, 7200);

    const t5 = setTimeout(() => {
      setUiState('IDLE');
      setActiveStage('MEMORY');
      addTraceLog('CYCLE COMPLETE // PERSISTED TO MEMORY MATRIX', 'MEMORY', 'INFO');
    }, 10000);

    sequenceTimeoutRef.current = [t1, t2, t3, t4, t5];
  }, [agentId, addTraceLog, scrollToStage]);

  // Toggle Autonomous Mode
  const toggleAutonomousMode = useCallback(() => {
    setIsAutonomousActive((prev) => {
      const next = !prev;
      addTraceLog(`AUTONOMOUS SCHEDULER ${next ? 'ACTIVATED' : 'PAUSED'}`, undefined, next ? 'SUCCESS' : 'WARN');
      return next;
    });
  }, [addTraceLog]);

  // Modals
  const setSourcesModalOpenAction = useCallback((open: boolean) => setSourcesModalOpen(open), []);
  const setSystemModalOpenAction = useCallback((open: boolean) => setSystemModalOpen(open), []);

  return (
    <AgentContext.Provider
      value={{
        agentId,
        selectedAgent,
        agentsList,
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
        selectAgent,
        initAgent,
        startAgent,
        stopAgent,
        resetTimer,
        runSingleCycle,
        triggerNextMockCycle,
        setSourcesModalOpen: setSourcesModalOpenAction,
        setSystemModalOpen: setSystemModalOpenAction,
        setActiveStage,
        scrollToStage,
        toggleAutonomousMode,
        refreshAgentList,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgentStore = (): AgentContextType => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgentStore must be used within an AgentProvider');
  }
  return context;
};
