'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import { Mail, Lock, Building2, ChevronRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Login Success
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.user.role);
    localStorage.setItem('userEmail', data.user.email);

    // Redirect based on role from Database
    if (data.user.role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/tenant/dashboard');
    }

  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0a] overflow-hidden p-4 md:p-8">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00A3CC]/10 blur-[120px] rounded-full animate-pulse" />
      
      <div className="w-full max-w-5xl h-full max-h-[700px] flex rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 bg-[#111] animate-in fade-in zoom-in duration-700">
        
        {/* Left Section: Branding */}
        <div className="hidden lg:flex flex-1 bg-white relative items-center justify-center overflow-hidden">
          {/* Decorative Curve */}
          <div className="absolute top-0 right-[-120px] h-full w-[240px] bg-white rounded-[100%] z-0 shadow-[-20px_0_40px_rgba(0,0,0,0.05)]" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-8 p-8 bg-slate-50 rounded-full shadow-inner animate-bounce [animation-duration:3s]">
              <Building2 size={80} className="text-[#00A3CC]" />
            </div>
            <h2 className="text-5xl font-[1000] text-black tracking-tighter uppercase leading-none italic">
              BOARDER<span className="text-[#00A3CC]">Q</span>
            </h2>
            <div className="h-1 w-12 bg-[#00A3CC] my-4 rounded-full" />
            <p className="text-slate-400 text-[10px] font-bold tracking-[0.5em] uppercase">
              Management Interface
            </p>
          </div>

          <div className="absolute bottom-10 left-12 text-[9px] text-slate-300 font-mono tracking-widest uppercase">
            System Node: <span className="text-slate-900 font-bold">BQ-MAIN-01</span>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="w-full lg:w-[450px] bg-[#161616] p-10 md:p-14 flex flex-col justify-center relative">
          <div className="mb-10 transform transition-all duration-500 hover:translate-x-2">
            <h1 className="text-4xl font-[1000] text-white tracking-tighter uppercase leading-none">
              LOGIN
            </h1>
            <p className="text-[#00A3CC] text-[10px] font-black tracking-[0.3em] uppercase mt-2">
              Authentication Required
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="group space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#00A3CC] transition-colors">Credential Email</label>
              <input 
                type="email" name="email" required value={formData.email} onChange={handleChange}
                placeholder="identity@boarderq.com" 
                className="w-full px-6 py-4 bg-[#222] border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-[#00A3CC] focus:ring-4 focus:ring-[#00A3CC]/10 transition-all text-sm"
              />
            </div>

            <div className="group space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#00A3CC] transition-colors">Access Key</label>
                <button type="button" className="text-[8px] font-bold text-white/20 hover:text-[#00A3CC] uppercase tracking-widest transition-colors">Reset Key</button>
              </div>
              <input 
                type="password" name="password" required value={formData.password} onChange={handleChange}
                placeholder="••••••••" 
                className="w-full px-6 py-4 bg-[#222] border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-[#00A3CC] focus:ring-4 focus:ring-[#00A3CC]/10 transition-all text-sm"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-[#00A3CC] hover:bg-[#008BB3] text-white font-[1000] tracking-[0.2em] text-xs transition-all active:scale-95 shadow-lg shadow-[#00A3CC]/20 flex justify-center items-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>AUTHORIZE ACCESS <ChevronRight className="ml-2 w-4 h-4" /></>}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest">
              New entity?{' '}
              <Link href="/public/register" className="text-[#00A3CC] hover:text-white transition-colors underline-offset-4 hover:underline ml-1">
                Register Profile
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}