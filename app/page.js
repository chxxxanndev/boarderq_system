'use client';

import Link from 'next/link';
import Button from '@/components/Button'; 
import { Home, User, ShieldCheck, LayoutDashboard, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    // BACKGROUND: Dark Industrial Gradient
    <div className="min-h-screen flex flex-col items-center pt-20 pb-10 transition-colors duration-300 bg-gradient-to-b from-black via-[#1a1a1a] to-[#7a7a7a] text-white font-sans">
      
      {/* Top Badge: Industrial Bold Style */}
      <div className="mb-10">
        <span className="text-white text-[11px] tracking-[0.4em] uppercase font-black opacity-80">
          PLATFORM-BASED TECHNOLOGY PROJECT
        </span>
      </div>

      <header className="text-center mb-4 px-4">
        {/* Split Header matching "DASHBOARD" style */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
          <span className="text-white">BOARDER-</span>
          <span className="text-[#00A3CC]">Q</span>
        </h1>
        
        <div className="mt-8 flex items-center justify-center gap-4">
           <div className="h-[2px] w-12 bg-[#00A3CC]"></div>
           <p className="text-white/80 text-sm md:text-base font-bold tracking-[0.2em] uppercase">
             SYSTEM OVERVIEW
           </p>
           <div className="h-[2px] w-12 bg-[#00A3CC]"></div>
        </div>
      </header>

      {/* Action Cards Styled like the grey Stat Blocks in the image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-16 px-6">
        
        {/* Find a Room (Public Access) */}
        <div className="bg-[#A6A6A6] p-8 flex flex-col justify-between h-[320px] shadow-2xl relative group">
          <div className="flex justify-between items-start">
            <h2 className="text-4xl font-black text-black leading-[0.9] uppercase w-2/3 tracking-tighter">
              FIND A<br/>ROOM
            </h2>
            <div className="text-right">
               <Home className="w-12 h-12 text-white mb-2" />
               <p className="text-[10px] font-black text-white tracking-widest uppercase">PUBLIC ACCESS</p>
            </div>
          </div>
          
          <p className="text-black font-bold text-xs uppercase tracking-tight leading-tight mb-6 max-w-[240px]">
            Browse available boarding units, check amenities, and submit your application in seconds.
          </p>
          
          <button 
            onClick={() => window.location.href='/rooms'}
            className="bg-[#2E2E2E] hover:bg-black text-white text-[12px] font-black px-8 py-4 rounded-full transition-all tracking-[0.2em] uppercase flex items-center justify-center gap-2"
          >
            BROWSE ROOMS <ArrowRight size={16} />
          </button>
        </div>

        {/* Management (Administrator) */}
        <div className="bg-[#8C8C8C] p-8 flex flex-col justify-between h-[320px] shadow-2xl relative group">
          <div className="flex justify-between items-start">
            <h2 className="text-4xl font-black text-black leading-[0.9] uppercase w-2/3 tracking-tighter">
              MANAGE<br/>SYSTEM
            </h2>
            <div className="text-right">
               <ShieldCheck className="w-12 h-12 text-white mb-2" />
               <p className="text-[10px] font-black text-white tracking-widest uppercase">ADMINISTRATOR</p>
            </div>
          </div>
          
          <p className="text-black font-bold text-xs uppercase tracking-tight leading-tight mb-6 max-w-[240px]">
             Access the landlord dashboard to manage tenants, track monthly payments, and oversee maintenance.
          </p>
          
          <button 
            onClick={() => window.location.href='/login'}
            className="bg-[#2E2E2E] hover:bg-black text-white text-[12px] font-black px-8 py-4 rounded-full transition-all tracking-[0.2em] uppercase flex items-center justify-center gap-2"
          >
            ENTER DASHBOARD <LayoutDashboard size={16} />
          </button>
        </div>

      </div>

      {/* Details Section mimicking the Application rows */}
      <div className="w-full max-w-5xl mt-24 px-6">
        <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-3">
           <h3 className="text-lg font-black text-white tracking-[0.3em] uppercase">SYSTEM FEATURES</h3>
           <span className="text-[10px] font-black text-[#00A3CC] tracking-widest">V 2.0.4</span>
        </div>

        <div className="space-y-3">
          {[
            { title: "REAL-TIME SEARCH", detail: "INSTANT ACCESS TO ROOM AVAILABILITY", status: "ONLINE" },
            { title: "DIGITAL APPLICATION", detail: "SKIP PAPERWORK. SUBMIT VIA MOBILE", status: "ACTIVE" },
            { title: "ADMIN CONTROL", detail: "COMPREHENSIVE TOOLS FOR LANDLORDS", status: "SECURE" }
          ].map((item, i) => (
            <div key={i} className="bg-[#666666] hover:bg-[#555555] p-5 flex items-center justify-between shadow-lg transition-colors group cursor-default">
               <span className="text-xl font-black text-black tracking-tight w-1/3">{item.title}</span>
               <span className="text-[11px] font-bold text-white/80 tracking-widest hidden md:block">{item.detail}</span>
               <span className="text-[11px] font-black text-white bg-black/20 px-3 py-1 rounded">{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer matching the terminal vibe */}
      <footer className="mt-24 py-12 text-white/30 text-[9px] tracking-[0.6em] font-mono uppercase border-t border-white/10 w-full text-center">
        CONSOLE <span className="mx-2 text-[#00A3CC]">/</span> SECURE <span className="mx-2 text-[#00A3CC]">/</span> BOARDER-Q DEVELOPMENT 2026
      </footer>
    </div>
  );
}