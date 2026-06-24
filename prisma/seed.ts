import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");

  await prisma.fAQ.deleteMany({});
  await prisma.trip.deleteMany({});

  console.log("🗑️  Cleared existing trips and FAQs");

  // Organized Trips — matching the exact schema
  const trips = [
    {
      title: "رحلة إسطنبول الساحرة - صيف 2026",
      description: "استمتع بأجمال مدينة في العالم. رحلة متكاملة تشمل أبرز معالم إسطنبول مع مرشد عربي طوال الرحلة وفندق 5 نجوم في قلب المدينة.",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=1000",
      price: 3500,
      duration: "7 أيام / 6 ليالي",
      features: JSON.stringify(["طيران مباشر", "فنادق 5 نجوم", "إرشاد عربي كامل", "وجبات إفطار وعشاء", "جولات سياحية يومية"]),
      type: "organized",
      date: "15/06/2026",
      rating: 4.9,
      reviewCount: 124,
      showGuide: true,
      guideName: "أحمد السياحي",
      guideExp: "10 سنوات خبرة في تركيا",
    },
    {
      title: "باقة دبي الرفاهية: تسوق واستجمام",
      description: "اكتشف بريق دبي في رحلة مصممة للرفاهية والتسوق. من برج خليفة إلى سفاري الصحراء، كل لحظة لا تُنسى.",
      image: "https://images.unsplash.com/photo-1512453979798-5ea444f888e3?auto=format&fit=crop&q=80&w=1000",
      price: 4800,
      duration: "5 أيام / 4 ليالي",
      features: JSON.stringify(["طيران الإمارات", "فندق في النخلة", "دخول برج خليفة", "سفاري صحراوية", "توصيلات VIP"]),
      type: "organized",
      date: "10/07/2026",
      rating: 4.8,
      reviewCount: 89,
      showGuide: true,
      guideName: "محمد العلي",
      guideExp: "8 سنوات خبرة في الإمارات",
    },
    {
      title: "رحلة شرم الشيخ: منتجعات وفن",
      description: "انغمس في جمال شرم الشيخ مع إقامة All Inclusive فاخرة ورحلات غوص وجلسات سبا لا مثيل لها على ساحل البحر الأحمر.",
      image: "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&q=80&w=1000",
      price: 2200,
      duration: "4 أيام / 3 ليالي",
      features: JSON.stringify(["منتجع All Inclusive", "رحلات بحرية", "غوص وسنوركل", "سهرات ليلية", "توصيل باص سياحي"]),
      type: "organized",
      date: "05/08/2026",
      rating: 4.7,
      reviewCount: 201,
      showGuide: true,
      guideName: "يوسف المصري",
      guideExp: "12 سنة في السياحة المصرية",
    },
    {
      title: "رحلة الأردن: البتراء ووادي رم",
      description: "تجربة فريدة بين روعة الحضارة النبطية في البتراء وسحر الصحراء الحمراء في وادي رم. رحلة لمحبي المغامرة والتاريخ.",
      image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1000",
      price: 1800,
      duration: "3 أيام / ليليتين",
      features: JSON.stringify(["مبيت في وادي رم", "زيارة البتراء", "جولات دفع رباعي", "سهرات بدوية أصيلة", "توصيل باص"]),
      type: "organized",
      date: "20/05/2026",
      rating: 4.9,
      reviewCount: 167,
      showGuide: true,
      guideName: "سامر الأردني",
      guideExp: "9 سنوات في السياحة الأردنية",
    }
  ];

  for (const trip of trips) {
    await prisma.trip.create({ data: trip });
    console.log(`✅ Trip: ${trip.title}`);
  }

  // FAQs
  const faqs = [
    {
      question: "كيف يمكنني تأكيد حجزي؟",
      answer: "يمكنك تأكيد الحجز مباشرة عبر الموقع بالضغط على 'احجز الآن' وسيتم توجيهك للواتساب، أو زيارة مكتبنا في كفركنا ودفع العربون.",
      order: 1
    },
    {
      question: "ما هي سياسة الإلغاء؟",
      answer: "نقدم سياسة إلغاء مرنة، يمكنك استرداد العربون كاملاً قبل موعد الرحلة بـ 14 يوماً للرحلات الخارجية، و48 ساعة للرحلات المحلية.",
      order: 2
    },
    {
      question: "هل تشمل الأسعار الطيران؟",
      answer: "نعم، كافة الرحلات المنظمة المذكورة تشمل تذاكر الطيران ذهاباً وإياباً إلا إذا ذكر خلاف ذلك في تفاصيل الرحلة.",
      order: 3
    },
    {
      question: "ما هي الأوراق المطلوبة للسفر؟",
      answer: "تحتاج إلى جواز سفر ساري المفعول لمدة 6 أشهر على الأقل. فريقنا يساعدك في استصدار التأشيرات اللازمة لكافة الوجهات.",
      order: 4
    },
    {
      question: "هل يوجد مرشد سياحي مرافق؟",
      answer: "نعم، كافة رحلاتنا المنظمة يرافقها مرشد سياحي خبير يتحدث العربية لضمان راحتكم وتقديم أفضل المعلومات.",
      order: 5
    }
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
    console.log(`✅ FAQ: ${faq.question}`);
  }

  console.log("\n🚀 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
