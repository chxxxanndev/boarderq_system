'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link'; // Add this to your imports
import {
  Activity, Zap, CheckCircle2, Megaphone, Clock, BedDouble, TrendingUp, Wrench,
  Globe, Mail, Phone, ExternalLink, ShieldCheckm, MapPin // Replaced Facebook with Globe
} from 'lucide-react';import { motion } from 'framer-motion';

export default function AnnouncementsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/announcements')
      .then(r => r.json())
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (d) => new Date(d).toLocaleDateString('en-PH', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B1F3B]">
      <div className="max-w-4xl mx-auto px-8 pt-16 pb-24">

        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tight mb-3">
            ANNOUNCE<span className="text-[#1E5EFF]">MENTS</span>
          </h1>
          <p className="text-[#6B7280] text-sm font-bold uppercase tracking-widest">
            Property updates and notices from management
          </p>
        </div>

        {loading ? (
          <div className="text-center py-24 text-[#6B7280] font-bold uppercase text-xs tracking-widest">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-24 text-[#6B7280] font-bold uppercase text-xs tracking-widest">No announcements yet.</div>
        ) : (
          <div className="space-y-6">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white border border-[#E5E7EB] rounded-[2rem] p-8 hover:border-[#1E5EFF] transition-all group"
              >
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-[#1E5EFF]/5 rounded-2xl border border-[#1E5EFF]/10 text-[#1E5EFF] flex-shrink-0 group-hover:bg-[#1E5EFF] group-hover:text-white transition-all">
                    <Megaphone size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-black uppercase tracking-tight text-[#0B1F3B] mb-2">{item.title}</h2>
                    <p className="text-sm text-[#6B7280] font-bold leading-relaxed mb-4 whitespace-pre-line">{item.body}</p>
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#6B7280]">
                      <span className="flex items-center gap-1.5"><Clock size={11} />{formatDate(item.created_at)}</span>
                      <span className="text-[#1E5EFF]">By {item.author}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* ── INFORMATIVE FOOTER ── */}
      <footer className="bg-white border-t border-[#E5E7EB] pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

            {/* Brand Section */}
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

            {/* FIXED: ECOSYSTEM LINKS */}
            <div>
              <h4 className="text-[10px] font-black text-[#0B1F3B] uppercase tracking-[0.4em] mb-6">Ecosystem</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Overview', href: '/' },
                  { label: 'Browse Rooms', href: '/public/rooms' },
                  { label: 'About Project', href: '/public/about' },
                  { label: 'Announcements', href: '/public/announcements' }
                ].map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href} 
                      className="text-[11px] font-bold text-[#6B7280] hover:text-[#1E5EFF] uppercase tracking-widest transition-colors flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-[#E5E7EB] group-hover:bg-[#1E5EFF] transition-colors" /> 
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Landlord Connect */}
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

            {/* Property Hub */}
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

          {/* Bottom Section */}
          <div className="pt-6 border-t border-[#F8FAFC] flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[9px] font-black text-[#CBD5E1] uppercase tracking-[0.4em]">
              BOARDER-Q ADMIN CONSOLE © 2026
            </span>
            {/* ADDED: Link to login for tenants/admin who find themselves at the bottom */}
            <Link href="/public/login" className="text-[9px] font-black text-[#1E5EFF] uppercase tracking-widest hover:underline">
              System Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}