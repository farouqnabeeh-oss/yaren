import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FlightBooking from "@/components/booking/FlightBooking";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function FlightsPage() {
  let flights: any[] = [];
  try {
    flights = await prisma.flight.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (e) {
    console.error("Error fetching flights:", e);
  }

  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 font-sans relative overflow-hidden" dir="rtl">
      <Navbar />
      
      {/* Background ambient glowing blurs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay scale-105 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-2 bg-white/10 text-primary border border-white/10 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-2">
            ✈️ عروض وحجوزات الطيران المباشر
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
            احجز رحلة طيرانك <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-orange-400">بسهولة</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-medium">
            اختر من بين مجموعة واسعة من الرحلات المباشرة لأجمل الوجهات، مع مقارنة فورية للأسعار وأفضل الباقات المناسبة.
          </p>
        </div>
      </section>

      {/* Booking Engine Section */}
      <section className="py-20 bg-slate-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 text-slate-900">
            <FlightBooking initialFlights={flights} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
