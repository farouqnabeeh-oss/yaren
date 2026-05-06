-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "duration" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'organized',
    "rating" REAL NOT NULL DEFAULT 4.9,
    "reviewCount" INTEGER NOT NULL DEFAULT 124,
    "showGuide" BOOLEAN NOT NULL DEFAULT true,
    "guideName" TEXT,
    "guideImage" TEXT,
    "guideExp" TEXT,
    "features" TEXT NOT NULL,
    "itinerary" TEXT,
    "hotspots" TEXT,
    "gallery" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 5,
    "region" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "mealPlans" TEXT NOT NULL,
    "roomTypes" TEXT NOT NULL,
    "pricingMatrix" TEXT NOT NULL,
    "mealSupplements" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Flight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "departureTime" TEXT NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "airline" TEXT NOT NULL,
    "cabin" TEXT NOT NULL DEFAULT 'ECONOMY',
    "price" REAL NOT NULL,
    "isLastMinute" BOOLEAN NOT NULL DEFAULT false,
    "lastMinutePrice" REAL,
    "availableDays" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'global',
    "phone" TEXT NOT NULL DEFAULT '+972 000-000-000',
    "email" TEXT NOT NULL DEFAULT 'info@yarentours.com',
    "address" TEXT NOT NULL DEFAULT 'كفركنا، المركز الرئيسي',
    "whatsapp" TEXT NOT NULL DEFAULT 'https://wa.me/...',
    "facebook" TEXT NOT NULL DEFAULT '#',
    "instagram" TEXT NOT NULL DEFAULT '#',
    "heroVideo" TEXT NOT NULL DEFAULT '...',
    "eSimoCode" TEXT NOT NULL DEFAULT 'YAREN',
    "eSimoDiscount" TEXT NOT NULL DEFAULT '10%'
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
