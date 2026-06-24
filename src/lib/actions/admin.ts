/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/prisma";

export async function getAdminStats() {
  const [tripsCount, hotelsCount, flightsCount, busTripsCount] = await Promise.all([
    prisma.trip.count(),
    prisma.hotel.count(),
    prisma.flight.count(),
    prisma.busTrip.count(),
  ]);

  return {
    tripsCount,
    hotelsCount,
    flightsCount,
    busTripsCount,
  };
}

export async function getRecentTrips() {
  return await prisma.trip.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });
}
export async function updateAdminProfile(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    const data: any = {};
    if (username) data.username = username;
    if (password) data.password = password;

    if (Object.keys(data).length === 0) return { success: false, error: "لا توجد بيانات لتحديثها" };

    await prisma.admin.updateMany({
      data
    });

    return { success: true };
  } catch (error) {
    console.error("Profile update error:", error);
    return { success: false, error: "حدث خطأ أثناء التحديث" };
  }
}
