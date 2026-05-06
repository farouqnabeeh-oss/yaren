"use client";

import React, { useState, useEffect } from "react";
import {
  Save, Mail, Phone, Globe, Loader2, Check, Shield, Smartphone, MapPin,
  MessageCircle, Info, LayoutDashboard, Share2, Palette,
  Settings2, Zap, ChevronLeft, Lock, ArrowLeft, X, Video, Send, HelpCircle
} from "lucide-react";
import { getSettings, updateSettings } from "@/lib/actions/settings";
import { motion, AnimatePresence } from "framer-motion";

const SettingsPage = () => {
  const [settings, setSettings] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState("general");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { loadSettings(); }, []);

  const loadSettings = async () => { 
    try {
      setError(null);
      const data = await getSettings(); 
      if (data) {
        setSettings(data); 
      } else {
        setError("لم يتم العثور على إعدادات في النظام.");
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
      setError("فشل الاتصال بخادم البيانات. يرجى التحقق من جدار الحماية أو إعدادات DB.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData(e.currentTarget);
      const result = await updateSettings(formData);
      if (result.success) {
        await loadSettings();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert("خطأ أثناء الحفظ: " + (result.error || "تأكد من استجابة القاعدة"));
      }
    } catch (err) {
      alert("حدث خطأ تقني غير متوقع.");
    }
    setIsSaving(false);
  };

  if (error) return (
    <div className="h-[70vh] flex items-center justify-center p-6">
      <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-2xl text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 hover:rotate-0 transition-transform">
          <HelpCircle size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-3">فشل الوصول للبيانات</h2>
        <p className="text-slate-500 text-sm mb-10 leading-relaxed">{error}</p>
        <button 
          onClick={loadSettings}
          className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10"
        >
          <Zap size={18} /> إعادة محاولة الاتصال
        </button>
      </div>
    </div>
  );

  if (!settings) return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-50 border-t-indigo-600 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Settings2 size={20} className="text-indigo-600 animate-pulse" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-slate-900 font-bold text-lg">جاري تجهيز المنصة</p>
        <p className="text-slate-400 text-xs font-medium mt-1 animate-pulse">يتم الآن جلب إعدادات الوكالة...</p>
      </div>
    </div>
  );

  const sections = [
    { id: "general", label: "معلومات الوكالة", description: "الهوية والعناوين", icon: <LayoutDashboard size={18} /> },
    { id: "hero", label: "واجهة الموقع", description: "المحتوى الترحيبي", icon: <Palette size={18} /> },
    { id: "contact", label: "بيانات التواصل", description: "الهواتف والبريد", icon: <Smartphone size={18} /> },
    { id: "social", label: "منصات التواصل", description: "الروابط الاجتماعية", icon: <Share2 size={18} /> },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">إعدادات المنصة</h1>
          <p className="text-slate-500 text-sm font-medium">تحكم في هوية يارين تورز من لوحة تحكم واحدة.</p>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-emerald-500 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 shadow-lg shadow-emerald-500/20"
            >
              <Check size={18} strokeWidth={3} /> تم الحفظ بنجاح
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-72 shrink-0 space-y-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-right p-5 rounded-3xl transition-all duration-300 flex items-center gap-4 group relative ${activeSection === section.id
                ? "bg-white shadow-xl shadow-slate-200/50 border border-slate-100"
                : "hover:bg-slate-50 text-slate-400"
                }`}
            >
              <div className={`p-2.5 rounded-2xl transition-colors ${activeSection === section.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:text-slate-600"}`}>
                {section.icon}
              </div>
              <div className="flex flex-col">
                <span className={`text-[13px] font-black ${activeSection === section.id ? "text-slate-900" : "text-slate-500"}`}>
                  {section.label}
                </span>
                <span className="text-[10px] text-slate-400 font-bold mt-0.5">{section.description}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex-grow">
          <form onSubmit={handleSubmit} className="bg-white border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.02)] rounded-[3rem] overflow-hidden">
            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {activeSection === "general" && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 mr-1">اسم الموقع</label>
                          <input name="siteName" defaultValue={settings.siteName} className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 mr-1">العنوان الفعلي</label>
                          <input name="address" defaultValue={settings.address} className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 mr-1">نبذة عن الوكالة</label>
                        <textarea name="aboutText" defaultValue={settings.aboutText} rows={5} className="w-full bg-slate-50 border border-slate-50 rounded-[2rem] py-5 px-7 text-sm font-medium text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all resize-none text-right leading-relaxed shadow-sm" />
                      </div>
                    </div>
                  )}

                  {activeSection === "hero" && (
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 mr-1 text-amber-600">العنوان الترحيبي الرئيسي</label>
                        <input name="heroTitle" defaultValue={settings.heroTitle} className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-lg font-black text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 mr-1">النص الفرعي للواجهة</label>
                        <textarea name="heroSubtitle" defaultValue={settings.heroSubtitle} rows={3} className="w-full bg-slate-50 border border-slate-50 rounded-[2rem] py-5 px-7 text-sm font-medium text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all resize-none text-right leading-relaxed shadow-sm" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 mr-1">فيديو الواجهة (رابط)</label>
                        <input name="heroVideo" defaultValue={settings.heroVideo} placeholder="مثال: https://youtube.com/..." className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" />
                      </div>
                    </div>
                  )}

                  {activeSection === "contact" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 mr-1">البريد الإلكتروني</label>
                        <input name="email" defaultValue={settings.email} className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 mr-1 text-emerald-600">رقم الهاتف</label>
                        <input name="phone" defaultValue={settings.phone} className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 mr-1 text-emerald-600">رقم الواتساب</label>
                        <input name="whatsapp" defaultValue={settings.whatsapp} className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" />
                      </div>
                    </div>
                  )}

                  {activeSection === "social" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 mr-1">فيسبوك</label>
                        <input name="facebook" defaultValue={settings.facebook} className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 mr-1">انستقرام</label>
                        <input name="instagram" defaultValue={settings.instagram} className="w-full bg-slate-50 border border-slate-50 rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 outline-none focus:bg-white focus:border-indigo-500 transition-all text-right shadow-sm" />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
              <div className="hidden md:flex items-center gap-3 text-slate-400">
                <Shield size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">تشفير بيانات آمن</span>
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full md:w-auto bg-slate-900 text-white px-12 py-4 rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10"
              >
                {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                {isSaving ? "جاري الحفظ..." : "حفظ كافة التغييرات"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
