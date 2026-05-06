"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Download, Sparkles, Star, MapPin, Loader2, Image as ImageIcon,
  Smartphone, Clock, Layout, Palette, Type, Check, Zap, HelpCircle,
  Utensils, Bed, ArrowRight, Share2, Camera
} from "lucide-react";
import { getHotels } from "@/lib/actions/hotels";
import { motion, AnimatePresence } from "framer-motion";
// html2canvas is dynamically imported inside the function



const PosterGenerator = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [posterData, setPosterData] = useState({
    price: 1500,
    nights: 3,
    meal: "إفطار فقط",
    date: "خلال شهر 6",
    tag: "عرض حصري"
  });

  const posterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    const data = await getHotels();
    setHotels(data);
    if (data.length > 0) setSelectedHotel(data[0]);
  };

  const handleDownload = async () => {
    if (!posterRef.current) return;
    setIsGenerating(true);
    try {
      await document.fonts.ready;
      
      const images = posterRef.current.getElementsByTagName('img');
      const loadPromises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
          setTimeout(resolve, 3000); // 3-second fallback
        });
      });
      await Promise.all(loadPromises);

      // We dynamically import dom-to-image to avoid any SSR issues
      const domtoimage = (await import('dom-to-image')).default;

      const dataUrl = await domtoimage.toPng(posterRef.current, {
        width: 1080,
        height: 1920,
        bgcolor: "#FCFCFD",
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
          width: "1080px",
          height: "1920px",
          position: "relative"
        }
      });

      const link = document.createElement("a");
      link.download = `Yaren-Story-${selectedHotel.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export Error:", err);
      alert("حدث خطأ أثناء التصدير. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getSafeImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("data:")) return url;
    return `/api/proxy-image?url=${encodeURIComponent(url)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20 pt-6" dir="rtl">
      {/* Subtle Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        <div className="text-right space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <div className="p-2 bg-indigo-50 rounded-xl shadow-sm">
              <Palette size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">استوديو الإبداع</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">مصمم الستوري</h1>
          <p className="text-slate-500 text-sm font-medium">صمم عروضك بلمسة فنية هادئة وراقية.</p>
        </div>

        <button
          onClick={handleDownload}
          disabled={isGenerating || !selectedHotel}
          className="px-10 py-4 rounded-[1.5rem] bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition-all flex items-center gap-3 shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-30"
        >
          <span className="flex items-center justify-center w-4 h-4">
            {isGenerating ? (
              <Loader2 key="loader" className="animate-spin" size={16} />
            ) : (
              <Download key="download" size={16} />
            )}
          </span>
          {isGenerating ? "جاري تصدير التصميم..." : "تصدير للستوري"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Simplified Settings Panel */}
        <div className="lg:col-span-7 space-y-10">
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">اختر الوجهة أو الفندق</label>
                <select
                  className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4.5 px-6 text-slate-900 font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all appearance-none text-right cursor-pointer shadow-sm"
                  value={selectedHotel?.id || ""}
                  onChange={(e) => setSelectedHotel(hotels.find(h => h.id === e.target.value))}
                >
                  {hotels.map(h => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">السعر (₪)</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4.5 px-6 text-slate-900 font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" value={posterData.price} onChange={(e) => setPosterData({ ...posterData, price: parseInt(e.target.value) })} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">عدد الليالي</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4.5 px-6 text-slate-900 font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" value={posterData.nights} onChange={(e) => setPosterData({ ...posterData, nights: parseInt(e.target.value) })} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">الفترة</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4.5 px-6 text-slate-900 font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" value={posterData.date} onChange={(e) => setPosterData({ ...posterData, date: e.target.value })} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">الوجبات</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4.5 px-6 text-slate-900 font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" value={posterData.meal} onChange={(e) => setPosterData({ ...posterData, meal: e.target.value })} />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">عنوان فرعي (اختياري)</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4.5 px-6 text-slate-900 font-bold outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" value={posterData.tag} onChange={(e) => setPosterData({ ...posterData, tag: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="p-8 bg-indigo-600 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl shadow-indigo-500/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <Camera size={22} />
              </div>
              <div>
                <p className="text-sm font-bold">جاهز للمشاركة؟</p>
                <p className="text-[10px] opacity-80">التصميم مُحسن تماماً لقصص انستقرام وسناب شات.</p>
              </div>
            </div>
            <ArrowRight size={20} className="opacity-40 rotate-180" />
          </div>
        </div>

        {/* Minimalist Story Preview */}
        <div className="lg:col-span-5 flex flex-col items-center gap-10">
          <div className="relative w-full max-w-[380px] aspect-[9/16] bg-white rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] border-[8px] border-slate-50">
            {selectedHotel ? (
              <div className="w-full h-full relative" style={{ perspective: "1000px" }}>
                <div
                  ref={posterRef}
                  className="absolute inset-0 w-[1080px] h-[1920px] bg-white text-slate-900 overflow-hidden flex flex-col origin-top-right"
                  style={{ transform: "scale(0.344)", right: 0 }}
                  dir="rtl"
                >
                  {/* PURE ELEGANT STORY TEMPLATE */}
                  <div className="relative w-full h-full bg-[#FCFCFD] flex flex-col p-16">
                    {/* The Image Frame - Floating Art Style */}ٍٍ
                    <div className="w-full h-[62%] relative rounded-[4rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] mb-12 border-[12px] border-white">
                      <img src={getSafeImageUrl(selectedHotel.image)} className="w-full h-full object-cover" crossOrigin="anonymous" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

                      <div className="absolute bottom-12 right-12 left-12 flex items-end justify-between">
                        <div className="space-y-4">
                          {posterData.tag && (
                            <span className="bg-white/95 backdrop-blur-md px-8 py-3 rounded-full text-slate-900 text-2xl font-black shadow-lg uppercase tracking-widest inline-block">
                              {posterData.tag}
                            </span>
                          )}
                          <div className="flex items-center gap-2">
                            {Array.from({ length: selectedHotel.stars }).map((_, i) => (
                              <Star key={i} size={28} className="fill-amber-400 text-amber-400 drop-shadow-md" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Container - Calm & Spaced */}
                    <div className="flex-grow w-full flex flex-col justify-between px-8">

                      {/* Header & Location */}
                      <div className="space-y-6">
                        <h1 className="text-[7.5rem] font-black tracking-tight text-slate-900 leading-[1.1]">
                          {selectedHotel.name}
                        </h1>
                        <p className="text-4xl font-bold text-slate-400 flex items-center gap-4">
                          <MapPin size={36} className="text-slate-300" /> {selectedHotel.region}
                        </p>
                      </div>

                      {/* Elegant Inline Details */}
                      <div className="py-8">
                        <div className="flex items-center flex-wrap gap-6 text-[2.5rem] font-bold text-slate-500">
                          <span>{posterData.nights} ليالي إقامة</span>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                          <span>{posterData.meal}</span>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                          <span>{posterData.date}</span>
                        </div>
                      </div>

                      {/* Footer: Price & Branding */}
                      <div className="flex items-end justify-between pt-10 border-t-[3px] border-slate-100">
                        <div className="text-right">
                          <p className="text-2xl font-black text-slate-400 uppercase tracking-[0.2em] mb-2">ابتداءً من</p>
                          <div className="text-[9rem] font-black text-slate-900 leading-none flex items-start">
                            {posterData.price}
                            <span className="text-4xl mt-4 ml-4 font-black text-indigo-600">₪</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 pb-2">
                          <div className="w-24 h-24 bg-white rounded-3xl shadow-sm border border-slate-50 flex items-center justify-center p-4">
                            <img src="/logo.png" className="w-full h-full object-contain" />
                          </div>
                          <span className="text-2xl font-black tracking-[0.25em] text-slate-400">YAREEN</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4">
                <ImageIcon size={48} className="opacity-20" />
                <p className="text-sm font-bold">جاري تجهيز المعاينة...</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50 px-6 py-3 rounded-full">
            <Smartphone size={14} /> Story Mode 1080×1920
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterGenerator;
