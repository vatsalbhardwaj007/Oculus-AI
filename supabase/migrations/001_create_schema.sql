-- ============================================================
-- Oculus AI — Database Schema Migration
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================
-- This migration creates three tables: agents, topics, posts.
-- It does NOT touch the existing "incidents" table.
-- ============================================================

-- 1. AGENTS
-- Stores each initialized AI agent's identity.
CREATE TABLE IF NOT EXISTS agents (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  domain      TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TOPICS
-- Stores technology topics discovered by an agent.
CREATE TABLE IF NOT EXISTS topics (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id      UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  url           TEXT,
  source        TEXT,
  summary       TEXT,
  score         NUMERIC,
  status        TEXT,
  discovered_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index: look up all topics for a specific agent
CREATE INDEX IF NOT EXISTS idx_topics_agent_id ON topics(agent_id);

-- Index: detect repeated topics by agent + URL
CREATE INDEX IF NOT EXISTS idx_topics_agent_url ON topics(agent_id, url);

-- 3. POSTS
-- Stores published posts written by an agent.
CREATE TABLE IF NOT EXISTS posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id    UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  topic_id    UUID REFERENCES topics(id) ON DELETE SET NULL,
  text        TEXT NOT NULL,
  rationale   TEXT NOT NULL,
  sources     JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index: retrieve all posts for an agent in reverse chronological order
CREATE INDEX IF NOT EXISTS idx_posts_agent_created ON posts(agent_id, created_at DESC);
