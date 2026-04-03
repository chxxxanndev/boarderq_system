'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import { Mail, Lock, ShieldCheck, User, Fingerprint } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-6">
      <div className="glass-panel p-10 w-full max-w-md border-t-2 border-t-cyan-500/50 relative overflow-hidden">
        
        <Fingerprint className="absolute -right-4 -top-4 w-32 h-32 text-slate-900/50 -rotate-12 pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <div className="bg-purple-900/30 border border-purple-500/30 px-4 py-1 inline-block mb-4 rounded-sm">
            <span className="text-purple-300 text-[9px] tracking-[0.4em] uppercase font-black italic">
              Access Required
            </span>
          </div>
          <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase glow-text">
            Log In
          </h1>
          <p className="text-slate-500 text-[10px] font-mono tracking-widest mt-2 uppercase">
            Initialize secure session gateway
          </p>
        </div>

        <form className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 block">
              User Identification
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 w-4 h-4 transition-colors" />
              <input 
                type="email" 
                placeholder="USER@SYSTEM.NET" 
                className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-slate-800 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/10 transition-all font-mono text-sm uppercase"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 block">
              Security Protocol
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 w-4 h-4 transition-colors" />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-slate-800 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/10 transition-all font-mono text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-3 h-3 border-slate-800 bg-slate-900 text-cyan-500 rounded-none focus:ring-0" />
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest group-hover:text-slate-300">Stay Synced</span>
            </label>
            <Link href="#" className="text-cyan-500/70 text-[10px] font-mono uppercase tracking-widest hover:text-cyan-400">Recovery</Link>
          </div>

          <div className="pt-4 space-y-4">
            <Button 
              className="w-full py-4 text-[11px]" 
              variant="primary"
              onClick={(e) => { e.preventDefault(); window.location.href='/dashboard'; }}
            >
              Sign In as Landlord <ShieldCheck className="w-4 h-4 ml-1" />
            </Button>
            
            <Button 
              className="w-full py-4 text-[11px] bg-purple-600/10 border border-purple-500/30 text-purple-400 hover:bg-purple-600 hover:text-white" 
              onClick={(e) => { e.preventDefault(); window.location.href='/tenant/dashboard'; }}
            >
              Sign In as Tenant <User className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-600 text-[10px] font-mono uppercase tracking-widest">
            New Entity? <Link href="/register" className="text-cyan-400 hover:glow-text">Register Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}