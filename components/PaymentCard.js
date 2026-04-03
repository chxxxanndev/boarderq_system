import { CreditCard, Calendar, CheckCircle, Clock, Banknote } from 'lucide-react';

export default function PaymentCard({ payment }) {
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

        <div>
          <h4 className="font-black text-white italic uppercase tracking-tighter text-lg leading-none mb-1 group-hover:text-cyan-400 transition-colors">
            {payment.month} Rent
          </h4>
          <p className="text-[10px] text-slate-500 flex items-center gap-1 font-mono uppercase tracking-widest">
            <Calendar className="w-3 h-3 text-slate-600" /> Deadline: <span className="text-slate-300">{payment.dueDate}</span>
          </p>
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
    </div>
  );
}