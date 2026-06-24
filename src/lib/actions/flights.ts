"use server";

import prisma from "@/lib/prisma";
// Dynamic import for revalidatePath to avoid bundling server-only modules
async function revalidate(path: string) {
  const { revalidatePath } = await import("next/cache");
  return revalidatePath(path);
}
import { logActivity, sendNotification } from "./logs";
import { revalidatePath } from "next/cache";

export async function getFlights() {
  try {
    return await prisma.flight.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Error getting flights:", error);
    return [];
  }
}

export async function createFlight(formData: FormData) {
  try {
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;
    const departureTime = (formData.get("departureTime") as string) || "غير محدد";
    const arrivalTime = (formData.get("arrivalTime") as string) || "غير محدد";
    const airline = formData.get("airline") as string;
    const price = parseFloat(formData.get("price") as string);
    const isLastMinute = formData.get("isLastMinute") === "on";
    const lastMinutePrice = formData.get("lastMinutePrice") ? parseFloat(formData.get("lastMinutePrice") as string) : null;
    
    const daysFromForm = formData.get("days") as string;
    const availableDays = daysFromForm ? daysFromForm : (availableDaysFromList => availableDaysFromList.length > 2 ? availableDaysFromList : '["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]')(JSON.stringify(formData.getAll("availableDays")));

    const duration = (formData.get("duration") as string) || "غير محدد";
    const returnDepartureTime = formData.get("returnDepartureTime") as string || null;
    const returnArrivalTime = formData.get("returnArrivalTime") as string || null;
    const returnDuration = formData.get("returnDuration") as string || null;
    const cabin = (formData.get("type") as string) || (formData.get("cabin") as string) || "ECONOMY";

    await prisma.flight.create({
      data: {
        from,
        to,
        departureTime,
        arrivalTime,
        duration: duration || "غير محدد",
        returnDepartureTime,
        returnArrivalTime,
        returnDuration,
        airline,
        cabin,
        price,
        isLastMinute,
        lastMinutePrice,
        availableDays
      }
    });

    await logActivity("إضافة طيران", `تمت إضافة عرض طيران: من ${from} إلى ${to}`);
    await sendNotification("تمت الإضافة", `تمت إضافة عرض طيران جديد بنجاح.`, "success");

    await revalidate("/admin/flights");
    await revalidate("/admin");
    await revalidate("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating flight:", error);
    return { success: false, error: "فشل في إضافة العرض" };
  }
}

export async function deleteFlight(id: string) {
  try {
    const flight = await prisma.flight.findUnique({ where: { id } });
    await prisma.flight.delete({
      where: { id }
    });

    await logActivity("حذف طيران", `تم حذف عرض طيران: من ${flight?.from} إلى ${flight?.to}`);
    await sendNotification("تم الحذف", "تم إزالة عرض الطيران من النظام.", "warning");

    await revalidate("/admin/flights");
    await revalidate("/admin");
    await revalidate("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting flight:", error);
    return { success: false, error: "فشل في حذف العرض" };
  }
}

export async function updateFlight(id: string, formData: FormData) {
  try {
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;
    const departureTime = (formData.get("departureTime") as string) || "غير محدد";
    const arrivalTime = (formData.get("arrivalTime") as string) || "غير محدد";
    const airline = formData.get("airline") as string;
    const price = parseFloat(formData.get("price") as string);
    const isLastMinute = formData.get("isLastMinute") === "on";
    const lastMinutePrice = formData.get("lastMinutePrice") ? parseFloat(formData.get("lastMinutePrice") as string) : null;
    
    const daysFromForm = formData.get("days") as string;
    const availableDays = daysFromForm ? daysFromForm : (availableDaysFromList => availableDaysFromList.length > 2 ? availableDaysFromList : '["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]')(JSON.stringify(formData.getAll("availableDays")));

    const duration = (formData.get("duration") as string) || "غير محدد";
    const returnDepartureTime = formData.get("returnDepartureTime") as string || null;
    const returnArrivalTime = formData.get("returnArrivalTime") as string || null;
    const returnDuration = formData.get("returnDuration") as string || null;
    const cabin = (formData.get("type") as string) || (formData.get("cabin") as string) || "ECONOMY";

    await prisma.flight.update({
      where: { id },
      data: {
        from,
        to,
        departureTime,
        arrivalTime,
        duration: duration || "غير محدد",
        returnDepartureTime,
        returnArrivalTime,
        returnDuration,
        airline,
        cabin,
        price,
        isLastMinute,
        lastMinutePrice,
        availableDays
      }
    });

    await logActivity("تعديل طيران", `تم تعديل عرض طيران: من ${from} إلى ${to}`);
    await sendNotification("تم التعديل", "تم تحديث بيانات العرض بنجاح.", "info");

    revalidatePath("/admin/flights");
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating flight:", error);
    return { success: false, error: "فشل في تحديث العرض" };
  }
}
