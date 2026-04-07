'use client';
import React from 'react';
import { 
  CreditCard, 
  Download, 
  History, 
  ChevronRight,
  Home,
  Wrench,
  Bell,
  Clock,
  ArrowUpRight,
  Receipt
} from 'lucide-react';
import Button from '@/components/Button';

export default function TenantPayments() {
  const paymentHistory = [
    { id: 'TXN-9042', date: 'MAR 05, 2026', amount: '5,500', status: 'PAID', method: 'GCASH', initial: 'GC' },
    { id: 'TXN-8821', date: 'FEB 05, 2026', amount: '5,500', status: 'PAID', method: 'GCASH', initial: 'GC' },
    { id: 'TXN-7655', date: 'JAN 05, 2026', amount: '5,500', status: 'PAID', method: 'BANK', initial: 'BT' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <main className="flex-1 p-8 lg:p-12">
        
        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-cyan-500/10 border border-cyan-500/20 px-6 py-2 rounded-sm shrink-0 shadow-sm">
            <span className="text-cyan-700 font-black text-[11px] tracking-[0.3em] uppercase">
              FINANCIAL TERMINAL
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Billing & History
          </h1>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
          <div className="hidden md:block">
             <p className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">
               Node 07 / Active
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="glass-panel bg-white p-6 border-l-2 border-slate-200 hover:border-l-cyan-500 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 border border-cyan-500/20 bg-cyan-500/10">
                <CreditCard className="w-4 h-4 text-cyan-600" />
              </div>
              <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-rose-600 uppercase">
                Due in 4 Days
              </div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-semibold">Outstanding Balance</p>
            <p className="text-3xl font-black text-slate-900 uppercase tracking-tighter">₱5,500.00</p>
          </div>

          <div className="glass-panel bg-white p-6 border-l-2 border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 border border-emerald-500/20 bg-emerald-500/10">
                <History className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-emerald-600 uppercase">
                All Paid
              </div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-semibold">Total Paid to Date</p>
            <p className="text-3xl font-black text-slate-900 uppercase tracking-tighter">₱16,500.00</p>
          </div>

          <div className="glass-panel bg-white p-6 border-l-2 border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 border border-purple-500/20 bg-purple-500/10">
                <ArrowUpRight className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-semibold">Last Transaction</p>
            <p className="text-3xl font-black text-slate-900 uppercase tracking-tighter">MAR 05</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 glass-panel bg-white border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500"></div>
                Transaction Logs
              </h2>
              <span className="px-2 py-0.5 bg-slate-900 text-white text-[9px] font-mono">SECURE</span>
            </div>
            
            <div className="divide-y divide-slate-100">
              {paymentHistory.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors flex items-center justify-center font-black text-xs border border-slate-200 uppercase">
                      {item.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 uppercase text-sm tracking-tight">₱{item.amount}</h4>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tight">
                        {item.id} <span className="mx-2 opacity-30">|</span> {item.date} <span className="mx-2 opacity-30">|</span> {item.method}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-[10px] font-black uppercase text-cyan-600 group-hover:translate-x-1 transition-transform tracking-widest">
                    Receipt <Download className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 bg-slate-50/80 border-t border-slate-100 text-center">
              <button className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-cyan-600 transition-colors">
                Request Full Statement
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 p-8 text-white border-b-4 border-cyan-500 shadow-xl">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Payment Portal</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start rounded-none bg-cyan-600 hover:bg-cyan-500 text-[10px] tracking-[0.2em] font-bold h-12">
                   SETTLE CURRENT BILL
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-none border-slate-700 text-slate-300 hover:bg-white hover:text-slate-900 text-[10px] tracking-[0.2em] font-bold h-12">
                   AUTO-PAY SETUP
                </Button>
              </div>
            </div>

            <div className="glass-panel border border-slate-200 p-6 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-amber-500" />
                <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">System Notice</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed uppercase tracking-tighter">
                GCash Gateway maintenance on <span className="text-cyan-600 font-bold">March 25</span>. 
                Expect minor delays in receipt generation.
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-20 py-8 text-slate-400 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-slate-200 w-full text-center">
          Console <span className="mx-2 text-cyan-500 opacity-50">/</span> Secure <span className="mx-2 text-cyan-500 opacity-50">/</span> Boarder-Q 2026
        </footer>
      </main>
    </div>
  );
}