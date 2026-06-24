/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
async function revalidate(path: string) {
  const { revalidatePath } = await import('next/cache');
  revalidatePath(path);
}
import prisma from "@/lib/prisma";
import { logActivity, sendNotification } from "./logs";
import { revalidatePath } from "next/cache";

export async function getOffers() {
  try {
    return await prisma.offer.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Error getting offers:", error);
    return [];
  }
}

export async function createOffer(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;
    const price = formData.get("price") as string;
    const originalPrice = formData.get("originalPrice") as string || null;
    const tag = formData.get("tag") as string || null;
    const timeLeft = formData.get("timeLeft") as string || null;

    if (!title || !price || !image) {
      return { success: false, error: "الرجاء ملء الحقول المطلوبة" };
    }

    await prisma.offer.create({
      data: {
        title,
        description: description || "عرض سياحي حصري من يارين تورز.",
        image,
        price,
        originalPrice,
        tag,
        timeLeft
      }
    });

    await logActivity("إضافة عرض", `تمت إضافة عرض جديد: ${title}`);
    await sendNotification("تمت إضافة عرض", `تمت إضافة العرض الخاص "${title}" بنجاح.`, "success");

    revalidatePath("/admin/offers");
    revalidatePath("/offers");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating offer:", error);
    return { success: false, error: "فشل في إضافة العرض" };
  }
}

export async function deleteOffer(id: string) {
  try {
    const offer = await prisma.offer.findUnique({ where: { id } });
    await prisma.offer.delete({
      where: { id }
    });

    await logActivity("حذف عرض", `تم حذف العرض الخاص: ${offer?.title || id}`);
    await sendNotification("تم حذف عرض", "تمت إزالة العرض من النظام.", "warning");

    await revalidate("/admin/offers");
    await revalidate("/offers");
    await revalidate("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting offer:", error);
    return { success: false, error: "فشل في حذف العرض" };
  }
}

export async function updateOffer(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;
    const price = formData.get("price") as string;
    const originalPrice = formData.get("originalPrice") as string;
    const tag = formData.get("tag") as string;
    const timeLeft = formData.get("timeLeft") as string;

    const dataToUpdate: any = {
      title,
      price,
    };

    if (image) dataToUpdate.image = image;
    if (description !== undefined) dataToUpdate.description = description;
    if (originalPrice !== undefined) dataToUpdate.originalPrice = originalPrice || null;
    if (tag !== undefined) dataToUpdate.tag = tag || null;
    if (timeLeft !== undefined) dataToUpdate.timeLeft = timeLeft || null;

    await prisma.offer.update({
      where: { id },
      data: dataToUpdate
    });

    await logActivity("تعديل عرض", `تم تعديل بيانات العرض: ${title}`);
    await sendNotification("تم تعديل العرض", `تم تحديث بيانات العرض "${title}" بنجاح.`, "info");

    await revalidate("/admin/offers");
    await revalidate("/offers");
    await revalidate("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating offer:", error);
    return { success: false, error: "فشل في تحديث العرض" };
  }
}
