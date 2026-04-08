'use client';
import React from 'react';
import { 
  Plus, Search, MapPin, Users, X, 
  Settings2, SquarePlus
} from 'lucide-react';

export default function LandlordRooms() {
  const displayRooms = [
    { title: 'SHARED DOUBLE ROOM', img: '/images/Image (0).png', price: '5, 500', loc: '2ND FLOOR. UNIT A2, RM 1', cap: '2 PERSON MAX', status: 'available' },
    { title: 'PREMIUM SOLO ROOM', img: '/images/Image (1).png', price: '3, 500', loc: '1ST FLOOR. UNIT A2, RM 1', cap: '1 PERSON MAX', status: 'occupied' },
    { title: 'EXECUTIVE SUITE', img: '/images/Image (2).png', price: '10, 500', loc: '3RD FLOOR. UNIT A3, RM 1', cap: '1 PERSON MAX', status: 'occupied' },
    { title: 'REGULAR SOLO ROOM', img: '/images/Image (3).png', price: '2, 500', loc: '2ND FLOOR. UNIT A4, RM 1', cap: '2 PERSON MAX', status: 'available' },
    { title: 'BUDGET SHARED', img: '/images/Image (4).png', price: '5, 500', loc: 'GROUND FLOOR. UNIT A1, RM 5', cap: '4 PERSON MAX', status: 'available' },
    { title: 'LOFT TYPE ROOM', img: '/images/Image (5).png', price: '3, 500', loc: '2ND FLOOR. UNIT A3, RM 4', cap: '2 PERSON MAX', status: 'occupied' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
    <main className="flex-1 p-8 lg:p-12">
        
        {/* Header Section - Now matches the Dashboard layout exactly */}
        <div className="flex flex-col xl:flex-row xl:items-baseline justify-between gap-6 mb-12">
          
          <div className="flex items-baseline gap-4">
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
              <span className="text-white">MANAGE</span>
              <span className="text-[#00A3CC]"> ROOMS</span>
            </h1>
            <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">
              INVENTORY MODULE
            </span>
          </div>

          {/* Right side utility toolbar */}
          <div className="flex items-center gap-2 flex-1 max-w-md">
             <button className="p-3 bg-[#222] hover:bg-[#333] transition-colors rounded-sm border border-white/5 shadow-xl">
                <Settings2 className="w-5 h-5 opacity-80" />
             </button>
             <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input 
                  type="text" 
                  className="w-full bg-[#222] border border-white/10 rounded-sm py-3.5 px-12 focus:outline-none focus:border-[#00A3CC] text-xs font-bold tracking-widest uppercase" 
                />
                <X className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 cursor-pointer hover:text-white" />
             </div>
             <button className="bg-[#222] hover:bg-[#00A3CC] transition-all px-6 py-3.5 border border-white/10 flex items-center gap-3 group shadow-xl">
                <Plus className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:text-black" />
                <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-black">Add New</span>
             </button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          
          {displayRooms.map((room, i) => (
            <div key={i} className="group flex flex-col">
              
              <div className="relative aspect-square overflow-hidden rounded-sm shadow-2xl bg-zinc-900 border border-white/5">
                <img 
                  src={room.img} 
                  alt={room.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 ease-out" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-5 py-1 text-[10px] font-black uppercase tracking-widest border border-white/10 rounded-sm">
                  {room.status}
                </div>

                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                   <h3 className="text-5xl font-black tracking-tight leading-[0.85] mb-8 drop-shadow-2xl transition-colors group-hover:text-[#00A3CC]">
                    {room.title}
                   </h3>
                   
                   <div className="space-y-4 mb-10 opacity-90">
                      <div className="flex items-center gap-4">
                         <MapPin className="w-6 h-6 text-white" />
                         <span className="text-[11px] font-black tracking-[0.2em] uppercase leading-tight">{room.loc}</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <Users className="w-6 h-6 text-white" />
                         <span className="text-[11px] font-black tracking-[0.2em] uppercase leading-tight">{room.cap}</span>
                      </div>
                   </div>

                   <div className="border-t border-b border-white/20 py-5 flex items-center justify-center">
                      <span className="text-[12px] font-black tracking-[0.4em] uppercase opacity-80">
                        Monthly Rate: ₱ {room.price}
                      </span>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <button className="bg-[#222] hover:bg-black py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all rounded-sm border border-white/5">Modify</button>
                <button className="bg-[#222] hover:bg-black py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all rounded-sm border border-white/5">Archive</button>
                <button className="bg-[#222] hover:bg-[#00A3CC] hover:text-black py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all rounded-sm border border-white/5">Initiate</button>
              </div>
            </div>
          ))}

          <div className="aspect-square bg-[#333]/30 border border-white/5 flex flex-col items-center justify-center cursor-pointer group hover:bg-[#333] transition-all rounded-sm shadow-xl">
            <div className="w-14 h-14 rounded-lg border-2 border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00A3CC] group-hover:bg-[#00A3CC] transition-all duration-300">
               <Plus className="w-7 h-7 text-white/30 group-hover:text-black" />
            </div>
            <div className="text-center">
              <h4 className="font-black tracking-[0.3em] uppercase text-sm mb-2">Register Unit</h4>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">New Inventory Entry</p>
            </div>
          </div>
        </div>

        <footer className="mt-24 pb-10 text-center text-[9px] font-bold tracking-[0.6em] uppercase opacity-40 border-t border-white/5 pt-10">
          Inventory Terminal / System 2026 / Boarder-Q
        </footer>
      </main>
    </div>
  );
}