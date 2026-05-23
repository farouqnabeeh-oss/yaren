"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = data.get("email")?.toString() ?? "";
    const password = data.get("password")?.toString() ?? "";

    // Placeholder: replace with real auth endpoint
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      // on success, redirect
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-white drop-shadow-md">
          تسجيل الدخول
        </h2>
        {error && (
          <p className="mb-4 rounded bg-red-500/20 px-3 py-2 text-center text-red-200">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full rounded-xl border border-white/30 bg-white/5 px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="w-full rounded-xl border border-white/30 bg-white/5 px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-indigo-400"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 transition-colors disabled:opacity-50"
          >
            دخول
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-white/70">
          ليس لديك حساب؟{' '}
          <a href="/register" className="font-medium text-indigo-200 hover:underline">
            إنشاء حساب
          </a>
        </p>
      </div>
    </section>
  );
}
