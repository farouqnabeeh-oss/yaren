"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  Headphones,
  CreditCard,
  Zap
} from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";

const Footer = () => {
  const settings = useSettings();

  const paymentIcons = [
    { 
      name: "Visa", 
      svg: <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="#FFFFFF" d="M15.118 5.618h2.378l-1.486 9.382h-2.378l1.486-9.382zm7.426 0h-2.378l-1.486 9.382h2.378l1.486-9.382zm1.456 0h-2.378l-1.486 9.382h2.378l1.486-9.382zM4.14 5.618H0l.024.168c2.146.546 3.568 1.866 4.156 3.44l.872 4.19 2.386-5.83c.12-.294.138-.42.138-.568 0-.448-.344-.808-1.042-.808H4.14z"/></svg>,
      color: "bg-[#1A1F71]" 
    },
    { 
      name: "Mastercard", 
      svg: <svg viewBox="0 0 24 24" className="w-full h-full"><circle cx="8" cy="12" r="7" fill="#EB001B"/><circle cx="16" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8"/></svg>,
      color: "bg-[#212121]" 
    },
    { 
      name: "Apple Pay", 
      svg: <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="currentColor" d="M17.057 12.316c.01 2.213 1.815 2.964 1.83 2.973-.016.052-.284.973-.935 1.925-.561.823-1.144 1.642-2.062 1.659-.899.016-1.19-.53-2.221-.53-1.033 0-1.354.515-2.205.547-.852.031-1.53-.873-2.094-1.696-1.156-1.683-2.038-4.757-.84-6.837.595-1.033 1.658-1.688 2.812-1.706.884-.015 1.718.598 2.257.598.54 0 1.554-.735 2.616-.628.445.019 1.693.18 2.493 1.352-.065.04-1.483.864-1.47 2.533zM14.623 7.822c.465-.564.777-1.35.69-2.134-.672.027-1.485.45-1.968 1.013-.432.495-.811 1.298-.707 2.065.751.058 1.519-.38 1.985-.944z"/></svg>,
      color: "bg-white text-black" 
    },
    { 
      name: "Bit", 
      svg: <div className="text-[8px] font-black italic tracking-tighter leading-none flex items-center justify-center h-full w-full">bit</div>,
      color: "bg-[#00D1C1] text-white" 
    },
    { 
      name: "PayPal", 
      svg: <svg viewBox="0 0 24 24" className="w-full h-full"><path fill="#003087" d="M20.067 8.178c-.512-2.585-2.285-3.816-4.945-3.816H7.135c-.443 0-.825.31-.91.743L3.522 19.123c-.048.243.138.468.385.468h3.332l.732-4.664c.085-.432.467-.742.91-.742h.86c3.483 0 6.208-1.415 7.01-5.044.336-1.52.195-2.61-.314-3.153l-.37-.31z"/></svg>,
      color: "bg-white" 
    }
  ];

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 text-right" dir="rtl">

          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center group">
              <div className="w-20 h-20 flex items-center justify-center">
                <img src="/logo.png" alt={settings.siteName} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              نحن في {settings.siteName} نسعى لتقديم تجربة سفر لا تُنسى، نعتني بكافة التفاصيل ليكون تركيزكم الوحيد هو الاستمتاع باللحظة.
            </p>
            <div className="flex items-center gap-4">
              {[
                {
                  icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
                  href: settings.facebook
                },
                {
                  icon: <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
                  href: settings.instagram
                },
                {
                  icon: <MessageCircle size={20} />,
                  href: `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`
                }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all border border-white/10 hover:border-primary"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black mb-8 border-b border-white/5 pb-4">استكشف الموقع</h4>
            <ul className="space-y-4">
              {[
                { name: "من نحن", href: "/about" },
                { name: "رحلاتنا المنظمة", href: "/trips" },
                { name: "أفضل الفنادق", href: "/#hotels" },
                { name: "عروض الدقيقة 90", href: "/offers" },
                { name: "توصيل الباصات", href: "/#bus-trips" },
                { name: "شرائح eSIMo", href: "/esim" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-primary text-sm font-bold flex items-center gap-2 group transition-colors">
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-lg font-black mb-8 border-b border-white/5 pb-4">الدعم القانوني</h4>
            <ul className="space-y-4">
              {[
                { name: "سياسة الخصوصية", href: "/policies#privacy" },
                { name: "الإلغاء والاسترجاع", href: "/policies#refund" },
                { name: "شروط الخدمة", href: "/policies#terms" },
                { name: "الأسئلة الشائعة", href: "/#faq" },
                { name: "تذاكر الدعم", href: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm font-bold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-black mb-8 border-b border-white/5 pb-4">تواصل معنا</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 text-primary border border-white/10"><Phone size={18} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">اتصال مباشر</p>
                  <p className="text-sm font-black text-white" dir="ltr">{settings.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 text-primary border border-white/10"><Mail size={18} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">بريد إلكتروني</p>
                  <p className="text-sm font-black text-white">{settings.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0 text-primary border border-white/10"><MapPin size={18} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">المقر الرئيسي</p>
                  <p className="text-sm font-black text-white">{settings.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Trust Section */}
        <div className="border-t border-white/5 pt-12 pb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                <ShieldCheck className="text-emerald-500" size={20} />
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">تشفير كامل</p>
                   <p className="text-xs font-black text-white">نظام دفع آمن (PCI-DSS)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
                <Zap className="text-orange-500" size={20} />
                <div className="text-right">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">حجز فوري</p>
                   <p className="text-xs font-black text-white">تأكيد حجز لحظي عبر واتساب</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">نقبل وسائل الدفع العالمية والمحلية</span>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {paymentIcons.map((payment) => (
                  <div 
                    key={payment.name}
                    className={`w-14 h-9 ${payment.color} rounded-lg flex items-center justify-center p-1.5 shadow-lg border border-white/5 hover:scale-110 hover:-translate-y-1 transition-all cursor-help group relative`}
                    title={payment.name}
                  >
                    <div className="w-full h-full flex items-center justify-center transition-transform group-hover:scale-105">
                      {payment.svg}
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                      {payment.name}
                    </div>
                  </div>
                ))}
                <div className="w-14 h-9 bg-white/5 rounded-lg flex flex-col items-center justify-center border border-dashed border-white/20 text-[8px] font-bold text-slate-500 leading-tight">
                  <span>+ تحويل</span>
                  <span>بنكي</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Copyright */}
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-[10px] font-bold text-slate-500">
            © {new Date().getFullYear()} {settings.siteName}. جميع الحقوق محفوظة. تم التطوير بأعلى المعايير التقنية.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
