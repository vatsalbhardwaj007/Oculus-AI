-- ============================================================
-- Oculus AI — Fix duplicate topics
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================
-- This migration:
--   1. Removes duplicate (agent_id, url) rows, keeping one copy
--   2. Adds a UNIQUE constraint so duplicates can never recur
-- It does NOT touch the incidents table.
-- ============================================================

-- Step 1: Delete duplicate rows, keeping the earliest-discovered copy.
-- For each group of rows sharing the same (agent_id, url), this keeps
-- the one with the smallest discovered_at and deletes the rest.
DELETE FROM topics
WHERE id NOT IN (
  SELECT DISTINCT ON (agent_id, url) id
  FROM topics
  ORDER BY agent_id, url, discovered_at ASC
);

-- Step 2: Add a unique constraint on (agent_id, url).
-- This prevents any future duplicate inserts at the database level.
-- We drop the old non-unique index first since the constraint creates
-- its own index automatically.
DROP INDEX IF EXISTS idx_topics_agent_url;

ALTER TABLE topics
  ADD CONSTRAINT uq_topics_agent_url UNIQUE (agent_id, url);
