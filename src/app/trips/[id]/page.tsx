import React from "react";
import prisma from "@/lib/prisma";
import TripDetailsClient from "@/app/trips/[id]/TripDetailsClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";






































































export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trip = await prisma.trip.findUnique({
    where: { id }
  });

  if (!trip) {
    notFound();
  }

  return <TripDetailsClient trip={trip} />;
}
