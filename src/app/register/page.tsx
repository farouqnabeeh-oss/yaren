"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Placeholder logic – replace with real registration endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    alert("تم إنشاء الحساب بنجاح!");
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-rose-100 to-amber-100 p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white/70 backdrop-blur-xl border border-white/30 p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/logo.svg" alt="Yaren" width={80} height={80} className="animate-bounce" />
        </div>
        <h1 className="text-center text-3xl font-black text-slate-800 mb-2">إنشاء حساب</h1>
        <p className="text-center text-sm text-slate-600 mb-6">ابدأ رحلتك معنا الآن.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <label className="block">
            <span className="text-sm font-medium text-slate-700">الاسم الكامل</span>
            <input type="text" required className="mt-1 block w-full rounded-xl border border-slate-300 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition" placeholder="أحمد علي" />
          </label>
          {/* Email */}
          <label className="block">
            <span className="text-sm font-medium text-slate-700">البريد الإلكتروني</span>
            <input type="email" required className="mt-1 block w-full rounded-xl border border-slate-300 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition" placeholder="you@example.com" />
          </label>
          {/* Password */}
          <label className="block">
            <span className="text-sm font-medium text-slate-700">كلمة المرور</span>
            <input type="password" required className="mt-1 block w-full rounded-xl border border-slate-300 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition" placeholder="••••••••" />
          </label>
          {/* Confirm Password */}
          <label className="block">
            <span className="text-sm font-medium text-slate-700">تأكيد كلمة المرور</span>
            <input type="password" required className="mt-1 block w-full rounded-xl border border-slate-300 bg-white/60 backdrop-blur-sm px-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition" placeholder="••••••••" />
          </label>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <button type="submit" disabled={loading} className="group relative w-full rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 transition transform active:scale-95 disabled:opacity-60">
            {loading ? <span className="animate-pulse">جاري الإنشاء…</span> : "إنشاء حساب"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-700">
          لديك حساب؟{' '}
          <Link href="/login" className="font-medium text-rose-600 hover:underline">تسجيل الدخول</Link>
        </p>
      </div>
    </section>
  );
}
