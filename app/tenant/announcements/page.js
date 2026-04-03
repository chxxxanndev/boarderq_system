'use client';
import { mockAnnouncements } from '@/lib/db';
import { Bell, Calendar, ChevronRight, Info, Radio } from 'lucide-react';

export default function TenantAnnouncements() {
  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      <main className="max-w-4xl mx-auto px-6 pt-10">
        
        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-purple-500/10 border border-purple-500/20 px-6 py-2 rounded-sm shrink-0 shadow-sm">
            <span className="text-purple-700 font-black text-[11px] tracking-[0.3em] uppercase italic">
              BROADCAST LOGS
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Announcements
          </h1>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
        </div>

        <div className="mb-10 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          <p className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">
            System Online: <span className="text-slate-600 font-bold">Receiving updates from Landlord</span>
          </p>
        </div>

        <div className="space-y-6">
          {mockAnnouncements.length > 0 ? (
            mockAnnouncements.map((ann) => (
              <div 
                key={ann.id} 
                className="glass-panel bg-white overflow-hidden group hover:border-cyan-500/40 transition-all duration-500 cursor-pointer border-l-2 border-l-slate-300 hover:border-l-cyan-600 shadow-sm hover:shadow-md"
              >
                <div className="p-8 flex flex-col md:flex-row gap-8">
                  
                  <div className="bg-cyan-50 w-16 h-16 border border-cyan-100 rounded-sm flex items-center justify-center text-cyan-600 shrink-0 group-hover:border-cyan-500/50 transition-all">
                    <Radio className="w-8 h-8 animate-pulse" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight group-hover:text-cyan-700 transition-colors">
                        {ann.title}
                      </h3>
                      <span className="text-[10px] text-slate-600 font-mono flex items-center gap-1 uppercase tracking-widest bg-slate-100 px-2 py-1 border border-slate-200">
                        <Calendar className="w-3 h-3 text-purple-600" /> {ann.date}
                      </span>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed font-light mb-6 border-l border-slate-200 pl-4 italic">
                      {ann.content}
                    </p>

                    <div className="flex items-center text-cyan-700 text-[10px] font-black uppercase tracking-[0.2em] gap-2 group-hover:gap-4 transition-all">
                      Access Full Report <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center glass-panel bg-white/50 border-dashed border-slate-300">
              <Info className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                No broadcasts detected in this sector
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}