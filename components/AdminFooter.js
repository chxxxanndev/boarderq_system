'use client';
import React from 'react';
import Link from 'next/link';
import { Activity, Zap } from 'lucide-react';

const AdminFooter = () => {
  return (
    <footer className="border-t border-[#E5E7EB] pt-12 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Admin Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0B1F3B] rounded flex items-center justify-center">
                <Activity size={16} className="text-[#22D3EE]" />
              </div>
              <h3 className="text-xl font-black tracking-tighter uppercase text-[#0B1F3B]">
                BOARDER<span className="text-[#1E5EFF]">Q</span>
                <span className="ml-2 text-[9px] border border-[#0B1F3B] px-1.5 py-0.5 rounded font-black opacity-40">ADMIN</span>
              </h3>
            </div>
            <p className="text-[10px] text-[#6B7280] font-black uppercase tracking-widest leading-relaxed">
              SECURE ADMINISTRATIVE GATEWAY. <br />
              AUTHORIZED PERSONNEL ONLY.
            </p>
          </div>

          {/* Management Links (Matched to Sidebar) */}
          <div>
            <h4 className="text-[10px] font-black text-[#0B1F3B]/40 uppercase tracking-[0.3em] mb-6">Management</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {[
                {label: 'Overview', href: '/admin/dashboard'},
                {label: 'Properties', href: '/admin/rooms'},
                {label: 'Applications', href: '/admin/applications'},
                {label: 'Tenants', href: '/admin/tenants'},
                {label: 'Reports', href: '/admin/payments'},
                {label: 'Announcements', href: '/admin/announcements'},
              ].map((link) => (
                <Link key={link.label} href={link.href} className="text-[10px] font-black text-[#0B1F3B] hover:text-[#1E5EFF] uppercase tracking-widest transition-all flex items-center gap-2 group">
                  <div className="w-1 h-1 bg-[#1E5EFF] rounded-full opacity-0 group-hover:opacity-100 transition-all" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* System Status Node */}
          <div className="flex flex-col md:items-end">
            <h4 className="text-[10px] font-black text-[#0B1F3B]/40 uppercase tracking-[0.3em] mb-6 md:text-right">System Metrics</h4>
            <div className="space-y-3 w-full max-w-[240px]">
              <div className="flex items-center justify-between bg-[#F8FAFC] p-3 rounded-xl border border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[9px] font-black text-[#0B1F3B] uppercase">Core Services</p>
                </div>
                <p className="text-[9px] font-bold text-emerald-600 uppercase">Operational</p>
              </div>
              <div className="flex items-center justify-between px-3">
                 <div className="flex items-center gap-2">
                    <Zap size={12} className="text-[#1E5EFF]" />
                    <p className="text-[9px] font-bold text-[#6B7280] uppercase">Latency</p>
                 </div>
                 <p className="text-[10px] font-black text-[#0B1F3B]">24ms</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#F1F5F9] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-black text-[#CBD5E1] tracking-[0.5em]">
            BOARDER-Q Admin Console // © 2026 // v1.0
          </p>
          <div className="flex gap-8">
             <span className="text-[9px] font-black text-[#0B1F3B] uppercase tracking-widest opacity-30">Encrypted Node</span>
             <span className="text-[9px] font-black text-[#0B1F3B] uppercase tracking-widest opacity-30">DAPITAN_STATION_01</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;