"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { motion } from "framer-motion";

import { useSettings } from "@/components/SettingsProvider";

const ContactPage = () => {
  const settings = useSettings();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "استفسار عن رحلة",
    message: ""
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `مرحباً يارين تورز، أنا ${formData.name}.
الموضوع: ${formData.subject}
رقم الهاتف: ${formData.phone}
الرسالة: ${formData.message}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = settings.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/10 -z-0" />
        <div className="max-w-4xl mt-10 mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            تواصل <span className="text-primary">معنا</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            فريقنا متوفر لخدمتكم والإجابة على استفساراتكم من لحظة الحجز وحتى العودة للبلاد بسلامة.
          </motion.p>
        </div>
      </section>

      <section className="py-20 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              {[
                { icon: Phone, label: "رقم الهاتف", value: "+972 52-234-0930", color: "bg-blue-500" },
                { icon: MessageCircle, label: "واتساب", value: "مراسلة مباشرة 24/7", color: "bg-green-500" },
                { icon: Mail, label: "البريد الإلكتروني", value: "Yreen.ab@gmail.com", color: "bg-orange-500" },
                { icon: MapPin, label: "المكتب الرئيسي", value: "كفركنا، المركز التجاري الرئيسي", color: "bg-red-500" },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-xl transition-all group"
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.color} text-white flex items-center justify-center shrink-0 shadow-lg`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{item.label}</span>
                    <span className="font-bold text-slate-900">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100"
            >
              <h2 className="text-2xl font-black text-slate-900 mb-8">أرسل لنا رسالة سريعة</h2>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 mr-2">الاسم الكامل</label>
                    <input 
                      type="text" 
                      required
                      placeholder="أدخل اسمك هنا..." 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 ring-primary outline-none transition-all font-bold"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 mr-2">رقم الهاتف</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="05X-XXXXXXX" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 ring-primary outline-none transition-all font-bold"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">الموضوع</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 ring-primary outline-none transition-all font-bold cursor-pointer"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  >
                    <option>استفسار عن رحلة منظمة</option>
                    <option>حجز فندق ومنتجع</option>
                    <option>توصيل باصات</option>
                    <option>عرض طيران</option>
                    <option>أخرى</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 mr-2">رسالتك</label>
                  <textarea 
                    rows={5} 
                    required
                    placeholder="كيف يمكننا مساعدتك اليوم؟" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 ring-primary outline-none transition-all resize-none font-bold"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-primary/90 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/30 active:scale-95"
                >
                  <MessageCircle size={24} />
                  إرسال عبر الواتساب
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
