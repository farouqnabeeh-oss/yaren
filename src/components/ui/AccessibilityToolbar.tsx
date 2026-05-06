"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accessibility, X, Type, Contrast, Monitor, MousePointer2 } from "lucide-react";
import Link from "next/link";

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 100, // percentage
    highContrast: false,
    grayscale: false,
    bigCursor: false,
    reduceMotion: false
  });

  // Apply settings to document body
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Font Size
    html.style.fontSize = `${settings.fontSize}%`;

    // High Contrast
    if (settings.highContrast) {
      body.classList.add("high-contrast-mode");
    } else {
      body.classList.remove("high-contrast-mode");
    }

    // Grayscale
    if (settings.grayscale) {
      body.style.filter = "grayscale(100%)";
    } else {
      body.style.filter = "none";
    }

    // Big Cursor
    if (settings.bigCursor) {
      body.classList.add("big-cursor");
    } else {
      body.classList.remove("big-cursor");
    }

    // Reduce Motion
    if (settings.reduceMotion) {
      body.classList.add("reduce-motion");
    } else {
      body.classList.remove("reduce-motion");
    }
  }, [settings]);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const increaseFont = () => {
    if (settings.fontSize < 140) {
      setSettings(prev => ({ ...prev, fontSize: prev.fontSize + 10 }));
    }
  };

  const decreaseFont = () => {
    if (settings.fontSize > 90) {
      setSettings(prev => ({ ...prev, fontSize: prev.fontSize - 10 }));
    }
  };

  const resetAll = () => {
    setSettings({
      fontSize: 100,
      highContrast: false,
      grayscale: false,
      bigCursor: false,
      reduceMotion: false
    });
  };

  return (
    <>
      {/* Global CSS for accessibility modes */}
      <style dangerouslySetInnerHTML={{__html: `
        .high-contrast-mode {
          background-color: #000 !important;
          color: #fff !important;
        }
        .high-contrast-mode * {
          background-color: #000 !important;
          color: #fff !important;
          border-color: #fff !important;
        }
        .big-cursor, .big-cursor * {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2"><path d="M4 4l16 16m0-16L4 20" /></svg>'), auto !important;
        }
        .reduce-motion * {
          animation: none !important;
          transition: none !important;
        }
      `}} />

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[100] w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
        aria-label="أدوات الإتاحة وإمكانية الوصول"
      >
        <Accessibility size={28} />
      </button>

      {/* Toolbar Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed bottom-6 left-6 z-[101] w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            dir="rtl"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Accessibility size={20} />
                <h3 className="font-black text-lg">أدوات الإتاحة</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Tools */}
            <div className="p-4 space-y-4">
              
              {/* Font Size */}
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                  <Type size={18} className="text-blue-600" /> تكبير النص
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={decreaseFont} className="w-8 h-8 bg-white border border-slate-200 rounded-lg font-bold hover:bg-slate-100">-</button>
                  <span className="font-bold text-sm w-8 text-center">{settings.fontSize}%</span>
                  <button onClick={increaseFont} className="w-8 h-8 bg-white border border-slate-200 rounded-lg font-bold hover:bg-slate-100">+</button>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => toggleSetting('highContrast')}
                  className={`p-3 rounded-2xl border font-bold text-xs flex flex-col items-center gap-2 transition-colors ${settings.highContrast ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-100 hover:border-blue-300'}`}
                >
                  <Contrast size={20} />
                  تباين عالٍ
                </button>
                <button 
                  onClick={() => toggleSetting('grayscale')}
                  className={`p-3 rounded-2xl border font-bold text-xs flex flex-col items-center gap-2 transition-colors ${settings.grayscale ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-100 hover:border-blue-300'}`}
                >
                  <Monitor size={20} />
                  ألوان أحادية
                </button>
                <button 
                  onClick={() => toggleSetting('bigCursor')}
                  className={`p-3 rounded-2xl border font-bold text-xs flex flex-col items-center gap-2 transition-colors ${settings.bigCursor ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-100 hover:border-blue-300'}`}
                >
                  <MousePointer2 size={20} />
                  تكبير المؤشر
                </button>
                <button 
                  onClick={() => toggleSetting('reduceMotion')}
                  className={`p-3 rounded-2xl border font-bold text-xs flex flex-col items-center gap-2 transition-colors ${settings.reduceMotion ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-100 hover:border-blue-300'}`}
                >
                  <Accessibility size={20} />
                  إيقاف الحركات
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
                <button onClick={resetAll} className="p-3 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                  إعادة ضبط
                </button>
                <Link href="/accessibility" className="p-3 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors text-center border border-blue-100">
                  تصريح الإتاحة
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
