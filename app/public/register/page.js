'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import { User, ShieldCheck, Fingerprint, UserPlus, Zap } from 'lucide-react';

export default function RegisterPage() {
  const [role, setRole] = useState('tenant'); 

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-6">
      <div className="glass-panel p-10 w-full max-w-lg border-t-2 border-t-cyan-500/50 relative overflow-hidden">
        
        <Fingerprint className="absolute -right-6 -top-6 w-40 h-40 text-slate-900/40 -rotate-12 pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase glow-text">
            Join the Network
          </h1>
          <p className="text-slate-500 text-[10px] font-mono tracking-widest mt-2 uppercase">
            Initialize your profile classification below
          </p>
        </div>

        <div className="relative z-10 mb-12">
          <div className="flex bg-slate-950/80 p-1.5 rounded-sm border border-slate-800 relative">
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] transition-all duration-500 ease-out shadow-lg ${
                role === 'tenant' 
                  ? 'left-1.5 bg-cyan-500 shadow-cyan-500/20' 
                  : 'left-[calc(50%+3.5px)] bg-purple-600 shadow-purple-600/20'
              }`}
            ></div>

            <button 
              type="button"
              onClick={() => setRole('tenant')}
              className={`flex-1 flex items-center justify-center gap-3 py-3 z-10 transition-colors duration-300 ${
                role === 'tenant' ? 'text-slate-950 font-black' : 'text-slate-500 font-bold'
              } text-[11px] uppercase tracking-widest italic`}
            >
              <User className="w-4 h-4" /> Tenant
            </button>

            <button 
              type="button"
              onClick={() => setRole('landlord')}
              className={`flex-1 flex items-center justify-center gap-3 py-3 z-10 transition-colors duration-300 ${
                role === 'landlord' ? 'text-white font-black' : 'text-slate-500 font-bold'
              } text-[11px] uppercase tracking-widest italic`}
            >
              <ShieldCheck className="w-4 h-4" /> Landlord
            </button>
          </div>

          <div className="mt-4 text-center animate-in fade-in slide-in-from-top-2 duration-700">
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter italic">
              {role === 'tenant' 
                ? "Searching for rooms? You are initializing a Tenant Profile." 
                : "Managing property? You are initializing a Landlord Dashboard."
              }
            </p>
          </div>
        </div>

        <form className="space-y-5 relative z-10">
          <div className="space-y-4">
            <div className="group">
              <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 ml-1 mb-1 block">Entity Name</label>
              <input type="text" placeholder="EX: JOHN DOE" className="w-full px-4 py-4 bg-slate-950/50 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-all font-mono text-xs uppercase" />
            </div>

            <div className="group">
              <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 ml-1 mb-1 block">System Email</label>
              <input type="email" placeholder="ACCESS@MAIL.NET" className="w-full px-4 py-4 bg-slate-950/50 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-all font-mono text-xs uppercase" />
            </div>

            <div className="group">
              <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 ml-1 mb-1 block">Access Key</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-4 bg-slate-950/50 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/50 transition-all font-mono text-xs" />
            </div>
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            className={`w-full py-5 text-[12px] mt-4 transition-colors duration-500 ${
              role === 'landlord' ? 'bg-purple-600 shadow-purple-600/20' : ''
            }`}
          >
            Authorize Profile <Zap className="w-4 h-4 ml-1" />
          </Button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-600 text-[10px] font-mono uppercase tracking-widest">
            Identity already active? <Link href="/login" className="text-cyan-400 hover:glow-text">Encrypted Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}