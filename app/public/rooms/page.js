'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, MapPin, Users, ArrowRight, Activity, Zap, 
  CheckCircle2, BedDouble, TrendingUp, Wrench, 
  Globe, Mail, ExternalLink 
} from 'lucide-react';
import { motion } from 'framer-motion';

// Updated to include 'full' which is returned by your backend computed_status logic
const STATUS_COLORS = {
  available:   'text-emerald-600 bg-emerald-50 border-emerald-200',
  full:        'text-rose-600 bg-rose-50 border-rose-200',
  occupied:    'text-rose-600 bg-rose-50 border-rose-200',
  maintenance: 'text-amber-600 bg-amber-50 border-amber-200',
};

export default function RoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FIXED: Changed path from /api/public/rooms to /api/rooms
    fetch('/api/rooms')
      .then(r => r.json())
      .then(data => { 
        const roomData = Array.isArray(data) ? data : [];
        setRooms(roomData); 
        setFiltered(roomData); 
      })
      .catch(err => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...rooms];
    
    // Filter by status (using computed_status for better accuracy)
    if (statusFilter !== 'all') {
        result = result.filter(r => r.computed_status === statusFilter || r.status === statusFilter);
    }
    
    // Search logic
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) || (r.location || '').toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [search, statusFilter, rooms]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1F3B] font-sans">
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-24">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tight mb-3">
            ROOM <span className="text-[#1E5EFF]">INVENTORY</span>
          </h1>
          <p className="text-[#6B7280] text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
            <Activity size={14} className="text-[#1E5EFF]" /> Property Asset Oversight
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              placeholder="SEARCH BY DESIGNATION OR LOCATION..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#E5E7EB] bg-white text-xs font-black uppercase tracking-widest text-[#0B1F3B] focus:outline-none focus:border-[#1E5EFF] focus:ring-4 focus:ring-[#1E5EFF]/5 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {['all', 'available', 'full', 'maintenance'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all whitespace-nowrap ${
                  statusFilter === s
                    ? 'bg-[#0B1F3B] text-white border-[#0B1F3B] shadow-lg shadow-[#0B1F3B]/10'
                    : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#1E5EFF] hover:text-[#1E5EFF]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Rooms Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-[#1E5EFF]">
            <Activity className="animate-spin mb-4" size={32} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Retrieving Database Nodes...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-[#E5E7EB]">
            <p className="text-[10px] font-black text-[#6B7280] uppercase tracking-[0.4em]">No matching inventory records found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((room, i) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-[#E5E7EB] rounded-[2.5rem] overflow-hidden hover:border-[#1E5EFF] transition-all group shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 relative flex flex-col"
              >
                {/* Image Section */}
                <div className="h-56 bg-[#F8FAFC] relative overflow-hidden">
                  {room.image_url ? (
                    <img src={room.image_url} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-[#CBD5E1]">
                      <span className="text-7xl font-black tracking-tighter opacity-20">{room.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute top-5 left-5">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border shadow-sm ${STATUS_COLORS[room.computed_status] || STATUS_COLORS[room.status]}`}>
                      {room.computed_status || room.status}
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-6">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-[#0B1F3B] group-hover:text-[#1E5EFF] transition-colors line-clamp-1">{room.name}</h2>
                    <div className="flex items-center gap-4 mt-2 text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#1E5EFF]" /> {room.location || 'Main Wing'}</span>
                        <span className="flex items-center gap-1.5"><Users size={12} className="text-[#1E5EFF]" /> {room.capacity} slots</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-[#F8FAFC] flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly Rate</p>
                      <p className="text-3xl font-black text-[#0B1F3B] tracking-tight">₱{Number(room.monthly_rate).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => router.push(`/public/rooms/${room.id}`)}
                      className="w-14 h-14 bg-[#0B1F3B] text-white rounded-2xl flex items-center justify-center hover:bg-[#1E5EFF] hover:-rotate-12 transition-all shadow-lg shadow-blue-500/10"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

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
                  { label: 'Sign In',       href: '/public/login' }
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

          <div className="pt-6 border-t border-[#F1F5F9] flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[9px] font-black text-[#CBD5E1] uppercase tracking-[0.4em]">BOARDER-Q ADMIN CONSOLE © 2026</span>
            <Link href="/public/login" className="text-[9px] font-black text-[#1E5EFF] uppercase tracking-widest hover:underline">System Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}