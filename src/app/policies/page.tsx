"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ShieldCheck,
  RefreshCcw,
  FileText,
  CheckCircle2,
  AlertCircle,
  Lock,
  Clock,
  UserCheck
} from "lucide-react";
import { motion } from "framer-motion";

export default function PoliciesPage() {
  const sections = [
    {
      id: "privacy",
      title: "سياسة الخصوصية",
      icon: <ShieldCheck className="text-primary" size={32} />,
      content: [
        "نحن نلتزم بحماية خصوصية بياناتك الشخصية التي تزودنا بها أثناء الحجز.",
        "يتم استخدام بياناتك فقط لإتمام عمليات الحجز والتواصل معك بشأن رحلتك.",
        "نستخدم تقنيات تشفير متطورة (SSL) لتأمين كافة المعاملات المالية.",
        "لا نقوم بمشاركة بياناتك مع أي طرف ثالث إلا الجهات المعنية بالسفر (الفنادق، شركات الطيران)."
      ]
    },
    {
      id: "refund",
      title: "سياسة الإلغاء والاسترجاع",
      icon: <RefreshCcw className="text-orange-500" size={32} />,
      content: [
        "يمكن إلغاء الحجز واسترداد كامل المبلغ قبل 30 يوماً من موعد الرحلة.",
        "في حال الإلغاء خلال 15-30 يوماً، يتم خصم 25% من قيمة الرحلة.",
        "في حال الإلغاء قبل أقل من 7 أيام، لا يمكن استرداد المبلغ نظراً لالتزاماتنا مع الفنادق والطيران.",
        "تتم عملية الاسترداد خلال 7-14 يوم عمل إلى نفس البطاقة المستخدمة في الدفع."
      ]
    },
    {
      id: "terms",
      title: "شروط الخدمة",
      icon: <FileText className="text-emerald-500" size={32} />,
      content: [
        "يجب على المسافر التأكد من صلاحية جواز السفر لمدة لا تقل عن 6 أشهر.",
        "يارين تورز غير مسؤولة عن رفض التأشيرات من قبل السفارات.",
        "الأسعار المعلنة قابلة للتغيير بناءً على توفر المقاعد وتغير أسعار الوقود العالمية.",
        "الالتزام بمواعيد التجمع والانطلاق شرط أساسي لنجاح البرنامج السياحي."
      ]
    }
  ];

  return (
    <main className="bg-white min-h-screen text-slate-900 font-sans relative overflow-hidden" dir="rtl">
      <Navbar />

      {/* Ambient backgrounds */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-emerald-500/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Header Section */}
      <section className="pt-44 pb-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-6">
          <span className="inline-block bg-slate-50 border border-slate-200/60 text-primary px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            🛡️ مركز الثقة والأمان
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight">
            السياسات <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-orange-400 font-black">والشروط</span> القانونية
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
            في يارين تورز، نضع الوضوح والشفافية في مقدمة أولوياتنا لضمان رحلة آمنة ومريحة لكم.
          </p>
        </div>
      </section>

      {/* Policies Grid */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sections.map((sec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-[3rem] p-10 border border-slate-100 flex flex-col h-full hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary/10 transition-colors">
                  {sec.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6">{sec.title}</h3>
                <ul className="space-y-5 flex-grow">
                  {sec.content.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 leading-relaxed font-medium">
                      <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Info / FAQ Style */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-[3.5rem] p-12 md:p-20 border border-slate-100 space-y-16 shadow-xl">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-black text-slate-800">توضيحات إضافية هامة 💡</h2>
              <p className="text-slate-500 font-bold">كل ما تحتاج معرفته عن حقوقك والتزاماتنا تجاهك.</p>
            </div>

            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-slate-50 text-primary border border-slate-200/60 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Lock size={24} />
                </div>
                <div className="space-y-2 text-right">
                  <h4 className="text-xl font-black text-slate-800">حماية المدفوعات</h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">نحن نستخدم بوابات دفع معتمدة عالمياً (PCI-DSS) لضمان أن بيانات بطاقتك الائتمانية لا تخزن أبداً في خوادمنا.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-slate-50 text-orange-500 border border-slate-200/60 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Clock size={24} />
                </div>
                <div className="space-y-2 text-right">
                  <h4 className="text-xl font-black text-slate-800">تعديل مواعيد الرحلات</h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">في حال حدوث تغيير مفاجئ في مواعيد الطيران أو الظروف الجوية، نلتزم بتوفير بدائل مناسبة أو إبلاغكم فوراً لاتخاذ القرار الأنسب.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-slate-50 text-emerald-500 border border-slate-200/60 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <UserCheck size={24} />
                </div>
                <div className="space-y-2 text-right">
                  <h4 className="text-xl font-black text-slate-800">التزامات المسافر</h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">يتعهد المسافر بتقديم معلومات دقيقة وصحيحة عند الحجز (الاسم كما في الجواز، رقم الهاتف، الإيميل) لتجنب أي مشاكل قانونية عند السفر.</p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-orange-500" />
                <span className="text-xs font-black text-slate-500">آخر تحديث للسياسات: 15/06/2026</span>
              </div>
              <button 
                onClick={() => window.print()}
                className="bg-primary text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-primary/80 transition-all shadow-md"
              >
                طباعة السياسات 🖨️
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
