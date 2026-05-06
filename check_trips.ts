import prisma from "./src/lib/prisma";

async function main() {
  const trips = await prisma.trip.findMany();
  console.log(JSON.stringify(trips, null, 2));
}

main();
