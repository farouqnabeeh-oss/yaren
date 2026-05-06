"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Info, X, Camera } from "lucide-react";

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  desc: string;
  image: string;
}

const InteractiveMap = ({ mapImage, hotspots }: { mapImage: string, hotspots: Hotspot[] }) => {
  const [selected, setSelected] = useState<Hotspot | null>(null);

  return (
    <div className="relative w-full rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl bg-slate-100 group">
      {/* The Map Background */}
      <img 
        src={mapImage} 
        alt="Interactive Map" 
        className="w-full h-auto object-cover min-h-[400px] md:min-h-[600px] transition-transform duration-700 group-hover:scale-105" 
      />

      {/* Hotspots Overlay */}
      <div className="absolute inset-0 z-10">
        {hotspots.map((spot) => (
          <motion.button
            key={spot.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setSelected(spot)}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <div className="relative">
              {/* Pulse effect */}
              <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75" />
              <div className="relative bg-orange-600 text-white p-2 rounded-full shadow-xl border-2 border-white">
                <MapPin size={20} />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Info Popover */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 right-6 left-6 md:left-auto md:w-96 bg-white rounded-[2rem] shadow-2xl z-30 overflow-hidden border border-slate-100"
          >
            <div className="h-40 overflow-hidden relative">
              <img src={selected.image} className="w-full h-full object-cover" alt={selected.title} />
              <button 
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6">
              <h4 className="text-xl font-black text-slate-900 mb-2">{selected.title}</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4">{selected.desc}</p>
              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
                <Camera size={18} />
                عرض المزيد من الصور
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-slate-900 border border-white/20 shadow-sm flex items-center gap-2">
        <Info size={14} className="text-orange-600" />
        خريطة تفاعلية: استكشف معالم الرحلة
      </div>
    </div>
  );
};

export default InteractiveMap;
