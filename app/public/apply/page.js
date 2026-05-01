'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Users, CheckCircle2, AlertCircle, ArrowLeft, Send } from 'lucide-react';

const STATUS_COLORS = {
  available:   'text-emerald-600 bg-emerald-50 border-emerald-200',
  occupied:    'text-rose-600 bg-rose-50 border-rose-200',
  maintenance: 'text-amber-600 bg-amber-50 border-amber-200',
};

export default function RoomDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ applicant_name: '', applicant_email: '', applicant_phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { type: 'success' | 'error', message }

  useEffect(() => {
    fetch(`/api/public/rooms/${id}`)
      .then(r => r.json())
      .then(setRoom)
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async () => {
    if (!form.applicant_name || !form.applicant_email) {
      setResult({ type: 'error', message: 'Name and email are required.' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/public/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_id: id, ...form }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ type: 'success', message: "Application submitted! We'll reach out to your email soon." });
        setForm({ applicant_name: '', applicant_email: '', applicant_phone: '', message: '' });
      } else {
        setResult({ type: 'error', message: data.error || 'Something went wrong.' });
      }
    } catch {
      setResult({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-[#6B7280] font-bold uppercase text-xs tracking-widest">Loading...</div>;
  if (!room) return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-rose-500 font-bold uppercase text-xs">Room not found.</div>;

  const amenitiesList = room.amenities ? room.amenities.split(',').map(a => a.trim()).filter(Boolean) : [];
  const rulesList = room.house_rules ? room.house_rules.split('\n').map(r => r.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1F3B]">
      <div className="max-w-6xl mx-auto px-8 pt-12 pb-24">

        {/* Back */}
        <button onClick={() => router.back()} className="flex items-center gap-2 text-[#6B7280] hover:text-[#0B1F3B] text-[11px] font-black uppercase tracking-widest mb-10 transition-colors">
          <ArrowLeft size={16} /> Back to rooms
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* LEFT: Room Info */}
          <div className="lg:col-span-3 space-y-8">

            {/* Image */}
            <div className="rounded-[2rem] overflow-hidden h-72 bg-[#E5E7EB]">
              {room.image_url
                ? <img src={room.image_url} alt={room.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-[#CBD5E1] text-8xl font-black">{room?.name?.charAt(0) || 'R'}</div>
              }
            </div>

            {/* Title block */}
            <div className="bg-white border border-[#E5E7EB] rounded-[2rem] p-8">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl font-black uppercase tracking-tight">{room.name}</h1>
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${STATUS_COLORS[room.status]}`}>
                  {room.status}
                </span>
              </div>

              <div className="flex items-center gap-6 text-[#6B7280] text-[11px] font-bold uppercase tracking-wide mb-6">
                {room.location && <span className="flex items-center gap-1.5"><MapPin size={13} />{room.location}</span>}
                {room.capacity && <span className="flex items-center gap-1.5"><Users size={13} />{room.capacity}</span>}
              </div>

              <div className="border-t border-[#E5E7EB] pt-6">
                <p className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-1">Monthly Rate</p>
                <p className="text-4xl font-black text-[#1E5EFF]">₱{Number(room.monthly_rate).toLocaleString()}</p>
              </div>
            </div>

            {/* Amenities */}
            {amenitiesList.length > 0 && (
              <div className="bg-white border border-[#E5E7EB] rounded-[2rem] p-8">
                <h2 className="text-[11px] font-black uppercase tracking-widest text-[#6B7280] mb-5">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map((a, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-[11px] font-bold text-[#0B1F3B] bg-[#F8FAFC] border border-[#E5E7EB] px-4 py-2 rounded-full">
                      <CheckCircle2 size={12} className="text-emerald-500" /> {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* House Rules */}
            {rulesList.length > 0 && (
              <div className="bg-white border border-[#E5E7EB] rounded-[2rem] p-8">
                <h2 className="text-[11px] font-black uppercase tracking-widest text-[#6B7280] mb-5">House Rules</h2>
                <ul className="space-y-3">
                  {rulesList.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-[#0B1F3B]">
                      <span className="w-5 h-5 rounded-full bg-[#1E5EFF]/10 text-[#1E5EFF] flex items-center justify-center text-[10px] font-black mt-0.5 flex-shrink-0">{i + 1}</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT: Application Form */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-[#0B1F3B] rounded-[2rem] p-8 text-white">
              <h2 className="text-lg font-black uppercase tracking-tight mb-1">Apply for this room</h2>
              <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest mb-7">No account needed</p>

              {result && (
                <div className={`flex items-start gap-3 p-4 rounded-xl mb-6 text-[12px] font-bold ${result.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {result.type === 'success' ? <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" /> : <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />}
                  {result.message}
                </div>
              )}

              <div className="space-y-4">
                {[
                  { field: 'applicant_name', label: 'Full Name', type: 'text', required: true },
                  { field: 'applicant_email', label: 'Email Address', type: 'email', required: true },
                  { field: 'applicant_phone', label: 'Phone Number', type: 'tel', required: false },
                ].map(({ field, label, type, required }) => (
                  <div key={field}>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-1.5">{label}{required && ' *'}</label>
                    <input
                      type={type}
                      value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 text-white text-sm font-bold px-4 py-3 rounded-xl focus:outline-none focus:border-[#22D3EE] transition-colors placeholder:text-white/20"
                      placeholder={label}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-1.5">Message (optional)</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 text-white text-sm font-bold px-4 py-3 rounded-xl focus:outline-none focus:border-[#22D3EE] transition-colors placeholder:text-white/20 resize-none"
                    placeholder="Introduce yourself or ask a question..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={submitting || room.status !== 'available'}
                  className="w-full bg-gradient-to-r from-[#22D3EE] to-[#1E5EFF] text-white text-[12px] font-black uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : room.status !== 'available' ? 'Room Unavailable' : 'Submit Application'} 
                  {!submitting && room.status === 'available' && <Send size={16} />}
                </button>

                {room.status !== 'available' && (
                  <p className="text-[10px] font-bold text-white/30 text-center uppercase tracking-widest">
                    This room is currently {room.status}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}