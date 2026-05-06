"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, ShieldCheck, Lock, Mail, Smartphone, ArrowLeft } from "lucide-react";

const CheckoutForm = ({ orderDetails, onComplete }: { orderDetails: any, onComplete: (data: any) => void }) => {
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bit">("card");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return alert("يرجى الموافقة على الشروط والسياسات");
    setLoading(true);
    
    // Simulate API Call
    setTimeout(() => {
      onComplete({
        orderId: "YT-" + Math.floor(Math.random() * 100000),
        transactionId: "TXN-" + Date.now(),
        date: new Date().toLocaleDateString(),
        ...orderDetails
      });
      setLoading(false);
    }, 2000);
  };

  const paymentLogos = [
    { name: "Visa", color: "bg-[#1A1F71]", svg: <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="#FFFFFF" d="M15.118 5.618h2.378l-1.486 9.382h-2.378l1.486-9.382zm7.426 0h-2.378l-1.486 9.382h2.378l1.486-9.382zm1.456 0h-2.378l-1.486 9.382h2.378l1.486-9.382zM4.14 5.618H0l.024.168c2.146.546 3.568 1.866 4.156 3.44l.872 4.19 2.386-5.83c.12-.294.138-.42.138-.568 0-.448-.344-.808-1.042-.808H4.14z"/></svg> },
    { name: "Mastercard", color: "bg-[#212121]", svg: <svg viewBox="0 0 24 24" className="w-full h-full"><circle cx="8" cy="12" r="7" fill="#EB001B"/><circle cx="16" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8"/></svg> },
    { name: "Apple Pay", color: "bg-black", svg: <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="white" d="M17.057 12.316c.01 2.213 1.815 2.964 1.83 2.973-.016.052-.284.973-.935 1.925-.561.823-1.144 1.642-2.062 1.659-.899.016-1.19-.53-2.221-.53-1.033 0-1.354.515-2.205.547-.852.031-1.53-.873-2.094-1.696-1.156-1.683-2.038-4.757-.84-6.837.595-1.033 1.658-1.688 2.812-1.706.884-.015 1.718.598 2.257.598.54 0 1.554-.735 2.616-.628.445.019 1.693.18 2.493 1.352-.065.04-1.483.864-1.47 2.533zM14.623 7.822c.465-.564.777-1.35.69-2.134-.672.027-1.485.45-1.968 1.013-.432.495-.811 1.298-.707 2.065.751.058 1.519-.38 1.985-.944z"/></svg> }
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 overflow-hidden relative">
      {/* Top Banner */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400" />
      
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner ring-1 ring-orange-100">
          <CreditCard size={36} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">بوابة الدفع الآمنة</h2>
        <p className="text-slate-400 font-bold mt-2">تأكيد حجزك في يارين تورز خلال ثوانٍ</p>
      </div>

      <div className="flex gap-4 mb-10" dir="rtl">
        <button 
          onClick={() => setPaymentMethod("card")}
          className={`flex-1 p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === "card" ? "border-orange-600 bg-orange-50/50 shadow-lg" : "border-slate-100 hover:border-slate-200"}`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${paymentMethod === "card" ? "bg-orange-600 text-white" : "bg-slate-100 text-slate-400"}`}>
            <CreditCard size={24} />
          </div>
          <span className="font-black text-sm">بطاقة ائتمان</span>
        </button>
        <button 
          onClick={() => setPaymentMethod("bit")}
          className={`flex-1 p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${paymentMethod === "bit" ? "border-[#00D1C1] bg-[#00D1C1]/5 shadow-lg" : "border-slate-100 hover:border-slate-200"}`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${paymentMethod === "bit" ? "bg-[#00D1C1] text-white" : "bg-slate-100 text-slate-400"}`}>
            <Smartphone size={24} />
          </div>
          <span className="font-black text-sm">تطبيق BIT</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 text-right" dir="rtl">
        {paymentMethod === "card" ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">الاسم الكامل (كما هو مطبوع)</label>
              <input type="text" required className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 font-bold outline-none ring-2 ring-transparent focus:ring-orange-600/10 transition-all shadow-inner" placeholder="John Doe" />
            </div>
            
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">رقم البطاقة</label>
              <div className="relative">
                <input type="text" required className="w-full bg-slate-50 border-none rounded-2xl py-5 pr-8 pl-20 font-bold outline-none ring-2 ring-transparent focus:ring-orange-600/10 transition-all shadow-inner" placeholder="**** **** **** ****" />
                <div className="absolute left-4 inset-y-0 flex items-center gap-1.5 opacity-60">
                   <div className="w-8 h-5 bg-slate-200 rounded" />
                   <div className="w-8 h-5 bg-slate-200 rounded" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">انتهاء الصلاحية</label>
                <input type="text" required className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 font-bold outline-none ring-2 ring-transparent focus:ring-orange-600/10 transition-all shadow-inner" placeholder="MM / YY" />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">رمز الأمان (CVV)</label>
                <input type="password" required className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 font-bold outline-none ring-2 ring-transparent focus:ring-orange-600/10 transition-all shadow-inner" placeholder="***" />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 p-10 rounded-[2.5rem] text-center border border-slate-100 animate-in fade-in slide-in-from-left-4 duration-500">
             <div className="w-20 h-20 bg-[#00D1C1] rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-black italic shadow-lg shadow-[#00D1C1]/20">bit</div>
             <h3 className="text-xl font-black text-slate-900 mb-2">الدفع عبر BIT</h3>
             <p className="text-sm font-bold text-slate-400 leading-relaxed mb-6">سيتم فتح تطبيق BIT تلقائياً لإتمام العملية بعد الضغط على زر التأكيد.</p>
             <input type="tel" placeholder="أدخل رقم هاتفك المسجل في BIT" className="w-full bg-white border border-slate-200 rounded-2xl py-5 px-8 text-center font-bold outline-none focus:border-[#00D1C1] transition-all" />
          </div>
        )}

        <div className="space-y-3">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">البريد الإلكتروني للفاتورة</label>
          <div className="relative group">
            <div className="absolute inset-y-0 right-6 flex items-center text-slate-300 group-focus-within:text-orange-600 transition-colors">
              <Mail size={18} />
            </div>
            <input type="email" required className="w-full bg-slate-50 border-none rounded-2xl py-5 pr-16 pl-8 font-bold outline-none ring-2 ring-transparent focus:ring-orange-600/10 transition-all shadow-inner" placeholder="example@email.com" />
          </div>
        </div>

        {/* Legal & Trust */}
        <div className="space-y-6">
          <div className="flex items-start gap-4 bg-orange-50/30 p-6 rounded-[2rem] border border-orange-100/50">
            <input 
              type="checkbox" 
              id="terms" 
              checked={agreed} 
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-6 h-6 rounded-lg border-orange-200 text-orange-600 focus:ring-orange-600 cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs font-bold text-slate-600 leading-relaxed cursor-pointer">
              أوافق على <a href="/privacy" className="text-orange-600 underline hover:text-orange-700">سياسة الخصوصية</a> و <a href="/refunds" className="text-orange-600 underline hover:text-orange-700">شروط الحجز والإلغاء</a> الخاصة بـ يارين تورز.
            </label>
          </div>

          <div className="flex items-center justify-center gap-3 text-slate-400">
            <ShieldCheck size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">تشفير 256-bit آمن بالكامل</span>
          </div>
        </div>

        <button 
          disabled={loading}
          className={`w-full py-6 rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 transition-all shadow-2xl active:scale-95 disabled:opacity-50 ${paymentMethod === 'bit' ? 'bg-[#00D1C1] text-white shadow-[#00D1C1]/20' : 'bg-orange-600 text-white shadow-orange-600/30'}`}
        >
          {loading ? "جاري المعالجة..." : `تأكيد ودفع ${orderDetails.totalPrice} ₪`}
          {!loading && <Lock size={22} />}
        </button>

        {/* Distinctive Payment Logos */}
        <div className="pt-10 border-t border-slate-100">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest ml-2">وسائل دفع آمنة:</span>
            {paymentLogos.map((logo) => (
              <div key={logo.name} className={`w-12 h-8 ${logo.color} rounded-lg p-1.5 flex items-center justify-center shadow-md border border-slate-100 grayscale hover:grayscale-0 transition-all duration-500`}>
                {logo.svg}
              </div>
            ))}
            <div className="w-12 h-8 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center">
               <div className="text-[7px] font-black text-slate-400 text-center leading-none">BANK<br/>TRANS</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
