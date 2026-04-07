'use client';

import { useState } from 'react';
import { CreditCard, Calendar, CheckCircle, Clock, Banknote, ChevronDown, X, Receipt, Phone, User, Hash } from 'lucide-react';

export default function PaymentCard({ payment }) {
  const [isOpen, setIsOpen] = useState(false);
  const isPaid = payment.status === 'Paid';

  return (
    <div className="bg-transparent flex flex-col md:flex-row items-center justify-between gap-4 py-2 group">
      <div className="flex items-center gap-5 w-full md:w-auto">
        <div className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
          isPaid 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.1)]' 
            : 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.1)]'
        }`}>
          {isPaid ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
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

      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto border-t border-slate-800/50 md:border-0 pt-4 md:pt-0">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-mono text-xs">PHP</span>
          <p className="text-2xl font-black text-white tracking-tighter glow-text">
            {payment.amount.toLocaleString()}
          </p>
        </div>
        
        <div className={`mt-1 px-3 py-0.5 border text-[10px] font-black uppercase tracking-[0.2em] italic flex items-center gap-1.5 ${
          isPaid 
            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' 
            : 'bg-amber-500/5 border-amber-500/20 text-amber-400 animate-pulse'
        }`}>
          <div className={`w-1 h-1 rounded-full ${isPaid ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
          {payment.status}

        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-800/60 w-full" />
    </div>
  );
}
