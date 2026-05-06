"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity, sendNotification } from "./logs";

const fallbackSettings = {
  siteName: "Yareen Tours (Offline Mode)",
  email: "Yreen.ab@gmail.com",
  phone: "+972 52-234-0930",
  whatsapp: "+972 52-234-0930",
  facebook: "https://www.facebook.com/profile.php?id=61572795908081",
  instagram: "https://www.instagram.com/yaren_tours?igsh=YWNwdjQ1am11NGw2",
  heroTitle: "نرسم لكم خارطة العالم",
  heroSubtitle: "ملاحظة: النظام يعمل حالياً في وضع عدم الاتصال.",
  heroVideo: "",
  aboutTitle: "",
  aboutText: "",
  address: "كفركنا",
};

export async function getSettings() {
  try {
    const fetchPromise = prisma.siteSettings.findUnique({ where: { id: "global" } });
    
    // Resolve instead of reject to avoid Next.js tracking it as an Unhandled Rejection
    const settings = await new Promise((resolve) => {
      const timer = setTimeout(() => resolve("TIMEOUT"), 2500);
      
      fetchPromise
        .then(res => {
          clearTimeout(timer);
          resolve(res);
        })
        .catch(err => {
          clearTimeout(timer);
          resolve("ERROR");
        });
    }) as any;

    // If it's a valid object, return it
    if (settings && settings !== "TIMEOUT" && settings !== "ERROR") return settings;

    // If it timed out or errored, silently return the fallback
    if (settings === "TIMEOUT" || settings === "ERROR") {
      return fallbackSettings;
    }

    // If not found, try to create or return default
    try {
      return await prisma.siteSettings.upsert({
        where: { id: "global" },
        update: {},
        create: {
          id: "global",
          siteName: "Yareen Tours",
          phone: "+972 52-234-0930",
          email: "Yreen.ab@gmail.com",
          address: "كفركنا، المركز الرئيسي",
          whatsapp: "+972 52-234-0930",
          facebook: "https://www.facebook.com/profile.php?id=61572795908081",
          instagram: "https://www.instagram.com/yaren_tours?igsh=YWNwdjQ1am11NGw2",
          heroTitle: "نرسم لكم خارطة العالم، ومعنا تكون كل رحلة حكاية نجاح.",
          heroSubtitle: "استكشف أفضل الوجهات السياحية بإرشاد عربي كامل وأعلى معايير الراحة.",
          aboutTitle: "يارين تورز.. نرسم لكم خارطة العالم",
          aboutText: "بوابتكم الدائمة لاكتشاف العالم بأعلى معايير الراحة والتنظيم."
        } as any
      });
    } catch (e) {
      return fallbackSettings;
    }
  } catch (error) {
    // Completely silence the error to prevent Next.js dev overlay from catching it
    return fallbackSettings;
  }
}

export async function updateSettings(formData: FormData) {
  try {
    const data = {
      siteName:     (formData.get("siteName")      as string) || undefined,
      email:        (formData.get("email")         as string) || undefined,
      phone:        (formData.get("phone")         as string) || undefined,
      address:      (formData.get("address")       as string) || undefined,
      whatsapp:     (formData.get("whatsapp")      as string) || undefined,
      facebook:     (formData.get("facebook")      as string) || undefined,
      instagram:    (formData.get("instagram")     as string) || undefined,
      heroTitle:    (formData.get("heroTitle")     as string) || undefined,
      heroSubtitle: (formData.get("heroSubtitle")  as string) || undefined,
      heroVideo:    (formData.get("heroVideo")     as string) || undefined,
      aboutTitle:   (formData.get("aboutTitle")    as string) || undefined,
      aboutText:    (formData.get("aboutText")     as string) || undefined,
    };

    const updateData = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined)
    ) as any;

    await prisma.siteSettings.upsert({
      where: { id: "global" },
      update: updateData,
      create: {
        id: "global",
        ...updateData,
      },
    });

    // Log the movement
    await logActivity(
      "تحديث الإعدادات",
      `تم تحديث إعدادات الموقع بنجاح. الحقول المتأثرة: ${Object.keys(updateData).join(", ")}`
    );

    // Send a system notification
    await sendNotification(
      "تم تحديث النظام",
      "قام المشرف بتعديل إعدادات الوكالة المركزية.",
      "success"
    );

    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, error: "Database synchronization issue" };
  }
}
