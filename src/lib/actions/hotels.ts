"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity, sendNotification } from "./logs";

export async function getHotels() {
  try {
    return await prisma.hotel.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Error getting hotels:", error);
    return [];
  }
}

export async function createHotel(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const region = (formData.get("region") || formData.get("city")) as string;
    const stars = parseInt(formData.get("stars") as string);
    const image = formData.get("image") as string;
    
    const mealPlans = JSON.stringify(["BB", "HP", "Soft All"]);
    const roomTypes = JSON.stringify(["SGL", "DBL", "TPL"]);
    const pricingMatrix = formData.get("pricingMatrix") as string || "{}";
    const options = JSON.stringify([
      { id: "seaview", label: "إطلالة على البحر", price: 20 },
      { id: "pool", label: "إطلالة على المسبح", price: 15 }
    ]);

    await prisma.hotel.create({
      data: {
        name,
        region,
        stars,
        image,
        mealPlans,
        roomTypes,
        pricingMatrix,
        mealSupplements: "{}",
        options
      }
    });

    await logActivity("إضافة فندق", `تمت إضافة فندق جديد: ${name}`);
    await sendNotification("تمت الإضافة", `تمت إضافة الفندق "${name}" للنظام بنجاح.`, "success");

    revalidatePath("/admin/hotels");
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating hotel:", error);
    return { success: false, error: "فشل في إضافة الفندق" };
  }
}

export async function deleteHotel(id: string) {
  try {
    const hotel = await prisma.hotel.findUnique({ where: { id } });
    await prisma.hotel.delete({
      where: { id }
    });

    await logActivity("حذف فندق", `تم حذف الفندق: ${hotel?.name || id}`);
    await sendNotification("تم الحذف", "تمت إزالة الفندق من النظام.", "warning");

    revalidatePath("/admin/hotels");
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return { success: false, error: "فشل في حذف الفندق" };
  }
}

export async function updateHotel(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const region = (formData.get("region") || formData.get("city")) as string;
    const stars = parseInt(formData.get("stars") as string);
    const image = formData.get("image") as string;
    const pricingMatrix = formData.get("pricingMatrix") as string || "{}";

    await prisma.hotel.update({
      where: { id },
      data: {
        name,
        region,
        stars,
        image,
        pricingMatrix
      }
    });

    await logActivity("تعديل فندق", `تم تعديل بيانات الفندق: ${name}`);
    await sendNotification("تم التعديل", `تم تحديث بيانات الفندق "${name}" بنجاح.`, "info");

    revalidatePath("/admin/hotels");
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating hotel:", error);
    return { success: false, error: "فشل في تحديث الفندق" };
  }
}
