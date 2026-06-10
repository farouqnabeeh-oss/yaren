"use client";
import React from 'react';
import { Timer, MessageCircle, Sparkles } from 'lucide-react';

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
 * Reusable Card component with premium styling for offer cards.
 * Uses soft shadow and subtle border for clear visibility on any background.
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
    <div className={`group bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 ${className}`}>
      <div className="relative h-80 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-6 right-6">
          <div className="bg-gradient-to-l from-orange-500 to-amber-600 text-white px-5 py-2 rounded-full text-xs font-black shadow-lg shadow-orange-500/30 flex items-center gap-1.5">
            <Sparkles size={12} />
            {tag}
          </div>
        </div>
        <div className="absolute bottom-6 right-6 left-6 flex justify-between items-end">
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-xl">
            {originalPrice && (
              <div className="text-[10px] font-black text-slate-400 line-through">بدلاً من {originalPrice} ₪</div>
            )}
            <div className="text-2xl font-black text-slate-900">{price} <span className="text-orange-500">₪</span></div>
          </div>
          <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-white flex items-center gap-2 border border-white/10">
            <Timer size={14} className="text-orange-400" />
            {timeLeft}
          </div>
        </div>
      </div>
      <div className="p-8 space-y-4 bg-white">
        <h3 className="text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">{title}</h3>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
        <div className="pt-5 border-t border-slate-100">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-l from-slate-800 to-slate-900 hover:from-orange-500 hover:to-orange-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg group-hover:shadow-orange-500/20"
          >
            <MessageCircle size={20} />
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
