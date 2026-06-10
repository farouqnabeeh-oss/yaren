"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, Star, MapPin, CheckCircle2, 
  XCircle, User, MessageCircle, Play, Info, X, Shield, BookOpen
} from "lucide-react";

interface Hotspot {
  x: number;
  y: number;
  title: string;
  image: string;
  desc: string;
}

const TripDetailsClient = ({ trip }: { trip: any }) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [formData, setFormData] = useState({ name: "", guests: "1", city: "الناصرة" });

  const safeParseJSON = (str: string | null | undefined, fallback: any = []) => {
    if (!str) return fallback;
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) || typeof parsed === "object" ? parsed : fallback;
    } catch (e) {
      if (typeof str === "string" && str.includes(",")) {
        return str.split(",").map((item: string) => item.trim()).filter(Boolean);
      }
      return [str];
    }
  };

  const features = safeParseJSON(trip.features);
  const hotspots: Hotspot[] = safeParseJSON(trip.hotspots);
  // For demo if empty:
  const demoHotspots: Hotspot[] = hotspots.length > 0 ? hotspots : [
    { x: 30, y: 40, title: "المعلم الأول", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=500", desc: "نقطة استكشاف مذهلة" },
    { x: 60, y: 60, title: "المعلم الثاني", image: "https://images.unsplash.com/photo-1512453979798-5ea444f888e3?w=500", desc: "أجمل الإطلالات في الرحلة" }
  ];

  const includes = safeParseJSON(trip.includes, ["تذاكر الطيران ذهاب وإياب", "الإقامة في فنادق 5 نجوم", "إفطار وعشاء يومي", "التنقلات في حافلة سياحية مكيفة"]);
  const excludes = safeParseJSON(trip.excludes, ["المصروف الشخصي", "الرحلات الاختيارية", "تأمين السفر"]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `مرحباً يارين تورز، أرغب في تأكيد حجز رحلة منظمة:
الرحلة: ${trip.title}
تاريخ الانطلاق: ${trip.date}
عدد الأشخاص: ${formData.guests}
المدينة: ${formData.city}
الاسم: ${formData.name}
يرجى تأكيد الحجز معي.`;
    
    window.open(`https://wa.me/972522340930?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10" />
          <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative z-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-block bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-black mb-4 uppercase tracking-widest">
                رحلة منظمة
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                {trip.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-300 font-bold">
                <span className="flex items-center gap-2"><Calendar size={20} className="text-orange-500" /> {trip.date}</span>
                <span className="flex items-center gap-2"><Clock size={20} className="text-orange-500" /> {trip.duration}</span>
                <span className="flex items-center gap-2 text-yellow-500"><Star size={20} className="fill-current" /> {trip.rating} ({trip.reviewCount} تقييم)</span>
              </div>
            </div>

            {/* Floating Price Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center md:text-right shrink-0">
              <p className="text-slate-300 text-sm font-bold mb-2">السعر للشخص الواحد</p>
              <div className="text-4xl font-black text-orange-500">{trip.price} ₪</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Details) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Description & Features */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-orange-600 rounded-full" />
                عن الرحلة
              </h2>
              <p className="text-slate-600 leading-relaxed font-bold text-lg mb-8">
                {trip.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                    <span className="font-bold text-sm text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Discovery Map */}
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-orange-600 rounded-full" />
                خريطة الكنز التفاعلية
              </h2>
              <p className="text-slate-500 font-bold mb-6">اضغط على النقاط النابضة لاستكشاف أهم معالم الرحلة قبل السفر.</p>
              
              <div className="relative w-full aspect-video bg-slate-200 rounded-[3rem] overflow-hidden shadow-xl border-4 border-white">
                <img 
                  src={trip.mapImage || "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000"} 
                  alt="خريطة الرحلة" 
                  className="w-full h-full object-cover opacity-80"
                />
                
                {/* Hotspots */}
                {(trip.mapImage ? hotspots : demoHotspots).map((spot, idx) => (
                  <div 
                    key={idx}
                    className="absolute z-10 cursor-pointer group"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: 'translate(-50%, -50%)' }}
                    onClick={() => setActiveHotspot(spot)}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-8 h-8 bg-orange-500 rounded-full animate-ping opacity-75"></div>
                      <div className="relative w-6 h-6 bg-orange-600 rounded-full border-2 border-white shadow-lg z-20 group-hover:scale-125 transition-transform"></div>
                    </div>
                  </div>
                ))}

                {/* Hotspot Pop-up Overlay */}
                <AnimatePresence>
                  {activeHotspot && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-30 flex items-center justify-center p-6"
                      onClick={() => setActiveHotspot(null)}
                    >
                      <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-[2.5rem] overflow-hidden max-w-sm w-full shadow-2xl"
                      >
                        <div className="relative h-48">
                          <img src={activeHotspot.image} className="w-full h-full object-cover" alt={activeHotspot.title} />
                          <button onClick={() => setActiveHotspot(null)} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-md hover:bg-black transition-colors">
                            <X size={16} />
                          </button>
                        </div>
                        <div className="p-6">
                          <h4 className="text-xl font-black text-slate-900 mb-2">{activeHotspot.title}</h4>
                          <p className="text-sm font-bold text-slate-500">{activeHotspot.desc}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Video / Gallery Section */}
            {trip.youtubeUrl && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-orange-600 rounded-full" />
                  شاهد الرحلة
                </h2>
                <div 
                  className="relative aspect-video rounded-[3rem] overflow-hidden shadow-xl border-4 border-white cursor-pointer group"
                  onClick={() => setShowVideo(true)}
                >
                  <img src={trip.image} className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700" alt="Video cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-orange-600/90 rounded-full flex items-center justify-center backdrop-blur-md shadow-[0_0_50px_rgba(234,88,12,0.5)] group-hover:bg-orange-500 transition-colors">
                      <Play size={32} fill="white" className="text-white ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Includes / Excludes */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-8 rounded-[2.5rem] border border-green-100">
                <h3 className="font-black text-xl text-slate-900 mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-green-600" /> يشمل السعر
                </h3>
                <ul className="space-y-4">
                  {includes.map((inc: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" /> {inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100">
                <h3 className="font-black text-xl text-slate-900 mb-6 flex items-center gap-2">
                  <XCircle className="text-red-500" /> لا يشمل السعر
                </h3>
                <ul className="space-y-4">
                  {excludes.map((exc: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 shrink-0" /> {exc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tour Guide */}
            {trip.showGuide !== false && (
              <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-8 border border-slate-800">
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="w-32 h-32 shrink-0 rounded-full border-4 border-orange-500/30 overflow-hidden bg-slate-800 flex items-center justify-center relative z-10">
                  {trip.guideImage ? (
                    <img src={trip.guideImage} alt={trip.guideName} className="w-full h-full object-cover" />
                  ) : (
                    <Shield size={40} className="text-orange-500 opacity-50" />
                  )}
                </div>
                <div className="text-center md:text-right relative z-10">
                  <span className="text-orange-500 font-black text-sm uppercase tracking-widest block mb-2">إرشاد احترافي</span>
                  <h3 className="text-2xl font-black mb-3">
                    {trip.guideName || "نخبة من أمهر المرشدين العرب"}
                  </h3>
                  <p className="text-slate-400 font-medium">
                    {trip.guideExp || "نحرص في يارين تورز على انتقاء أفضل المرشدين السياحيين لضمان تجربة غنية بالمعلومات وأجواء عائلية ممتعة طوال الرحلة."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Sticky Booking Form) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8">
                <h3 className="text-xl font-black text-slate-900 mb-6">طلب حجز مبدئي</h3>
                <form onSubmit={handleBooking} className="space-y-5">
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2">الاسم الكامل</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-orange-500 font-bold text-sm" 
                      placeholder="أدخل اسمك.."
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2">عدد الأشخاص</label>
                    <select 
                      value={formData.guests}
                      onChange={e => setFormData({...formData, guests: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-orange-500 font-bold text-sm cursor-pointer"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} أشخاص</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2">المدينة / البلدة</label>
                    <input 
                      type="text" 
                      required
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-orange-500 font-bold text-sm" 
                      placeholder="مثال: الناصرة، كفركنا.."
                    />
                  </div>
                  
                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-bold text-slate-500">الإجمالي المتوقع</span>
                      <span className="text-2xl font-black text-slate-900">{trip.price * parseInt(formData.guests)} ₪</span>
                    </div>
                    
                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/30">
                      <MessageCircle size={20} />
                      احجز الآن عبر واتساب
                    </button>
                  </div>
                </form>
              </div>

              {/* Secret Guide Promo */}
              <div className="bg-orange-50 rounded-[2.5rem] p-6 border border-orange-100 flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                  <BookOpen className="text-orange-500" size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm mb-1">احجز الآن واحصل مجاناً على</h4>
                  <p className="text-xs font-bold text-slate-600 leading-relaxed">
                    "دليل يارين الشامل للرحلة" - دليلك السري لتجربة تفوق التوقعات لتعرف ماذا تأكل، وكيف تكون جاهزاً لرحلة ولا غلطة!
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {showVideo && trip.youtubeUrl && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setShowVideo(false)}
          >
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <iframe 
                src={`${trip.youtubeUrl}?autoplay=1&rel=0`} 
                title={trip.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
              />
              <button onClick={() => setShowVideo(false)} className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black transition-colors">
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
};

export default TripDetailsClient;
