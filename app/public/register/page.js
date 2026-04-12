'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import { UserPlus, Zap, ArrowLeft, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // ADD THIS BACK - Otherwise you can't type in the inputs!
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Success
      alert('Profile Created Successfully! Please wait for Admin approval before logging in.');
      router.push('/public/login');

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0a] overflow-hidden p-4 md:p-8">
      <div className="w-full max-w-5xl h-full max-h-[700px] flex rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5 bg-[#111] animate-in slide-in-from-bottom-8 duration-700">
        
        {/* Left Side Branding */}
        <div className="hidden lg:flex flex-1 bg-white relative items-center justify-center overflow-hidden">
          <div className="absolute top-0 right-[-120px] h-full w-[240px] bg-white rounded-[100%] z-0" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="mb-6 p-8 bg-slate-50 rounded-full shadow-inner animate-pulse">
              <UserPlus size={80} className="text-[#00A3CC]" />
            </div>
            <h2 className="text-5xl font-[1000] text-black tracking-tighter uppercase italic leading-none">
              JOIN <span className="text-[#00A3CC]">US</span>
            </h2>
            <p className="text-slate-400 text-[10px] font-bold tracking-[0.5em] uppercase mt-4">
              Onboarding Terminal
            </p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-[450px] bg-[#161616] p-10 md:p-14 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-[1000] text-white tracking-tighter uppercase">
              REGISTER
            </h1>
            <p className="text-[#00A3CC] text-[10px] font-black tracking-[0.3em] uppercase mt-1">
              Create Tenant Profile
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Full Identity Name</label>
              <input 
                type="text" name="name" required value={formData.name} onChange={handleChange}
                placeholder="e.g. JOHN SMITH" 
                className="w-full px-5 py-3.5 bg-[#222] border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-[#00A3CC] transition-all text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Communication Email</label>
              <input 
                type="email" name="email" required value={formData.email} onChange={handleChange}
                placeholder="email@provider.com" 
                className="w-full px-5 py-3.5 bg-[#222] border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-[#00A3CC] transition-all text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Secure Password</label>
              <input 
                type="password" name="password" required value={formData.password} onChange={handleChange}
                placeholder="••••••••" 
                className="w-full px-5 py-3.5 bg-[#222] border border-white/5 rounded-2xl text-white placeholder:text-white/10 focus:outline-none focus:border-[#00A3CC] transition-all text-sm"
              />
            </div>

            <div className="pt-4">
<Button
  type="submit"
  disabled={loading}
  className="w-full py-4 rounded-2xl bg-[#00A3CC] hover:bg-[#008BB3] text-white hover:text-slate-900 font-[1000] tracking-[0.2em] text-xs transition-all active:scale-95 flex justify-center items-center"
>                {loading ? <Loader2 className="animate-spin" /> : <>INITIALIZE PROFILE <Zap className="ml-2 w-4 h-4" /></>}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link href="/public/login" className="text-white/20 text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center hover:text-[#00A3CC] transition-colors">
              <ArrowLeft className="w-3 h-3 mr-2" /> Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}