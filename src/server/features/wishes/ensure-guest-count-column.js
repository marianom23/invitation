let guestCountColumnReady = false;

export async function ensureGuestCountColumn(pool) {
  if (guestCountColumnReady) return;

  await pool.query(
    "ALTER TABLE wishes ADD COLUMN IF NOT EXISTS guest_count INTEGER NOT NULL DEFAULT 1",
  );

  guestCountColumnReady = true;
}
