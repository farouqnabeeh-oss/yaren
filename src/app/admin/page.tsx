import React from "react";
import prisma from "@/lib/prisma";
import {
  Hotel,
  Map as MapIcon,
  Plane,
  Bus,
  Activity,
  ChevronLeft,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";
import Link from "next/link";

export default async function AdminHome() {
  // Fetch real stats + latest records
  let statsData = { hotelsCount: 0, tripsCount: 0, flightsCount: 0, busCount: 0 };
  let activity: any[] = [];

  try {
    const [hotelsCount, tripsCount, flightsCount, busCount,
           latestHotels, latestTrips, latestFlights, latestBus] = await Promise.all([
      prisma.hotel.count().catch(() => 0),
      prisma.trip.count().catch(() => 0),
      prisma.busTrip.count().catch(() => 0),
      prisma.flight.count().catch(() => 0),
      prisma.hotel.findMany({ orderBy: { createdAt: "desc" }, take: 2 }).catch(() => []),
      prisma.trip.findMany({ orderBy: { createdAt: "desc" }, take: 2 }).catch(() => []),
      prisma.flight.findMany({ orderBy: { createdAt: "desc" }, take: 2 }).catch(() => []),
      prisma.busTrip.findMany({ orderBy: { createdAt: "desc" }, take: 2 }).catch(() => []),
    ]);

    statsData = { hotelsCount, tripsCount, flightsCount, busCount };

    activity = [
      ...latestHotels.map((h: any) => ({
        label: `إضافة فندق جديد`,
        title: h.name,
        sub: h.city,
        icon: Hotel,
        color: "text-blue-500",
        bg: "bg-blue-50/50",
        time: h.createdAt,
        href: "/admin/hotels",
      })),
      ...latestTrips.map((t: any) => ({
        label: `إضافة رحلة جديدة`,
        title: t.title,
        sub: `${t.duration} • ${Number(t.price).toLocaleString("ar")} ₪`,
        icon: MapIcon,
        color: "text-emerald-500",
        bg: "bg-emerald-50/50",
        time: t.createdAt,
        href: "/admin/trips",
      })),
      ...latestFlights.map((f: any) => ({
        label: `تحديث رحلة طيران`,
        title: `${f.from} ← ${f.to}`,
        sub: f.airline,
        icon: Plane,
        color: "text-indigo-500",
        bg: "bg-indigo-50/50",
        time: f.createdAt,
        href: "/admin/flights",
      })),
      ...latestBus.map((b: any) => ({
        label: `حجز حافلة جديد`,
        title: `${b.from} ← ${b.to}`,
        sub: b.time,
        icon: Bus,
        color: "text-amber-500",
        bg: "bg-amber-50/50",
        time: b.createdAt,
        href: "/admin/bus",
      })),
    ]
      .filter((item: any) => item.time instanceof Date)
      .sort((a: any, b: any) => b.time.getTime() - a.time.getTime())
      .slice(0, 6);
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
  }

  const stats = [
    { name: "الفنادق المسجلة", value: statsData.hotelsCount, icon: Hotel, color: "text-blue-600", bg: "bg-blue-50", href: "/admin/hotels", trend: "+12%" },
    { name: "الرحلات النشطة", value: statsData.tripsCount, icon: MapIcon, color: "text-emerald-600", bg: "bg-emerald-50", href: "/admin/trips", trend: "+5%" },
    { name: "رحلات الطيران", value: statsData.flightsCount, icon: Plane, color: "text-indigo-600", bg: "bg-indigo-50", href: "/admin/flights", trend: "+8%" },
    { name: "حجوزات الباص", value: statsData.busCount, icon: Bus, color: "text-amber-600", bg: "bg-amber-50", href: "/admin/bus", trend: "+15%" },
  ];

  function timeAgo(date: Date): string {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return "الآن";
    if (diff < 3600) return `${Math.floor(diff / 60)}د`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}س`;
    return `${Math.floor(diff / 86400)}ي`;
  }

  const totalItems = (statsData.hotelsCount + statsData.tripsCount + statsData.flightsCount + statsData.busCount) || 1;

  return (
    <div className="max-w-5xl mx-auto px-2 pb-20 pt-4" dir="rtl">
      
      {/* Premium Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 relative">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] -z-10" />

        <div className="text-right space-y-3">
          <div className="flex items-center gap-3 text-indigo-600 mb-2">
             <div className="p-2 bg-indigo-50 rounded-xl shadow-sm shadow-indigo-100/50">
                <ShieldCheck size={20} />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">إدارة يارين تورز</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">لوحة تحكم <span className="text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 to-violet-600 font-black">النظام</span></h1>
          <p className="text-slate-500 text-sm font-medium">مراقبة شاملة لكافة تحركات وعمليات الوكالة في الوقت الفعلي.</p>
        </div>

        <div className="flex items-center gap-6">
           <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">توقيت النظام</span>
              <div className="flex items-center gap-3 mt-1">
                 <Clock size={14} className="text-indigo-500" />
                 <span className="text-sm font-black text-slate-900">
                   {new Date().toLocaleTimeString("ar-EG", { hour: '2-digit', minute: '2-digit' })}
                 </span>
              </div>
           </div>
           <div className="h-10 w-[1px] bg-slate-100 hidden md:block" />
           <div className="flex items-center gap-4 bg-white border border-slate-100 px-6 py-3 rounded-[1.5rem] shadow-sm shadow-slate-200/50">
              <Calendar size={16} className="text-slate-400" />
              <span className="text-xs font-black text-slate-900">
                {new Date().toLocaleDateString("ar-EG", { day: 'numeric', month: 'long' })}
              </span>
           </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <Link key={i} href={stat.href} className="group relative bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-slate-50 group-hover:bg-indigo-500 transition-colors" />
            <div className="flex items-start justify-between mb-8">
               <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm shadow-black/5`}>
                 <stat.icon size={24} strokeWidth={2.5} />
               </div>
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.trend}</span>
                  <ArrowUpRight size={14} className="text-slate-200 group-hover:text-slate-900 transition-colors mt-2" />
               </div>
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.name}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Real-time Movements Feed */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
               <h2 className="text-xl font-black text-slate-900">تحركات النظام</h2>
            </div>
            <Link href="/admin/activity" className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors flex items-center gap-2">
               سجل العمليات بالكامل <ChevronLeft size={12} />
            </Link>
          </div>

          <div className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm">
            {activity.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 opacity-20">
                 <Zap size={40} className="mb-4" />
                 <p className="text-sm font-bold">لا توجد عمليات مسجلة اليوم</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {activity.map((item, i) => (
                  <Link 
                    key={i} 
                    href={item.href}
                    className="flex items-center justify-between p-7 hover:bg-slate-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-[1.2rem] ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-all shadow-sm`}>
                        <item.icon size={20} />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-3 mb-0.5">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{item.label}</span>
                           <div className="w-1 h-1 bg-slate-200 rounded-full" />
                           <span className="text-[9px] font-bold text-slate-300 uppercase">{timeAgo(item.time)}</span>
                        </div>
                        <p className="text-sm font-black text-slate-900 leading-none mb-1">{item.title}</p>
                        <p className="text-[11px] text-slate-500 font-medium">{item.sub}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                       <ChevronLeft size={14} className="rotate-180" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* System Distribution & Quick Actions */}
        <div className="lg:col-span-4 space-y-10">
           <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-900 px-2">توزيع الخدمات</h2>
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
                 <div className="relative flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full border-[12px] border-slate-50 relative">
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-black text-slate-900 leading-none">{totalItems}</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">إجمالي الخدمات</span>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                    {[
                      { label: "الرحلات", dot: "bg-emerald-500", val: statsData.tripsCount, perc: Math.round((statsData.tripsCount/totalItems)*100) },
                      { label: "الفنادق", dot: "bg-blue-500", val: statsData.hotelsCount, perc: Math.round((statsData.hotelsCount/totalItems)*100) },
                      { label: "الطيران", dot: "bg-indigo-500", val: statsData.flightsCount, perc: Math.round((statsData.flightsCount/totalItems)*100) },
                      { label: "الحافلات", dot: "bg-amber-500", val: statsData.busCount, perc: Math.round((statsData.busCount/totalItems)*100) },
                    ].map(item => (
                      <div key={item.label} className="space-y-2">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${item.dot} shadow-sm`} />
                              <span className="text-[11px] font-bold text-slate-500">{item.label}</span>
                           </div>
                           <span className="text-[10px] font-black text-slate-900">{item.perc}%</span>
                        </div>
                        <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                           <div className={`h-full ${item.dot} transition-all duration-1000`} style={{ width: `${item.perc}%` }} />
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              <Link href="/admin/poster" className="group relative block p-8 bg-slate-900 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-xl shadow-slate-900/10">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                 <div className="relative z-10 flex items-center justify-between">
                    <div className="text-right space-y-1">
                       <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em]">ذكاء اصطناعي</span>
                       <h4 className="text-lg font-black text-white">مصمم البوسترات</h4>
                       <p className="text-[10px] text-slate-400 font-medium">إنشاء تصاميم احترافية للرحلات بضغطة زر.</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-md group-hover:rotate-12 transition-transform">
                       <Sparkles size={22} className="text-amber-400" />
                    </div>
                 </div>
              </Link>

              <div className="flex gap-4">
                 <Link href="/admin/settings" className="flex-1 p-5 bg-white border border-slate-100 rounded-[1.8rem] flex flex-col items-center gap-2 group hover:bg-slate-50 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:text-indigo-600 group-hover:rotate-45 transition-all">
                       <Zap size={18} />
                    </div>
                    <span className="text-[11px] font-black text-slate-900">الإعدادات</span>
                 </Link>
                 <Link href="/" className="flex-1 p-5 bg-white border border-slate-100 rounded-[1.8rem] flex flex-col items-center gap-2 group hover:bg-slate-50 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:text-emerald-600 transition-all">
                       <Globe size={18} />
                    </div>
                    <span className="text-[11px] font-black text-slate-900">زيارة الموقع</span>
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
