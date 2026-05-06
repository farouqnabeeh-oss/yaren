"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Users, Calendar as CalendarIcon, 
  Utensils, Bed, PlusCircle, Info, ArrowLeft, Star, MapPin, Gift, CheckCircle2 
} from "lucide-react";
import { format, startOfToday, addDays } from "date-fns";
import Link from "next/link";

const HotelBookingEngine = ({ initialHotels = [] }: { initialHotels?: any[] }) => {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState({
    region: "Aqaba",
    pax: 2,
    meal: "BB",
    date: format(startOfToday(), "yyyy-MM-dd"),
    nights: 1,
  });

  const [results, setResults] = useState<any[]>([]);
  const [starFilter, setStarFilter] = useState<number | null>(null);
  
  // State for selections inside the hotel card
  const [selectedRooms, setSelectedRooms] = useState<Record<string, string>>({});
  const [activeOptions, setActiveOptions] = useState<Record<string, string[]>>({});

  // Parse DB JSON strings
  const hotels = initialHotels.map(h => ({
    ...h,
    mealPlans: typeof h.mealPlans === "string" ? JSON.parse(h.mealPlans) : h.mealPlans,
    roomTypes: typeof h.roomTypes === "string" ? JSON.parse(h.roomTypes) : h.roomTypes,
    pricing: typeof h.pricingMatrix === "string" ? JSON.parse(h.pricingMatrix) : h.pricingMatrix,
    mealSupplements: typeof h.mealSupplements === "string" ? JSON.parse(h.mealSupplements) : h.mealSupplements,
    options: typeof h.options === "string" ? JSON.parse(h.options) : h.options,
  }));

  const handleSearch = () => {
    // Basic filtering based on Region and Meal Plan
    const filtered = hotels.filter(h => 
      h.region === search.region && 
      (h.mealPlans || []).includes(search.meal)
    );
    
    // Initialize default room selection for each hotel
    const initialRooms: Record<string, string> = {};
    const initialOpts: Record<string, string[]> = {};
    
    filtered.forEach(h => {
      // Set default room based on pax (if 1 -> SGL, 2 -> DBL, 3 -> TPL)
      let defaultRoom = "DBL";
      if (search.pax === 1 && h.roomTypes.includes("SGL")) defaultRoom = "SGL";
      if (search.pax >= 3 && h.roomTypes.includes("TPL")) defaultRoom = "TPL";
      if (!h.roomTypes.includes(defaultRoom)) defaultRoom = h.roomTypes[0]; // fallback
      
      initialRooms[h.id] = defaultRoom;
      initialOpts[h.id] = [];
    });

    setSelectedRooms(initialRooms);
    setActiveOptions(initialOpts);
    setResults(filtered);
    setStep(2);
  };

  const calculateHotelPrice = (hotel: any) => {
    const month = search.date.substring(0, 7);
    const roomType = selectedRooms[hotel.id] || "DBL";
    const opts = activeOptions[hotel.id] || [];
    
    const monthPrices = hotel.pricing?.[month] || Object.values(hotel.pricing || {})[0] || {};
    const basePrice = (monthPrices as any)?.[roomType] || 0;
    const mealPrice = hotel.mealSupplements?.[search.meal] || 0;
    
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

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8" dir="rtl">
      {/* ─── SEARCH BAR (تسلسل: عدد الأشخاص ⬅️ نوع الوجبة ⬅️ التاريخ) ─── */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end relative z-10 text-right">
          
          <div className="space-y-2 md:col-span-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">1. الوجهة</label>
            <select 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 font-bold outline-none focus:ring-2 ring-primary cursor-pointer"
              value={search.region}
              onChange={(e) => setSearch({...search, region: e.target.value})}
            >
              <option value="Aqaba">الأردن (العقبة / عمان / البحر الميت)</option>
              <option value="Eilat">إيلات والبحر الميت (المحلي)</option>
              <option value="Jericho">أريحا والضفة</option>
              <option value="Sinai">سيناء (شرم الشيخ / دهب / طابا)</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">2. البالغين</label>
            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
              <Users size={18} className="text-primary ml-2" />
              <select 
                className="bg-transparent border-none w-full font-bold outline-none cursor-pointer"
                value={search.pax}
                onChange={(e) => setSearch({...search, pax: parseInt(e.target.value)})}
              >
                {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} بالغين</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2 md:col-span-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">3. نوع الوجبة</label>
            <div className="flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
              <Utensils size={18} className="text-primary ml-2" />
              <select 
                className="bg-transparent border-none w-full font-bold outline-none cursor-pointer"
                value={search.meal}
                onChange={(e) => setSearch({...search, meal: e.target.value})}
              >
                <option value="BB">فطور (BB)</option>
                <option value="HP">فطور وعشاء (HP)</option>
                <option value="Soft All">شامل (Soft All)</option>
                <option value="Hard All">شامل نبيذ (Hard All)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">4. التاريخ والليالي</label>
            <div className="flex items-center gap-2">
              <div className="flex-grow flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
                <CalendarIcon size={18} className="text-primary ml-2 shrink-0" />
                <input 
                  type="date" 
                  className="bg-transparent border-none w-full font-bold outline-none"
                  value={search.date}
                  onChange={(e) => setSearch({...search, date: e.target.value})}
                />
              </div>
              <div className="w-24 shrink-0 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
                <input 
                  type="number" 
                  min="1"
                  className="bg-transparent border-none w-full font-bold outline-none text-center"
                  value={search.nights}
                  onChange={(e) => setSearch({...search, nights: parseInt(e.target.value)})}
                />
                <span className="text-xs font-bold text-slate-400 mr-1">ليالي</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <button 
              onClick={handleSearch}
              className="w-full bg-slate-900 hover:bg-black text-white h-[54px] rounded-xl font-black flex items-center justify-center gap-2 transition-all shadow-xl shadow-slate-900/20"
            >
              <Search size={20} />
              بحث
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
                <button onClick={() => setStarFilter(null)} className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${starFilter === null ? "bg-primary text-white border-primary/20 shadow-md" : "bg-white text-slate-500 border-slate-200 hover:border-primary/50"}`}>الكل</button>
                <button onClick={() => setStarFilter(5)} className={`px-5 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-1 ${starFilter === 5 ? "bg-primary text-white border-primary/20 shadow-md" : "bg-white text-slate-500 border-slate-200 hover:border-primary/50"}`}>5 نجوم <Star size={12} className={starFilter===5 ? "fill-white text-white" : "fill-primary text-primary/90"} /></button>
                <button onClick={() => setStarFilter(4)} className={`px-5 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-1 ${starFilter === 4 ? "bg-primary text-white border-primary/20 shadow-md" : "bg-white text-slate-500 border-slate-200 hover:border-primary/50"}`}>4 نجوم <Star size={12} className={starFilter===4 ? "fill-white text-white" : "fill-primary text-primary/90"} /></button>
              </div>
              <div className="text-slate-500 text-sm font-bold bg-slate-100 px-4 py-2 rounded-full">
                نتائج البحث: <span className="text-slate-900 font-black">{results.filter(h => starFilter ? h.stars === starFilter : true).length}</span> فندق
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.filter(h => starFilter ? h.stars === starFilter : true).map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                  
                  {/* Hotel Image */}
                  <div className="h-56 relative overflow-hidden shrink-0">
                    <img src={hotel.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={hotel.name} />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-slate-900 flex items-center gap-1 shadow-sm">
                      {hotel.stars} <Star size={10} className="fill-primary text-primary/90" />
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
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
                            onClick={() => setSelectedRooms({...selectedRooms, [hotel.id]: type})}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                              selectedRooms[hotel.id] === type ? "bg-slate-900 text-white border-slate-900 shadow-md" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
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
                          <div className="bg-primary/50 p-3 rounded-xl border border-primary/10 text-[10px] font-bold text-slate-600 leading-relaxed mb-4 flex gap-2 items-start">
                            <Info size={14} className="text-primary shrink-0 mt-0.5" />
                            <span>هذا السعر للغرفة الزوجية يشمل طفلين: الأول حتى عمر 12 سنة مجاناً، والثاني حتى عمر 6 سنوات مجاناً.</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Supplements */}
                    {hotel.options && hotel.options.length > 0 && (
                      <div className="mb-6 border-t border-slate-100 pt-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">إضافات الغرفة</p>
                        <div className="flex flex-wrap gap-2">
                          {hotel.options.map((opt: any) => (
                            <button 
                              key={opt.id}
                              onClick={() => toggleOption(hotel.id, opt.id)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 ${
                                (activeOptions[hotel.id] || []).includes(opt.id) ? "bg-green-50 text-green-700 border-green-200" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
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

                          const optsStr = (activeOptions[hotel.id] || []).map(id => hotel.options.find((o:any)=>o.id===id).label).join(" + ");
                          
                          const msg = `مرحباً يارين تورز، أرغب في حجز فندق:
الفندق: ${hotel.name}
التاريخ: ${formattedDate}
عدد الليالي: ${search.nights}
عدد البالغين: ${search.pax}
نوع الغرفة: ${selectedRooms[hotel.id] || "DBL"}
نوع الوجبة: ${search.meal}
${optsStr ? `الإضافات: ${optsStr}` : ""}
السعر الإجمالي: ${calculateHotelPrice(hotel)} ₪
يرجى تأكيد الحجز.`;
                          window.open(`https://wa.me/972522340930?text=${encodeURIComponent(msg)}`, "_blank");
                        }}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/30"
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
              ))}
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
    </div>
  );
};

export default HotelBookingEngine;
