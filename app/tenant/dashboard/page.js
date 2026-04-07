'use client';
import React, { useEffect, useState } from 'react';
import { 
  Home, 
  CreditCard, 
  Wrench, 
  Bell, 
  ChevronRight,
  Zap,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  User,
  ArrowDownRight
} from 'lucide-react';
import Button from '@/components/Button';

export default function TenantDashboard() {
  const [userName, setUserName] = useState('Resident');

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) setUserName(name.split(' ')[0]); 
  }, []);

  const currentRoom = {
    name: 'Premium Solo Room',
    number: '204',
    rent: '5,500',
    dueDate: 'APRIL 05, 2026',
  };

  const stats = [
    { label: 'Room Assignment', value: `#${currentRoom.number}`, icon: Home, color: 'text-cyan-600', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', trend: 'Floor 2', trendUp: true },
    { label: 'Monthly Rent', value: `₱${currentRoom.rent}`, icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', trend: 'Paid on time', trendUp: true },
    { label: 'Utility Balance', value: '₱420.0', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-500/10', border: 'border-purple-500/20', trend: '+₱50 vs last', trendUp: false },
    { label: 'Account Status', value: 'Active', icon: ShieldCheck, color: 'text-amber-600', bg: 'bg-amber-500/10', border: 'border-amber-500/20', trend: 'Verified', trendUp: true },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="flex-1 p-8 lg:p-12">
        
        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-cyan-500/10 border border-cyan-500/20 px-6 py-2 rounded-sm shrink-0 shadow-sm">
            <span className="text-cyan-700 font-black text-[11px] tracking-[0.3em] uppercase">
              RESIDENT NODE
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Hello, <span className="text-cyan-600">{userName}!</span>
          </h1>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
          <div className="hidden md:block">
             <p className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">
               Terminal v1.0
             </p>
          </div>
        </div>

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
              <p className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 glass-panel bg-white border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500"></div>
                System Announcements
              </h2>
              <span className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-mono">02 BROADCASTS</span>
            </div>
            
            <div className="divide-y divide-slate-100">
              {[
                { title: 'Water Maintenance', date: 'MAR 28, 2026', type: 'TECH', initial: 'WM' },
                { title: 'New Visitor Policy', date: 'MAR 25, 2026', type: 'RULES', initial: 'VP' },
                { title: 'Quarterly Fire Drill', date: 'MAR 20, 2026', type: 'SAFETY', initial: 'FD' },
              ].map((ann, i) => (
                <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors flex items-center justify-center font-black text-xs border border-slate-200">
                      {ann.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 uppercase text-sm tracking-tight">{ann.title}</h4>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tight">
                        {ann.type} <span className="mx-2 opacity-30">|</span> {ann.date}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-[10px] font-black uppercase text-cyan-600 group-hover:translate-x-1 transition-transform tracking-widest">
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

          <div className="space-y-6">
            <div className="bg-slate-900 p-8 text-white border-b-4 border-cyan-500 shadow-xl">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start rounded-none bg-cyan-600 hover:bg-cyan-500 text-[10px] tracking-[0.2em] font-bold h-12">
                  <CreditCard className="mr-3 w-4 h-4" /> INITIALIZE PAYMENT
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-none border-slate-700 text-slate-300 hover:bg-white hover:text-slate-900 text-[10px] tracking-[0.2em] font-bold h-12">
                  <Wrench className="mr-3 w-4 h-4" /> REPAIR REQUEST
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-none border-slate-700 text-slate-300 hover:bg-white hover:text-slate-900 text-[10px] tracking-[0.2em] font-bold h-12">
                  <User className="mr-3 w-4 h-4" /> UPDATE PROFILE
                </Button>
              </div>
            </div>

            <div className="glass-panel border border-slate-200 p-6 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-amber-500" />
                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">System Notice</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed uppercase tracking-tighter">
                Next rent due on: <span className="text-slate-900 font-bold">{currentRoom.dueDate}</span>
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