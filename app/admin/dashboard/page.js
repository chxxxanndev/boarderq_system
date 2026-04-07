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
    { label: 'Total Tenants', value: '24', icon: Users, color: 'text-cyan-600', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', trend: '+2 this month', trendUp: true },
    { label: 'Available Rooms', value: '05', icon: Home, color: 'text-emerald-600', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', trend: '-1 this week', trendUp: false },
    { label: 'Total Revenue', value: '₱142.5K', icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-500/10', border: 'border-purple-500/20', trend: '+12% vs last month', trendUp: true },
    { label: 'Maintenance', value: '03', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-500/10', border: 'border-amber-500/20', trend: '2 urgent', trendUp: false },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar would go here if needed, matching the rooms page structure */}
      
      <main className="flex-1 p-8 lg:p-12">
        {/* Header Section */}
        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-cyan-500/10 border border-cyan-500/20 px-6 py-2 rounded-sm shrink-0 shadow-sm">
            <span className="text-cyan-700 font-black text-[11px] tracking-[0.3em] uppercase">
              SYSTEM OVERVIEW
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Dashboard
          </h1>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
          <div className="hidden xl:flex items-center gap-3">
             <p className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">
               TERMINAL V1.0 <span className="mx-2 opacity-30">//</span> BOARDER-Q
             </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 shadow-sm hover:border-cyan-500/40 transition-all group relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 border ${stat.border} ${stat.bg} transition-colors group-hover:bg-cyan-500/20`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 font-mono text-[10px] font-bold ${stat.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.trendUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-1 font-bold">{stat.label}</p>
              <p className="text-4xl font-black text-slate-900 uppercase tracking-tighter">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Recent Applications Section */}
          <div className="xl:col-span-2 bg-white border border-slate-200 shadow-sm flex flex-col">
            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500"></div>
                Recent Applications
              </h2>
              <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-mono tracking-tighter">03 PENDING</span>
            </div>
            
            <div className="divide-y divide-slate-100">
              {[
                { name: 'Che Ann', room: 'Room 102', time: '2 hours ago', initial: 'CA' },
                { name: 'Sheila Mae', room: 'Room 205', time: '5 hours ago', initial: 'SM' },
                { name: 'Xhyndy Lynne', room: 'Room 101', time: 'Yesterday', initial: 'XL' },
              ].map((app, i) => (
                <div key={i} className="flex items-center justify-between px-8 py-6 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all flex items-center justify-center font-black text-sm border border-slate-200 shadow-sm">
                      {app.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 uppercase text-base tracking-tight">{app.name}</h4>
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tight">
                        {app.room} <span className="mx-2 opacity-30">|</span> {app.time}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 text-[10px] font-black uppercase text-cyan-600 group-hover:translate-x-1 transition-all tracking-widest">
                    Review <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Sidebar Section */}
          <div className="space-y-6">
            <div className="bg-slate-900 p-8 text-white border-b-8 border-cyan-500 shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
                   Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start rounded-none bg-cyan-600 hover:bg-cyan-500 text-[10px] tracking-[0.2em] font-black h-12 border-none transition-all">
                    <Plus className="mr-3 w-4 h-4" /> ADD NEW ROOM
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-none border-white/10 text-white/60 hover:bg-white hover:text-slate-900 text-[10px] tracking-[0.2em] font-black h-12 transition-all">
                    <Megaphone className="mr-3 w-4 h-4" /> ANNOUNCEMENT
                  </Button>
                </div>
              </div>
              {/* Decorative background element */}
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <LayoutDashboard size={120} />
              </div>
            </div>

            {/* System Status Small Card */}
            <div className="bg-white border border-slate-200 p-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Server Status</p>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-mono uppercase font-bold text-slate-700">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-20 py-8 text-slate-400 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-slate-200 w-full text-center">
          Console <span className="mx-2 text-cyan-500 opacity-50">/</span> Secure <span className="mx-2 text-cyan-500 opacity-50">/</span> Boarder-Q Development v2.0
        </footer>
      </main>
    </div>
  );
}