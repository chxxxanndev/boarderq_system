'use client';
import React, { useState } from 'react';
import { Send, ShieldCheck, Loader2, QrCode, UploadCloud, FileCheck } from 'lucide-react';
import TenantFooter from '@/components/TenantFooter';

export default function TenantPayments() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [formData, setFormData] = useState({
    amount: '',
    method: 'gcash',
    reference_number: '',
    month_covered: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile && formData.method === 'gcash') {
        alert("Please upload a screenshot of your GCash receipt.");
        return;
    }

    setLoading(true);
    try {
      // 1. USE YOUR EXISTING API ROUTE TO UPLOAD
      const uploadData = new FormData();
      uploadData.append('file', selectedFile);

      const uploadRes = await fetch('/api/rooms/upload', {
        method: 'POST',
        body: uploadData,
      });
      
      const uploadResult = await uploadRes.json();
      
      if (!uploadRes.ok) throw new Error("Image upload failed");
      
      const imageUrl = uploadResult.url; // This is the Cloudinary URL

      // 2. SUBMIT PAYMENT DATA TO YOUR DATABASE API
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            ...formData,
            proof_url: imageUrl // Save the Cloudinary URL here
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setSelectedFile(null);
        setFormData({ amount: '', method: 'gcash', reference_number: '', month_covered: new Date().toISOString().split('T')[0], notes: '' });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      console.error("Payment Submission Error:", err);
      alert("Submission failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="flex-1 p-8 lg:p-12">
        <div className="mb-12">
            <h1 className="text-4xl font-black uppercase tracking-tight">Payment <span className="text-[#1E5EFF]">Portal</span></h1>
            <p className="text-[#6B7280] text-[10px] font-bold tracking-[0.3em] uppercase mt-2">Secure Node Deployment</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white border border-[#E5E7EB] rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#22D3EE] to-[#1E5EFF]"></div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Amount (PHP)</label>
                  <input required type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-5 rounded-2xl text-lg font-black focus:border-[#1E5EFF] outline-none" placeholder="0.00" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Method</label>
                  <select className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-5 rounded-2xl text-sm font-black uppercase outline-none"
                    value={formData.method} onChange={(e) => setFormData({...formData, method: e.target.value})}>
                    <option value="gcash">GCASH</option>
                    <option value="cash">CASH</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Ref Number</label>
                  <input required type="text" value={formData.reference_number} onChange={(e) => setFormData({...formData, reference_number: e.target.value})}
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-5 rounded-2xl text-sm font-mono font-black focus:border-[#1E5EFF] outline-none" placeholder="13-DIGIT ID" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Proof of Payment</label>
                  <label className="flex flex-col items-center justify-center w-full h-16 bg-[#F8FAFC] border-2 border-dashed border-[#E5E7EB] rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                    <div className="flex items-center gap-3">
                      {selectedFile ? <FileCheck className="text-emerald-500" size={20} /> : <UploadCloud className="text-[#1E5EFF]" size={20} />}
                      <span className="text-[10px] font-black uppercase text-[#6B7280]">
                        {selectedFile ? selectedFile.name : "Upload Screenshot"}
                      </span>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                  </label>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Billing Month</label>
                <input required type="date" value={formData.month_covered} onChange={(e) => setFormData({...formData, month_covered: e.target.value})}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-5 rounded-2xl text-sm font-black uppercase outline-none" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-[#22D3EE] to-[#1E5EFF] text-white py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" /> : <><ShieldCheck size={18} /> Authenticate Payment</>}
              </button>
            </form>
            {success && <p className="mt-4 text-emerald-500 text-[10px] font-black uppercase text-center animate-bounce">Payment submitted! Waiting for Admin verification.</p>}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             <div className="bg-[#0B1F3B] p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
                <QrCode className="mx-auto text-[#22D3EE] mb-6" size={40} />
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/50 mb-8">Scan to Pay</h3>
                <div className="w-48 h-48 bg-white mx-auto rounded-3xl p-4 mb-8 flex items-center justify-center">
                   <div className="w-full h-full bg-gray-100 rounded-2xl border-4 border-dashed border-gray-200 flex items-center justify-center">
                      <span className="text-[8px] font-black text-gray-300 uppercase italic">QR Placeholder</span>
                   </div>
                </div>
                <p className="text-[10px] font-black text-[#22D3EE] uppercase tracking-[0.2em]">GCash: WHELSTER R. E.</p>
             </div>
          </div>
        </div>

        <TenantFooter />
        
      </main>
    </div>
  );
}