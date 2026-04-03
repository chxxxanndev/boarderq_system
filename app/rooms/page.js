'use client';
import RoomCard from '@/components/RoomCard';
import { mockRooms } from '@/lib/db';
import { Search, Filter, Compass } from 'lucide-react';

export default function RoomsPage() {
  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      <main className="max-w-7xl mx-auto px-6 pt-10">

        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-purple-500/10 border border-purple-500/20 px-6 py-2 rounded-sm shrink-0 shadow-sm">
            <span className="text-purple-700 font-black text-xs tracking-widest uppercase italic">Room Directory</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Available Rooms
          </h1>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="max-w-md">
            <p className="text-slate-600 text-sm font-light tracking-wide leading-relaxed">
              Explore available units and filter by amenities or status. 
              Secure your spot by selecting a room to begin your application process.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-600 w-4 h-4 transition-colors" />
              <input 
                type="text" 
                placeholder="Search unit number or type..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/10 transition-all text-sm font-mono placeholder:text-slate-400"
              />
            </div>
            <button className="p-3 bg-white border border-slate-200 text-slate-500 hover:text-cyan-600 hover:border-cyan-500/30 transition-all rounded-sm shadow-sm">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {mockRooms.length > 0 ? (
            mockRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))
          ) : (
            <div className="col-span-full py-24 flex flex-col items-center justify-center glass-panel">
              <Compass className="w-12 h-12 text-slate-300 mb-4 animate-pulse" />
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                No active listings found in database
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}