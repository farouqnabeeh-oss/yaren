const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function setup() {
  const connectionString = process.env.DATABASE_URL;
  console.log("🔗 Connecting to:", connectionString.split("@")[1]); // Masking password

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const username = "admin";
  const password = "admin";
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.admin.upsert({
      where: { username },
      update: { password: hashedPassword },
      create: { username, password: hashedPassword },
    });
    console.log("✅ Admin user created/updated successfully in Production:", admin.username);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

setup();
