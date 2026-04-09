'use client';

import RoomCard from '@/components/RoomCard';
import { mockRooms } from '@/lib/constants';
import { Search, Filter, Compass, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RoomsPage() {
  return (
    // BACKGROUND: Matching the Industrial Gradient of the Landing Page
    <div className="min-h-screen flex flex-col items-center pt-20 pb-20 bg-gradient-to-b from-black via-[#1a1a1a] to-[#7a7a7a] text-white font-sans">
      
      <main className="w-full max-w-7xl px-6">

        {/* Header Section */}
        <header className="mb-12">
          <div className="flex items-center gap-6 mb-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              <span className="text-white">AVAILABLE</span>
              <span className="text-[#00A3CC]"> ROOMS</span>
            </h1>
            <div className="flex-1 h-[2px] bg-[#00A3CC] hidden md:block"></div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-white/70 text-sm font-bold tracking-[0.1em] uppercase leading-relaxed">
                Explore available units within the Boarder-Q ecosystem. 
                Select a module to view specifications and initiate the digital application sequence.
              </p>
            </div>

            {/* Search & Filter: Industrial Style */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00A3CC] w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="SEARCH UNIT NO..." 
                  className="w-full pl-12 pr-4 py-4 bg-black/40 border-2 border-[#444] text-white rounded-none focus:outline-none focus:border-[#00A3CC] transition-all text-xs font-black tracking-widest placeholder:text-white/30"
                />
              </div>
              <button className="p-4 bg-[#444] hover:bg-[#00A3CC] text-white transition-all shadow-lg">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockRooms.length > 0 ? (
            mockRooms.map((room) => (
              <div key={room.id} className="border-t-4 border-[#00A3CC]">
                {/* Note: I'm assuming RoomCard handles its own internal styling, 
                    but adding a wrapper here to ensure industrial alignment */}
                <RoomCard room={room} />
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 flex flex-col items-center justify-center border-2 border-dashed border-white/10 bg-white/5">
              <Compass className="w-16 h-16 text-[#00A3CC] mb-6 animate-pulse" />
              <p className="text-white font-black text-xs uppercase tracking-[0.5em]">
                No active listings found in database
              </p>
            </div>
          )}
        </div>

        {/* Features Row (Matching Landing Page style) */}
        <div className="mt-24 space-y-3">
            <div className="flex justify-between items-end mb-6 border-b-2 border-black pb-3">
               <h3 className="text-lg font-black text-white tracking-[0.3em] uppercase">DIRECTORY STATUS</h3>
               <span className="text-[10px] font-black text-[#00A3CC] tracking-widest">LIVE UPDATES</span>
            </div>
            <div className="bg-[#A6A6A6] p-5 flex items-center justify-between shadow-lg">
               <span className="text-xl font-black text-black tracking-tight uppercase">Database Sync</span>
               <span className="text-[11px] font-bold text-black/60 tracking-widest hidden md:block">ALL UNITS VERIFIED BY SYSTEM ADMIN</span>
               <span className="text-[11px] font-black text-white bg-black px-3 py-1">STABLE</span>
            </div>
        </div>
      </main>

      {/* Footer matching the landing page */}
      <footer className="mt-24 py-12 text-white/30 text-[9px] tracking-[0.6em] font-mono uppercase border-t border-white/10 w-full text-center">
        CONSOLE <span className="mx-2 text-[#00A3CC]">/</span> DIRECTORY <span className="mx-2 text-[#00A3CC]">/</span> BOARDER-Q DEVELOPMENT 2026
      </footer>
    </div>
  );
}