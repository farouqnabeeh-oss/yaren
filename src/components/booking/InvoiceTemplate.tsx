"use client";

import React from "react";
import { CheckCircle2, Package, Calendar, Tag, CreditCard, ExternalLink } from "lucide-react";

const InvoiceTemplate = ({ order }: { order: any }) => {
  return (
    <div className="max-w-xl mx-auto bg-white border border-slate-100 shadow-2xl rounded-[3rem] overflow-hidden text-right">
      <div className="bg-slate-900 p-10 text-white flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black">فاتورة الشراء</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Yarin Tours Official Invoice</p>
        </div>
        <div className="text-left">
          <div className="text-orange-500 font-black text-xl"># {order.orderId}</div>
          <div className="text-[10px] text-slate-500 font-bold">{order.date}</div>
        </div>
      </div>

      <div className="p-10 space-y-8">
        <div className="flex items-center gap-4 bg-green-50 p-4 rounded-2xl border border-green-100">
          <CheckCircle2 className="text-green-600" size={24} />
          <div>
            <h4 className="text-sm font-black text-slate-900">تم تأكيد الدفع بنجاح</h4>
            <p className="text-[10px] text-slate-500 font-bold">رقم العملية: {order.transactionId}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-2">تفاصيل الطلب</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-400">الخدمة:</span>
              <span className="text-slate-900">{order.serviceName || "حجز فندق / رحلة"}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-400">التاريخ:</span>
              <span className="text-slate-900">{order.bookingDate || "غير محدد"}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-400">المبلغ الإجمالي:</span>
              <span className="text-orange-600 font-black text-xl">{order.totalPrice} ₪</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-slate-400">نوع البطاقة:</span>
              <span className="text-slate-900">Visa / Mastercard</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
          <div className="flex items-center gap-3 text-orange-600 font-black text-sm">
            <Tag size={18} />
            هدية مجانية مشمولة
          </div>
          <p className="text-xs text-slate-500 font-bold leading-relaxed">
            لقد تم إرسال "دليل يارين الشامل لطرابزون" إلى بريدك الإلكتروني بصيغة PDF. استمتع برحلتك!
          </p>
          <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
            تحميل الدليل الآن <ExternalLink size={14} />
          </button>
        </div>

        <div className="pt-8 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-bold mb-4">شكراً لاختياركم يارين تورز. نتمنى لكم رحلة سعيدة!</p>
          <div className="flex justify-center gap-6 grayscale opacity-30">
             <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg" className="h-3" alt="Visa" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
