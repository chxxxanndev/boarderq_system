'use client';
import React, { useEffect, useState } from 'react';
import { Check, X, CreditCard, Loader2, ClipboardList } from 'lucide-react';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchPayments = async () => {
  try {
    const res = await fetch('/api/admin/payments');
    
    // Check if the response is actually okay
    if (!res.ok) {
      const errorText = await res.text(); // Get the raw error (might be HTML or JSON)
      console.error("SERVER ERROR STATUS:", res.status);
      console.error("SERVER ERROR BODY:", errorText);
      return;
    }

    const data = await res.json();
    setPayments(data);
  } catch (err) {
    // This will now tell us if it's a network error or a JSON parsing error
    console.error("DETAILED FETCH ERROR:", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => { fetchPayments(); }, []);

  const handleVerify = async (id, status) => {
    const res = await fetch('/api/admin/payments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) fetchPayments(); // Refresh list after verifying
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Header */}
        <div className="flex items-baseline gap-4 mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
            <span className="text-white">REVENUE</span>
            <span className="text-[#00A3CC]"> AUDIT</span>
          </h1>
          <span className="text-white text-xs font-bold tracking-[0.3em] uppercase opacity-80">LEDGER_MODULE</span>
        </div>

        {/* Payment List Section */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl">
          <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-3">
            <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">PENDING VERIFICATION</h2>
            <div className="text-[10px] font-black text-[#00A3CC] tracking-widest uppercase">{payments.length} RECORDS</div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="py-20 text-center font-mono text-[#00A3CC] animate-pulse">SYNCHRONIZING LEDGER...</div>
            ) : payments.length > 0 ? (
              payments.map((pay) => (
                <div key={pay.id} className="bg-[#6F7171] p-6 rounded-lg flex items-center justify-between shadow-xl group hover:bg-[#5a5c5c] transition-all">
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 bg-black flex flex-col items-center justify-center border border-[#00A3CC]/30">
                      <span className="text-[8px] font-bold text-[#00A3CC] uppercase">PHP</span>
                      <span className="text-xl font-black text-white">{Number(pay.amount).toLocaleString()}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight">{pay.tenant_name}</h3>
                      <p className="text-[10px] font-mono text-white/50 mt-1 uppercase tracking-widest">
                        {pay.room_name} | REF: {pay.reference_number}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleVerify(pay.id, 'confirmed')}
                      className="bg-[#00A3CC] hover:bg-white text-black px-6 py-3 font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
                    >
                      <Check size={14} /> VERIFY
                    </button>
                    <button 
                      onClick={() => handleVerify(pay.id, 'flagged')}
                      className="p-3 text-white/20 hover:text-red-500 transition-colors border border-white/5 hover:border-red-500/50"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-24 text-center border-2 border-dashed border-white/10 rounded-xl">
                <ClipboardList className="mx-auto mb-4 text-white/10" size={48} />
                <p className="text-white/30 font-mono text-[10px] uppercase tracking-[0.5em]">Ledger is balanced</p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-20 py-8 text-white/30 text-[8px] tracking-[0.5em] font-mono uppercase border-t border-white/5 w-full text-center">
          Audit <span className="mx-2 text-[#00A3CC]">/</span> Revenue <span className="mx-2 text-[#00A3CC]">/</span> Boarder-Q 
        </footer>
      </main>
    </div>
  );
}