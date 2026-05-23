"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock } from "lucide-react";

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
        setError("فشل تسجيل الدخول");
      }
    } catch (err) {
      setError("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 w-full">
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 transition-transform transform hover:scale-[1.02]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <svg className="w-20 h-20 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l9 21H3L12 2z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">تسجيل الدخول إلى لوحة الإدارة</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">اسم المستخدم</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/60 placeholder-gray-500"
                placeholder="admin"
                dir="ltr"
                suppressHydrationWarning
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/60 placeholder-gray-500"
                placeholder="••••••••"
                dir="ltr"
                suppressHydrationWarning
              />
            </div>
          </div>
          {error && (
            <p className="text-center text-red-600 text-sm font-medium">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full transition-opacity disabled:opacity-50"
          >
            {loading ? "جاري التحقق…" : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
