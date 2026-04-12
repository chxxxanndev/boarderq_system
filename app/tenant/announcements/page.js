'use client';
import { mockAnnouncements } from '@/lib/constants';
import { Calendar, ChevronRight, Info, Radio, Zap } from 'lucide-react';

export default function TenantAnnouncements() {
  // Summary stats to match the blocky header style
  const stats = [
    { label: 'Total Broadcasts', value: mockAnnouncements.length.toString().padStart(2, '0'), bgColor: 'bg-[#C5C7C7]' },
    { label: 'Last Update', value: '24H AGO', bgColor: 'bg-[#B0B2B2]' },
    { label: 'Priority Level', value: 'HIGH', bgColor: 'bg-[#A1A3A3]' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
      <main className="flex-1 p-8 lg:p-12 max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-baseline gap-4 mb-12">
          <h1 className="text-4xl font-[1000] tracking-tighter uppercase leading-none">
            <span className="text-white">SYSTEM </span>
            <span className="text-[#00A3CC]">BROADCASTS</span>
          </h1>
          <div className="bg-[#00A3CC]/10 border border-[#00A3CC]/20 px-4 py-1 rounded-sm">
            <span className="text-[#00A3CC] text-[9px] font-black tracking-[0.4em] uppercase">
              BROADCAST LOGS
            </span>
          </div>
          <div className="flex-1 h-[1px] bg-white/10 ml-4 hidden md:block"></div>
          <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase hidden md:block">
            FEED: ACTIVE / ENCRYPTED
          </p>
        </div>

        {/* Top Summary Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`${stat.bgColor} p-6 rounded-2xl flex flex-col items-center justify-center h-32 shadow-2xl text-center relative overflow-hidden group transition-all`}
            >
              <h2 className="text-[10px] font-[1000] text-black leading-tight uppercase mb-1 tracking-widest">
                {stat.label}
              </h2>
              <p className="text-4xl font-[1000] text-white leading-none tracking-tighter uppercase">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Live Status Indicator */}
        <div className="mb-10 flex items-center gap-3 bg-black/20 w-fit px-4 py-2 rounded-lg border border-white/5">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <p className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">
            SYSTEM ONLINE: <span className="text-[#00A3CC]">RECEIVING DATA FROM LANDLORD NODE</span>
          </p>
        </div>

        {/* Announcement List */}
        <div className="space-y-6">
          {mockAnnouncements.length > 0 ? (
            mockAnnouncements.map((ann) => (
              <div 
                key={ann.id} 
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group hover:border-[#00A3CC]/50 transition-all duration-500 shadow-2xl"
              >
                <div className="p-8 flex flex-col md:flex-row gap-8 items-start">
                  
                  {/* Icon Column */}
                  <div className="bg-black/40 w-16 h-16 border-2 border-white/10 rounded-xl flex items-center justify-center text-[#00A3CC] shrink-0 group-hover:border-[#00A3CC] transition-all shadow-xl">
                    <Radio className="w-8 h-8 animate-pulse" />
                  </div>

                  {/* Content Column */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 border-b border-white/5 pb-4">
                      <div>
                        <h3 className="text-2xl font-[1000] text-white uppercase tracking-tighter leading-none group-hover:text-[#00A3CC] transition-colors">
                          {ann.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                           <Zap size={10} className="text-[#00A3CC]" />
                           <span className="text-[9px] font-black text-white/40 tracking-[0.2em] uppercase">Broadcast ID: {ann.id}</span>
                        </div>
                      </div>
                      
                      <div className="text-[10px] text-white font-bold flex items-center gap-2 uppercase tracking-widest bg-black/40 px-3 py-1.5 rounded-lg border border-white/10">
                        <Calendar className="w-3 h-3 text-[#00A3CC]" /> {ann.date}
                      </div>
                    </div>

                    <div className="bg-[#6F7171]/20 p-6 rounded-lg border-l-4 border-[#00A3CC] mb-6">
                      <p className="text-white/80 text-sm leading-relaxed font-bold uppercase tracking-tight">
                        {ann.content}
                      </p>
                    </div>

                    <button className="flex items-center text-[#00A3CC] text-[10px] font-[1000] uppercase tracking-[0.3em] gap-2 group-hover:gap-4 transition-all">
                      ACCESS FULL REPORT <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center bg-white/5 border-2 border-dashed border-white/10 rounded-3xl">
              <Info className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/30 font-black text-[10px] uppercase tracking-[0.4em]">
                No broadcasts detected in this sector
              </p>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <footer className="mt-20 py-8 text-white/30 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-white/5 w-full text-center">
          Console <span className="mx-2 text-[#00A3CC]">/</span> Secure <span className="mx-2 text-[#00A3CC]">/</span> Boarder-Q Logs v1.0
        </footer>
      </main>
    </div>
  );
}