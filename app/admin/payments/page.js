'use client';
import Sidebar from '@/components/Sidebar';
import PaymentCard from '@/components/PaymentCard';
import { mockPayments } from '@/lib/db';
import { Download, Filter, ReceiptText, ShieldCheck } from 'lucide-react';

export default function LandlordPayments() {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <main className="flex-1 p-8 lg:p-12">
        
        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-purple-500/10 border border-purple-500/20 px-6 py-2 rounded-sm shrink-0 shadow-sm">
            <span className="text-purple-700 font-black text-[11px] tracking-[0.3em] uppercase italic">
              FINANCIAL RECORDS
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Payments
          </h1>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="max-w-md">
            <p className="text-slate-500 text-[11px] font-mono tracking-widest uppercase mb-1">
              Ledger Status: <span className="text-cyan-700 font-bold">ACTIVE</span>
            </p>
            <p className="text-slate-600 text-sm font-light">
              Audit logs for all rental transactions and pending dues.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-sm font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
              <Filter className="w-4 h-4" /> Filter Logs
            </button>
            <button className="bg-cyan-600 text-white px-5 py-2.5 rounded-sm font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-cyan-700 transition-all shadow-md">
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {mockPayments.length > 0 ? (
            mockPayments.map((payment) => (
              <div key={payment.id} className="flex flex-col md:flex-row items-center gap-4 glass-panel bg-white p-4 border-l-2 border-l-slate-300 hover:border-l-cyan-500 transition-all group shadow-sm">
                
                <div className="hidden md:flex bg-slate-100 p-3 border border-slate-200 text-slate-400 group-hover:text-cyan-600 transition-colors">
                  <ReceiptText className="w-5 h-5" />
                </div>

                <div className="flex-1 w-full">
                  <PaymentCard payment={payment} />
                </div>

                <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4 border-t border-slate-100 md:border-t-0 pt-4 md:pt-0">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-sm transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-sm transition-all">
                      <ShieldCheck className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button className="bg-slate-100 border border-slate-200 text-slate-700 px-6 py-2 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 hover:text-cyan-700 transition-all">
                    Remind
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center glass-panel bg-white/50 border-dashed border-slate-200">
              <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.4em]">
                Zero transaction history found
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}