const { Pool } = require('pg');
require('dotenv').config();

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  console.log("Creating Notification and ActivityLog tables...");

  try {
    // Create Notification table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "Notification" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "message" TEXT NOT NULL,
        "type" TEXT NOT NULL DEFAULT 'info',
        "isRead" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
      );
    `);

    // Create ActivityLog table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "ActivityLog" (
        "id" TEXT NOT NULL,
        "action" TEXT NOT NULL,
        "details" TEXT,
        "adminName" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
      );
    `);

    console.log("Successfully created all tables!");
  } catch (error) {
    console.error("Failed to create tables:", error);
  } finally {
    await pool.end();
  }
}

main();
