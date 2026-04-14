'use client';

import React, { useEffect, useState } from 'react';
import RoomCard from '@/components/RoomCard';
import { Search, Filter, Compass, MapPin, Activity, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('/api/rooms');
        const data = await res.json();
        const availableRooms = data.filter(room => room.status === 'available');
        setRooms(availableRooms);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1F3B] font-sans">
      
      <main className="w-full max-w-7xl mx-auto px-8 py-16 lg:py-20">

        {/* 1. HEADER & SEARCH SECTION */}
        <header className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-4"
              >
                <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase leading-none">
                  Available <span className="text-[#1E5EFF]">Rooms</span>
                </h1>
              </motion.div>
              <p className="text-[#6B7280] text-sm md:text-base font-bold uppercase tracking-widest max-w-xl leading-relaxed">
                Explore premium boarding units. Verified amenities, real-time availability, and direct digital application sequence.
              </p>
            </div>

            {/* SEARCH COMPONENT: Modern SaaS Style */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-96 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#1E5EFF] transition-colors w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="SEARCH UNIT ID OR LOCATION..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-white border border-[#E5E7EB] rounded-2xl text-[#0B1F3B] focus:outline-none focus:border-[#1E5EFF] focus:ring-4 focus:ring-[#1E5EFF]/5 transition-all text-xs font-black tracking-widest uppercase shadow-sm"
                />
              </div>
              <button className="p-5 bg-white border border-[#E5E7EB] hover:border-[#1E5EFF] text-[#0B1F3B] hover:text-[#1E5EFF] rounded-2xl transition-all shadow-sm group">
                <Filter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </header>

        {/* 2. ROOM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            <div className="col-span-full py-32 text-center">
              <Loader2 className="w-12 h-12 text-[#1E5EFF] animate-spin mx-auto mb-4" />
              <p className="text-[#6B7280] font-black tracking-[0.4em] text-[10px] uppercase">Accessing Directory Nodes...</p>
            </div>
          ) : filteredRooms.length > 0 ? (
            filteredRooms.map((room, i) => (
              <motion.div 
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Note: Ensure RoomCard.js is updated to the new white/blue brand colors as well */}
                <RoomCard room={room} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-40 flex flex-col items-center justify-center border-2 border-dashed border-[#E5E7EB] rounded-[3rem] bg-white">
              <Compass className="w-20 h-20 text-[#E5E7EB] mb-6" />
              <p className="text-[#6B7280] font-black text-xs uppercase tracking-[0.4em]">
                {searchTerm ? "Zero matching nodes found" : "Database is currently empty"}
              </p>
            </div>
          )}
        </div>

        {/* 3. DIRECTORY STATUS FOOTER BAR */}
        <div className="mt-32">
            <div className="flex justify-between items-center mb-8 border-b border-[#E5E7EB] pb-6">
               <h3 className="text-sm font-black text-[#0B1F3B] tracking-[0.3em] uppercase flex items-center gap-3">
                 <Activity size={18} className="text-[#22D3EE]" /> Directory Status
               </h3>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-[10px] font-black text-[#1E5EFF] uppercase tracking-widest">Live Updates: On</span>
               </div>
            </div>

            <div className="bg-[#0B1F3B] p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-blue-900/10 border-l-8 border-[#22D3EE]">
               <div className="mb-4 md:mb-0">
                 <span className="text-2xl font-black text-white tracking-tight uppercase">Inventory Engine</span>
                 <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">Global Node Synchronization</p>
               </div>
               <div className="flex items-center gap-12">
                 <div className="text-center">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Active Units</p>
                    <span className="text-2xl font-black text-white">{rooms.length.toString().padStart(2, '0')}</span>
                 </div>
                 <div className="bg-white/10 h-10 w-[1px]"></div>
                 <div className="text-center">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">State</p>
                    <span className="text-[11px] font-black text-[#22D3EE] bg-[#22D3EE]/10 px-4 py-1.5 rounded-full border border-[#22D3EE]/20 uppercase">
                      {loading ? "Syncing" : "Optimal"}
                    </span>
                 </div>
               </div>
            </div>
        </div>
      </main>

      {/* 4. BRAND FOOTER */}
      <footer className="py-16 text-[#6B7280] text-[10px] tracking-[0.5em] font-bold uppercase border-t border-[#E5E7EB] w-full text-center bg-white">
        Boarder-Q <span className="mx-4 text-[#E5E7EB]">|</span> Directory Module <span className="mx-4 text-[#E5E7EB]">|</span> © 2026
      </footer>
    </div>
  );
}