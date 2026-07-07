-- =============================================================================
-- Migration: Add guest count to wish RSVP responses
-- Version: 2.2.0
-- =============================================================================
-- Allows family/group invitations to confirm how many people will attend.
-- Existing wishes are backfilled to 1 person.
--
-- How to run this migration:
--   psql -d sakeenah -f 002-add-guest-count-to-wishes.sql
--   OR copy and paste into your database client (pgAdmin, DBeaver, etc.)
-- =============================================================================

BEGIN;

ALTER TABLE wishes
ADD COLUMN IF NOT EXISTS guest_count INTEGER NOT NULL DEFAULT 1;

ALTER TABLE wishes
DROP CONSTRAINT IF EXISTS wishes_guest_count_check;

ALTER TABLE wishes
ADD CONSTRAINT wishes_guest_count_check CHECK (guest_count BETWEEN 1 AND 20);

COMMIT;

-- =============================================================================
-- Rollback instructions (if needed):
-- =============================================================================
-- BEGIN;
-- ALTER TABLE wishes DROP CONSTRAINT IF EXISTS wishes_guest_count_check;
-- ALTER TABLE wishes DROP COLUMN IF EXISTS guest_count;
-- COMMIT;
-- =============================================================================
