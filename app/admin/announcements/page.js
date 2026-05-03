'use client';
import React, { useState, useEffect } from 'react';
import { Megaphone, Plus, X, Radio, Loader2, Calendar, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';
import AdminFooter from '@/components/AdminFooter'; 

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({ title: '', body: '' });

  useEffect(() => { fetchLogs(); }, []);

  const fetchLogs = () => {
    setLoading(true);
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => { setAnnouncements(Array.isArray(data) ? data : []); setLoading(false); });
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowSuccess(true);
      fetchLogs();
      setForm({ title: '', body: '' });
      setTimeout(() => { setShowModal(false); setShowSuccess(false); }, 3000);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">
      <main className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
              BROADCAST <span className="text-[#1E5EFF]">NODE</span>
            </h1>
            <p className="text-[#6B7280] text-[10px] font-black uppercase tracking-[0.2em] mt-2">Global System Announcements</p>
          </div>
          <Button onClick={() => { setShowSuccess(false); setShowModal(true); }} className="rounded-xl h-14 px-10 shadow-lg shadow-blue-500/20">
            <Plus className="mr-3 w-5 h-5" /> NEW BROADCAST
          </Button>
        </div>

        {/* History List */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm relative min-h-[500px]">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1E5EFF]"></div>
          <h2 className="text-sm font-black uppercase tracking-widest mb-10 border-b border-gray-100 pb-6">Transmission History</h2>

          <div className="space-y-4">
            {loading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#1E5EFF]" /></div> : 
              announcements.map((ann) => (
                <div key={ann.id} className="bg-[#F8FAFC] p-6 rounded-2xl flex justify-between items-start border border-transparent hover:border-[#1E5EFF] transition-all">
                   <div>
                      <h4 className="font-black uppercase text-lg mb-1">{ann.title}</h4>
                      <p className="text-xs text-[#6B7280] font-bold uppercase leading-relaxed">{ann.body}</p>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-black uppercase text-[#0B1F3B]">{new Date(ann.created_at).toLocaleDateString()}</div>
                      <span className="text-[9px] font-bold uppercase text-[#1E5EFF]">BY: {ann.author}</span>
                   </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* --- MODAL (SYNCED TO ORIGINAL DASHBOARD STYLE) --- */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md cursor-pointer" />
              
              <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="bg-white rounded-3xl w-full max-w-lg relative z-10 overflow-hidden shadow-2xl">
                
                {/* Modal Header: Clean Style */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-[#0B1F3B]">NEW <span className="text-blue-600">BROADCAST</span></h3>
                  <button onClick={() => setShowModal(false)}><X size={20} className="text-gray-400" /></button>
                </div>

                <div className="p-8">
                  {showSuccess && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-[#011B27] border border-[#00FFA3] rounded-xl flex items-center gap-3">
                       <CheckCircle2 size={16} className="text-[#00FFA3]" />
                       <p className="text-[#00FFA3] text-[10px] font-black uppercase tracking-widest">Broadcast Transmitted Successfully</p>
                    </motion.div>
                  )}

                  <form onSubmit={handleBroadcast} className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-[#6B7280] uppercase block mb-2 tracking-widest">Transmission Title</label>
                      <input required placeholder="URGENT UPDATE" className="w-full bg-[#F8FAFC] border-none rounded-xl p-4 text-sm font-black focus:ring-0 outline-none" onChange={e => setForm({...form, title: e.target.value})} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-[#6B7280] uppercase block mb-2 tracking-widest">Message Content</label>
                      <textarea required rows={5} placeholder="Enter message content..." className="w-full bg-[#F8FAFC] border-none rounded-xl p-4 text-sm font-bold focus:ring-0 outline-none resize-none h-40" onChange={e => setForm({...form, body: e.target.value})} />
                    </div>
                    <button disabled={isSubmitting || showSuccess} type="submit" className="w-full h-14 bg-[#00CFE8] text-[#0B1F3B] italic font-black uppercase tracking-widest rounded-xl shadow-lg">
                      {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "EXECUTE BROADCAST"}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

          <AdminFooter />

      </main>
    </div>
  );
}