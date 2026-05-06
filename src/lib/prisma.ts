import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;

  // During build time, if connection string is missing, we still need to provide an adapter 
  // or handle it gracefully to satisfy the client's demands.
  if (!connectionString) {
    // We return a standard client which will fail at runtime but might pass the build 
    // IF the build process doesn't actually trigger a query.
    // However, the error says we MUST provide an adapter if engine type is client.
    return new PrismaClient();
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
