'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, CreditCard, Wrench, Megaphone,
  ChevronDown, ChevronRight, Users, Home, FileText, X 
} from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar(); 
  const [role, setRole] = useState(null);
  const [isTenantsOpen, setIsTenantsOpen] = useState(true);

  useEffect(() => {
    setRole(localStorage.getItem('role'));

    const checkMobile = () => {
      if (window.innerWidth < 768 && !isCollapsed) {
        toggleSidebar();
      }
    };
    checkMobile();
  }, []); 

  const handleTenantToggle = () => {
    if (isCollapsed) {
      toggleSidebar(); 
      setIsTenantsOpen(true); 
    } else {
      setIsTenantsOpen(!isTenantsOpen);
    }
  };

  const getMenuItems = () => {
    if (role === 'admin') {
      return [
        { id: 'dashboard', label: 'OVERVIEW', icon: LayoutDashboard, href: '/admin/dashboard' },
        { id: 'rooms', label: 'PROPERTIES', icon: Home, href: '/admin/rooms' },
        { 
          id: 'tenants_group', 
          label: 'TENANT MODULES', 
          icon: Users, 
          isDropdown: true,
          isOpen: isTenantsOpen,
          toggle: handleTenantToggle, 
          subItems: [
            { label: 'NEW APPLICATIONS', href: '/admin/applications' },
            { label: 'ACCESS CONTROL', href: '/admin/tenants' }, 
            { label: 'ACTIVE LIST', href: '/admin/active-list' },
          ]
        },
        { id: 'payments', label: 'REPORTS', icon: FileText, href: '/admin/payments' },
        { id: 'announcements', label: 'ANNOUNCEMENTS', icon: Megaphone, href: '/admin/announcements' },
        { id: 'maintenance', label: 'MAINTENANCE', icon: Wrench, href: '/admin/maintenance' },
      ];
    }
    return [
      { id: 'dashboard', label: 'OVERVIEW', icon: LayoutDashboard, href: '/tenant/dashboard' },
      { id: 'payments', label: 'PAYMENTS', icon: CreditCard, href: '/tenant/payments' },
      { id: 'announcements', label: 'ANNOUNCEMENTS', icon: Megaphone, href: '/tenant/announcements' },
      { id: 'maintenance', label: 'MAINTENANCE', icon: Wrench, href: '/tenant/maintenance' },
    ];
  };

  const dashboardLink = role === 'admin' ? '/admin/dashboard' : '/tenant/dashboard';

  return (
    <>
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] md:hidden transition-opacity" 
          onClick={toggleSidebar}
        />
      )}

      <aside 
        className={`
          fixed inset-y-0 left-0 h-screen z-[150] 
          md:sticky md:top-0 flex flex-col
          /* RESTORED GRADIENT COLOR */
          bg-gradient-to-b from-[#0B1F3B] via-[#102A5C] to-[#1E5EFF]
          text-white border-r border-white/5 shadow-2xl
          transition-all duration-300 ease-in-out
          ${isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
          ${isCollapsed ? 'md:w-20 w-64' : 'w-64'} 
        `}
      >
        <div className={`h-[72px] flex items-center justify-between px-6 border-b border-white/10 shrink-0`}>
          <Link 
            href={dashboardLink}
            onClick={() => { if(window.innerWidth < 768) toggleSidebar(); }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity active:scale-95"
          >
            <img src="/images/logo.png" alt="Logo" className="h-7 w-auto object-contain" />
            {(!isCollapsed || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
              <div className="flex items-center gap-0.5">
                <span className="font-black text-base tracking-tight uppercase">Boarder</span>
                <span className="font-black text-base text-[#22D3EE] italic uppercase">Q</span>
              </div>
            )}
          </Link>
          
          <button onClick={toggleSidebar} className="md:hidden p-1.5 hover:bg-white/10 rounded-lg text-white/70">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-grow py-4 overflow-y-auto scrollbar-hide">
          {getMenuItems().map((item) => {
            if (item.isDropdown) {
              const isChildActive = item.subItems.some(sub => pathname === sub.href);
              
              return (
                <div key={item.id} className="mb-1">
                  <button 
                    onClick={item.toggle} 
                    className={`w-full flex items-center gap-4 px-6 py-4 transition-all ${
                      isChildActive || item.isOpen ? 'text-white bg-white/10' : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={20} className="shrink-0" />
                    {(!isCollapsed || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
                      <>
                        <span className="text-[11px] font-black tracking-widest flex-1 text-left uppercase">{item.label}</span>
                        {item.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </>
                    )}
                  </button>
                  
                  {(!isCollapsed || (typeof window !== 'undefined' && window.innerWidth < 768)) && item.isOpen && (
                    <div className="bg-black/20 py-1">
                      {item.subItems.map((sub, idx) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link 
                            key={idx} 
                            href={sub.href} 
                            onClick={() => { if(window.innerWidth < 768) toggleSidebar(); }}
                            className={`flex items-center gap-4 px-6 py-3.5 relative transition-all ${
                              isSubActive ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'
                            }`}
                          >
                            {isSubActive && (
                              <div className="absolute left-0 w-1 h-full bg-[#22D3EE]"></div>
                            )}
                            <span className={`ml-9 text-[10px] font-black tracking-widest uppercase truncate ${isSubActive ? 'text-[#22D3EE]' : ''}`}>
                              {sub.label}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.id} 
                href={item.href} 
                onClick={() => { if(window.innerWidth < 768) toggleSidebar(); }}
                className={`flex items-center gap-4 px-6 py-4 relative transition-all ${
                  isActive ? 'bg-white/20 text-white shadow-inner' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 w-[4px] h-full bg-[#22D3EE] shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
                )}
                <item.icon size={20} className={`shrink-0 transition-colors ${isActive ? 'text-[#22D3EE]' : ''}`} />
                {(!isCollapsed || (typeof window !== 'undefined' && window.innerWidth < 768)) && (
                  <span className="text-[11px] font-black tracking-widest uppercase">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}