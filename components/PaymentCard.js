'use client';

import { useState } from 'react';
import { CreditCard, Calendar, CheckCircle, Clock, Banknote, ChevronDown, X, Receipt, Phone, User, Hash } from 'lucide-react';

export default function PaymentCard({ payment }) {
  const [isOpen, setIsOpen] = useState(false);
  const isPaid = payment.status === 'Paid';

  return (
    <div className="w-full">
      {/* ── MAIN CARD ROW ── */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent flex flex-col md:flex-row items-center justify-between gap-4 py-2 group cursor-pointer"
      >
        {/* LEFT SECTION: Icon and Title */}
        <div className="flex items-center gap-5 w-full md:w-auto">
          {/* Status Icon Box */}
          <div className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
            isPaid
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.1)]'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.1)]'
          }`}>
            {isPaid ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
          </div>

          <div>
            <h4 className="font-black text-white italic uppercase tracking-tighter text-lg leading-none mb-1 group-hover:text-cyan-400 transition-colors">
              {payment.month} Rent
            </h4>
            <p className="text-[10px] text-slate-500 flex items-center gap-1 font-mono uppercase tracking-widest">
              <Calendar className="w-3 h-3 text-slate-600" /> Deadline:{' '}
              <span className="text-slate-300">{payment.dueDate}</span>
            </p>
          </div>
        </div>

        {/* RIGHT SECTION: Amount, Status, Chevron */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t border-slate-800/50 md:border-0 pt-4 md:pt-0">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-mono text-xs">PHP</span>
            <p className="text-2xl font-black text-white tracking-tighter">
              {payment.amount.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <div className={`px-3 py-0.5 border text-[10px] font-black uppercase tracking-[0.2em] italic flex items-center gap-1.5 ${
              isPaid
                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                : 'bg-amber-500/5 border-amber-500/20 text-amber-400 animate-pulse'
            }`}>
              <div className={`w-1 h-1 rounded-full ${isPaid ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
              {payment.status}
            </div>

            {/* Chevron toggle indicator */}
            <ChevronDown
              className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`}
            />
          </div>
        </div>
      </div>

      {/* ── POP-OUT DETAILS SECTION ── */}
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="mt-2 mb-4 border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-5 rounded-sm">

          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500 flex items-center gap-2">
              <Receipt className="w-3 h-3" /> Payment Details
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="text-slate-600 hover:text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Detail Rows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">

            <div className="flex items-start gap-3 p-3 bg-slate-800/40 border border-slate-700/30">
              <Hash className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-0.5">Reference No.</p>
                <p className="text-white font-mono text-xs">{payment.reference ?? '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800/40 border border-slate-700/30">
              <Banknote className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-0.5">Payment Method</p>
                <p className="text-white font-mono text-xs">{payment.method ?? '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800/40 border border-slate-700/30">
              <User className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-0.5">Tenant</p>
                <p className="text-white font-mono text-xs">{payment.tenant ?? '—'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-800/40 border border-slate-700/30">
              <Calendar className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest text-slate-500 mb-0.5">Date Paid</p>
                <p className="text-white font-mono text-xs">{payment.datePaid ?? '—'}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-700/40">
            {isPaid ? (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-black uppercase tracking-widest italic hover:bg-cyan-500/20 transition-all">
                  <Receipt className="w-3.5 h-3.5" /> View Receipt
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-slate-700/40 text-slate-400 text-[11px] font-black uppercase tracking-widest italic hover:text-white hover:border-slate-500 transition-all">
                  <CreditCard className="w-3.5 h-3.5" /> Download PDF
                </button>
              </>
            ) : (
              <>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-black uppercase tracking-widest italic hover:bg-emerald-500/20 transition-all">
                  <CheckCircle className="w-3.5 h-3.5" /> Confirm Payment
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-black uppercase tracking-widest italic hover:bg-amber-500/20 transition-all animate-pulse">
                  <Phone className="w-3.5 h-3.5" /> Send Reminder
                </button>
              </>
            )}
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-800/60 w-full" />
    </div>
  );
}
