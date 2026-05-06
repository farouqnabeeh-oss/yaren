import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const username = "admin";
    const password = await bcrypt.hash("admin123", 10);

    await prisma.admin.upsert({
      where: { username },
      update: { password },
      create: { username, password },
    });

    return NextResponse.json({ success: true, message: "Admin created: admin / admin123" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
