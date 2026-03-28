'use client';
import { mockAnnouncements } from '@/lib/db';
import { Bell, Calendar, ChevronRight, Info, Radio } from 'lucide-react';

export default function TenantAnnouncements() {
  return (
    <div className="min-h-screen pb-20">
      <main className="max-w-4xl mx-auto px-6 pt-10">
        
        {/* 1. SECTION HEADER - Reference Image Style */}
        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-purple-900/40 border border-purple-500/30 px-6 py-2 rounded-sm shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <span className="text-purple-300 font-black text-[11px] tracking-[0.3em] uppercase italic">
              BROADCAST LOGS
            </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            Announcements
          </h1>
          <div className="flex-1 h-[1px] bg-slate-800/60"></div>
        </div>

        {/* 2. SUBTITLE / SYSTEM STATUS */}
        <div className="mb-10 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <p className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">
            System Online: <span className="text-slate-300">Receiving updates from Landlord</span>
          </p>
        </div>

        {/* 3. ANNOUNCEMENTS FEED */}
        <div className="space-y-6">
          {mockAnnouncements.length > 0 ? (
            mockAnnouncements.map((ann) => (
              <div 
                key={ann.id} 
                className="glass-panel overflow-hidden group hover:border-cyan-500/40 transition-all duration-500 cursor-pointer border-l-2 border-l-slate-800 hover:border-l-cyan-400"
              >
                <div className="p-8 flex flex-col md:flex-row gap-8">
                  {/* Glowing Icon Container */}
                  <div className="bg-slate-900 w-16 h-16 border border-slate-800 rounded-sm flex items-center justify-center text-cyan-400 shrink-0 group-hover:border-cyan-500/50 shadow-[inset_0_0_15px_rgba(34,211,238,0.05)] transition-all">
                    <Radio className="w-8 h-8 animate-pulse" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <h3 className="text-xl font-black text-white uppercase italic tracking-tight group-hover:text-cyan-400 transition-colors">
                        {ann.title}
                      </h3>
                      <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1 uppercase tracking-widest bg-slate-950/50 px-2 py-1 border border-slate-900">
                        <Calendar className="w-3 h-3 text-purple-500" /> {ann.date}
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed font-light mb-6 border-l border-slate-800 pl-4 italic">
                      {ann.content}
                    </p>

                    <div className="flex items-center text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] gap-2 group-hover:gap-4 transition-all">
                      Access Full Report <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="py-24 text-center glass-panel">
              <Info className="w-12 h-12 text-slate-800 mx-auto mb-4" />
              <p className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.4em]">
                No broadcasts detected in this sector
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}