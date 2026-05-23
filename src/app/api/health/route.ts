import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Simple query to ensure DB connectivity
    await prisma.$queryRaw`SELECT 1`;
    return new Response(JSON.stringify({ status: "ok" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Health check DB error:", error);
    return new Response(JSON.stringify({ status: "error", error: String(error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
