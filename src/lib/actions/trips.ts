"use server";
async function revalidate(path: string) {
  const { revalidatePath } = await import('next/cache');
  revalidatePath(path);
}
import prisma from "@/lib/prisma";

import { logActivity, sendNotification } from "./logs";

export async function getTrips() {
  try {
    return await prisma.trip.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Error getting trips:", error);
    return [];
  }
}

export async function createTrip(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);
    const duration = formData.get("duration") as string;
    const date = (formData.get("date") as string) || "متوفر دائماً";
    const image = formData.get("image") as string;
    const features = formData.get("features") as string; // JSON string
    const description = formData.get("description") as string || "رحلة سياحية مميزة مع يارين تورز.";
    const youtubeUrl = formData.get("youtubeUrl") as string || null;
    const includes = formData.get("includes") as string || null;
    const excludes = formData.get("excludes") as string || null;

    await prisma.trip.create({
      data: {
        title,
        price,
        duration,
        date,
        image,
        description,
        youtubeUrl,
        includes,
        excludes,
        features: features || "[]",
        type: "organized"
      }
    });

    await logActivity("إضافة رحلة", `تمت إضافة رحلة جديدة: ${title}`);
    await sendNotification("تمت الإضافة", `تمت إضافة رحلة "${title}" بنجاح.`, "success");

    await revalidate("/admin/trips");
    await revalidate("/admin");
    await revalidate("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating trip:", error);
    return { success: false, error: "فشل في إضافة الرحلة" };
  }
}

export async function deleteTrip(id: string) {
  try {
    const trip = await prisma.trip.findUnique({ where: { id } });
    await prisma.trip.delete({
      where: { id }
    });

    await logActivity("حذف رحلة", `تم حذف رحلة: ${trip?.title || id}`);
    await sendNotification("تم الحذف", "تمت إزالة الرحلة من النظام.", "warning");

    await revalidate("/admin/trips");
    await revalidate("/admin");
    await revalidate("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting trip:", error);
    return { success: false, error: "فشل في حذف الرحلة" };
  }
}

export async function updateTrip(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);
    const duration = formData.get("duration") as string;
    const date = (formData.get("date") as string) || "متوفر دائماً";
    const image = formData.get("image") as string;
    const description = formData.get("description") as string;
    const youtubeUrl = formData.get("youtubeUrl") as string;

    const features = formData.get("features") as string;
    const includes = formData.get("includes") as string;
    const excludes = formData.get("excludes") as string;

    const dataToUpdate: any = {
      title,
      price,
      duration,
      date,
    };

    if (image) dataToUpdate.image = image;

    if (description) dataToUpdate.description = description;
    if (youtubeUrl) dataToUpdate.youtubeUrl = youtubeUrl;
    if (features) dataToUpdate.features = features;
    if (includes) dataToUpdate.includes = includes;
    if (excludes) dataToUpdate.excludes = excludes;

    await prisma.trip.update({
      where: { id },
      data: dataToUpdate
    });

    await logActivity("تعديل رحلة", `تم تعديل بيانات الرحلة: ${title}`);
    await sendNotification("تم التعديل", `تم تحديث بيانات رحلة "${title}" بنجاح.`, "info");

    await revalidate("/admin/trips");
    await revalidate("/admin");
    await revalidate("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating trip:", error);
    return { success: false, error: "فشل في تحديث الرحلة" };
  }
}
