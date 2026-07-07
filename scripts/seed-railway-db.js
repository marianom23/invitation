/**
 * Seeds the Railway Postgres database with this invitation's data
 * (taken from src/config/config.js).
 *
 * Usage:
 *   DATABASE_URL=postgresql://... bun scripts/seed-railway-db.js
 *
 * Optionally set INVITATION_UID to override the default UID.
 */
import { Pool } from "pg";
import config from "../src/config/config.js";

const connectionString =
  process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_PUBLIC_URL or DATABASE_URL is required to seed the database.",
  );
}

const uid = process.env.INVITATION_UID || "carolina-ignacio-2026";
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const wedding = config.data;

async function setupSchema(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS invitations (
      id SERIAL PRIMARY KEY,
      uid VARCHAR(50) UNIQUE NOT NULL,
      title VARCHAR(500) NOT NULL,
      description TEXT,
      groom_name VARCHAR(100) NOT NULL,
      bride_name VARCHAR(100) NOT NULL,
      parent_groom VARCHAR(255),
      parent_bride VARCHAR(255),
      wedding_date DATE NOT NULL,
      time VARCHAR(100),
      location VARCHAR(500),
      address TEXT,
      maps_url TEXT,
      maps_embed TEXT,
      og_image VARCHAR(500) DEFAULT '/images/og-image.jpg',
      favicon VARCHAR(500) DEFAULT '/images/favicon.ico',
      audio JSONB DEFAULT '{"src": "/audio/fulfilling-humming.mp3", "title": "Fulfilling Humming", "autoplay": true, "loop": true}'::jsonb,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS wishes (
      id SERIAL PRIMARY KEY,
      invitation_uid VARCHAR(50) NOT NULL REFERENCES invitations(uid) ON DELETE CASCADE,
      name VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      attendance VARCHAR(20) DEFAULT 'MAYBE' CHECK (attendance IN ('ATTENDING', 'NOT_ATTENDING', 'MAYBE')),
      guest_count INTEGER NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT unique_wish_per_guest UNIQUE (invitation_uid, name)
    );

    CREATE TABLE IF NOT EXISTS agenda (
      id SERIAL PRIMARY KEY,
      invitation_uid VARCHAR(50) NOT NULL REFERENCES invitations(uid) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      start_time TIME,
      end_time TIME,
      location VARCHAR(500),
      address TEXT,
      order_index INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS banks (
      id SERIAL PRIMARY KEY,
      invitation_uid VARCHAR(50) NOT NULL REFERENCES invitations(uid) ON DELETE CASCADE,
      bank VARCHAR(255) NOT NULL,
      account_number VARCHAR(100) NOT NULL,
      account_name VARCHAR(255) NOT NULL,
      alias VARCHAR(255),
      country VARCHAR(100),
      order_index INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.query(
    "ALTER TABLE banks ADD COLUMN IF NOT EXISTS alias VARCHAR(255)",
  );
  await client.query(
    "ALTER TABLE banks ADD COLUMN IF NOT EXISTS country VARCHAR(100)",
  );
  await client.query(
    "ALTER TABLE wishes ADD COLUMN IF NOT EXISTS guest_count INTEGER NOT NULL DEFAULT 1",
  );
  await client.query(
    "CREATE INDEX IF NOT EXISTS idx_wishes_invitation_uid ON wishes(invitation_uid)",
  );
  await client.query(
    "CREATE INDEX IF NOT EXISTS idx_wishes_created_at ON wishes(created_at DESC)",
  );
  await client.query(
    "CREATE INDEX IF NOT EXISTS idx_agenda_invitation_uid ON agenda(invitation_uid)",
  );
  await client.query(
    "CREATE INDEX IF NOT EXISTS idx_banks_invitation_uid ON banks(invitation_uid)",
  );
}

async function seedInvitation(client) {
  const [mainVenue] = wedding.venues;

  await client.query(
    `INSERT INTO invitations (
      uid, title, description, groom_name, bride_name, parent_groom, parent_bride,
      wedding_date, time, location, address, maps_url, maps_embed, og_image, favicon, audio
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16::jsonb)
    ON CONFLICT (uid) DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      groom_name = EXCLUDED.groom_name,
      bride_name = EXCLUDED.bride_name,
      parent_groom = EXCLUDED.parent_groom,
      parent_bride = EXCLUDED.parent_bride,
      wedding_date = EXCLUDED.wedding_date,
      time = EXCLUDED.time,
      location = EXCLUDED.location,
      address = EXCLUDED.address,
      maps_url = EXCLUDED.maps_url,
      maps_embed = EXCLUDED.maps_embed,
      og_image = EXCLUDED.og_image,
      favicon = EXCLUDED.favicon,
      audio = EXCLUDED.audio,
      updated_at = CURRENT_TIMESTAMP`,
    [
      uid,
      wedding.title,
      wedding.description,
      wedding.groomName,
      wedding.brideName,
      wedding.parentGroom,
      wedding.parentBride,
      wedding.date,
      wedding.time,
      mainVenue?.location,
      mainVenue?.address,
      mainVenue?.maps_url,
      mainVenue?.maps_embed,
      wedding.ogImage,
      wedding.favicon,
      JSON.stringify(wedding.audio),
    ],
  );

  await client.query("DELETE FROM agenda WHERE invitation_uid = $1", [uid]);
  for (const [index, item] of wedding.agenda.entries()) {
    await client.query(
      `INSERT INTO agenda (
        invitation_uid, title, date, start_time, end_time, location, address, order_index
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        uid,
        item.title,
        item.date,
        item.startTime,
        item.endTime,
        item.location,
        item.address,
        index,
      ],
    );
  }

  await client.query("DELETE FROM banks WHERE invitation_uid = $1", [uid]);
  for (const [index, bank] of wedding.banks.entries()) {
    await client.query(
      `INSERT INTO banks (
        invitation_uid, bank, account_number, account_name, alias, country, order_index
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        uid,
        bank.bank,
        bank.accountNumber,
        bank.accountName,
        bank.alias,
        bank.country,
        index,
      ],
    );
  }
}

const client = await pool.connect();
try {
  await client.query("BEGIN");
  await setupSchema(client);
  await seedInvitation(client);
  await client.query("COMMIT");
  console.log(`Seeded invitation "${uid}" successfully.`);
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
  await pool.end();
}
