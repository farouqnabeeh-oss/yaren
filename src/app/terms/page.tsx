"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TermsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/policies#terms");
  }, [router]);
  return (
    <div className="min-h-screen bg-white flex items-center justify-center text-slate-900 font-sans">
      <div className="animate-pulse text-sm">جاري التوجيه إلى شروط الخدمة...</div>
    </div>
  );
}
