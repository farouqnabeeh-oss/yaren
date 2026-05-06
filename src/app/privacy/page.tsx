"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Lock, Eye, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50" dir="rtl">
      <Navbar />
      <section className="pt-32 pb-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-600/5" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Lock size={40} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">سياسة <span className="text-orange-500">الخصوصية</span></h1>
          <p className="text-slate-400 text-lg font-medium">نلتزم بحماية بياناتكم وخصوصيتكم كأولوية قصوى في يارين تورز.</p>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-slate-100 space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
               <div className="w-2 h-8 bg-orange-600 rounded-full" />
               جمع المعلومات
            </h2>
            <p className="text-slate-600 leading-relaxed font-bold">
              نقوم بجمع المعلومات الضرورية فقط لإتمام حجوزاتكم، مثل الاسم، رقم الهاتف، وتفاصيل السفر. لا نقوم بمشاركة هذه البيانات مع أي طرف ثالث خارج نطاق مزودي الخدمة (الفنادق، شركات الطيران) لضمان إتمام رحلتكم.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
               <div className="w-2 h-8 bg-orange-600 rounded-full" />
               أمن البيانات
            </h2>
            <p className="text-slate-600 leading-relaxed font-bold">
              نستخدم تقنيات تشفير متطورة لحماية بياناتكم الشخصية والمالية. موقعنا محمي بشهادات SSL عالمية لضمان تصفح آمن وحماية كاملة من الاختراقات.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
               <div className="w-2 h-8 bg-orange-600 rounded-full" />
               حقوق المستخدم
            </h2>
            <p className="text-slate-600 leading-relaxed font-bold">
              يحق لكل عميل طلب مراجعة بياناته أو تعديلها أو حتى حذفها من سجلاتنا في أي وقت عبر التواصل مع فريق الدعم الفني لدينا.
            </p>
          </div>

          <div className="p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
             <p className="text-sm text-slate-400 font-bold text-center">آخر تحديث: مايو 2026</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
