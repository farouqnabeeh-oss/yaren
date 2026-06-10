"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ESimoSection } from "@/components/home/ExtraServices";
import { Globe, Smartphone, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function ESimoPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col" dir="rtl">
      <Navbar />
      
      {/* Hero Header for ESIM */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/60 px-4 py-2 rounded-full mt-7 text-primary mb-8"
          >
            <Globe size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">التغطية العالمية الذكية</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-slate-900 mb-6"
          >
            شريحة واحدة.. <br /> <span className="text-primary">العالم كله</span> بين يديك
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto font-medium"
          >
            وداعاً لرسوم التجوال المرتفعة وعناء تبديل الشرائح التقليدية. مع يارين تورز و eSimO، ابقَ على اتصال دائم أينما رحلت.
          </motion.p>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="flex-grow">
        <ESimoSection />
      </div>

      {/* Feature Grid */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Zap className="text-primary" />, title: "تفعيل فوري", desc: "بمجرد مسح كود QR، تصبح متصلاً بالإنترنت." },
              { icon: <Smartphone className="text-blue-500" />, title: "بدون شريحة فيزيائية", desc: "لا داعي لفتح الجهاز أو فقدان شريحتك الأصلية." },
              { icon: <ShieldCheck className="text-green-500" />, title: "أمان كامل", desc: "تشفير عالي المستوى لحماية بياناتك وتصفحك." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-200/60 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-slate-800">{feature.title}</h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
