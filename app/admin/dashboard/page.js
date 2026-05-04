'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import { 
  Users, Home, CreditCard, AlertCircle, Plus, Megaphone, Activity, X, 
  ChevronRight, Cpu, Loader2, CheckCircle2, Zap, LayoutDashboard, FileText, Wrench
} from 'lucide-react';
import Button from '@/components/Button';
import Link from 'next/link';
import AdminFooter from '@/components/AdminFooter'; 

export default function LandlordDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); 
  
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [roomForm, setRoomForm] = useState({ name: '', monthly_rate: '', amenities: '', image_url: '' });
  const [announceForm, setAnnounceForm] = useState({ title: '', body: '' });

  useEffect(() => {
    setMounted(true); 
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      });
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roomForm),
    });
    if (res.ok) {
      setShowRoomModal(false);
      fetchDashboardData();
    }
  };

  const handleAnnounce = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(announceForm),
    });
    if (res.ok) {
      setShowSuccess(true);
      setAnnounceForm({ title: '', body: '' });
      setTimeout(() => {
        setShowAnnounceModal(false);
        setShowSuccess(false);
      }, 3000);
    }
    setIsSubmitting(false);
  };

  const stats = [
    { label: 'Total Tenants', value: data?.tenants ?? '0', icon: Users, bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'Available Rooms', value: data?.available ?? '0', icon: Home, bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
    { label: 'Total Revenue', value: `₱${data?.revenue ? (data.revenue / 1000).toFixed(1) : '0'}K`, icon: CreditCard, bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'Maintenance', value: data?.maintenance ?? '0', icon: AlertCircle, bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
  ];

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] font-sans text-[#1E5EFF]">
      <Activity className="animate-spin mr-2" /> INITIALIZING...
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="flex-1 p-8 lg:p-12 flex flex-col">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase leading-none text-[#0B1F3B]">
              DASH<span className="text-[#1E5EFF]">BOARD</span>
            </h1>
            <p className="text-[#6B7280] text-[10px] font-black tracking-[0.3em] uppercase mt-2">Admin Management</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bgColor} p-6 rounded-2xl flex flex-col justify-between h-44 shadow-sm border border-[#E5E7EB]/50 relative overflow-hidden group`}>
              <div className="z-10">
                <h2 className={`text-[11px] font-black uppercase tracking-widest mb-1 ${stat.textColor === 'text-white' ? 'opacity-70' : 'text-[#6B7280]'}`}>{stat.label}</h2>
                <p className={`text-4xl font-black tracking-tighter ${stat.textColor}`}>{stat.value}</p>
              </div>
              <stat.icon className={`absolute -right-4 -bottom-4 opacity-10 -rotate-12 ${stat.textColor === 'text-white' ? 'text-white' : 'text-[#0B1F3B]'}`} size={120} />
              {stat.bgColor === 'bg-white' && <div className="absolute top-0 left-0 w-full h-1.5 bg-[#22D3EE]"></div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
            <h2 className="text-sm font-black text-[#0B1F3B] uppercase tracking-widest mb-6 pb-4 border-b border-[#E5E7EB]">Recent Activity</h2>
            <div className="space-y-4">
              {data?.applications?.map((app, i) => (
                <div key={i} className="bg-[#F8FAFC] p-4 rounded-xl flex items-center justify-between border border-transparent hover:border-[#1E5EFF] transition-all cursor-pointer">
                  <span className="font-bold text-[#0B1F3B]">{app.applicant_name}</span>
                  <ChevronRight size={18} className="text-[#6B7280]" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0B1F3B] p-8 rounded-2xl shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-white border-l-4 border-[#22D3EE] pl-4">Actions</h3>
              <div className="space-y-3">
                <Button onClick={() => setShowRoomModal(true)} className="w-full justify-start rounded-xl h-14">
                  <Plus className="mr-3 w-5 h-5" /> Add Property Unit
                </Button>
                <Button onClick={() => { setShowSuccess(false); setShowAnnounceModal(true); }} variant="outline" className="w-full justify-start rounded-xl border-white/20 text-white h-14 hover:bg-white/10">
                  <Megaphone className="mr-3 w-5 h-5" /> System Broadcast
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* --- DASHBOARD PORTAL MODAL --- */}
        {mounted && createPortal(
          <AnimatePresence>
            {(showRoomModal || showAnnounceModal) && (
              <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setShowRoomModal(false); setShowAnnounceModal(false); }} className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md cursor-pointer" />
                <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-[#0B1F3B]">
                      {showRoomModal ? <>ADD <span className="text-blue-600">ROOM</span></> : <>NEW <span className="text-blue-600">BROADCAST</span></>}
                    </h2>
                    <button onClick={() => { setShowRoomModal(false); setShowAnnounceModal(false); }}><X size={20} className="text-gray-400" /></button>
                  </div>
                  <div className="p-8">
                    {showAnnounceModal && showSuccess && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-[#011B27] border border-[#00FFA3] rounded-xl flex items-center gap-3">
                         <CheckCircle2 size={16} className="text-[#00FFA3]" />
                         <p className="text-[#00FFA3] text-[10px] font-black uppercase tracking-widest">Broadcast Transmitted Successfully</p>
                      </motion.div>
                    )}
                    {showRoomModal ? (
                      <form onSubmit={handleAddRoom} className="space-y-5">
                        <div>
                          <label className="text-[10px] font-black text-[#6B7280] uppercase block mb-2">Room Designation</label>
                          <input required type="text" placeholder="e.g. Unit 302" className="w-full bg-[#F8FAFC] border-none rounded-xl p-4 text-sm font-bold focus:ring-0 outline-none" onChange={(e) => setRoomForm({...roomForm, name: e.target.value})} />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-[#6B7280] uppercase block mb-2">Monthly Rate (PHP)</label>
                          <input required type="number" placeholder="4500" className="w-full bg-[#F8FAFC] border-none rounded-xl p-4 text-sm font-bold focus:ring-0 outline-none" onChange={(e) => setRoomForm({...roomForm, monthly_rate: e.target.value})} />
                        </div>
                        <button type="submit" className="w-full h-14 bg-[#00CFE8] text-[#0B1F3B] italic font-black uppercase tracking-widest rounded-xl shadow-lg">Initialize Room Node</button>
                      </form>
                    ) : (
                      <form onSubmit={handleAnnounce} className="space-y-6">
                        <div>
                          <label className="text-[10px] font-black text-[#6B7280] uppercase block mb-2 tracking-widest">Title</label>
                          <input required type="text" placeholder="URGENT UPDATE" className="w-full bg-[#F8FAFC] border-none rounded-xl p-4 text-sm font-black focus:ring-0 outline-none" onChange={(e) => setAnnounceForm({...announceForm, title: e.target.value})} />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-[#6B7280] uppercase block mb-2 tracking-widest">Message</label>
                          <textarea required placeholder="Message content..." className="w-full bg-[#F8FAFC] border-none rounded-xl p-4 text-sm font-bold h-40 focus:ring-0 outline-none resize-none" onChange={(e) => setAnnounceForm({...announceForm, body: e.target.value})} />
                        </div>
                        <button disabled={isSubmitting || showSuccess} type="submit" className="w-full h-14 bg-[#00CFE8] text-[#0B1F3B] italic font-black uppercase tracking-widest rounded-xl shadow-lg">
                          {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : "EXECUTE BROADCAST"}
                        </button>
                      </form>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

        <AdminFooter />
      </main>
    </div>
  );
}