'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { 
  BedDouble, User, LogOut, Home, Menu, 
  Bell, HelpCircle, Settings, ChevronDown, LayoutDashboard, Loader2, Clock 
} from 'lucide-react';
import ProfileSettingsModal from './ProfileSettingsModal';
import { useSidebar } from '@/context/SidebarContext';
import { useHelp } from '@/context/HelpContext';

export default function Navbar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { toggleHelp } = useHelp();
  
  // Initialize state immediately to prevent flicker
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) return JSON.parse(storedUser);
    }
    return { name: "", role: null };
  });

  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const isDashboardPage = pathname.startsWith('/admin') || pathname.startsWith('/tenant');

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token');

    if (token) {
      // Sync fresh data
      fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
          if (data.role) {
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
          }
        }).catch(() => {});

      // Fetch alerts
      fetch('/api/notifications', { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => setNotifications(data))
        .catch(() => {});
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setIsNotificationsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/public/login';
  };

  if (!mounted) return null;

  return (
    <>
      <nav className="sticky top-0 z-[100] w-full h-[72px] px-8 flex items-center justify-between bg-[#0B1120] border-b border-white/5 text-white shadow-2xl transition-all duration-300">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-6">
          <Link href={user.role === 'admin' ? '/admin/dashboard' : user.role === 'tenant' ? '/tenant/dashboard' : '/'} className="flex items-center gap-2 group">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
            <div className={`flex items-center gap-0.5 overflow-hidden transition-all duration-500 ease-in-out ${isDashboardPage && isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100'}`}>
              <span className="font-black text-lg tracking-tight">BOARDER</span>
              <span className="font-black text-lg text-[#00A3CC] italic">Q</span>
            </div>
          </Link>

          {isDashboardPage && (
            <button onClick={toggleSidebar} className="p-2 hover:bg-white/5 rounded-lg text-[#00A3CC] border border-white/10">
              <Menu size={22} />
            </button>
          )}
        </div>

        {/* CENTER: Navigation Links (Shows on Public Pages OR if Logged Out) */}
        {(!isDashboardPage || !user.role) && (
          <div className="hidden lg:flex items-center gap-10">
            <Link href="/" className={`text-[11px] font-black uppercase tracking-widest transition-colors ${pathname === '/' ? 'text-cyan-500' : 'text-white/60 hover:text-white'}`}>
              Overview
            </Link>
            <Link href="/public/rooms" className={`text-[11px] font-black uppercase tracking-widest transition-colors ${pathname === '/public/rooms' ? 'text-cyan-500' : 'text-white/60 hover:text-white'}`}>
              Browse Rooms
            </Link>
          </div>
        )}

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {user.role && isDashboardPage && (
            <div className="flex items-center gap-2 mr-2 border-r border-white/10 pr-4">
              {/* NOTIFICATION BELL */}
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`p-2 transition-colors relative rounded-lg ${isNotificationsOpen ? 'text-[#00A3CC] bg-white/5' : 'text-white/40 hover:text-white'}`}
                >
                  <Bell size={20} />
                  {notifications.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0B1120]"></span>}
                </button>
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-[#0B1120] border border-white/10 rounded-sm shadow-2xl py-2 z-[110] animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-white/5 flex justify-between bg-black/20">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#00A3CC]">Alerts</span>
                      <span className="text-[9px] text-white/40">{notifications.length} New</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="px-4 py-3 hover:bg-white/5 border-b border-white/5 transition-all">
                          <p className="text-[9px] font-black uppercase text-white/30">{n.type}</p>
                          <p className="text-[11px] font-bold text-white/90 leading-tight">{n.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={toggleHelp} className="p-2 text-white/40 hover:text-[#00A3CC] transition-colors"><HelpCircle size={20} /></button>
            </div>
          )}

          {/* USER PROFILE OR LOGIN */}
          {user.role ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 pl-2 py-1 rounded-lg group">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] font-black uppercase leading-none tracking-tight">{user.name}</p>
                  <p className="text-[8px] text-[#00A3CC] font-bold uppercase tracking-widest">{user.role}</p>
                </div>
                <div className="w-9 h-9 rounded-sm bg-[#1A1A1A] border border-white/10 flex items-center justify-center font-black text-[#00A3CC]">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <ChevronDown size={14} className={`text-white/40 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-[#0B1120] border border-white/10 rounded-md shadow-2xl py-2 z-[110] animate-in fade-in slide-in-from-top-2">
                  <button onClick={() => { setIsSettingsOpen(true); setIsProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-black uppercase text-white/70 hover:bg-white/5 transition-all">
                    <Settings size={16} className="text-[#00A3CC]" /> Account Settings
                  </button>
                  <div className="h-px bg-white/5 my-1 mx-2"></div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-black uppercase text-red-400 hover:bg-red-500/5 transition-all">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* FIX: Logic to prevent showing "Get Started" on Dashboard while syncing */
            isDashboardPage ? (
              <div className="flex items-center gap-2 px-4 opacity-20"><Loader2 size={14} className="animate-spin" /></div>
            ) : (
              <Link href="/public/login" className="bg-[#00A3CC] hover:bg-white hover:text-black text-white px-6 py-2.5 rounded-sm text-[11px] font-black uppercase tracking-widest transition-all shadow-lg">
                Get Started
              </Link>
            )
          )}
        </div>
      </nav>

      <ProfileSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        user={user}
        onUpdate={(u) => { setUser(u); localStorage.setItem('user', JSON.stringify(u)); }}
      />
    </>
  );
}