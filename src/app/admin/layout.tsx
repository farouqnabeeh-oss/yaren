"use client";

import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import NotificationCenter from "@/components/admin/NotificationCenter";
import { Search, User, Bell } from "lucide-react";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/admin": { title: "لوحة التحكم", subtitle: "نظرة عامة على النظام" },
  "/admin/hotels": { title: "الفنادق", subtitle: "إدارة الفنادق والإقامات" },
  "/admin/trips": { title: "الرحلات", subtitle: "إدارة البرامج السياحية" },
  "/admin/offers": { title: "العروض الخاصة", subtitle: "إدارة العروض والخصومات" },
  "/admin/flights": { title: "الطيران", subtitle: "إدارة رحلات الطيران" },
  "/admin/bus": { title: "الباصات", subtitle: "إدارة حجوزات الباص" },
  "/admin/crossings": { title: "المعابر الحدودية", subtitle: "إدارة روابط وبيانات المعابر" },
  "/admin/experts": { title: "خبراء السفر", subtitle: "إدارة ملفات الخبراء والمستشارين" },
  "/admin/poster": { title: "مصمم البوسترات", subtitle: "إنشاء تصاميم احترافية" },
  "/admin/activity": { title: "سجل العمليات", subtitle: "تاريخ جميع النشاطات" },
  "/admin/settings": { title: "الإعدادات", subtitle: "تخصيص وإعدادات النظام" },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center">{children}</div>;
  }

  const pageInfo = pageTitles[pathname] || { title: "الإدارة", subtitle: "يارين تورز" };

  return (
    <div className="min-h-screen flex" dir="rtl" style={{ background: "#f8fafc" }}>
      <AdminSidebar />

      {/* Main Area */}
      <div className="flex-grow mr-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <header
          className="h-20 px-8 flex items-center justify-between sticky top-0 z-40"
          style={{
            background: "rgba(248,250,252,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(226,232,240,0.8)"
          }}
        >
          {/* Page Title */}
          <div className="text-right">
            <h2 className="text-lg font-black text-slate-900 leading-none">{pageInfo.title}</h2>
            <p className="text-[11px] text-slate-400 font-medium mt-1">{pageInfo.subtitle}</p>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div
              className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-2xl"
              style={{ background: "white", border: "1px solid #e2e8f0" }}
            >
              <Search size={14} className="text-slate-300" />
              <input
                type="text"
                placeholder="بحث سريع..."
                className="bg-transparent border-none outline-none text-sm font-medium w-44 text-right placeholder:text-slate-300 text-slate-700"
                onChange={(e) => {
                  window.dispatchEvent(new CustomEvent("admin-search", { detail: e.target.value }));
                }}
              />
              <kbd
                className="text-[9px] font-bold px-1.5 py-0.5 rounded-md hidden lg:block"
                style={{ background: "#f1f5f9", color: "#94a3b8" }}
              >
                ⌘K
              </kbd>
            </div>

            {/* Notifications */}
            <NotificationCenter />

            {/* User */}
            <div
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl cursor-pointer"
              style={{ background: "white", border: "1px solid #e2e8f0" }}
            >
              <div className="text-right hidden md:block">
                <p className="text-[11px] font-black text-slate-900 leading-none">أدمن يارين</p>
                <p className="text-[9px] text-slate-400 font-medium mt-0.5">مدير النظام</p>
              </div>
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black text-white shadow-sm"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              >
                YA
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-8 py-8">
          <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="px-8 py-4 flex items-center justify-between" style={{ borderTop: "1px solid #e2e8f0" }}>
          <p className="text-[10px] text-slate-400 font-medium">© 2025 يارين تورز. لوحة الإدارة.</p>
          <p className="text-[10px] text-slate-300 font-medium">v1.0.0</p>
        </footer>
      </div>
    </div>
  );
}
