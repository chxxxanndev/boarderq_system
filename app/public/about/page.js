'use client';

import { FileText, Target, Users, Code, ArrowRight, Shield, Zap, Database } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-20 pb-10 transition-colors duration-300 bg-slate-50">
      
      <div className="border border-cyan-500/20 px-6 py-1.5 mb-10 animate-pulse bg-cyan-500/10">
        <span className="text-cyan-700 text-[10px] tracking-[0.4em] uppercase font-bold">
          Technical Specifications & Project Scope
        </span>
      </div>

      <header className="text-center mb-12 px-4">
        <h1 className="text-5xl md:text-6xl font-black text-cyan-600 tracking-tighter uppercase italic leading-none transition-colors">
          THE BOARDER-Q PROJECT
        </h1>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-[1px] w-12 bg-cyan-500/30"></div>
          <p className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">
            A CCS Research Initiative © 2026
          </p>
          <div className="h-[1px] w-12 bg-cyan-500/30"></div>
        </div>
      </header>

      <div className="w-full max-w-5xl px-6 space-y-8">
        
        <div className="bg-white border border-slate-200 p-8 shadow-sm hover:border-cyan-500/40 transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
             <Database className="w-32 h-32 text-cyan-600" />
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-cyan-500/10 p-2 border border-cyan-500/20">
              <Zap className="text-cyan-600 w-5 h-5" />
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight italic uppercase">Executive Summary</h2>
          </div>
          
          <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light mb-8 max-w-3xl">
            Boarder-Q addresses the inefficiencies of traditional boarding house management. By integrating 
            <span className="text-cyan-600 font-bold"> real-time data synchronization </span> 
            with a user-centric interface, the platform eliminates manual record-keeping, 
            reduces payment disputes, and streamlines the tenant onboarding process. 
            Our system provides landlords with a powerful administrative dashboard while offering tenants 
            a modern, mobile-responsive portal for all their rental needs.
          </p>

          <div className="flex flex-wrap gap-3">
            {['Next.js 14', 'Node.js', 'Expo Mobile', 'MySQL Engine', 'Tailwind CSS'].map((tech) => (
              <span key={tech} className="bg-slate-50 border border-slate-200 px-3 py-1 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white border border-slate-200 p-8 shadow-sm hover:border-cyan-500/40 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-cyan-500/10 p-2 border border-cyan-500/20">
                <Target className="text-cyan-600 w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight italic uppercase">System Pillars</h2>
            </div>
            
            <ul className="space-y-6">
              {[
                { title: "Automated Onboarding", desc: "Digital application submission and instant room availability status." },
                { title: "Financial Ledger", desc: "Transparent tracking of monthly dues, deposits, and payment histories." },
                { title: "Maintenance Bridge", desc: "Direct ticket system for tenants to report facility issues to landlords." }
              ].map((item, i) => (
                <li key={i} className="group">
                  <span className="text-xs font-black text-slate-800 uppercase italic flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-cyan-500" /> {item.title}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed uppercase font-light tracking-tight">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-slate-200 p-8 shadow-sm hover:border-purple-500/40 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-500/10 p-2 border border-purple-500/20">
                <Users className="text-purple-600 w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight italic uppercase">Project Proponents</h2>
            </div>
            
            <div className="space-y-5">
              {[
                { name: "Abal, Che Ann P.", role: "Lead Systems Architect" },
                { name: "Lagpac, Sheila Mae A.", role: "Full-Stack Developer" },
                { name: "Orosca, Xhyndy Lynne A.", role: "UI/UX & Database Designer" }
              ].map((member, i) => (
                <div key={i} className="flex flex-col border-l-2 border-slate-100 pl-4 hover:border-purple-500 transition-colors">
                  <span className="text-sm font-black text-slate-800 tracking-tight uppercase italic">{member.name}</span>
                  <span className="text-[9px] text-slate-400 font-mono uppercase tracking-[0.2em]">{member.role}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-purple-400" />
                <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Verified Academic Project</span>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full text-center py-10">
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.5em] mb-4">The Future of Boarding Management</p>
          <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase italic">
            Efficiency through <span className="text-cyan-600">Technology</span>
          </h3>
        </div>
      </div>

      <footer className="mt-10 py-12 text-slate-400 text-[9px] tracking-[0.4em] font-mono uppercase border-t border-slate-200 w-full text-center">
        &copy; Boarder-Q System <span className="mx-2">•</span> College of Computing Studies <span className="mx-2">•</span> 2026
      </footer>
    </div>
  );
}