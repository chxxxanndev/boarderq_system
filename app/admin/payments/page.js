'use client';
import React from 'react';
import { 
  Download, Filter, ReceiptText, ShieldCheck, 
  Search, ChevronRight, HelpCircle, TrendingUp, DollarSign
} from 'lucide-react';
import { mockPayments } from '@/lib/db';
import Button from '@/components/Button';

export default function LandlordPayments() {
  // Stats matching the heavy grey block hierarchy from the UI image
  const stats = [
    { label: 'TOTAL REVENUE', value: '₱142.', bgColor: 'bg-[#C5C7C7]' },
    { label: 'PENDING DUES', value: '₱12.5K', bgColor: 'bg-[#B0B2B2]' },
    { label: 'COLLECTED', value: '88%', bgColor: 'bg-[#A1A3A3]' },
    { label: 'TRANS. COUNT', value: mockPayments.length.toString().padStart(2, '0'), bgColor: 'bg-[#919393]' },
  ];

  return (
    // Matches Dashboard Gradient
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
      
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Header - Matches Dashboard Title Style */}
        <div className="flex items-baseline gap-4 mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
            <span className="text-white">FINANCIAL</span>
            <span className="text-[#00A3CC]"> RECORDS</span>
          </h1>
          <span className="text-white text-xs font-bold tracking-[0.3em] uppercase opacity-80">
            LEDGER MODULE
          </span>
        </div>

        {/* Top Stats - Exact matches to the Dashboard blocks */}
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
                <div className="text-[9px] font-black uppercase tracking-tight text-black/60 flex items-center gap-1">
                   <TrendingUp className="w-3 h-3" /> Live Audit Log
                </div>
                <p className="text-[9px] font-black text-white tracking-widest uppercase">AS OF AUGUST</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Payment List - Matches "Recent Application" Container */}
          <div className="xl:col-span-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col">
            <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-3">
              <div className="relative w-2/3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="SEARCH TRANSACTIONS BY TENANT OR ID..." 
                  className="bg-transparent border-none focus:ring-0 text-[10px] font-black tracking-widest uppercase w-full pl-10"
                />
              </div>
              <div className="flex gap-2">
                 <button className="bg-[#333] hover:bg-black text-white text-[10px] font-black px-4 py-2 rounded-lg transition-all tracking-widest uppercase flex items-center gap-2">
                  <Filter className="w-3 h-3" /> Filter
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {mockPayments.length > 0 ? (
                mockPayments.map((payment, i) => (
                  <div key={i} className="bg-[#6F7171] hover:bg-[#5a5c5c] transition-colors p-5 rounded-lg flex items-center justify-between group shadow-md">
                    <div className="w-1/4">
                      <h4 className="font-black text-white uppercase text-xl tracking-tight leading-none mb-1">
                        {payment.tenantName || 'Tenant'}
                      </h4>
                      <span className="text-[9px] font-bold text-white/40 tracking-widest uppercase">
                        REF: {String(payment.id).slice(0, 8)}
                      </span>
                    </div>
                    
                    <div className="flex-1 flex justify-between text-[11px] font-bold text-white/90 tracking-widest px-8 border-x border-white/10">
                      <span className="flex items-center gap-2">
                         <ReceiptText className="w-4 h-4 text-[#00A3CC]" /> 
                         {payment.date || 'Aug 12'}
                      </span>
                      <span className="font-black text-white">₱{payment.amount || '0.00'}</span>
                      <span className={`px-3 py-0.5 rounded-full text-[9px] border ${
                        payment.status === 'paid' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>
                        {payment.status?.toUpperCase() || 'PENDING'}
                      </span>
                    </div>

                    <div className="flex gap-3 ml-8">
                       <button className="p-2 hover:text-[#00A3CC] text-white/40 transition-all"><Download className="w-5 h-5" /></button>
                       <button className="p-2 hover:text-white text-white/40 transition-all"><ChevronRight className="w-5 h-5" /></button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 flex flex-col items-center justify-center opacity-40">
                  <ReceiptText className="w-16 h-16 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Financial Data Found</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-xl p-8 border-l-4 border-[#00A3CC] shadow-2xl rounded-r-lg">
              <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-white">Financial Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start rounded-xl bg-[#00A3CC] hover:bg-[#008BB3] text-[10px] tracking-[0.2em] font-black h-12 border-none text-black">
                  <Download className="mr-3 w-4 h-4" /> EXPORT MONTHLY REPORT
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl border-white/20 text-white hover:bg-white hover:text-black text-[10px] tracking-[0.2em] font-black h-12">
                  <ShieldCheck className="mr-3 w-4 h-4" /> AUDIT LEDGER
                </Button>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Encryption Status</p>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">SSL SECURED - 256 BIT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 py-8 text-white/30 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-white/5 w-full text-center">
          Console <span className="mx-2 text-[#00A3CC]">/</span> Financial Logic <span className="mx-2 text-[#00A3CC]">/</span> v2.0
        </footer>
      </main>
    </div>
  );
}