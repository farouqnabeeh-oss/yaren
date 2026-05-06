const { Pool } = require('pg');
require('dotenv').config();

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  console.log("Adding columns via direct PG connection...");

  try {
    const sqls = [
      'ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "address" TEXT DEFAULT \'كفركنا، المركز الرئيسي\';',
      'ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "heroTitle" TEXT DEFAULT \'نرسم لكم خارطة العالم\';',
      'ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "heroSubtitle" TEXT DEFAULT \'\';',
      'ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "heroVideo" TEXT DEFAULT \'\';',
      'ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "aboutTitle" TEXT DEFAULT \'\';',
      'ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "aboutText" TEXT DEFAULT \'\';',
      'ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "siteName" TEXT DEFAULT \'Yareen Tours\';'
    ];

    for (const sql of sqls) {
      console.log(`Executing: ${sql}`);
      await pool.query(sql);
    }

    console.log("Successfully added all columns!");
  } catch (error) {
    console.error("Failed to add columns:", error);
  } finally {
    await pool.end();
  }
}

main();
