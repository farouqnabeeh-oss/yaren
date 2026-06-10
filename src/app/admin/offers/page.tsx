"use client";

import React, { useState, useEffect } from "react";
import {
  Plus, Trash2, Image as LucideImageIcon, Edit3, Search,
  Loader2, X, Gift, Tag, Clock, DollarSign, Star, CheckCircle
} from "lucide-react";
import { getOffers, createOffer, deleteOffer, updateOffer } from "@/lib/actions/offers";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-5 text-sm text-slate-900 font-medium outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all text-right placeholder:text-slate-300";
const labelClass = "text-[11px] font-black text-slate-600 uppercase tracking-widest block mb-2 text-right";

const OffersManager = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [imageMode, setImageMode] = useState<"url" | "file">("url");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => { loadOffers(); }, []);

  useEffect(() => {
    const handleSearch = (e: Event) => {
      const query = (e as CustomEvent).detail;
      setSearchTerm(query || "");
    };
    window.addEventListener("admin-search", handleSearch);
    return () => window.removeEventListener("admin-search", handleSearch);
  }, []);

  const loadOffers = async () => {
    setIsLoading(true);
    const data = await getOffers();
    setOffers(data);
    setIsLoading(false);
  };

  const openAddModal = () => {
    setEditingOffer(null);
    setImagePreview("");
    setImageMode("url");
    setIsModalOpen(true);
  };

  const openEditModal = (offer: any) => {
    setEditingOffer(offer);
    setImagePreview(offer.image || "");
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

    const result = editingOffer ? await updateOffer(editingOffer.id, formData) : await createOffer(formData);
    if (result && result.success) {
      setIsModalOpen(false);
      await loadOffers();
      router.refresh();
    } else {
      alert("خطأ في الحفظ");
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("حذف هذا العرض الخاص؟")) {
      await deleteOffer(id);
      await loadOffers();
      router.refresh();
    }
  };

  const filteredOffers = offers.filter(offer =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8" dir="rtl">

      {/* Page Header */}
      <div
        className="relative rounded-3xl p-7 overflow-hidden flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, #fff1f2 0%, #fce7f3 100%)", border: "1px solid #fecdd3" }}
      >
        <div className="absolute left-0 top-0 w-40 h-40 opacity-20" style={{ background: "radial-gradient(circle, #fb7185, transparent 70%)" }} />
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500 flex items-center justify-center shadow-sm">
              <Gift size={16} className="text-white" />
            </div>
            <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">إدارة العروض</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">العروض الخاصة والتخفيضات</h1>
          <p className="text-sm text-slate-500 font-medium">أضف وعدّل العروض الحصرية ليارين تورز</p>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="بحث عن عرض..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-rose-200 rounded-2xl py-3 pr-10 pl-5 text-sm font-medium text-slate-900 focus:border-rose-400 outline-none transition-all w-56 text-right shadow-sm"
            />
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold text-white cursor-pointer transition-all hover:shadow-lg hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)", boxShadow: "0 4px 15px rgba(244,63,94,0.35)" }}
          >
            <Plus size={16} />
            إضافة عرض جديد
          </button>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "إجمالي العروض", value: offers.length, icon: Gift, color: "text-rose-600", bg: "bg-rose-50" },
          { label: "عروض نشطة", value: offers.filter(o => o.timeLeft).length, icon: Clock, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "عروض مميزة", value: offers.filter(o => o.originalPrice).length, icon: Tag, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl px-6 py-4 flex items-center gap-4"
            style={{ border: "1px solid #e2e8f0" }}
          >
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-400 font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="animate-spin text-rose-400" size={28} />
        </div>
      ) : filteredOffers.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-24 rounded-3xl"
          style={{ border: "2px dashed #fecdd3", background: "#fff1f2" }}
        >
          <Gift size={40} className="text-rose-300 mb-4" />
          <p className="text-base font-bold text-slate-600 mb-1">لا توجد عروض بعد</p>
          <p className="text-sm text-slate-400 font-medium mb-6">أضف أول عرض خاص من يارين تورز</p>
          <button
            onClick={openAddModal}
            className="px-6 py-3 rounded-2xl text-sm font-bold text-white cursor-pointer"
            style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)" }}
          >
            إضافة عرض
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ border: "1px solid #e2e8f0" }}
            >
              {/* Image */}
              <div className="h-52 bg-slate-100 relative overflow-hidden">
                {offer.image ? (
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200 bg-slate-50">
                    <LucideImageIcon size={36} strokeWidth={1} />
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Action Buttons */}
                <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <button
                    onClick={() => openEditModal(offer)}
                    className="w-9 h-9 bg-white/95 backdrop-blur rounded-xl flex items-center justify-center text-slate-700 shadow-md hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(offer.id)}
                    className="w-9 h-9 bg-rose-500/95 backdrop-blur rounded-xl flex items-center justify-center text-white shadow-md hover:bg-rose-600 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Tag Badge */}
                {offer.tag && (
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-xl text-[10px] font-black text-white shadow-sm"
                    style={{ background: "linear-gradient(135deg, #f97316, #ef4444)" }}
                  >
                    {offer.tag}
                  </div>
                )}

                {/* Time Left */}
                {offer.timeLeft && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                    <Clock size={11} className="text-amber-400" />
                    <span className="text-[10px] font-bold text-white">{offer.timeLeft}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 text-right">
                <div>
                  <h3 className="font-black text-slate-900 text-sm leading-snug mb-1.5">{offer.title}</h3>
                  <p className="text-xs text-slate-400 font-medium line-clamp-2 leading-relaxed">{offer.description}</p>
                </div>

                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: "1px solid #f1f5f9" }}
                >
                  <button
                    onClick={() => openEditModal(offer)}
                    className="text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 size={12} />
                    تعديل
                  </button>
                  <div className="flex items-baseline gap-2">
                    {offer.originalPrice && (
                      <span className="text-xs text-slate-300 font-bold line-through">₪{offer.originalPrice}</span>
                    )}
                    <span className="text-xl font-black text-slate-900">₪{offer.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 max-h-[92vh] flex flex-col"
            >
              {/* Modal Header */}
              <div
                className="px-8 py-6 flex items-center justify-between flex-row-reverse"
                style={{ borderBottom: "1px solid #f1f5f9" }}
              >
                <div className="text-right">
                  <h3 className="text-lg font-black text-slate-900">
                    {editingOffer ? "تعديل العرض" : "عرض خاص جديد"}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {editingOffer ? "عدّل تفاصيل العرض الحالي" : "أضف عرضاً حصرياً جديداً"}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">

                <div>
                  <label className={labelClass}>عنوان العرض</label>
                  <input name="title" defaultValue={editingOffer?.title} className={inputClass} placeholder="مثال: رحلة إسطنبول العائلية" required />
                </div>

                <div>
                  <label className={labelClass}>وصف العرض</label>
                  <textarea name="description" defaultValue={editingOffer?.description} rows={3} className={inputClass.replace("py-3.5", "py-3") + " resize-none leading-relaxed"} placeholder="اكتب وصفاً جذاباً للعرض..." required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>السعر الحالي (₪)</label>
                    <input name="price" defaultValue={editingOffer?.price} className={inputClass} placeholder="مثال: 2500" required />
                  </div>
                  <div>
                    <label className={labelClass}>السعر قبل الخصم (₪)</label>
                    <input name="originalPrice" defaultValue={editingOffer?.originalPrice} className={inputClass} placeholder="اختياري" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>التاغ / الشارة</label>
                    <input name="tag" defaultValue={editingOffer?.tag} className={inputClass} placeholder="مثال: خصم 20%" />
                  </div>
                  <div>
                    <label className={labelClass}>الوقت المتبقي</label>
                    <input name="timeLeft" defaultValue={editingOffer?.timeLeft} className={inputClass} placeholder="مثال: يومين متبقيين" />
                  </div>
                </div>

                {/* Image Section */}
                <div>
                  <label className={labelClass}>صورة العرض</label>
                  <div className="flex bg-slate-100 p-1 rounded-2xl gap-1 mb-3">
                    <button
                      type="button"
                      onClick={() => setImageMode("url")}
                      className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all ${imageMode === "url" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}
                    >
                      رابط URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageMode("file")}
                      className={`flex-1 py-2.5 rounded-xl text-[11px] font-bold transition-all ${imageMode === "file" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}
                    >
                      رفع ملف
                    </button>
                  </div>
                  {imageMode === "url" ? (
                    <input
                      name="image"
                      defaultValue={editingOffer?.image}
                      onChange={(e) => setImagePreview(e.target.value)}
                      placeholder="https://..."
                      className={inputClass}
                    />
                  ) : (
                    <div className="relative">
                      <input type="file" accept="image/*" onChange={handleFileChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-5 text-sm text-slate-400 cursor-pointer" />
                      {isUploading && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl">
                          <Loader2 className="animate-spin text-rose-400" size={18} />
                        </div>
                      )}
                    </div>
                  )}
                  {imagePreview && (
                    <div className="mt-3 h-32 rounded-2xl overflow-hidden bg-slate-100">
                      <img src={imagePreview} alt="preview" className="w-full h-full object-cover" onError={() => setImagePreview("")} />
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="w-full py-4 rounded-2xl font-black text-sm text-white cursor-pointer transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #f43f5e, #e11d48)", boxShadow: "0 4px 15px rgba(244,63,94,0.35)" }}
                >
                  {isSaving ? (
                    <><Loader2 size={16} className="animate-spin" /> جاري الحفظ...</>
                  ) : (
                    <><CheckCircle size={16} /> {editingOffer ? "حفظ التعديلات" : "إضافة العرض"}</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OffersManager;
