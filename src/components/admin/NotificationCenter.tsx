"use client";

import React, { useState, useEffect } from "react";
import { Bell, Check, Clock, Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { getNotifications, markAsRead } from "@/lib/actions/logs";
import { motion, AnimatePresence } from "framer-motion";

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  const handleMarkRead = async (id: string) => {
    await markAsRead(id);
    loadNotifications();
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center bg-slate-50/50 rounded-xl hover:bg-slate-100 transition-all text-slate-300 relative"
      >
        <Bell size={18} />
        {notifications.length > 0 && (
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-slate-900 rounded-full border border-white" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-0 mt-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-slate-100 z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">التنبيهات</h3>
                <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">{notifications.length} جديدة</span>
              </div>

              <div className="max-h-[350px] overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div key={notif.id} className="p-6 border-b border-slate-50 hover:bg-slate-50/50 transition-all group">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                        <span className="text-[9px] font-medium text-slate-300">{new Date(notif.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{notif.message}</p>
                      <button 
                        onClick={() => handleMarkRead(notif.id)}
                        className="text-[9px] text-slate-900 font-bold mt-3 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1"
                      >
                        <Check size={10} /> تم القراءة
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-20 text-center">
                    <p className="text-[10px] font-bold text-slate-200 uppercase tracking-widest">لا توجد تنبيهات</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
