"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Plane,
  Edit3,
  Loader2,
  ArrowRight,
  X
} from "lucide-react";
import { getFlights, createFlight, deleteFlight, updateFlight } from "@/lib/actions/flights";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const FlightsManager = () => {
  const [flights, setFlights] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFlight, setEditingFlight] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => { loadFlights(); }, []);
  const loadFlights = async () => { const data = await getFlights(); setFlights(data); };

  const openAddModal = () => { setEditingFlight(null); setIsModalOpen(true); };
  const openEditModal = (flight: any) => { setEditingFlight(flight); setIsModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const result = editingFlight ? await updateFlight(editingFlight.id, formData) : await createFlight(formData);
    if (result && result.success) { 
      setIsModalOpen(false); 
      await loadFlights(); 
      router.refresh();
      router.replace("/admin");
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("حذف العرض؟")) { 
      await deleteFlight(id); 
      await loadFlights(); 
      router.refresh();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12" dir="rtl">
      {/* Header - Soft Minimal */}
      <div className="flex items-center justify-between px-4">
        <div className="text-right">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">عروض الطيران</h1>
          <p className="text-slate-400 text-xs font-medium mt-1">أدر وجهات السفر الجوي والأسعار.</p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all active:scale-95"
        >
          {Plus && <Plus size={16} />} عرض طيران جديد
        </button>
      </div>

      {/* List - Soft Minimal Ticket Feel */}
      <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden">
        {flights.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-slate-300 font-bold text-sm">لا توجد عروض طيران حالياً</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {flights.map((flight) => (
              <motion.div
                key={flight.id}
                className="group p-8 hover:bg-slate-50/50 transition-all"
              >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                  <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">الوجهة</p>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">{flight.to}</h3>
                    </div>

                    <div className="flex flex-col items-center gap-2 opacity-20 group-hover:opacity-100 transition-all">
                      {Plane && <Plane size={14} className="text-slate-900 group-hover:translate-x-2 transition-transform duration-700" />}
                      <div className="w-32 h-[1px] bg-slate-100" />
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">الانطلاق</p>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">{flight.from}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 shrink-0">
                    <div className="text-right border-r border-slate-100 pr-8">
                      <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-1">السعر</p>
                      <p className="text-2xl font-black text-slate-900 tracking-tighter">₪{flight.price}</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEditModal(flight)} className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl border border-transparent hover:border-slate-100 transition-all">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDelete(flight.id)} className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-end gap-6 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  <span>{flight.availableDays || flight.days}</span>
                  <div className="w-1 h-1 bg-slate-100 rounded-full" />
                  <span>{flight.cabin || flight.type}</span>
                  <div className="w-1 h-1 bg-slate-100 rounded-full" />
                  <span className="text-slate-900">{flight.airline}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal - Soft Minimal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl relative z-10"
            >
              <div className="p-10 border-b border-slate-50 flex items-center justify-between flex-row-reverse shrink-0">
                <div className="text-right">
                  <h3 className="text-lg font-bold text-slate-900">{editingFlight ? "تعديل المسار" : "مسار جوي جديد"}</h3>
                  <p className="text-slate-400 text-[11px] font-medium">حدد تفاصيل الرحلة لبرمجتها في النظام.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-slate-900 transition-colors"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 text-right">
                    <label className="text-[11px] font-bold text-slate-500 mr-2">من (الانطلاق)</label>
                    <input name="from" defaultValue={editingFlight?.from} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" required />
                  </div>
                  <div className="space-y-2 text-right">
                    <label className="text-[11px] font-bold text-slate-500 mr-2">إلى (الوجهة)</label>
                    <input name="to" defaultValue={editingFlight?.to} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 text-right">
                    <label className="text-[11px] font-bold text-slate-500 mr-2">الأيام</label>
                    <input name="days" defaultValue={editingFlight?.availableDays || editingFlight?.days} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" placeholder="مثلاً: يومياً" required />
                  </div>
                  <div className="space-y-2 text-right">
                    <label className="text-[11px] font-bold text-slate-500 mr-2">نوع الرحلة</label>
                    <input name="type" defaultValue={editingFlight?.cabin || editingFlight?.type} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" placeholder="مثلاً: ذهاب وإياب" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 text-right">
                    <label className="text-[11px] font-bold text-slate-500 mr-2">شركة الطيران</label>
                    <input name="airline" defaultValue={editingFlight?.airline} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" required />
                  </div>
                  <div className="space-y-2 text-right">
                    <label className="text-[11px] font-bold text-slate-500 mr-2">السعر (₪)</label>
                    <input name="price" type="number" defaultValue={editingFlight?.price} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" required />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={isSaving} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                    {isSaving ? "جاري الحفظ..." : "حفظ العرض"}
                    <ArrowRight size={16} className="rotate-180" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default FlightsManager;
