'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import { Mail, Lock, ShieldCheck, Fingerprint } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // 1. ADMIN CHECK
    if (email === 'admin@boarderq.com' && password === 'admin123') {
      localStorage.setItem('role', 'landlord');
      localStorage.setItem('userEmail', email);
      router.push('/admin/dashboard');
      return;
    }

    // 2. TENANT CHECK
    const localData = localStorage.getItem('tenants');
    const tenants = localData ? JSON.parse(localData) : [];

    const foundTenant = tenants.find(
      (t) => t.email.toLowerCase() === email.toLowerCase() && t.password === password
    );

    if (foundTenant) {
      if (foundTenant.status !== 'approved') {
        alert('Access Restricted: Your account is pending approval.');
        return;
      }

      localStorage.setItem('role', 'tenant');
      localStorage.setItem('userEmail', foundTenant.email);
      router.push('/tenant/dashboard');
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

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 block font-bold">
              User Identification
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-cyan-600 w-4 h-4 transition-colors" />
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="USER@BOARDERQ.COM" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-600/5 transition-all font-mono text-sm uppercase"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 block font-bold">
              Security Protocol
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-cyan-600 w-4 h-4 transition-colors" />
              <input 
                type="password" 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••" 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-600/5 transition-all font-mono text-sm"
              />
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <Button 
              type="submit"
              className="w-full py-4 text-[11px] shadow-lg shadow-cyan-600/20 bg-cyan-600 hover:bg-cyan-700 text-white" 
            >
              Sign In <ShieldCheck className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>

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