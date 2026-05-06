"use client";

import React, { useState, useEffect } from "react";
import { 
  Activity, Clock, User, Info, CheckCircle, AlertTriangle, 
  XCircle, Filter, Search, Loader2, ChevronRight, Zap, Download,
  ArrowRight, Calendar, Layers, ShieldCheck
} from "lucide-react";
import { getActivities } from "@/lib/actions/logs";
import { motion, AnimatePresence } from "framer-motion";

const ActivityPage = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    setIsLoading(true);
    try {
      const data = await getActivities();
      setActivities(data);
    } catch (error) {
      console.error("Failed to load activities");
    }
    setIsLoading(false);
  };

  const downloadReport = async () => {
    if (activities.length === 0) return;
    
    setIsExporting(true);
    
    // Simulate professional processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    const headers = ["التاريخ والوقت", "نوع العملية", "التفاصيل الدقيقة", "المسؤول", "الحالة"];
    const rows = activities.map(act => [
      new Date(act.createdAt).toLocaleString('ar-EG'),
      act.action,
      act.details || "",
      act.adminName || "نظام آلي",
      "مكتمل"
    ]);

    const csvContent = [
      "\ufeff" + headers.join(","), 
      ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `تقرير-نشاط-يارين-${new Date().toLocaleDateString()}.csv`);
    link.click();
    
    setIsExporting(false);
  };

  const filteredActivities = activities.filter(act => 
    act.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    act.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    act.adminName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4" dir="rtl">
      {/* Exporting Overlay */}
      <AnimatePresence>
        {isExporting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl space-y-8"
            >
              <div className="relative w-24 h-24 mx-auto">
                 <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent" 
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Download size={24} className="text-indigo-600 animate-bounce" />
                 </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900">جاري تصدير البيانات</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">يرجى الانتظار، نقوم الآن بتنسيق التقرير وتحليل سجلات النظام لضمان الدقة...</p>
              </div>
              <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: "0%" }}
                   animate={{ width: "100%" }}
                   transition={{ duration: 2.5 }}
                   className="h-full bg-indigo-600"
                 />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-indigo-600 mb-1">
            <div className="p-2.5 bg-indigo-50 rounded-2xl shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">سجلات النظام</span>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">سجل العمليات</h1>
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium pr-1">مراقبة حية لكافة التغييرات التي تتم على المنصة لضمان الشفافية والأمان.</p>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="relative group hidden lg:block">
              <Search className="absolute inset-y-0 right-4 h-full flex items-center text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={16} />
              <input
                type="text"
                placeholder="ابحث عن عملية معينة..."
                className="w-72 bg-white border border-slate-100 rounded-2xl py-3.5 pr-12 pl-4 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-right shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>
           <button 
             onClick={downloadReport}
             className="px-8 py-4 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition-all flex items-center gap-3 shadow-xl shadow-slate-900/10 active:scale-95"
           >
             <Download size={16} />
             تصدير البيانات
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Stats Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm space-y-6">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2">إحصائيات سريعة</h4>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100/50">
                 <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">عمليات الإضافة</p>
                 <p className="text-2xl font-black text-emerald-700">{activities.filter(a => a.action.includes("إضافة")).length}</p>
              </div>
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100/50">
                 <p className="text-[10px] font-bold text-rose-600 uppercase mb-1">عمليات الحذف</p>
                 <p className="text-2xl font-black text-rose-700">{activities.filter(a => a.action.includes("حذف")).length}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100/50">
                 <p className="text-[10px] font-bold text-indigo-600 uppercase mb-1">عمليات التحديث</p>
                 <p className="text-2xl font-black text-indigo-700">{activities.filter(a => a.action.includes("تحديث")).length}</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] text-white relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
            <div className="relative z-10">
              <Layers size={28} className="mb-4 opacity-80" />
              <h4 className="text-sm font-bold mb-2">نسخة مؤرشفة</h4>
              <p className="text-[10px] text-indigo-100 leading-relaxed opacity-80">يتم الاحتفاظ بجميع السجلات لمدة 90 يوماً بشكل تلقائي لضمان المراجعة الدورية.</p>
            </div>
          </div>
        </div>

        {/* Timeline View */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="bg-white/50 border border-slate-100 rounded-[2.5rem] py-40 flex flex-col items-center justify-center gap-6">
               <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
               <p className="text-slate-400 text-sm font-bold animate-pulse">جاري فحص سجلات النظام...</p>
            </div>
          ) : filteredActivities.length > 0 ? (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredActivities.map((act, idx) => {
                  const isDelete = act.action.includes("حذف");
                  const isAdd = act.action.includes("إضافة");
                  const isUpdate = act.action.includes("تحديث");

                  return (
                    <motion.div 
                      key={act.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white border border-slate-50 hover:border-indigo-100 p-5 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6 relative"
                    >
                      <div className="flex items-start md:items-center gap-5">
                        <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                          isDelete ? "bg-rose-50 text-rose-500" :
                          isAdd ? "bg-emerald-50 text-emerald-500" :
                          "bg-indigo-50 text-indigo-500"
                        }`}>
                          {isDelete ? <XCircle size={20} /> : isAdd ? <CheckCircle size={20} /> : <Zap size={20} />}
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-extrabold text-slate-900 line-clamp-1">{act.details}</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                              isDelete ? "bg-rose-100 text-rose-600" :
                              isAdd ? "bg-emerald-100 text-emerald-600" :
                              "bg-indigo-100 text-indigo-600"
                            }`}>
                              {act.action}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-slate-400">
                             <div className="flex items-center gap-1.5 text-[10px] font-bold">
                                <User size={12} className="text-slate-300" />
                                {act.adminName || "نظام آلي"}
                             </div>
                             <div className="w-1 h-1 bg-slate-200 rounded-full" />
                             <div className="flex items-center gap-1.5 text-[10px] font-bold">
                                <Calendar size={12} className="text-slate-300" />
                                {new Date(act.createdAt).toLocaleDateString('ar-EG')}
                             </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none pt-4 md:pt-0 border-slate-50">
                        <div className="flex flex-col items-end">
                           <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                              <Clock size={14} className="text-slate-300" />
                              {new Date(act.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                           </div>
                           <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Time Log</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                           <ChevronRight size={14} className="rotate-180" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="bg-white border border-slate-100 rounded-[2.5rem] py-40 flex flex-col items-center justify-center text-center px-10">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200">
                  <Search size={40} />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">لم يتم العثور على نتائج</h3>
               <p className="text-slate-400 text-sm max-w-xs mx-auto">جرب استخدام كلمات بحث مختلفة أو تأكد من وجود عمليات مسجلة في النظام.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
