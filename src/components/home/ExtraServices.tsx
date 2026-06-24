"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Wifi, Smartphone, DollarSign, Headset, Zap, ExternalLink, MapPin, Clock } from "lucide-react";
// import removed; using fetch API for crossings

export const ESimoSection = ({ code, discount }: { code?: string, discount?: string }) => {
  return (
    <section className="py-24 bg-white text-slate-900 overflow-hidden relative border-t border-slate-100" id="esimo">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8 text-right">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                خليك شابك وين ما كنت بالعالم مع خدمة <span className="text-primary">eSIMo</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                سفرك صار أريح وبدون وجع راس تبديل الشرايح. مع الشريحة الإلكترونية من يارين تورز، انترنتك معك من لحظة وصولك.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {[
                  { icon: <Globe className="text-primary" />, title: "تغطية عالمية", desc: "أكثر من 200 وجهة" },
                  { icon: <DollarSign className="text-primary" />, title: "أسعار منافسة", desc: "تبدأ من $3.9" },
                  { icon: <Headset className="text-primary" />, title: "دعم 24/7", desc: "فريقنا معك دائماً" },
                  { icon: <Zap className="text-primary" />, title: "تفعيل بلمحة بصر", desc: "بسيط بكود QR" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-slate-100/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-l from-primary to-orange-500 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
                <div>
                  <p className="text-white/90 font-bold mb-1">استخدم كود الخصم عند الدفع:</p>
                  <div className="text-3xl font-black text-white tracking-widest">{code || "YAREN"}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">خصم {discount || "10%"} فوري</div>
                  <p className="text-white/90 text-xs font-bold">لحاملي بطاقة يارين تورز</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" 
                alt="eSIM" 
                className="rounded-[3rem] shadow-2xl relative z-10 border border-slate-200/50"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2.5rem] shadow-2xl z-20 hidden md:block border border-slate-100 text-slate-900">
                <div className="flex items-center gap-4 mb-4">
                  <Smartphone className="text-primary" size={32} />
                  <div>
                    <h4 className="font-black text-lg">حمل التطبيق الآن</h4>
                    <p className="text-xs text-slate-500 font-bold">متوفر على iOS و Android</p>
                  </div>
                </div>
                <a 
                  href="https://esimo.sng.link/Dfwtk/8vfdl?pcn=yaren&_smtype=3" 
                  target="_blank" 
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
                >
                  تنزيل التطبيق <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const BorderCrossings = () => {
  const [crossings, setCrossings] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/crossings')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setCrossings(data);
        } else {
          setCrossings([
            {
              name: "معبر نهر الأردن",
              link: "https://www.iaa.gov.il/land-border-crossings/jordan-river/",
              hoursLink: "https://www.iaa.gov.il/land-border-crossings/jordan-river/opening-hours-jorden-river/",
              image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&q=80&w=800"
            },
            {
              name: "معبر طابا",
              link: "https://www.iaa.gov.il/land-border-crossings/menachem-begin/",
              hoursLink: "https://www.iaa.gov.il/land-border-crossings/menachem-begin/opening-hours-begin/",
              image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800"
            },
            {
              name: "معبر إسحاق رابين (العقبة)",
              link: "https://www.iaa.gov.il/land-border-crossings/yitzhak-rabin/",
              hoursLink: "https://www.iaa.gov.il/land-border-crossings/yitzhak-rabin/opening-hours-rabin/",
              image: "https://images.unsplash.com/photo-1579606031828-567a42a03362?auto=format&fit=crop&q=80&w=800"
            }
          ]);
        }
      })
      .catch((err) => {
        console.error("Error fetching crossings:", err);
        // fallback to defaults
        setCrossings([
          {
            name: "معبر نهر الأردن",
            link: "https://www.iaa.gov.il/land-border-crossings/jordan-river/",
            hoursLink: "https://www.iaa.gov.il/land-border-crossings/jordan-river/opening-hours-jorden-river/",
            image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&q=80&w=800"
          },
          {
            name: "معبر طابا",
            link: "https://www.iaa.gov.il/land-border-crossings/menachem-begin/",
            hoursLink: "https://www.iaa.gov.il/land-border-crossings/menachem-begin/opening-hours-begin/",
            image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800"
          },
          {
            name: "معبر إسحاق رابين (العقبة)",
            link: "https://www.iaa.gov.il/land-border-crossings/yitzhak-rabin/",
            hoursLink: "https://www.iaa.gov.il/land-border-crossings/yitzhak-rabin/opening-hours-rabin/",
            image: "https://images.unsplash.com/photo-1579606031828-567a42a03362?auto=format&fit=crop&q=80&w=800"
          }
        ]);
      });
  }, []);

  return (
    <section className="py-24 bg-slate-50 text-slate-900 relative border-t border-slate-100" id="crossings">
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">
            🌐 معابر وتسهيلات الحدود
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">معلومات المعابر الحدودية</h2>
          <p className="text-slate-600 max-w-2xl mx-auto font-medium">
            كل ما تحتاجه لتسهيل تنقلك عبر المعابر الأساسية. يمكنك دفع الرسوم مسبقاً لتوفير الوقت.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {crossings.map((cross, idx) => (
            <div key={idx} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-xl transition-all">
              <div className="h-48 overflow-hidden relative">
                <img src={cross.image} alt={cross.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-4 right-4 text-white">
                  <h3 className="text-xl font-black">{cross.name}</h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <a 
                    href={cross.link} 
                    target="_blank" 
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm font-bold text-slate-600 hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    <span className="flex items-center gap-2 text-right"><MapPin size={16} className="text-primary" /> معلومات المعبر</span>
                    <ExternalLink size={14} className="text-slate-400" />
                  </a>
                  <a 
                    href={cross.hoursLink} 
                    target="_blank" 
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm font-bold text-slate-600 hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    <span className="flex items-center gap-2"><Clock size={16} className="text-primary" /> ساعات العمل في الأعياد</span>
                    <ExternalLink size={14} className="text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-xl flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/3 shrink-0">
            <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-[2rem] shadow-md flex items-center justify-center mx-auto md:mx-0">
              <DollarSign size={40} className="text-primary" />
            </div>
          </div>
          <div className="flex-grow text-center md:text-right space-y-4">
            <h3 className="text-2xl font-black text-slate-900 leading-tight">وفر وقتك وادفع رسوم المعبر مسبقاً</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              تجنب الانتظار الطويل على المعابر. يمكنك الآن دفع كافة الرسوم والضرائب عبر الموقع الرسمي التابع للمركز قبل وصولك للمكان.
            </p>
            <a 
              href="https://borderpay.metropolinet.co.il/" 
              target="_blank" 
              className="inline-flex items-center gap-3 bg-primary text-slate-900 px-10 py-4 rounded-2xl font-black shadow-lg shadow-primary/10 hover:bg-primary/80 transition-all cursor-pointer"
            >
              ادفع الآن عبر الموقع الرسمي <ExternalLink size={20} className="text-slate-900" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
