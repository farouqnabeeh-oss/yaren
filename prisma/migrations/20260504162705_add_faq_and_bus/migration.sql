-- CreateTable
CREATE TABLE "BusTrip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "days" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'global',
    "phone" TEXT NOT NULL DEFAULT '+972 000-000-000',
    "email" TEXT NOT NULL DEFAULT 'info@yarentours.com',
    "address" TEXT NOT NULL DEFAULT 'كفركنا، المركز الرئيسي',
    "whatsapp" TEXT NOT NULL DEFAULT 'https://wa.me/...',
    "facebook" TEXT NOT NULL DEFAULT '#',
    "instagram" TEXT NOT NULL DEFAULT '#',
    "heroVideo" TEXT NOT NULL DEFAULT '...',
    "eSimoCode" TEXT NOT NULL DEFAULT 'YAREN',
    "eSimoDiscount" TEXT NOT NULL DEFAULT '10%',
    "aboutTitle" TEXT NOT NULL DEFAULT 'يارين تورز.. نرسم لكم خارطة العالم',
    "aboutText" TEXT NOT NULL DEFAULT 'بوابتكم الدائمة لاكتشاف العالم بأعلى معايير الراحة والتنظيم.'
);
INSERT INTO "new_SiteSettings" ("address", "eSimoCode", "eSimoDiscount", "email", "facebook", "heroVideo", "id", "instagram", "phone", "whatsapp") SELECT "address", "eSimoCode", "eSimoDiscount", "email", "facebook", "heroVideo", "id", "instagram", "phone", "whatsapp" FROM "SiteSettings";
DROP TABLE "SiteSettings";
ALTER TABLE "new_SiteSettings" RENAME TO "SiteSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
