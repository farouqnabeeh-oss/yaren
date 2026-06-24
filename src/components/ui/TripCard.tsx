"use client";

 
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Calendar, Users, MapPin, ChevronLeft, MessageCircle, Info } from "lucide-react";

interface TripCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  duration?: string;
  features: string[];
  type: "bus" | "organized";
  availableDays?: string[];
  cities?: string[];
  rating?: number;
  reviewCount?: number;
  date?: string; // Format: 15/6/2026
  showGuide?: boolean;
  guide?: {
    name: string;
    image?: string;
    exp?: string;
  };
}

const TripCard: React.FC<TripCardProps> = ({ 
  id, title, image, price, duration, features, type, availableDays, cities, rating = 4.9, reviewCount = 124, date, guide, showGuide = true
}) => {
  const datesToRender = Array.from(new Set([
    ...(availableDays || []),
    ...(date ? [date] : [])
  ])).filter(Boolean);

  const [showForm, setShowForm] = useState(false);
  const [pax, setPax] = useState(1);
  const [selectedCity, setSelectedCity] = useState(cities?.[0] || "");
  const [selectedDate, setSelectedDate] = useState(datesToRender[0] || "");

  const handleWhatsAppBooking = () => {
    const totalPrice = pax * price;
    const message = `مرحباً يارين تورز، أرغب في تأكيد حجز ${type === "bus" ? "توصيل باص" : "رحلة منظمة"}:
الوجهة: ${title}
التاريخ المختار: ${selectedDate || "سيتم تحديده"}
عدد الأشخاص: ${pax} أشخاص
المدينة: ${selectedCity}
السعر الإجمالي المتوقع: ${totalPrice} شيكل
يرجى تأكيد الحجز معي.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/972522340930?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-slate-200/50 hover:border-primary/50 transition-all duration-500 group flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-slate-900 border border-white/20 shadow-sm flex items-center gap-1.5">
          <span className="text-primary">★</span>
          {rating} ({reviewCount})
        </div>
        <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-white border border-white/10 shadow-sm">
          {duration || "يومياً"}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 right-4 text-white text-right">
          <div className="text-[10px] font-black opacity-70 mb-0.5">السعر للشخص</div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black">{price}</span>
            <span className="text-sm font-bold opacity-80">₪</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900 leading-tight">{title}</h3>
        </div>
        
        {date && (
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-4 bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
            <Calendar size={14} className="text-primary" />
            <span>تاريخ الانطلاق: {date}</span>
          </div>
        )}

        <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6">
          {features.slice(0, 4).map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="line-clamp-1">{f}</span>
            </li>
          ))}
        </ul>

        {/* Guide Section - Conditional */}
        {type === "organized" && showGuide && (
          <div className="mb-6 p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
              {guide?.image ? (
                <img src={guide.image} alt={guide.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-black text-[10px]">YT</div>
              )}
            </div>
            <div className="flex-grow text-right">
              <h4 className="text-xs font-black text-slate-900">{guide?.name || "نخبة من أمهر المرشدين"}</h4>
              <p className="text-[9px] text-slate-400 font-bold">{guide?.exp || "إرشاد عربي كامل"}</p>
            </div>
          </div>
        )}

        <div className="mt-auto grid grid-cols-2 gap-3">
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-primary/80 transition-all flex items-center justify-center gap-2"
          >
            {showForm ? "إغلاق" : "احجز الآن"}
          </button>
          <a 
            href={`/trips/${id}`}
            className="bg-slate-100 text-slate-700 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <Info size={16} />
            التفاصيل
          </a>
        </div>
      </div>

      {/* Booking Form Overlay/Drawer */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100 bg-slate-50 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase tracking-wider">التاريخ المتاح</label>
                  {datesToRender.length > 0 ? (
                    <select 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold focus:ring-2 ring-primary outline-none"
                    >
                      <option value="">اختر اليوم</option>
                      {datesToRender.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  ) : (
                    <input 
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold focus:ring-2 ring-primary outline-none"
                    />
                  )}
                </div>

                {/* Pax Count */}
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase tracking-wider">عدد الأشخاص</label>
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-2 py-1">
                    <button 
                      onClick={() => setPax(Math.max(1, pax - 1))}
                      className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold"
                    >
                      -
                    </button>
                    <span className="flex-grow text-center font-bold text-slate-900">{pax}</span>
                    <button 
                      onClick={() => setPax(pax + 1)}
                      className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* City Selection */}
              {cities && (
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase tracking-wider">المدينة</label>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold focus:ring-2 ring-primary outline-none"
                  >
                    {cities.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Summary */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">السعر الإجمالي</span>
                  <div className="flex items-baseline gap-1 text-primary">
                    <span className="text-xl font-black">{pax * price}</span>
                    <span className="text-xs font-bold">₪</span>
                  </div>
                </div>
                <button 
                  onClick={handleWhatsAppBooking}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-green-900/10"
                >
                  <MessageCircle size={18} />
                  تأكيد واتساب
                </button>
              </div>
              <p className="text-[9px] font-bold text-slate-500 text-center px-4 leading-relaxed">
                🎁 احجز الآن واحصل مجاناً على &quot;دليل يارين الشامل&quot; - دليلك السري لتجربة تفوق التوقعات لتعرف ماذا تأكل، وكيف تكون جاهزاً لرحلة ولا غلطة!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TripCard;
