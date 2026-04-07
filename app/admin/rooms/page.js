'use client';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Plus, 
  Search, 
  ChevronRight,
  SlidersHorizontal,
  Home
} from 'lucide-react';
import { mockRooms } from '@/lib/db';
import RoomCard from '@/components/RoomCard';
import Button from '@/components/Button';

export default function LandlordRooms() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Shared Sidebar */}
      {/* <Sidebar /> */}
      
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Standardized Header Section */}
        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-2 rounded-sm shrink-0 shadow-sm">
            <span className="text-emerald-700 font-black text-[11px] tracking-[0.3em] uppercase italic">
              INVENTORY MODULE
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Manage Rooms
          </h1>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
          
          {/* Action Buttons Integrated into Header flow */}
          <div className="hidden xl:flex items-center gap-3">
             <p className="text-slate-400 text-[10px] font-mono tracking-widest uppercase mr-4">
               {mockRooms.length} Units Active
             </p>
          </div>
        </div>

        {/* Search & Filter Bar - Terminal Style */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 transition-colors group-focus-within:text-cyan-500" />
            <input 
              type="text" 
              placeholder="SEARCH BY ROOM NUMBER, TENANT, OR STATUS..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-none focus:outline-none focus:border-cyan-500 text-[10px] font-mono tracking-widest uppercase transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <button className="bg-white border border-slate-200 px-6 hover:bg-slate-50 transition-all flex items-center gap-2 group">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 group-hover:text-cyan-500" />
              <span className="text-[10px] font-black uppercase italic tracking-widest text-slate-600">Filters</span>
            </button>
            <Button variant="primary" className="rounded-none bg-slate-900 hover:bg-cyan-600 text-[11px] tracking-[0.2em] px-8 h-full">
              <Plus className="mr-2 w-4 h-4" /> ADD NEW UNIT
            </Button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockRooms.map((room) => (
            <div key={room.id} className="group bg-white border border-slate-200 shadow-sm hover:border-cyan-500/40 transition-all flex flex-col relative overflow-hidden glass-panel">
              
              {/* Status Indicator Tag - Matches your logic */}
              <div className={`absolute top-0 right-0 px-4 py-1.5 text-[9px] font-black uppercase tracking-tighter z-10 text-white italic shadow-sm ${
                room.status === 'available' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}>
                {room.status}
              </div>
              
              {/* Internal padding for the RoomCard component */}
              <div className="p-3 flex-1">
                <RoomCard room={room} />
              </div>

              {/* Bottom Action Bar - Matches Dashboard List Style */}
              <div className="border-t border-slate-100 p-5 flex justify-between items-center bg-slate-50/50 mt-auto">
                <div className="flex gap-6">
                  <button className="text-[10px] font-black uppercase italic text-slate-400 hover:text-cyan-600 tracking-widest transition-all">
                    Modify
                  </button>
                  <button className="text-[10px] font-black uppercase italic text-slate-400 hover:text-rose-600 tracking-widest transition-all">
                    Archive
                  </button>
                </div>
                <button className="flex items-center gap-1 text-[10px] font-black uppercase italic text-cyan-600 hover:translate-x-1 transition-all tracking-widest">
                  View Specs <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {/* Add Room Placeholder - Styled like the "No Applications" box */}
          <button className="border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center gap-4 hover:border-cyan-500/50 hover:bg-white transition-all group min-h-[350px]">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-cyan-500 transition-all shadow-inner">
              <Plus className="w-6 h-6 text-slate-400 group-hover:text-white" />
            </div>
            <div className="text-center">
              <span className="block text-[11px] font-black text-slate-800 tracking-[0.2em] uppercase italic">Register Unit</span>
              <span className="text-[9px] font-mono text-slate-400 uppercase mt-1 block">New Inventory Entry</span>
            </div>
          </button>
        </div>

        {/* Global Footer */}
        <footer className="mt-20 py-8 text-slate-400 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-slate-200 w-full text-center">
          Inventory Terminal <span className="mx-2 text-cyan-500 opacity-50">/</span> System 2026 <span className="mx-2 text-cyan-500 opacity-50">/</span> Boarder-Q 
        </footer>
      </main>
    </div>
  );
}