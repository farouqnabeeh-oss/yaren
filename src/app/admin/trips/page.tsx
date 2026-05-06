"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Image as LucideImageIcon, 
  Edit3, 
  Search,
  Clock,
  ArrowRight,
  Loader2,
  X,
  MapPin
} from "lucide-react";
import { getTrips, createTrip, deleteTrip, updateTrip } from "@/lib/actions/trips";
import { motion, AnimatePresence } from "framer-motion";

const TripsManager = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [imageMode, setImageMode] = useState<"url" | "file">("url");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => { loadTrips(); }, []);
  const loadTrips = async () => { const data = await getTrips(); setTrips(data); };

  const openAddModal = () => {
    setEditingTrip(null);
    setImagePreview("");
    setImageMode("url");
    setIsModalOpen(true);
  };

  const openEditModal = (trip: any) => {
    setEditingTrip(trip);
    setImagePreview(trip.image || "");
    setImageMode("url");
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        setImagePreview(url);
      }
    } catch {
      alert("فشل رفع الصورة");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    if (imageMode === "file" && imagePreview) formData.set("image", imagePreview);

    const result = editingTrip ? await updateTrip(editingTrip.id, formData) : await createTrip(formData);
    if (result && result.success) {
      setIsModalOpen(false);
      await loadTrips();
    } else {
      alert("خطأ في الحفظ");
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("حذف هذه الرحلة؟")) { await deleteTrip(id); loadTrips(); }
  };

  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12" dir="rtl">
      {/* Header - Soft Minimal */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-4">
        <div className="text-right">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">إدارة البرامج والرحلات</h1>
          <p className="text-slate-400 text-xs font-medium mt-1">صمم وخصص برامج السفر السياحية.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="البحث عن رحلة..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-100 rounded-xl py-2.5 pr-10 pl-4 text-[13px] font-medium text-slate-900 focus:bg-white focus:border-slate-200 outline-none transition-all w-64 text-right"
            />
          </div>
          <button 
            onClick={openAddModal} 
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all active:scale-95"
          >
            <Plus size={16} /> إضافة برنامج
          </button>
        </div>
      </div>

      {/* Grid View - Soft Minimal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {filteredTrips.map((trip) => (
          <motion.div 
            key={trip.id} 
            className="group bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-900/5 transition-all duration-500"
          >
            {/* Image Preview */}
            <div className="h-48 bg-slate-50 relative overflow-hidden">
               {trip.image ? (
                 <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-slate-200">
                   <LucideImageIcon size={32} strokeWidth={1} />
                 </div>
               )}
               <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => openEditModal(trip)} className="w-9 h-9 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center text-slate-900 shadow-sm border border-white/20 hover:bg-white"><Edit3 size={14} /></button>
                  <button onClick={() => handleDelete(trip.id)} className="w-9 h-9 bg-rose-500/90 backdrop-blur rounded-lg flex items-center justify-center text-white shadow-sm border border-white/20 hover:bg-rose-500"><Trash2 size={14} /></button>
               </div>
            </div>

            {/* Content */}
            <div className="p-6 text-right space-y-4">
               <div className="space-y-1">
                  <div className="flex items-center justify-end gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                     <span>{trip.duration}</span>
                     <div className="w-1 h-1 bg-slate-100 rounded-full" />
                     <span className="text-emerald-500">نشط</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 truncate">{trip.title}</h3>
               </div>

               <div className="flex items-center justify-between flex-row-reverse pt-4 border-t border-slate-50">
                  <div className="text-right">
                     <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">التكلفة</p>
                     <p className="text-lg font-black text-slate-900 tracking-tighter">₪{trip.price}</p>
                  </div>
                  <button onClick={() => openEditModal(trip)} className="text-[11px] font-bold text-slate-400 hover:text-slate-900 transition-colors">عرض التفاصيل</button>
               </div>
            </div>
          </motion.div>
        ))}
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
              className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl relative z-10 max-h-[92vh] flex flex-col"
            >
              <div className="p-10 border-b border-slate-50 flex items-center justify-between flex-row-reverse shrink-0">
                <div className="text-right">
                  <h3 className="text-lg font-bold text-slate-900">{editingTrip ? "تعديل البرنامج" : "برنامج سياحي جديد"}</h3>
                  <p className="text-slate-400 text-[11px] font-medium">حدد تفاصيل الرحلة بدقة ووضوح.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-slate-900 transition-colors"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
                 <div className="space-y-2 text-right">
                    <label className="text-[11px] font-bold text-slate-500 mr-2">اسم البرنامج</label>
                    <input name="title" defaultValue={editingTrip?.title} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" required />
                 </div>

                 <div className="space-y-2 text-right">
                    <label className="text-[11px] font-bold text-slate-500 mr-2">وصف الرحلة</label>
                    <textarea name="description" defaultValue={editingTrip?.description} rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 px-6 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all resize-none text-right leading-relaxed" required />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 text-right">
                       <label className="text-[11px] font-bold text-slate-500 mr-2">التكلفة (₪)</label>
                       <input name="price" type="number" defaultValue={editingTrip?.price} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" required />
                    </div>
                    <div className="space-y-2 text-right">
                       <label className="text-[11px] font-bold text-slate-500 mr-2">المدة</label>
                       <input name="duration" defaultValue={editingTrip?.duration} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" placeholder="مثلاً: 5 أيام" required />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[11px] font-bold text-slate-500 mr-2 text-right block">صورة البرنامج</label>
                    <div className="flex bg-slate-50 p-1 rounded-xl gap-1">
                      <button type="button" onClick={() => setImageMode("url")} className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold transition-all ${imageMode === "url" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}>رابط URL</button>
                      <button type="button" onClick={() => setImageMode("file")} className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold transition-all ${imageMode === "file" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}>رفع ملف</button>
                    </div>
                    {imageMode === "url" ? (
                      <input name="image" defaultValue={editingTrip?.image} placeholder="https://..." className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-xs text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" />
                    ) : (
                      <div className="relative">
                        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-5 text-xs text-slate-400 cursor-pointer" />
                        {isUploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl"><Loader2 className="animate-spin text-slate-400" size={18} /></div>}
                      </div>
                    )}
                 </div>

                 <div className="pt-4 shrink-0">
                    <button type="submit" disabled={isSaving || isUploading} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                       {isSaving ? "جاري الحفظ..." : "حفظ البرنامج"}
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
export default TripsManager;
