import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HotelBookingEngine from "@/components/booking/HotelBookingEngine";
import prisma from "@/lib/prisma";
import { Hotel, Star, MapPin, Shield, Wifi } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "حجز فنادق ومنتجعات | يارين تورز",
  description: "احجز فندقك المفضل في العقبة، إيلات، أريحا، وشرم الشيخ بأفضل الأسعار عبر يارين تورز.",
};

const highlights = [
  { icon: Star, label: "فنادق 4 و5 نجوم", desc: "أرقى الفنادق في المنطقة بأسعار تنافسية حصرية" },
  { icon: Shield, label: "حجز آمن ومضمون", desc: "نضمن لك تأكيد الحجز قبل يوم السفر بـ48 ساعة" },
  { icon: Wifi, label: "شامل كل شيء", desc: "خيارات متعددة من فطور فقط حتى كل شيء شامل" },
  { icon: MapPin, label: "4 وجهات رئيسية", desc: "العقبة • إيلات • أريحا • سيناء" },
];

export default async function HotelsPage() {
  let hotels: any[] = [];
  try {
    const rawHotels = await prisma.hotel.findMany();
    // Serialize DateTime fields to strings to avoid Next.js serialization errors
    hotels = rawHotels.map((h: any) => ({
      ...h,
      createdAt: h.createdAt?.toISOString?.() ?? h.createdAt,
      updatedAt: h.updatedAt?.toISOString?.() ?? h.updatedAt,
    }));
  } catch (e) {
    console.error("Error fetching hotels:", e);
  }

  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 font-sans relative overflow-hidden" dir="rtl">
      <Navbar />

      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-orange-500/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay scale-105 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-8">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-white/10 text-primary border border-white/10 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            🏨 حجز فنادق ومنتجعات
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
            فندقك المثالي{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-orange-400">
              بأفضل سعر
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            اختر وجهتك، تواريخ إقامتك، ووجباتك المفضلة — ونحن نضمن لك أفضل الأسعار في
            العقبة وإيلات وأريحا وسيناء.
          </p>

          {/* Stat Chips */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {[
              { label: "فنادق مُختارة", value: "25+" },
              { label: "وجهة سياحية", value: "4" },
              { label: "تقييم العملاء", value: "4.9★" },
              { label: "حجز يومياً", value: "100+" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2.5 rounded-2xl">
                <span className="text-primary font-black text-base">{s.value}</span>
                <span className="text-slate-300 text-xs font-bold">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="relative z-20 py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="bg-white border border-slate-200/60 rounded-[2rem] p-6 flex flex-col gap-3 hover:shadow-md transition-shadow group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-black text-sm text-slate-800">{label}</p>
                  <p className="text-slate-500 text-xs font-medium mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Engine Container */}
      <section className="relative z-20 py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 text-slate-900">
            <HotelBookingEngine initialHotels={hotels} />
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="relative z-10 py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-l from-primary/90 to-primary rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative shadow-lg">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 text-center md:text-right space-y-3">
              <h3 className="text-2xl md:text-3xl font-black text-white">تحتاج مساعدة في الاختيار؟</h3>
              <p className="text-white/80 font-medium max-w-lg leading-relaxed">
                فريق يارين تورز جاهز لمساعدتك في اختيار أفضل فندق يناسب ميزانيتك وعدد أفراد عائلتك
                ومتطلباتك الخاصة.
              </p>
            </div>
            <a
              href="https://wa.me/972522340930?text=مرحباً يارين تورز، أحتاج مساعدة في اختيار فندق مناسب"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 bg-white text-primary px-10 py-4 rounded-2xl font-black shadow-2xl hover:bg-slate-50 transition-all whitespace-nowrap shrink-0"
            >
              تحدث مع خبير 💬
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
