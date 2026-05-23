const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

test('database connection succeeds', async () => {
  await expect(prisma.$queryRaw`SELECT 1`).resolves.toBeTruthy();
  await prisma.$disconnect();
  await pool.end();
});
