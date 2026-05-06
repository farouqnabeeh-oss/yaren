import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.warn("⚠️ DATABASE_URL is not defined. Prisma is running in fallback mode.");
    return new PrismaClient();
  }

  try {
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  } catch (error) {
    console.warn("⚠️ Failed to initialize PrismaPg adapter. Falling back to default PrismaClient.", error);
    return new PrismaClient();
  }
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

// Refreshed after schema cleanup to avoid column mismatch errors.

