"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Bus,
  Edit3,
  Check,
  Loader2,
  ArrowRight,
  Clock,
  MapPin,
  X
} from "lucide-react";
import { getBusTrips, createBusTrip, deleteBusTrip, updateBusTrip } from "@/lib/actions/content";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const BusManager = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => { loadTrips(); }, []);
  const router = useRouter();
  const loadTrips = async () => { const data = await getBusTrips(); setTrips(data); };

  useEffect(() => {
    const handleSearch = (e: Event) => {
      const query = (e as CustomEvent).detail;
      setSearchQuery(query || "");
    };
    window.addEventListener("admin-search", handleSearch);
    return () => window.removeEventListener("admin-search", handleSearch);
  }, []);

  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (trip.from && trip.from.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (trip.to && trip.to.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openAddModal = () => { setEditingTrip(null); setIsModalOpen(true); };
  const openEditModal = (trip: any) => { setEditingTrip(trip); setIsModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    try {
      const formData = new FormData(e.currentTarget);
      const result = editingTrip ? await updateBusTrip(editingTrip.id, formData) : await createBusTrip(formData);
      if (result && result.success) {
        setIsModalOpen(false);
        await loadTrips();
        router.refresh();
      } else {
        setSaveError((result as any).error || "خطأ أثناء الحفظ");
      }
    } catch (err) {
      setSaveError("حدث خطأ غير متوقع.");
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("حذف هذا الخط؟")) { 
      await deleteBusTrip(id); 
      await loadTrips(); 
      router.refresh();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12" dir="rtl">
      {/* Header - Soft Minimal */}
      <div className="flex items-center justify-between px-4">
        <div className="text-right">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">خطوط الباصات</h1>
          <p className="text-slate-400 text-xs font-medium mt-1">أدر مسارات النقل البري والمواعيد.</p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all active:scale-95"
        >
          {Plus && <Plus size={16} />} خط باص جديد
        </button>
      </div>

      {/* List - Soft Minimal */}
      <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden">
        {filteredTrips.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-slate-300 font-bold text-sm">لا توجد خطوط باصات مطابقة للبحث</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filteredTrips.map((trip) => (
              <motion.div
                key={trip.id}
                className="group p-8 hover:bg-slate-50/50 transition-all"
              >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                  <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">الوجهة</p>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">{trip.to}</h3>
                    </div>

                    <div className="flex flex-col items-center gap-2 opacity-20 group-hover:opacity-100 transition-all">
                      {Bus && <Bus size={14} className="text-slate-900" />}
                      <div className="w-32 h-[1px] bg-slate-100" />
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">الانطلاق</p>
                      <h3 className="text-lg font-bold text-slate-900 tracking-tight">{trip.from}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 shrink-0">
                    <div className="text-right border-r border-slate-100 pr-8">
                      <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-1">السعر</p>
                      <p className="text-2xl font-black text-slate-900 tracking-tighter">₪{trip.price}</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEditModal(trip)} className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl border border-transparent hover:border-slate-100 transition-all">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDelete(trip.id)} className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-end gap-6 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  <span className="flex items-center gap-2"> {trip.days} {Clock && <Clock size={12} />}</span>
                  <div className="w-1 h-1 bg-slate-100 rounded-full" />
                  <span className="flex items-center gap-2"> {trip.time} {MapPin && <MapPin size={12} />}</span>
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
                  <h3 className="text-lg font-bold text-slate-900">{editingTrip ? "تعديل الخط" : "خط باص جديد"}</h3>
                  <p className="text-slate-400 text-[11px] font-medium">حدد مواعيد الانطلاق والمسارات بدقة.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-slate-900 transition-colors"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 text-right">
                    <label className="text-[11px] font-bold text-slate-500 mr-2">من (الانطلاق)</label>
                    <input name="from" defaultValue={editingTrip?.from} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" required />
                  </div>
                  <div className="space-y-2 text-right">
                    <label className="text-[11px] font-bold text-slate-500 mr-2">إلى (الوجهة)</label>
                    <input name="to" defaultValue={editingTrip?.to} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" required />
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <label className="text-[11px] font-bold text-slate-500 mr-2">الأيام</label>
                  <input name="days" defaultValue={editingTrip?.days} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" required />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 text-right">
                    <label className="text-[11px] font-bold text-slate-500 mr-2">الموعد</label>
                    <input name="time" defaultValue={editingTrip?.time} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" required />
                  </div>
                  <div className="space-y-2 text-right">
                    <label className="text-[11px] font-bold text-slate-500 mr-2">السعر (₪)</label>
                    <input name="price" type="number" defaultValue={editingTrip?.price} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" required />
                  </div>
                </div>

                <div className="pt-4">
                  {saveError && <p className="text-red-600 text-sm mb-4 text-center">{saveError}</p>}
                  <button type="submit" disabled={isSaving} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                    {isSaving ? "جاري الحفظ..." : "حفظ الخط"}
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
export default BusManager;
