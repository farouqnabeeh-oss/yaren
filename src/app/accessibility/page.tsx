"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Accessibility, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
      <Navbar />

      <section className="pt-32 pb-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Accessibility size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">تصريح <span className="text-blue-500">الإتاحة</span></h1>
          <p className="text-slate-400 text-lg font-medium">نلتزم في يارين تورز بتوفير تجربة مستخدم متساوية ومتاحة للجميع، بما يتوافق مع القانون (תקן ישראלי 5568).</p>
        </div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-slate-100 space-y-12">
          
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
               <div className="w-2 h-8 bg-blue-600 rounded-full" />
               جهود الإتاحة في الموقع
            </h2>
            <p className="text-slate-600 leading-relaxed font-bold">
              لقد استثمرنا جهوداً وموارد كبيرة لضمان سهولة استخدام الموقع وتوفير الإتاحة للأشخاص ذوي الإعاقة. نعتقد أن لكل شخص الحق في العيش بكرامة والمساواة والراحة.
              تم تكييف هذا الموقع وفقاً للوائح تكافؤ الحقوق للأشخاص ذوي الإعاقة (تعديلات إمكانية الوصول إلى الخدمة) لعام 2013.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
               "شريط أدوات إتاحة مخصص (تكبير خط، تغيير الألوان)",
               "توافق كامل مع التنقل بلوحة المفاتيح (Keyboard Navigation)",
               "نص بديل (Alt Text) لجميع الصور",
               "إمكانية إيقاف الحركات والرسوم المتحركة",
               "دعم أجهزة قراءة الشاشة (Screen Readers)"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <CheckCircle2 className="text-blue-600 shrink-0" size={20} />
                <span className="font-bold text-sm text-slate-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
               <div className="w-2 h-8 bg-blue-600 rounded-full" />
               طرق التواصل لتقديم الملاحظات
            </h2>
            <p className="text-slate-600 leading-relaxed font-bold mb-4">
              إذا واجهت أي مشكلة تتعلق بإمكانية الوصول أثناء تصفحك للموقع، فنحن هنا لمساعدتك. يُرجى التواصل مع مسؤول الإتاحة لدينا:
            </p>
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
               <ul className="space-y-3 font-bold text-slate-800">
                 <li><span className="text-blue-600">اسم المسؤول:</span> إدارة يارين تورز</li>
                 <li><span className="text-blue-600">رقم الهاتف:</span> <span dir="ltr">+972 52-234-0930</span></li>
                 <li><span className="text-blue-600">البريد الإلكتروني:</span> Yreen.ab@gmail.com</li>
               </ul>
            </div>
          </div>

          <div className="p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200 flex items-center justify-between">
             <p className="text-sm text-slate-400 font-bold text-center w-full">تاريخ آخر تحديث: {new Date().toLocaleDateString("ar-EG", { year: 'numeric', month: 'long' })}</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
