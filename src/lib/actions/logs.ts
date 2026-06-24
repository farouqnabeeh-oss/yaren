"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function revalidate(path: string) {
  const { revalidatePath } = await import('next/cache');
  revalidatePath(path);
}

export async function logActivity(action: string, details?: string, adminName: string = "Admin") {
  try {
    await (prisma as any).activityLog.create({
      data: {
        action,
        details,
        adminName,
      }
    });
    revalidatePath("/admin/activity");
  } catch (error) {
    console.error("Error logging activity:", error);
  }
}

export async function sendNotification(title: string, message: string, type: string = "info") {
  try {
    await (prisma as any).notification.create({
      data: {
        title,
        message,
        type,
      }
    });
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

export async function getActivities() {
  try {
    return await (prisma as any).activityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
}

export async function getNotifications() {
  try {
    return await (prisma as any).notification.findMany({
      where: { isRead: false },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

export async function markAsRead(id: string) {
  try {
    await (prisma as any).notification.update({
      where: { id },
      data: { isRead: true }
    });
    revalidatePath("/admin");
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
}
