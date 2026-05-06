"use client";

import React from "react";
import { MapPin, Star, MessageCircle } from "lucide-react";

interface HotelCardProps {
  name: string;
  image: string;
  location: string;
  price: number;
  rating: number;
  features: string[];
}

const HotelCard: React.FC<HotelCardProps> = ({ name, image, location, price, rating, features }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
      <div className="relative h-56 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-slate-900">{rating}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-2">
          <MapPin size={12} />
          {location}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-4 line-clamp-1">{name}</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {features.map((f, i) => (
            <span key={i} className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-lg">
              {f}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block">تبدأ من</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">{price}</span>
              <span className="text-sm font-bold text-orange-500">₪</span>
            </div>
          </div>
          <button className="bg-orange-600 text-white p-3 rounded-xl hover:bg-orange-700 transition-colors">
            <MessageCircle size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const HotelsSection = () => {
  const regions = [
    {
      title: "إيلات والبحر الميت",
      description: "الجانب المحلي - استجمام بلا حدود",
      image: "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&q=80&w=800",
      hotels: [
        { name: "فندق هيرودس إيلات", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800", location: "إيلات", price: 850, rating: 4.9, features: ["مسبح خاص", "سبا", "إطلالة بحرية"] },
        { name: "فندق رويال بيتش", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800", location: "إيلات", price: 720, rating: 4.8, features: ["فطور فاخر", "قريب من المول", "واي فاي"] }
      ]
    },
    {
      title: "أريحا والبلاد",
      description: "منطقة الضفة وفنادق البلاد",
      image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?auto=format&fit=crop&q=80&w=800",
      hotels: [
        { name: "فندق إنتركونتيننتال أريحا", image: "https://images.unsplash.com/photo-1551882547-ff43c63efe81?auto=format&fit=crop&q=80&w=800", location: "أريحا", price: 550, rating: 4.7, features: ["حدائق واسعة", "مسابح", "بوفيه مفتوح"] }
      ]
    },
    {
      title: "المملكة الأردنية",
      description: "عمان، العقبة، البحر الميت",
      image: "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=800",
      hotels: [
        { name: "موفنبيك العقبة", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=800", location: "العقبة", price: 480, rating: 4.8, features: ["شاطئ خاص", "رياضات مائية", "إفطار عالمي"] }
      ]
    },
    {
      title: "سيناء ومصر",
      description: "شرم الشيخ، دهب، طابا",
      image: "https://images.unsplash.com/photo-1512100356956-c1227c331f01?auto=format&fit=crop&q=80&w=800",
      hotels: [
        { name: "ريكسوس بريميوم سيجيت", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=800", location: "شرم الشيخ", price: 950, rating: 5.0, features: ["شامل كلياً", "عروض ترفيهية", "أكوا بارك"] }
      ]
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">استكشف عالمًا من الراحة</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">اختر وجهتك المفضلة من بين أفضل المنتجعات والفنادق المختارة بعناية.</p>
        </div>

        {/* Region Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {regions.map((region, idx) => (
            <div key={idx} className="relative h-80 rounded-[2.5rem] overflow-hidden group cursor-pointer">
              <img src={region.image} alt={region.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 right-6 left-6">
                <h3 className="text-xl font-bold text-white mb-1">{region.title}</h3>
                <p className="text-xs text-slate-300 font-medium">{region.description}</p>
                <button className="mt-4 text-xs font-bold text-orange-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  عرض الفنادق
                  <ArrowLeft size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Hotels Preview */}
        <div>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900">أقوى عروض الفنادق المختارة</h3>
            <button className="text-sm font-bold text-orange-600 hover:underline">مشاهدة الكل</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {regions.flatMap(r => r.hotels).slice(0, 4).map((hotel, idx) => (
              <HotelCard key={idx} {...hotel} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import { ArrowLeft } from "lucide-react";

export default HotelsSection;
