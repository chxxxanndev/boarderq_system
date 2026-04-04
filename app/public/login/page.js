'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import { Mail, Lock, ShieldCheck, Fingerprint } from 'lucide-react';

export default function LoginPage() {

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // 🔐 TEMP MOCK AUTH (replace with real backend later)

    // 👉 LANDLORD (fixed account)
    if (email === 'admin@boarderq.com' && password === 'admin123') {
      window.location.href = '/dashboard';
      return;
    }

    // 👉 TENANT (example account)
    if (email === 'tenant@boarderq.com' && password === 'tenant123') {
      window.location.href = '/tenant/dashboard';
      return;
    }

    alert('Invalid credentials');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-6 bg-slate-50">
      
      <div className="bg-white p-10 w-full max-w-md border border-slate-200 shadow-2xl rounded-sm relative overflow-hidden">
        
        <Fingerprint className="absolute -right-4 -top-4 w-32 h-32 text-slate-50 -rotate-12 pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <div className="bg-purple-50 border border-purple-100 px-4 py-1 inline-block mb-4 rounded-sm">
            <span className="text-purple-700 text-[9px] tracking-[0.4em] uppercase font-black italic">
              Identity Verification
            </span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">
            Log In
          </h1>
          <p className="text-slate-400 text-[10px] font-mono tracking-widest mt-3 uppercase">
            Secure Terminal Access <span className="text-cyan-600">v2.0</span>
          </p>
        </div>

        <form className="space-y-6 relative z-10">
          
          {/* EMAIL */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 block font-bold">
              User Identification
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-cyan-600 w-4 h-4 transition-colors" />
              <input 
                type="email" 
                placeholder="USER@BOARDERQ.COM" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-600/5 transition-all font-mono text-sm uppercase"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 block font-bold">
              Security Protocol
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-cyan-600 w-4 h-4 transition-colors" />
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-600/5 transition-all font-mono text-sm"
              />
            </div>
          </div>

          {/* OPTIONS */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-3.5 h-3.5 border-slate-300 rounded-sm text-cyan-600 focus:ring-cyan-600/20" />
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest group-hover:text-slate-800 transition-colors">
                Stay Synced
              </span>
            </label>
            <Link href="#" className="text-slate-400 text-[10px] font-mono uppercase tracking-widest hover:text-cyan-600 transition-colors">
              Recovery
            </Link>
          </div>

          {/* SIGN IN BUTTON */}
          <div className="pt-4 space-y-4">
            <Button 
              className="w-full py-4 text-[11px] shadow-lg shadow-cyan-600/20" 
              variant="primary"
              onClick={handleLogin}
            >
              Sign In <ShieldCheck className="w-4 h-4 ml-2" />
            </Button>
          </div>

        </form>

        {/* REGISTER LINK */}
        <div className="mt-10 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">
            New Entity?{' '}
            <Link href="/public/register" className="text-cyan-600 font-black hover:underline ml-1">
              Register Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}