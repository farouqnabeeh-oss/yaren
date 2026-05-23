

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import { getSettings } from "@/lib/actions/settings";
import HeroAnimated from "@/components/anim/HeroAnimated";
import { ShieldCheck, Star, Gift, CheckCircle2 } from "lucide-react";




const OffersPage = async () => {
  const offers = [
    {
      id: "offer-1",
      title: "عرض العائلات: إسطنبول الساحرة",
      desc: "رحلة متكاملة لـ 5 أشخاص تشمل الطيران، الفنادق، وجولات سياحية يومية مع مرشد عربي.",
      price: "12,500",
      originalPrice: "14,800",
      tag: "الأكثر مبيعاً",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1000",
      timeLeft: "يومين متبقيين",
    },
    {
      id: "offer-2",
      title: "باقة شهر العسل: جزر المالديف",
      desc: "إقامة في فيلا فوق الماء مع إفطار وعشاء وجلسات سبا مجانية. تجربة العمر تنتظرك.",
      price: "18,900",
      originalPrice: "21,000",
      tag: "عرض حصري",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1000",
      timeLeft: "5 أيام متبقية",
    },
    {
      id: "offer-3",
      title: "رحلة العمرة: باقة الرفاهية",
      desc: "فنادق مطلة على الحرم مباشرة مع مواصلات VIP وخدمة مدار الساعة.",
      price: "4,200",
      originalPrice: "5,500",
      tag: "خصم 20%",
      image: "https://images.unsplash.com/photo-1565032223023-4100b738129c?auto=format&fit=crop&q=80&w=1000",
      timeLeft: "ساعات محدودة",
    }
  ];
const settings = await getSettings();
  return (
    <main className="min-h-screen flex flex-col bg-slate-950" dir="rtl">
      <Navbar />
      
      {/* Dynamic Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-overlay scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/80 to-slate-900" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <HeroAnimated />
          
          <p className="text-slate-300 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            اكتشف مجموعة من العروض المختارة بعناية، وفرنا لك أفضل الخصومات على أشهر الوجهات العالمية.
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-20 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {offers.map((offer) => (
              <Card
                key={offer.id}
                title={offer.title}
                desc={offer.desc}
                price={offer.price}
                originalPrice={offer.originalPrice}
                tag={offer.tag}
                image={offer.image}
                timeLeft={offer.timeLeft}
                whatsappLink={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-slate-50 border-t border-slate-100 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: <ShieldCheck className="text-green-500" size={32} />, title: "حجز مضمون", desc: "سياسات إلغاء مرنة" },
              { icon: <Star className="text-yellow-500" size={32} />, title: "أعلى التقييمات", desc: "نعتني بأدق التفاصيل" },
              { icon: <Gift className="text-purple-500" size={32} />, title: "هدايا مجانية", desc: "أدلة سياحية مع كل حجز" },
              { icon: <CheckCircle2 className="text-blue-500" size={32} />, title: "تأكيد فوري", desc: "بدون أي انتظار" },
            ].map((item, i) => (
            <div
                key={i}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-2">
                  {item.icon}
                </div>
                <h4 className="text-lg font-black text-slate-900">{item.title}</h4>
                <p className="text-sm font-bold text-slate-400">{item.desc}</p>
              </div>
            ))}
         </div>
      </section>

      <Footer />
    </main>
  );
};

export default OffersPage;
