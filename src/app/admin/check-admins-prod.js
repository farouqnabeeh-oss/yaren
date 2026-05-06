const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config();

async function checkAdmins() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const admins = await prisma.admin.findMany();
    console.log("👥 Existing Admins in Production:", admins.map(a => a.username));
    
    if (admins.length === 0) {
      console.log("❌ NO ADMINS FOUND!");
    }
  } catch (error) {
    console.error("❌ Error fetching admins:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

checkAdmins();
