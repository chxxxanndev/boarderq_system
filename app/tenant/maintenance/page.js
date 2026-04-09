'use client';
import { mockMaintenance } from '@/lib/constants';
import { Plus, Wrench, ChevronRight, Clock, ShieldAlert } from 'lucide-react';
import Button from '@/components/Button';

export default function TenantMaintenance() {
  // Stats block mapping
  const stats = [
    { label: 'Active Repairs', value: '02', bgColor: 'bg-[#C5C7C7]', color: 'text-blue-700' },
    { label: 'Completed', value: '12', bgColor: 'bg-[#B0B2B2]', color: 'text-emerald-700' },
    { label: 'Pending Review', value: '01', bgColor: 'bg-[#A1A3A3]', color: 'text-amber-700' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
      <main className="flex-1 p-8 lg:p-12 max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 mb-12">
          <div className="flex items-baseline gap-4">
            <h1 className="text-4xl font-[1000] tracking-tighter uppercase leading-none">
              <span className="text-white">MAINTENANCE </span>
              <span className="text-[#00A3CC]">TRACKER</span>
            </h1>
            <div className="bg-[#00A3CC]/10 border border-[#00A3CC]/20 px-4 py-1 rounded-sm">
              <span className="text-[#00A3CC] text-[9px] font-black tracking-[0.4em] uppercase">
                TECH NODE
              </span>
            </div>
          </div>

          <Button className="rounded-xl bg-[#00A3CC] hover:bg-[#008BB3] text-[10px] tracking-[0.2em] font-[1000] h-12 border-none px-8 shadow-xl shadow-[#00A3CC]/20">
            <Plus className="mr-3 w-5 h-5" /> NEW REPAIR REQUEST
          </Button>
        </div>

        {/* Maintenance Stats Grid - Blocky Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`${stat.bgColor} p-6 rounded-2xl flex flex-col items-center justify-center h-36 shadow-2xl text-center relative overflow-hidden group transition-transform hover:scale-[1.02]`}
            >
              <h2 className="text-[11px] font-[1000] text-black leading-tight uppercase mb-1 tracking-widest">
                {stat.label}
              </h2>
              <p className="text-5xl font-[1000] text-white leading-none tracking-tighter">
                {stat.value}
              </p>
              <Wrench className="absolute -left-2 -bottom-2 w-12 h-12 text-black/5 -rotate-12" />
            </div>
          ))}
        </div>

        {/* Request List Section */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col shadow-2xl">
          <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-3">
            <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00A3CC]"></span>
              ACTIVE SERVICE TICKETS
            </h2>
            <div className="text-[9px] font-black text-white/40 tracking-widest uppercase">
              Filter: Alice Johnson
            </div>
          </div>
          
          <div className="space-y-3">
            {mockMaintenance
              .filter(r => r.tenantName === 'Alice Johnson')
              .map((request, i) => (
              <div 
                key={i} 
                className="bg-[#6F7171] hover:bg-[#5a5c5c] transition-all p-5 rounded-lg flex flex-col md:flex-row md:items-center justify-between group cursor-pointer shadow-md border-l-4 border-transparent hover:border-[#00A3CC]"
              >
                <div className="flex items-center gap-5 mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-black/20 flex items-center justify-center rounded-lg border border-white/10">
                    <Wrench className="w-6 h-6 text-[#00A3CC]" />
                  </div>
                  <div>
                    <h4 className="font-[1000] text-white uppercase text-xl tracking-tight leading-none mb-1">
                      {request.issue || "General Maintenance"}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-white/50 tracking-wider uppercase">
                      <span>Room {request.room || "204"}</span>
                      <span>|</span>
                      <span className="flex items-center gap-1 italic">
                        <Clock size={12} /> {request.date || "Just now"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8">
                  <div className="text-right">
                    <span className={`text-[10px] font-[1000] px-3 py-1 rounded flex items-center gap-2 tracking-widest ${
                      request.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        request.status === 'Completed' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`} />
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-[#00A3CC] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}

            {mockMaintenance.filter(r => r.tenantName === 'Alice Johnson').length === 0 && (
              <div className="py-16 text-center border-2 border-dashed border-white/5 rounded-2xl">
                 <ShieldAlert className="mx-auto w-10 h-10 text-white/10 mb-4" />
                 <p className="text-white/20 font-black text-[10px] uppercase tracking-[0.3em]">No active maintenance tickets found</p>
              </div>
            )}
          </div>
        </div>

        {/* System Notice */}
        <div className="mt-8 flex items-center gap-3 text-white/30 text-[9px] font-bold uppercase tracking-[0.2em]">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          All repair requests are logged with timestamp and technician ID.
        </div>

        {/* Footer */}
        <footer className="mt-20 py-8 text-white/30 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-white/5 w-full text-center">
          Terminal <span className="mx-2 text-[#00A3CC]">/</span> Secure <span className="mx-2 text-[#00A3CC]">/</span> Maintenance v1.2
        </footer>
      </main>
    </div>
  );
}