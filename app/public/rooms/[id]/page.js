'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Users, CheckCircle2, AlertCircle, ArrowLeft, Send, Activity, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_COLORS = {
  available:   'text-emerald-600 bg-emerald-50 border-emerald-200',
  full:        'text-rose-600 bg-rose-50 border-rose-200',
  maintenance: 'text-amber-600 bg-amber-50 border-amber-200',
};

export default function RoomDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ applicant_name: '', applicant_email: '', applicant_phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`/api/rooms/${id}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setRoom)
      .catch(() => setRoom(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.applicant_name || !form.applicant_email) {
      setResult({ type: 'error', message: 'IDENTITY DATA INCOMPLETE: NAME & EMAIL REQUIRED.' });
      return;
    }
    
    setSubmitting(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_id: id, ...form }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setResult({ type: 'success', message: "APPLICATION LOGGED: PLEASE MONITOR YOUR EMAIL FOR ADMIN APPROVAL." });
        setForm({ applicant_name: '', applicant_email: '', applicant_phone: '', message: '' });
      } else {
        setResult({ type: 'error', message: data.error || 'SYSTEM OVERLOAD: UPLOAD FAILED.' });
      }
    } catch {
      setResult({ type: 'error', message: 'CONNECTION INTERRUPTED: CHECK NETWORK.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center text-[#1E5EFF]">
        <Activity className="animate-spin mb-4" size={32} />
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Initializing Room Node...</p>
    </div>
  );

  if (!room) return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center text-rose-500">
        <AlertCircle size={40} className="mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Room Node Not Found</p>
        <button onClick={() => router.push('/')} className="mt-6 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Return</button>
    </div>
  );

  const amenitiesList = room.amenities ? room.amenities.split(/,|\n/).map(item => item.trim()).filter(Boolean) : [];
  const rulesList = room.house_rules ? room.house_rules.split(/,|\n/).map(item => item.trim()).filter(Boolean) : [];

  // LOGIC: Check if applicant can apply
  const isMaintenance = room.status === 'maintenance';
  const isFull = room.is_full; 
  const canApply = !isMaintenance && !isFull;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1F3B] font-sans">
      <div className="max-w-7xl mx-auto px-8 pt-12 pb-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* LEFT: Info */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[3rem] overflow-hidden h-[450px] bg-white border border-[#E5E7EB] shadow-2xl relative">
              {room.image_url
                ? <img src={room.image_url} alt={room.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-[#CBD5E1] text-9xl font-black">{room.name.charAt(0)}</div>
              }
              <div className="absolute top-8 right-8">
                <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border shadow-xl backdrop-blur-md ${isMaintenance ? STATUS_COLORS.maintenance : isFull ? STATUS_COLORS.full : STATUS_COLORS.available}`}>
                  {isMaintenance ? 'Maintenance' : isFull ? 'Room Full' : 'Available Now'}
                </span>
              </div>
            </motion.div>

            <div className="bg-white border border-[#E5E7EB] rounded-[2.5rem] p-10 shadow-sm">
                <h1 className="text-5xl font-black uppercase tracking-tighter text-[#0B1F3B] mb-4">{room.name}</h1>
                <div className="flex items-center gap-6 text-[#6B7280] text-[10px] font-black uppercase tracking-[0.2em] mb-10">
                    <span className="flex items-center gap-2 text-[#1E5EFF]"><MapPin size={14} />{room.location}</span>
                    <span className="flex items-center gap-2"><Users size={14} /> {room.slots_left} / {room.capacity} Slots Available</span>
                </div>

                <div className="pt-8 border-t border-[#F8FAFC] flex items-end justify-between">
                    <div>
                        <p className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-2">Monthly Fee</p>
                        <p className="text-5xl font-black text-[#0B1F3B]">₱{Number(room.monthly_rate).toLocaleString()}</p>
                    </div>
                    {/* <div className="text-right hidden sm:block">
                        <Activity className="text-[#1E5EFF] ml-auto mb-2" size={24} />
                        <p className="text-[9px] font-black text-[#CBD5E1] uppercase tracking-[0.3em]">Hardware ID: {id.toString().padStart(4, '0')}</p>
                    </div> */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-[#E5E7EB] rounded-[2.5rem] p-10">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#6B7280] mb-8 flex items-center gap-2">Amenities</h2>
                    <div className="flex flex-wrap gap-3">
                        {amenitiesList.length > 0 ? amenitiesList.map((a, i) => (
                            <span key={i} className="flex items-center gap-2 text-[10px] font-black uppercase text-[#0B1F3B] bg-[#F8FAFC] border border-[#E5E7EB] px-5 py-3 rounded-2xl"><CheckCircle2 size={12} className="text-emerald-500" /> {a}</span>
                        )) : <p className="text-[10px] font-bold text-gray-300 uppercase italic">No Amenities Listed</p>}
                    </div>
                </div>
                <div className="bg-white border border-[#E5E7EB] rounded-[2.5rem] p-10">
                    <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#6B7280] mb-8 flex items-center gap-2">House Rules</h2>
                    <ul className="space-y-4">
                        {rulesList.length > 0 ? rulesList.map((rule, i) => (
                            <li key={i} className="flex items-start gap-4 text-[11px] font-bold text-[#0B1F3B] uppercase tracking-wide">
                                <span className="w-6 h-6 rounded-lg bg-[#0B1F3B] text-white flex items-center justify-center text-[10px] font-black shrink-0">{i + 1}</span>
                                <span className="pt-1">{rule}</span>
                            </li>
                        )) : <p className="text-[10px] font-bold text-gray-300 uppercase italic">Standard Protocols Apply</p>}
                    </ul>
                </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-[#0B1F3B] rounded-[3rem] p-10 text-white shadow-2xl border border-white/5">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Application <span className="text-[#1E5EFF]">Form</span></h2>
              <p className="text-white/40 text-[10px] font-black tracking-[0.3em] mb-10">No authentication required</p>

              <AnimatePresence mode="wait">
                {result && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className={`flex items-start gap-4 p-5 rounded-2xl mb-8 text-[11px] font-black uppercase tracking-wider ${result.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                        {result.type === 'success' ? <CheckCircle2 size={18} className="shrink-0" /> : <AlertCircle size={18} className="shrink-0" />}
                        {result.message}
                    </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-2 ml-1">Full Name</label>
                    <input required type="text" value={form.applicant_name} onChange={e => setForm(f => ({ ...f, applicant_name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 text-white text-sm font-bold px-6 py-4 rounded-2xl focus:outline-none focus:border-[#1E5EFF] transition-all" placeholder="Sheila A. Lagpac" />
                </div>
                <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-2 ml-1">Email Address</label>
                    <input required type="email" value={form.applicant_email} onChange={e => setForm(f => ({ ...f, applicant_email: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 text-white text-sm font-bold px-6 py-4 rounded-2xl focus:outline-none focus:border-[#1E5EFF] transition-all" placeholder="sheila@gmail.com" />
                </div>
                <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-2 ml-1">Contact Number</label>
                    <input type="tel" value={form.applicant_phone} onChange={e => setForm(f => ({ ...f, applicant_phone: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 text-white text-sm font-bold px-6 py-4 rounded-2xl focus:outline-none focus:border-[#1E5EFF] transition-all" placeholder="09XX-XXX-XXXX" />
                </div>
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-2 ml-1">Optional Message</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4}
                    className="w-full bg-white/5 border border-white/10 text-white text-sm font-bold px-6 py-4 rounded-2xl focus:outline-none focus:border-[#1E5EFF] transition-all resize-none" placeholder="Briefly state your requirements..." />
                </div>

                <button
                  type="submit"
                  disabled={submitting || !canApply}
                  className="w-full bg-gradient-to-r from-[#22D3EE] to-[#1E5EFF] text-white text-[11px] font-black uppercase tracking-[0.1em] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-30 disabled:grayscale"
                >
                  {submitting ? <Activity className="animate-spin" size={18} /> : 
                   isMaintenance ? 'MAINTENANCE MODE' : 
                   isFull ? 'NODE OCCUPIED' : 
                   'Initialize'} 
                  {!submitting && canApply && <Send size={14} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}