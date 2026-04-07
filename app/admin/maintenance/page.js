'use client';
import Sidebar from '@/components/Sidebar';
import MaintenanceCard from '@/components/MaintenanceCard';
import { mockMaintenance } from '@/lib/db';
import { Wrench, CheckCircle2, Clock, AlertTriangle, Hammer } from 'lucide-react';

export default function LandlordMaintenance() {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <main className="flex-1 p-8 lg:p-12">
        
        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-purple-500/10 border border-purple-500/20 px-6 py-2 rounded-sm shrink-0 shadow-sm">
            <span className="text-purple-700 font-black text-[11px] tracking-[0.3em] uppercase italic">
              MAINTENANCE LOGS
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Requests
          </h1>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-12">
          <button className="bg-cyan-600 text-white px-6 py-2 border border-cyan-700 font-black text-[10px] uppercase tracking-widest shadow-md">
            All Tasks (8)
          </button>
          
          <button className="bg-white border border-slate-200 text-slate-600 px-6 py-2 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all shadow-sm">
            <Clock className="w-3.5 h-3.5" /> Pending (3)
          </button>
          
          <button className="bg-white border border-slate-200 text-slate-600 px-6 py-2 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:border-cyan-500 hover:text-cyan-700 hover:bg-cyan-50 transition-all shadow-sm">
            <Hammer className="w-3.5 h-3.5" /> In Progress (2)
          </button>
          
          <button className="bg-white border border-slate-200 text-slate-600 px-6 py-2 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 transition-all shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" /> Resolved (3)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockMaintenance.length > 0 ? (
            mockMaintenance.map((request) => (
              <MaintenanceCard key={request.id} request={request} />
            ))
          ) : (
            <div className="col-span-full py-24 glass-panel bg-white/50 border-dashed border-slate-300 flex flex-col items-center">
              <AlertTriangle className="w-12 h-12 text-slate-300 mb-4 animate-pulse" />
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