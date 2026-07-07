/**
 * Database connection helper
 * Supports both Cloudflare Workers (Hyperdrive) and Node.js/Bun environments
 */

/**
 * Get database client based on environment
 * @param {import('hono').Context} c - Hono context
 * @returns {Promise<import('pg').Pool>} Database pool
 */
export async function getDbClient(c) {
  // Hyperdrive binding exposes a connection string; fall back to DATABASE_URL
  // for Wrangler dev / local runs
  const hyperdriveConnectionString = c.env?.DB?.connectionString;
  const databaseUrl = hyperdriveConnectionString || c.env?.DATABASE_URL;

  if (databaseUrl) {
    try {
      const pg = await import("pg");
      const { Pool } = pg.default || pg;

      const pool = new Pool({
        connectionString: databaseUrl,
      });

      return pool;
    } catch (error) {
      console.error("Failed to create database connection:", error);
      throw new Error(
        "Database connection not available. Please configure Hyperdrive binding or DATABASE_URL.",
      );
    }
  }

  // Throw error if no database connection is available
  throw new Error(
    "No database connection available. Running in Wrangler dev requires DATABASE_URL in .env or Hyperdrive binding.",
  );
}
