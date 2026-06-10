"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle, ChevronDown, Globe, Shield, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings } from "@/components/SettingsProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const settings = useSettings();
  const pathname = usePathname();

  const isLightPage = ["/policies", "/contact", "/esim", "/crossings"].includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "من نحن", href: "/about" },
    {
      name: "خدماتنا",
      href: "#",
      subLinks: [
        { name: "رحلات منظمة", href: "/trips", desc: "رحلات سياحية متكاملة لكافة دول العالم" },
        { name: "فنادق ومنتجعات", href: "/hotels", desc: "أفضل الأسعار للفنادق المحلية والعالمية" },
        { name: "توصيل باصات", href: "/bus", desc: "خدمة توصيل مريحة ودقيقة" },
        { name: "شرائح eSIMo", href: "/esim", desc: "ابق متصلاً أينما كنت في العالم" },
      ]
    },
    { name: "عروض خاصة", href: "/offers" },
    { name: "سياساتنا", href: "/policies" },
    { name: "اتصل بنا", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-500 ease-in-out ${scrolled
          ? "top-4 px-4"
          : "top-0 px-0"
        }`}
    >
      <div
        className={`max-w-7xl mx-auto transition-all duration-500 border-b ${scrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-[2.5rem] border-white/20 py-2 px-8"
            : isLightPage
              ? "bg-transparent border-slate-200/50 py-6 px-4 md:px-8"
              : "bg-transparent border-white/10 py-6 px-4 md:px-8"
          }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-14 w-14 md:h-20 md:w-20 flex items-center justify-center transition-all duration-300">
              <img src="/logo.png" alt={settings.siteName} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group py-2">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-sm font-black transition-all ${
                    scrolled 
                      ? "text-slate-600 hover:text-primary" 
                      : isLightPage
                        ? "text-slate-700 hover:text-primary"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  {link.subLinks && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                </Link>

                {/* Underline Hover Effect */}
                <div className={`absolute bottom-0 right-0 h-0.5 bg-primary transition-all duration-300 ${scrolled ? "w-0 group-hover:w-full" : isLightPage ? "w-0 group-hover:w-full bg-primary" : "w-0 group-hover:w-full bg-white"}`} />

                {/* Submenu Dropdown - Mega Menu Style */}
                {link.subLinks && (
                  <div className="absolute top-full right-0 pt-4 w-[450px] opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 z-[200]">
                    <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 p-6 overflow-hidden relative">
                      <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-primary/100 via-primary/90 to-primary/80" />
                      <div className="grid grid-cols-1 gap-2">
                        {link.subLinks.map((sub) => (
                          <Link key={sub.name} href={sub.href} className="flex items-start gap-4 p-5 rounded-3xl hover:bg-primary/10 transition-all group/item border border-transparent hover:border-primary/20">
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover/item:bg-white transition-colors shadow-sm">
                              <Compass size={24} className="text-primary group-hover/item:scale-110 transition-transform" />
                            </div>
                            <div>
                              <h4 className="text-base font-black text-slate-900 group-hover/item:text-primary transition-colors">{sub.name}</h4>
                              <p className="text-xs text-slate-400 font-bold mt-1 leading-relaxed">{sub.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-2xl text-xs font-black flex items-center gap-2 transition-all transform hover:scale-105 shadow-xl ${
                scrolled
                  ? "bg-slate-900 text-white shadow-slate-900/10 hover:bg-black"
                  : isLightPage
                    ? "bg-slate-900 text-white hover:bg-black shadow-md"
                    : "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20"
              }`}
            >
              <MessageCircle size={18} className="text-primary" />
              تحدث مع خبير
            </Link>
            <Link
              href="/admin"
              className={`p-3 rounded-2xl transition-all ${
                scrolled 
                  ? "bg-slate-100 text-slate-500 hover:text-primary" 
                  : isLightPage
                    ? "bg-slate-100 text-slate-600 hover:text-primary"
                    : "bg-white/5 text-white/50 hover:text-white"
              }`}
            >
              <Shield size={18} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-xl ${scrolled ? "bg-primary text-white" : isLightPage ? "bg-slate-900 text-white" : "bg-white/10 text-white"}`}
            >
              <Phone size={20} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-colors ${
                scrolled 
                  ? "text-slate-900 bg-slate-100" 
                  : isLightPage
                    ? "text-slate-900 bg-slate-100"
                    : "text-white bg-white/10"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-white z-[200] lg:hidden p-8 flex flex-col"
            dir="rtl"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img src="/logo.png" alt={settings.siteName} className="w-full h-full object-contain" />
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-3 bg-slate-100 rounded-2xl text-slate-900"><X size={24} /></button>
            </div>

            <div className="flex flex-col gap-6 mb-16">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className="text-3xl font-black text-slate-900 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.subLinks && (
                    <div className="mt-4 flex flex-col gap-3 mr-4">
                      {link.subLinks.map(sub => (
                        <Link key={sub.name} href={sub.href} className="text-slate-400 font-bold hover:text-primary" onClick={() => setIsOpen(false)}>
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              <Link
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 text-white py-5 rounded-[2rem] font-black text-center flex items-center justify-center gap-3 shadow-2xl shadow-green-600/20"
              >
                <MessageCircle size={24} />
                واتساب مباشر
              </Link>
              <div className="flex items-center justify-center gap-8 pt-8">
                <div className="flex items-center gap-2 text-xs font-black text-slate-400"><Globe size={16} /> ARABIC (AR)</div>
                <div className="w-px h-4 bg-slate-200" />
                <Link href="/admin" className="text-xs font-black text-slate-400 uppercase tracking-widest">Admin Portal</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
