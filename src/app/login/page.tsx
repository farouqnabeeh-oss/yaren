"use client";

import React, { useState } from "react";
import { Lock, Mail, ArrowLeft, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = data.get("email")?.toString() ?? "";
    const password = data.get("password")?.toString() ?? "";

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("بيانات الدخول غير صحيحة");
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans" dir="rtl">
      {/* Background ambient glowing blurs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-10 md:p-12 border border-slate-100 relative z-10 mx-4 text-slate-800"
      >
        {/* Top Gold Border Bar */}
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-primary via-orange-500 to-primary rounded-t-[3rem]" />
        
        {/* Header / Logo */}
        <div className="text-center mb-10">
          <div className="relative h-20 w-20 mx-auto mb-6 flex items-center justify-center">
            <img src="/logo.png" alt="يارين تورز" className="w-full h-full object-contain" />
          </div>
          
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">تسجيل الدخول</h1>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            مرحباً بك مجدداً! أدخل بياناتك للوصول إلى حسابك وسفراتك
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-black text-slate-600 mr-2 uppercase tracking-wider">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pr-12 pl-6 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-primary outline-none transition-all placeholder-slate-400 text-right"
                placeholder="mail@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs font-black text-slate-600 mr-2 uppercase tracking-wider">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pr-12 pl-6 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-primary outline-none transition-all placeholder-slate-400 text-right"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-2xl text-xs font-bold text-right"
            >
              <ShieldAlert size={18} className="shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold py-4 rounded-2xl text-sm transition-all shadow-lg shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
            ) : (
              <>
                <span>دخول</span>
                <ArrowLeft size={16} />
              </>
            )}
          </motion.button>
        </form>

        {/* Back/Register Links */}
        <div className="text-center mt-8 pt-6 border-t border-slate-100 space-y-4">
          <p className="text-xs text-slate-500">
            ليس لديك حساب بعد؟{" "}
            <a href="/register" className="text-primary hover:underline font-bold">
              إنشاء حساب جديد
            </a>
          </p>
          <div>
            <a href="/" className="text-xs text-slate-400 hover:text-primary transition-colors inline-flex items-center gap-1 font-bold">
              ← العودة للموقع الرئيسي
            </a>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
