'use client';
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { 
  Users, 
  Home, 
  CreditCard, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Megaphone,
  FileText,
  ChevronRight
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
      {/* Reused Sidebar component from Applications page */}
      {/* <Sidebar /> */}

      <main className="flex-1 p-8 lg:p-12">
        {/* Standardized Header Section */}
        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-cyan-500/10 border border-cyan-500/20 px-6 py-2 rounded-sm shrink-0 shadow-sm">
            <span className="text-cyan-700 font-black text-[11px] tracking-[0.3em] uppercase italic">
              SYSTEM OVERVIEW
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Dashboard
          </h1>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
          <div className="hidden md:block">
             <p className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">
               Terminal v1.0
             </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="glass-panel bg-white p-6 border-l-2 border-slate-200 hover:border-l-cyan-500 transition-all shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 border ${stat.border} ${stat.bg}`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 font-mono text-[9px] font-bold ${stat.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-semibold">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Applications List - Matches Applications Page logic */}
          <div className="lg:col-span-2 glass-panel bg-white border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-[11px] font-black text-slate-900 uppercase italic tracking-[0.2em] flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500"></div>
                Recent Applications
              </h2>
              <span className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-mono">03 PENDING</span>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { name: 'John Doe', room: 'Room 102', time: '2 hours ago', initial: 'JD' },
                { name: 'Sarah Chen', room: 'Room 205', time: '5 hours ago', initial: 'SC' },
                { name: 'Mike Ross', room: 'Room 101', time: 'Yesterday', initial: 'MR' },
              ].map((app, i) => (
                <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors flex items-center justify-center font-black italic text-xs border border-slate-200">
                      {app.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 uppercase text-sm tracking-tight">{app.name}</h4>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tight">
                        {app.room} <span className="mx-2 opacity-30">|</span> {app.time}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-[10px] font-black uppercase italic text-cyan-600 group-hover:translate-x-1 transition-transform tracking-widest">
                    Review <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50/80 border-t border-slate-100 text-center">
              <button className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-cyan-600 transition-colors">
                View All Records
              </button>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-slate-900 p-8 text-white border-b-4 border-cyan-500 shadow-xl">
              <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start rounded-none bg-cyan-600 hover:bg-cyan-500 text-[10px] tracking-[0.2em] font-bold h-12">
                  <Plus className="mr-3 w-4 h-4" /> ADD NEW ROOM
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-none border-slate-700 text-slate-300 hover:bg-white hover:text-slate-900 text-[10px] tracking-[0.2em] font-bold h-12">
                  <Megaphone className="mr-3 w-4 h-4" /> ANNOUNCEMENT
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-none border-slate-700 text-slate-300 hover:bg-white hover:text-slate-900 text-[10px] tracking-[0.2em] font-bold h-12">
                  <FileText className="mr-3 w-4 h-4" /> REPORTS
                </Button>
              </div>
            </div>

            <div className="glass-panel border border-slate-200 p-6 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4 text-purple-500" />
                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">System Notice</h4>
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed uppercase tracking-tighter">
                Server maintenance scheduled for <span className="text-purple-600 font-bold">Sunday 02:00 AM</span>. 
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-20 py-8 text-slate-400 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-slate-200 w-full text-center">
          Console <span className="mx-2 text-cyan-500 opacity-50">/</span> Secure <span className="mx-2 text-cyan-500 opacity-50">/</span> Boarder-Q 2026
        </footer>
      </main>
    </div>
  );
}