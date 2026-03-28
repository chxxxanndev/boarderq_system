'use client';
import Sidebar from '@/components/Sidebar';
import PaymentCard from '@/components/PaymentCard';
import { mockPayments } from '@/lib/db';
import { Download, Filter, ReceiptText, ShieldCheck } from 'lucide-react';

export default function LandlordPayments() {
  return (
    <div className="flex min-h-screen">

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 lg:p-12">
        
        {/* SECTION HEADER - Mimics your reference image style */}
        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-purple-900/40 border border-purple-500/30 px-6 py-2 rounded-sm shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <span className="text-purple-300 font-black text-[11px] tracking-[0.3em] uppercase italic">
              FINANCIAL RECORDS
            </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            Payments
          </h1>
          <div className="flex-1 h-[1px] bg-slate-800/60"></div>
        </div>

        {/* TOP ACTIONS BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="max-w-md">
            <p className="text-slate-500 text-[11px] font-mono tracking-widest uppercase mb-1">
              Ledger Status: <span className="text-cyan-400">ACTIVE</span>
            </p>
            <p className="text-slate-400 text-sm font-light">
              Audit logs for all rental transactions and pending dues.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="bg-slate-900/50 border border-slate-700 text-slate-400 px-5 py-2.5 rounded-sm font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:text-white transition-all">
              <Filter className="w-4 h-4" /> Filter Logs
            </button>
            <button className="bg-cyan-500 text-slate-950 px-5 py-2.5 rounded-sm font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-white transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        </div>

        {/* 3. PAYMENTS LIST */}
        <div className="space-y-4">
          {mockPayments.length > 0 ? (
            mockPayments.map((payment) => (
              <div key={payment.id} className="flex flex-col md:flex-row items-center gap-4 glass-panel p-4 border-l-2 border-l-slate-700 hover:border-l-cyan-400 transition-all group">
                {/* Status Indicator Icon */}
                <div className="hidden md:flex bg-slate-950 p-3 border border-slate-800 text-slate-600 group-hover:text-cyan-400 transition-colors">
                  <ReceiptText className="w-5 h-5" />
                </div>

                <div className="flex-1 w-full">
                  {/* We pass the dark-themed payment card here */}
                  <PaymentCard payment={payment} />
                </div>

                {/* Tactical Action Sidebar for each row */}
                <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4 border-t border-slate-800 md:border-t-0 pt-4 md:pt-0">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-500 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-sm transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-500 hover:text-purple-400 hover:bg-purple-400/10 rounded-sm transition-all">
                      <ShieldCheck className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button className="bg-slate-900 border border-slate-700 text-slate-400 px-6 py-2 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 hover:text-cyan-400 transition-all">
                    Remind
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center glass-panel">
              <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                Zero transaction history found
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}