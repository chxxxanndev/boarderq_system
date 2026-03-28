import Link from 'next/link';
import { Home, User, ShieldCheck, LayoutDashboard, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-20 pb-10 bg-slate-950 text-slate-200">
      
      {/* 1. TOP BADGE */}
      <div className="border border-cyan-500/30 px-6 py-1.5 mb-10 animate-pulse">
        <span className="text-cyan-400 text-[10px] tracking-[0.4em] uppercase font-bold">
          Platform-Based Technology Project
        </span>
      </div>

      {/* 2. MAIN LOGO & DESCRIPTION */}
      <header className="text-center mb-4 px-4">
        <h1 className="text-6xl md:text-9xl font-black text-cyan-400 tracking-tighter glow-text uppercase italic leading-none">
          BOARDERQUEUE
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base mt-6 font-light tracking-widest uppercase leading-relaxed">
          A streamlined boarding house management system designed for seamless tenant applications and efficient property oversight.
        </p>
        
        {/* Tech Stack Subtitle */}
        <p className="text-slate-500 text-[10px] font-mono tracking-widest mt-6">
          NEXT.JS • EXPO • MYSQL <span className="mx-2 text-slate-800">|</span> COLLEGE OF COMPUTING STUDIES
        </p>
      </header>

      {/* 3. GLOWING DIVIDER LINE */}
      <div className="glow-line w-full max-w-4xl"></div>

      {/* 4. THE ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mt-12 px-6">
        
        {/* TENANT CARD (Primary focus for public users) */}
        <div className="glass-panel p-8 group hover:border-cyan-500/40 transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <Home className="w-24 h-24 text-cyan-400" />
          </div>
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
              <User className="text-cyan-400 w-8 h-8" />
            </div>
            <span className="text-[10px] text-cyan-500/60 font-mono uppercase tracking-[0.2em]">Public Access</span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight relative z-10">Find a Room</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 relative z-10">
            Browse available boarding units, check amenities, and submit your application in seconds.
          </p>
          
          <Link href="/rooms" className="relative z-10 flex items-center justify-center w-full py-4 bg-cyan-500 text-slate-950 font-black text-[12px] uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg shadow-cyan-500/10">
            Browse Available Rooms <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        {/* LANDLORD CARD */}
        <div className="glass-panel p-8 group hover:border-purple-500/40 transition-all duration-500 border-slate-800/50">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
              <ShieldCheck className="text-purple-400 w-8 h-8" />
            </div>
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Administrator</span>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Management</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Access the landlord dashboard to manage tenants, track payments, and update room availability.
          </p>
          
          <Link href="/login" className="flex items-center justify-center w-full py-4 border border-purple-500/30 text-purple-400 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-purple-500/10 transition-all">
            Enter Dashboard <LayoutDashboard className="ml-2 w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* 5. OVERVIEW SECTION */}
      <div className="w-full max-w-5xl mt-24 px-6 flex items-center gap-6">
        <div className="bg-cyan-900/20 border border-cyan-500/30 px-6 py-2 rounded-sm">
          <span className="text-cyan-400 font-black text-xs tracking-widest uppercase italic">Project Details</span>
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight">Overview</h3>
        <div className="flex-1 h-[1px] bg-slate-800"></div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 px-6 pb-20 text-slate-400">
        <div className="space-y-2">
            <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-tighter">01. Real-time Search</h4>
            <p className="text-xs leading-relaxed">Instant access to room availability and pricing details for students and workers.</p>
        </div>
        <div className="space-y-2">
            <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-tighter">02. Digital Application</h4>
            <p className="text-xs leading-relaxed">Skip the paperwork. Submit requirements and contact info through our mobile-friendly portal.</p>
        </div>
        <div className="space-y-2">
            <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-tighter">03. Admin Control</h4>
            <p className="text-xs leading-relaxed">Comprehensive tools for landlords to organize occupants and financial records efficiently.</p>
        </div>
      </div>

      <footer className="mt-auto py-10 text-slate-600 text-[10px] tracking-[0.3em] font-mono uppercase">
        &copy; 2026 BoarderQueue System • CCS Development Team
      </footer>
    </div>
  );
}