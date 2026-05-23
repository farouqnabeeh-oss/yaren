"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity, sendNotification } from "./logs";

// Bus Trips
export async function getBusTrips() {
  try {
    return await prisma.busTrip.findMany({
      orderBy: { from: "asc" }
    });
  } catch (error) {
    console.error("Error getting bus trips:", error);
    return [];
  }
}

export async function createBusTrip(formData: FormData) {
  try {
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;
    const time = formData.get("time") as string;
    const price = parseFloat(formData.get("price") as string);
    const days = formData.get("days") as string; // Standardize to string

    await prisma.busTrip.create({
      data: { from, to, time, price, days }
    });

    await logActivity("إضافة خط باص", `تمت إضافة خط باص: من ${from} إلى ${to}`);
    await sendNotification("تمت الإضافة", `تمت إضافة خط باص جديد بنجاح.`, "success");

    revalidatePath("/admin/bus");
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating bus trip:", error);
    return { success: false, error: "فشل في إضافة الخط" };
  }
}

export async function deleteBusTrip(id: string) {
  try {
    const trip = await prisma.busTrip.findUnique({ where: { id } });
    await prisma.busTrip.delete({ where: { id } });

    await logActivity("حذف خط باص", `تم حذف خط باص: من ${trip?.from} إلى ${trip?.to}`);
    await sendNotification("تم الحذف", "تم إزالة خط الباص من النظام.", "warning");

    revalidatePath("/admin/bus");
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting bus trip:", error);
    return { success: false, error: "فشل في حذف الخط" };
  }
}

export async function updateBusTrip(id: string, formData: FormData) {
  try {
    const from = formData.get("from") as string;
    const to = formData.get("to") as string;
    const time = formData.get("time") as string;
    const price = parseFloat(formData.get("price") as string);
    const days = formData.get("days") as string;

    await prisma.busTrip.update({
      where: { id },
      data: { from, to, time, price, days }
    });

    await logActivity("تعديل خط باص", `تم تعديل خط باص: من ${from} إلى ${to}`);
    await sendNotification("تم التعديل", "تم تحديث بيانات خط الباص بنجاح.", "info");

    revalidatePath("/admin/bus");
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating bus trip:", error);
    return { success: false, error: "فشل في تحديث الخط" };
  }
}

// FAQ
export async function getFAQs() {
  try {
    return await prisma.fAQ.findMany({ orderBy: { order: "asc" } });
  } catch (error) {
    console.error("Error getting FAQs:", error);
    return [];
  }
}

export async function createFAQ(formData: FormData) {
  try {
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    await prisma.fAQ.create({ data: { question, answer } });

    await logActivity("إضافة سؤال", `تمت إضافة سؤال جديد للأسئلة الشائعة`);
    await sendNotification("تمت الإضافة", "تمت إضافة سؤال جديد بنجاح.", "success");

    revalidatePath("/admin/content");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return { success: false, error: "فشل في إضافة السؤال" };
  }
}

export async function deleteFAQ(id: string) {
  try {
    await prisma.fAQ.delete({ where: { id } });

    await logActivity("حذف سؤال", `تم حذف سؤال من الأسئلة الشائعة`);
    await sendNotification("تم الحذف", "تم حذف السؤال من النظام.", "warning");

    revalidatePath("/admin/content");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return { success: false, error: "فشل في حذف السؤال" };
  }
}

export async function updateFAQ(id: string, formData: FormData) {
  try {
    const question = formData.get("question") as string;
    const answer = formData.get("answer") as string;
    await prisma.fAQ.update({
      where: { id },
      data: { question, answer }
    });

    await logActivity("تعديل سؤال", `تم تعديل سؤال في الأسئلة الشائعة`);
    await sendNotification("تم التعديل", "تم تحديث السؤال بنجاح.", "info");

    revalidatePath("/admin/content");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return { success: false, error: "فشل في تحديث السؤال" };
  }
}
