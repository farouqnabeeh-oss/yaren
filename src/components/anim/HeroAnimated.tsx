/* src/components/anim/HeroAnimated.tsx */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

/**
 * Animated hero section used on the Offers page.
 * This component is a client component because it uses Framer Motion
 * which relies on browser APIs.
 */
const HeroAnimated = () => {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-overlay scale-105" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/80 to-slate-900" />
      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center mt-7 gap-2 bg-orange-600/20 text-orange-500 px-4 py-2 rounded-full border border-orange-500/20 mb-8 backdrop-blur-md"
        >
          <Flame size={16} />
          <span className="text-xs font-black uppercase tracking-widest">عروض محدودة الوقت</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight"
        >
          عروض لا <span className="text-orange-500">تتكرر</span> <br className="hidden md:block" /> بأسعار خيالية
        </motion.h1>
      </div>
    </section>
  );
};

export default HeroAnimated;
