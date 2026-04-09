'use client';
import React, { useEffect, useState } from 'react';
import { 
  Home, 
  CreditCard, 
  Wrench, 
  ChevronRight,
  Zap,
  ShieldCheck,
  User,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import Button from '@/components/Button';

export default function TenantDashboard() {
  const [userName, setUserName] = useState('CHE');

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) setUserName(name.split(' ')[0].toUpperCase()); 
  }, []);

  const currentRoom = {
    number: '204',
    rent: '5,500',
    dueDate: 'APRIL 05, 2026',
  };

  const stats = [
    { label: 'Room Assignment', value: `#${currentRoom.number}`, icon: Home, bgColor: 'bg-[#C5C7C7]', trend: 'Floor 2', trendUp: true },
    { label: 'Monthly Rent', value: `₱${currentRoom.rent}`, icon: CreditCard, bgColor: 'bg-[#B0B2B2]', trend: 'Paid on time', trendUp: true },
    { label: 'Utility Balance', value: '₱420.0', icon: Zap, bgColor: 'bg-[#A1A3A3]', trend: '+₱50 vs last', trendUp: false },
    { label: 'Account Status', value: 'ACTIVE', icon: ShieldCheck, bgColor: 'bg-[#919393]', trend: 'Verified', trendUp: true },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Header Section - Matching Admin Style */}
        <div className="flex items-baseline gap-4 mb-12">
          <h1 className="text-4xl font-[1000] tracking-tighter uppercase leading-none">
            <span className="text-white">HELLO, </span>
            <span className="text-[#00A3CC]">{userName}!</span>
          </h1>
          <div className="bg-[#00A3CC]/10 border border-[#00A3CC]/20 px-4 py-1 rounded-sm">
            <span className="text-[#00A3CC] text-[9px] font-black tracking-[0.4em] uppercase">
              RESIDENT NODE
            </span>
          </div>
          <div className="flex-1 h-[1px] bg-white/10 ml-4 hidden md:block"></div>
          <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase hidden md:block">
            TERMINAL V1.0
          </p>
        </div>

        {/* Stats Grid - Matching Admin Block Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`${stat.bgColor} p-6 rounded-2xl flex flex-col items-center justify-center h-40 shadow-2xl text-center relative overflow-hidden group hover:scale-[1.02] transition-transform`}
            >
              {/* Trend Indicator */}
              <div className={`absolute top-3 right-4 flex items-center gap-1 font-bold text-[9px] tracking-tighter ${stat.trendUp ? 'text-emerald-700' : 'text-rose-700'}`}>
                {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend.toUpperCase()}
              </div>

              {/* Label */}
              <h2 className="text-sm font-[1000] text-black leading-tight uppercase mb-1">
                {stat.label}
              </h2>

              {/* Value */}
              <p className="text-4xl font-[1000] text-white leading-none tracking-tighter my-1">
                {stat.value}
              </p>

              {/* Icon Overlay (Subtle) */}
              <stat.icon className="absolute -left-2 -bottom-2 w-12 h-12 text-black/5 -rotate-12" />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Announcements Section - White/10 Backdrop style */}
          <div className="xl:col-span-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col shadow-2xl">
            <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-3">
              <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00A3CC]"></span>
                SYSTEM ANNOUNCEMENTS
              </h2>
              <div className="bg-black px-3 py-1 text-[9px] font-black tracking-widest text-white">
                02 BROADCASTS
              </div>
            </div>
            
            <div className="space-y-3">
              {[
                { title: 'Water Maintenance', date: 'MAR 28, 2026', type: 'TECH', id: 'WM' },
                { title: 'New Visitor Policy', date: 'MAR 25, 2026', type: 'RULES', id: 'VP' },
                { title: 'Quarterly Fire Drill', date: 'MAR 20, 2026', type: 'SAFETY', id: 'FD' },
              ].map((ann, i) => (
                <div key={i} className="bg-[#6F7171] hover:bg-[#5a5c5c] transition-all p-5 rounded-lg flex items-center justify-between group cursor-pointer shadow-md border-l-4 border-transparent hover:border-[#00A3CC]">
                  <div className="flex items-center gap-4 w-1/2">
                    <div className="w-10 h-10 bg-black/20 flex items-center justify-center font-[1000] text-xs text-white border border-white/10">
                      {ann.id}
                    </div>
                    <div>
                      <h4 className="font-black text-white uppercase text-lg tracking-tight">{ann.title}</h4>
                      <p className="text-[10px] font-bold text-white/50 tracking-widest">{ann.type} | {ann.date}</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-black text-white group-hover:text-[#00A3CC] flex items-center gap-2 tracking-[0.2em] transition-colors">
                    REVIEW <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Sidebar Section */}
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-xl p-8 border-l-4 border-[#00A3CC] shadow-2xl rounded-r-lg">
              <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-white">
                 Quick Actions
              </h3>
              <div className="space-y-3">
                <Button className="w-full justify-start rounded-xl bg-[#00A3CC] hover:bg-[#008BB3] text-[10px] tracking-[0.2em] font-[1000] h-12 border-none">
                  <CreditCard className="mr-3 w-4 h-4" /> INITIALIZE PAYMENT
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl border-white/20 text-white hover:bg-white hover:text-black text-[10px] tracking-[0.2em] font-[1000] h-12 transition-all">
                  <Wrench className="mr-3 w-4 h-4" /> REPAIR REQUEST
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl border-white/20 text-white hover:bg-white hover:text-black text-[10px] tracking-[0.2em] font-[1000] h-12 transition-all">
                  <User className="mr-3 w-4 h-4" /> UPDATE PROFILE
                </Button>
              </div>
            </div>

            {/* System Status / Notice */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#00A3CC] animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00A3CC]">Status: Current</span>
              </div>
              <p className="text-[11px] font-bold text-white/60 uppercase leading-relaxed tracking-tighter">
                Next rent due on: <span className="text-white font-black underline decoration-[#00A3CC]">{currentRoom.dueDate}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-20 py-8 text-white/30 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-white/5 w-full text-center">
          Console <span className="mx-2 text-[#00A3CC]">/</span> Secure <span className="mx-2 text-[#00A3CC]">/</span> Boarder-Q Resident v1.0
        </footer>
      </main>
    </div>
  );
}