"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TripCard from "@/components/ui/TripCard";
import { Filter, Search, Calendar, MapPin, SlidersHorizontal, X, LayoutGrid, List, Compass, Star, Award, Compass as CompassIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Trip {
  id: string;
  title: string;
  image: string;
  price: number;
  duration: string;
  features: string;
  type: string;
  date: string;
  rating: number;
  reviewCount: number;
  destination?: string;
}

const TripsClient = ({ initialTrips }: { initialTrips: any[] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDest, setSelectedDest] = useState("الكل");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const extractDestination = (title?: string) => {
    if (!title) return "أخرى";
    if (title.includes("إسطنبول") || title.includes("تركيا")) return "تركيا";
    if (title.includes("دبي") || title.includes("الإمارات")) return "الإمارات";
    if (title.includes("مصر") || title.includes("شرم")) return "مصر";
    if (title.includes("الأردن") || title.includes("البتراء")) return "الأردن";
    if (title.includes("عمرة") || title.includes("السعودية")) return "السعودية";
    return "أخرى";
  };

  const destinations = useMemo(() => {
    const destMap: Record<string, boolean> = {};
    initialTrips.forEach(t => {
      const dest = extractDestination(t.title);
      destMap[dest] = true;
    });
    return ["الكل", ...Object.keys(destMap)];
  }, [initialTrips]);

  const filteredTrips = useMemo(() => {
    return initialTrips.filter(trip => {
      const tripTitle = trip.title || "";
      const matchesSearch = tripTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDest = selectedDest === "الكل" || extractDestination(tripTitle) === selectedDest;
      const matchesPrice = trip.price <= maxPrice;
      return matchesSearch && matchesDest && matchesPrice;
    });
  }, [searchQuery, selectedDest, maxPrice, initialTrips]);

  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 font-sans relative overflow-hidden" dir="rtl">
      <Navbar />

      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Cinematic Hero Header */}
      <section className="relative pt-44 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay scale-105 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-8">
          <span className="inline-flex items-center gap-2 bg-white/10 text-primary border border-white/10 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            🌍 مغامرات استثنائية حول العالم
          </span>
          <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
            رحلات منظمة{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-orange-400">
              تفوق الخيال
            </span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            نحن لا نبيع مجرد تذاكر؛ نحن نصمم رحلات متكاملة تُثري روحك وتصنع لك ذكريات لا تُنسى بصحبة مرشدين خبراء.
          </p>

          {/* Quick Stats Grid */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {[
              { label: "مرشدين محترفين", value: "100%" },
              { label: "وجهات عالمية ودولية", value: "10+" },
              { label: "رضا عملائنا", value: "4.9★" },
              { label: "تأكيد فوري للحجز", value: "أسرع دعم" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2.5 rounded-2xl">
                <span className="text-primary font-black text-base">{s.value}</span>
                <span className="text-slate-300 text-xs font-bold">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Content Section */}
      <section className="py-12 bg-slate-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Control Bar */}
          <div className="bg-white rounded-[2.5rem] p-4 mb-12 border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="relative w-full lg:w-1/3">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="ابحث عن رحلة حلمك..."
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pr-12 pl-6 focus:ring-2 ring-primary outline-none font-bold text-slate-900 placeholder-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setViewType("grid")}
                  className={`p-3 rounded-xl transition-all ${viewType === "grid" ? "bg-primary text-slate-900 shadow-sm font-bold" : "text-slate-500 hover:text-slate-900"}`}
                >
                  <LayoutGrid size={20} />
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className={`p-3 rounded-xl transition-all ${viewType === "list" ? "bg-primary text-slate-900 shadow-sm font-bold" : "text-slate-500 hover:text-slate-900"}`}
                >
                  <List size={20} />
                </button>
              </div>

              <div className="h-10 w-px bg-slate-200 hidden md:block" />

              <p className="text-sm font-black text-slate-500">
                تم العثور على <span className="text-primary">{filteredTrips.length}</span> رحلة متوفرة
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-80 shrink-0 space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl lg:sticky lg:top-28">
                <h3 className="font-black text-slate-800 mb-8 flex items-center gap-3 text-xl">
                  <SlidersHorizontal size={20} className="text-primary" />
                  تخصيص البحث
                </h3>

                <div className="space-y-10">
                  {/* Destination Filter */}
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-5 border-b border-slate-100 pb-2">الوجهة المستهدفة</span>
                    <div className="space-y-2">
                      {destinations.map(dest => (
                        <button
                          key={dest}
                          onClick={() => setSelectedDest(dest)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all font-bold text-sm ${selectedDest === dest
                            ? "bg-primary text-slate-900 border border-primary/20"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                        >
                          <span>{dest}</span>
                          {selectedDest === dest && (
                            <X 
                              size={14} 
                              className="cursor-pointer text-slate-900" 
                              onClick={(e) => { e.stopPropagation(); setSelectedDest("الكل"); }} 
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <div className="flex justify-between items-center mb-5 border-b border-slate-100 pb-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الميزانية المقدرة</span>
                      <span className="text-xs font-black text-primary">{maxPrice} ₪</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between mt-3 text-[10px] font-black text-slate-400">
                      <span>0 ₪</span>
                      <span>5000+ ₪</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { setSelectedDest("الكل"); setMaxPrice(5000); setSearchQuery(""); }}
                  className="w-full mt-10 text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors"
                >
                  إعادة تعيين الفلاتر
                </button>
              </div>

              {/* High End Trust Badge */}
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 text-right relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <h4 className="text-lg font-black mb-4 text-slate-800 flex items-center gap-2">
                  <Award className="text-primary" size={20} />
                  ضمانة يارين الفاخرة
                </h4>
                <ul className="space-y-4">
                  {[
                    "تأكيدات مباشرة وموثقة عبر واتساب",
                    "أفضل الفنادق ذات التقييمات العالية",
                    "أدلة محليين ذوي خبرة طويلة طوال الرحلة",
                    "خدمة عملاء راقية على مدار الساعة"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-bold text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Grid Content */}
            <div className="flex-grow">
              <AnimatePresence mode="popLayout">
                {filteredTrips.length > 0 ? (
                  <motion.div
                    layout
                    className={`grid gap-8 ${viewType === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-2" : "grid-cols-1"}`}
                  >
                    {filteredTrips.map((trip) => {
                      let parsedFeatures: string[] = [];
                      try {
                        parsedFeatures = JSON.parse(trip.features || "[]");
                        if (!Array.isArray(parsedFeatures)) parsedFeatures = [];
                      } catch (e) {
                        parsedFeatures = trip.features ? trip.features.split(',').map((f: string) => f.trim()).filter((f: string) => f) : [];
                      }

                      return (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          key={trip.id}
                        >
                          <TripCard
                            {...trip}
                            features={parsedFeatures}
                            availableDays={trip.date ? [trip.date] : []}
                            cities={[]}
                            guide={trip.guideName ? { name: trip.guideName, image: trip.guideImage || "", exp: trip.guideExp || "" } : undefined}
                          />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-sm"
                  >
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                      <Search size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">عذراً، لم نعثر على أي نتائج</h3>
                    <p className="text-slate-400 font-bold">حاول تغيير فلاتر البحث أو الكلمات المفتاحية.</p>
                    <button
                      onClick={() => { setSelectedDest("الكل"); setMaxPrice(5000); setSearchQuery(""); }}
                      className="mt-8 bg-primary text-slate-900 px-8 py-3 rounded-xl font-black text-sm hover:bg-primary/80 transition-colors"
                    >
                      عرض كافة الرحلات
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TripsClient;
