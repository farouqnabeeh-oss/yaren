"use client";

import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import NotificationCenter from "@/components/admin/NotificationCenter";
import { Search, User, Bell, Command, ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-white flex items-center justify-center">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-white flex" dir="rtl">
      {/* Sidebar - Soft Minimal */}
      <AdminSidebar />

      {/* Main Container */}
      <div className="flex-grow mr-72">
        {/* Header - Airy & Simple */}
        <header className="h-24 px-12 flex items-center justify-between sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-50">
          <div className="flex items-center gap-4 group">
            <Search size={16} className="text-slate-300 group-focus-within:text-slate-900 transition-colors" />
            <input 
              type="text" 
              placeholder="البحث في النظام..." 
              className="bg-transparent border-none outline-none text-sm font-medium w-64 text-right placeholder:text-slate-300 text-slate-900"
            />
          </div>

          <div className="flex items-center gap-8">
            <NotificationCenter />
            
            <div className="flex items-center gap-4 pl-4">
              <div className="text-left hidden md:block">
                <p className="text-xs font-bold text-slate-900">أدمن يارين</p>
                <p className="text-[10px] text-slate-400 font-medium">لوحة التحكم</p>
              </div>
              <div className="w-10 h-10 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center text-slate-400">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* Content View - airy spacing */}
        <main className="px-12 py-10">
          <div className="animate-in fade-in duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
