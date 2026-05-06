import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SettingsProvider } from "@/components/SettingsProvider";
import { getSettings } from "@/lib/actions/settings";
import AccessibilityToolbar from "@/components/ui/AccessibilityToolbar";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "يارين تورز | رحلات منظمة وفنادق مميزة",
  description: "بوابتكم لاكتشاف العالم بأعلى معايير الراحة والتنظيم. رحلات منظمة، فنادق، طيران، ومواصلات.",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Providers>
          <SettingsProvider settings={settings}>
            <AccessibilityToolbar />
            {children}
          </SettingsProvider>
        </Providers>
      </body>
    </html>
  );
}
