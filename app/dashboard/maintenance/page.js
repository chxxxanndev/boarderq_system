'use client';
import Sidebar from '@/components/Sidebar';
import MaintenanceCard from '@/components/MaintenanceCard';
import { mockMaintenance } from '@/lib/db';
import { Wrench, CheckCircle2, Clock, AlertTriangle, Hammer } from 'lucide-react';

export default function LandlordMaintenance() {
  return (
    <div className="flex min-h-screen">

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 lg:p-12">
        
        {/* SECTION HEADER - Reference Image Style */}
        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-purple-900/40 border border-purple-500/30 px-6 py-2 rounded-sm shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <span className="text-purple-300 font-black text-[11px] tracking-[0.3em] uppercase italic">
              MAINTENANCE LOGS
            </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            Requests
          </h1>
          <div className="flex-1 h-[1px] bg-slate-800/60"></div>
        </div>

        {/* 3. TACTICAL FILTER BUTTONS */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {/* Active Filter */}
          <button className="bg-cyan-500 text-slate-950 px-6 py-2 border border-cyan-400 font-black text-[10px] uppercase tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.2)]">
            All Tasks (8)
          </button>
          
          {/* Status Buttons */}
          <button className="bg-slate-900/50 border border-slate-800 text-slate-400 px-6 py-2 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:border-amber-500/40 hover:text-amber-400 transition-all">
            <Clock className="w-3.5 h-3.5" /> Pending (3)
          </button>
          
          <button className="bg-slate-900/50 border border-slate-800 text-slate-400 px-6 py-2 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:border-cyan-500/40 hover:text-cyan-400 transition-all">
            <Hammer className="w-3.5 h-3.5" /> In Progress (2)
          </button>
          
          <button className="bg-slate-900/50 border border-slate-800 text-slate-400 px-6 py-2 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:border-emerald-500/40 hover:text-emerald-400 transition-all">
            <CheckCircle2 className="w-3.5 h-3.5" /> Resolved (3)
          </button>
        </div>

        {/* 4. MAINTENANCE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockMaintenance.length > 0 ? (
            mockMaintenance.map((request) => (
              <MaintenanceCard key={request.id} request={request} />
            ))
          ) : (
            <div className="col-span-full py-24 glass-panel border-dashed flex flex-col items-center">
              <AlertTriangle className="w-12 h-12 text-slate-700 mb-4 animate-pulse" />
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                No active maintenance alerts detected
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}