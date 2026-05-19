'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, MapPin, Users, Activity,
  Globe, Mail, ExternalLink, ChevronLeft, ChevronRight, BedDouble, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_COLORS = {
  available:   'text-emerald-600 bg-emerald-50 border-emerald-200',
  full:        'text-rose-600 bg-rose-50 border-rose-200',
  occupied:    'text-rose-600 bg-rose-50 border-rose-200',
  maintenance: 'text-amber-600 bg-amber-50 border-amber-200',
};

const STATUS_DOT = {
  available:   'bg-emerald-400',
  full:        'bg-rose-400',
  occupied:    'bg-rose-400',
  maintenance: 'bg-amber-400',
};

const VISIBLE = 3;

function smartSort(rooms) {
  return [...rooms].sort((a, b) => {
    const numA = parseInt(a.name.match(/\d+/)?.[0] ?? '0', 10);
    const numB = parseInt(b.name.match(/\d+/)?.[0] ?? '0', 10);
    if (numA !== numB) return numA - numB;
    return a.name.localeCompare(b.name);
  });
}

export default function RoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    fetch('/api/rooms')
      .then(r => r.json())
      .then(data => {
        const d = Array.isArray(data) ? data : [];
        const sorted = smartSort(d);
        setRooms(sorted);
        setFiltered(sorted);
      })
      .catch(err => console.error('Fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...rooms];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) ||
        (r.location || '').toLowerCase().includes(q)
      );
    }
    setFiltered(smartSort(result));
    setIndex(0);
  }, [search, rooms]);

  const total = filtered.length;
  const maxIndex = Math.max(0, total - VISIBLE);

  const handleManual = (dir) => {
    setDirection(dir);
    setIndex(prev => {
      const next = prev + dir;
      if (next > maxIndex) return 0;
      if (next < 0) return maxIndex;
      return next;
    });
  };

  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) handleManual(delta > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const visibleRooms = filtered.slice(index, index + VISIBLE);
  const padded = [...visibleRooms, ...Array(Math.max(0, VISIBLE - visibleRooms.length)).fill(null)];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1F3B] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-16 pb-24">

        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#1E5EFF] mb-3 flex items-center gap-2">
                <Sparkles size={10} /> Interested to secure a Bed Space? Browse our
              </p>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
                AVAILABLE <span className="text-[#1E5EFF]">ROOMS</span>
              </h1>
            </div>
            {!loading && total > 0 && (
              <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest self-end mb-1">
                {total} room{total !== 1 ? 's' : ''} listed
              </p>
            )}
          </div>
        </motion.div>

        <div className="mb-8 sm:mb-10">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              placeholder="SEARCH BY NAME OR LOCATION..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#E5E7EB] bg-white text-xs font-black uppercase tracking-widest text-[#0B1F3B] focus:outline-none focus:border-[#1E5EFF] focus:ring-4 focus:ring-[#1E5EFF]/5 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-[#1E5EFF]">
            <Activity className="animate-spin mb-4" size={32} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6B7280]">Fetching Room Records...</p>
          </div>
        ) : total === 0 ? (
          <div className="flex flex-col items-center justify-center py-32">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6B7280]">No rooms found.</p>
          </div>
        ) : (
          <div className="relative">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center gap-3 flex-1">
                <div className="h-[2px] flex-1 bg-[#E5E7EB] rounded-full overflow-hidden max-w-[160px] sm:max-w-[200px]">
                  <motion.div
                    className="h-full bg-[#1E5EFF] rounded-full"
                    animate={{ width: `${((index + 1) / (maxIndex + 1)) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest tabular-nums">
                  {String(index + 1).padStart(2, '0')} / {String(maxIndex + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 mx-6">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                    className={`rounded-full transition-all duration-300 ${
                      i === index ? 'w-6 h-1.5 bg-[#1E5EFF]' : 'w-1.5 h-1.5 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleManual(-1)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#0B1F3B] hover:text-white hover:border-[#0B1F3B] flex items-center justify-center transition-all active:scale-90 shadow-sm"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => handleManual(1)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-[#0B1F3B] bg-[#0B1F3B] text-white hover:bg-[#1E5EFF] hover:border-[#1E5EFF] flex items-center justify-center transition-all active:scale-90 shadow-sm"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={{
                    enter: (d) => ({ opacity: 0, x: d * 60 }),
                    center: { opacity: 1, x: 0 },
                    exit: (d) => ({ opacity: 0, x: d * -60 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                >
                  {padded.map((room, i) =>
                    room ? (
                      <RoomCard key={room.id} room={room} delay={i * 0.07} router={router} />
                    ) : (
                      <div key={`empty-${i}`} className="invisible" />
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-[#E5E7EB] pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
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
                <motion.button whileHover={{ scale: 1.1 }} className="w-9 h-9 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#1E5EFF] transition-all">
                  <Globe size={18} />
                </motion.button>
                <motion.a whileHover={{ scale: 1.1 }} href="mailto:boarderqadmin123@gmail.com" className="w-9 h-9 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg flex items-center justify-center text-[#6B7280] hover:text-[#1E5EFF] transition-all">
                  <Mail size={18} />
                </motion.a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-[#0B1F3B] uppercase tracking-[0.4em] mb-6">Ecosystem</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Overview',      href: '/' },
                  { label: 'Browse Rooms',  href: '/public/rooms' },
                  { label: 'About Project', href: '/public/about' },
                  { label: 'Sign In',       href: '/public/login' },
                ].map(link => (
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
                    <p className="text-[11px] font-black text-[#0B1F3B] uppercase tracking-tight group-hover:text-[#1E5EFF] transition-colors">Official Facebook</p>
                    <p className="text-[10px] text-[#6B7280] font-bold uppercase mt-1 flex items-center gap-1">Visit Page <ExternalLink size={10} /></p>
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
                    Dapitan City,<br />Zamboanga Del Norte, 7101<br />Philippines
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#F1F5F9] flex justify-center">
            <span className="text-[9px] font-black text-[#CBD5E1] uppercase tracking-[0.4em]">BOARDER-Q © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function RoomCard({ room, delay, router }) {
  const statusKey = room.computed_status || room.status;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white border border-[#E5E7EB] rounded-[2.5rem] overflow-hidden transition-all group shadow-sm flex flex-col"
      style={{
        borderColor: hovered ? '#1E5EFF' : '#E5E7EB',
        boxShadow: hovered
          ? '0 20px 60px -12px rgba(30,94,255,0.15), 0 0 0 1px rgba(30,94,255,0.1)'
          : '0 1px 3px rgba(0,0,0,0.06)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div className="h-48 sm:h-56 bg-[#F8FAFC] relative overflow-hidden">
        {room.image_url ? (
          <img
            src={room.image_url}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center relative">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <BedDouble size={48} className="text-[#CBD5E1] relative z-10" />
            <span className="absolute text-[80px] sm:text-[100px] font-black text-[#E5E7EB] select-none leading-none z-0">
              {room.name.charAt(0)}
            </span>
          </div>
        )}

        {room.image_url && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        )}

        <div className="absolute top-4 sm:top-5 left-4 sm:left-5">
          <span className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-sm ${STATUS_COLORS[statusKey]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[statusKey]} animate-pulse`} />
            {statusKey}
          </span>
        </div>

        <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-5 text-right">
          <p className="text-[8px] font-black text-white/70 uppercase tracking-widest drop-shadow mb-0.5">/ month</p>
          <p className="text-xl sm:text-2xl font-black text-white leading-none drop-shadow-lg">
            ₱{Number(room.monthly_rate).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        <div className="mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0B1F3B] group-hover:text-[#1E5EFF] transition-colors duration-300">
            {room.name}
          </h2>
          <div className="flex items-center gap-4 mt-2 text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-[#1E5EFF]" />
              {room.location || 'Main Wing'}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={12} className="text-[#1E5EFF]" />
              {room.capacity} slots
            </span>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-[#E5E7EB] via-[#1E5EFF]/20 to-transparent mb-5 sm:mb-6" />

        <div className="mt-auto">
          <motion.button
            onClick={() => router.push(`/public/rooms/${room.id}`)}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 sm:py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300"
            style={{
              background: hovered ? '#0B1F3B' : 'transparent',
              color: hovered ? '#ffffff' : '#0B1F3B',
              border: '2px solid #0B1F3B',
              boxShadow: hovered ? '0 8px 24px -4px rgba(11,31,59,0.25)' : 'none',
            }}
          >
            {hovered ? '→ Reserve This Space' : 'View Details'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}