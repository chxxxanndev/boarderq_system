'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'; 
import { Calendar, ChevronRight, Radio, Zap, BellRing, Loader2, Clock, X, User, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TenantFooter from '@/components/TenantFooter';

const RevealOnScroll = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function TenantAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true); 
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => {
        setAnnouncements(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const shineStyles = `
    @keyframes shine {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .header-shine {
      background: linear-gradient(90deg, #F8FAFC 0%, #EEF2FF 25%, #E0E7FF 50%, #EEF2FF 75%, #F8FAFC 100%);
      background-size: 200% 100%;
      animation: shine 4s infinite linear;
    }
  `;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">
      <style>{shineStyles}</style>
      <main className="flex-1 p-4 sm:p-8 lg:p-12 max-w-6xl mx-auto min-w-0">

        <RevealOnScroll>
          <div className="header-shine border border-[#E5E7EB] p-8 sm:p-10 rounded-[2.5rem] flex flex-col md:flex-row md:items-end gap-4 mb-8 sm:mb-12 shadow-sm">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase leading-none">
                <span className="text-[#0B1F3B]">SYSTEM </span>
                <span className="text-[#1E5EFF]">BROADCASTS</span>
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <p className="text-[#6B7280] text-[10px] font-bold tracking-widest uppercase">Central Intelligence Feed</p>
              </div>
            </div>
            <div className="flex-1 h-[2px] bg-[#E5E7EB]/50 mb-2 hidden md:block" />
          </div>
        </RevealOnScroll>

        <div className="space-y-4 sm:space-y-6">
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="animate-spin mx-auto text-[#1E5EFF]" />
            </div>
          ) : announcements.length > 0 ? (
            announcements.map((ann, i) => (
              <RevealOnScroll key={ann.id} delay={i * 0.1}>
                <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden group hover:border-[#1E5EFF] transition-all shadow-sm">
                  <div className="p-5 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">

                    <div className="bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Radio className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>

                    <div className="flex-1 w-full">
                      <div className="header-shine -mx-5 -mt-5 sm:-mx-8 sm:-mt-8 px-5 py-4 sm:px-8 sm:py-5 mb-4 sm:mb-6 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h3 className="text-lg sm:text-2xl font-black text-[#0B1F3B] uppercase group-hover:text-[#1E5EFF] transition-colors">{ann.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Zap size={12} className="text-[#22D3EE]" />
                            <span className="text-[10px] font-black text-[#6B7280] tracking-widest uppercase italic">
                              Transmission ID: {ann.id.toString().padStart(4, '0')}
                            </span>
                          </div>
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-[#0B1F3B] font-black flex items-center gap-2 uppercase tracking-widest bg-white px-3 sm:px-4 py-2 rounded-lg border border-[#E5E7EB] self-start sm:self-auto shadow-sm">
                          <Calendar size={13} className="text-[#1E5EFF]" />
                          {new Date(ann.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="bg-[#F8FAFC] p-4 sm:p-6 rounded-xl mb-4 sm:mb-6">
                        <p className="text-[#0B1F3B] text-sm leading-relaxed font-bold tracking-tight opacity-80 line-clamp-2">
                          {ann.body}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedAnnouncement(ann)}
                        className="flex items-center text-[#1E5EFF] text-[11px] font-black uppercase tracking-[0.2em] gap-2 hover:gap-4 transition-all"
                      >
                        View Transmission Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))
          ) : (
            <RevealOnScroll>
              <div className="py-24 text-center bg-white border-2 border-dashed border-[#E5E7EB] rounded-3xl">
                <BellRing className="w-12 h-12 text-[#E5E7EB] mx-auto mb-4" />
                <p className="text-[#6B7280] font-black text-[11px] uppercase tracking-widest">No active broadcasts found in your sector</p>
              </div>
            </RevealOnScroll>
          )}
        </div>

        <RevealOnScroll delay={0.3}>
          <TenantFooter />
        </RevealOnScroll>
      </main>

      {mounted && createPortal(
        <AnimatePresence>
          {selectedAnnouncement && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
              
              <motion.div
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={() => setSelectedAnnouncement(null)}
                className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md cursor-pointer"
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={e => e.stopPropagation()}
                className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              >
                <div className="px-6 sm:px-10 py-6 sm:py-8 flex justify-between items-center border-b border-gray-100 header-shine">
                  <h3 className="font-black uppercase tracking-tight text-xl sm:text-2xl text-[#0B1F3B]">
                    BROADCAST <span className="text-[#1E5EFF]">DETAILS</span>
                  </h3>
                  <button
                    onClick={() => setSelectedAnnouncement(null)}
                    className="text-gray-400 hover:text-[#0B1F3B] transition-colors p-2 hover:bg-gray-200 rounded-full bg-white shadow-sm"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 sm:p-10 space-y-6 sm:space-y-8 overflow-y-auto">

                  <div>
                    <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-2">
                      Broadcast Title
                    </label>
                    <p className="text-lg sm:text-xl font-black text-[#0B1F3B] uppercase leading-tight">
                      {selectedAnnouncement.title}
                    </p>
                  </div>

                  <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-gray-100">
                    <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-3">
                      Transmission Content
                    </label>
                    <p className="text-base sm:text-lg font-bold text-[#0B1F3B] leading-relaxed">
                      {selectedAnnouncement.body}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
                      <label className="text-[9px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-1">
                        By
                      </label>
                      <p className="text-sm font-black text-[#0B1F3B] uppercase flex items-center gap-2">
                        <User size={14} className="text-[#1E5EFF]" />
                        {selectedAnnouncement.author || 'Admin'}
                      </p>
                    </div>
                    <div className="p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
                      <label className="text-[9px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-1">
                        Broadcast Date
                      </label>
                      <p className="text-sm font-black text-[#0B1F3B] uppercase flex items-center gap-2">
                        <Calendar size={14} className="text-[#1E5EFF]" />
                        {new Date(selectedAnnouncement.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 bg-[#0B1F3B] rounded-2xl flex items-center justify-between text-white shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/50">
                        ID: {selectedAnnouncement.id.toString().padStart(4, '0')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#22D3EE] text-[9px] font-black uppercase tracking-widest">
                      <Info size={12} /> SECURE FEED
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}