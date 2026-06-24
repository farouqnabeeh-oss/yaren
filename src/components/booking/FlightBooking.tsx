"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plane, Repeat, CheckCircle2, Zap, MessageCircle, 
  Clock, ShieldCheck, Calendar as CalendarIcon, Users, ArrowLeft, ArrowRight
} from "lucide-react";
import { 
  format, addDays, startOfToday, parseISO, isSameDay, isBefore, getDay
} from "date-fns";

const FlightBooking = ({ initialFlights = [] }: { initialFlights?: any[] }) => {
  const [step, setStep] = useState(1); // 1: Search Form, 2: Results & Booking
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("round-trip");
  const [selectedFlightId, setSelectedFlightId] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>(format(startOfToday(), "yyyy-MM-dd"));
  const [returnDate, setReturnDate] = useState<string>(format(addDays(startOfToday(), 7), "yyyy-MM-dd"));
  const [cabin, setCabin] = useState<"economy" | "business">("economy");
  const [pax, setPax] = useState(1);
  const [price, setPrice] = useState(0);

  // Dynamic database flights loading with strict fallbacks
  const flights = initialFlights.length > 0 ? initialFlights.map(f => {
    let parsedDays = f.availableDays;
    if (typeof f.availableDays === "string") {
      try {
        parsedDays = JSON.parse(f.availableDays);
      } catch (e) {
        if (f.availableDays === "يوميا" || f.availableDays === "يومياً") {
          parsedDays = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
        } else {
          parsedDays = [f.availableDays];
        }
      }
    }
    return {
      ...f,
      availableDays: parsedDays
    };
  }) : [
    { id: "1", from: "عمان (AMM)", to: "اسطنبول (IST)", price: 350, isLastMinute: true, lastMinutePrice: 250, availableDays: ["الأحد", "الثلاثاء", "الخميس"], airline: "الملكية الأردنية (Royal Jordanian)", departureTime: "10:00", arrivalTime: "12:30", duration: "2h 30m", returnDepartureTime: "14:00", returnArrivalTime: "16:30", returnDuration: "2h 30m" },
    { id: "2", from: "اسطنبول (IST)", to: "عمان (AMM)", price: 350, isLastMinute: true, lastMinutePrice: 250, availableDays: ["الأحد", "الثلاثاء", "الخميس"], airline: "الخطوط التركية (Turkish Airlines)", departureTime: "15:00", arrivalTime: "17:30", duration: "2h 30m", returnDepartureTime: "19:00", returnArrivalTime: "21:30", returnDuration: "2h 30m" },
    { id: "3", from: "عمان (AMM)", to: "دبي (DXB)", price: 420, isLastMinute: false, lastMinutePrice: null, availableDays: ["الاثنين", "الأربعاء", "السبت"], airline: "طيران الإمارات (Emirates)", departureTime: "08:00", arrivalTime: "12:00", duration: "3h 00m", returnDepartureTime: "14:00", returnArrivalTime: "18:00", returnDuration: "3h 00m" }
  ];

  // Set default active flight on load
  useEffect(() => {
    if (flights.length > 0 && !selectedFlightId) {
      setSelectedFlightId(flights[0].id);
    }
  }, [flights, selectedFlightId]);

  const activeFlight = flights.find(f => f.id === selectedFlightId) || flights[0];

  // Sync dates: Departure date change -> updates return date if invalid
  const handleDepartureChange = (newDeparture: string) => {
    setDepartureDate(newDeparture);
    const depObj = parseISO(newDeparture);
    const retObj = parseISO(returnDate);
    if (isBefore(retObj, depObj)) {
      setReturnDate(format(addDays(depObj, 7), "yyyy-MM-dd"));
    }
  };

  // Sync dates: Return date change -> updates departure date if invalid
  const handleReturnChange = (newReturn: string) => {
    const depObj = parseISO(departureDate);
    const retObj = parseISO(newReturn);
    if (isBefore(retObj, depObj)) {
      setDepartureDate(format(addDays(retObj, -7), "yyyy-MM-dd"));
    }
    setReturnDate(newReturn);
  };

  // Check if selected date is an operating flight day (SUN=0, MON=1, etc.)
  const getSelectedDayName = (dateStr: string) => {
    const dateObj = parseISO(dateStr);
    const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    return days[getDay(dateObj)];
  };

  const isOperatingDay = (dateStr: string) => {
    if (!activeFlight?.availableDays) return true;
    const dayName = getSelectedDayName(dateStr);
    return activeFlight.availableDays.includes(dayName);
  };

  // Calculate pricing dynamically
  useEffect(() => {
    if (!activeFlight) return;

    let basePrice = activeFlight.price;
    
    // Check for last minute discount if applicable
    if (activeFlight.isLastMinute && departureDate) {
      try {
        const depObj = parseISO(departureDate);
        const today = startOfToday();
        const diff = Math.abs(depObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        if (diff <= 1.5 && activeFlight.lastMinutePrice) {
          basePrice = activeFlight.lastMinutePrice;
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Multiply for round-trip
    if (tripType === "round-trip") {
      basePrice = basePrice * 1.8;
    }

    // Business class supplement
    if (cabin === "business") {
      basePrice += 150;
    }

    setPrice(Math.round(basePrice * pax));
  }, [tripType, selectedFlightId, departureDate, cabin, pax, activeFlight]);

  const handleSearch = () => {
    setStep(2);
  };

  return (
    <div className="max-w-7xl mx-auto p-4" dir="rtl">
      
      <div className="bg-white rounded-[3rem] p-6 md:p-12 border border-slate-100 shadow-2xl relative overflow-hidden text-right">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Dynamic Header */}
        <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-6 relative z-10">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
            <Plane size={24} className="rotate-45" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              {step === 1 ? "البحث عن الرحلات الجوية ✈️" : "تفاصيل رحلتك وحجز التذاكر"}
            </h2>
            <p className="text-slate-500 font-bold text-sm">
              {step === 1 ? "احجز رحلتك بمواعيد ثابتة وأفضل سعر مضمون في صفحة واحدة." : "يرجى مراجعة تفاصيل التذكرة لتأكيد الحجز الفوري."}
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: SINGLE-PAGE SEARCH FORM */}
            {step === 1 && (
              <motion.div 
                key="search-form" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                
                {/* 1. Trip Type Switcher (ذهاب وإياب / ذهاب فقط) */}
                <div className="flex justify-center md:justify-start">
                  <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 items-center">
                    <button
                      onClick={() => setTripType("round-trip")}
                      className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                        tripType === "round-trip" ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <Repeat size={14} />
                      ذهاب وعودة (إياب)
                    </button>
                    <button
                      onClick={() => setTripType("one-way")}
                      className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                        tripType === "one-way" ? "bg-slate-900 text-white shadow-md" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <ArrowLeft size={14} />
                      اتجاه واحد (ذهاب فقط)
                    </button>
                  </div>
                </div>

                {/* 2. Form Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Select Flight Route */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">اختر مسار الرحلة (الوجهة)</label>
                    <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
                      <Plane size={18} className="text-primary ml-2 shrink-0" />
                      <select
                        className="bg-transparent border-none w-full font-bold outline-none cursor-pointer text-slate-700"
                        value={selectedFlightId}
                        onChange={(e) => setSelectedFlightId(e.target.value)}
                      >
                        {flights.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.from} ← {f.to} ({f.airline})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Departure Date */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">تاريخ الذهاب</label>
                    <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
                      <CalendarIcon size={18} className="text-primary ml-2 shrink-0" />
                      <input 
                        type="date" 
                        className="bg-transparent border-none w-full font-bold outline-none cursor-pointer text-slate-700"
                        value={departureDate}
                        onChange={(e) => handleDepartureChange(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Return Date (Shows only if Round Trip) */}
                  <div className={`space-y-2 transition-all duration-300 ${tripType === "one-way" ? "opacity-40 cursor-not-allowed" : ""}`}>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">تاريخ العودة</label>
                    <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
                      <CalendarIcon size={18} className="text-primary ml-2 shrink-0" />
                      <input 
                        type="date" 
                        disabled={tripType === "one-way"}
                        className="bg-transparent border-none w-full font-bold outline-none cursor-pointer text-slate-700 disabled:cursor-not-allowed"
                        value={returnDate}
                        onChange={(e) => handleReturnChange(e.target.value)}
                      />
                    </div>
                  </div>

                </div>

                {/* 3. Passengers & Cabin Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Passengers Counter */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">عدد المسافرين (الركاب)</label>
                    <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
                      <Users size={18} className="text-primary ml-2" />
                      <div className="flex items-center w-full justify-between px-2">
                        <button 
                          onClick={() => setPax(Math.max(1, pax - 1))}
                          className="w-10 h-10 bg-white hover:bg-slate-100 rounded-lg text-slate-500 font-bold text-lg border border-slate-200 flex items-center justify-center shrink-0 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="font-black text-slate-800 text-lg">{pax} ركاب</span>
                        <button 
                          onClick={() => setPax(pax + 1)}
                          className="w-10 h-10 bg-white hover:bg-slate-100 rounded-lg text-slate-500 font-bold text-lg border border-slate-200 flex items-center justify-center shrink-0 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cabin Class Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">درجة السفر (المقصورة)</label>
                    <div className="flex bg-slate-100 p-1.5 rounded-xl h-[54px] items-center">
                      <button 
                        onClick={() => setCabin("economy")}
                        className={`flex-1 py-2.5 rounded-lg font-black text-xs transition-all cursor-pointer ${
                          cabin === "economy" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        اقتصادية (Economy)
                      </button>
                      <button 
                        onClick={() => setCabin("business")}
                        className={`flex-1 py-2.5 rounded-lg font-black text-xs transition-all cursor-pointer ${
                          cabin === "business" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        درجة الأعمال (Business Class)
                      </button>
                    </div>
                  </div>

                </div>

                {/* 4. Dynamic Info Banner - Operational Days */}
                {activeFlight && (
                  <div className="bg-primary/5 p-5 rounded-[2rem] border border-primary/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-black text-slate-900 flex items-center gap-2 text-sm md:text-base">
                        <Zap className="text-primary" size={18} />
                        ملاحظة حول أيام عمل خط الطيران المختار
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        تنطلق هذه الرحلات بمواعيد ثابتة ومحددة. أيام المغادرة المتوفرة هي:{" "}
                        <span className="text-primary font-black">{activeFlight.availableDays?.join("، ")}</span>.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-auto text-right">
                      {/* Check departure day availability */}
                      <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1 self-start ${
                        isOperatingDay(departureDate) ? "bg-green-50 text-green-700 border border-green-200" : "bg-orange-50 text-orange-700 border border-orange-200"
                      }`}>
                        تاريخ الذهاب يوافق {getSelectedDayName(departureDate)} (
                        {isOperatingDay(departureDate) ? "متوفر ومؤكد" : "غير معتاد - يفضل مراجعة الجدول"}
                        )
                      </span>

                      {/* Check return day availability */}
                      {tripType === "round-trip" && (
                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full shrink-0 flex items-center gap-1 self-start ${
                          isOperatingDay(returnDate) ? "bg-green-50 text-green-700 border border-green-200" : "bg-orange-50 text-orange-700 border border-orange-200"
                        }`}>
                          تاريخ العودة يوافق {getSelectedDayName(returnDate)} (
                          {isOperatingDay(returnDate) ? "متوفر ومؤكد" : "غير معتاد - يفضل مراجعة الجدول"}
                          )
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* 5. Direct Flights Only & Search CTA */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="direct" 
                      defaultChecked 
                      className="w-5 h-5 rounded-md border-slate-300 text-primary focus:ring-primary cursor-pointer"
                    />
                    <label htmlFor="direct" className="text-sm font-bold text-slate-600 cursor-pointer">
                      رحلة مباشرة فقط بدون توقف ✈️
                    </label>
                  </div>

                  <button
                    onClick={handleSearch}
                    className="w-full sm:w-auto bg-slate-900 hover:bg-black text-white px-12 py-4 rounded-xl font-black text-lg shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    البحث وعرض الأسعار <ArrowLeft size={20} />
                  </button>
                </div>

              </motion.div>
            )}

            {/* STEP 2: SUMMARY & BOOKING */}
            {step === 2 && activeFlight && (
              <motion.div 
                key="booking-summary" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-right"
              >
                
                {/* Flight Details Column */}
                <div className="lg:col-span-7 space-y-6">
                  <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                    <Plane className="text-primary rotate-45" size={20} />
                    مسار الرحلة المعتمد
                  </h3>

                  {/* Outbound Ticket Details */}
                  <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-200 relative overflow-hidden">
                    <div className="absolute top-4 left-4 bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full">ذهاب</div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block mb-1">الشركة الناقلة</span>
                        <span className="font-black text-slate-800 text-sm">{activeFlight.airline}</span>
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-slate-400 block mb-1">المغادرة</span>
                        <span className="font-black text-primary text-sm">{format(parseISO(departureDate), "dd/MM/yyyy")}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-b border-slate-200/60 py-6 my-4">
                      <div>
                        <span className="text-2xl font-black text-slate-900">{activeFlight.departureTime}</span>
                        <span className="text-xs text-slate-400 font-bold block mt-1">{activeFlight.from}</span>
                      </div>
                      
                      <div className="flex flex-col items-center flex-grow px-4">
                        <span className="text-[10px] text-slate-400 font-bold mb-1">{activeFlight.duration}</span>
                        <div className="relative w-full h-[2px] bg-slate-300">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center"><Plane size={10} className="rotate-45" /></div>
                        </div>
                        <span className="text-[9px] text-green-600 font-black mt-1">مباشر ✈️</span>
                      </div>

                      <div>
                        <span className="text-2xl font-black text-slate-900">{activeFlight.arrivalTime}</span>
                        <span className="text-xs text-slate-400 font-bold block mt-1">{activeFlight.to}</span>
                      </div>
                    </div>
                  </div>

                  {/* Inbound Ticket Details (Only if Round Trip) */}
                  {tripType === "round-trip" && (
                    <div className="bg-slate-50 p-6 rounded-[2.5rem] border border-slate-200 relative overflow-hidden">
                      <div className="absolute top-4 left-4 bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full">إياب / عودة</div>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">الشركة الناقلة</span>
                          <span className="font-black text-slate-800 text-sm">{activeFlight.airline}</span>
                        </div>
                        <div className="text-left">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">تاريخ العودة</span>
                          <span className="font-black text-slate-900 text-sm">{format(parseISO(returnDate), "dd/MM/yyyy")}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-b border-slate-200/60 py-6 my-4">
                        <div>
                          <span className="text-2xl font-black text-slate-900">{activeFlight.returnDepartureTime || activeFlight.departureTime}</span>
                          <span className="text-xs text-slate-400 font-bold block mt-1">{activeFlight.to}</span>
                        </div>
                        
                        <div className="flex flex-col items-center flex-grow px-4">
                          <span className="text-[10px] text-slate-400 font-bold mb-1">{activeFlight.returnDuration || activeFlight.duration}</span>
                          <div className="relative w-full h-[2px] bg-slate-300">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-900 text-white rounded-full flex items-center justify-center"><Plane size={10} className="rotate-45" /></div>
                          </div>
                          <span className="text-[9px] text-green-600 font-black mt-1">مباشر ✈️</span>
                        </div>

                        <div>
                          <span className="text-2xl font-black text-slate-900">{activeFlight.returnArrivalTime || activeFlight.arrivalTime}</span>
                          <span className="text-xs text-slate-400 font-bold block mt-1">{activeFlight.from}</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Booking Price & WhatsApp Call-to-action Column */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="space-y-6">
                      <h3 className="text-xl font-black mb-6 border-b border-white/10 pb-4">تفاصيل الفاتورة والطلب</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400 font-bold">المسار</span>
                          <span className="font-black">{activeFlight.from} ← {activeFlight.to}</span>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400 font-bold">نوع التذكرة</span>
                          <span className="font-black">{tripType === "one-way" ? "اتجاه واحد" : "ذهاب وعودة"}</span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400 font-bold">المسافرين</span>
                          <span className="font-black text-primary">{pax} ركاب</span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400 font-bold">درجة السفر</span>
                          <span className="font-black">{cabin === "economy" ? "درجة اقتصادية" : "درجة الأعمال"}</span>
                        </div>

                        {departureDate && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-bold">تاريخ الذهاب</span>
                            <span className="font-black text-slate-200">{format(parseISO(departureDate), "dd/MM/yyyy")} ({getSelectedDayName(departureDate)})</span>
                          </div>
                        )}

                        {tripType === "round-trip" && returnDate && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-bold">تاريخ العودة</span>
                            <span className="font-black text-slate-200">{format(parseISO(returnDate), "dd/MM/yyyy")} ({getSelectedDayName(returnDate)})</span>
                          </div>
                        )}
                      </div>

                      {/* Total Pricing display */}
                      <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex justify-between items-center mt-6">
                        <div>
                          <span className="text-[10px] text-slate-400 block mb-1">السعر الإجمالي النهائي</span>
                          <span className="text-3xl font-black text-primary">{price} ₪</span>
                        </div>
                        {activeFlight.isLastMinute && (
                          <div className="bg-primary text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full animate-pulse flex items-center gap-1">
                            <Zap size={11} /> عرض خاص
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 mt-8">
                      <button 
                        onClick={() => {
                          const depStr = format(parseISO(departureDate), "dd/MM/yyyy");
                          const retStr = tripType === "round-trip" ? format(parseISO(returnDate), "dd/MM/yyyy") : "";
                          
                          const msg = `مرحباً يارين تورز، أرغب في حجز تذاكر طيران:
المسار: من ${activeFlight.from} إلى ${activeFlight.to}
النوع: ${tripType === "one-way" ? "اتجاه واحد (ذهاب)" : "ذهاب وعودة (إياب)"}
تاريخ المغادرة: ${depStr} (${getSelectedDayName(departureDate)})${tripType === "round-trip" ? `\nتاريخ العودة: ${retStr} (${getSelectedDayName(returnDate)})` : ""}
الركاب: ${pax} أشخاص
الدرجة: ${cabin === "economy" ? "اقتصادية" : "درجة الأعمال"}
الشركة المفضلة: ${activeFlight.airline}
السعر الإجمالي: ${price} ₪
يرجى تأكيد إمكانية الحجز.`;
                          window.open(`https://wa.me/972522340930?text=${encodeURIComponent(msg)}`, "_blank");
                        }} 
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-black text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/30 cursor-pointer"
                      >
                        <MessageCircle size={20} />
                        احجز عبر الواتساب الآن
                      </button>

                      {/* MOBILE ACCESSIBILITY BACK BUTTON (موقعه المناسب بالأسفل) */}
                      <button 
                        onClick={() => setStep(1)} 
                        className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ArrowRight size={16} />
                        تعديل بيانات البحث
                      </button>
                    </div>

                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Featured Flights Database Displays */}
      {initialFlights.length > 0 && step === 1 && (
        <div className="mt-24 space-y-12">
          <div className="text-center">
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">عروض طيران حصرية ✈️</h3>
            <p className="text-slate-500 font-bold">وجهاتنا الأكثر طلباً بأسعار لا تقبل المنافسة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group text-right">
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
                        setSelectedFlightId(flight.id);
                        setStep(1);
                        // Smooth scroll back to search box
                        document.getElementById("flights")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-primary transition-all font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-primary/20 cursor-pointer"
                    >
                      تعديل وحجز
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
