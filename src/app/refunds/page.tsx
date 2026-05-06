"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RotateCcw, Wallet, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function RefundsPage() {
  return (
    <main className="min-h-screen bg-slate-50" dir="rtl">
      <Navbar />
      <section className="pt-32 pb-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <RotateCcw size={40} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">سياسة <span className="text-blue-500">الإلغاء والاسترجاع</span></h1>
          <p className="text-slate-400 text-lg font-medium">سياسات واضحة ومرنة تضمن حقوقكم المالية في كافة الظروف.</p>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-slate-100 space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
               <div className="w-2 h-8 bg-blue-600 rounded-full" />
               سياسة الإلغاء
            </h2>
            <p className="text-slate-600 leading-relaxed font-bold">
              يمكن إلغاء الحجز واسترداد كامل المبلغ قبل موعد الرحلة بـ 14 يوماً. في حال الإلغاء خلال فترة أقل، قد يتم خصم رسوم إدارية أو رسوم تفرضها الفنادق وشركات الطيران.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                <AlertCircle className="text-blue-600 mb-4" size={32} />
                <h4 className="font-black text-slate-900 mb-2">رحلات اليوم الواحد</h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">يجب الإلغاء قبل 48 ساعة على الأقل لاسترداد العربون كاملاً.</p>
             </div>
             <div className="p-8 bg-green-50 rounded-3xl border border-green-100">
                <CheckCircle2 className="text-green-600 mb-4" size={32} />
                <h4 className="font-black text-slate-900 mb-2">تأكيد الاسترداد</h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">يتم معالجة مبالغ الاسترداد خلال 7-10 أيام عمل من تاريخ الموافقة.</p>
             </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
               <div className="w-2 h-8 bg-blue-600 rounded-full" />
               الحالات الطارئة
            </h2>
            <p className="text-slate-600 leading-relaxed font-bold">
              في حالات القوة القاهرة (إغلاق مطارات، ظروف سياسية، كوارث طبيعية)، تلتزم يارين تورز بتوفير خيارات بديلة أو الاحتفاظ بقيمة الحجز كرصيد للعميل يستخدمه في وقت لاحق دون أي خصومات.
            </p>
          </div>

          <div className="p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
             <p className="text-sm text-slate-400 font-bold text-center">نحن نهتم برضاكم دائماً</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
