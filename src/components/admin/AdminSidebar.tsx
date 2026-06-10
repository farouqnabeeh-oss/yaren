"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Hotel,
  Map as MapIcon,
  Plane,
  Bus,
  Settings,
  Activity,
  Sparkles,
  ChevronRight,
  LogOut,
  Gift,
  Globe,
  ChevronLeft,
  Users
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  {
    group: "الرئيسية",
    items: [
      { name: "لوحة التحكم", icon: LayoutDashboard, href: "/admin", color: "from-violet-500 to-indigo-600" },
    ]
  },
  {
    group: "إدارة المحتوى",
    items: [
      { name: "الفنادق", icon: Hotel, href: "/admin/hotels", color: "from-blue-500 to-cyan-600" },
      { name: "الرحلات", icon: MapIcon, href: "/admin/trips", color: "from-emerald-500 to-teal-600" },
      { name: "العروض الخاصة", icon: Gift, href: "/admin/offers", color: "from-orange-500 to-rose-600" },
      { name: "الطيران", icon: Plane, href: "/admin/flights", color: "from-indigo-500 to-violet-600" },
      { name: "الباصات", icon: Bus, href: "/admin/bus", color: "from-amber-500 to-orange-600" },
      { name: "المعابر الحدودية", icon: Globe, href: "/admin/crossings", color: "from-teal-500 to-cyan-600" },
      { name: "خبراء السفر", icon: Users, href: "/admin/experts", color: "from-indigo-500 to-indigo-700" },
    ]
  },
  {
    group: "الأدوات والإعدادات",
    items: [
      { name: "مصمم البوسترات", icon: Sparkles, href: "/admin/poster", color: "from-pink-500 to-purple-600" },
      { name: "سجل العمليات", icon: Activity, href: "/admin/activity", color: "from-slate-500 to-slate-700" },
      { name: "الإعدادات", icon: Settings, href: "/admin/settings", color: "from-slate-500 to-slate-700" },
    ]
  }
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside
      className="w-72 h-screen flex flex-col fixed right-0 top-0 z-50"
      style={{
        background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 60%, #0f172a 100%)",
        borderLeft: "1px solid rgba(255,255,255,0.06)"
      }}
      dir="rtl"
    >
      {/* Logo Area */}
      <div className="px-8 py-7 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Link href="/admin" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            <img src="/logo.png" alt="Yareen" className="w-7 h-7 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <div>
            <p className="text-white font-black text-sm tracking-tight leading-none">يارين تورز</p>
            <p className="text-slate-400 text-[10px] font-medium mt-0.5 tracking-widest uppercase">لوحة الإدارة</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <div className="flex-1 px-4 py-6 overflow-y-auto space-y-8" style={{ scrollbarWidth: "none" }}>
        {menuItems.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-[0.25em] px-4 mb-3" style={{ color: "rgba(148,163,184,0.5)" }}>
              {group.group}
            </p>
            {group.items.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between group px-4 py-3 rounded-2xl transition-all duration-200 relative overflow-hidden"
                  style={{
                    background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
                    border: isActive ? "1px solid rgba(99,102,241,0.25)" : "1px solid transparent",
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute inset-0 opacity-10 rounded-2xl"
                      style={{ background: `linear-gradient(135deg, ${item.color.replace("from-", "").replace(" to-", ", ")})` }}
                    />
                  )}
                  <div className="flex items-center gap-3 relative z-10">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm transition-all duration-200"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${item.color.includes("violet") ? "#6366f1, #8b5cf6" : item.color.includes("blue") ? "#3b82f6, #06b6d4" : item.color.includes("emerald") ? "#10b981, #0d9488" : item.color.includes("orange") ? "#f97316, #f43f5e" : item.color.includes("indigo") ? "#6366f1, #7c3aed" : item.color.includes("amber") ? "#f59e0b, #ea580c" : item.color.includes("pink") ? "#ec4899, #9333ea" : "#64748b, #334155"})`
                          : "rgba(255,255,255,0.05)"
                      }}
                    >
                      <item.icon
                        size={15}
                        className="transition-colors"
                        style={{ color: isActive ? "#fff" : "rgba(148,163,184,0.7)" }}
                      />
                    </div>
                    <span
                      className="text-[13px] transition-colors font-medium"
                      style={{ color: isActive ? "#fff" : "rgba(148,163,184,0.8)" }}
                    >
                      {item.name}
                    </span>
                  </div>
                  {isActive && (
                    <div
                      className="w-1.5 h-1.5 rounded-full relative z-10"
                      style={{
                        background: "linear-gradient(135deg, #818cf8, #c084fc)",
                        boxShadow: "0 0 8px rgba(129,140,248,0.6)"
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t space-y-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Globe size={15} style={{ color: "rgba(148,163,184,0.7)" }} />
          <span className="text-[12px] font-medium" style={{ color: "rgba(148,163,184,0.8)" }}>زيارة الموقع</span>
          <ChevronLeft size={12} className="mr-auto opacity-30" />
        </Link>

        <div
          className="flex items-center justify-between p-4 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white shadow-md"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              YA
            </div>
            <div>
              <p className="text-[11px] font-bold text-white leading-none">مدير النظام</p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.6)" }} />
                <p className="text-[9px] text-emerald-400 font-bold">متصل الآن</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 group cursor-pointer"
            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.15)" }}
            title="تسجيل الخروج"
          >
            <LogOut size={14} style={{ color: "rgba(239,68,68,0.7)" }} className="group-hover:text-red-400 transition-colors" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
