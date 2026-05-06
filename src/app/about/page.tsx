import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Heart, Users, Map, Compass, Globe, Award, Zap } from "lucide-react";
import { getSettings } from "@/lib/actions/settings";

export default async function AboutPage() {
  const settings = await getSettings();

  return (
    <main className="flex-grow bg-white min-h-screen font-sans" dir="rtl">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-900 text-white">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-6 py-2 rounded-full mt-7 text-xs font-black uppercase tracking-widest mb-8 border border-primary/30">
            <Sparkle size={14} className="animate-pulse" />
            قصة النجاح
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            نحن <span className="text-primary italic">يارين تورز</span> <br /> 
            نرسم لك خارطة العالم
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            أكثر من مجرد وكالة سفر، نحن شركاؤكم في صناعة الذكريات واكتشاف أسرار الأرض بأعلى معايير الرفاهية والاحترافية.
          </p>
        </div>
      </section>

      {/* Our Story & Vision */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="rounded-[4rem] overflow-hidden shadow-2xl relative group">
                <img 
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000" 
                  alt="Yaren Tours Story" 
                  className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-10 right-10 left-10 p-8 bg-white/90 backdrop-blur-md rounded-3xl border border-white/20">
                  <p className="text-slate-900 font-black text-2xl mb-2 italic">"الرحلة لا تقاس بالأميال، بل باللحظات التي تخطف الأنفاس."</p>
                  <p className="text-primary font-bold text-sm">يارين تورز - القيادة والريادة</p>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                  كيف بدأت <span className="text-primary underline decoration-4 underline-offset-8">الرحلة</span>؟
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                  تأسست يارين تورز لتكون الجسر الذي يربط المسافر العربي بأجمل وجهات العالم. انطلقنا من رؤية بسيطة: السفر يجب أن يكون ممتعاً، آمناً، ومخططاً له بدقة متناهية. اليوم، نحن نفخر بكوننا الوجهة الأولى للرحلات المنظمة في البلاد.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-primary transition-all group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <Award size={28} />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">جودة استثنائية</h4>
                  <p className="text-slate-400 text-sm font-bold">نختار أفضل الفنادق وأدق المسارات لنضمن راحتكم التامة.</p>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-primary transition-all group">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <Heart size={28} />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">خدمة من القلب</h4>
                  <p className="text-slate-400 text-sm font-bold">فريقنا متاح لخدمتكم وإرشادكم في كل خطوة من رحلتكم.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Bento Grid Style */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">لماذا يارين تورز؟</h2>
          <p className="text-slate-500 font-bold max-w-2xl mx-auto">ما يميزنا هو اهتمامنا بالتفاصيل الصغيرة التي تصنع الفرق الكبير.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <Globe size={48} className="text-primary mb-8" />
            <h3 className="text-3xl font-black mb-4 leading-tight">تغطية عالمية واسعة 🌍</h3>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl font-medium">
              من إسطنبول الساحرة إلى شرم الشيخ الخلابة، ومن دبي المستقبل إلى أوروبا الكلاسيكية. نحن نأخذكم إلى كل مكان تحلمون به.
            </p>
          </div>
          <div className="bg-orange-600 rounded-[3rem] p-12 text-white relative overflow-hidden group">
             <ShieldCheck size={48} className="text-white mb-8" />
             <h3 className="text-3xl font-black mb-4">أمان وموثوقية 🛡️</h3>
             <p className="text-orange-100 text-lg leading-relaxed font-medium">
               نحن شركة مسجلة ومرخصة، ونعمل مع أقوى الشركاء العالميين لنضمن لك رحلة آمنة 100%.
             </p>
          </div>
          <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl group">
             <Users size={48} className="text-primary mb-8" />
             <h3 className="text-2xl font-black text-slate-900 mb-4">إرشاد عربي كامل 🗣️</h3>
             <p className="text-slate-500 text-sm leading-relaxed font-bold">
               لا داعي للقلق بشأن اللغة، جميع رحلاتنا المنظمة تشمل مرشدين يتحدثون العربية بطلاقة لضمان تواصلكم وفهمكم لكل تفصيلة.
             </p>
          </div>
          <div className="md:col-span-2 bg-white rounded-[3rem] p-12 border border-slate-100 shadow-xl flex flex-col md:flex-row items-center gap-12 group">
             <div className="flex-grow">
               <Zap size={48} className="text-primary mb-8" />
               <h3 className="text-3xl font-black text-slate-900 mb-4">سرعة وسهولة ⚡</h3>
               <p className="text-slate-500 text-lg leading-relaxed font-medium">
                 نظام الحجز لدينا مصمم ليكون الأبسط والأسرع. سواء كنت تبحث عن طيران، فندق، أو باص، يمكنك إنهاء طلبك في دقائق.
               </p>
             </div>
             <div className="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center shrink-0 border-4 border-orange-500/10">
                <Compass size={80} className="text-primary animate-[spin_10s_linear_infinite]" />
             </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="bg-slate-900 rounded-[4rem] p-16 md:p-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 tracking-tighter">
              جاهز لاكتشاف العالم مع <span className="text-primary">يارين</span>؟
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
              <a 
                href="/trips" 
                className="w-full md:w-auto bg-orange-600 hover:bg-primary/90 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-[0_20px_40px_rgba(234,88,12,0.3)]"
              >
                تصفح الرحلات المنظمة
              </a>
              <a 
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} 
                target="_blank"
                className="w-full md:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-2xl font-black text-xl transition-all"
              >
                تحدث مع مستشار سفر
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const Sparkle = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
