"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "@/components/SettingsProvider";

export default function ContactPage() {
  const settings = useSettings();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "استفسار عن رحلة منظمة",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({ name: "", phone: "", subject: "استفسار عن رحلة منظمة", message: "" });
      } else {
        setError(data.error || "حدث خطأ غير متوقع أثناء إرسال الرسالة.");
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم، يرجى التحقق من اتصالك بالإنترنت.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    const textMsg = `مرحباً يارين تورز، أنا ${formData.name || "مهتم بالخدمات"}.
الموضوع: ${formData.subject}
رقم الهاتف: ${formData.phone || "غير محدد"}
الرسالة: ${formData.message || "أود الاستفسار عن تفاصيل الحجز"}`;

    const encoded = encodeURIComponent(textMsg);
    const whatsappNum = settings.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${whatsappNum}?text=${encoded}`, "_blank");
  };

  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 font-sans relative overflow-hidden" dir="rtl">
      <Navbar />

      {/* Background ambient glowing blurs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-44 pb-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-slate-50 text-primary border border-slate-200/60 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
          >
            <MessageCircle size={14} className="animate-pulse" />
            يسعدنا تواصلكم
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black mb-6 text-slate-900 leading-tight"
          >
            تواصل <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-orange-400 font-black">معنا</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          >
            نحن هنا لمساعدتك والإجابة على أي استفسارات تخص حجز الطيران، الفنادق، أو الرحلات المنظمة. فريقنا متوفر على مدار الساعة.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards & Form Container */}
      <section className="pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Quick Contact Info */}
            <div className="space-y-6">
              {[
                { icon: Phone, label: "رقم الهاتف والاتصال", value: settings.phone, color: "from-blue-500/10 to-blue-600/5 border-blue-200 text-blue-600" },
                { icon: MessageCircle, label: "واتساب مباشر 24/7", value: "مراسلة فورية ودعم سريع", color: "from-emerald-500/10 to-emerald-600/5 border-emerald-200 text-emerald-600", isClickable: true },
                { icon: Mail, label: "البريد الإلكتروني", value: settings.email, color: "from-orange-500/10 to-orange-600/5 border-orange-200 text-orange-600" },
                { icon: MapPin, label: "الموقع الرئيسي والمكتب", value: settings.address, color: "from-pink-500/10 to-pink-600/5 border-pink-200 text-pink-600" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  onClick={item.isClickable ? handleWhatsAppClick : undefined}
                  className={`bg-slate-50 p-6 rounded-3xl border flex items-center gap-5 hover:bg-slate-100/50 transition-all cursor-pointer group select-none ${item.color}`}
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 shadow-sm group-hover:scale-105 transition-transform">
                    <item.icon size={26} />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{item.label}</span>
                    <span className="font-bold text-slate-800 text-sm md:text-base leading-none">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-xl relative"
            >
              <h2 className="text-2xl font-black text-slate-800 mb-8">أرسل لنا استفساراً</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-right">
                    <label className="text-xs font-black text-slate-600 mr-2">الاسم الكامل</label>
                    <input
                      type="text"
                      required
                      placeholder="أدخل اسمك الكريم هنا..."
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 ring-primary outline-none transition-all font-bold text-sm text-slate-900 text-right placeholder-slate-400"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2 text-right">
                    <label className="text-xs font-black text-slate-600 mr-2">رقم الهاتف للاتصال</label>
                    <input
                      type="tel"
                      required
                      placeholder="مثال: 052-234-0930"
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 ring-primary outline-none transition-all font-bold text-sm text-slate-900 text-right placeholder-slate-400"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <label className="text-xs font-black text-slate-600 mr-2">نوع الخدمة / الموضوع</label>
                  <select
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 ring-primary outline-none transition-all font-bold text-sm text-slate-900 cursor-pointer"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="استفسار عن رحلة منظمة">استفسار عن رحلة منظمة</option>
                    <option value="حجز فنادق ومنتجعات">حجز فنادق ومنتجعات</option>
                    <option value="توصيل وحجز باصات">توصيل وحجز باصات</option>
                    <option value="عروض طيران خاصة">عروض طيران خاصة</option>
                    <option value="استفسار عام أو شكوى">استفسار عام أو شكوى</option>
                  </select>
                </div>

                <div className="space-y-2 text-right">
                  <label className="text-xs font-black text-slate-600 mr-2">رسالتك بالتفصيل</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="اكتب رسالتك أو استفسارك هنا وسيقوم فريقنا بالرد عليك فوراً..."
                    className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 ring-primary outline-none transition-all resize-none font-bold text-sm text-slate-900 leading-relaxed text-right placeholder-slate-400"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-2xl text-xs font-bold text-right"
                  >
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Form Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-600 hover:bg-primary text-white py-4.5 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-600/15 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        <span>إرسال عبر النظام</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="w-full bg-white hover:bg-slate-50 text-slate-700 py-4.5 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all border border-slate-200 cursor-pointer"
                  >
                    <MessageCircle size={18} className="text-emerald-500" />
                    <span>مراسلة واتساب فورية</span>
                  </button>
                </div>
              </form>

              {/* Success Overlay Popup */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/98 rounded-[3rem] flex flex-col items-center justify-center p-8 text-center z-20"
                  >
                    <motion.div
                      initial={{ scale: 0.8, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20 shadow-lg"
                    >
                      <CheckCircle2 size={40} className="text-emerald-500" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">تم إرسال رسالتك بنجاح!</h3>
                    <p className="text-slate-600 font-medium max-w-sm mb-8 leading-relaxed text-sm">
                      شكراً لتواصلك مع يارين تورز. تم استلام رسالتك وحفظها في لوحة تحكم الإدارة، وسيتواصل معك أحد خبراؤنا قريباً جداً.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-3.5 rounded-xl font-bold text-sm transition-all border border-slate-200 cursor-pointer"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

          {/* Embedded Google Map Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-black text-slate-800 mb-6 pr-2">موقعنا الجغرافي</h3>
            <div className="w-full h-96 rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl relative">
              <iframe
                src="https://maps.google.com/maps?q=Kafr%20Kanna&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="موقع يارين تورز - كفركنا"
              />
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
