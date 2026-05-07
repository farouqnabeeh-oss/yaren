import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const adminCount = await prisma.admin.count();
    const firstAdmin = await prisma.admin.findFirst({
      select: { username: true }
    });
    
    return NextResponse.json({
      success: true,
      adminCount,
      firstAdmin: firstAdmin?.username || "None found",
      env_db_set: !!process.env.DATABASE_URL,
      db_url_start: process.env.DATABASE_URL?.substring(0, 15) + "..."
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 200 });
  }
}
