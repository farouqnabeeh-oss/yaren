"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, Trash2, FileText, Edit3, X, Check, Loader2, 
  ChevronUp, ChevronDown, LayoutGrid, Info, HelpCircle, 
  Search, Filter, MoreHorizontal
} from "lucide-react";
import { getFAQs, createFAQ, deleteFAQ, updateFAQ } from "@/lib/actions/content";
import { motion, AnimatePresence } from "framer-motion";

const ContentManager = () => {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { loadFaqs(); }, []);
  const loadFaqs = async () => { const data = await getFAQs(); setFaqs(data); };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    
    let result;
    if (editingFaq) {
      result = await updateFAQ(editingFaq.id, formData);
    } else {
      result = await createFAQ(formData);
    }
    
    if (result && result.success) {
      setIsModalOpen(false);
      setEditingFaq(null);
      await loadFaqs();
    } else {
      alert("خطأ في حفظ السؤال، حاول مرة أخرى.");
    }
    
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.")) { 
      await deleteFAQ(id); 
      loadFaqs(); 
    }
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-32" dir="rtl">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2">
            <FileText size={12} /> إدارة المحتوى والأسئلة الشائعة
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">الأسئلة الشائعة</h1>
          <p className="text-slate-400 font-medium text-base">
            إدارة بنك المعلومات والأسئلة بأسلوب هادئ وجميل.
          </p>
        </div>
        
        <button 
          onClick={() => { setEditingFaq(null); setIsModalOpen(true); }} 
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs flex items-center gap-3 hover:bg-primary hover:text-slate-900 transition-all shadow-xl shadow-slate-900/5 active:scale-95"
        >
          <Plus size={16} /> إضافة سؤال جديد
        </button>
      </div>

      {/* Search & Stats - Minimalist */}
      <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute inset-y-0 right-4 h-full flex items-center text-slate-300 group-focus-within:text-slate-900 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="بحث في الأسئلة..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-xl py-3 pr-12 pl-4 text-sm font-medium outline-none focus:border-slate-200 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 text-slate-300 font-black text-[10px] uppercase tracking-widest">
          <Filter size={12} /> {filteredFaqs.length} سؤال متاح
        </div>
      </div>

      {/* Content List - Extreme Zen Simplicity */}
      <div className="max-w-3xl mx-auto divide-y divide-slate-100">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <motion.div 
              layout
              key={faq.id} 
              className="py-12 group transition-all"
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-12">
                <div className="flex-grow space-y-6 text-right">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-300 tracking-[0.3em] uppercase">Element {faq.order}</p>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{faq.question}</h3>
                  </div>
                  
                  <p className="text-slate-500 text-lg leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 shrink-0 md:opacity-0 group-hover:opacity-100 transition-all duration-500 md:translate-x-4 group-hover:translate-x-0">
                  <button 
                    onClick={() => { setEditingFaq(faq); setIsModalOpen(true); }} 
                    className="text-slate-400 hover:text-slate-900 transition-colors"
                  >
                    <Edit3 size={20} strokeWidth={1.5} />
                  </button>
                  <button 
                    onClick={() => handleDelete(faq.id)} 
                    className="text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={20} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-60 text-center">
            <p className="text-slate-200 font-black text-6xl tracking-tighter opacity-20">EMPTY</p>
          </div>
        )}
      </div>

      {/* Modal - Redesigned to be Premium */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 30 }}
              className="bg-white rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl relative z-10"
            >
              <div className="p-10 text-right space-y-2">
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                  {editingFaq ? "تحديث السؤال" : "سؤال جديد"}
                </h3>
                <p className="text-slate-400 font-medium text-sm">أضف لمستك الخاصة على محتوى المنصة.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-10 pt-0 space-y-10">
                <div className="space-y-2 text-right">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">نص السؤال</label>
                  <input 
                    name="question" 
                    defaultValue={editingFaq?.question} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-slate-700 font-bold outline-none focus:bg-white focus:border-slate-900 transition-all text-right" 
                    placeholder="اكتب السؤال هنا..."
                    required 
                  />
                </div>
                
                <div className="space-y-2 text-right">
                  <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest px-1">الإجابة</label>
                  <textarea 
                    name="answer" 
                    defaultValue={editingFaq?.answer} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-6 px-8 text-slate-700 font-medium outline-none focus:bg-white focus:border-slate-900 transition-all min-h-[180px] resize-none text-right leading-relaxed" 
                    placeholder="اكتب الإجابة التفصيلية..."
                    required 
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-6 pt-4">
                  <button 
                    type="submit" 
                    disabled={isSaving} 
                    className="flex-grow bg-slate-900 text-white py-5 rounded-2xl font-black text-sm shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 hover:bg-primary hover:text-slate-900 transition-all disabled:opacity-50 active:scale-95"
                  >
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
                    {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-5 rounded-2xl font-bold text-slate-400 hover:text-slate-900 transition-colors text-sm"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentManager;
