'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Wrench, CheckCircle2, Clock, AlertTriangle, Hammer,
  Search, ChevronRight, HelpCircle, Plus, Filter, Activity, Settings2
} from 'lucide-react';
import { mockMaintenance } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';

export default function LandlordMaintenance() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Stats updated to your high-end brand hierarchy
  const stats = [
    { label: 'Total Requests', value: '08', icon: Wrench, bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'Pending Tasks', value: '03', icon: Clock, bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
    { label: 'In Progress', value: '02', icon: Hammer, bgColor: 'bg-[#0B1F3B]', textColor: 'text-white' },
    { label: 'Resolved Today', value: '03', icon: CheckCircle2, bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase leading-none text-[#0B1F3B]">
              MAINTENANCE <span className="text-[#1E5EFF]">LOGS</span>
            </h1>
            <p className="text-[#6B7280] text-[10px] font-black tracking-[0.3em] uppercase mt-2">Facility Service & Repair Module</p>
          </div>
          <div className="bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
            <Activity className="w-4 h-4 text-[#22D3EE]" />
            <span className="text-[#0B1F3B] text-[10px] font-black uppercase tracking-widest">Technician Feed: Active</span>
          </div>
        </div>

        {/* Maintenance Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bgColor} p-6 rounded-2xl flex flex-col justify-between h-44 shadow-sm border border-[#E5E7EB]/50 relative overflow-hidden group hover:shadow-md transition-all`}>
              <div className="z-10">
                <h2 className={`text-[11px] font-black uppercase tracking-widest mb-1 ${stat.textColor === 'text-white' ? 'opacity-70' : 'text-[#6B7280]'}`}>
                  {stat.label}
                </h2>
                <p className={`text-4xl font-black tracking-tighter ${stat.textColor}`}>{stat.value}</p>
              </div>
              
              <div className={`mt-2 text-[9px] font-black tracking-[0.1em] uppercase z-10 flex items-center gap-1.5 ${stat.textColor === 'text-white' ? 'opacity-50' : 'text-[#6B7280]'}`}>
                 <stat.icon className="w-3 h-3" /> System Live Log
              </div>
              <stat.icon className={`absolute -right-4 -bottom-4 opacity-10 -rotate-12 transition-transform group-hover:rotate-0 ${stat.textColor === 'text-white' ? 'text-white' : 'text-[#0B1F3B]'}`} size={110} />
              {stat.bgColor === 'bg-white' && <div className="absolute top-0 left-0 w-full h-1.5 bg-[#22D3EE]"></div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Maintenance List Area */}
          <div className="xl:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1E5EFF]"></div>

            <div className="flex justify-between items-center mb-8 border-b border-[#E5E7EB] pb-5">
              <h2 className="text-sm font-black text-[#0B1F3B] uppercase tracking-widest flex items-center gap-3">
                <Settings2 className="text-[#1E5EFF] w-5 h-5" /> Active Service Tickets
              </h2>
              <button className="bg-[#F8FAFC] border border-[#E5E7EB] text-[#0B1F3B] text-[10px] font-black px-5 py-2 rounded-xl hover:bg-[#1E5EFF] hover:text-white transition-all uppercase tracking-widest flex items-center gap-2">
                <Filter className="w-3 h-3" /> Filter Log
              </button>
            </div>
            
            <div className="space-y-4">
              {mockMaintenance.length > 0 ? (
                mockMaintenance.map((request, i) => (
                  <div key={i} className="group bg-[#F8FAFC] hover:bg-white border border-transparent hover:border-[#1E5EFF] p-5 rounded-xl flex items-center justify-between shadow-sm transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-center text-[#1E5EFF] group-hover:bg-[#1E5EFF] group-hover:text-white transition-all shadow-sm">
                        <Wrench size={22} />
                      </div>
                      <div>
                        <h4 className="font-black text-[#0B1F3B] uppercase text-lg leading-none mb-1 group-hover:text-[#1E5EFF] transition-colors">
                          {request.title || 'Service Request'}
                        </h4>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-[#6B7280] tracking-widest uppercase">
                          <span className="bg-[#E5E7EB] px-2 py-0.5 rounded text-[9px] text-[#0B1F3B]">Unit {request.unit || 'A1'}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5 italic">
                            ID: {String(request.id).slice(0, 8)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-10">
                      <div className="hidden lg:flex flex-col items-end">
                        <div className="flex items-center gap-2 text-[10px] font-black text-[#0B1F3B] uppercase tracking-widest">
                          {request.status === 'pending' ? <Clock className="w-3 h-3 text-amber-500" /> : <Hammer className="w-3 h-3 text-[#22D3EE]" />}
                          {request.status?.toUpperCase() || 'PENDING'}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-tighter mt-1 ${request.priority === 'urgent' ? 'text-rose-500' : 'text-[#6B7280]'}`}>
                           Priority: {request.priority?.toUpperCase() || 'NORMAL'}
                        </span>
                      </div>
                      <ChevronRight className="text-[#E5E7EB] group-hover:text-[#1E5EFF] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-24 text-center border-2 border-dashed border-[#E5E7EB] rounded-2xl bg-[#F8FAFC]">
                  <AlertTriangle className="w-12 h-12 text-[#E5E7EB] mx-auto mb-4" />
                  <p className="text-[#6B7280] font-black text-[11px] uppercase tracking-widest">No active service tickets found</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0B1F3B] p-8 rounded-2xl shadow-xl border-l-4 border-[#22D3EE]">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-white flex items-center gap-2">
                 <Wrench className="text-[#22D3EE] w-4 h-4" /> Service Actions
              </h3>
              <div className="space-y-3">
                <Button className="w-full justify-start rounded-xl text-[11px] h-14 shadow-lg shadow-blue-500/20">
                  <Plus className="mr-3 w-5 h-5" /> Log Manual Issue
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl border-white/20 text-white hover:bg-white/10 text-[11px] h-14">
                  <Search className="mr-3 w-5 h-5" /> Search Service Logs
                </Button>
              </div>
            </div>

            <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mb-4">Performance KPI</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-pulse"></div>
                  <span className="text-[11px] font-black uppercase text-[#0B1F3B]">48hr avg. RESOLUTION</span>
                </div>
                <HelpCircle size={14} className="text-[#E5E7EB]" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 py-10 text-[#6B7280] text-[9px] tracking-[0.4em] font-bold uppercase border-t border-[#E5E7EB] w-full text-center">
          Boarder-Q <span className="mx-2 text-[#22D3EE]">|</span> Technical Support <span className="mx-2 text-[#22D3EE]">|</span> V1.2.0
        </footer>
      </main>
    </div>
  );
}