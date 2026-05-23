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
    <main className="flex-grow bg-white min-h-screen">
      <Navbar />
      
      {/* Dynamic Hero from Settings */}
      <Hero 
        videoUrl={settings?.heroVideo} 
        phone={settings?.phone} 
        title={settings?.heroTitle}
        subtitle={settings?.heroSubtitle}
      />

      {/* 1. Flight Booking Section - Now Linked to Database */}
      <section className="py-24 bg-slate-50 overflow-hidden relative border-t-4 border-primary/20 mb-12" id="flights">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-white rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right" dir="rtl">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">احجز رحلتك مباشرة ✈️</h2>
            <p className="text-slate-600 max-w-2xl">
              نظام حجز ذكي وسهل للأفراد، اختر وجهتك ومواعيد سفرك وسيقوم النظام بحساب السعر الأفضل لك.
            </p>
          </div>
          <FlightBooking initialFlights={flights} />
        </div>
      </section>

      {/* 2. Bus Trips Section - Dynamic from Dashboard */}
      <section className="py-24 bg-gray-50 border-t border-slate-200 mb-12" id="bus-trips">
        <BusTrips initialTrips={busTrips} />
      </section>

      {/* 3. Hotel Booking Engine - Manual Seasonal Pricing (SPO) */}
      <section className="py-24 bg-white" id="hotels">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">حجز الفنادق والمنتجعات 🏨</h2>
          <p className="text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
            استمتع بأفضل الأسعار المحدثة يدوياً لأهم الفنادق في العقبة، إيلات، أريحا، وشرم الشيخ. 
            <br /> <span className="text-orange-500">سعر الليلة يتغير حسب الموسم ونوع الوجبة تلقائياً.</span>
          </p>
        </div>
        <HotelBookingEngine initialHotels={hotels} />
      </section>

      {/* 4. Extra Services Hub */}
      <ESimoSection code={settings?.eSimoCode} discount={settings?.eSimoDiscount} />
      <BorderCrossings />

      {/* 5. About & FAQ - Content Managed from Dashboard */}
      <AboutUs title={settings?.aboutTitle} text={settings?.aboutText} />
      <FAQ initialFaqs={faqs} />

      {/* 6. Featured Organized Trips - The core of Yaren Tours */}
      <div id="trips">
        <FeaturedTrips />
      </div>

      {/* Footer with Compliance Logos & Links */}
      <Footer />
    </main>
  );
}
