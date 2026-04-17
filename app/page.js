'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowRight, Activity, Zap, CheckCircle2, MapPin,
  Users, Megaphone, Clock, BedDouble, TrendingUp, Wrench,
  Globe, Mail, Phone, ExternalLink, ShieldCheck // Replaced Facebook with Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const STATUS_COLORS = {
  available:   'text-emerald-600 bg-emerald-50 border-emerald-200',
  occupied:    'text-rose-600 bg-rose-50 border-rose-200',
  maintenance: 'text-amber-600 bg-amber-50 border-amber-200',
};

export default function LandingPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/public/rooms').then(r => r.json()).catch(() => []),
      fetch('/api/public/announcements').then(r => r.json()).catch(() => []),
    ]).then(([r, a]) => {
      setRooms(Array.isArray(r) ? r : []);
      setAnnouncements(Array.isArray(a) ? a.slice(0, 3) : []);
    }).finally(() => setLoading(false));
  }, []);

  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
  };

  const featuredRooms = rooms.filter(r => r.status === 'available').slice(0, 3);

  const formatDate = (d) => new Date(d).toLocaleDateString('en-PH', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1F3B] font-sans overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-24 space-y-20">

        {/* ── HERO ── */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-25px font-black tracking-tighter uppercase leading-none">
              BOARDER<span className="text-[#1E5EFF] italic">Q</span>
            </h1>
            <div className="mt-6 flex items-center justify-center gap-6">
              <div className="h-[2px] w-12 bg-[#22D3EE] rounded-full" />
              <p className="text-[#6B7280] text-xs md:text-sm font-black tracking-[0.3em] uppercase">
                Next-Gen Housing Ecosystem
              </p>
              <div className="h-[2px] w-12 bg-[#22D3EE] rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* ── LIVE STATS STRIP ── */}
        <section>
          <div className="flex items-center justify-between mb-5 border-b border-[#E5E7EB] pb-4">
            <h2 className="text-[11px] font-black text-[#0B1F3B] tracking-[0.4em] uppercase flex items-center gap-2">
              <Activity size={15} className="text-[#1E5EFF]" /> Live Property Status
            </h2>
            <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Live
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Units',    value: stats.total,       icon: BedDouble,   color: 'text-[#1E5EFF]',  bg: 'bg-[#1E5EFF]/5'  },
              { label: 'Available',      value: stats.available,   icon: CheckCircle2,color: 'text-emerald-600', bg: 'bg-emerald-50'   },
              { label: 'Occupied',       value: stats.occupied,    icon: Users,       color: 'text-rose-500',    bg: 'bg-rose-50'      },
              { label: 'In Maintenance', value: stats.maintenance, icon: Wrench,      color: 'text-amber-500',   bg: 'bg-amber-50'     },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 flex flex-col gap-4 shadow-sm"
              >
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center ${s.color}`}>
                  <s.icon size={20} />
                </div>
                <div>
                  <p className="text-3xl font-black text-[#0B1F3B]">
                    {loading ? '—' : s.value}
                  </p>
                  <p className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── AVAILABLE ROOMS PREVIEW + ANNOUNCEMENTS ── */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-5 border-b border-[#E5E7EB] pb-4">
              <h2 className="text-[11px] font-black text-[#0B1F3B] tracking-[0.4em] uppercase flex items-center gap-2">
                <BedDouble size={15} className="text-[#1E5EFF]" /> Available Rooms
              </h2>
              <button onClick={() => router.push('/public/rooms')} className="text-[10px] font-black text-[#1E5EFF] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight size={12} />
              </button>
            </div>
            {loading ? (
                <div className="space-y-3">
                    {[1,2,3].map(i => <div key={i} className="h-24 bg-white border border-[#E5E7EB] rounded-2xl animate-pulse" />)}
                </div>
            ) : featuredRooms.map((room, i) => (
                <motion.div key={room.id} transition={{ delay: i * 0.08 }} onClick={() => router.push(`/public/rooms/${room.id}`)} className="bg-white border border-[#E5E7EB] hover:border-[#1E5EFF] rounded-2xl p-5 mb-3 flex items-center gap-5 cursor-pointer group transition-all shadow-sm">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F8FAFC] border border-[#E5E7EB] flex-shrink-0">
                      {room.image_url ? <img src={room.image_url} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /> : <div className="w-full h-full flex items-center justify-center text-[#CBD5E1] text-2xl font-black">{room.name.charAt(0)}</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black uppercase tracking-tight text-[#0B1F3B] group-hover:text-[#1E5EFF] transition-colors truncate">{room.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-[#6B7280] uppercase">
                        {room.location && <span className="flex items-center gap-1"><MapPin size={10} />{room.location}</span>}
                        {room.capacity && <span className="flex items-center gap-1"><Users size={10} />{room.capacity}</span>}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-base font-black text-[#0B1F3B]">₱{Number(room.monthly_rate).toLocaleString()}</p>
                      <span className={`mt-1 inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${STATUS_COLORS[room.status]}`}>{room.status}</span>
                    </div>
                </motion.div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5 border-b border-[#E5E7EB] pb-4">
              <h2 className="text-[11px] font-black text-[#0B1F3B] tracking-[0.4em] uppercase flex items-center gap-2">
                <Megaphone size={15} className="text-[#1E5EFF]" /> Announcements
              </h2>
              <button onClick={() => router.push('/public/rooms')} className="text-[10px] font-black text-[#1E5EFF] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                View All <ArrowRight size={12} />
              </button>
            </div>
            {announcements.map((a, i) => (
                <motion.div key={a.id} onClick={() => router.push('/public/announcements')} className="bg-white border border-[#E5E7EB] hover:border-[#1E5EFF] rounded-2xl p-5 mb-3 cursor-pointer group transition-all shadow-sm">
                    <p className="text-[11px] font-black uppercase tracking-tight text-[#0B1F3B] group-hover:text-[#1E5EFF] mb-2 line-clamp-2">{a.title}</p>
                    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-[#9CA3AF]">
                        <span>{formatDate(a.created_at)}</span>
                        <span className="text-[#1E5EFF]">{a.author}</span>
                    </div>
                </motion.div>
            ))}
          </div>
        </section>

        {/* ── SYSTEM CAPABILITIES ── */}
        <section>
          <div className="flex justify-between items-center mb-6 border-b border-[#E5E7EB] pb-4">
            <h2 className="text-[11px] font-black text-[#0B1F3B] tracking-[0.4em] uppercase flex items-center gap-2">
              <Activity size={15} className="text-[#1E5EFF]" /> Core Capabilities
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Real-Time Sync",  icon: Zap,          detail: "INSTANT INVENTORY UPDATES"    },
              { title: "Cloud Ledger",    icon: TrendingUp,   detail: "AUTOMATED REVENUE TRACKING"   },
              { title: "Smart Support",   icon: Wrench,       detail: "INTEGRATED MAINTENANCE ENGINE" },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] hover:border-[#1E5EFF] p-6 rounded-2xl flex items-center justify-between shadow-sm transition-all group cursor-default">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl flex items-center justify-center text-[#1E5EFF] group-hover:bg-[#1E5EFF] group-hover:text-white transition-all">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <span className="block text-sm font-black text-[#0B1F3B] tracking-tight group-hover:text-[#1E5EFF] transition-colors">{item.title}</span>
                    <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-widest">{item.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── INFORMATIVE FOOTER ── */}
      <footer className="bg-white border-t border-[#E5E7EB] pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6 md:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

            <div className="space-y-4">
              <h3 className="text-2xl font-black tracking-tighter uppercase leading-none text-[#0B1F3B]">
                BOARDER<span className="text-[#1E5EFF] italic">Q</span>
              </h3>
              <p className="text-[11px] text-[#6B7280] font-bold leading-relaxed tracking-wider">
                Redefining the boarding house experience through automated logistics and real-time inventory synchronization.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-9 h-9 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#1E5EFF] hover:border-[#1E5EFF] transition-all">
                  <Globe size={18} />
                </a>
                <a href="#" className="w-9 h-9 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#1E5EFF] hover:border-[#1E5EFF] transition-all">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-[#0B1F3B] uppercase tracking-[0.4em] mb-6">Ecosystem</h4>
              <ul className="space-y-3">
                {['Overview', 'Browse Rooms', 'About Project', 'Announcements'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[11px] font-bold text-[#6B7280] hover:text-[#1E5EFF] uppercase tracking-widest transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-[#E5E7EB] group-hover:bg-[#1E5EFF] transition-colors" /> 
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-[#0B1F3B] uppercase tracking-[0.4em] mb-6">Landlord Connect</h4>
              <div className="space-y-4">
                <a href="https://www.facebook.com/che.ann.abal.2024" target="_blank" className="flex items-start gap-3 group">
                  <Globe className="text-[#1E5EFF] mt-1" size={18} />
                  <div>
                    <p className="text-[11px] font-black text-[#0B1F3B] uppercase tracking-tight group-hover:text-[#1E5EFF] transition-colors">
                      Official Facebook
                    </p>
                    <p className="text-[10px] text-[#6B7280] font-bold uppercase mt-1 flex items-center gap-1">
                      Visit Page <ExternalLink size={10} />
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <Mail className="text-[#1E5EFF] mt-1" size={18} />
                  <div>
                    <p className="text-[11px] font-black text-[#0B1F3B] uppercase tracking-tight">
                      Support Email
                    </p>
                    <p className="text-[10px] text-[#6B7280] font-bold mt-1">
                      boarderqadmin123@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-[#0B1F3B] uppercase tracking-[0.4em] mb-6">Property Hub</h4>
              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#1E5EFF] flex-shrink-0" />
                  <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wide leading-relaxed">
                    Dapitan City, <br /> Zamboanga Del Norte, 7101<br /> Philippines
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-6 flex flex-col md:flex-row justify-center items-center gap-4">
            <span className="text-[9px] font-black text-[#6B7280] uppercase tracking-[0.4em] text-center">
              BOARDER-Q © 2026
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
}