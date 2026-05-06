"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, ArrowRight, Calendar as CalendarIcon, 
  Plane, Repeat, CheckCircle2, Zap, MessageCircle, 
  Clock, ShieldCheck, CreditCard
} from "lucide-react";
import { 
  format, addMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay, 
  addDays, isBefore, startOfToday, getDay
} from "date-fns";
import { ar } from "date-fns/locale";

const FlightBooking = ({ initialFlights = [] }: { initialFlights?: any[] }) => {
  const [step, setStep] = useState(1);
  const [tripType, setTripType] = useState<"one-way" | "round-trip" | null>(null);
  const [direction, setDirection] = useState<"AMM-IST" | "IST-AMM" | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [cabin, setCabin] = useState<"economy" | "business">("economy");
  const [pax, setPax] = useState(1);
  const [price, setPrice] = useState(0);

  // Default fallback if DB is empty
  const defaultFlight = {
    from: "عمان", to: "اسطنبول", price: 350, isLastMinute: true, lastMinutePrice: 250,
    availableDays: '["الأحد", "الثلاثاء", "الخميس"]', airline: "Royal Jordanian",
    departureTime: "10:00", arrivalTime: "12:30", duration: "2h 30m"
  };

  // Find active flight from DB
  const activeFlight = initialFlights.find(f => {
    if (direction === "AMM-IST") return f.from.includes("عمان") || f.from.toLowerCase().includes("amm");
    if (direction === "IST-AMM") return f.from.includes("اسطنبول") || f.from.toLowerCase().includes("ist");
    return true; // fallback
  }) || defaultFlight;

  const availableDaysFromDb = activeFlight?.availableDays ? JSON.parse(activeFlight.availableDays) : ["الأحد", "الثلاثاء", "الخميس"];
  
  const dayMap: Record<string, number> = { "الأحد": 0, "الاثنين": 1, "الثلاثاء": 2, "الأربعاء": 3, "الخميس": 4, "الجمعة": 5, "السبت": 6 };
  const availableIndices = availableDaysFromDb.map((d: string) => dayMap[d]);

  // Dynamic Price Engine
  useEffect(() => {
    if (!tripType || !direction) {
      setPrice(0);
      return;
    }
    
    let basePrice = activeFlight.price;
    
    if (tripType === "round-trip") {
      basePrice = basePrice * 1.8;
    }
    
    if (cabin === "business") {
      basePrice += 150;
    }

    if (selectedDate && activeFlight.isLastMinute) {
      const today = startOfToday();
      const diff = Math.abs(selectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
      if (diff <= 1) {
        basePrice = activeFlight.lastMinutePrice || basePrice;
      }
    }

    setPrice(Math.round(basePrice * pax));
  }, [tripType, direction, selectedDate, cabin, pax, activeFlight]);

  const isAvailableDay = (date: Date) => availableIndices.includes(getDay(date));

  const isLastMinute = (date: Date) => {
    const today = startOfToday();
    const diff = Math.abs(date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 1 && activeFlight?.isLastMinute;
  };

  const selectType = (type: "one-way" | "round-trip") => {
    setTripType(type);
    setTimeout(() => setStep(2), 300);
  };

  const selectDirection = (dir: "AMM-IST" | "IST-AMM") => {
    setDirection(dir);
    setTimeout(() => setStep(3), 300);
  };

  const currentMonth = new Date();

  return (
    <div className="max-w-7xl mx-auto p-4" dir="rtl">
      
      <AnimatePresence>
        {price > 0 && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-full shadow-2xl z-50 flex items-center gap-6 border border-slate-700 backdrop-blur-md"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">السعر الإجمالي</span>
              <span className="text-2xl font-black text-primary">{price} ₪</span>
            </div>
            {selectedDate && isLastMinute(selectedDate) && (
              <div className="bg-primary text-slate-900 text-[10px] font-black px-2 py-1 rounded-full animate-pulse flex items-center gap-1">
                <Zap size={12} /> عرض الدقيقة 90 مطبق
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-[3rem] p-6 md:p-12 border border-slate-100 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex justify-between items-center mb-12 border-b border-slate-100 pb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
              <Plane size={24} className="rotate-45" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">حجز الطيران السريع</h2>
              <p className="text-slate-500 font-bold text-sm">أفضل الأسعار المضمونة لرحلتك القادمة.</p>
            </div>
          </div>
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)} className="text-slate-400 hover:text-slate-900 font-bold flex items-center gap-2 text-sm bg-slate-50 px-4 py-2 rounded-full transition-colors">
              <ArrowRight size={16} /> العودة
            </button>
          )}
        </div>

        <div className="relative z-10 min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="max-w-2xl mx-auto space-y-8 text-center pt-8">
                <h3 className="text-3xl font-black text-slate-900 mb-2">ما هو نوع رحلتك؟</h3>
                <p className="text-slate-500 font-bold">حدد نوع التذكرة لنقدم لك السعر الأفضل.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <button onClick={() => selectType("one-way")} className={`group p-8 rounded-3xl border-2 transition-all ${tripType === "one-way" ? "border-primary bg-primary/5" : "border-slate-100 hover:border-primary/20"}`}>
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors ${tripType === "one-way" ? "bg-primary text-white" : "bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"}`}>
                      <ArrowLeft size={32} />
                    </div>
                    <h4 className={`text-xl font-black ${tripType === "one-way" ? "text-primary" : "text-slate-900"}`}>اتجاه واحد</h4>
                  </button>
                  
                  <button onClick={() => selectType("round-trip")} className={`group p-8 rounded-3xl border-2 transition-all ${tripType === "round-trip" ? "border-primary bg-primary/5" : "border-slate-100 hover:border-primary/20"}`}>
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors ${tripType === "round-trip" ? "bg-primary text-white" : "bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"}`}>
                      <Repeat size={32} />
                    </div>
                    <h4 className={`text-xl font-black ${tripType === "round-trip" ? "text-primary" : "text-slate-900"}`}>ذهاب وعودة</h4>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="max-w-2xl mx-auto space-y-8 text-center pt-8">
                <h3 className="text-3xl font-black text-slate-900 mb-2">اختر مسار الرحلة</h3>
                <p className="text-slate-500 font-bold">من أين ستكون نقطة الانطلاق؟</p>
                
                <div className="grid grid-cols-1 gap-4 mt-8">
                  <button onClick={() => selectDirection("AMM-IST")} className={`group p-6 rounded-3xl border-2 transition-all flex flex-col md:flex-row items-center justify-between gap-4 ${direction === "AMM-IST" ? "border-slate-900 bg-slate-900 text-white shadow-xl" : "border-slate-100 hover:border-slate-300"}`}>
                    <div className="flex items-center gap-4 text-xl font-black">
                      <span className={direction === "AMM-IST" ? "text-white" : "text-slate-900"}>عمان (AMM)</span>
                      <Plane size={24} className={direction === "AMM-IST" ? "text-primary" : "text-slate-300"} />
                      <span className={direction === "AMM-IST" ? "text-white" : "text-slate-900"}>اسطنبول (IST)</span>
                    </div>
                    {tripType === "round-trip" && <span className={`text-xs font-bold px-3 py-1 rounded-full ${direction === "AMM-IST" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>+ رحلة العودة</span>}
                  </button>
                  
                  <button onClick={() => selectDirection("IST-AMM")} className={`group p-6 rounded-3xl border-2 transition-all flex flex-col md:flex-row items-center justify-between gap-4 ${direction === "IST-AMM" ? "border-slate-900 bg-slate-900 text-white shadow-xl" : "border-slate-100 hover:border-slate-300"}`}>
                    <div className="flex items-center gap-4 text-xl font-black">
                      <span className={direction === "IST-AMM" ? "text-white" : "text-slate-900"}>اسطنبول (IST)</span>
                      <Plane size={24} className={direction === "IST-AMM" ? "text-primary" : "text-slate-300"} />
                      <span className={direction === "IST-AMM" ? "text-white" : "text-slate-900"}>عمان (AMM)</span>
                    </div>
                    {tripType === "round-trip" && <span className={`text-xs font-bold px-3 py-1 rounded-full ${direction === "IST-AMM" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>+ رحلة العودة</span>}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                <div className="lg:col-span-7">
                  <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <CalendarIcon className="text-primary" /> التقويم الذكي
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {[currentMonth, addMonths(currentMonth, 1)].map((month, mIdx) => (
                      <div key={mIdx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <h4 className="font-black text-slate-900 text-center mb-6">{format(month, "MMMM yyyy", { locale: ar })}</h4>
                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-slate-400 uppercase mb-4">
                          {["أحد", "ن", "ث", "ر", "خ", "ج", "س"].map(d => <div key={d}>{d}</div>)}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          {(() => {
                            const days = [];
                            const start = startOfWeek(startOfMonth(month));
                            const end = endOfWeek(endOfMonth(month));
                            let day = start;
                            while (day <= end) {
                              const cloneDay = day;
                              const available = isAvailableDay(cloneDay) && !isBefore(cloneDay, startOfToday());
                              const selected = selectedDate && isSameDay(cloneDay, selectedDate);
                              const lastMinute = isLastMinute(cloneDay);
                              
                              days.push(
                                <button 
                                  key={day.toString()} 
                                  disabled={!available} 
                                  onClick={() => setSelectedDate(cloneDay)} 
                                  className={`relative aspect-square rounded-xl flex flex-col items-center justify-center transition-all border-2 
                                    ${!isSameMonth(cloneDay, month) ? "opacity-0 pointer-events-none" : ""} 
                                    ${available ? "bg-white border-slate-200 hover:border-primary hover:shadow-md cursor-pointer" : "bg-transparent border-transparent text-slate-300 cursor-not-allowed"} 
                                    ${selected ? "border-primary bg-primary text-white shadow-lg shadow-primary/30 scale-110 z-10" : ""}
                                  `}
                                >
                                  <span className={`text-sm font-black ${selected ? "text-white" : available ? "text-slate-700" : ""}`}>{format(cloneDay, "d")}</span>
                                  {available && lastMinute && !selected && <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white animate-pulse" />}
                                </button>
                              );
                              day = addDays(day, 1);
                            }
                            return days;
                          })()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-8">
                  <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
                    <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4">تفاصيل الحجز</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">نوع المقصورة</label>
                        <div className="flex bg-white/5 p-1 rounded-xl">
                          <button onClick={() => setCabin("economy")} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${cabin === "economy" ? "bg-primary text-white" : "text-slate-400 hover:text-white"}`}>اقتصادية</button>
                          <button onClick={() => setCabin("business")} className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${cabin === "business" ? "bg-primary text-white" : "text-slate-400 hover:text-white"}`}>درجة الأعمال</button>
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">عدد المسافرين</label>
                        <div className="flex items-center bg-white/5 p-1 rounded-xl">
                          <button onClick={() => setPax(Math.max(1, pax - 1))} className="w-12 py-2 text-slate-400 hover:text-white font-bold text-xl">-</button>
                          <span className="flex-grow text-center font-black text-white text-xl">{pax}</span>
                          <button onClick={() => setPax(pax + 1)} className="w-12 py-2 text-slate-400 hover:text-white font-bold text-xl">+</button>
                        </div>
                      </div>

                      {selectedDate && (
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400 font-bold">الشركة الناقلة</span>
                            <span className="font-black">{activeFlight.airline}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400 font-bold">التاريخ المختار</span>
                            <span className="font-black text-primary">{format(selectedDate, "dd/MM/yyyy")}</span>
                          </div>
                          
                          <div className="pt-3 border-t border-white/10 mt-3">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">مواعيد رحلة الذهاب</p>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">إقلاع: <span className="text-white font-bold">{activeFlight.departureTime}</span></span>
                              <span className="text-slate-400">وصول: <span className="text-white font-bold">{activeFlight.arrivalTime}</span></span>
                            </div>
                          </div>

                          {tripType === "round-trip" && activeFlight.returnDepartureTime && (
                            <div className="pt-3 border-t border-white/10 mt-3">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">مواعيد رحلة العودة</p>
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-400">إقلاع: <span className="text-white font-bold">{activeFlight.returnDepartureTime}</span></span>
                                <span className="text-slate-400">وصول: <span className="text-white font-bold">{activeFlight.returnArrivalTime}</span></span>
                              </div>
                            </div>
                          )}

                          {isLastMinute(selectedDate) && (
                            <div className="bg-yellow-500/20 text-yellow-400 p-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 mt-4">
                              <Zap size={14} /> عرض الدقيقة 90 تم تطبيقه
                            </div>
                          )}
                        </div>
                      )}

                      <button 
                        disabled={!selectedDate}
                        onClick={() => {
                          if(!selectedDate) return;
                          const msg = `مرحباً يارين تورز، أرغب في حجز تذكرة طيران:
المسار: ${direction === "AMM-IST" ? "عمان إلى اسطنبول" : "اسطنبول إلى عمان"}
النوع: ${tripType === "one-way" ? "اتجاه واحد" : "ذهاب وعودة"}
تاريخ المغادرة: ${format(selectedDate, "dd/MM/yyyy")}
عدد الأشخاص: ${pax}
المقصورة: ${cabin === "economy" ? "اقتصادية" : "درجة الأعمال"}
السعر الإجمالي المتوقع: ${price} ₪`;
                          window.open(`https://wa.me/972522340930?text=${encodeURIComponent(msg)}`, "_blank");
                        }} 
                        className={`w-full py-4 rounded-xl font-black text-lg flex items-center justify-center gap-2 transition-all ${selectedDate ? "bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30" : "bg-slate-800 text-slate-500 cursor-not-allowed"}`}
                      >
                        <MessageCircle size={20} />
                        {selectedDate ? "احجز عبر الواتساب" : "اختر تاريخاً أولاً"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {initialFlights.length > 0 && (
        <div className="mt-24 space-y-12">
          <div className="text-center">
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">عروض طيران حصرية ✈️</h3>
            <p className="text-slate-500 font-bold">وجهاتنا الأكثر طلباً بأسعار لا تقبل المنافسة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialFlights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-primary transition-colors">
                      <Plane size={24} />
                    </div>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase">عرض خاص</div>
                  </div>
                  
                  <h4 className="text-2xl font-black text-slate-900 mb-2">{flight.from} ← {flight.to}</h4>
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-6">
                    {flight.airline} • {flight.departureTime}
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">تبدأ من</span>
                      <span className="text-2xl font-black text-slate-900">₪{flight.price}</span>
                    </div>
                    <button 
                      onClick={() => {
                        const msg = `مرحباً يارين تورز، أرغب في حجز عرض الطيران من ${flight.from} إلى ${flight.to}
شركة الطيران: ${flight.airline}
الوقت: ${flight.departureTime}
السعر المعروض: ₪${flight.price}`;
                        window.open(`https://wa.me/972522340930?text=${encodeURIComponent(msg)}`, "_blank");
                      }}
                      className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-primary transition-all font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-primary/20"
                    >
                      <MessageCircle size={18} />
                      احجز الآن
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightBooking;
