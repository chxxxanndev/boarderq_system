'use client';
import React from 'react';
import { 
  CreditCard, 
  Download, 
  History, 
  ChevronRight,
  ArrowUpRight,
  Receipt,
  Clock
} from 'lucide-react';
import Button from '@/components/Button';

export default function TenantPayments() {
  const paymentHistory = [
    { id: 'TXN-9042', date: 'MAR 05, 2026', amount: '5,500', status: 'PAID', method: 'GCASH', initial: 'GC' },
    { id: 'TXN-8821', date: 'FEB 05, 2026', amount: '5,500', status: 'PAID', method: 'GCASH', initial: 'GC' },
    { id: 'TXN-7655', date: 'JAN 05, 2026', amount: '5,500', status: 'PAID', method: 'BANK', initial: 'BT' },
  ];

  const stats = [
    { label: 'Outstanding Balance', value: '₱5,500.00', sub: 'DUE IN 4 DAYS', bgColor: 'bg-[#C5C7C7]', icon: CreditCard },
    { label: 'Total Paid to Date', value: '₱16,500.00', sub: 'ALL PAID', bgColor: 'bg-[#B0B2B2]', icon: History },
    { label: 'Last Transaction', value: 'MAR 05', sub: 'SUCCESSFUL', bgColor: 'bg-[#A1A3A3]', icon: ArrowUpRight },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Header Section */}
        <div className="flex items-baseline gap-4 mb-12">
          <h1 className="text-4xl font-[1000] tracking-tighter uppercase leading-none">
            <span className="text-white">BILLING & </span>
            <span className="text-[#00A3CC]">HISTORY</span>
          </h1>
          <div className="bg-[#00A3CC]/10 border border-[#00A3CC]/20 px-4 py-1 rounded-sm">
            <span className="text-[#00A3CC] text-[9px] font-black tracking-[0.4em] uppercase">
              FINANCIAL TERMINAL
            </span>
          </div>
          <div className="flex-1 h-[1px] bg-white/10 ml-4 hidden md:block"></div>
          <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase hidden md:block">
            NODE 07 / ACTIVE
          </p>
        </div>

        {/* Financial Stats Grid - Matching the Blocky Admin Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`${stat.bgColor} p-6 rounded-2xl flex flex-col items-center justify-center h-44 shadow-2xl text-center relative overflow-hidden group hover:scale-[1.02] transition-transform`}
            >
              <h2 className="text-xs font-[1000] text-black leading-tight uppercase mb-1">
                {stat.label}
              </h2>
              <p className="text-4xl font-[1000] text-white leading-none tracking-tighter my-1">
                {stat.value}
              </p>
              <div className="mt-2 text-[9px] font-black text-black/60 tracking-[0.2em] uppercase">
                {stat.sub}
              </div>
              {/* Subtle Icon watermark */}
              <stat.icon className="absolute -right-2 -bottom-2 w-16 h-16 text-black/5 -rotate-12" />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Transaction Logs Section */}
          <div className="xl:col-span-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col shadow-2xl">
            <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-3">
              <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00A3CC]"></span>
                TRANSACTION LOGS
              </h2>
              <div className="bg-black px-3 py-1 text-[9px] font-black tracking-widest text-white">
                SECURE ACCESS
              </div>
            </div>
            
            <div className="space-y-3">
              {paymentHistory.map((item, i) => (
                <div key={i} className="bg-[#6F7171] hover:bg-[#5a5c5c] transition-all p-5 rounded-lg flex items-center justify-between group cursor-pointer shadow-md border-l-4 border-transparent hover:border-[#00A3CC]">
                  <div className="flex items-center gap-4 w-1/2">
                    <div className="w-10 h-10 bg-black/20 flex items-center justify-center font-[1000] text-xs text-white border border-white/10">
                      {item.initial}
                    </div>
                    <div>
                      <h4 className="font-black text-white uppercase text-lg tracking-tight">₱{item.amount}</h4>
                      <p className="text-[10px] font-bold text-white/50 tracking-widest uppercase">
                        {item.id} | {item.date} | {item.method}
                      </p>
                    </div>
                  </div>
                  <button className="text-[10px] font-black text-white group-hover:text-[#00A3CC] flex items-center gap-2 tracking-[0.2em] transition-colors">
                    RECEIPT <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] hover:text-[#00A3CC] transition-colors">
                REQUEST FULL STATEMENT
              </button>
            </div>
          </div>

          {/* Quick Actions / Portal Section */}
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-xl p-8 border-l-4 border-[#00A3CC] shadow-2xl rounded-r-lg">
              <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-white">
                 Payment Portal
              </h3>
              <div className="space-y-3">
                <Button className="w-full justify-start rounded-xl bg-[#00A3CC] hover:bg-[#008BB3] text-[10px] tracking-[0.2em] font-[1000] h-12 border-none">
                  <CreditCard className="mr-3 w-4 h-4" /> SETTLE CURRENT BILL
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl border-white/20 text-white hover:bg-white hover:text-black text-[10px] tracking-[0.2em] font-[1000] h-12 transition-all">
                  <Receipt className="mr-3 w-4 h-4" /> AUTO-PAY SETUP
                </Button>
              </div>
            </div>

            {/* Critical Notice */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-2 opacity-10">
                 <Clock size={40} />
               </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">System Notice</span>
              </div>
              <p className="text-[11px] font-bold text-white/60 uppercase leading-tight tracking-tight">
                GCASH GATEWAY MAINTENANCE ON <span className="text-white">MARCH 25</span>. 
                EXPECT MINOR DELAYS IN RECEIPT GENERATION.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-20 py-8 text-white/30 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-white/5 w-full text-center">
          Console <span className="mx-2 text-[#00A3CC]">/</span> Secure <span className="mx-2 text-[#00A3CC]">/</span> Boarder-Q Financial v1.0
        </footer>
      </main>
    </div>
  );
}