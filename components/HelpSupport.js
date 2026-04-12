'use client';
import React, { useState } from 'react';
import { HelpCircle, X, Mail, Phone, Info, MessageSquare, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export default function HelpSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'ABOUT', icon: Info },
    { id: 'faq', label: 'FAQ', icon: MessageSquare },
    { id: 'contact', label: 'CONTACT', icon: ShieldCheck },
  ];

  if (!isOpen) {
    return (
      /* UPDATED BUTTON: Now Dark Slate with Cyan accents to match Boarder-Q UI */
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-[#0B1120] text-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-cyan-500/40 hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 group border border-cyan-500/50"
      >
        {/* Subtle pulse effect behind the icon */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-pulse group-hover:hidden"></div>
        <HelpCircle className="w-7 h-7 group-hover:rotate-12 transition-transform relative z-10" />
      </button>
    );
  }

  return (
    /* Dark Overlay */
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/90 animate-in fade-in duration-300">
      
      {/* Modal: Matching the deep dark theme of your UI */}
      <div className="bg-[#0B1120] w-full max-w-lg border border-slate-800 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-slate-950 text-white p-6 flex justify-between items-center border-b border-cyan-500/30">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-cyan-500/5 border border-cyan-500/20">
                <Terminal className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
                <h2 className="text-xl font-black tracking-tighter uppercase leading-none italic">System Support</h2>
                <p className="text-[9px] font-mono tracking-[0.3em] text-cyan-500/60 mt-1 uppercase">Terminal Access v2.0</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-white hover:bg-rose-500/20 transition-all p-2 border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 text-[10px] font-black tracking-[0.2em] transition-all flex items-center justify-center gap-2 border-r border-slate-800 last:border-r-0 ${
                activeTab === tab.id 
                ? 'text-cyan-400 bg-slate-900/50 border-b-2 border-b-cyan-500' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto bg-[#0B1120]">
          {activeTab === 'about' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
              <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-cyan-400 font-black text-[9px] tracking-widest uppercase flex items-center gap-2">
                   <Cpu className="w-3 h-3" /> Core Protocol
                </span>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight">
                BOARDER-Q <br/>SECURE TERMINAL
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                The Boarder-Q interface is a proprietary management system. This module is encrypted and optimized for real-time room tracking and tenant lifecycle management.
              </p>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
              {[
                { q: "Adding Units?", a: "Access the Inventory Module and initialize 'New Unit Entry' from the management tile." },
                { q: "Tenant Sync?", a: "Tenant records sync every 60 seconds across all terminal instances." },
                { q: "Data Safety?", a: "All operational data is backed up to our secure cloud nodes hourly." }
              ].map((item, i) => (
                <div key={i} className="p-4 border border-slate-800 bg-slate-900/20 group hover:border-slate-700 transition-colors">
                    <p className="text-[10px] font-black uppercase text-cyan-400 tracking-tight flex items-center gap-2">
                        <span className="w-1 h-1 bg-cyan-500"></span> {item.q}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 leading-snug font-mono italic">{item.a}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.3em] mb-4">Direct Contact Protocols</p>
                
                <div className="group flex items-center justify-between p-4 border border-slate-800 hover:border-cyan-500/50 transition-all bg-slate-900/40">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-slate-950 text-slate-500 group-hover:text-cyan-400">
                            <Mail className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Admin Email</p>
                            <p className="text-sm font-mono font-bold text-slate-200">sys.ops@boarderq.com</p>
                        </div>
                    </div>
                </div>

                <div className="group flex items-center justify-between p-4 border border-slate-800 hover:border-cyan-500/50 transition-all bg-slate-900/40">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-slate-950 text-slate-500 group-hover:text-cyan-400">
                            <Phone className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">VOIP Protocol</p>
                            <p className="text-sm font-mono font-bold text-slate-200">+63 900 888 2026</p>
                        </div>
                    </div>
                </div>
              </div>
              
              <button className="w-full bg-cyan-600 text-white text-[10px] font-black uppercase tracking-[0.3em] py-5 hover:bg-cyan-500 transition-all shadow-lg active:translate-y-1">
                Initialize Support Ticket
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center px-8">
          <p className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.4em]">
            Console <span className="text-cyan-500/40 mx-1">/</span> Secure <span className="text-cyan-500/40 mx-1">/</span> Boarder-Q 
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}