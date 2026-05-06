import React from "react";
import Link from "next/link";
import TripCard from "@/components/ui/TripCard";
import prisma from "@/lib/prisma";

const FeaturedTrips = async () => {
  const trips = await prisma.trip.findMany({
    where: { type: "organized" },
    take: 6,
    orderBy: { createdAt: "desc" }
  });

  // If no trips in DB yet, show nothing or empty state
  if (trips.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-right">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">الرحلات المنظمة القادمة</h2>
            <p className="text-slate-500 font-medium">اختر وجهتك القادمة واستمتع بتجربة سفر لا تُنسى.</p>
          </div>
          <Link 
            href="/trips" 
            className="group flex items-center gap-2 text-primary font-black hover:gap-4 transition-all duration-300"
          >
            عرض جميع الرحلات 
            <span className="text-xl">←</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => {
            let parsedFeatures: string[] = [];
            try {
              parsedFeatures = JSON.parse(trip.features || "[]");
              if (!Array.isArray(parsedFeatures)) parsedFeatures = [];
            } catch (e) {
              parsedFeatures = trip.features ? trip.features.split(',').map((f: string) => f.trim()).filter((f: string) => f) : [];
            }

            return (
              <TripCard 
                key={trip.id} 
                id={trip.id}
                title={trip.title}
                image={trip.image}
                price={trip.price}
                duration={trip.duration}
                date={trip.date}
                type={trip.type as any}
                features={parsedFeatures}
                rating={trip.rating}
                reviewCount={trip.reviewCount}
                showGuide={trip.showGuide}
                guide={trip.guideName ? {
                  name: trip.guideName,
                  exp: trip.guideExp || "",
                  image: trip.guideImage || ""
                } : undefined}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrips;
