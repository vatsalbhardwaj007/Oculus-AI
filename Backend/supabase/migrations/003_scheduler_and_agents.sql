-- ============================================================
-- Oculus AI — Migration 003: Scheduler Fields & Dual-Agent Setup
-- ============================================================

-- Step 1: Add scheduling and state columns to agents table
ALTER TABLE agents
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'stopped',
  ADD COLUMN IF NOT EXISTS schedule_enabled BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS schedule_interval_minutes INTEGER NOT NULL DEFAULT 15,
  ADD COLUMN IF NOT EXISTS last_run_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS next_run_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS current_run_id TEXT,
  ADD COLUMN IF NOT EXISTS is_production BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS last_run_summary JSONB;

-- Step 2: Ensure Oculus AI (Production Agent) is properly configured
UPDATE agents
SET
  name = 'Oculus AI',
  domain = 'AI Systems & Cybersecurity Analyst',
  is_production = true,
  status = 'stopped',
  schedule_enabled = false
WHERE id = 'da694384-4f41-4204-8d25-df1abd2010fc';

-- Step 3: Ensure Oculus Test (Staging/Test Agent) is properly configured
UPDATE agents
SET
  name = 'Oculus Test',
  domain = 'AI Systems & Cybersecurity Analyst',
  is_production = false,
  status = 'stopped',
  schedule_enabled = false
WHERE id = '2116492e-8019-425d-8ee9-af0686882c91';

-- Step 4: Safely delete obsolete duplicate test agents
DELETE FROM agents
WHERE id IN (
  '95c99cc6-59f3-4421-93a2-e03d422f6153',
  '5ca2a604-6c8c-4211-927f-bd7b2fed8ff4',
  '3ffb279c-de0e-4f37-9d64-ddd686441ad2',
  'e199e147-8490-4a0b-b534-df887c18530f'
);
