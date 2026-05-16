'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, X, Mail, Phone, Info, MessageSquare, 
  ShieldCheck, Activity, Cpu, ChevronRight, Ticket 
} from 'lucide-react';
import { useHelp } from '@/context/HelpContext';

export default function HelpSupport() {
  const { isHelpOpen, toggleHelp } = useHelp();
  const [activeTab, setActiveTab] = useState('about');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const tabs = [
    { id: 'about', label: 'ABOUT', icon: Info },
    { id: 'faq', label: 'FAQ', icon: MessageSquare },
    { id: 'contact', label: 'CONTACT', icon: ShieldCheck },
  ];

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {!isHelpOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={toggleHelp}
            className="fixed bottom-8 right-8 w-16 h-16 bg-white text-[#1E5EFF] rounded-full shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center z-[200] group border border-[#E5E7EB]"
          >
            <div className="absolute inset-0 rounded-2xl bg-[#22D3EE]/5 animate-ping group-hover:hidden"></div>
            <HelpCircle className="w-8 h-8 relative z-10 group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {createPortal(
        <AnimatePresence mode="wait">
          {isHelpOpen && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 pointer-events-none">
              
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                onClick={toggleHelp}
                className="absolute inset-0 bg-[#0B1F3B]/60 backdrop-blur-md cursor-pointer pointer-events-auto"
              />

              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[85vh] pointer-events-auto"
              >
                <div className="bg-[#F8FAFC] p-8 pb-6 flex justify-between items-center border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] rounded-2xl text-white shadow-lg shadow-blue-500/20">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-[#0B1F3B] uppercase leading-none">
                          System Support
                        </h2>
                        <p className="text-[10px] font-bold tracking-widest text-[#1E5EFF] mt-1 uppercase">
                          Customer Assistance Module
                        </p>
                    </div>
                  </div>
                  <button 
                    onClick={toggleHelp}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors text-[#6B7280]"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex border-b border-[#E5E7EB] bg-white">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-5 text-[11px] font-black tracking-widest transition-all flex items-center justify-center gap-2 border-b-2 ${
                        activeTab === tab.id 
                        ? 'text-[#1E5EFF] border-[#1E5EFF] bg-[#F8FAFC]' 
                        : 'text-[#6B7280] border-transparent hover:text-[#0B1F3B] hover:bg-[#F8FAFC]/50'
                      }`}
                    >
                      <tab.icon size={16} />
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-10 overflow-y-auto bg-white flex-1">
                  {activeTab === 'about' && (
                    <div className="space-y-6">
                      <div className="inline-block px-3 py-1 bg-[#22D3EE]/10 border border-[#22D3EE]/20 rounded-md">
                        <span className="text-[#22D3EE] font-black text-[9px] tracking-widest uppercase flex items-center gap-2">
                           <Cpu className="w-3 h-3" /> Core Infrastructure
                        </span>
                      </div>
                      <h3 className="text-3xl font-black text-[#0B1F3B] uppercase tracking-tight leading-none">
                        Boarder-Q <br/><span className="text-[#1E5EFF]">Property Suite</span>
                      </h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed font-bold uppercase tracking-tight">
                        A centralized management ecosystem optimized for property owners and residents.
                      </p>
                    </div>
                  )}

                  {activeTab === 'faq' && (
                    <div className="space-y-4">
                      {[
                        { q: "Adding Units?", a: "Go to Properties and register a new room." },
                        { q: "Tenant Verification?", a: "Check New Applications module." },
                        { q: "System Sync?", a: "Data updates in real-time." }
                      ].map((item, i) => (
                        <div key={i} className="p-5 border border-[#E5E7EB] bg-[#F8FAFC] rounded-2xl">
                          <p className="text-[11px] font-black uppercase text-[#1E5EFF] flex items-center gap-3">
                            <ChevronRight size={14} className="text-[#22D3EE]" /> {item.q}
                          </p>
                          <p className="text-xs text-[#0B1F3B] mt-2">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'contact' && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Mail /> support@boarderq.com
                      </div>
                      <div className="flex items-center gap-4">
                        <Phone /> +63 (900) 888 2025
                      </div>
                      <button className="w-full bg-gradient-to-r from-[#22D3EE] to-[#1E5EFF] text-white py-4 rounded-xl">
                        <Ticket size={16} /> Open Ticket
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-[#F8FAFC] border-t border-[#E5E7EB] text-center text-xs">
                  BOARDER-Q | V2.1.0
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}