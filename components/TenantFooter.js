'use client';
import React from 'react';
import Link from 'next/link';
import { Home, CreditCard, Wrench, Megaphone, LifeBuoy } from 'lucide-react';

const TenantFooter = () => {
  return (
    <footer className=" border-t border-[#E5E7EB] pt-12 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Tenant Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#1E5EFF] to-[#22D3EE] rounded flex items-center justify-center">
                <Home size={16} className="text-white" />
              </div>
              <h3 className="text-xl font-black tracking-tighter uppercase text-[#0B1F3B]">
                BOARDER<span className="text-[#1E5EFF]">Q</span>
                <span className="ml-2 text-[9px] bg-[#F8FAFC] border border-[#1E5EFF]/20 px-1.5 py-0.5 rounded font-black text-[#1E5EFF]">TENANT</span>
              </h3>
            </div>
            <p className="text-[10px] text-[#6B7280] font-black uppercase tracking-widest leading-relaxed">
              CONNECTED LIVING, SIMPLIFIED. <br />
              YOUR DEDICATED RESIDENT PORTAL.
            </p>
          </div>

          {/* Quick Access (Matched to Tenant Sidebar) */}
          <div>
            <h4 className="text-[10px] font-black text-[#0B1F3B]/40 uppercase tracking-[0.3em] mb-6">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {[
                {label: 'Overview', icon: Home, href: '/tenant/dashboard'},
                {label: 'Payments', icon: CreditCard, href: '/tenant/payments'},
                {label: 'Maintenance', icon: Wrench, href: '/tenant/maintenance'},
                {label: 'Announcements', icon: Megaphone, href: '/tenant/announcements'},
              ].map((link) => (
                <Link key={link.label} href={link.href} className="text-[10px] font-black text-[#0B1F3B] hover:text-[#1E5EFF] uppercase tracking-widest transition-all flex items-center gap-2 group">
                  <link.icon size={12} className="text-[#6B7280] group-hover:text-[#1E5EFF]" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resident Support Box */}
          <div className="flex flex-col md:items-end">
            <h4 className="text-[10px] font-black text-[#0B1F3B]/40 uppercase tracking-[0.3em] mb-6 md:text-right">Resident Support</h4>
            <div className="w-full max-w-[280px] bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-4">
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#1E5EFF]/10 flex items-center justify-center">
                    <LifeBuoy size={16} className="text-[#1E5EFF]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-[#0B1F3B] uppercase">Need Assistance?</p>
                    <p className="text-[9px] font-bold text-[#6B7280] uppercase">Admin is online</p>
                  </div>
               </div>
               <Link href="/tenant/maintenance" className="block w-full py-2 bg-white border border-[#E5E7EB] text-center text-[9px] font-black text-[#0B1F3B] uppercase tracking-widest rounded-lg hover:border-[#1E5EFF] transition-all">
                  Request Service
               </Link>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-[#F1F5F9] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] font-black text-[#CBD5E1] tracking-[0.5em]">
            BOARDER-Q Tentant Experience // © 2026 // Logistics Engine v1.0
          </p>
          <div className="flex gap-8">
             <span className="text-[9px] font-black text-[#0B1F3B] uppercase tracking-widest opacity-30">Privacy Protected</span>
             <span className="text-[9px] font-black text-[#0B1F3B] uppercase tracking-widest opacity-30">DAPITAN_STATION_01</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TenantFooter;