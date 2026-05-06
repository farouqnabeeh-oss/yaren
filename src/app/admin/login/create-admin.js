const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdmin() {
  const username = "admin";
  const password = "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.admin.upsert({
      where: { username },
      update: { password: hashedPassword },
      create: { username, password: hashedPassword },
    });
    console.log("✅ Admin user created/updated successfully:", admin.username);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
