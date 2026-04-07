'use client';

import Link from 'next/link';
import Button from '@/components/Button'; 
import { Home, User, ShieldCheck, LayoutDashboard, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-20 pb-10 transition-colors duration-300 bg-slate-50">
      
      <div className="border border-cyan-500/20 px-6 py-1.5 mb-10 animate-pulse bg-cyan-500/10">
        <span className="text-cyan-700 text-[10px] tracking-[0.4em] uppercase font-bold">
          Platform-Based Technology Project
        </span>
      </div>

      <header className="text-center mb-4 px-4">
        <h1 className="text-6xl md:text-7xl font-black text-cyan-600 tracking-tighter glow-text-light uppercase italic leading-none transition-colors">
          BOARDER-Q
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 text-sm md:text-base mt-8 font-light tracking-widest uppercase leading-relaxed">
          A streamlined boarding house management system designed for seamless tenant applications and efficient property oversight.
        </p>
        
        <p className="text-slate-400 text-[10px] font-mono tracking-widest mt-6 uppercase">
          Next.js • MySQL <span className="mx-2 opacity-30">|</span> College of Computing Studies
        </p>
      </header>

      <div className="glow-line w-full max-w-4xl opacity-20 bg-cyan-500 h-[1px]"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mt-12 px-6">
        
        <div className="bg-white border border-slate-200 p-8 group hover:border-cyan-500/40 transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
             <Home className="w-32 h-32 text-cyan-600" />
          </div>
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="bg-cyan-500/10 p-3 border border-cyan-500/20">
              <User className="text-cyan-600 w-8 h-8" />
            </div>
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em]">Public Access</span>
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight italic uppercase relative z-10 transition-colors">Find a Room</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-10 relative z-10 font-light">
            Browse available boarding units, check amenities, and submit your application in seconds through our secured portal.
          </p>
          
          <Button variant="primary" size="lg" className="w-full relative z-10" onClick={() => window.location.href='/rooms'}>
            Browse Available Rooms <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="bg-white border border-slate-200 p-8 group hover:border-purple-500/40 transition-all duration-500 shadow-sm hover:shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-purple-500/10 p-3 border border-purple-500/20">
              <ShieldCheck className="text-purple-600 w-8 h-8" />
            </div>
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Administrator</span>
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight italic uppercase transition-colors">Management</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-10 font-light">
            Access the landlord dashboard to manage tenants, track monthly payments, and oversee maintenance tickets.
          </p>
          
          <Button variant="outline" size="lg" className="w-full" onClick={() => window.location.href='/login'}>
            Enter Dashboard <LayoutDashboard className="ml-2 w-4 h-4" />
          </Button>
        </div>

      </div>

      <div className="w-full max-w-5xl mt-24 px-6 flex items-center gap-6">
        <div className="bg-cyan-500/10 border border-cyan-500/30 px-6 py-2 rounded-sm">
          <span className="text-cyan-700 font-black text-xs tracking-widest uppercase italic">Project Details</span>
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic transition-colors">Overview</h3>
        <div className="flex-1 h-[1px] bg-slate-200"></div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 mt-10 px-6 pb-20">
        {[
          { title: "01. Real-time Search", desc: "Instant access to room availability and pricing details for students and workers." },
          { title: "02. Digital Application", desc: "Skip the paperwork. Submit requirements and contact info through our mobile-friendly portal." },
          { title: "03. Admin Control", desc: "Comprehensive tools for landlords to organize occupants and financial records efficiently." }
        ].map((item, i) => (
          <div key={i} className="space-y-3">
            <h4 className="text-cyan-700 font-black text-xs uppercase tracking-widest italic">{item.title}</h4>
            <p className="text-xs leading-relaxed text-slate-600 font-light italic uppercase tracking-tighter">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <footer className="mt-auto py-12 text-slate-400 text-[9px] tracking-[0.4em] font-mono uppercase border-t border-slate-200 w-full text-center">
        &copy; 2026 Boarder-Q System <span className="mx-2">•</span> Built with Next.js <span className="mx-2">•</span> CCS Dev Team
      </footer>
    </div>
  );
}