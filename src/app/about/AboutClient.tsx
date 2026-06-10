"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ShieldCheck,
  Heart,
  Users,
  Map,
  Compass,
  Globe,
  Award,
  Sparkles,
  Calendar,
  Quote,
  Target,
  Eye,
  ChevronLeft,
  Star,
  ChevronRight,
  TrendingUp,
  UserCheck
} from "lucide-react";
import { useSettings } from "@/components/SettingsProvider";
import { motion } from "framer-motion";

interface Expert {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface AboutClientProps {
  dbExperts: Expert[];
}

const defaultTeam: Expert[] = [
  {
    id: "default-1",
    name: "محمد احمد",
    role: "المؤسس والمدير التنفيذي",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    bio: "خبرة تزيد عن 10 سنوات في إدارة قطاع السياحة والسفر وتصميم المسارات الفاخرة."
  },
  {
    id: "default-2",
    name: "سارة العلي",
    role: "رئيسة قسم الرحلات المنظمة",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    bio: "شغوفة باكتشاف التفاصيل الفريدة وتنسيق أفضل التجارب الثقافية للمجموعات والعائلات."
  },
  {
    id: "default-3",
    name: "أحمد المصري",
    role: "مستشار الحجوزات وكبار الشخصيات",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    bio: "متخصص في تلبية متطلبات السفر الفاخر وحل مشاكل الحجز الفوري والدعم اللوجستي."
  }
];

export default function AboutClient({ dbExperts }: AboutClientProps) {
  const settings = useSettings();
  const team = dbExperts.length > 0 ? dbExperts : defaultTeam;

  const timelineEvents = [
    {
      year: "2018",
      title: "تأسيس الوكالة والانطلاق",
      desc: "بدأت يارين تورز برؤية واضحة لتقديم مفهوم جديد للسفر والرحلات المنظمة، تضمن أعلى معايير الراحة وبإرشاد عربي كامل."
    },
    {
      year: "2020",
      title: "التوسع الإقليمي والوجهات",
      desc: "توسيع باقة خدماتنا لتشمل الفنادق الفاخرة والطيران المباشر، وتغطية وجهات سياحية رئيسية كتركيا، مصر، والأردن."
    },
    {
      year: "2023",
      title: "إطلاق شرائح eSIM والحلول الذكية",
      desc: "تقديم أول خدمة شريحة إلكترونية eSimO وتسهيل حجز خطوط الحافلات والمعابر الحدودية رقمياً بالكامل."
    },
    {
      year: "2026",
      title: "الريادة والثقة المستمرة",
      desc: "فخورون بكوننا الوجهة الأولى والأكثر أماناً للرحلات المنظمة في البلاد، بخدمة أكثر من 15,000 مسافر سنوياً."
    }
  ];

  const stats = [
    { value: "+15,000", label: "مسافر سعيد", desc: "وثقوا بنا لتصميم عطلاتهم" },
    { value: "+8", label: "سنوات تميز", desc: "من الخبرة والعطاء المستمر" },
    { value: "+50", label: "وجهة سياحية", desc: "حول العالم بخدمات متكاملة" },
    { value: "99%", label: "نسبة الرضا", desc: "تقييم إيجابي من عملائنا" }
  ];

  const whatsappNumber = settings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <main className="min-h-screen flex flex-col bg-slate-950 text-white font-sans relative overflow-hidden" dir="rtl">
      <Navbar />

      {/* Background ambient glows */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-[35%] left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-52 pb-36 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay scale-105 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-l from-amber-500/20 to-orange-500/20 border border-amber-500/30 px-6 py-2.5 rounded-full"
          >
            <Sparkles size={14} className="text-amber-400 animate-pulse" />
            <span className="text-xs font-black text-amber-200 uppercase tracking-widest">مرحباً بكم في يارين تورز</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-tight text-white"
          >
            عالم من الفخامة <br />
            ترسمه <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-orange-500 font-black">يارين تورز</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-base md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            أكثر من مجرد وكالة سفر، نحن رفيق دربكم الموثوق في استكشاف أجمل تفاصيل الأرض وصناعة ذكريات عائلية ممتعة تدوم طويلاً.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Visual block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -z-10" />
              <div className="rounded-[3rem] overflow-hidden shadow-2xl relative group border border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000"
                  alt="Yaren Tours Story"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-8 right-8 left-8 p-6 bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl text-slate-100">
                  <p className="font-bold text-base md:text-lg mb-2 italic leading-relaxed">"الرحلة الحقيقية لا تكمن في رؤية مناظر جديدة، بل في امتلاك عيون جديدة."</p>
                  <p className="text-amber-400 font-bold text-xs">يارين تورز — ريادة التفاصيل والأمان</p>
                </div>
              </div>
            </motion.div>

            {/* Content Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-right"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">قصتنا ورسالتنا</span>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                  شغف التميز في <br />
                  تفاصيل <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-orange-500">رحلتكم</span>
                </h2>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                  تأسست يارين تورز لتكون بمثابة همزة الوصل الأكثر أماناً وموثوقية بين المسافر العربي وأجمل بقاع الأرض. انطلقنا من رؤية واضحة وبسيطة: السفر يجب أن يكون متعة خالية من المتاعب والتفاصيل المربكة. اليوم، نحن نضع خلاصة خبراتنا وعلاقتنا الدولية الواسعة لنوفر لكم مسارات سياحية مختارة بعناية بالغة تضمن الفخامة والخصوصية المطلوبة.
                </p>
              </div>

              {/* Bento styled inner values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-3xl hover:border-amber-500/30 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-4 border border-slate-700/60 shadow-sm group-hover:bg-amber-500 transition-all">
                    <Award size={22} className="text-amber-400 group-hover:text-slate-900 transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">جودة متكاملة</h4>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">ننتقي أفضل الفنادق ونختار دقة مواعيد الطيران لنضمن راحتكم التامة.</p>
                </div>
                <div className="p-6 bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-3xl hover:border-amber-500/30 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-4 border border-slate-700/60 shadow-sm group-hover:bg-amber-500 transition-all">
                    <Heart size={22} className="text-amber-400 group-hover:text-slate-900 transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">خدمة من القلب</h4>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">فريق عملنا وإرشادنا العربي يرافقكم في كل محطة وتفصيل لرحلتكم.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 relative z-10 bg-slate-900/40 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center p-6 bg-slate-900/50 backdrop-blur-md border border-slate-850 rounded-[2rem] hover:border-amber-500/25 transition-colors"
              >
                <div className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-orange-500 mb-2">{s.value}</div>
                <div className="text-sm font-black text-white mb-1">{s.label}</div>
                <div className="text-xs text-slate-400 font-medium">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Values Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          <div className="text-center mb-16 space-y-4">
            <span className="inline-block bg-amber-500/10 text-amber-300 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-black">مزايا حصرية</span>
            <h2 className="text-3xl md:text-5xl font-black text-white">لماذا يارين تورز؟</h2>
            <p className="text-slate-400 font-medium max-w-xl mx-auto text-sm md:text-base">التفاصيل الصغيرة واللمسات الخاصة هي ما يصنع الفارق الحقيقي في رحلتكم معنا.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Box 1 */}
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(245, 158, 11, 0.3)" }}
              className="md:col-span-2 bg-slate-900/50 backdrop-blur-sm rounded-[2.5rem] p-10 border border-slate-800 flex flex-col justify-between group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px] group-hover:scale-150 transition-all duration-700" />
              <div className="relative z-10 space-y-4">
                <Globe size={44} className="text-amber-400" />
                <h3 className="text-2xl font-black text-white">تغطية جغرافية واسعة 🌍</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                  من إسطنبول الساحرة وشرم الشيخ، إلى دبي المستقبل وجزر المالديف والعمرة الفاخرة. نأخذكم أينما تشتهي أنفسكم مع أرقى خيارات الإقامة وخطط السفر المريحة والمدروسة.
                </p>
              </div>
            </motion.div>

            {/* Box 2 */}
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(245, 158, 11, 0.3)" }}
              className="bg-slate-900/50 backdrop-blur-sm rounded-[2.5rem] p-10 border border-slate-800 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[80px]" />
              <div className="relative z-10 space-y-4">
                <ShieldCheck size={44} className="text-amber-400" />
                <h3 className="text-2xl font-black text-white">أمان وموثوقية 🛡️</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  نحن شركة سياحة مسجلة ومرخصة قانونياً بالكامل، نلتزم بشروط الإلغاء والاسترجاع لضمان حقوقكم المالية وسلامة مساركم السياحي في كل وقت.
                </p>
              </div>
            </motion.div>

            {/* Box 3 */}
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(245, 158, 11, 0.3)" }}
              className="bg-slate-900/50 backdrop-blur-sm rounded-[2.5rem] p-10 border border-slate-800 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[80px]" />
              <div className="relative z-10 space-y-4">
                <Users size={44} className="text-amber-400" />
                <h3 className="text-2xl font-black text-white">إرشاد عربي 🗣️</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  جميع رحلاتنا المنظمة يرافقها نخبة من المرشدين السياحيين الذين يتحدثون العربية بطلاقة، مما يسهل عليكم تواصلكم واكتشافكم لمعالم وثقافات الوجهة بيسر تام.
                </p>
              </div>
            </motion.div>

            {/* Box 4 */}
            <motion.div
              whileHover={{ y: -6, borderColor: "rgba(245, 158, 11, 0.3)" }}
              className="md:col-span-2 bg-slate-900/50 backdrop-blur-sm rounded-[2.5rem] p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative group"
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px]" />
              <div className="space-y-4 text-right relative z-10">
                <Compass size={44} className="text-amber-400" />
                <h3 className="text-2xl font-black text-white">سهولة وسرعة في الحجز ⚡</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  نظام حجز مبسط وذكي، سواء كنت تبحث عن طيران، فندق، أو باص، يمكنك إنهاء حجزك وتنسيقه مع خبرائنا في بضع خطوات عبر الواتساب.
                </p>
              </div>
              <div className="w-28 h-28 bg-slate-800/80 rounded-full flex items-center justify-center shrink-0 border border-slate-700/60 shadow-md relative z-10">
                <Compass size={48} className="text-amber-400 animate-[spin_30s_linear_infinite]" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* History & Milestones Section (Timeline) */}
      <section className="py-24 relative z-10 bg-slate-900/20 border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center mb-20">
            <span className="inline-block bg-amber-500/10 text-amber-300 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-black mb-3">حكايتنا بالأرقام</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">مسيرتنا المتميزة</h2>
            <p className="text-slate-400 font-bold max-w-xl mx-auto text-sm md:text-base">خطوات من النجاح والابتكار المستمر لنصنع لكم معايير سياحة تفوق التوقعات.</p>
          </div>

          <div className="relative border-r-2 border-slate-800 mr-4 md:mr-8 space-y-12">
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative pr-8 md:pr-12 group"
              >
                {/* Year Badge */}
                <div className="absolute -right-[15px] top-1.5 w-7 h-7 rounded-full bg-slate-950 border-2 border-amber-500 flex items-center justify-center z-10 group-hover:bg-amber-500 transition-colors duration-300 shadow-md">
                  <div className="w-2 h-2 rounded-full bg-amber-500 group-hover:bg-slate-950" />
                </div>

                <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-[2rem] p-6 md:p-8 hover:border-amber-500/30 hover:bg-slate-900 transition-all duration-300 text-right">
                  <span className="text-amber-400 font-black text-2xl mb-2 block">{event.year}</span>
                  <h4 className="text-lg font-black text-white mb-2">{event.title}</h4>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Team Section — dynamically powered by DB */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block bg-amber-500/10 text-amber-300 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-black mb-3">فريق العمل</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">خبراء صناعة السفر</h2>
            <p className="text-slate-400 font-bold max-w-xl mx-auto text-sm md:text-base">نخبة من المستشارين والخبراء المكرسين لخدمتكم وتخطيط أسفاركم بدقة واحترافية.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group bg-slate-900/60 backdrop-blur-sm border border-slate-800 hover:border-amber-500/30 rounded-[2.5rem] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 text-right flex flex-col h-full"
              >
                <div className="h-80 overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Position overlay */}
                  <div className="absolute bottom-6 right-6">
                    <span className="bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full">
                      {member.role}
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1"><UserCheck size={14} className="text-amber-400" /> مستشار معتمد</span>
                    <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /> 5.0 (ممتاز)</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Vision / Quote Banner */}
      <section className="py-20 relative z-10 bg-slate-950/80 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl text-white">
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]" />
            <Quote size={48} className="text-amber-500/10 mx-auto mb-6" />
            <p className="text-lg md:text-2xl font-bold text-slate-200 leading-relaxed mb-6">
              "نؤمن في يارين تورز أن السفر ليس مجرد الانتقال من مكان لآخر، بل هو فرصة لتوسيع الآفاق، وبناء الصداقات، وجمع حكايات رائعة تثري قلوبنا وعقولنا."
            </p>
            <span className="text-amber-400 font-black text-xs uppercase tracking-widest block">الرؤية العامة والرسالة</span>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative z-10 bg-slate-950">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-l from-amber-500 to-orange-600 rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden shadow-2xl text-white">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-black text-white mb-8 relative z-10 tracking-tighter">
              جاهز لاكتشاف العالم بتفاصيل لا تنسى؟
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <a
                href="/trips"
                className="w-full sm:w-auto bg-white text-orange-600 hover:bg-slate-50 px-12 py-4 rounded-2xl font-black text-base transition-all shadow-xl"
              >
                تصفح الرحلات المنظمة
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-12 py-4 rounded-2xl font-black text-base transition-all"
              >
                استشر خبيراً
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
