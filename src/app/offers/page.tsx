import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSettings } from "@/lib/actions/settings";
import HeroAnimated from "@/components/anim/HeroAnimated";
import { ShieldCheck, Star, Gift, CheckCircle2, Timer, MessageCircle, Sparkles, Crown, Zap } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "عروض خاصة | يارين تورز",
  description: "اكتشف باقة العروض الحصرية والخصومات السياحية التي صممناها خصيصاً لتمنحكم عطلة أحلامكم بأفضل الأسعار.",
};

const OffersPage = async () => {
  const settings = await getSettings();

  const defaultOffers = [
    {
      id: "default-1",
      title: "عرض العائلات: إسطنبول الساحرة",
      description: "رحلة متكاملة لـ 5 أشخاص تشمل الطيران، الفنادق، وجولات سياحية يومية مع مرشد عربي.",
      price: "12,500",
      originalPrice: "14,800",
      tag: "الأكثر مبيعاً",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1000",
      timeLeft: "يومين متبقيين",
    },
    {
      id: "default-2",
      title: "باقة شهر العسل: جزر المالديف",
      description: "إقامة في فيلا فوق الماء مع إفطار وعشاء وجلسات سبا مجانية. تجربة العمر تنتظرك.",
      price: "18,900",
      originalPrice: "21,000",
      tag: "عرض حصري",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1000",
      timeLeft: "5 أيام متبقية",
    },
    {
      id: "default-3",
      title: "رحلة العمرة: باقة الرفاهية",
      description: "فنادق مطلة على الحرم مباشرة مع مواصلات VIP وخدمة مدار الساعة.",
      price: "4,200",
      originalPrice: "5,500",
      tag: "خصم 20%",
      image: "https://images.unsplash.com/photo-1565032223023-4100b738129c?auto=format&fit=crop&q=80&w=1000",
      timeLeft: "ساعات محدودة",
    }
  ];

  let offers: any[] = [];
  try {
    if (prisma && prisma.offer) {
      offers = await prisma.offer.findMany({
        orderBy: { createdAt: "desc" }
      });

      if (offers.length === 0) {
        try {
          await prisma.offer.createMany({
            data: defaultOffers.map(({ id, ...rest }) => rest)
          });
          offers = await prisma.offer.findMany({
            orderBy: { createdAt: "desc" }
          });
        } catch (e) {
          console.error("Failed to seed default offers:", e);
          offers = defaultOffers;
        }
      }
    } else {
      offers = defaultOffers;
    }
  } catch (error) {
    console.error("Error accessing prisma.offer.findMany:", error);
    offers = defaultOffers;
  }

  const whatsappNumber = settings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <main className="min-h-screen flex flex-col bg-slate-950 text-white font-sans relative overflow-hidden" dir="rtl">
      <Navbar />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 scale-110 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-l from-amber-500/20 to-orange-500/20 border border-amber-500/30 px-6 py-2.5 rounded-full">
            <Crown size={16} className="text-amber-400" />
            <span className="text-xs font-black text-amber-200 uppercase tracking-widest">عروض حصرية لفترة محدودة</span>
          </div>

          <HeroAnimated />

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            اكتشف باقة العروض الحصرية والخصومات السياحية التي صممناها خصيصاً لتمنحكم عطلة أحلامكم بأفضل الأسعار.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {[
              { icon: Sparkles, value: `${offers.length}+`, label: "عرض حصري" },
              { icon: Zap, value: "40%", label: "خصم يصل" },
              { icon: Star, value: "4.9", label: "تقييم العملاء" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl backdrop-blur-sm">
                <s.icon size={16} className="text-amber-400" />
                <span className="text-amber-300 font-black text-sm">{s.value}</span>
                <span className="text-slate-400 text-xs font-bold">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </section>

      {/* ── OFFERS GRID ── */}
      <section className="py-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-white">
              اختر <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-orange-500">عرضك المفضل</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-xl mx-auto">كل عرض مصمم بعناية فائقة ليمنحكم أفضل تجربة سياحية ممكنة</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {offers.map((offer: any, index: number) => (
              <div
                key={offer.id}
                className="group relative bg-slate-900/80 backdrop-blur-sm rounded-[2.5rem] overflow-hidden border border-slate-800/80 hover:border-amber-500/30 shadow-xl hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Tag badge */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-gradient-to-l from-amber-500 to-orange-600 text-white px-5 py-2 rounded-full text-[11px] font-black shadow-lg shadow-amber-500/30 flex items-center gap-1.5">
                      <Sparkles size={12} />
                      {offer.tag || "عرض خاص"}
                    </div>
                  </div>

                  {/* Pricing overlay */}
                  <div className="absolute bottom-6 right-6 left-6 flex justify-between items-end">
                    <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-xl">
                      {offer.originalPrice && (
                        <div className="text-[10px] font-black text-slate-400 line-through mb-0.5">بدلاً من {offer.originalPrice} ₪</div>
                      )}
                      <div className="text-2xl font-black text-white">{offer.price} <span className="text-amber-400 text-lg">₪</span></div>
                    </div>
                    {offer.timeLeft && (
                      <div className="bg-red-500/20 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-red-300 flex items-center gap-2 border border-red-500/30">
                        <Timer size={14} className="text-red-400" />
                        {offer.timeLeft}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-5">
                  <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors leading-tight">
                    {offer.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-3">
                    {offer.description}
                  </p>

                  {/* Features chips */}
                  <div className="flex flex-wrap gap-2">
                    {["مرشد عربي", "إفطار شامل", "نقل VIP"].map((f, i) => (
                      <span key={i} className="text-[10px] font-bold text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 border-t border-slate-800">
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`أرغب في الاستفسار عن عرض: ${offer.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-l from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-amber-500/20 group-hover:shadow-amber-500/30"
                    >
                      <MessageCircle size={20} />
                      احجز العرض الآن
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US / TRUST BADGES ── */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-black text-white">لماذا <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-orange-500">يارين تورز؟</span></h2>
            <p className="text-slate-400 font-medium">نلتزم بأعلى معايير الجودة والموثوقية في كل عرض نقدمه</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "حجز مضمون", desc: "سياسات إلغاء وحجز مرنة وموثوقة", color: "emerald" },
              { icon: Star, title: "أعلى التقييمات", desc: "اهتمام بالغ بكل تفاصيل رحلتكم", color: "amber" },
              { icon: Gift, title: "هدايا سياحية", desc: "أدلة مجانية شاملة مع كل حجز", color: "purple" },
              { icon: CheckCircle2, title: "تأكيد فوري", desc: "تأكيد حجز سريع ومباشر", color: "blue" },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-slate-900/60 backdrop-blur-sm border border-slate-800 hover:border-amber-500/30 rounded-[2rem] p-8 flex flex-col items-center gap-5 text-center transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-[1.5rem] flex items-center justify-center group-hover:scale-110 transition-transform border border-amber-500/20">
                  <item.icon size={28} className="text-amber-400" />
                </div>
                <h4 className="text-lg font-black text-white">{item.title}</h4>
                <p className="text-sm font-medium text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 relative z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gradient-to-l from-amber-500/90 to-orange-600/90 rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative shadow-2xl shadow-amber-500/20">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-black/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 text-center md:text-right space-y-3">
              <h3 className="text-2xl md:text-3xl font-black text-white">لم تجد العرض المناسب؟</h3>
              <p className="text-white/80 font-medium max-w-lg leading-relaxed">
                فريق يارين تورز جاهز لتصميم عرض خاص لك حسب ميزانيتك ورغباتك. تواصل معنا الآن!
              </p>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("مرحباً يارين تورز، أبحث عن عرض سياحي خاص")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 bg-white text-orange-600 px-10 py-4 rounded-2xl font-black shadow-2xl hover:bg-slate-50 transition-all whitespace-nowrap shrink-0"
            >
              تحدث مع خبير 💬
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default OffersPage;
