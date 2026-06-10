"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PrivacyRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/policies#privacy");
  }, [router]);
  return (
    <div className="min-h-screen bg-white flex items-center justify-center text-slate-900 font-sans">
      <div className="animate-pulse text-sm">جاري التوجيه إلى سياسة الخصوصية...</div>
    </div>
  );
}
