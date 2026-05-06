"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Timer, Tag, Flame, Compass, ArrowLeft, MessageCircle, Star, ShieldCheck, Gift, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const OffersPage = () => {
  const offers = [
    {
      id: "offer-1",
      title: "عرض العائلات: إسطنبول الساحرة",
      desc: "رحلة متكاملة لـ 5 أشخاص تشمل الطيران، الفنادق، وجولات سياحية يومية مع مرشد عربي.",
      price: "12,500",
      originalPrice: "14,800",
      tag: "الأكثر مبيعاً",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1000",
      timeLeft: "يومين متبقيين",
    },
    {
      id: "offer-2",
      title: "باقة شهر العسل: جزر المالديف",
      desc: "إقامة في فيلا فوق الماء مع إفطار وعشاء وجلسات سبا مجانية. تجربة العمر تنتظرك.",
      price: "18,900",
      originalPrice: "21,000",
      tag: "عرض حصري",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1000",
      timeLeft: "5 أيام متبقية",
    },
    {
      id: "offer-3",
      title: "رحلة العمرة: باقة الرفاهية",
      desc: "فنادق مطلة على الحرم مباشرة مع مواصلات VIP وخدمة مدار الساعة.",
      price: "4,200",
      originalPrice: "5,500",
      tag: "خصم 20%",
      image: "https://images.unsplash.com/photo-1565032223023-4100b738129c?auto=format&fit=crop&q=80&w=1000",
      timeLeft: "ساعات محدودة",
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
      <Navbar />
      
      {/* Dynamic Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-overlay scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/80 to-slate-900" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center mt-7 gap-2 bg-orange-600/20 text-orange-500 px-4 py-2 rounded-full border border-orange-500/20 mb-8 backdrop-blur-md"
          >
            <Flame size={16} />
            <span className="text-xs font-black uppercase tracking-widest">عروض محدودة الوقت</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight"
          >
            عروض لا <span className="text-orange-500">تتكرر</span> <br className="hidden md:block" /> بأسعار خيالية
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-xl max-w-2xl mx-auto font-medium leading-relaxed"
          >
            اكتشف مجموعة من العروض المختارة بعناية، وفرنا لك أفضل الخصومات على أشهر الوجهات العالمية.
          </motion.p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-20 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {offers.map((offer, idx) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 right-6 bg-orange-600 text-white px-5 py-2 rounded-full text-xs font-black shadow-lg">
                    {offer.tag}
                  </div>
                  <div className="absolute bottom-6 right-6 left-6 flex justify-between items-end">
                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl">
                       <div className="text-[10px] font-black text-slate-400 line-through">بدلاً من {offer.originalPrice} ₪</div>
                       <div className="text-2xl font-black text-slate-900">{offer.price} ₪</div>
                    </div>
                    <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-white flex items-center gap-2 border border-white/10">
                       <Timer size={14} className="text-orange-500" />
                       {offer.timeLeft}
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">
                    {offer.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-bold leading-relaxed">
                    {offer.desc}
                  </p>
                  
                  <div className="pt-6 border-t border-slate-100">
                    <button 
                      onClick={() => window.open(`https://wa.me/972522340930?text=أرغب في الاستفسار عن عرض: ${offer.title}`, "_blank")}
                      className="w-full bg-slate-900 hover:bg-orange-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 group-hover:shadow-xl group-hover:shadow-orange-600/20"
                    >
                      <MessageCircle size={22} />
                      احجز العرض الآن
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-slate-50 border-t border-slate-100 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: <ShieldCheck className="text-green-500" size={32} />, title: "حجز مضمون", desc: "سياسات إلغاء مرنة" },
              { icon: <Star className="text-yellow-500" size={32} />, title: "أعلى التقييمات", desc: "نعتني بأدق التفاصيل" },
              { icon: <Gift className="text-purple-500" size={32} />, title: "هدايا مجانية", desc: "أدلة سياحية مع كل حجز" },
              { icon: <CheckCircle2 className="text-blue-500" size={32} />, title: "تأكيد فوري", desc: "بدون أي انتظار" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-2">
                  {item.icon}
                </div>
                <h4 className="text-lg font-black text-slate-900">{item.title}</h4>
                <p className="text-sm font-bold text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      <Footer />
    </main>
  );
};

export default OffersPage;
