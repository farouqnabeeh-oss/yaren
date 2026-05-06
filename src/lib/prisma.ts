import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;

  if (process.env.NODE_ENV === "production") {
    return new PrismaClient({
      datasources: {
        db: {
          url: connectionString,
        },
      },
    });
  }

  if (!connectionString) {
    return new PrismaClient();
  }

  try {
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  } catch (error) {
    return new PrismaClient({
      datasources: {
        db: {
          url: connectionString,
        },
      },
    });
  }
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

// Refreshed after schema cleanup to avoid column mismatch errors.

