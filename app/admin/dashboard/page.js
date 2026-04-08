'use client';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Users, Home, CreditCard, AlertCircle, ArrowUpRight, ArrowDownRight,
  Plus, Megaphone, ChevronRight, LayoutDashboard
} from 'lucide-react';
import Button from '@/components/Button';

export default function LandlordDashboard() {
  const stats = [
    { label: 'Total Tenants', value: '24', icon: Users, color: 'text-cyan-600', trend: '+2 this month', trendUp: true, bgColor: 'bg-[#C5C7C7]' },
    { label: 'Available Rooms', value: '05', icon: Home, color: 'text-emerald-600', trend: '-1 this week', trendUp: false, bgColor: 'bg-[#B0B2B2]' },
    { label: 'Total Revenue', value: '₱142.5K', icon: CreditCard, color: 'text-purple-600', trend: '+12% vs last month', trendUp: true, bgColor: 'bg-[#A1A3A3]' },
    { label: 'Maintenance', value: '03', icon: AlertCircle, color: 'text-amber-600', trend: '2 urgent', trendUp: false, bgColor: 'bg-[#919393]' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
    
    <main className="flex-1 p-8 lg:p-12">
 
        {/* Header Section styled like the image */}
        <div className="flex items-baseline gap-4 mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
            <span className="text-white">DASH</span>
            <span className="text-[#00A3CC]">BOARD</span>
          </h1>
          <span className="text-white text-xs font-bold tracking-[0.3em] uppercase opacity-80">
            SYSTEM OVERVIEW
          </span>
        </div>

 {/* Stats Grid - Centered Layout */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
  {stats.map((stat, i) => (
    <div 
      key={i} 
      className={`${stat.bgColor} p-6 rounded-2xl flex flex-col items-center justify-center h-40 shadow-2xl text-center relative overflow-hidden`}
    >
      {/* Label - Stacked and Centered */}
      <h2 className="text-xl font-[1000] text-black leading-[0.9] uppercase mb-1">
        {stat.label.split(' ').map((word, idx) => (
          <span key={idx} className="block">{word}</span>
        ))}
      </h2>

      {/* Value - Large and Centered */}
      <p className="text-5xl font-[1000] text-white leading-none tracking-tighter my-1">
        {stat.value}
      </p>

      {/* Footer - Centered at the bottom */}
      <div className="mt-2 text-[10px] font-black text-white tracking-[0.15em] uppercase opacity-80">
        AS OF AUGUST
      </div>
    </div>
  ))}
</div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Recent Applications Section - Styled with the thick borders and grey rows */}
          <div className="xl:col-span-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col">
            <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-3">
              <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">
                RECENT APPLICATION
              </h2>
              <button className="bg-[#333] hover:bg-black text-white text-[10px] font-black px-6 py-2 rounded-xl transition-all tracking-widest">
                VIEW ALL RECORDS
              </button>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'Che Ann', room: 'Unit A1. RM 1', time: '3 HOURS AGO', status: 'PENDING' },
                { name: 'Sheila Mae', room: 'Unit A2. RM 2', time: '2 HOURS AGO', status: 'PENDING' },
                { name: 'Xhyndy Lynne', room: 'Unit A3. RM 3', time: '30 MINUTES AGO', status: 'PENDING' },
              ].map((app, i) => (
                <div key={i} className="bg-[#6F7171] hover:bg-[#5a5c5c] transition-colors p-5 rounded-lg flex items-center justify-between group cursor-pointer shadow-md">
                  <div className="w-1/3">
                    <h4 className="font-black text-white uppercase text-xl tracking-tight">{app.name}</h4>
                  </div>
                  <div className="flex-1 flex justify-between text-[11px] font-bold text-white/90 tracking-widest">
                    <span>{app.time}</span>
                    <span className="hidden md:block">{app.status}</span>
                    <span>{app.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Sidebar Section - Keeps original buttons but updates visual weight */}
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-xl p-8 border-l-4 border-[#00A3CC] shadow-2xl rounded-r-lg">
              <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-white">
                 Quick Actions
              </h3>
              <div className="space-y-3">
                <Button className="w-full justify-start rounded-xl bg-[#00A3CC] hover:bg-[#008BB3] text-[10px] tracking-[0.2em] font-black h-12 border-none">
                  <Plus className="mr-3 w-4 h-4" /> ADD NEW ROOM
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl border-white/20 text-white hover:bg-white hover:text-black text-[10px] tracking-[0.2em] font-black h-12">
                  <Megaphone className="mr-3 w-4 h-4" /> ANNOUNCEMENT
                </Button>
              </div>
            </div>

            {/* System Status
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Server Status</p>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">Operational</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-20 py-8 text-white/30 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-white/5 w-full text-center">
          Console <span className="mx-2 text-[#00A3CC]">/</span> Secure <span className="mx-2 text-[#00A3CC]">/</span> Boarder-Q Development v2.0
        </footer>
      </main>
    </div>
  );
}