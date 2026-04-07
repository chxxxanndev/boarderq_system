'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Wrench, 
  Megaphone,
  ChevronDown,
  ChevronRight,
  Menu,
  Users,
  Home,
  LogOut
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState("SYSTEM USER");
  
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTenantsOpen, setIsTenantsOpen] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole); 
    if (storedRole === 'landlord') setUserName("Admin User");
    if (storedRole === 'tenant') setUserName("Tenant User");
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
    window.location.href = '/public/login'; 
  };

  const getMenuItems = () => {
    if (role === 'landlord') {
      return [
        { id: 'dashboard', label: 'OVERVIEW', icon: LayoutDashboard, href: '/admin/dashboard' },
        { id: 'rooms', label: 'PROPERTIES', icon: Home, href: '/admin/rooms' },
        { 
          id: 'tenants_group', 
          label: 'FIND TENANTS', 
          icon: Users, 
          isDropdown: true,
          isOpen: isTenantsOpen,
          toggle: () => setIsTenantsOpen(!isTenantsOpen),
          subItems: [
            { label: 'APPLICATIONS', href: '/admin/applications' },
            { label: 'LEADS', href: '#' }, 
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
    ];
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-black h-screen sticky top-0 hidden md:flex flex-col text-white transition-all duration-300 ease-in-out border-r border-[#333] shadow-2xl`}>
      
      {/* Branding Section */}
      <div className="h-20 flex items-center px-6 justify-between border-b border-[#333]">
        {!isCollapsed && (
          <div className="flex items-center gap-1">
             <span className="font-black text-xl tracking-tighter">BOARDER</span>
             <span className="font-black text-xl text-[#00A3CC] italic">Q</span>
          </div>
        )}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="hover:bg-[#1A1A1A] p-2 rounded-lg transition-colors text-[#00A3CC]">
          <Menu size={22} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow py-6 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => {
          if (item.isDropdown) {
            return (
              <div key={item.id} className="mb-2">
                <button 
                  onClick={item.toggle}
                  className={`w-full flex items-center gap-4 px-6 py-3 text-white/60 hover:text-white hover:bg-[#1A1A1A] transition-all ${item.isOpen ? 'text-white' : ''}`}
                >
                  <item.icon size={20} className="min-w-[20px]" />
                  {!isCollapsed && (
                    <>
                      <span className="text-[12px] font-black tracking-widest flex-1 text-left">{item.label}</span>
                      {item.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </>
                  )}
                </button>
                {!isCollapsed && item.isOpen && (
                  <div className="bg-[#0A0A0A]">
                    {item.subItems.map((sub, idx) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link 
                          key={idx} 
                          href={sub.href}
                          className={`flex items-center gap-4 px-6 py-3 transition-all relative ${
                            isSubActive ? 'bg-[#1A1A1A] text-white' : 'text-white/40 hover:text-white hover:bg-[#1A1A1A]'
                          }`}
                        >
                          {isSubActive && <div className="absolute left-0 w-1 h-full bg-[#00A3CC]"></div>}
                          <span className="ml-9 text-[11px] font-bold tracking-wider">{sub.label}</span>
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
              className={`flex items-center gap-4 px-6 py-3 transition-all relative group ${
                isActive ? 'bg-[#1A1A1A] text-white' : 'text-white/50 hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              {/* Cyan Active Indicator Bar */}
              {isActive && (
                <div className="absolute left-0 w-1.5 h-full bg-[#00A3CC] shadow-[0_0_15px_#00A3CC]"></div>
              )}
              
              <item.icon size={20} className={`min-w-[20px] ${isActive ? 'text-[#00A3CC]' : 'text-white/50 group-hover:text-white'}`} />
              {!isCollapsed && <span className="text-[12px] font-black tracking-widest">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User & Sign Out Section */}
      <div className="mt-auto border-t border-[#333] bg-[#0A0A0A]">
         {!isCollapsed && (
            <div className="px-6 py-5 flex items-center gap-3">
               <div className="w-9 h-9 rounded-sm bg-[#333] border border-white/10 flex items-center justify-center font-black text-sm text-[#00A3CC]">
                  {userName.charAt(0)}
               </div>
               <div className="overflow-hidden">
                  <p className="text-[11px] font-black uppercase truncate tracking-tight">{userName}</p>
                  <p className="text-[9px] text-[#00A3CC] font-bold uppercase tracking-widest">{role}</p>
               </div>
            </div>
         )}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-5 text-white/40 hover:text-red-500 hover:bg-red-500/5 transition-all border-t border-[#333]"
        >
          <LogOut size={20} className="min-w-[20px]" />
          {!isCollapsed && <span className="text-[11px] font-black tracking-[0.2em] uppercase">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}