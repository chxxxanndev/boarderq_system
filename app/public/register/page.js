'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import { User, ShieldCheck, Fingerprint, Zap } from 'lucide-react';

export default function RegisterPage() {
  const [role, setRole] = useState('tenant');

  const handleRegister = (e) => {
    e.preventDefault();

    const name = document.querySelector('input[type="text"]').value;
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // ❌ BLOCK landlord registration
    if (role === 'landlord') {
      alert('Landlord account is pre-created. Registration is for tenants only.');
      return;
    }

    // ✅ TEMP MOCK REGISTER
    console.log({
      name,
      email,
      password,
      role: 'tenant',
      status: 'pending'
    });

    alert('Application submitted! Wait for landlord approval.');

    // 👉 redirect after apply
    window.location.href = '/';
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-6 bg-slate-50">
      
      <div className="bg-white p-10 w-full max-w-lg border border-slate-200 shadow-2xl rounded-sm relative overflow-hidden">
        
        <Fingerprint className="absolute -right-6 -top-6 w-40 h-40 text-slate-50 -rotate-12 pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <div className={`inline-block px-4 py-1 mb-4 rounded-sm border transition-colors duration-500 ${
            role === 'tenant' ? 'bg-cyan-50 border-cyan-100' : 'bg-purple-50 border-purple-100'
          }`}>
            <span className={`text-[9px] tracking-[0.4em] uppercase font-black italic transition-colors duration-500 ${
              role === 'tenant' ? 'text-cyan-700' : 'text-purple-700'
            }`}>
              System Registration
            </span>
          </div>

          <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">
            Join the Network
          </h1>

          <p className="text-slate-400 text-[10px] font-mono tracking-widest mt-3 uppercase">
            Initialize your profile classification below
          </p>
        </div>

        {/* ROLE TOGGLE (UI ONLY) */}
        <div className="relative z-10 mb-12">
          <div className="flex bg-slate-100 p-1.5 rounded-sm border border-slate-200 relative">
            
            <div 
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] transition-all duration-500 ease-in-out shadow-md ${
                role === 'tenant' 
                  ? 'left-1.5 bg-cyan-600' 
                  : 'left-[calc(50%+3.5px)] bg-purple-600'
              }`}
            ></div>

            <button 
              type="button"
              onClick={() => setRole('tenant')}
              className={`flex-1 flex items-center justify-center gap-3 py-3 z-10 ${
                role === 'tenant' ? 'text-white font-black' : 'text-slate-500 font-bold'
              } text-[11px] uppercase tracking-widest italic`}
            >
              <User className="w-4 h-4" /> Tenant
            </button>

            <button 
              type="button"
              onClick={() => setRole('landlord')}
              className={`flex-1 flex items-center justify-center gap-3 py-3 z-10 ${
                role === 'landlord' ? 'text-white font-black' : 'text-slate-500 font-bold'
              } text-[11px] uppercase tracking-widest italic`}
            >
              <ShieldCheck className="w-4 h-4" /> Landlord
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter italic">
              {role === 'tenant' 
                ? "Searching for rooms? You are applying as a Tenant." 
                : "Landlord accounts are restricted. Contact system owner."
              }
            </p>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-5 relative z-10">
          
          <div className="space-y-4">

            <div>
              <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 block font-bold">
                Entity Name
              </label>
              <input type="text" required className="w-full px-4 py-4 bg-slate-50 border border-slate-200 font-mono text-xs uppercase" />
            </div>

            <div>
              <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 block font-bold">
                System Email
              </label>
              <input type="email" required className="w-full px-4 py-4 bg-slate-50 border border-slate-200 font-mono text-xs uppercase" />
            </div>

            <div>
              <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 block font-bold">
                Access Key
              </label>
              <input type="password" required className="w-full px-4 py-4 bg-slate-50 border border-slate-200 font-mono text-xs" />
            </div>

          </div>

          <Button 
            type="submit"
            className="w-full py-5 text-[12px] mt-4 bg-cyan-600 hover:bg-cyan-700 text-white shadow-xl"
          >
            Submit Application <Zap className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="mt-10 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">
            Identity already active?{' '}
            <Link href="/public/login" className="text-slate-900 font-black hover:underline ml-1">
              Login to Terminal
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}