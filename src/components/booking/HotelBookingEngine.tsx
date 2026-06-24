"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Users, Calendar as CalendarIcon,
  Utensils, PlusCircle, Info, Star, Gift, CheckCircle2
} from "lucide-react";
import { format, startOfToday, addDays, differenceInDays, parseISO } from "date-fns";

const HotelBookingEngine = ({ initialHotels = [] }: { initialHotels?: any[] }) => {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState({
    region: "Aqaba",
    pax: 2,
    date: format(startOfToday(), "yyyy-MM-dd"),
    nights: 1,
    checkoutDate: format(addDays(startOfToday(), 1), "yyyy-MM-dd"),
    childrenCount: 0,
  });

  const [results, setResults] = useState<any[]>([]);
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [showRoomAlert, setShowRoomAlert] = useState(false);

  // State for selections inside the hotel card
  const [selectedRooms, setSelectedRooms] = useState<Record<string, string>>({});
  const [activeOptions, setActiveOptions] = useState<Record<string, string[]>>({});
  const [selectedMeals, setSelectedMeals] = useState<Record<string, string>>({});

  // Parse DB JSON strings safely
  const hotels = initialHotels.map(h => {
    const safeParse = (val: any, fallback: any = []) => {
      if (typeof val === "string") {
        try {
          return JSON.parse(val);
        } catch (e) {
          return fallback;
        }
      }
      return val || fallback;
    };

    return {
      ...h,
      mealPlans: safeParse(h.mealPlans, ["BB"]),
      roomTypes: safeParse(h.roomTypes, ["DBL"]),
      pricing: safeParse(h.pricingMatrix, {}),
      mealSupplements: safeParse(h.mealSupplements, {}),
      options: safeParse(h.options, []),
    };
  });

  const handleSearch = () => {
    // Filter hotels based on selected region
    const filtered = hotels.filter(h => h.region === search.region);

    // Initialize default room, meal, and options selection for each hotel
    const initialRooms: Record<string, string> = {};
    const initialOpts: Record<string, string[]> = {};
    const initialMeals: Record<string, string> = {};

    filtered.forEach(h => {
      // Set default room based on pax (if 1 -> SGL, 2 -> DBL, 3 -> TPL)
      let defaultRoom = "DBL";
      if (search.pax === 1 && h.roomTypes.includes("SGL")) defaultRoom = "SGL";
      if (search.pax >= 3 && h.roomTypes.includes("TPL")) defaultRoom = "TPL";
      if (!h.roomTypes.includes(defaultRoom)) defaultRoom = h.roomTypes[0]; // fallback

      // Default meal is the first available meal plan
      const defaultMeal = h.mealPlans?.[0] || "BB";

      initialRooms[h.id] = defaultRoom;
      initialOpts[h.id] = [];
      initialMeals[h.id] = defaultMeal;
    });

    setSelectedRooms(initialRooms);
    setActiveOptions(initialOpts);
    setSelectedMeals(initialMeals);
    setResults(filtered);
    setStep(2);
  };

  const calculateHotelPrice = (hotel: any) => {
    const month = search.date.substring(0, 7);
    const roomType = selectedRooms[hotel.id] || "DBL";
    const selectedMeal = selectedMeals[hotel.id] || hotel.mealPlans?.[0] || "BB";
    const opts = activeOptions[hotel.id] || [];

    const monthPrices = hotel.pricing?.[month] || Object.values(hotel.pricing || {})[0] || {};
    const basePrice = (monthPrices as any)?.[roomType] || 0;

    // Meal upgrade supplement
    const mealPrice = hotel.mealSupplements?.[selectedMeal] || 0;

    const optionsPrice = (hotel.options || [])
      .filter((o: any) => opts.includes(o.id))
      .reduce((acc: number, o: any) => acc + o.price, 0);

    return (basePrice + mealPrice + optionsPrice) * search.nights;
  };

  const toggleOption = (hotelId: string, optionId: string) => {
    setActiveOptions(prev => {
      const current = prev[hotelId] || [];
      const updated = current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      return { ...prev, [hotelId]: updated };
    });
  };

  // Date and Nights sync handlers
  const handleCheckinChange = (newCheckin: string) => {
    try {
      const checkinObj = parseISO(newCheckin);
      const checkoutObj = addDays(checkinObj, search.nights);
      const newCheckoutStr = format(checkoutObj, "yyyy-MM-dd");
      setSearch(prev => ({
        ...prev,
        date: newCheckin,
        checkoutDate: newCheckoutStr
      }));
    } catch (e) {
      console.error("Error updating check-in date:", e);
    }
  };

  const handleNightsChange = (newNights: number) => {
    const val = Math.max(1, newNights);
    try {
      const checkinObj = parseISO(search.date);
      const checkoutObj = addDays(checkinObj, val);
      const newCheckoutStr = format(checkoutObj, "yyyy-MM-dd");
      setSearch(prev => ({
        ...prev,
        nights: val,
        checkoutDate: newCheckoutStr
      }));
    } catch (e) {
      console.error("Error updating nights:", e);
    }
  };

  const handleCheckoutChange = (newCheckout: string) => {
    try {
      const checkinObj = parseISO(search.date);
      let checkoutObj = parseISO(newCheckout);
      if (checkoutObj <= checkinObj) {
        checkoutObj = addDays(checkinObj, 1);
      }
      const calcNights = differenceInDays(checkoutObj, checkinObj);
      setSearch(prev => ({
        ...prev,
        nights: calcNights > 0 ? calcNights : 1,
        checkoutDate: format(checkoutObj, "yyyy-MM-dd")
      }));
    } catch (e) {
      console.error("Error updating check-out date:", e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8" dir="rtl">

      {/* ─── 4 REGION CARDS (الوجهات الـ 4 حد بعض) ─── */}
      <div className="mb-10 text-right">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 pr-1">أولاً: اختر وجهتك المفضلة 🌟</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: "Eilat", title: "إيلات والبحر الميت", subtitle: "السياحة المحلية الراقية", img: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=400" },
            { id: "Jericho", title: "أريحا والضفة", subtitle: "عبق التاريخ والاستجمام", img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=400" },
            { id: "Aqaba", title: "الأردن العقبة والبحر الميت", subtitle: "عطلات عائلية ممتعة", img: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&q=80&w=400" },
            { id: "Sinai", title: "سيناء وطابا دهب وشرم", subtitle: "منتجعات ساحرة بأسعار مميزة", img: "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&q=80&w=400" }
          ].map((r) => {
            const isSelected = search.region === r.id;
            return (
              <motion.button
                key={r.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSearch(prev => ({ ...prev, region: r.id }))}
                className={`relative h-28 md:h-36 rounded-[2rem] overflow-hidden border-2 transition-all duration-300 text-right flex flex-col justify-end p-5 group cursor-pointer ${isSelected ? "border-orange-500 shadow-xl shadow-orange-500/10 scale-[1.02]" : "border-slate-100 hover:border-slate-300"
                  }`}
              >
                <div className="absolute inset-0 z-0">
                  <div className={`absolute inset-0 bg-gradient-to-t ${isSelected ? "from-orange-950/90 via-orange-950/50" : "from-slate-950/80 via-slate-950/40"} to-transparent z-10`} />
                  <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="relative z-20 text-white">
                  <h4 className="font-black text-xs md:text-base mb-1 leading-tight">{r.title}</h4>
                  <p className="text-[9px] text-slate-300 font-medium">{r.subtitle}</p>
                </div>
                {isSelected && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white p-1 rounded-full z-20 shadow-md">
                    <CheckCircle2 size={14} />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ─── SEARCH BAR (التواريخ والنزلاء) ─── */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end relative z-10 text-right">

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">1. تاريخ الدخول (دخول)</label>
            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
              <CalendarIcon size={18} className="text-primary ml-2 shrink-0" />
              <input
                type="date"
                className="bg-transparent border-none w-full font-bold outline-none cursor-pointer text-slate-700"
                value={search.date}
                onChange={(e) => handleCheckinChange(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">2. عدد الليالي</label>
            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
              <input
                type="number"
                min="1"
                className="bg-transparent border-none w-full font-bold outline-none text-center text-slate-700"
                value={search.nights}
                onChange={(e) => handleNightsChange(parseInt(e.target.value) || 1)}
              />
              <span className="text-xs font-bold text-slate-400 mr-1 shrink-0">ليالي</span>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">3. تاريخ الخروج (خروج)</label>
            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
              <CalendarIcon size={18} className="text-primary ml-2 shrink-0" />
              <input
                type="date"
                className="bg-transparent border-none w-full font-bold outline-none cursor-pointer text-slate-700"
                value={search.checkoutDate}
                onChange={(e) => handleCheckoutChange(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">4. البالغين</label>
            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
              <Users size={18} className="text-primary ml-2" />
              <select
                className="bg-transparent border-none w-full font-bold outline-none cursor-pointer text-slate-700"
                value={search.pax}
                onChange={(e) => setSearch({ ...search, pax: parseInt(e.target.value) })}
              >
                {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} بالغين</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2 md:col-span-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">5. الأطفال (بحد أقصى طفل)</label>
            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
              <Users size={18} className="text-primary ml-2" />
              <select
                className="bg-transparent border-none w-full font-bold outline-none cursor-pointer text-slate-700"
                value={search.childrenCount}
                onChange={(e) => setSearch({ ...search, childrenCount: parseInt(e.target.value) || 0 })}
              >
                <option value={0}>بدون أطفال</option>
                <option value={1}>طفل واحد (ولد 1)</option>
              </select>
            </div>
          </div>

          {/* Buttons: [+] إضافة غرفة & بحث */}
          <div className="md:col-span-7 flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={() => setShowRoomAlert(true)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 h-[54px] rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-slate-200 cursor-pointer"
            >
              <PlusCircle size={18} />
              إضافة غرفة
            </button>

            <button
              onClick={handleSearch}
              className="flex-[2] bg-slate-900 hover:bg-black text-white h-[54px] rounded-xl font-black flex items-center justify-center gap-2 transition-all shadow-xl shadow-slate-900/20 cursor-pointer"
            >
              <Search size={20} />
              البحث عن فنادق متوفرة
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2">
                <button onClick={() => setStarFilter(null)} className={`px-5 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${starFilter === null ? "bg-primary text-white border-primary/20 shadow-md" : "bg-white text-slate-500 border-slate-200 hover:border-primary/50"}`}>الكل</button>
                <button onClick={() => setStarFilter(5)} className={`px-5 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${starFilter === 5 ? "bg-primary text-white border-primary/20 shadow-md" : "bg-white text-slate-500 border-slate-200 hover:border-primary/50"}`}>5 نجوم <Star size={12} className={starFilter === 5 ? "fill-white text-white" : "fill-primary text-primary/90"} /></button>
                <button onClick={() => setStarFilter(4)} className={`px-5 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${starFilter === 4 ? "bg-primary text-white border-primary/20 shadow-md" : "bg-white text-slate-500 border-slate-200 hover:border-primary/50"}`}>4 نجوم <Star size={12} className={starFilter === 4 ? "fill-white text-white" : "fill-primary text-primary/90"} /></button>
              </div>
              <div className="text-slate-500 text-sm font-bold bg-slate-100 px-4 py-2 rounded-full">
                نتائج البحث: <span className="text-slate-900 font-black">{results.filter(h => starFilter ? h.stars === starFilter : true).length}</span> فندق
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.filter(h => starFilter ? h.stars === starFilter : true).map((hotel) => {
                const currentMeal = selectedMeals[hotel.id] || hotel.mealPlans?.[0] || "BB";

                return (
                  <div key={hotel.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">

                    {/* Hotel Image */}
                    <div className="h-56 relative overflow-hidden shrink-0">
                      <img src={hotel.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={hotel.name} />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-slate-900 flex items-center gap-1 shadow-sm">
                        {hotel.stars} <Star size={10} className="fill-primary text-primary/90" />
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow text-right">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-black text-slate-900 leading-tight max-w-[60%]">{hotel.name}</h3>
                        <div className="text-left shrink-0">
                          <div className="text-[10px] font-bold text-slate-400 uppercase">السعر الإجمالي</div>
                          <div className="text-2xl font-black text-primary">{calculateHotelPrice(hotel)} ₪</div>
                        </div>
                      </div>

                      {/* Room Type Selection */}
                      <div className="mb-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">نوع الغرفة</p>
                        <div className="flex gap-2">
                          {hotel.roomTypes.map((type: string) => (
                            <button
                              key={type}
                              onClick={() => setSelectedRooms({ ...selectedRooms, [hotel.id]: type })}
                              className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${selectedRooms[hotel.id] === type ? "bg-slate-900 text-white border-slate-900 shadow-md" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                                }`}
                            >
                              {type === "SGL" ? "مفردة (SGL)" : type === "DBL" ? "زوجية (DBL)" : "ثلاثية (TPL)"}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Children Policy Note (Shows only if DBL selected) */}
                      <AnimatePresence>
                        {selectedRooms[hotel.id] === "DBL" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                            <div className="bg-primary/5 p-3 rounded-xl border border-primary/10 text-[10px] font-bold text-slate-600 leading-relaxed mb-4 flex gap-2 items-start">
                              <Info size={14} className="text-primary shrink-0 mt-0.5" />
                              <span>هذا السعر للغرفة الزوجية يشمل طفلين: الأول حتى عمر 12 سنة مجاناً، والثاني حتى عمر 6 سنوات مجاناً.</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Meal Plan Upgrade Options (تعديل جوهري داخل كل فندق) */}
                      {hotel.mealPlans && hotel.mealPlans.length > 0 && (
                        <div className="mb-4 border-t border-slate-100 pt-4">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">الوجبات المتاحة وترقية الإقامة 🍽️</p>
                          <div className="flex flex-wrap gap-2">
                            {hotel.mealPlans.map((meal: string) => {
                              const isSelected = currentMeal === meal;
                              const supplement = hotel.mealSupplements?.[meal] || 0;
                              let label = meal;
                              if (meal === "BB") label = "فطور";
                              if (meal === "HP" || meal === "HB") label = "فطور وعشاء";
                              if (meal === "Soft All") label = "شامل Soft All";
                              if (meal === "Hard All") label = "شامل Hard All";

                              return (
                                <button
                                  key={meal}
                                  onClick={() => setSelectedMeals({ ...selectedMeals, [hotel.id]: meal })}
                                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all cursor-pointer ${isSelected ? "bg-primary text-white border-primary shadow-sm" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                                    }`}
                                >
                                  {label} {supplement > 0 ? `(+${supplement}₪)` : "(أساسي)"}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Supplements */}
                      {hotel.options && hotel.options.length > 0 && (
                        <div className="mb-6 border-t border-slate-100 pt-4">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">إضافات الغرفة</p>
                          <div className="flex flex-wrap gap-2">
                            {hotel.options.map((opt: any) => (
                              <button
                                key={opt.id}
                                onClick={() => toggleOption(hotel.id, opt.id)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 cursor-pointer ${(activeOptions[hotel.id] || []).includes(opt.id) ? "bg-green-50 text-green-700 border-green-200" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                                  }`}
                              >
                                {(activeOptions[hotel.id] || []).includes(opt.id) && <CheckCircle2 size={12} />}
                                {opt.label} (+{opt.price}₪/ليلة)
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-auto space-y-4 pt-6 border-t border-slate-50">
                        <button
                          onClick={() => {
                            // Format Date
                            const dateParts = search.date.split('-');
                            const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // DD/MM/YYYY
                            const formattedCheckoutDate = format(parseISO(search.checkoutDate), "dd/MM/yyyy");

                            const optsStr = (activeOptions[hotel.id] || []).map(id => hotel.options.find((o: any) => o.id === id).label).join(" + ");

                            let mealLabel = currentMeal;
                            if (currentMeal === "BB") mealLabel = "فطور";
                            if (currentMeal === "HP" || currentMeal === "HB") mealLabel = "فطور وعشاء";
                            if (currentMeal === "Soft All") mealLabel = "شامل Soft All";
                            if (currentMeal === "Hard All") mealLabel = "شامل Hard All";

                            const msg = `مرحباً يارين تورز، أرغب في حجز فندق:
الفندق: ${hotel.name}
تاريخ الدخول (دخول): ${formattedDate}
تاريخ الخروج (خروج): ${formattedCheckoutDate}
عدد الليالي: ${search.nights}
النزلاء: ${search.pax} بالغين${search.childrenCount > 0 ? ` + ${search.childrenCount} أطفال` : ""}
نوع الغرفة: ${selectedRooms[hotel.id] || "DBL"}
نوع الوجبة: ${mealLabel}
${optsStr ? `الإضافات: ${optsStr}` : ""}
السعر الإجمالي: ${calculateHotelPrice(hotel)} ₪
يرجى تأكيد الحجز.`;
                            window.open(`https://wa.me/972522340930?text=${encodeURIComponent(msg)}`, "_blank");
                          }}
                          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/30 cursor-pointer"
                        >
                          احجز عبر الواتساب الآن
                        </button>

                        <div className="flex items-start gap-2 bg-slate-50 text-slate-600 p-3 rounded-xl text-[10px] font-bold border border-slate-100 leading-relaxed">
                          <Gift size={16} className="text-primary shrink-0 mt-0.5" />
                          احجز الآن واحصل مجاناً على (دليل يارين الشامل) - دليلك السري لتجربة تفوق التوقعات لتعرف ماذا تأكل، وكيف تكون جاهزاً لرحلة ولا غلطة!
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Special Requests Banner */}
            <div className="mt-16 bg-slate-900 text-white p-8 md:p-12 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="space-y-4 relative z-10 text-center md:text-right">
                <h3 className="text-2xl font-black text-primary/90">حالات خاصة وعائلات كبيرة؟</h3>
                <p className="text-slate-300 font-medium leading-relaxed max-w-2xl">
                  لطلب أجنحة أو غرف عائلية خاصة (Family Room / Suite)، أو إذا كان لديك أطفال أكثر من السياسة المذكورة وبأعمار مختلفة، يرجى التواصل معنا مباشرة لترتيب الأفضل لك.
                </p>
              </div>
              <a
                href="https://wa.me/972522340930?text=أريد الاستفسار عن غرف عائلية خاصة"
                target="_blank"
                className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-primary hover:text-white transition-all shrink-0 relative z-10 whitespace-nowrap"
              >
                تحدث مع خبير الآن
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── ROOM ALERT DIALOG (نافذة الغرف المتعددة) ─── */}
      <AnimatePresence>
        {showRoomAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowRoomAlert(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-md w-full border border-slate-100 shadow-2xl relative text-right"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-black text-slate-900 mb-4">طلبات الغرف المتعددة والمجموعات 🏨</h3>
              <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">
                لحجز أكثر من غرفة واحدة، أو لطلب أجنحة وغرف عائلية متصلة لعدد أفراد أكبر، يرجى التواصل مع فريق مبيعات يارين تورز مباشرة عبر الواتساب لتوفير أفضل الأسعار والترتيبات المناسبة لعائلتكم.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/972522340930?text=مرحباً يارين تورز، أرغب في حجز غرف متعددة لعائلتي."
                  target="_blank"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-black text-center text-sm transition-all"
                >
                  تواصل عبر الواتساب
                </a>
                <button
                  onClick={() => setShowRoomAlert(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-center text-sm transition-all cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HotelBookingEngine;
