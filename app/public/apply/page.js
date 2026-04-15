'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room');
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    applicant_name: '',
    applicant_email: '',
    applicant_phone: '',
    message: '',
    room_id: ''
  });

  // Ensure room_id is set even if the component re-renders
  useEffect(() => {
    if (roomId) setFormData(prev => ({ ...prev, room_id: roomId }));
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Transmission Error. Please check your data.");
      }
    } catch (err) {
      console.error("Apply Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-sans">
        <div className="bg-[#1a1a1a] border-2 border-[#00A3CC] p-12 rounded-none text-center max-w-md w-full shadow-[0_0_50px_rgba(0,163,204,0.2)]">
          <div className="bg-[#00A3CC]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#00A3CC]">
            <CheckCircle2 className="text-[#00A3CC] w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">APPLICATION LOGGED</h2>
          <p className="text-white/60 font-mono text-xs tracking-widest mb-8 leading-relaxed">
            Your request has been uploaded to the Boarder-Q main node. Admin review in progress.
          </p>
          <Link href="/public/rooms" className="block w-full bg-white text-black py-4 font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#00A3CC] hover:text-white transition-all">
            Return to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-[#444] text-white font-sans pt-10">
      <main className="max-w-3xl mx-auto px-6 py-12">
        
        <Link href="/public/rooms" className="inline-flex items-center gap-2 text-[#00A3CC] text-[10px] font-black uppercase tracking-[0.3em] mb-8 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Back to Listings
        </Link>

        <div className="bg-black/40 border border-white/10 backdrop-blur-xl overflow-hidden relative">
          {/* Top Decorative Bar */}
          <div className="h-1 w-full bg-[#00A3CC]"></div>
          
          <div className="p-8 md:p-12">
            <header className="mb-10">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2">
                INITIATE <span className="text-[#00A3CC]">APPLICATION</span>
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono text-white/40 tracking-[0.4em] uppercase">SYSTEM PROTOCOL: {roomId ? `ROOM_REF_${roomId}` : 'GENERAL_QUERY'}</span>
              </div>
            </header>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#00A3CC] uppercase tracking-[0.2em]">Full Name</label>
                  <input required type="text" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-[#00A3CC] transition-all"
                    onChange={(e) => setFormData({...formData, applicant_name: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#00A3CC] uppercase tracking-[0.2em]">Email Address</label>
                  <input required type="email" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-[#00A3CC] transition-all"
                    onChange={(e) => setFormData({...formData, applicant_email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#00A3CC] uppercase tracking-[0.2em]">Phone Number</label>
                  <input required type="tel" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-[#00A3CC] transition-all"
                    onChange={(e) => setFormData({...formData, applicant_phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#00A3CC] uppercase tracking-[0.2em]">Current Occupation</label>
                  <input required type="text" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-[#00A3CC] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#00A3CC] uppercase tracking-[0.2em]">Statement of Intent / Message</label>
                <textarea rows="4" 
                  className="w-full bg-white/5 border border-white/10 p-4 text-sm focus:outline-none focus:border-[#00A3CC] transition-all"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#00A3CC] text-white py-5 font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white hover:text-black transition-all shadow-[0_10px_30px_rgba(0,163,204,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'EXECUTE APPLICATION SUBMISSION'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}