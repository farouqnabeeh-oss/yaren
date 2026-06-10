"use client";

import React, { useState } from "react";
import { Bus, Clock, MapPin, ChevronLeft, Calendar as CalendarIcon, Users, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BusTrips = ({ initialTrips = [] }: { initialTrips?: any[] }) => {
  const [bookingTripId, setBookingTripId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    date: "",
    pax: 1,
    city: "الناصرة"
  });

  // Safe parsing for days (can be JSON array or plain string)
  const trips = initialTrips.length > 0 ? initialTrips.map((t, idx) => {
    let parsedDays = ["يومياً"];
    try {
      if (typeof t.days === "string" && (t.days.startsWith("[") || t.days.startsWith("{"))) {
        parsedDays = JSON.parse(t.days);
      } else if (typeof t.days === "string") {
        parsedDays = t.days.split(",").map((d: string) => d.trim());
      } else if (Array.isArray(t.days)) {
        parsedDays = t.days;
      }
    } catch (e) {
      parsedDays = [t.days || "يومياً"];
    }

    return {
      ...t,
      id: t.id || idx,
      days: parsedDays
    };
  }) : [
    { id: 1, from: "الناصرة/كفركنا", to: "شرم الشيخ", days: ["الأحد", "الثلاثاء"], time: "06:00 AM", price: 330, type: "ذهاب وإياب" },
    { id: 2, from: "الناصرة/كفركنا", to: "إيلات", days: ["الأحد", "الثلاثاء"], time: "06:00 AM", price: 120, type: "ذهاب" },
    { id: 3, from: "الناصرة/كفركنا", to: "العقبة", days: ["الخميس"], time: "07:30 AM", price: 150, type: "ذهاب" }
  ];

  const handleBooking = (trip: any) => {
    const totalPrice = trip.price * formData.pax;
    const msg = `مرحباً يارين تورز، أرغب في تأكيد حجز توصيل باص:
الوجهة: ${trip.to} (${trip.type || "ذهاب وإياب"})
التاريخ المختار: ${formData.date}
عدد الأشخاص: ${formData.pax}
المدينة: ${formData.city}
السعر الإجمالي المتوقع: ${totalPrice} شيكل
يرجى تأكيد الحجز معي.`;

    window.open(`https://wa.me/972522340930?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="py-24 bg-white text-slate-900 relative border-t border-slate-100" id="bus-trips">
      {/* Background ambient glowing blur */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-right mb-16">
          <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            🚌 خدمات التوصيل المريحة
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">خطوط الباصات والمواصلات</h2>
          <p className="text-slate-600 font-medium">مواعيد ثابتة ومريحة لجميع وجهاتنا الرئيسية من الشمال.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <div key={trip.id} className="relative group">
              <div className={`bg-slate-50 p-8 rounded-[3rem] border transition-all duration-500 ${bookingTripId === trip.id ? "border-primary/50 shadow-2xl scale-[1.02] bg-slate-100" : "border-slate-100 shadow-sm hover:shadow-xl hover:bg-slate-100/50"}`}>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center">
                    <Bus size={28} />
                  </div>
                  <div className="text-3xl font-black text-slate-800">{trip.price} ₪</div>
                </div>

                <div className="space-y-4 mb-8 text-right">
                  <div className="flex items-center gap-3 justify-end text-slate-800">
                    <span className="font-black text-xl">{trip.to}</span>
                    <ChevronLeft className="text-slate-500" />
                    <span className="font-black text-xl">{trip.from}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-end text-slate-600 text-sm font-black">
                    <span className="bg-white px-3 py-1 rounded-full border border-slate-200">{trip.days.join(" • ")}</span>
                    <CalendarIcon size={16} className="text-primary" />
                  </div>
                  <div className="flex items-center gap-2 justify-end text-slate-600 text-sm font-black">
                    <span>الساعة {trip.time}</span>
                    <Clock size={16} className="text-primary" />
                  </div>
                </div>

                <button
                  onClick={() => setBookingTripId(bookingTripId === trip.id ? null : trip.id)}
                  className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${bookingTripId === trip.id ? "bg-slate-200 text-slate-700" : "bg-primary text-slate-900 hover:bg-primary/80"
                    }`}
                >
                  {bookingTripId === trip.id ? "إغلاق النموذج" : "احجز مقعدك الآن"}
                </button>

                {/* Booking Form Overlay/Expand */}
                <AnimatePresence>
                  {bookingTripId === trip.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 mt-8 border-t border-slate-200 space-y-5 text-right">
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">اختر التاريخ (الأيام المتاحة فقط)</label>
                          <div className="relative">
                            <input
                              type="date"
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary font-bold text-sm text-slate-900"
                              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                            <p className="text-[9px] text-primary font-bold mt-1">* تأكد من اختيار يوم يوافق: {trip.days.join(", ")}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">عدد الركاب</label>
                            <div className="flex items-center bg-white rounded-xl border border-slate-200 overflow-hidden">
                              <button onClick={() => setFormData({ ...formData, pax: Math.max(1, formData.pax - 1) })} className="p-3 text-slate-500 hover:text-primary">
                                -
                              </button>
                              <span className="flex-grow text-center font-black text-slate-900">{formData.pax}</span>
                              <button onClick={() => setFormData({ ...formData, pax: formData.pax + 1 })} className="p-3 text-slate-500 hover:text-primary">
                                +
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">المدينة / البلدة</label>
                            <input
                              type="text"
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary font-bold text-sm text-slate-900"
                              placeholder="مثال: كفركنا"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="bg-primary/5 p-4 rounded-2xl flex justify-between items-center border border-primary/10">
                          <span className="text-primary font-black text-xl">{trip.price * formData.pax} ₪</span>
                          <span className="text-primary text-[10px] font-black uppercase">السعر الإجمالي المتوقع</span>
                        </div>

                        <button
                          onClick={() => handleBooking(trip)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg shadow-green-500/10 transition-all cursor-pointer"
                        >
                          <MessageCircle size={20} />
                          تأكيد الحجز عبر واتساب
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusTrips;
