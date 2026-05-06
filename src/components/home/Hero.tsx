"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Calendar, MessageCircle, ChevronDown } from "lucide-react";

const Hero = ({ videoUrl, phone, title, subtitle }: { videoUrl?: string; phone?: string; title?: string; subtitle?: string }) => {
  const [showVideo, setShowVideo] = useState(false);
  
  // Extract YouTube ID from URL or use default
  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "QOavkjHc1HU";
  };

  const YOUTUBE_ID = getYoutubeId(videoUrl || "");
  const WA_NUMBER = phone?.replace(/\D/g, "") || "972522340930";

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        aria-label="الصفحة الرئيسية"
      >
        {/* Static cinematic background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-950 z-10" />
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000"
            alt="خلفية يارين تورز"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-primary/20 text-primary/90 mt-5 border border-primary/30 px-5 py-2 rounded-full text-sm font-bold mb-8 backdrop-blur-sm">
              ✈️ المنصة الأكبر للرحلات المنظمة في البلاد
            </span>

            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-tight">
              {title ? (
                title.includes("خارطة العالم") ? (
                  <>
                    {title.split("خارطة العالم")[0]}
                    <span className="text-primary">خارطة العالم</span>
                    {title.split("خارطة العالم")[1]}
                  </>
                ) : title
              ) : (
                <>
                  نرسم لكم <span className="text-primary">خارطة العالم</span>،
                  <br className="hidden md:block" />
                  ومعنا تكون كل رحلة حكاية نجاح.
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              {subtitle || "استكشف أفضل الوجهات السياحية بإرشاد عربي كامل وأعلى معايير الراحة. من الطيران والفنادق إلى المسارات اليومية — كل شيء جاهز لك."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("trips")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto bg-orange-600 hover:bg-primary/90 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/30 transition-all"
              >
                <Calendar size={22} />
                استكشف الرحلات القادمة
              </motion.button>

              {/* Play YouTube Video Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideo(true)}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all group"
                aria-label="مشاهدة فيديو يارين تورز"
              >
                <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                  <Play size={18} fill="white" className="text-white mr-[-2px]" />
                </span>
                شاهد فيديونا
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { num: "50+", label: "وجهة عالمية" },
              { num: "2000+", label: "مسافر سعيد" },
              { num: "4.9★", label: "تقييم العملاء" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-4xl font-black text-primary/90">{stat.num}</div>
                <div className="text-xs text-slate-400 font-bold mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/40">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* ─── Featured YouTube Video Section ─── */}
      <section className="py-24 bg-slate-950 overflow-hidden relative" id="video-section">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-primary text-xs font-black uppercase tracking-widest mb-4 border border-primary/30 px-4 py-1.5 rounded-full bg-primary/10">
              رحلاتنا بعيونكم
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              اكتشف <span className="text-primary">يارين تورز</span> من الداخل
            </h2>
            <p className="text-slate-400 font-medium max-w-xl mx-auto">
              شاهد كيف نصنع تجارب سفر لا تُنسى مع مرشدينا العرب في أجمل وجهات العالم.
            </p>
          </motion.div>

          {/* YouTube Embed — Cinematic Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(234,88,12,0.3)] border border-white/10 group"
            style={{ aspectRatio: "16/9" }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1&color=white`}
              title="يارين تورز — رحلات لا تُنسى"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              loading="lazy"
            />
          </motion.div>

          {/* CTA under video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10"
          >
            <a
              href={`https://wa.me/${WA_NUMBER}?text=أريد الاستفسار عن رحلات يارين تورز`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-green-600/20 transition-all transform hover:scale-105"
            >
              <MessageCircle size={22} />
              احجز رحلتك القادمة الآن
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Fullscreen YouTube Modal ─── */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
              style={{ aspectRatio: "16/9" }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                title="يارين تورز"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-3xl"
              />
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-14 left-1/2 -translate-x-1/2 text-white/60 hover:text-white flex items-center gap-2 font-bold transition-colors"
                aria-label="إغلاق الفيديو"
              >
                <X size={20} />
                إغلاق
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
