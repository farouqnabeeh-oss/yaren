import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, subject, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "الرجاء تعبئة كافة الحقول المطلوبة" }, { status: 400 });
    }

    // Create a Notification in the database
    await prisma.notification.create({
      data: {
        title: `رسالة تواصل جديدة: ${name}`,
        message: `الموضوع: ${subject || "استفسار عام"}\nرقم الهاتف: ${phone}\nالرسالة: ${message}`,
        type: "info"
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating contact notification:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة لاحقاً" }, { status: 500 });
  }
}
