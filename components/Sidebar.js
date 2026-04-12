'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, CreditCard, Wrench, Megaphone,
  ChevronDown, ChevronRight, Users, Home, FileText
} from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar(); 
  const [role, setRole] = useState(null);
  const [isTenantsOpen, setIsTenantsOpen] = useState(true);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
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

  return (
    <aside 
      className={`
        ${isCollapsed ? 'w-20' : 'w-64'} 
        bg-gradient-to-b from-[#0B1F3B] to-[#1E5EFF] 
        z-50 h-screen sticky top-0 
        hidden md:flex flex-col text-white 
        transition-all duration-300 border-r border-white/10 shadow-xl
      `}
    >
      {/* BRANDING SECTION: MOVED FROM NAVBAR */}
      <div className={`h-[72px] flex items-center border-b border-white/10 ${isCollapsed ? 'justify-center' : 'px-6'}`}>
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
          {!isCollapsed && (
            <div className="flex items-center gap-0.5">
              <span className="font-black text-lg tracking-tight">BOARDER</span>
              <span className="font-black text-lg text-[#22D3EE] italic">Q</span>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-grow py-6 overflow-y-auto scrollbar-hide">
        {getMenuItems().map((item) => {
          if (item.isDropdown) {
            const isChildActive = item.subItems.some(sub => pathname === sub.href);
            
            return (
              <div key={item.id} className="mb-2">
                <button 
                  onClick={item.toggle} 
                  className={`w-full flex items-center gap-4 px-6 py-4 transition-all ${
                    isChildActive || item.isOpen ? 'text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon size={20} className={`min-w-[20px] ${isChildActive ? 'text-[#22D3EE]' : ''}`} />
                  {!isCollapsed && (
                    <>
                      <span className="text-[11px] font-black tracking-widest flex-1 text-left uppercase">{item.label}</span>
                      {item.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </>
                  )}
                </button>
                
                {!isCollapsed && item.isOpen && (
                  <div className="bg-black/20 border-y border-white/5">
                    {item.subItems.map((sub, idx) => (
                      <Link 
                        key={idx} 
                        href={sub.href} 
                        className={`flex items-center gap-4 px-6 py-3.5 relative transition-all ${
                          pathname === sub.href ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
                        }`}
                      >
                        {pathname === sub.href && (
                          <div className="absolute left-0 w-1.5 h-full bg-[#22D3EE]"></div>
                        )}
                        <span className={`ml-9 text-[10px] font-bold tracking-wider uppercase truncate ${pathname === sub.href ? 'text-[#22D3EE]' : ''}`}>
                          {sub.label}
                        </span>
                      </Link>
                    ))}
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
              className={`flex items-center gap-4 px-6 py-4 relative transition-all ${
                isActive ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 w-1.5 h-full bg-[#22D3EE] shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
              )}
              <item.icon size={20} className={`min-w-[20px] transition-colors ${isActive ? 'text-[#22D3EE]' : 'text-white/50'}`} />
              {!isCollapsed && (
                <span className="text-[11px] font-black tracking-widest uppercase transition-colors">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}