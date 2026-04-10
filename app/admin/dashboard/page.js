'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { 
  Users, Home, CreditCard, AlertCircle, Plus, Megaphone, Activity, X
} from 'lucide-react';
import Button from '@/components/Button';

export default function LandlordDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  
  // Form States
  const [roomForm, setRoomForm] = useState({ name: '', monthly_rate: '', amenities: '' });
  const [announceForm, setAnnounceForm] = useState({ title: '', body: '' });

  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' }).toUpperCase();

  const fetchDashboardData = () => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

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
      fetchDashboardData(); // Refresh stats
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
    { label: 'Total Tenants', value: data?.tenants ?? '0', icon: Users, bgColor: 'bg-[#C5C7C7]' },
    { label: 'Available Rooms', value: data?.available ?? '0', icon: Home, bgColor: 'bg-[#B0B2B2]' },
    { label: 'Total Revenue', value: `₱${data?.revenue ? (data.revenue / 1000).toFixed(1) : '0'}K`, icon: CreditCard, bgColor: 'bg-[#A1A3A3]' },
    { label: 'Maintenance', value: data?.maintenance ?? '0', icon: AlertCircle, bgColor: 'bg-[#919393]' },
  ];

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-black font-mono text-[#00A3CC]">INITIALIZING...</div>;

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Header */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-baseline gap-4 mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
            <span className="text-white">DASH</span>
            <span className="text-[#00A3CC]">BOARD</span>
          </h1>
          <span className="text-white text-xs font-bold tracking-[0.3em] uppercase opacity-80">SYSTEM OVERVIEW</span>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
              className={`${stat.bgColor} p-6 rounded-2xl flex flex-col items-center justify-center h-40 shadow-2xl text-center relative overflow-hidden group`}
            >
              <h2 className="text-xl font-[1000] text-black leading-[0.9] uppercase mb-1 z-10">
                {stat.label.split(' ').map((word, idx) => <span key={idx} className="block">{word}</span>)}
              </h2>
              <p className="text-5xl font-[1000] text-white leading-none tracking-tighter my-1 z-10">{stat.value}</p>
              {/* DYNAMIC MONTH HERE */}
              <div className="mt-2 text-[10px] font-black text-white tracking-[0.15em] uppercase opacity-80 z-10">AS OF {currentMonth}</div>
              <stat.icon className="absolute -right-2 -bottom-2 text-black/5" size={100} />
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col">
            <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-3">
              <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">RECENT APPLICATION</h2>
              <button className="bg-[#333] hover:bg-black text-white text-[10px] font-black px-6 py-2 rounded-xl transition-all uppercase tracking-widest">View Records</button>
            </div>
            <div className="space-y-3">
              {data?.applications?.map((app, i) => (
                <div key={i} className="bg-[#6F7171] p-5 rounded-lg flex items-center justify-between shadow-md">
                  <h4 className="font-black text-white uppercase text-xl">{app.name}</h4>
                  <div className="flex gap-10 text-[11px] font-bold text-white uppercase">
                    <span>PENDING</span>
                    <span>{app.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-xl p-8 border-l-4 border-[#00A3CC] shadow-2xl rounded-r-lg">
              <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-white">Quick Actions</h3>
              <div className="space-y-3">
                <Button onClick={() => setShowRoomModal(true)} className="w-full justify-start rounded-xl bg-[#00A3CC] hover:bg-[#008BB3] text-[10px] tracking-[0.2em] font-black h-12 border-none">
                  <Plus className="mr-3 w-4 h-4" /> ADD NEW ROOM
                </Button>
                <Button onClick={() => setShowAnnounceModal(true)} variant="outline" className="w-full justify-start rounded-xl border-white/20 text-white hover:bg-white hover:text-black text-[10px] tracking-[0.2em] font-black h-12">
                  <Megaphone className="mr-3 w-4 h-4" /> ANNOUNCEMENT
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* --- MODALS --- */}
        <AnimatePresence>
          {showRoomModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#161616] border border-white/10 p-8 rounded-[30px] w-full max-w-md relative">
                <button onClick={() => setShowRoomModal(false)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X size={20}/></button>
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">Create <span className="text-[#00A3CC]">Room</span></h2>
                <form onSubmit={handleAddRoom} className="space-y-4">
                  <input type="text" placeholder="ROOM NAME (e.g. Unit A1)" required className="w-full bg-[#222] border border-white/5 p-4 rounded-xl text-sm" onChange={(e) => setRoomForm({...roomForm, name: e.target.value})} />
                  <input type="number" placeholder="MONTHLY RATE (₱)" required className="w-full bg-[#222] border border-white/5 p-4 rounded-xl text-sm" onChange={(e) => setRoomForm({...roomForm, monthly_rate: e.target.value})} />
                  <textarea placeholder="AMENITIES (comma separated)" className="w-full bg-[#222] border border-white/5 p-4 rounded-xl text-sm h-24" onChange={(e) => setRoomForm({...roomForm, amenities: e.target.value})} />
                  <Button type="submit" className="w-full bg-[#00A3CC] font-black py-4 rounded-xl uppercase tracking-widest text-[10px]">Initialize Room</Button>
                </form>
              </motion.div>
            </div>
          )}

          {showAnnounceModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#161616] border border-white/10 p-8 rounded-[30px] w-full max-w-md relative">
                <button onClick={() => setShowAnnounceModal(false)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X size={20}/></button>
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">New <span className="text-[#00A3CC]">Broadcast</span></h2>
                <form onSubmit={handleAnnounce} className="space-y-4">
                  <input type="text" placeholder="TITLE" required className="w-full bg-[#222] border border-white/5 p-4 rounded-xl text-sm uppercase" onChange={(e) => setAnnounceForm({...announceForm, title: e.target.value})} />
                  <textarea placeholder="ANNOUNCEMENT CONTENT..." required className="w-full bg-[#222] border border-white/5 p-4 rounded-xl text-sm h-32" onChange={(e) => setAnnounceForm({...announceForm, body: e.target.value})} />
                  <Button type="submit" className="w-full bg-[#00A3CC] font-black py-4 rounded-xl uppercase tracking-widest text-[10px]">Send to All Nodes</Button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <footer className="mt-20 py-8 text-white/30 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-white/5 w-full text-center">
          Console <span className="mx-2 text-[#00A3CC]">/</span> Secure <span className="mx-2 text-[#00A3CC]">/</span> Boarder-Q Development v2.0
        </footer>
      </main>
    </div>
  );
}