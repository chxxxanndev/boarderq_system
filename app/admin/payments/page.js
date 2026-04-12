'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, X, CreditCard, Loader2, ClipboardList, 
  Search, ShieldAlert, History, ArrowUpRight, Activity
} from 'lucide-react';
import Button from '@/components/Button';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [paymentToFlag, setPaymentToFlag] = useState(null); // Custom modal state

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/admin/payments');
      if (!res.ok) return console.error("Server Error");
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    setMounted(true);
    fetchPayments(); 
  }, []);

  const handleVerify = async (id, status) => {
    const res = await fetch('/api/admin/payments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setPaymentToFlag(null);
      fetchPayments();
    }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] font-sans text-[#1E5EFF]">
      <Loader2 className="animate-spin mr-2" /> SYNCHRONIZING REVENUE LEDGER...
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
              REVENUE <span className="text-[#1E5EFF]">AUDIT</span>
            </h1>
            <p className="text-[#6B7280] text-[10px] font-black tracking-[0.3em] uppercase mt-2">Financial Verification Module</p>
          </div>
          <div className="bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
            <Activity className="w-4 h-4 text-[#14B8A6]" />
            <span className="text-[#0B1F3B] text-[10px] font-black uppercase tracking-widest">Gateway Online</span>
          </div>
        </div>

        {/* Audit Queue Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm relative overflow-hidden">
          {/* Brand Accent Bar */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#22D3EE] to-[#1E5EFF]"></div>
          
          <div className="flex justify-between items-center mb-8 border-b border-[#E5E7EB] pb-5">
            <h2 className="text-sm font-black text-[#0B1F3B] uppercase tracking-widest flex items-center gap-3">
              <CreditCard className="text-[#1E5EFF] w-5 h-5" /> Pending Verification Queue
            </h2>
            <div className="bg-[#F8FAFC] px-4 py-1.5 rounded-lg border border-[#E5E7EB] text-[11px] font-black text-[#1E5EFF] tracking-wider">
              {payments.length.toString().padStart(2, '0')} RECORDS FOUND
            </div>
          </div>

          <div className="space-y-4">
            {payments.length > 0 ? (
              payments.map((pay) => (
                <div key={pay.id} className="group bg-[#F8FAFC] hover:bg-white border border-transparent hover:border-[#1E5EFF] p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-8 mb-4 md:mb-0">
                    {/* Amount Block with Brand Gradient */}
                    <div className="w-20 h-20 bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                      <span className="text-[10px] font-black text-white/70 uppercase">PHP</span>
                      <span className="text-xl font-black text-white leading-none mt-1">{Math.floor(pay.amount).toLocaleString()}</span>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-[#0B1F3B] group-hover:text-[#1E5EFF] transition-colors">{pay.tenant_name}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                        <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">{pay.room_name}</p>
                        <span className="text-[#E5E7EB]">|</span>
                        <p className="text-[10px] font-black text-[#0B1F3B] bg-white px-2 py-0.5 rounded border border-[#E5E7EB]">REF: {pay.reference_number}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleVerify(pay.id, 'confirmed')}
                      className="bg-[#14B8A6] hover:bg-[#0F9D8B] text-white px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-teal-500/10 active:scale-95"
                    >
                      <Check size={16} /> Verify
                    </button>
                    <button 
                      onClick={() => setPaymentToFlag(pay)}
                      className="p-4 text-[#6B7280] hover:text-rose-500 bg-white border border-[#E5E7EB] hover:border-rose-500/50 rounded-xl transition-all shadow-sm"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-24 text-center border-2 border-dashed border-[#E5E7EB] rounded-3xl bg-[#F8FAFC]">
                <ClipboardList className="mx-auto mb-4 text-[#E5E7EB]" size={48} />
                <p className="text-[#6B7280] font-black text-[11px] uppercase tracking-widest">The audit queue is currently empty</p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-20 py-10 text-[#6B7280] text-[9px] tracking-[0.4em] font-bold uppercase border-t border-[#E5E7EB] w-full text-center">
          Boarder-Q <span className="mx-2 text-[#22D3EE]">/</span> Fiscal Management <span className="mx-2 text-[#22D3EE]">/</span> Ledger v2.0
        </footer>
      </main>

      {/* --- CUSTOM PORTAL CONFIRMATION MODAL --- */}
      {mounted && createPortal(
        <AnimatePresence>
          {paymentToFlag && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setPaymentToFlag(null)}
                className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md cursor-pointer" 
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="relative bg-white rounded-[2.5rem] w-full max-w-sm shadow-2xl border border-[#E5E7EB] p-10 text-center overflow-hidden"
              >
                {/* Visual Danger Header */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-rose-500"></div>

                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldAlert size={36} />
                </div>
                
                <h2 className="text-2xl font-black text-[#0B1F3B] uppercase tracking-tight mb-2">Flag Payment?</h2>
                <p className="text-xs text-[#6B7280] font-bold uppercase tracking-widest leading-relaxed mb-10">
                  You are marking the PHP <span className="text-rose-500">{Math.floor(paymentToFlag.amount).toLocaleString()}</span> payment from <span className="text-[#0B1F3B]">{paymentToFlag.tenant_name}</span> as suspicious.
                </p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setPaymentToFlag(null)}
                    className="flex-1 py-4 bg-[#F8FAFC] text-[#6B7280] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#E5E7EB]"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => handleVerify(paymentToFlag.id, 'flagged')}
                    className="flex-1 py-4 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 shadow-lg shadow-rose-500/20"
                  >
                    Confirm Flag
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}