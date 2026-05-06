const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const DB_URL = "postgresql://postgres.fobtwubshwovtyefzfrg:1000200030004000@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres";

const pool = new Pool({ connectionString: DB_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🔄 Updating official contact data...');

  // Update Global Settings
  await prisma.siteSettings.upsert({
    where: { id: 'global' },
    update: {
      phone: '+972 52-234-0930',
      email: 'Yreen.ab@gmail.com',
      address: 'كفركنا، المركز التجاري',
    },
    create: {
      id: 'global',
      phone: '+972 52-234-0930',
      email: 'Yreen.ab@gmail.com',
      address: 'كفركنا، المركز التجاري',
      heroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-traveling-on-a-highway-through-the-mountains-4290-large.mp4',
      eSimoCode: 'YAREN',
      eSimoDiscount: '10%',
      aboutTitle: 'يارين تورز.. بوابتكم لاكتشاف العالم',
      aboutText: 'نحن شركة رائدة في مجال السياحة والسفر، نقدم خدمات متكاملة تشمل الرحلات المنظمة وحجز الفنادق والطيران بأعلى معايير الجودة.',
    },
  });
  console.log('✅ Global settings updated with official data');

  console.log('🚀 Update complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
