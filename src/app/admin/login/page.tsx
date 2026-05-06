"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("بيانات الدخول غير صحيحة");
      } else {
        router.push("/admin");
      }
    } catch (err) {
      setError("حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 relative overflow-hidden" dir="rtl">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-50 rounded-full blur-[120px] -z-10 opacity-50" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 rounded-full blur-[100px] -z-10 opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px]"
      >
        <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 relative">
          <div className="text-center mb-12">
            <Link href="/" className="inline-block mb-8 hover:scale-105 transition-transform">
              <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain mx-auto" />
            </Link>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">مرحباً بك مجدداً</h1>
            <p className="text-slate-400 font-medium">سجل الدخول لإدارة عالم يارين تورز</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">اسم المستخدم</label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-5 flex items-center text-slate-300 group-focus-within:text-slate-900 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl py-5 pr-14 pl-6 text-slate-900 font-bold outline-none ring-2 ring-transparent focus:ring-slate-900/5 transition-all"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">كلمة المرور</label>
              <div className="relative group">
                <div className="absolute inset-y-0 right-5 flex items-center text-slate-300 group-focus-within:text-slate-900 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl py-5 pr-14 pl-6 text-slate-900 font-bold outline-none ring-2 ring-transparent focus:ring-slate-900/5 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-sm font-bold text-center bg-red-50 py-3 rounded-xl border border-red-100"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-[1.5rem] font-black text-lg transition-all shadow-2xl shadow-slate-900/20 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "دخول للوحة التحكم"}
            </button>
          </form>
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-sm transition-colors group">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            العودة للموقع الرئيسي
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
