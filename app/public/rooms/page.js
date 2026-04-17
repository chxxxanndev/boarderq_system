'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Users, ArrowRight } from 'lucide-react';
import {
  Activity, Zap, CheckCircle2, Megaphone, Clock, BedDouble, TrendingUp, Wrench,
  Globe, Mail, Phone, ExternalLink, ShieldCheck // Replaced Facebook with Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

const STATUS_COLORS = {
  available: 'text-emerald-600 bg-emerald-50',
  occupied:  'text-rose-600 bg-rose-50',
  maintenance: 'text-amber-600 bg-amber-50',
};

export default function RoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/rooms')
      .then(r => r.json())
      .then(data => { setRooms(data); setFiltered(data); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = rooms;
    if (statusFilter !== 'all') result = result.filter(r => r.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r =>
        r.name.toLowerCase().includes(q) || (r.location || '').toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [search, statusFilter, rooms]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1F3B]">
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-24">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tight mb-3">
            ROOM <span className="text-[#1E5EFF]">INVENTORY</span>
          </h1>
          <p className="text-[#6B7280] text-sm font-bold uppercase tracking-widest">
            Browse available units and submit an application
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-sm font-bold text-[#0B1F3B] focus:outline-none focus:border-[#1E5EFF] transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'available', 'occupied', 'maintenance'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest border transition-all ${
                  statusFilter === s
                    ? 'bg-[#0B1F3B] text-white border-[#0B1F3B]'
                    : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#0B1F3B]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Rooms Grid */}
        {loading ? (
          <div className="text-center py-24 text-[#6B7280] font-bold uppercase text-xs tracking-widest">Loading inventory...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-[#6B7280] font-bold uppercase text-xs tracking-widest">No rooms found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((room, i) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-[#E5E7EB] rounded-[2rem] overflow-hidden hover:border-[#1E5EFF] transition-all group shadow-sm hover:shadow-lg hover:shadow-blue-500/5"
              >
                {/* Image */}
                <div className="h-48 bg-[#F8FAFC] relative overflow-hidden">
                  {room.image_url ? (
                    <img src={room.image_url} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#E5E7EB]">
                      <span className="text-5xl font-black tracking-tighter opacity-30">{room.name.charAt(0)}</span>
                    </div>
                  )}
                  <span className={`absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${STATUS_COLORS[room.status]}`}>
                    {room.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-lg font-black uppercase tracking-tight text-[#0B1F3B] mb-1">{room.name}</h2>

                  <div className="flex items-center gap-4 text-[#6B7280] text-[11px] font-bold uppercase tracking-wide mb-4">
                    {room.location && (
                      <span className="flex items-center gap-1"><MapPin size={12} />{room.location}</span>
                    )}
                    {room.capacity && (
                      <span className="flex items-center gap-1"><Users size={12} />{room.capacity}</span>
                    )}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Monthly Rate</p>
                      <p className="text-2xl font-black text-[#0B1F3B]">₱{Number(room.monthly_rate).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => router.push(`/public/rooms/${room.id}`)}
                      className="flex items-center gap-2 bg-[#0B1F3B] group-hover:bg-[#1E5EFF] text-white text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-xl transition-all"
                    >
                      View <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

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