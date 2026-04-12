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

  // FIXED LOGIC: If collapsed, expand the sidebar first before showing the menu
  const handleTenantToggle = () => {
    if (isCollapsed) {
      toggleSidebar(); // This expands the bar
      setIsTenantsOpen(true); // Ensure menu is open after expansion
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
        bg-black z-50 h-full sticky top-0 
        hidden md:flex flex-col text-white 
        transition-all duration-300 border-r border-white/10 shadow-2xl
      `}
    >
      <nav className="flex-grow py-4 overflow-y-auto scrollbar-hide">
        {getMenuItems().map((item) => {
          if (item.isDropdown) {
            const isChildActive = item.subItems.some(sub => pathname === sub.href);
            
            return (
              <div key={item.id} className="mb-2">
                <button 
                  onClick={item.toggle} 
                  className={`w-full flex items-center gap-4 px-6 py-3.5 transition-all ${
                    isChildActive || item.isOpen ? 'text-white' : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon size={20} className={`min-w-[20px] ${isChildActive ? 'text-[#00A3CC]' : ''}`} />
                  {!isCollapsed && (
                    <>
                      <span className="text-[11px] font-black tracking-widest flex-1 text-left uppercase">{item.label}</span>
                      {item.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </>
                  )}
                </button>
                
                {/* FIXED: Only show sub-menu if sidebar is NOT collapsed */}
                {!isCollapsed && item.isOpen && (
                  <div className="bg-[#050505] border-y border-white/5">
                    {item.subItems.map((sub, idx) => (
                      <Link 
                        key={idx} 
                        href={sub.href} 
                        className={`flex items-center gap-4 px-6 py-3 relative transition-all ${
                          pathname === sub.href ? 'bg-white/5 text-white' : 'text-white/30 hover:text-white'
                        }`}
                      >
                        {pathname === sub.href && <div className="absolute left-0 w-1.5 h-full bg-[#00A3CC]"></div>}
                        <span className="ml-9 text-[10px] font-bold tracking-wider uppercase truncate">{sub.label}</span>
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
              className={`flex items-center gap-4 px-6 py-3.5 relative transition-all ${
                isActive ? 'bg-white/5 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && <div className="absolute left-0 w-1.5 h-full bg-[#00A3CC] shadow-[0_0_15px_#00A3CC]"></div>}
              <item.icon size={20} className={`min-w-[20px] ${isActive ? 'text-[#00A3CC]' : 'text-white/40'}`} />
              {!isCollapsed && <span className="text-[11px] font-black tracking-widest uppercase">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}