"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BorderCrossings } from "@/components/home/ExtraServices";

export default function CrossingsPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col" dir="rtl">
      <Navbar />
      <div className="pt-24">
        <BorderCrossings />
      </div>
      <Footer />
    </main>
  );
}
