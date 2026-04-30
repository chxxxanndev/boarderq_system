'use client';
import { mockAnnouncements } from '@/lib/constants';
import { Calendar, ChevronRight, Info, Radio, Zap, BellRing } from 'lucide-react';

export default function TenantAnnouncements() {
  // Stats updated to your brand palette
  const stats = [
    { label: 'Total Broadcasts', value: mockAnnouncements.length.toString().padStart(2, '0'), bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'Last Update', value: '10H AGO', bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
    { label: 'Priority Level', value: 'HIGH', bgColor: 'bg-[#0B1F3B]', textColor: 'text-white' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="flex-1 p-8 lg:p-12 max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
              <span className="text-[#0B1F3B]">SYSTEM </span>
              <span className="text-[#1E5EFF]">BROADCASTS</span>
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="bg-[#1E5EFF]/10 border border-[#1E5EFF]/20 px-3 py-1 rounded-md">
                <span className="text-[#1E5EFF] text-[10px] font-black tracking-widest uppercase">
                  Official Feed
                </span>
              </div>
              <p className="text-[#6B7280] text-[10px] font-bold tracking-widest uppercase italic">
                Status: Encrypted & Verified
              </p>
            </div>
          </div>
          <div className="flex-1 h-[2px] bg-[#E5E7EB] mb-2 hidden md:block"></div>
        </div>

        {/* Top Summary Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`${stat.bgColor} p-6 rounded-2xl flex flex-col items-center justify-center h-36 shadow-sm border border-[#E5E7EB]/50 text-center relative overflow-hidden transition-transform hover:scale-[1.02]`}
            >
              <h2 className={`text-[10px] font-black leading-tight uppercase mb-1 tracking-[0.2em] ${stat.textColor === 'text-white' ? 'text-white/70' : 'text-[#6B7280]'}`}>
                {stat.label}
              </h2>
              <p className={`text-4xl font-black leading-none tracking-tight uppercase ${stat.textColor}`}>
                {stat.value}
              </p>
              {/* Decorative accent for the white card */}
              {stat.bgColor === 'bg-white' && <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#22D3EE]"></div>}
            </div>
          ))}
        </div>

        {/* Live Status Indicator */}
        <div className="mb-10 flex items-center gap-3 bg-white w-fit px-5 py-3 rounded-xl border border-[#E5E7EB] shadow-sm">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <p className="text-[#6B7280] text-[11px] font-bold tracking-widest uppercase">
            LIVE SYSTEM: <span className="text-[#1E5EFF]">SYNCHRONIZED WITH MANAGEMENT NODE</span>
          </p>
        </div>

        {/* Announcement List */}
        <div className="space-y-6">
          {mockAnnouncements.length > 0 ? (
            mockAnnouncements.map((ann) => (
              <div 
                key={ann.id} 
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden group hover:border-[#1E5EFF] transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="p-8 flex flex-col md:flex-row gap-8 items-start">
                  
                  {/* Icon Column - Using the Blue/Cyan Gradient */}
                  <div className="bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] w-16 h-16 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                    <Radio className="w-8 h-8" />
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-[#E5E7EB] pb-5">
                      <div>
                        <h3 className="text-2xl font-black text-[#0B1F3B] uppercase tracking-tight leading-none group-hover:text-[#1E5EFF] transition-colors">
                          {ann.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                           <Zap size={12} className="text-[#22D3EE]" />
                           <span className="text-[10px] font-black text-[#6B7280] tracking-widest uppercase">ID: {ann.id.toString().padStart(4, '0')}</span>
                        </div>
                      </div>
                      
                      <div className="text-[11px] text-[#0B1F3B] font-black flex items-center gap-2 uppercase tracking-widest bg-[#F8FAFC] px-4 py-2 rounded-lg border border-[#E5E7EB]">
                        <Calendar className="w-3.5 h-3.5 text-[#1E5EFF]" /> {ann.date}
                      </div>
                    </div>

                    {/* Announcement Content Box */}
                    <div className="bg-[#F8FAFC] p-6 rounded-xl border-l-4 border-[#1E5EFF] mb-6">
                      <p className="text-[#0B1F3B] text-sm leading-relaxed font-bold uppercase tracking-tight opacity-80">
                        {ann.content}
                      </p>
                    </div>

                    <button className="flex items-center text-[#1E5EFF] text-[11px] font-black uppercase tracking-[0.2em] gap-2 hover:gap-4 transition-all">
                      View Full Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center bg-white border-2 border-dashed border-[#E5E7EB] rounded-3xl">
              <BellRing className="w-12 h-12 text-[#E5E7EB] mx-auto mb-4" />
              <p className="text-[#6B7280] font-black text-[11px] uppercase tracking-widest">
                No active broadcasts found in your sector
              </p>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <footer className="mt-20 py-10 text-[#6B7280] text-[9px] tracking-[0.4em] font-bold uppercase border-t border-[#E5E7EB] w-full text-center">
          Boarder-Q <span className="mx-2 text-[#22D3EE]">/</span> Notification Services <span className="mx-2 text-[#22D3EE]">/</span> V1.0.4
        </footer>
      </main>
    </div>
  );
}