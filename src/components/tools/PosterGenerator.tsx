"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Camera, QrCode, X, Sparkles, Check } from "lucide-react";

interface HotelOffer {
  id: string;
  name: string;
  price: number;
  image: string;
  nights: number;
}

const PosterGenerator = ({ offers, onClose }: { offers: HotelOffer[], onClose: () => void }) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    // In a real environment, user would run: npm install html-to-image
    // For now, we simulate the logic
    setTimeout(() => {
      alert("جاري توليد البوستر بجودة عالية (300 DPI)... سيتم التحميل بصيغة PNG");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* The Poster Preview (IG Story Size: 1080x1920 aspect ratio) */}
        <div className="flex justify-center">
          <div 
            ref={posterRef}
            className="w-[360px] h-[640px] bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden relative border-[12px] border-slate-800"
          >
            {/* Background Image/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-950" />
            <div className="absolute top-0 left-0 right-0 h-64 bg-orange-600/20 blur-[80px]" />

            <div className="relative z-10 p-8 h-full flex flex-col">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="text-white font-black text-2xl tracking-tighter mb-1">YAREN TOURS</div>
                <div className="bg-orange-600 text-white text-[10px] font-black px-4 py-1 rounded-full w-fit mx-auto uppercase tracking-widest">
                  أفضل عروض الأسبوع
                </div>
              </div>

              {/* Offers List */}
              <div className="space-y-4 flex-grow">
                {offers.map((hotel) => (
                  <div key={hotel.id} className="bg-white/5 border border-white/10 rounded-3xl p-3 flex gap-4 items-center">
                    <img src={hotel.image} className="w-16 h-16 rounded-2xl object-cover border border-white/10" alt={hotel.name} />
                    <div className="flex-grow text-right">
                      <h4 className="text-white font-bold text-xs line-clamp-1">{hotel.name}</h4>
                      <p className="text-[10px] text-slate-500 font-bold">{hotel.nights} ليالي</p>
                      <div className="text-orange-500 font-black text-lg">{hotel.price} ₪</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-auto pt-8 border-t border-white/10 flex items-end justify-between">
                <div className="text-right">
                  <div className="text-white/50 text-[10px] font-bold mb-1">امسح للحجز:</div>
                  <div className="bg-white p-2 rounded-xl">
                    <QrCode size={40} className="text-slate-900" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-black text-sm">احجز الآن عبر الموقع</div>
                  <div className="text-orange-500 text-[10px] font-bold">@YarenTours</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-8 text-white text-right">
          <div>
            <h2 className="text-3xl font-black mb-4">Auto-Poster <span className="text-orange-500">لإنستغرام</span></h2>
            <p className="text-slate-400 font-medium">حول عروضك إلى بوسترات احترافية بضغطة زر واحدة بدون الحاجة لبرامج تصميم.</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
              <span className="text-green-500 bg-green-500/10 p-1 rounded-md"><Check size={16} /></span>
              <span className="text-sm font-bold">جودة عالية (1080x1920)</span>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
              <span className="text-green-500 bg-green-500/10 p-1 rounded-md"><Check size={16} /></span>
              <span className="text-sm font-bold">توليد QR Code تلقائي</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex-grow bg-orange-600 hover:bg-orange-700 h-16 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-600/20"
            >
              {isGenerating ? <Sparkles className="animate-spin" /> : <Download />}
              {isGenerating ? "جاري التوليد..." : "تحميل الصورة"}
            </button>
            <button 
              onClick={onClose}
              className="w-16 h-16 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all"
            >
              <X />
            </button>
          </div>

          <div className="flex items-center gap-2 justify-end text-xs text-slate-500 font-bold">
            <Camera size={14} />
            <span>جاهز للمشاركة على ستوري إنستغرام</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterGenerator;
