'use client';
import React, { useState } from 'react';
import { CreditCard, Send, ShieldCheck, History, Loader2, Clock, Info } from 'lucide-react';
import Button from '@/components/Button'; // Assuming you'll use the button component we fixed

export default function TenantPayments() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // FORM STATE
  const [formData, setFormData] = useState({
    amount: '',
    method: 'gcash',
    reference_number: '',
    proof_url: '', 
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
        setFormData({ amount: '', method: 'gcash', reference_number: '', month_covered: new Date().toISOString().split('T')[0], notes: '' });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Submission error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Header - SaaS Style */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
              Payment <span className="text-[#1E5EFF]">Portal</span>
            </h1>
            <p className="text-[#6B7280] text-[10px] font-bold tracking-[0.3em] uppercase mt-2">Financial Transaction Management</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Submission Form Section */}
          <div className="xl:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col shadow-sm relative overflow-hidden">
            {/* Brand Accent Bar */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#22D3EE] to-[#1E5EFF]"></div>
            
            <div className="flex justify-between items-center mb-8 border-b border-[#E5E7EB] pb-5">
              <h2 className="text-sm font-black text-[#0B1F3B] uppercase tracking-widest">Submit Transaction Report</h2>
              <div className="p-2 bg-[#F8FAFC] rounded-lg">
                <Clock className="text-[#1E5EFF] w-4 h-4" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Amount (PHP)</label>
                  <input required type="number" 
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-xl text-sm focus:border-[#1E5EFF] focus:ring-1 focus:ring-[#1E5EFF] outline-none transition-all font-bold"
                    value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Payment Method</label>
                  <select 
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-xl text-sm outline-none text-[#0B1F3B] font-bold focus:border-[#1E5EFF]"
                    onChange={(e) => setFormData({...formData, method: e.target.value})}>
                    <option value="gcash">GCASH</option>
                    <option value="cash">CASH</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Reference Number</label>
                  <input required type="text" 
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-xl text-sm focus:border-[#1E5EFF] outline-none font-mono font-bold"
                    value={formData.reference_number} onChange={(e) => setFormData({...formData, reference_number: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Proof URL (Optional)</label>
                  <input type="text" placeholder="https://image-link.com" 
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-xl text-sm focus:border-[#1E5EFF] outline-none font-mono text-[11px]"
                    value={formData.proof_url} onChange={(e) => setFormData({...formData, proof_url: e.target.value})} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Billing Month Covered</label>
                <input required type="date" 
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-xl text-sm focus:border-[#1E5EFF] outline-none uppercase font-bold"
                  value={formData.month_covered} onChange={(e) => setFormData({...formData, month_covered: e.target.value})} />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Additional Notes</label>
                <textarea rows="3" placeholder="Add any details for the admin..." 
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-xl text-sm focus:border-[#1E5EFF] outline-none resize-none"
                  value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-[#22D3EE] to-[#1E5EFF] text-white py-5 rounded-xl font-black uppercase text-[11px] tracking-[0.3em] hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={16} /> Submit Transaction</>}
              </button>
            </form>

            {success && (
              <div className="mt-6 p-4 bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[#14B8A6] rounded-xl flex items-center gap-3 animate-pulse">
                <ShieldCheck size={20} /> 
                <span className="text-[10px] font-black tracking-widest uppercase">Transaction Logged. Admin review pending.</span>
              </div>
            )}
          </div>

          {/* Quick Info Sidebar */}
          <div className="space-y-6">
             <div className="bg-[#0B1F3B] p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <Info className="text-[#22D3EE] w-5 h-5" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-white">Guidelines</h3>
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed font-bold uppercase tracking-tight">
                    Please ensure the reference number matches your GCash/Bank receipt exactly. 
                    Verification typically takes <span className="text-[#22D3EE]">12-24 hours</span>.
                  </p>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#1E5EFF]/20 rounded-full blur-3xl"></div>
             </div>
             
             <div className="bg-white border border-[#E5E7EB] border-dashed p-12 text-center rounded-2xl">
                <History className="mx-auto mb-4 text-[#E5E7EB]" size={40} />
                <p className="text-[#6B7280] font-bold text-[10px] uppercase tracking-[0.2em]">History data is loading...</p>
             </div>
          </div>
        </div>

        <footer className="mt-20 py-8 text-[#6B7280] text-[9px] tracking-[0.3em] font-bold uppercase border-t border-[#E5E7EB] w-full text-center">
          Boarder-Q <span className="mx-2 text-[#1E5EFF]">|</span> Payment Systems <span className="mx-2 text-[#1E5EFF]">|</span> Secure Node
        </footer>
      </main>
    </div>
  );
}