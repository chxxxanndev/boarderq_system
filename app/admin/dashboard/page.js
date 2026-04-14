'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'; // IMPORT THIS
import { motion, AnimatePresence } from 'framer-motion'; 
import { 
  Users, Home, CreditCard, AlertCircle, Plus, Megaphone, Activity, X, ChevronRight
} from 'lucide-react';
import Button from '@/components/Button';

export default function LandlordDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // To handle Portal on client-side
  
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  
  const [roomForm, setRoomForm] = useState({ name: '', monthly_rate: '', amenities: '', image_url: '' });
  const [announceForm, setAnnounceForm] = useState({ title: '', body: '' });

  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' }).toUpperCase();

  useEffect(() => {
    setMounted(true); // Needed for Portal
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
      alert("Room Added!");
      setShowRoomModal(false);
      fetchDashboardData();
    }
  };

  const handleAnnounce = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announceForm),
    });
    if (res.ok) {
      alert("Announcement Broadcasted!");
      setShowAnnounceModal(false);
    }
  };

  const stats = [
    { label: 'Total Tenants', value: data?.tenants ?? '0', icon: Users, bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'Available Rooms', value: data?.available ?? '0', icon: Home, bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
    { label: 'Total Revenue', value: `₱${data?.revenue ? (data.revenue / 1000).toFixed(1) : '0'}K`, icon: CreditCard, bgColor: 'bg-[#0B1F3B]', textColor: 'text-white' },
    { label: 'Maintenance', value: data?.maintenance ?? '0', icon: AlertCircle, bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
  ];

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] font-sans text-[#1E5EFF]">
      <Activity className="animate-spin mr-2" /> INITIALIZING...
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase leading-none text-[#0B1F3B]">
              DASH<span className="text-[#1E5EFF]">BOARD</span>
            </h1>
            <p className="text-[#6B7280] text-[10px] font-black tracking-[0.3em] uppercase mt-2">Administrative Node Oversight</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bgColor} p-6 rounded-2xl flex flex-col justify-between h-44 shadow-sm border border-[#E5E7EB]/50 relative overflow-hidden group`}>
              <div className="z-10">
                <h2 className={`text-[11px] font-black uppercase tracking-widest mb-1 ${stat.textColor === 'text-white' ? 'opacity-70' : 'text-[#6B7280]'}`}>
                  {stat.label}
                </h2>
                <p className={`text-4xl font-black tracking-tighter ${stat.textColor}`}>{stat.value}</p>
              </div>
              <stat.icon className={`absolute -right-4 -bottom-4 opacity-10 -rotate-12 ${stat.textColor === 'text-white' ? 'text-white' : 'text-[#0B1F3B]'}`} size={120} />
              {stat.bgColor === 'bg-white' && <div className="absolute top-0 left-0 w-full h-1.5 bg-[#22D3EE]"></div>}
            </div>
          ))}
        </div>

        {/* Content Section */}
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
                <Button onClick={() => setShowAnnounceModal(true)} variant="outline" className="w-full justify-start rounded-xl border-white/20 text-white h-14 hover:bg-white/10">
                  <Megaphone className="mr-3 w-5 h-5" /> System Broadcast
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* BULLETPROOF PORTAL MODAL SECTION */}
        {mounted && createPortal(
          <AnimatePresence>
            {(showRoomModal || showAnnounceModal) && (
              <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                
                {/* 1. Full-screen Backdrop (Dismissible) */}
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  onClick={() => { setShowRoomModal(false); setShowAnnounceModal(false); }}
                  className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md cursor-pointer"
                />

                {/* 2. Standardized Modal Card (Centered) */}
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                  animate={{ scale: 1, opacity: 1, y: 0 }} 
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  onClick={(e) => e.stopPropagation()} 
                  className="relative bg-white rounded-[2rem] w-full max-w-lg shadow-2xl border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[90vh]"
                >
                  {/* Modal Header */}
                  <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F8FAFC]">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-[#0B1F3B]">
                      {showRoomModal ? <>ADD <span className="text-[#1E5EFF]">ROOM</span></> : <>NEW <span className="text-[#1E5EFF]">BROADCAST</span></>}
                    </h2>
                    <button onClick={() => { setShowRoomModal(false); setShowAnnounceModal(false); }} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <X size={20} className="text-[#6B7280]" />
                    </button>
                  </div>

                  {/* Scrollable Modal Content */}
                  <div className="p-8 overflow-y-auto">
                    {showRoomModal ? (
                      <form onSubmit={handleAddRoom} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-[#6B7280] uppercase ml-1">Room Designation</label>
                          <input required type="text" placeholder="e.g. Unit 302" className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-2xl text-sm focus:border-[#1E5EFF] outline-none font-bold transition-all" onChange={(e) => setRoomForm({...roomForm, name: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-[#6B7280] uppercase ml-1">Monthly Rate (PHP)</label>
                          <input required type="number" placeholder="4500" className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-2xl text-sm focus:border-[#1E5EFF] outline-none font-bold transition-all" onChange={(e) => setRoomForm({...roomForm, monthly_rate: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-[#6B7280] uppercase ml-1">Image Path</label>
                          <input type="text" placeholder="/images/room-1.jpg" className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-2xl text-sm focus:border-[#1E5EFF] outline-none" onChange={(e) => setRoomForm({...roomForm, image_url: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-[#6B7280] uppercase ml-1">Amenities</label>
                          <textarea placeholder="WiFi, Laundry..." className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-2xl text-sm h-32 focus:border-[#1E5EFF] outline-none resize-none transition-all" onChange={(e) => setRoomForm({...roomForm, amenities: e.target.value})} />
                        </div>
                        <Button type="submit" className="w-full py-5 rounded-2xl shadow-lg shadow-blue-500/20">Initialize Room Node</Button>
                      </form>
                    ) : (
                      <form onSubmit={handleAnnounce} className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-[#6B7280] uppercase ml-1">Title</label>
                          <input required type="text" placeholder="URGENT UPDATE" className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-2xl text-sm uppercase font-black focus:border-[#1E5EFF] outline-none" onChange={(e) => setAnnounceForm({...announceForm, title: e.target.value})} />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-[#6B7280] uppercase ml-1">Message</label>
                          <textarea required placeholder="Message content..." className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-2xl text-sm h-60 focus:border-[#1E5EFF] outline-none resize-none" onChange={(e) => setAnnounceForm({...announceForm, body: e.target.value})} />
                        </div>
                        <Button type="submit" className="w-full py-5 rounded-2xl shadow-lg shadow-blue-500/20">Broadcast to All</Button>
                      </form>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body // This renders the modal at the root level of your website!
        )}

                <footer className="mt-20 py-10 text-[#6B7280] text-[9px] tracking-[0.4em] font-bold uppercase border-t border-[#E5E7EB] w-full text-center">
          Boarder-Q <span className="mx-2 text-[#1E5EFF]">|</span> Administrative Core <span className="mx-2 text-[#1E5EFF]">|</span> v2.0.4
        </footer>
      </main>
    </div>
  );
}