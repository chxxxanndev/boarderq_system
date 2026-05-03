'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, Radio, Zap, BellRing, Loader2, Clock, X, User, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TenantFooter from '@/components/TenantFooter';

export default function TenantAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null); // State for the detail modal

  useEffect(() => {
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => {
        setAnnouncements(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Total Broadcasts', value: announcements.length.toString().padStart(2, '0'), bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'System Status', value: 'ONLINE', bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
    { label: 'Priority Level', value: 'STABLE', bgColor: 'bg-[#0B1F3B]', textColor: 'text-white' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="flex-1 p-8 lg:p-12 max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
              <span className="text-[#0B1F3B]">SYSTEM </span>
              <span className="text-[#1E5EFF]">BROADCASTS</span>
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="bg-[#1E5EFF]/10 border border-[#1E5EFF]/20 px-3 py-1 rounded-md">
                <span className="text-[#1E5EFF] text-[10px] font-black tracking-widest uppercase">Official Feed</span>
              </div>
              <p className="text-[#6B7280] text-[10px] font-bold tracking-widest uppercase italic">Status: Verified Transmission</p>
            </div>
          </div>
          <div className="flex-1 h-[2px] bg-[#E5E7EB] mb-2 hidden md:block"></div>
        </div>

        {/* Top Summary Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bgColor} p-6 rounded-2xl flex flex-col items-center justify-center h-36 shadow-sm border border-[#E5E7EB]/50 text-center relative overflow-hidden transition-transform hover:scale-[1.02]`}>
              <h2 className={`text-[10px] font-black uppercase mb-1 tracking-[0.2em] ${stat.textColor === 'text-white' ? 'text-white/70' : 'text-[#6B7280]'}`}>{stat.label}</h2>
              <p className={`text-4xl font-black tracking-tight ${stat.textColor}`}>{stat.value}</p>
              {stat.bgColor === 'bg-white' && <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#22D3EE]"></div>}
            </div>
          ))}
        </div>

        {/* Live Status Indicator */}
        <div className="mb-10 flex items-center gap-3 bg-white w-fit px-5 py-3 rounded-xl border border-[#E5E7EB] shadow-sm">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <p className="text-[#6B7280] text-[11px] font-bold tracking-widest uppercase">
            LIVE SYSTEM: <span className="text-[#1E5EFF]">SYNCHRONIZED WITH MANAGEMENT NODE</span>
          </p>
        </div>

        {/* Announcement List */}
        <div className="space-y-6">
          {loading ? (
             <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-[#1E5EFF]" /></div>
          ) : announcements.length > 0 ? (
            announcements.map((ann) => (
              <div key={ann.id} className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden group hover:border-[#1E5EFF] transition-all shadow-sm">
                <div className="p-8 flex flex-col md:flex-row gap-8 items-start">
                  
                  <div className="bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <Radio className="w-8 h-8" />
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-[#E5E7EB] pb-5">
                      <div>
                        <h3 className="text-2xl font-black text-[#0B1F3B] uppercase group-hover:text-[#1E5EFF] transition-colors">{ann.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                           <Zap size={12} className="text-[#22D3EE]" />
                           <span className="text-[10px] font-black text-[#6B7280] tracking-widest uppercase italic">Transmission ID: {ann.id.toString().padStart(4, '0')}</span>
                        </div>
                      </div>
                      
                      <div className="text-[11px] text-[#0B1F3B] font-black flex items-center gap-2 uppercase tracking-widest bg-[#F8FAFC] px-4 py-2 rounded-lg border border-[#E5E7EB]">
                        <Calendar size={14} className="text-[#1E5EFF]" /> {new Date(ann.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="bg-[#F8FAFC] p-6 rounded-xl border-l-4 border-[#1E5EFF] mb-6">
                      <p className="text-[#0B1F3B] text-sm leading-relaxed font-bold uppercase tracking-tight opacity-80 line-clamp-2">
                        {ann.body}
                      </p>
                    </div>

                    {/* CLICKABLE BUTTON */}
                    <button 
                      onClick={() => setSelectedAnnouncement(ann)}
                      className="flex items-center text-[#1E5EFF] text-[11px] font-black uppercase tracking-[0.2em] gap-2 hover:gap-4 transition-all"
                    >
                      View Transmission Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center bg-white border-2 border-dashed border-[#E5E7EB] rounded-3xl">
              <BellRing className="w-12 h-12 text-[#E5E7EB] mx-auto mb-4" />
              <p className="text-[#6B7280] font-black text-[11px] uppercase tracking-widest">No active broadcasts found in your sector</p>
            </div>
          )}
        </div>

        {/* --- PREMIUM DETAIL MODAL --- */}
        <AnimatePresence>
          {selectedAnnouncement && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedAnnouncement(null)} 
                className="absolute inset-0 bg-[#0B1F3B]/60 backdrop-blur-md" 
              />
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} 
                className="bg-white rounded-[45px] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl"
              >
                {/* Header Style */}
                <div className="px-10 py-8 flex justify-between items-center border-b border-gray-100">
                  <h3 className="font-black uppercase tracking-tight text-3xl text-[#0B1F3B]">
                    BROADCAST <span className="text-[#1E5EFF]">DETAILS</span>
                  </h3>
                  <button onClick={() => setSelectedAnnouncement(null)} className="text-[#0B1F3B]/30 hover:text-[#0B1F3B] transition-colors">
                    <X size={32} strokeWidth={2.5} />
                  </button>
                </div>

                <div className="p-10 space-y-10">
                  <div>
                    <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-3">Transmission Content</label>
                    <p className="text-2xl font-black text-[#0B1F3B] italic leading-relaxed">{selectedAnnouncement.body}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-10">
                    <div>
                       <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-2">Authorizing Node</label>
                       <p className="text-base font-black text-[#0B1F3B] uppercase flex items-center gap-2">
                         <User size={16} className="text-[#1E5EFF]" /> {selectedAnnouncement.author}
                       </p>
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-2">Broadcast Date</label>
                       <p className="text-base font-black text-[#0B1F3B] uppercase flex items-center gap-2">
                         <Calendar size={16} className="text-[#1E5EFF]" /> {new Date(selectedAnnouncement.created_at).toLocaleDateString()}
                       </p>
                    </div>
                  </div>

                  <div className="p-6 bg-[#F8FAFC] rounded-3xl border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-[#1E5EFF] animate-pulse" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Verification ID: {selectedAnnouncement.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1E5EFF] text-[10px] font-black uppercase tracking-widest">
                       <Info size={14} /> SECURE FEED
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <TenantFooter />
        
      </main>
    </div>
  );
}