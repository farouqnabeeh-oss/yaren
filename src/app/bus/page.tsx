import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BusTrips from "@/components/home/BusTrips";
import prisma from "@/lib/prisma";
import { Bus, Clock, MapPin, Shield, Star, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "خطوط الباصات والمواصلات | يارين تورز",
  description: "احجز مقعدك في باصات يارين تورز لأجمل وجهات الشمال — العقبة، إيلات، شرم الشيخ بمواعيد ثابتة وأسعار مميزة.",
};

const highlights = [
  { icon: Bus, label: "مواعيد ثابتة أسبوعياً", desc: "رحلات منتظمة كل أسبوع من الشمال لأهم الوجهات" },
  { icon: Shield, label: "راحة وأمان", desc: "باصات حديثة ومريحة مع سائقين محترفين وموثوقين" },
  { icon: Clock, label: "دقة في المواعيد", desc: "نلتزم بمواعيد الانطلاق والوصول المحددة مسبقاً" },
  { icon: Users, label: "لجميع أفراد العائلة", desc: "أسعار خاصة للعائلات والمجموعات الكبيرة" },
];

const routes = [
  { from: "الناصرة / كفركنا", to: "إيلات", duration: "4.5 ساعة", type: "ذهاب أو ذهاب وإياب", icon: "🌅" },
  { from: "الناصرة / كفركنا", to: "العقبة - الأردن", duration: "5 ساعات", type: "ذهاب أو ذهاب وإياب", icon: "🌊" },
  { from: "الناصرة / كفركنا", to: "شرم الشيخ - سيناء", duration: "7 ساعات", type: "ذهاب وإياب", icon: "🏖️" },
  { from: "الناصرة / كفركنا", to: "دهب وطابا", duration: "6.5 ساعة", type: "ذهاب وإياب", icon: "⛵" },
];

export default async function BusPage() {
  let busTrips: any[] = [];
  try {
    busTrips = await prisma.busTrip.findMany();
  } catch (e) {
    console.error("Error fetching bus trips:", e);
  }

  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 font-sans relative overflow-hidden" dir="rtl">
      <Navbar />

      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay scale-105 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-8">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-white/10 text-primary border border-white/10 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            🚌 خدمة الباصات والمواصلات
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
            سافر معنا{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-cyan-400">
              براحة واطمئنان
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            باصات مريحة وحديثة تنطلق من شمال فلسطين باتجاه أجمل الوجهات الإقليمية — بمواعيد
            ثابتة وأسعار شفافة.
          </p>

          {/* Stat Chips */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {[
              { label: "وجهة متاحة", value: "4+" },
              { label: "رحلة أسبوعياً", value: "8+" },
              { label: "تقييم العملاء", value: "4.9★" },
              { label: "راكب سنوياً", value: "+5K" },
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

      {/* Route Overview Cards */}
      <section className="relative z-20 py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-black text-slate-500 uppercase tracking-widest mb-8 text-center">خطوطنا الرئيسية</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {routes.map((r) => (
              <div key={r.to} className="bg-white border border-slate-100 rounded-[2rem] p-6 hover:shadow-md transition-shadow group text-right">
                <div className="text-4xl mb-4">{r.icon}</div>
                <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-500">
                  <MapPin size={12} className="text-primary" />
                  <span>{r.from}</span>
                </div>
                <p className="font-black text-lg text-slate-800 mb-1">{r.to}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mt-2">
                  <Clock size={12} className="text-primary" />
                  <span>{r.duration}</span>
                  <span className="mx-1">•</span>
                  <span>{r.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bus Trips Booking Component */}
      <section className="relative z-20 py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 text-slate-900">
            <BusTrips initialTrips={busTrips} />
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="relative z-10 py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Policy Card */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 text-right space-y-4 shadow-sm">
              <h3 className="text-lg font-black text-slate-800">سياسة الحجز والإلغاء 📋</h3>
              <ul className="space-y-3 text-slate-600 text-sm font-medium">
                {[
                  "يُطلب تأكيد الحجز قبل 48 ساعة من موعد الرحلة",
                  "الإلغاء قبل 24 ساعة: استرداد 100% من المبلغ",
                  "الإلغاء قبل أقل من 24 ساعة: لا يوجد استرداد",
                  "التأخر عن موعد الانطلاق بأكثر من 15 دقيقة يُلغي الحجز",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-primary mt-1 shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ Card */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 text-right space-y-4 shadow-sm">
              <h3 className="text-lg font-black text-slate-800">أسئلة شائعة ❓</h3>
              <div className="space-y-4">
                {[
                  { q: "هل يمكن إحضار حقائب إضافية؟", a: "نعم، يُسمح بحقيبة واحدة في العجلة + حقيبة يد في المقعد." },
                  { q: "هل يتوقف الباص لأكثر من نقطة؟", a: "يتوقف في الناصرة وكفركنا حسب مسار الرحلة." },
                  { q: "هل يوجد واي فاي على الباص؟", a: "نعم، يوجد واي فاي مجاني وشواحن USB في كل مقعد." },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <p className="font-black text-slate-800 text-sm">{q}</p>
                    <p className="text-slate-600 text-xs mt-1 font-medium">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="relative z-10 py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-l from-primary/90 to-cyan-600 rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative shadow-lg">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 text-center md:text-right space-y-3">
              <h3 className="text-2xl md:text-3xl font-black text-white">حجز لمجموعة أو عائلة كبيرة؟</h3>
              <p className="text-white/80 font-medium max-w-lg leading-relaxed">
                للمجموعات التي تزيد عن 10 أشخاص، نقدم أسعاراً خاصة وترتيبات مخصصة. تواصل معنا مباشرة.
              </p>
            </div>
            <a
              href="https://wa.me/972522340930?text=مرحباً يارين تورز، أريد حجز باص لمجموعة"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 bg-white text-slate-900 px-10 py-4 rounded-2xl font-black shadow-2xl hover:bg-slate-50 transition-all whitespace-nowrap shrink-0"
            >
              تواصل معنا الآن 💬
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
