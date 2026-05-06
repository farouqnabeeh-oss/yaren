"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, Scale, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50" dir="rtl">
      <Navbar />
      <section className="pt-32 pb-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-green-600/5" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <Scale size={40} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">شروط <span className="text-green-500">الخدمة</span></h1>
          <p className="text-slate-400 text-lg font-medium">الأسس القانونية التي تنظم علاقتنا مع عملائنا الكرام لضمان تجربة سفر عادلة.</p>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-slate-100 space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
               <div className="w-2 h-8 bg-green-600 rounded-full" />
               الالتزامات العامة
            </h2>
            <p className="text-slate-600 leading-relaxed font-bold">
              باستخدامك لموقع يارين تورز، فإنك توافق على الالتزام بكافة الشروط المذكورة. يلتزم العميل بتقديم بيانات صحيحة ودقيقة عند الحجز، وتتحمل الشركة مسؤولية تنفيذ البرنامج المتفق عليه بجودة عالية.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
               <div className="w-2 h-8 bg-green-600 rounded-full" />
               إجراءات الحجز والدفع
            </h2>
            <p className="text-slate-600 leading-relaxed font-bold">
              يعتبر الحجز مؤكداً فقط بعد دفع العربون أو كامل المبلغ حسب نوع الرحلة. يتم تسليم العميل سند قبض إلكتروني أو ورقي يؤكد كافة تفاصيل البرنامج المتفق عليه.
            </p>
          </div>

          <div className="p-8 bg-orange-50 rounded-3xl border border-orange-100 flex items-start gap-4">
             <AlertTriangle className="text-orange-600 shrink-0" size={24} />
             <div>
                <h4 className="font-black text-slate-900 mb-1">تنبيه هام</h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">يارين تورز غير مسؤولة عن فقدان الممتلكات الشخصية أثناء الرحلات، وننصح دائماً بالحصول على تأمين سفر شامل.</p>
             </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
               <div className="w-2 h-8 bg-green-600 rounded-full" />
               التعديلات على البرنامج
            </h2>
            <p className="text-slate-600 leading-relaxed font-bold">
              تحتفظ الشركة بالحق في إجراء تعديلات طفيفة على برنامج الرحلة في حال وجود ظروف خارجة عن الإرادة، مع الالتزام بتقديم بديل بنفس المستوى أو أفضل.
            </p>
          </div>

          <div className="p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
             <p className="text-sm text-slate-400 font-bold text-center">علاقة مبنية على الثقة والوضوح</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
