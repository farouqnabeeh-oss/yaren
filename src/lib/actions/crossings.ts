"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity, sendNotification } from "./logs";

export async function getCrossings() {
  try {
    return await (prisma as any).crossing.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Error getting crossings:", error);
    return [];
  }
}

export async function createCrossing(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const link = formData.get("link") as string;
    const hoursLink = formData.get("hoursLink") as string;
    const image = formData.get("image") as string;

    if (!name || !link || !hoursLink) {
      return { success: false, error: "الرجاء ملء الحقول المطلوبة" };
    }

    await (prisma as any).crossing.create({
      data: {
        name,
        link,
        hoursLink,
        image: image || "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&q=80&w=800"
      }
    });

    await logActivity("إضافة معبر", `تمت إضافة معبر حدودي جديد: ${name}`);
    await sendNotification("تمت الإضافة", `تمت إضافة معبر "${name}" بنجاح.`, "success");

    revalidatePath("/admin/crossings");
    revalidatePath("/crossings");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating crossing:", error);
    return { success: false, error: "فشل في إضافة المعبر" };
  }
}

export async function deleteCrossing(id: string) {
  try {
    const crossing = await (prisma as any).crossing.findUnique({ where: { id } });
    await (prisma as any).crossing.delete({
      where: { id }
    });

    await logActivity("حذف معبر", `تم حذف المعبر: ${crossing?.name || id}`);
    await sendNotification("تم الحذف", "تمت إزالة المعبر من النظام.", "warning");

    revalidatePath("/admin/crossings");
    revalidatePath("/crossings");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting crossing:", error);
    return { success: false, error: "فشل في حذف المعبر" };
  }
}

export async function updateCrossing(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const link = formData.get("link") as string;
    const hoursLink = formData.get("hoursLink") as string;
    const image = formData.get("image") as string;

    const dataToUpdate: any = {
      name,
      link,
      hoursLink
    };

    if (image && image.trim() !== "") {
      dataToUpdate.image = image;
    }

    await (prisma as any).crossing.update({
      where: { id },
      data: dataToUpdate
    });

    await logActivity("تعديل معبر", `تم تعديل معبر: ${name}`);
    await sendNotification("تم التعديل", `تم تحديث بيانات المعبر "${name}" بنجاح.`, "info");

    revalidatePath("/admin/crossings");
    revalidatePath("/crossings");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating crossing:", error);
    return { success: false, error: "فشل في تحديث المعبر" };
  }
}
