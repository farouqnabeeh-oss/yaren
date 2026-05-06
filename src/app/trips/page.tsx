import React from "react";
import prisma from "@/lib/prisma";
import TripsClient from "./TripsClient";

export const dynamic = "force-dynamic";

export default async function TripsPage() {
  // Fetch all organized trips from the database
  const trips = await prisma.trip.findMany({
    where: {
      type: "organized"
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return <TripsClient initialTrips={trips} />;
}
