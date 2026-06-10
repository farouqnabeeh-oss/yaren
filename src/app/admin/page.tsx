import React from "react";
import prisma from "@/lib/prisma";
import {
  Hotel,
  Map as MapIcon,
  Plane,
  Bus,
  ChevronLeft,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Zap,
  Globe,
  Gift,
  TrendingUp,
  Activity
} from "lucide-react";
import Link from "next/link";

export default async function AdminHome() {
  let statsData = { hotelsCount: 0, tripsCount: 0, flightsCount: 0, busCount: 0, offersCount: 0 };
  let activity: any[] = [];

  try {
    const [hotelsCount, tripsCount, flightsCount, busCount, offersCount,
           latestHotels, latestTrips, latestFlights, latestBus] = await Promise.all([
      prisma.hotel.count().catch(() => 0),
      prisma.trip.count().catch(() => 0),
      prisma.busTrip.count().catch(() => 0),
      prisma.flight.count().catch(() => 0),
      (prisma as any).offer.count().catch(() => 0),
      prisma.hotel.findMany({ orderBy: { createdAt: "desc" }, take: 2 }).catch(() => []),
      prisma.trip.findMany({ orderBy: { createdAt: "desc" }, take: 2 }).catch(() => []),
      prisma.flight.findMany({ orderBy: { createdAt: "desc" }, take: 2 }).catch(() => []),
      prisma.busTrip.findMany({ orderBy: { createdAt: "desc" }, take: 2 }).catch(() => []),
    ]);

    statsData = { hotelsCount, tripsCount, flightsCount, busCount, offersCount };

    activity = [
      ...latestHotels.map((h: any) => ({
        label: `فندق جديد`, title: h.name, sub: "تم الإضافة", icon: Hotel,
        gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50", time: h.createdAt, href: "/admin/hotels",
      })),
      ...latestTrips.map((t: any) => ({
        label: `رحلة جديدة`, title: t.title, sub: `${t.duration} • ₪${Number(t.price).toLocaleString("ar")}`,
        icon: MapIcon, gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50", time: t.createdAt, href: "/admin/trips",
      })),
      ...latestFlights.map((f: any) => ({
        label: `رحلة طيران`, title: `${f.from} ✈ ${f.to}`, sub: f.airline,
        icon: Plane, gradient: "from-indigo-500 to-violet-500", bg: "bg-indigo-50", time: f.createdAt, href: "/admin/flights",
      })),
      ...latestBus.map((b: any) => ({
        label: `خط باص`, title: `${b.from} → ${b.to}`, sub: b.time,
        icon: Bus, gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50", time: b.createdAt, href: "/admin/bus",
      })),
    ]
      .filter((item: any) => item.time instanceof Date)
      .sort((a: any, b: any) => b.time.getTime() - a.time.getTime())
      .slice(0, 6);
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
  }

  const stats = [
    { name: "الفنادق", value: statsData.hotelsCount, icon: Hotel, gradient: "from-blue-500 to-cyan-600", light: "bg-blue-50", textColor: "text-blue-600", href: "/admin/hotels", trend: "+12%" },
    { name: "الرحلات", value: statsData.tripsCount, icon: MapIcon, gradient: "from-emerald-500 to-teal-600", light: "bg-emerald-50", textColor: "text-emerald-600", href: "/admin/trips", trend: "+5%" },
    { name: "الطيران", value: statsData.flightsCount, icon: Plane, gradient: "from-indigo-500 to-violet-600", light: "bg-indigo-50", textColor: "text-indigo-600", href: "/admin/flights", trend: "+8%" },
    { name: "الباصات", value: statsData.busCount, icon: Bus, gradient: "from-amber-500 to-orange-600", light: "bg-amber-50", textColor: "text-amber-600", href: "/admin/bus", trend: "+15%" },
    { name: "العروض", value: statsData.offersCount, icon: Gift, gradient: "from-rose-500 to-pink-600", light: "bg-rose-50", textColor: "text-rose-600", href: "/admin/offers", trend: "+20%" },
  ];

  function timeAgo(date: Date): string {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return "الآن";
    if (diff < 3600) return `${Math.floor(diff / 60)} دقيقة`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ساعة`;
    return `${Math.floor(diff / 86400)} يوم`;
  }

  const totalItems = (statsData.hotelsCount + statsData.tripsCount + statsData.flightsCount + statsData.busCount) || 1;

  const quickActions = [
    { label: "فندق جديد", icon: Hotel, href: "/admin/hotels", color: "from-blue-500 to-cyan-600" },
    { label: "رحلة جديدة", icon: MapIcon, href: "/admin/trips", color: "from-emerald-500 to-teal-600" },
    { label: "عرض جديد", icon: Gift, href: "/admin/offers", color: "from-rose-500 to-pink-600" },
    { label: "رحلة طيران", icon: Plane, href: "/admin/flights", color: "from-indigo-500 to-violet-600" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8" dir="rtl">

      {/* Welcome Banner */}
      <div
        className="relative rounded-3xl p-8 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
        }}
      >
        {/* Decorative */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-20" style={{
          background: "radial-gradient(circle, #818cf8, transparent 70%)"
        }} />
        <div className="absolute bottom-0 right-20 w-48 h-48 opacity-10" style={{
          background: "radial-gradient(circle, #c084fc, transparent 70%)"
        }} />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px rgba(52,211,153,0.8)" }} />
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">النظام يعمل</span>
            </div>
            <h1 className="text-3xl font-black text-white leading-tight">
              مرحباً، مدير يارين 👋
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              {new Date().toLocaleDateString("ar-EG", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/poster"
              className="flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white" }}
            >
              <Sparkles size={16} />
              مصمم البوسترات
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm text-white/70 transition-all hover:text-white"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Globe size={16} />
              الموقع
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <Link
            key={i}
            href={stat.href}
            className="group relative bg-white rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            {/* Hover gradient overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl"
              style={{ background: `linear-gradient(135deg, ${stat.gradient.replace("from-", "").replace(" to-", ", ")})` }}
            />

            <div className={`w-11 h-11 ${stat.light} rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
              <stat.icon size={20} className={stat.textColor} />
            </div>

            <p className="text-3xl font-black text-slate-900 leading-none mb-1">{stat.value}</p>
            <p className="text-xs font-bold text-slate-400">{stat.name}</p>

            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all">
              <ArrowUpRight size={14} className={stat.textColor} />
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content: Activity + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Activity Feed */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" style={{ boxShadow: "0 0 8px rgba(16,185,129,0.6)", animation: "pulse 2s infinite" }} />
              <h2 className="text-base font-black text-slate-900">آخر النشاطات</h2>
            </div>
            <Link
              href="/admin/activity"
              className="text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              عرض الكل <ChevronLeft size={12} />
            </Link>
          </div>

          <div
            className="bg-white rounded-3xl overflow-hidden"
            style={{ border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
          >
            {activity.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 opacity-30">
                <Activity size={32} className="mb-3 text-slate-400" />
                <p className="text-sm font-bold text-slate-600">لا توجد نشاطات حتى الآن</p>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: "#f1f5f9" }}>
                {activity.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center justify-between px-6 py-5 hover:bg-slate-50/60 transition-all group"
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${item.gradient.replace("from-", "").replace(" to-", ", ")})` }}
                      >
                        <item.icon size={18} />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</span>
                          <span className="text-[9px] text-slate-300">•</span>
                          <span className="text-[10px] text-slate-300 font-medium">{timeAgo(item.time)}</span>
                        </div>
                        <p className="text-sm font-black text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-400 font-medium">{item.sub}</p>
                      </div>
                    </div>
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-indigo-600 transition-all"
                      style={{ background: "#f8fafc" }}
                    >
                      <ChevronLeft size={14} />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-5">

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-black text-slate-900 mb-4 px-1">إجراءات سريعة</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, i) => (
                <Link
                  key={i}
                  href={action.href}
                  className="group flex flex-col items-center gap-2.5 p-5 rounded-2xl bg-white text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  style={{ border: "1px solid #e2e8f0" }}
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${action.color.replace("from-", "").replace(" to-", ", ")})` }}
                  >
                    <action.icon size={18} />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Distribution */}
          <div
            className="bg-white rounded-3xl p-6"
            style={{ border: "1px solid #e2e8f0" }}
          >
            <h3 className="text-sm font-black text-slate-900 mb-5">توزيع الخدمات</h3>
            <div className="space-y-4">
              {[
                { label: "الرحلات", val: statsData.tripsCount, color: "from-emerald-400 to-teal-500", dot: "bg-emerald-400" },
                { label: "الفنادق", val: statsData.hotelsCount, color: "from-blue-400 to-cyan-500", dot: "bg-blue-400" },
                { label: "الطيران", val: statsData.flightsCount, color: "from-indigo-400 to-violet-500", dot: "bg-indigo-400" },
                { label: "الحافلات", val: statsData.busCount, color: "from-amber-400 to-orange-500", dot: "bg-amber-400" },
              ].map((item) => {
                const perc = Math.round((item.val / totalItems) * 100);
                return (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-slate-900">{item.val}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-slate-500">{item.label}</span>
                        <div className={`w-2 h-2 rounded-full ${item.dot}`} />
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${perc}%`,
                          background: `linear-gradient(90deg, ${item.color.replace("from-", "").replace(" to-", ", ")})`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Poster CTA */}
          <Link
            href="/admin/poster"
            className="group relative block p-6 rounded-3xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl"
            style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)" }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 opacity-30 transition-transform group-hover:scale-150 duration-700"
              style={{ background: "radial-gradient(circle, #818cf8, transparent)" }} />
            <div className="relative z-10 flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:rotate-12 transition-transform">
                <Sparkles size={20} className="text-amber-400" />
              </div>
              <div className="text-right space-y-1">
                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">ذكاء اصطناعي</span>
                <h4 className="text-base font-black text-white">مصمم البوسترات</h4>
                <p className="text-[11px] text-slate-400 font-medium">تصاميم احترافية بضغطة زر</p>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
