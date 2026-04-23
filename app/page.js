'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Activity, Zap, CheckCircle2, MapPin,
  Users, BedDouble, TrendingUp, Wrench,
  Globe, Mail, ExternalLink,
  Search, FileText, Key, ShieldCheck, Clock, Star, MessageCircle
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/rooms')
      .then(r => r.json())
      .then(data => {
        setRooms(Array.isArray(data) ? data : []);
      })
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.computed_status === 'available').length,
    occupied: rooms.filter(r => r.computed_status === 'full').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
  };

  const featuredRooms = rooms.filter(r => r.computed_status === 'available').slice(0, 4);

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

        {/* ── AVAILABLE ROOMS PREVIEW ── */}
        <section>
          <div className="flex items-center justify-between mb-5 border-b border-[#E5E7EB] pb-4">
            <h2 className="text-[11px] font-black text-[#0B1F3B] tracking-[0.4em] uppercase flex items-center gap-2">
              <BedDouble size={15} className="text-[#1E5EFF]" /> Featured Vacancies
            </h2>
            <Link href="/public/rooms" className="text-[10px] font-black text-[#1E5EFF] uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
              Browse All Units <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
                <>
                    <div className="h-24 bg-white border border-[#E5E7EB] rounded-2xl animate-pulse" />
                    <div className="h-24 bg-white border border-[#E5E7EB] rounded-2xl animate-pulse" />
                </>
            ) : featuredRooms.length > 0 ? featuredRooms.map((room, i) => (
                <motion.div 
                  key={room.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }} 
                  onClick={() => router.push(`/public/rooms/${room.id}`)} 
                  className="bg-white border border-[#E5E7EB] hover:border-[#1E5EFF] rounded-2xl p-5 flex items-center gap-5 cursor-pointer group transition-all shadow-sm"
                >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F8FAFC] border border-[#E5E7EB] flex-shrink-0">
                      {room.image_url ? (
                        <img src={room.image_url} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#CBD5E1] text-3xl font-black bg-gray-50">{room.name.charAt(0)}</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-black uppercase tracking-tight text-[#0B1F3B] group-hover:text-[#1E5EFF] transition-colors truncate">{room.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-[#6B7280] uppercase tracking-wide">
                        {room.location && <span className="flex items-center gap-1"><MapPin size={10} />{room.location}</span>}
                        <span className="flex items-center gap-1"><Users size={10} />CAPACITY: {room.capacity}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 pl-4 border-l border-gray-100">
                      <p className="text-lg font-black text-[#0B1F3B]">₱{Number(room.monthly_rate).toLocaleString()}</p>
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Monthly Rate</p>
                    </div>
                </motion.div>
            )) : (
              <div className="col-span-full py-20 text-center bg-white border border-dashed border-gray-200 rounded-3xl">
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em]">No vacancies available at this moment</p>
              </div>
            )}
          </div>
        </section>

        {/* ── HOW IT WORKS ── NEW STATIC SECTION ── */}
        <section>
          <div className="flex justify-between items-center mb-6 border-b border-[#E5E7EB] pb-4">
            <h2 className="text-[11px] font-black text-[#0B1F3B] tracking-[0.4em] uppercase flex items-center gap-2">
              <FileText size={15} className="text-[#1E5EFF]" /> How It Works
            </h2>
            <span className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">3 Simple Steps</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {/* Subtle connector line (desktop only) */}
            <div className="hidden md:block absolute top-[2.75rem] left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-[2px] bg-gradient-to-r from-[#1E5EFF]/20 via-[#22D3EE]/40 to-[#1E5EFF]/20 z-0" />

            {[
              {
                step: '01',
                icon: Search,
                title: 'Browse Rooms',
                detail: 'Explore all available units with real-time vacancy status, photos, capacity, and monthly rates — no account needed.',
              },
              {
                step: '02',
                icon: MessageCircle,
                title: 'Send an Inquiry',
                detail: 'Found a room you like? Reach out via our Facebook page or support email to schedule a visit or ask questions.',
              },
              {
                step: '03',
                icon: Key,
                title: 'Move In',
                detail: 'Complete the requirements, sign the agreement, and settle in. Our team handles the rest from check-in to maintenance.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-[#1E5EFF]/8 rounded-xl flex items-center justify-center text-[#1E5EFF]">
                    <item.icon size={20} />
                  </div>
                  <span className="text-[28px] font-black text-[#E5E7EB] leading-none tracking-tighter">{item.step}</span>
                </div>
                <div>
                  <p className="text-sm font-black text-[#0B1F3B] uppercase tracking-tight">{item.title}</p>
                  <p className="text-[11px] font-bold text-[#6B7280] mt-2 leading-relaxed tracking-wide">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── WHY CHOOSE US ── NEW STATIC SECTION ── */}
        <section>
          <div className="flex justify-between items-center mb-6 border-b border-[#E5E7EB] pb-4">
            <h2 className="text-[11px] font-black text-[#0B1F3B] tracking-[0.4em] uppercase flex items-center gap-2">
              <Star size={15} className="text-[#1E5EFF]" /> Why Choose BoarderQ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: ShieldCheck,
                title: 'Transparent Pricing',
                detail: "No hidden fees. Monthly rates are published openly so you always know exactly what you're paying for.",
                accent: 'bg-emerald-50 text-emerald-600',
              },
              {
                icon: Clock,
                title: 'Real-Time Availability',
                detail: 'Room status updates instantly — no calling ahead to check if a unit is still open.',
                accent: 'bg-[#1E5EFF]/8 text-[#1E5EFF]',
              },
              {
                icon: Wrench,
                title: 'Responsive Maintenance',
                detail: 'Issues get logged and tracked through our system, so nothing falls through the cracks.',
                accent: 'bg-amber-50 text-amber-600',
              },
              {
                icon: Users,
                title: 'Community-First Living',
                detail: 'A well-managed property means safer, cleaner, and more comfortable spaces for every boarder.',
                accent: 'bg-rose-50 text-rose-500',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-[#E5E7EB] hover:border-[#1E5EFF] rounded-2xl p-6 flex items-start gap-5 shadow-sm transition-all group"
              >
                <div className={`w-11 h-11 ${item.accent} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-[#0B1F3B] uppercase tracking-tight group-hover:text-[#1E5EFF] transition-colors">{item.title}</p>
                  <p className="text-[11px] font-bold text-[#6B7280] mt-1.5 leading-relaxed tracking-wide">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SYSTEM CAPABILITIES ── */}
        <section>
          <div className="flex justify-between items-center mb-6 border-b border-[#E5E7EB] pb-4">
            <h2 className="text-[11px] font-black text-[#0B1F3B] tracking-[0.4em] uppercase flex items-center gap-2">
              <Activity size={15} className="text-[#1E5EFF]" /> System Protocol
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

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-[#E5E7EB] pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

            <div className="space-y-4">
              <Link href="/">
                <h3 className="text-2xl font-black tracking-tighter uppercase leading-none text-[#0B1F3B] cursor-pointer">
                  BOARDER<span className="text-[#1E5EFF] italic">Q</span>
                </h3>
              </Link>
              <p className="text-[11px] text-[#6B7280] font-bold leading-relaxed tracking-wider">
                Redefining the boarding house experience through automated logistics and real-time inventory synchronization.
              </p>
              <div className="flex items-center gap-3">
                <button className="w-9 h-9 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#1E5EFF] transition-all">
                  <Globe size={18} />
                </button>
                <a href="mailto:boarderqadmin123@gmail.com" className="w-9 h-9 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#1E5EFF] transition-all">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-[#0B1F3B] uppercase tracking-[0.4em] mb-6">Ecosystem</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Overview', href: '/' },
                  { label: 'Browse Rooms', href: '/public/rooms' },
                  { label: 'About Project', href: '/public/about' },
                  { label: 'Sign In', href: '/public/login' }
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[11px] font-bold text-[#6B7280] hover:text-[#1E5EFF] uppercase tracking-widest transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-[#E5E7EB] group-hover:bg-[#1E5EFF] transition-colors" /> 
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-[#0B1F3B] uppercase tracking-[0.4em] mb-6">Landlord Connect</h4>
              <div className="space-y-4">
                <a href="https://www.facebook.com/che.ann.abal.2024" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
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
                    <p className="text-[11px] font-black text-[#0B1F3B] uppercase tracking-tight">Support Email</p>
                    <p className="text-[10px] text-[#6B7280] font-bold mt-1">boarderqadmin123@gmail.com</p>
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

          <div className="pt-6 border-t border-[#F1F5F9] flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[9px] font-black text-[#CBD5E1] uppercase tracking-[0.4em]">BOARDER-Q ADMIN CONSOLE © 2026</span>
            <Link href="/public/login" className="text-[9px] font-black text-[#1E5EFF] uppercase tracking-widest hover:underline">System Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}