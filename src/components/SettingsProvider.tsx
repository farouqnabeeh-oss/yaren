"use client";

import React, { createContext, useContext } from "react";

const SettingsContext = createContext<any>(null);

export const SettingsProvider = ({ children, settings }: { children: React.ReactNode, settings: any }) => {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    // Fallback defaults if provider is missing
    return {
      siteName: "يارين تورز",
      phone: "+972 52-234-0930",
      whatsapp: "+972 52-234-0930",
      email: "Yreen.ab@gmail.com",
      address: "كفركنا، البلاد",
      facebook: "https://www.facebook.com/profile.php?id=61572795908081",
      instagram: "https://www.instagram.com/yaren_tours",
      heroVideo: "QOavkjHc1HU",
      eSimoCode: "YAREN",
      eSimoDiscount: "10%",
      aboutTitle: "يارين تورز.. نرسم لكم خارطة العالم",
      aboutText: "بوابتكم الدائمة لاكتشاف العالم بأعلى معايير الراحة والتنظيم."
    };
  }
  return context;
};
