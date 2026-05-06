"use client";

import React from "react";
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
  ChevronLeft,
  Circle,
  LogOut,
  User
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
  {
    group: "الرئيسية", items: [
      { name: "لوحة التحكم", icon: LayoutDashboard, href: "/admin" },
    ]
  },
  {
    group: "الإدارة", items: [
      { name: "الفنادق", icon: Hotel, href: "/admin/hotels" },
      { name: "الرحلات", icon: MapIcon, href: "/admin/trips" },
      { name: "الطيران", icon: Plane, href: "/admin/flights" },
      { name: "الباصات", icon: Bus, href: "/admin/bus" },
    ]
  },
  {
    group: "الأدوات", items: [
      { name: "مصمم البوسترات", icon: Sparkles, href: "/admin/poster" },
      { name: "سجل العمليات", icon: Activity, href: "/admin/activity" },
      { name: "الإعدادات", icon: Settings, href: "/admin/settings" },
    ]
  }
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const isDashboard = pathname === "/admin";

  return (
    <aside className="w-72 h-screen bg-white border-l border-slate-100 flex flex-col fixed right-0 top-0 z-50 transition-all duration-500" dir="rtl">
      {/* Soft Logo Section - Only on Dashboard */}
      {isDashboard ? (
        <div className="h-28 flex items-center justify-center px-10 animate-in fade-in slide-in-from-right-4 duration-500">
          <img src="/logo.png" alt="Yaren Tours" className="h-16 w-auto object-contain drop-shadow-sm" />
        </div>
      ) : (
        <div className="h-20 flex items-center px-10">
           <Link href="/admin" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors">
              <ChevronLeft size={16} />
              <span className="text-[11px] font-bold uppercase tracking-wider">العودة للرئيسية</span>
           </Link>
        </div>
      )}

      {/* Nav Content */}
      <div className="flex-1 px-6 space-y-10 py-4 overflow-y-auto custom-scrollbar">
        {menuItems.map((group, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest px-4">{group.group}</h3>
            <div className="space-y-1.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between group px-4 py-3.5 rounded-2xl transition-all duration-300 ${isActive
                      ? "bg-slate-50 text-slate-900 shadow-sm border border-slate-100/50"
                      : "text-slate-400 hover:text-slate-900 hover:bg-slate-50/50"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      {item.icon && <item.icon size={18} className={`${isActive ? "text-indigo-600" : "text-slate-300 group-hover:text-slate-900"} transition-colors`} strokeWidth={isActive ? 2.5 : 2} />}
                      <span className={`text-[13px] ${isActive ? "font-bold" : "font-medium"}`}>{item.name}</span>
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.4)]" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Quick Info & Logout */}
      <div className="p-6 space-y-4 border-t border-slate-50">
        <div className="bg-slate-50/50 rounded-[1.5rem] p-4 flex items-center justify-between border border-slate-100/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center font-bold text-slate-900 text-xs">YA</div>
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-900 leading-none">مدير النظام</p>
              <p className="text-[9px] text-emerald-500 font-bold mt-1">متصل الآن</p>
            </div>
          </div>
          <Link href="/admin/settings" className="p-2 text-slate-300 hover:text-indigo-600 transition-colors">
            <Settings size={16} />
          </Link>
        </div>

        <button 
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-300 group"
        >
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold">تسجيل الخروج</span>
        </button>
      </div>

    </aside>
  );
};
export default AdminSidebar;
