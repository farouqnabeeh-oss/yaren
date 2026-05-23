"use client";
import React from 'react';
import { Timer, MessageCircle } from 'lucide-react';

interface CardProps {
  title: string;
  desc: string;
  price: string;
  originalPrice: string;
  tag: string;
  image: string;
  timeLeft: string;
  buttonText?: string;
  whatsappLink: string;
  className?: string;
}

/**
 * Reusable Card component with glassmorphism styling for offer cards.
 * It displays an image, tag badge, pricing, description and a call‑to‑action button.
 */
const Card = ({
  title,
  desc,
  price,
  originalPrice,
  tag,
  image,
  timeLeft,
  buttonText = 'احجز العرض الآن',
  whatsappLink,
  className = '',
}: CardProps) => {
  return (
    <div className={`group bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 ${className}`}>
      <div className="relative h-80 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-6 right-6 bg-orange-600 text-white px-5 py-2 rounded-full text-xs font-black shadow-lg">{tag}</div>
        <div className="absolute bottom-6 right-6 left-6 flex justify-between items-end">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-xl">
            <div className="text-[10px] font-black text-slate-400 line-through">بدلاً من {originalPrice} ₪</div>
            <div className="text-2xl font-black text-slate-900">{price} ₪</div>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-white flex items-center gap-2 border border-white/10">
            <Timer size={14} className="text-orange-500" />
            {timeLeft}
          </div>
        </div>
      </div>
      <div className="p-8 space-y-4">
        <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">{title}</h3>
        <p className="text-slate-500 text-sm font-bold leading-relaxed">{desc}</p>
        <div className="pt-6 border-t border-slate-100">
          <button
            onClick={() => window.open(whatsappLink, '_blank')}
            className="w-full bg-slate-900 hover:bg-orange-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 group-hover:shadow-xl group-hover:shadow-orange-600/20"
          >
            <MessageCircle size={22} />
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
