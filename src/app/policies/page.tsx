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
  Clock,
  Lock,
  UserCheck
} from "lucide-react";

export default function PoliciesPage() {
  const sections = [
    {
      id: "privacy",
      title: "سياسة الخصوصية",
      icon: <ShieldCheck className="text-blue-500" size={32} />,
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
    <main className="bg-slate-50 min-h-screen" dir="rtl">
      <Navbar />

      {/* Header Section */}
      <section className="bg-slate-900 pt-40 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="inline-block bg-white/5 border border-white/10 text-orange-500 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              مركز الثقة والأمان
            </span>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
              السياسات <span className="text-orange-500">والشروط</span> القانونية
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
              في يارين تورز، نضع الوضوح والشفافية في مقدمة أولوياتنا لضمان رحلة آمنة ومريحة لكم.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policies Grid */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sections.map((sec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  {sec.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-6">{sec.title}</h3>
                <ul className="space-y-5 flex-grow">
                  {sec.content.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 leading-relaxed font-medium">
                      <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Info / FAQ Style */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-[3.5rem] p-12 md:p-20 shadow-xl border border-slate-100 space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-black text-slate-900">توضيحات إضافية هامة 💡</h2>
              <p className="text-slate-500 font-bold">كل ما تحتاج معرفته عن حقوقك والتزاماتنا تجاهك.</p>
            </div>

            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Lock size={24} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-slate-900">حماية المدفوعات</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">نحن نستخدم بوابات دفع معتمدة عالمياً (PCI-DSS) لضمان أن بيانات بطاقتك الائتمانية لا تخزن أبداً في خوادمنا.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-slate-900">تعديل مواعيد الرحلات</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">في حال حدوث تغيير مفاجئ في مواعيد الطيران أو الظروف الجوية، نلتزم بتوفير بدائل مناسبة أو إبلاغكم فوراً لاتخاذ القرار الأنسب.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                  <UserCheck size={24} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-slate-900">التزامات المسافر</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">يتعهد المسافر بتقديم معلومات دقيقة وصحيحة عند الحجز (الاسم كما في الجواز، رقم الهاتف، الإيميل) لتجنب أي مشاكل قانونية عند السفر.</p>
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-orange-500" />
                <span className="text-xs font-black text-slate-400">آخر تحديث للسياسات: 15/06/2026</span>
              </div>
              <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-black transition-all">تحميل السياسات بصيغة PDF</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Client Motion Support
import { motion } from "framer-motion";
