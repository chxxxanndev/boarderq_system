'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Home, ShieldCheck, LayoutDashboard, ArrowRight, 
  Activity, Search, Zap, CheckCircle2 
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/Button';

export default function LandingPage() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const handleDashboardRedirect = () => {
    if (role === 'admin') {
      router.push('/admin/dashboard');
    } else if (role === 'tenant') {
      router.push('/tenant/dashboard');
    } else {
      router.push('/public/login');
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1F3B] font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <main className="max-w-7xl mx-auto px-8 pt-20 pb-20">
        
        {/* Top Tech Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-[#1E5EFF]/5 border border-[#1E5EFF]/10 px-6 py-2 rounded-full shadow-sm">
            <span className="text-[#1E5EFF] text-[10px] tracking-[0.4em] uppercase font-black">
              Property Management Suite v2.1
            </span>
          </div>
        </motion.div>

        {/* Brand Title */}
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none"
          >
            BOARDER<span className="text-[#1E5EFF] italic">Q</span>
          </motion.h1>
          
          <div className="mt-8 flex items-center justify-center gap-6">
             <div className="h-[2px] w-12 bg-[#22D3EE] rounded-full"></div>
             <p className="text-[#6B7280] text-sm md:text-base font-black tracking-[0.3em] uppercase">
               Next-Gen Housing Ecosystem
             </p>
             <div className="h-[2px] w-12 bg-[#22D3EE] rounded-full"></div>
          </div>
        </header>

        {/* 2. DUAL INTERFACE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-10">
          
          {/* Card 1: PUBLIC / TENANT SIDE */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white border border-[#E5E7EB] p-10 rounded-[2.5rem] flex flex-col justify-between h-[400px] shadow-xl shadow-blue-500/5 relative group transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] text-[#1E5EFF]">
                 <Home size={40} />
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black text-[#6B7280] tracking-widest uppercase">Sector: Public</p>
                 <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded uppercase">Active Access</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-4xl font-black text-[#0B1F3B] leading-[0.9] uppercase tracking-tight mb-4">
                FIND YOUR<br/><span className="text-[#1E5EFF]">RESIDENCE</span>
              </h2>
              <p className="text-[#6B7280] font-bold text-xs uppercase tracking-tight leading-relaxed max-w-[280px]">
                Browse high-quality boarding units, verify amenities, and submit applications instantly via our cloud portal.
              </p>
            </div>
            
            <button 
              onClick={() => router.push('/public/rooms')}
              className="mt-8 bg-[#0B1F3B] hover:bg-[#1E5EFF] text-white text-[12px] font-black px-10 py-5 rounded-2xl transition-all tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-lg"
            >
              BROWSE INVENTORY <ArrowRight size={18} />
            </button>
          </motion.div>

          {/* Card 2: ADMIN / MANAGEMENT SIDE */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#0B1F3B] p-10 rounded-[2.5rem] flex flex-col justify-between h-[400px] shadow-2xl relative group overflow-hidden"
          >
            {/* Background Decorative Element */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#1E5EFF]/20 rounded-full blur-3xl opacity-50"></div>

            <div className="flex justify-between items-start z-10">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-[#22D3EE]">
                 <ShieldCheck size={40} />
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black text-white/40 tracking-widest uppercase italic">Secure Node</p>
                 <span className="text-[10px] font-bold text-[#22D3EE] bg-white/5 px-2 py-0.5 rounded uppercase">Admin Shell</span>
              </div>
            </div>

            <div className="mt-8 z-10">
              <h2 className="text-4xl font-black text-white leading-[0.9] uppercase tracking-tight mb-4">
                {role ? 'RESUME' : 'MANAGE'}<br/><span className="text-[#22D3EE]">SYSTEM</span>
              </h2>
              <p className="text-white/60 font-bold text-xs uppercase tracking-tight leading-relaxed max-w-[280px]">
                 {role 
                   ? `Current session: ${role.toUpperCase()}. Re-authorize to access your administrative dashboard and tools.`
                   : "Initialize the management core to oversee tenants, track financial cycles, and monitor maintenance tickets."
                 }
              </p>
            </div>
            
            <button 
              onClick={handleDashboardRedirect}
              className="mt-8 bg-gradient-to-r from-[#22D3EE] to-[#1E5EFF] text-white text-[12px] font-black px-10 py-5 rounded-2xl transition-all tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-95 z-10"
            >
              {role ? 'RETURN TO TERMINAL' : 'AUTHORIZE ADMIN'} <LayoutDashboard size={18} />
            </button>
          </motion.div>
        </div>

        {/* 3. SYSTEM CAPABILITIES */}
        <div className="mt-32 w-full">
          <div className="flex justify-between items-center mb-10 border-b border-[#E5E7EB] pb-6">
             <h3 className="text-sm font-black text-[#0B1F3B] tracking-[0.4em] uppercase flex items-center gap-3">
               <Activity size={18} className="text-[#1E5EFF]" /> Core Capabilities
             </h3>
             <span className="text-[10px] font-black text-[#1E5EFF] bg-[#1E5EFF]/5 px-4 py-1 rounded-full border border-[#1E5EFF]/10 uppercase tracking-widest">Build v2.0.4.88</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Real-Time Sync", icon: Zap, detail: "INSTANT INVENTORY UPDATES" },
              { title: "Cloud Ledger", icon: CheckCircle2, detail: "AUTOMATED REVENUE TRACKING" },
              { title: "Smart Support", icon: Activity, detail: "INTEGRATED MAINTENANCE ENGINE" }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] hover:border-[#1E5EFF] p-6 rounded-2xl flex items-center justify-between shadow-sm transition-all group cursor-default">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl flex items-center justify-center text-[#1E5EFF] group-hover:bg-[#1E5EFF] group-hover:text-white transition-all">
                       <item.icon size={20} />
                    </div>
                    <div>
                      <span className="block text-sm font-black text-[#0B1F3B] tracking-tight group-hover:text-[#1E5EFF] transition-colors">{item.title}</span>
                      <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-widest">{item.detail}</span>
                    </div>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
            ))}
            
          </div>
        </div>
      </main>

      {/* <section className="bg-[#1E5EFF] p-16 text-center text-white">
   <h2 className="text-4xl font-black mb-4">READY TO FIND YOUR NEW HOME?</h2>
   <p className="opacity-80 mb-8 max-w-xl mx-auto">Join hundreds of residents who enjoy a seamless boarding house experience with Boarder-Q.</p>
   <div className="flex justify-center gap-4">
      <Button variant="secondary" size="lg">Browse Rooms</Button>
      <Button variant="outline" size="lg" className="border-white text-white">Contact Support</Button>
   </div>
</section> */}

      {/* 4. FOOTER */}
      <footer className="py-16 text-[#6B7280] text-[10px] tracking-[0.4em] font-bold uppercase border-t border-[#E5E7EB] w-full text-center bg-white shadow-inner">
        BOARDER-Q <span className="mx-4 text-[#E5E7EB]">|</span> INFRASTRUCTURE CORE <span className="mx-4 text-[#E5E7EB]">|</span> © 2026 
      </footer>
    </div>
  );
}