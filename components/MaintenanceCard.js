import { Wrench, AlertCircle, CheckCircle2, Clock, MapPin, User, ArrowUpRight } from 'lucide-react';

export default function MaintenanceCard({ request }) {
  const statusConfig = {
    'Pending': {
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/5',
      icon: Clock
    },
    'In Progress': {
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/5',
      icon: Wrench
    },
    'Completed': {
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/5',
      icon: CheckCircle2
    },
  };

  const config = statusConfig[request.status] || statusConfig['Pending'];
  const StatusIcon = config.icon;

  return (
    <div className="glass-panel p-6 border-l-2 border-l-slate-800 hover:border-l-cyan-400 transition-all duration-500 group">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 border ${config.border} ${config.bg} ${config.color} shadow-[0_0_10px_rgba(255,255,255,0.02)]`}>
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-white uppercase italic tracking-tighter text-lg leading-tight group-hover:text-cyan-400 transition-colors">
              {request.title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest bg-cyan-500/5 px-2 py-0.5 border border-cyan-500/20">
                 RM {request.roomNumber}
               </span>
               <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                 <Clock className="w-3 h-3" /> {request.date}
               </span>
            </div>
          </div>
        </div>
        
        <div className={`px-3 py-1 border ${config.border} ${config.bg} ${config.color} text-[9px] font-black uppercase tracking-[0.2em] italic flex items-center gap-2`}>
          <div className={`w-1 h-1 rounded-full animate-pulse ${config.color.replace('text', 'bg')}`}></div>
          <StatusIcon className="w-3 h-3" />
          {request.status}
        </div>
      </div>

      <div className="bg-slate-950/40 p-4 border border-slate-800/40 rounded-sm mb-6">
        <p className="text-slate-400 text-xs leading-relaxed font-light italic">
          "{request.description}"
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-900/80">
        <div className="flex items-center gap-2 text-slate-500">
          <User className="w-3 h-3 text-purple-500" />
          <span className="text-[10px] font-mono uppercase tracking-widest">{request.tenantName}</span>
        </div>
        
        <button className="flex items-center gap-1 text-cyan-400 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
          Audit Details <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
        <div className="w-8 h-8 bg-slate-800 border border-slate-700 flex items-center justify-center text-[8px] font-mono text-slate-500">IMG</div>
        <p className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter">1 Attachment detected</p>
      </div>
    </div>
  );
}