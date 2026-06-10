"use client";

import React, { useState } from "react";
import { Check, Shield, Users, Globe, Headset, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AboutUs = ({ title, text }: { title?: string, text?: string }) => {
  const stats = [
    { label: "الأكبر في البلاد", icon: Globe, description: "المنصة الوحيدة التي تتيح لك الوصول إلى أكبر عدد من الرحلات المنظمة؛ كل الخيارات الموجودة في السوق تجدها في مكان واحد." },
    { label: "مرشدون عرب", icon: Users, description: "نركز بشكل أساسي على الرحلات التي تضم نخبة من المرشدين العرب، لنضمن لك رحلة غنية بالمعلومات مليئة بالأجواء التي تشبهنا." },
    { label: "رحلات منظمة بالكامل", icon: Shield, description: "من الطيران والفنادق إلى المسارات اليومية، نحن نعرض لك الرحلات الجاهزة والمتكاملة من الألف إلى الياء." },
    { label: "شفافية وسهولة", icon: Check, description: "يارين تورز بتعطيك الخلاصة، بوضوح تام في الأسعار والبرامج، لتتخذ قرارك وأنت مطمئن." },
    { label: "دعم 24/7", icon: Headset, description: "فريقنا متوفر لخدمتكم والإجابة على استفساراتكم من لحظة الحجز وحتى العودة للبلاد." },
  ];

  return (
    <section className="py-24 bg-white text-slate-900 overflow-hidden relative border-t border-slate-100" id="about-summary">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-right">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">من نحن</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
              {title || "يارين تورز.. نرسم لكم خارطة العالم، ومعنا تكون كل رحلة حكاية نجاح."}
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              {text || "بوابتكم الدائمة لاكتشاف العالم بأعلى معايير الراحة والتنظيم. نحن لسنا مجرد مكتب سياحي، بل نحن رفيق دربكم في كل خطوة."}
            </p>
            
            <div className="space-y-6">
              {stats.map((item, idx) => (
                <div key={idx} className="flex gap-4 justify-end">
                  <div className="text-right">
                    <h4 className="font-bold text-lg text-slate-800 mb-1">{item.label}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-primary shadow-sm">
                    <item.icon size={24} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-slate-100 shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=1000" 
                alt="Travel Group" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-orange-600 p-8 rounded-[2.5rem] z-20 shadow-xl hidden md:block text-white">
              <div className="text-center">
                <span className="text-4xl font-black block">10+</span>
                <span className="text-xs font-bold uppercase tracking-widest">سنوات من الخبرة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = ({ initialFaqs = [] }: { initialFaqs?: any[] }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = initialFaqs.length > 0 ? initialFaqs : [
    {
      question: "هل يارين تورز هو مكتب سياحة مرخص؟",
      answer: "نعم، يارين تورز هو مكتب سياحي رسمي وقانوني، مركزه الرئيسي في كفركنا."
    },
    {
      question: "ما الذي يميز الرحلات المنظمة عبر موقعكم؟",
      answer: "تتميز رحلاتنا بالشمولية والإرشاد العربي الكامل."
    }
  ];

  return (
    <section className="py-24 bg-slate-50 text-slate-900 relative border-t border-slate-100" id="faq">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-right relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            ❓ الأسئلة المتكررة
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">الأسئلة الشائعة</h2>
          <p className="text-slate-600">كل ما تود معرفته عن يارين تورز وخدماتنا.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm bg-white">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 text-right flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-800">{faq.question}</span>
                <ChevronDown className={`text-primary transition-transform ${openIdx === idx ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-slate-50/50 border-t border-slate-100"
                  >
                    <div className="p-6 text-slate-600 leading-relaxed text-sm">
                       {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { AboutUs, FAQ };
