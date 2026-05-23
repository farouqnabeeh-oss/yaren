"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  MapPin, 
  Edit3, 
  Image as LucideImageIcon,
  Star,
  Upload,
  Link as LinkIcon,
  Loader2,
  ArrowRight,
  MoreVertical,
  X
} from "lucide-react";
import { getHotels, createHotel, deleteHotel, updateHotel } from "@/lib/actions/hotels";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const HotelsManager = () => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [imageMode, setImageMode] = useState<"url" | "file">("url");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => { loadHotels(); }, []);
  const loadHotels = async () => { const data = await getHotels(); setHotels(data); };

  const openAddModal = () => {
    setEditingHotel(null);
    setImagePreview("");
    setImageMode("url");
    setIsModalOpen(true);
  };

  const openEditModal = (hotel: any) => {
    setEditingHotel(hotel);
    setImagePreview(hotel.image || "");
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

    const result = editingHotel ? await updateHotel(editingHotel.id, formData) : await createHotel(formData);
    if (result && result.success) {
      setIsModalOpen(false);
      await loadHotels();
      router.refresh();
      router.replace("/admin");
    } else {
      alert("خطأ في الحفظ");
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("حذف هذا الفندق؟")) { 
      await deleteHotel(id); 
      await loadHotels(); 
      router.refresh();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12" dir="rtl">
      {/* Header - Minimal Soft */}
      <div className="flex items-center justify-between px-4">
        <div className="text-right">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">إدارة الفنادق</h1>
          <p className="text-slate-400 text-xs font-medium mt-1">أضف ونظم وجهات الإقامة السياحية.</p>
        </div>
        
        <button 
          onClick={openAddModal} 
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all active:scale-95"
        >
          <Plus size={16} /> إضافة فندق
        </button>
      </div>

      {/* List View - Soft Minimal */}
      <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden">
        {hotels.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-slate-300 font-bold text-sm">لا توجد فنادق مضافة حالياً</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {hotels.map((hotel) => (
              <motion.div 
                key={hotel.id} 
                className="group flex items-center justify-between p-6 hover:bg-slate-50/50 transition-all"
              >
                <div className="flex items-center gap-6">
                  {/* Small Neat Preview */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                    {hotel.image ? (
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200">
                        {LucideImageIcon && <LucideImageIcon size={20} />}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <h3 className="text-sm font-bold text-slate-900">{hotel.name}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                       <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium"><MapPin size={10} /> {hotel.region || hotel.city}</span>
                       <div className="w-1 h-1 bg-slate-100 rounded-full" />
                       <span className="flex items-center gap-0.5 text-[10px] text-amber-500 font-bold">{hotel.stars} <Star size={10} className="fill-amber-500" /></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(hotel)} className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl border border-transparent hover:border-slate-100 transition-all">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => handleDelete(hotel.id)} className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                    <Trash2 size={16} />
                  </button>
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
              className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl relative z-10"
            >
              <div className="p-10 border-b border-slate-50 flex items-center justify-between flex-row-reverse">
                <div className="text-right">
                  <h3 className="text-lg font-bold text-slate-900">{editingHotel ? "تعديل الفندق" : "فندق جديد"}</h3>
                  <p className="text-slate-400 text-[11px] font-medium">أدخل البيانات المطلوبة بدقة.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-300 hover:text-slate-900 transition-colors"><X size={20} /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-8">
                 <div className="space-y-2 text-right">
                    <label className="text-[11px] font-bold text-slate-500 mr-2">اسم الفندق</label>
                    <input name="name" defaultValue={editingHotel?.name} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" required />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 text-right">
                       <label className="text-[11px] font-bold text-slate-500 mr-2">المدينة</label>
                       <input name="region" defaultValue={editingHotel?.region || editingHotel?.city} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" required />
                    </div>
                    <div className="space-y-2 text-right">
                       <label className="text-[11px] font-bold text-slate-500 mr-2">النجوم</label>
                       <select name="stars" defaultValue={editingHotel?.stars || "5"} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-sm text-slate-900 font-bold outline-none focus:bg-white focus:border-slate-900 transition-all text-right appearance-none">
                         {[5,4,3,2,1].map(s => <option key={s} value={s}>{s} نجوم</option>)}
                       </select>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-[11px] font-bold text-slate-500 mr-2 text-right block">صورة الفندق</label>
                    <div className="flex bg-slate-50 p-1 rounded-xl gap-1">
                      <button type="button" onClick={() => setImageMode("url")} className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold transition-all ${imageMode === "url" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}>رابط URL</button>
                      <button type="button" onClick={() => setImageMode("file")} className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold transition-all ${imageMode === "file" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}>رفع ملف</button>
                    </div>
                    
                    {imageMode === "url" ? (
                      <input name="image" defaultValue={editingHotel?.image} placeholder="https://..." className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 text-xs text-slate-900 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all text-right" />
                    ) : (
                      <div className="relative">
                        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-5 text-xs text-slate-400 cursor-pointer" />
                        {isUploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl"><Loader2 className="animate-spin text-slate-400" size={18} /></div>}
                      </div>
                    )}
                 </div>

                 <div className="pt-4">
                    <button type="submit" disabled={isSaving || isUploading} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                       {isSaving ? "جاري الحفظ..." : "حفظ الفندق"}
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
export default HotelsManager;
