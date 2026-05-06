'use client';
import React from 'react';
import Link from 'next/link';
import { Home, CreditCard, Wrench, Megaphone, LifeBuoy } from 'lucide-react';

const TenantFooter = () => {
  return (
    <footer className="border-t border-[#E5E7EB] pt-8 md:pt-12 pb-8 mt-12 md:mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 mb-10 md:mb-12">
          
          {/* Section 1: Tenant Branding */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#1E5EFF] to-[#22D3EE] rounded flex items-center justify-center shrink-0">
                <Home size={16} className="text-white" />
              </div>
              <h3 className="text-xl font-black tracking-tighter uppercase text-[#0B1F3B]">
                BOARDER<span className="text-[#1E5EFF]">Q</span>
                <span className="ml-2 text-[9px] bg-[#F8FAFC] border border-[#1E5EFF]/20 px-1.5 py-0.5 rounded font-black text-[#1E5EFF]">TENANT</span>
              </h3>
            </div>
            <p className="text-[10px] text-[#6B7280] font-black uppercase tracking-widest leading-relaxed max-w-[280px]">
              CONNECTED LIVING, SIMPLIFIED. <br className="hidden md:block" />
              YOUR DEDICATED RESIDENT PORTAL.
            </p>
          </div>

          {/* Section 2: Quick Access */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[10px] font-black text-[#0B1F3B]/40 uppercase tracking-[0.3em] mb-6">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full max-w-[320px] md:max-w-none">
              {[
                {label: 'Overview', icon: Home, href: '/tenant/dashboard'},
                {label: 'Payments', icon: CreditCard, href: '/tenant/payments'},
                {label: 'Maintenance', icon: Wrench, href: '/tenant/maintenance'},
                {label: 'Broadcasts', icon: Megaphone, href: '/tenant/announcements'},
              ].map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className="text-[10px] font-black text-[#0B1F3B] hover:text-[#1E5EFF] uppercase tracking-widest transition-all flex items-center gap-2 group"
                >
                  <link.icon size={13} className="text-[#6B7280] group-hover:text-[#1E5EFF] transition-colors shrink-0" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Section 3: Resident Support Box */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-[10px] font-black text-[#0B1F3B]/40 uppercase tracking-[0.3em] mb-6 md:text-right">Resident Support</h4>
            <div className="w-full max-w-[280px] bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#1E5EFF]/10 flex items-center justify-center shrink-0">
                    <LifeBuoy size={18} className="text-[#1E5EFF]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-[#0B1F3B] uppercase">Need Help?</p>
                    <p className="text-[9px] font-bold text-[#6B7280] uppercase tracking-tighter">Support is active</p>
                  </div>
               </div>
               <Link 
                 href="/tenant/maintenance" 
                 className="block w-full py-2.5 bg-white border border-[#E5E7EB] text-center text-[9px] font-black text-[#0B1F3B] uppercase tracking-[0.2em] rounded-xl hover:border-[#1E5EFF] hover:text-[#1E5EFF] transition-all shadow-sm active:scale-95"
               >
                  Request Service
               </Link>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Copyright & Node Info */}
        <div className="pt-8 border-t border-[#F1F5F9] flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <p className="text-[8px] md:text-[9px] font-black text-[#CBD5E1] tracking-[0.3em] md:tracking-[0.5em] text-center md:text-left uppercase">
            BOARDER-Q RESIDENT EXPERIENCE // © 2025 // v1.0
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
             <span className="text-[9px] font-black text-[#0B1F3B] uppercase tracking-widest opacity-20">Privacy Secured</span>
             <span className="text-[9px] font-black text-[#0B1F3B] uppercase tracking-widest opacity-20">DAPITAN_ST_01</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default TenantFooter;