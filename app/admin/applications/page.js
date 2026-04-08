'use client';
import React, { useState } from 'react';
import { 
  ClipboardList, CheckCircle2, XCircle, Search, 
  ChevronRight, HelpCircle, Inbox, Clock
} from 'lucide-react';
import { mockApplications } from '@/lib/db';
import Button from '@/components/Button';

export default function LandlordApplications() {
  const [apps, setApps] = useState(mockApplications);

  // Stats matching the heavy grey blocks from the UI image
  const stats = [
    { label: 'TOTAL RECEIVED', value: '42', bgColor: 'bg-[#C5C7C7]' },
    { label: 'PENDING REVIEW', value: apps.length.toString().padStart(2, '0'), bgColor: 'bg-[#B0B2B2]' },
    { label: 'APPROVED', value: '18', bgColor: 'bg-[#A1A3A3]' },
    { label: 'REJECTED', value: '05', bgColor: 'bg-[#919393]' },
  ];

  const handleAccept = (id) => {
    setApps(apps.filter(app => app.id !== id));
  };

  const handleReject = (id) => {
    setApps(apps.filter(app => app.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
      
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Header - Dashboard Style */}
        <div className="flex items-baseline gap-4 mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
            <span className="text-white">TENANT</span>
            <span className="text-[#00A3CC]"> APPLICATIONS</span>
          </h1>
          <span className="text-white text-xs font-bold tracking-[0.3em] uppercase opacity-80">
            RECORD MODULE
          </span>
        </div>

        {/* Top Stats Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bgColor} p-5 rounded-sm flex flex-col justify-between h-36 shadow-lg border-t border-white/10`}>
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-black text-black leading-[0.9] uppercase w-1/2">
                  {stat.label}
                </h2>
                <p className="text-5xl font-black text-white leading-none tracking-tighter">{stat.value}</p>
              </div>
              <div className="flex justify-between items-end border-t border-black/10 pt-2">
                <div className="text-[9px] font-black uppercase tracking-tight text-black/60">System Live Status</div>
                <p className="text-[9px] font-black text-white tracking-widest uppercase">AS OF AUGUST</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Applications List - Redesigned to match Dashboard Rows */}
          <div className="xl:col-span-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col">
            <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-3">
              <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">PENDING QUEUE</h2>
              <button className="bg-[#333] hover:bg-black text-white text-[10px] font-black px-6 py-2 rounded-xl transition-all tracking-widest uppercase">
                Filter View
              </button>
            </div>
            
            <div className="space-y-3">
              {apps.length > 0 ? (
                apps.map((app, i) => (
                  <div key={i} className="bg-[#6F7171] hover:bg-[#5a5c5c] transition-colors p-5 rounded-lg flex items-center justify-between group shadow-md">
                    <div className="w-1/3">
                      <h4 className="font-black text-white uppercase text-xl tracking-tight leading-none mb-1">
                        {app.tenantName || 'Applicant'}
                      </h4>
                      {/* FIX: Convert id to string before slicing to prevent crash */}
                      <span className="text-[9px] font-bold text-white/40 tracking-widest uppercase">
                        ID: {String(app.id).slice(0, 8)} 
                      </span>
                    </div>
                    
                    <div className="flex-1 flex justify-between text-[11px] font-bold text-white/90 tracking-widest px-8 border-x border-white/10">
                      <span className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-[#00A3CC]" /> 3 HRS AGO
                      </span>
                      <span className="hidden md:block">UNIT A. RM 1</span>
                    </div>

                    <div className="flex gap-2 ml-8">
                       <button onClick={() => handleAccept(app.id)} className="p-2 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-lg transition-all">
                         <CheckCircle2 className="w-5 h-5" />
                       </button>
                       <button onClick={() => handleReject(app.id)} className="p-2 bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg transition-all">
                         <XCircle className="w-5 h-5" />
                       </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 flex flex-col items-center justify-center opacity-40">
                  <ClipboardList className="w-16 h-16 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Pending Records</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-xl p-8 border-l-4 border-[#00A3CC] shadow-2xl rounded-r-lg">
              <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-white">Records Admin</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start rounded-xl bg-[#00A3CC] hover:bg-[#008BB3] text-[10px] tracking-[0.2em] font-black h-12 border-none text-black">
                  <Search className="mr-3 w-4 h-4" /> SEARCH APPLICANTS
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl border-white/20 text-white hover:bg-white hover:text-black text-[10px] tracking-[0.2em] font-black h-12">
                  <Inbox className="mr-3 w-4 h-4" /> HISTORY LOG
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 py-8 text-white/30 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-white/5 w-full text-center">
          Console <span className="mx-2 text-[#00A3CC]">/</span> Application Logic <span className="mx-2 text-[#00A3CC]">/</span> v2.0
        </footer>
      </main>
    </div>
  );
}