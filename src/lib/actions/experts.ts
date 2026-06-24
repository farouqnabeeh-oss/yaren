/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
async function revalidate(path: string) {
  const { revalidatePath } = await import('next/cache');
  revalidatePath(path);
}
import prisma from "@/lib/prisma";
import { logActivity, sendNotification } from "./logs";

export async function getExperts() {
  try {
    return await (prisma as any).expert.findMany({
      orderBy: { createdAt: "asc" }
    });
  } catch (error) {
    console.error("Error getting experts:", error);
    return [];
  }
}

export async function createExpert(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const bio = formData.get("bio") as string;
    const image = formData.get("image") as string;

    if (!name || !role || !bio) {
      return { success: false, error: "الرجاء ملء الحقول المطلوبة" };
    }

    await (prisma as any).expert.create({
      data: {
        name,
        role,
        bio,
        image: image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
      }
    });

    await logActivity("إضافة خبير سفر", `تمت إضافة خبير جديد: ${name}`);
    await sendNotification("تمت إضافة خبير سفر", `تمت إضافة الخبير "${name}" بنجاح.`, "success");

await revalidate("/admin/experts");
    await revalidate("/about");
    await revalidate("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating expert:", error);
    return { success: false, error: "فشل في إضافة الخبير" };
  }
}

export async function deleteExpert(id: string) {
  try {
    const expert = await (prisma as any).expert.findUnique({ where: { id } });
    await (prisma as any).expert.delete({
      where: { id }
    });

    await logActivity("حذف خبير سفر", `تم حذف الخبير: ${expert?.name || id}`);
    await sendNotification("تم حذف خبير سفر", "تمت إزالة الخبير من النظام.", "warning");

    await revalidate("/admin/experts");
    await revalidate("/about");
    await revalidate("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting expert:", error);
    return { success: false, error: "فشل في حذف الخبير" };
  }
}

export async function updateExpert(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const bio = formData.get("bio") as string;
    const image = formData.get("image") as string;

    const dataToUpdate: any = {
      name,
      role,
      bio
    };

    if (image && image.trim() !== "") {
      dataToUpdate.image = image;
    }

    await (prisma as any).expert.update({
      where: { id },
      data: dataToUpdate
    });

    await logActivity("تعديل خبير سفر", `تم تعديل خبير: ${name}`);
    await sendNotification("تم تعديل خبير سفر", `تم تحديث بيانات الخبير "${name}" بنجاح.`, "info");

    await revalidate("/admin/experts");
    await revalidate("/about");
    await revalidate("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating expert:", error);
    return { success: false, error: "فشل في تحديث الخبير" };
  }
}
