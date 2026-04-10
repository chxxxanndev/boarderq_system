'use client';
import React, { useState, useEffect } from 'react';
import { CreditCard, Send, ShieldCheck, History, Loader2, Clock } from 'lucide-react';

export default function TenantPayments() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // FORM STATE
  const [formData, setFormData] = useState({
    amount: '',
    method: 'gcash',
    reference_number: '',
    proof_url: '', // NEW
    month_covered: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        // Clear form after success
        setFormData({ amount: '', method: 'gcash', reference_number: '', month_covered: '', notes: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Submission error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Header matching your Industrial Style */}
        <div className="flex items-baseline gap-4 mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
            <span className="text-white">PAYMENT</span>
            <span className="text-[#00A3CC]"> PORTAL</span>
          </h1>
          <span className="text-white/40 text-[10px] font-mono tracking-[0.4em] uppercase">LEDGER_SYSTEM_V1</span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Submission Form Section */}
          <div className="xl:col-span-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00A3CC]"></div>
            
            <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-3">
              <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">REPORT TRANSACTION</h2>
              <Clock className="text-[#00A3CC] w-4 h-4" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#00A3CC] uppercase tracking-widest">Amount (PHP)</label>
                  <input required type="number" className="w-full bg-black/40 border border-white/10 p-4 text-sm focus:border-[#00A3CC] outline-none"
                    value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#00A3CC] uppercase tracking-widest">Method</label>
                  <select className="w-full bg-black/40 border border-white/10 p-4 text-sm outline-none text-white"
                    onChange={(e) => setFormData({...formData, method: e.target.value})}>
                    <option value="gcash">GCASH</option>
                    <option value="cash">CASH</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#00A3CC] uppercase tracking-widest">Reference Number</label>
                  <input required type="text" className="w-full bg-black/40 border border-white/10 p-4 text-sm focus:border-[#00A3CC] outline-none font-mono"
                    value={formData.reference_number} onChange={(e) => setFormData({...formData, reference_number: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#00A3CC] uppercase tracking-widest">Proof URL (Optional)</label>
                  <input type="text" placeholder="Link to screenshot" className="w-full bg-black/40 border border-white/10 p-4 text-sm focus:border-[#00A3CC] outline-none font-mono text-[10px]"
                    value={formData.proof_url} onChange={(e) => setFormData({...formData, proof_url: e.target.value})} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#00A3CC] uppercase tracking-widest">Billing Month</label>
                <input required type="date" className="w-full bg-black/40 border border-white/10 p-4 text-sm focus:border-[#00A3CC] outline-none uppercase"
                  value={formData.month_covered} onChange={(e) => setFormData({...formData, month_covered: e.target.value})} />
              </div>

              {/* NEW Row 4: Notes */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#00A3CC] uppercase tracking-widest">Additional Notes</label>
                <textarea rows="3" placeholder="e.g. Paid for both rent and water" 
                  className="w-full bg-black/40 border border-white/10 p-4 text-sm focus:border-[#00A3CC] outline-none"
                  value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-[#00A3CC] text-black py-5 font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-3 shadow-lg">
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={16} /> INITIALIZE TRANSMISSION</>}
              </button>
            </form>

            {success && (
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center gap-3 animate-pulse">
                <ShieldCheck /> <span className="text-[10px] font-black tracking-widest uppercase">LOGGED. AWAITING AUDIT.</span>
              </div>
            )}
          </div>

          {/* Quick Info Sidebar */}
          <div className="space-y-6">
             <div className="bg-black/40 backdrop-blur-xl p-8 border-l-4 border-[#00A3CC] shadow-2xl rounded-r-lg">
                <h3 className="text-lg font-black uppercase tracking-widest mb-6">Payment Info</h3>
                <p className="text-[11px] text-white/40 leading-relaxed font-mono uppercase">
                  Ensure the reference number matches your receipt exactly. Manual verification takes 12-24 hours.
                </p>
             </div>
             
             <div className="border-2 border-dashed border-white/5 p-12 text-center rounded-xl">
                <History className="mx-auto mb-4 text-white/10" size={32} />
                <p className="text-white/20 font-mono text-[9px] uppercase tracking-[0.4em]">Transaction History Locked</p>
             </div>
          </div>
        </div>

        <footer className="mt-20 py-8 text-white/30 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-white/5 w-full text-center">
          Console <span className="mx-2 text-[#00A3CC]">/</span> Payment Logic <span className="mx-2 text-[#00A3CC]">/</span> v1.0
        </footer>
      </main>
    </div>
  );
}