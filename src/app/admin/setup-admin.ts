import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const username = "admin";
  const password = await bcrypt.hash("admin123", 10);

  try {
    await prisma.admin.upsert({
      where: { username },
      update: { password },
      create: { username, password },
    });
    console.log("✅ Admin created: admin / admin123");
  } catch (err) {
    console.error("❌ Failed to create admin:", err);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
