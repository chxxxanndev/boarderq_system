import { User, Calendar, FileText, Check, X, Tag } from 'lucide-react';

export default function ApplicationCard({ application, onAccept, onReject }) {
  return (
    <div className="glass-panel p-6 border-l-2 border-l-purple-500/50 hover:border-l-cyan-400 transition-all duration-500 group">
      {/* HEADER SECTION */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-sm flex items-center justify-center text-cyan-400 font-black text-xl italic group-hover:border-cyan-400/50 transition-colors">
            {application.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-black text-white uppercase italic tracking-tight text-lg">
              {application.name}
            </h4>
            <p className="text-[10px] text-slate-500 flex items-center gap-1 font-mono uppercase tracking-widest">
              <Calendar className="w-3 h-3 text-purple-500" /> {application.date}
            </p>
          </div>
        </div>
        <div className="bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-sm">
          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-tighter">
            UNIT {application.roomNumber}
          </span>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="space-y-4 mb-8 bg-slate-950/40 p-4 rounded-sm border border-slate-800/40">
        <div className="flex items-center gap-3 text-xs">
          <User className="w-3 h-3 text-slate-600" />
          <span className="text-slate-400 font-mono tracking-tight">{application.email}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <Tag className="w-3 h-3 text-slate-600" />
          <span className="text-slate-400 font-mono tracking-tight uppercase">
            Work: <span className="text-slate-200">{application.occupation}</span>
          </span>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => onReject(application.id)}
          className="flex items-center justify-center gap-2 py-2.5 border border-slate-800 text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all"
        >
          <X className="w-3 h-3" /> Decline
        </button>
        <button 
          onClick={() => onAccept(application.id)}
          className="flex items-center justify-center gap-2 py-2.5 bg-cyan-500 text-slate-950 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]"
        >
          <Check className="w-3 h-3" /> Approve
        </button>
      </div>
    </div>
  );
}