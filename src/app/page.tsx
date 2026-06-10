import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FlightBooking from "@/components/booking/FlightBooking";
import BusTrips from "@/components/home/BusTrips";
import HotelBookingEngine from "@/components/booking/HotelBookingEngine";
import { AboutUs, FAQ } from "@/components/home/AboutFAQ";
import FeaturedTrips from "@/components/home/FeaturedTrips";
import { ESimoSection, BorderCrossings } from "@/components/home/ExtraServices";
import prisma from "@/lib/prisma";
import { getSettings } from "@/lib/actions/settings";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch all dynamic data from database with error handling
  let hotels: any[] = [];
  let settings: any = null;
  let faqs: any[] = [];
  let busTrips: any[] = [];
  let flights: any[] = [];

  try {
    const [h, s, f, b, fl] = await Promise.all([
      prisma.hotel.findMany().catch(() => []),
      getSettings().catch(() => null),
      prisma.fAQ.findMany({ orderBy: { order: "asc" } }).catch(() => []),
      prisma.busTrip.findMany().catch(() => []),
      prisma.flight.findMany().catch(() => [])
    ]);
    hotels = h;
    settings = s;
    faqs = f;
    busTrips = b;
    flights = fl;
  } catch (error) {
    console.error("Database connection error:", error);
    // Fallback to empty data to prevent crash
  }

  return (
    <main className="flex-grow bg-white min-h-screen text-slate-900 font-sans relative overflow-hidden">
      <Navbar />
      
      {/* Dynamic Hero from Settings */}
      <Hero 
        videoUrl={settings?.heroVideo} 
        phone={settings?.phone} 
        title={settings?.heroTitle}
        subtitle={settings?.heroSubtitle}
      />

      {/* 1. Featured Organized Trips — Core Product, prominent first position */}
      <div id="trips">
        <FeaturedTrips />
      </div>

      {/* 2. Flight Booking Section - Now Linked to Database */}
      <section className="py-24 bg-white overflow-hidden relative border-t border-slate-100 mb-12" id="flights">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right relative z-10" dir="rtl">
          <div className="mb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                ✈️ حجز طيران فوري ومباشر
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">احجز رحلتك مباشرة ✈️</h2>
              <p className="text-slate-600 max-w-2xl font-medium">
                نظام حجز ذكي وسهل للأفراد، اختر وجهتك ومواعيد سفرك وسيقوم النظام بحساب السعر الأفضل لك.
              </p>
            </div>
            <a href="/flights" className="shrink-0 bg-primary text-slate-900 px-6 py-3 rounded-2xl font-black text-sm hover:bg-primary/80 transition-all shadow-md">
              صفحة الطيران المستقلة ←
            </a>
          </div>
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 text-slate-900">
            <FlightBooking initialFlights={flights} />
          </div>
        </div>
      </section>

      {/* 3. Hotel Booking Engine - Manual Seasonal Pricing (SPO) */}
      <section className="py-24 bg-slate-50 relative overflow-hidden" id="hotels">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center relative z-10">
          <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            🏨 أرقى الفنادق والمنتجعات
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">حجز الفنادق والمنتجعات 🏨</h2>
          <p className="text-slate-600 font-bold max-w-2xl mx-auto leading-relaxed">
            استمتع بأفضل الأسعار المحدثة يدوياً لأهم الفنادق في العقبة، إيلات، أريحا، وشرم الشيخ. 
            <br /> <span className="text-primary">سعر الليلة يتغير حسب الموسم ونوع الوجبة تلقائياً.</span>
          </p>
          <a href="/hotels" className="inline-block mt-6 bg-primary text-slate-900 px-6 py-3 rounded-2xl font-black text-sm hover:bg-primary/80 transition-all shadow-md">
            تصفح صفحة الفنادق الكاملة ←
          </a>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 text-slate-900">
            <HotelBookingEngine initialHotels={hotels} />
          </div>
        </div>
      </section>

      {/* 4. Bus Trips Section - Dynamic from Dashboard */}
      <div id="bus-trips" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 absolute z-20 left-0 top-0 text-left">
          <a href="/bus" className="inline-block bg-slate-100 border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all shadow-sm">
            صفحة الباصات الكاملة ←
          </a>
        </div>
        <BusTrips initialTrips={busTrips} />
      </div>

      {/* 5. Extra Services Hub */}
      <ESimoSection code={settings?.eSimoCode} discount={settings?.eSimoDiscount} />
      <BorderCrossings />

      {/* 6. About & FAQ - Content Managed from Dashboard */}
      <AboutUs title={settings?.aboutTitle} text={settings?.aboutText} />
      <FAQ initialFaqs={faqs} />

      {/* Footer with Compliance Logos & Links */}
      <Footer />
    </main>
  );
}
