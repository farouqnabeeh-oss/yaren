"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, User, ShieldAlert, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await signIn("credentials", { redirect: false, username, password });
      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.replace("/admin");
      } else {
        setError("بيانات الدخول غير صحيحة");
      }
    } catch (err) {
      setError("حدث خطأ غير متوقع أثناء الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden font-sans" dir="rtl">
      {/* Background ambient glowing blurs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] shadow-2xl p-10 md:p-12 border border-white/5 relative z-10 mx-4"
      >

        {/* Header / Logo */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-inner"
          >
            <Lock className="text-indigo-400" size={28} />
          </motion.div>

          <h1 className="text-2xl font-black text-white tracking-tight mb-2">تسجيل دخول المشرف</h1>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            الرجاء إدخل اسم المستخدم وكلمة المرور للوصول إلى لوحة التحكم
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-xs font-black text-slate-300 mr-2 uppercase tracking-wider">
              اسم المستخدم
            </label>
            <div className="relative">
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pr-12 pl-6 text-sm text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white/[0.05] outline-none transition-all placeholder-slate-600 text-right"
                placeholder="اسم المستخدم"
                suppressHydrationWarning
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs font-black text-slate-300 mr-2 uppercase tracking-wider">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 pr-12 pl-6 text-sm text-white font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white/[0.05] outline-none transition-all placeholder-slate-600 text-right"
                placeholder="••••••••"
                suppressHydrationWarning
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs font-bold text-right font-sans"
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
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/15 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>تسجيل الدخول</span>
                <ArrowLeft size={16} />
              </>
            )}
          </motion.button>
        </form>

        {/* Back Link */}
        <div className="text-center mt-8 pt-6 border-t border-white/5">
          <a href="/" className="text-xs text-slate-500 hover:text-indigo-400 transition-colors inline-flex items-center gap-1 font-bold">
            ← العودة للموقع الرئيسي
          </a>
        </div>
      </motion.div>
    </div>
  );
}
