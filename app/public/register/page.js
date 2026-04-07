'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import { User, Fingerprint, Zap } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const newTenant = {
      ...formData,
      role: 'tenant',
      status: 'approved'
    };

    const localData = localStorage.getItem('tenants');
    const existingTenants = localData ? JSON.parse(localData) : [];

    const emailExists = existingTenants.find(user => user.email.toLowerCase() === formData.email.toLowerCase());
    if (emailExists || formData.email === 'admin@boarderq.com') {
      alert('This email is already registered.');
      return;
    }

    existingTenants.push(newTenant);
    localStorage.setItem('tenants', JSON.stringify(existingTenants));

    alert('Account created successfully! Please log in.');
    router.push('/public/login');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center p-6 bg-slate-50">
      
      <div className="bg-white p-10 w-full max-w-lg border border-slate-200 shadow-2xl rounded-sm relative overflow-hidden">
        
        <Fingerprint className="absolute -right-6 -top-6 w-40 h-40 text-slate-50 -rotate-12 pointer-events-none" />

        <div className="text-center mb-10 relative z-10">
          <div className="inline-block px-4 py-1 mb-4 rounded-sm border bg-cyan-50 border-cyan-100">
            <span className="text-[9px] tracking-[0.4em] uppercase font-black italic text-cyan-700">
              Tenant Registration
            </span>
          </div>

          <h1 className="text-5xl font-black text-slate-900 italic tracking-tighter uppercase leading-none">
            Create Account
          </h1>

          <p className="text-slate-400 text-[10px] font-mono tracking-widest mt-3 uppercase">
            Initialize your tenant profile for terminal access
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5 relative z-10">
          <div className="space-y-4">
            <div>
              <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 block font-bold">
                Full Name
              </label>
              <input 
                type="text" 
                name="name"
                required 
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-4 bg-slate-50 border border-slate-200 font-mono text-xs uppercase focus:outline-none focus:border-cyan-600" 
              />
            </div>

            <div>
              <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 block font-bold">
                Email Address
              </label>
              <input 
                type="email" 
                name="email"
                required 
                value={formData.email}
                onChange={handleChange}
                placeholder="tenant@email.com"
                className="w-full px-4 py-4 bg-slate-50 border border-slate-200 font-mono text-xs uppercase focus:outline-none focus:border-cyan-600" 
              />
            </div>

            <div>
              <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-slate-500 block font-bold">
                Create Password
              </label>
              <input 
                type="password" 
                name="password"
                required 
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-4 bg-slate-50 border border-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-600" 
              />
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full py-5 text-[12px] mt-4 bg-cyan-600 hover:bg-cyan-700 text-white shadow-xl"
          >
            Register Account <Zap className="w-4 h-4 ml-2" />
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