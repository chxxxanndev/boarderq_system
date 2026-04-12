'use client';
import { mockMaintenance } from '@/lib/constants';
import { Plus, Wrench, ChevronRight, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';
import Button from '@/components/Button';

export default function TenantMaintenance() {
  // Updated Stats block to match the brand palette
  const stats = [
    { label: 'Active Repairs', value: '02', bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'Completed', value: '12', bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
    { label: 'Pending Review', value: '01', bgColor: 'bg-[#0B1F3B]', textColor: 'text-white' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="flex-1 p-8 lg:p-12 max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
                <span className="text-[#0B1F3B]">MAINTENANCE </span>
                <span className="text-[#1E5EFF]">TRACKER</span>
              </h1>
              <div className="bg-[#1E5EFF]/10 border border-[#1E5EFF]/20 px-3 py-1 rounded-md">
                <span className="text-[#1E5EFF] text-[10px] font-black tracking-widest uppercase">
                  Service Node
                </span>
              </div>
            </div>
            <p className="text-[#6B7280] text-[10px] font-bold uppercase tracking-[0.2em]">Manage and monitor property repair requests</p>
          </div>

          {/* Using your Brand Gradient for the main action */}
          <Button className="rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#1E5EFF] text-white text-[11px] tracking-[0.1em] font-black h-14 border-none px-10 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-transform">
            <Plus className="mr-3 w-5 h-5" /> FILE NEW REPAIR
          </Button>
        </div>

        {/* Maintenance Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`${stat.bgColor} p-6 rounded-2xl flex flex-col items-center justify-center h-40 shadow-sm border border-[#E5E7EB]/50 text-center relative overflow-hidden transition-all hover:shadow-md`}
            >
              <h2 className={`text-[11px] font-black uppercase mb-1 tracking-widest ${stat.textColor === 'text-white' ? 'opacity-80' : 'text-[#6B7280]'}`}>
                {stat.label}
              </h2>
              <p className={`text-5xl font-black tracking-tighter ${stat.textColor}`}>
                {stat.value}
              </p>
              <Wrench className={`absolute -right-4 -bottom-4 w-20 h-20 -rotate-12 opacity-10 ${stat.textColor === 'text-white' ? 'text-white' : 'text-[#0B1F3B]'}`} />
              {/* Accent bar for the white card */}
              {stat.bgColor === 'bg-white' && <div className="absolute top-0 left-0 w-full h-1.5 bg-[#22D3EE]"></div>}
            </div>
          ))}
        </div>

        {/* Request List Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1E5EFF]"></div>
          
          <div className="flex justify-between items-center mb-8 border-b border-[#E5E7EB] pb-5">
            <h2 className="text-sm font-black text-[#0B1F3B] uppercase tracking-widest flex items-center gap-3">
              <span className="w-3 h-3 bg-[#22D3EE] rounded-full"></span>
              Active Service Tickets
            </h2>
            <div className="text-[10px] font-bold text-[#6B7280] tracking-widest uppercase bg-[#F8FAFC] px-3 py-1 rounded">
              Identity: Alice Johnson
            </div>
          </div>
          
          <div className="space-y-4">
            {mockMaintenance
              .filter(r => r.tenantName === 'Alice Johnson')
              .map((request, i) => (
              <div 
                key={i} 
                className="group bg-[#F8FAFC] hover:bg-white border border-transparent hover:border-[#1E5EFF] transition-all p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className="w-14 h-14 bg-white border border-[#E5E7EB] flex items-center justify-center rounded-xl group-hover:bg-[#1E5EFF]/10 group-hover:border-[#1E5EFF]/30 transition-colors">
                    <Wrench className="w-6 h-6 text-[#1E5EFF]" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#0B1F3B] uppercase text-lg tracking-tight leading-none mb-1 group-hover:text-[#1E5EFF]">
                      {request.issue || "General Maintenance"}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-[#6B7280] tracking-widest uppercase">
                      <span className="bg-[#E5E7EB] px-2 py-0.5 rounded text-[9px]">Unit {request.room || "204"}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 italic">
                        <Clock size={12} className="text-[#1E5EFF]" /> {request.date || "Just now"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8">
                  <div className="text-right">
                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-lg flex items-center gap-2 tracking-widest border ${
                      request.status === 'Completed' 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                      : 'bg-amber-50 border-amber-100 text-amber-600'
                    }`}>
                      {request.status === 'Completed' ? <CheckCircle2 size={12} /> : <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />}
                      {request.status.toUpperCase()}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#E5E7EB] group-hover:text-[#1E5EFF] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}

            {mockMaintenance.filter(r => r.tenantName === 'Alice Johnson').length === 0 && (
              <div className="py-20 text-center border-2 border-dashed border-[#E5E7EB] rounded-2xl bg-[#F8FAFC]">
                 <ShieldAlert className="mx-auto w-12 h-12 text-[#E5E7EB] mb-4" />
                 <p className="text-[#6B7280] font-black text-[11px] uppercase tracking-widest">No active maintenance tickets logged</p>
              </div>
            )}
          </div>
        </div>

        {/* System Notice Section */}
        <div className="mt-8 flex items-center gap-3 bg-white border border-[#E5E7EB] w-fit px-5 py-3 rounded-xl shadow-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <p className="text-[#6B7280] text-[10px] font-bold uppercase tracking-widest">
            Service Status: <span className="text-[#0B1F3B]">All systems operational. Technicians on standby.</span>
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-20 py-10 text-[#6B7280] text-[9px] tracking-[0.4em] font-bold uppercase border-t border-[#E5E7EB] w-full text-center">
          Boarder-Q <span className="mx-2 text-[#22D3EE]">|</span> Asset Management <span className="mx-2 text-[#22D3EE]">|</span> Maintenance v1.2
        </footer>
      </main>
    </div>
  );
}