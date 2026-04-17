'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { 
  Menu, Bell, HelpCircle, Settings, ChevronDown, LogOut, Loader2 
} from 'lucide-react';
import ProfileSettingsModal from './ProfileSettingsModal';
import { useSidebar } from '@/context/SidebarContext';
import { useHelp } from '@/context/HelpContext';

export default function Navbar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { toggleHelp } = useHelp();
  
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
      fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        })
        .catch(err => { if (err.status === 401) handleLogout(); });

      fetch('/api/notifications', { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => res.ok ? res.json() : []) 
        .then(data => setNotifications(data))
        .catch(() => setNotifications([]));
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
      <nav className="sticky top-0 z-[40] w-full h-[72px] px-8 flex items-center justify-between bg-white border-b border-[#E5E7EB] text-[#0B1F3B] shadow-sm transition-all duration-300">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-6">
          {/* Logo returns to Navbar ONLY on public pages */}
          {!isDashboardPage && (
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/images/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
              <div className="flex items-center gap-0.5">
                <span className="font-black text-lg tracking-tight text-[#0B1F3B]">BOARDER</span>
                <span className="font-black text-lg text-[#1E5EFF] italic">Q</span>
              </div>
            </Link>
          )}

          {/* Toggle Menu button ONLY on dashboard pages */}
          {isDashboardPage && (
            <button onClick={toggleSidebar} className="p-2 hover:bg-[#F8FAFC] rounded-lg text-[#0B1F3B] border border-[#E5E7EB] transition-colors">
              <Menu size={22} />
            </button>
          )}
        </div>

        {/* CENTER: Public Navigation Links (RESTORED) */}
        {!isDashboardPage && (
          <div className="hidden lg:flex items-center gap-10">
            <Link href="/" className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${pathname === '/' ? 'text-[#1E5EFF]' : 'text-[#6B7280] hover:text-[#0B1F3B]'}`}>
              Overview
            </Link>
            <Link href="/public/rooms" className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${pathname === '/public/rooms' ? 'text-[#1E5EFF]' : 'text-[#6B7280] hover:text-[#0B1F3B]'}`}>
              Browse Rooms
            </Link>
            <Link href="/public/about" className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${pathname === '/public/about' ? 'text-[#1E5EFF]' : 'text-[#6B7280] hover:text-[#0B1F3B]'}`}>
              About
            </Link>
            <Link href="/public/announcements" className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${pathname === '/public/announcements' ? 'text-[#1E5EFF]' : 'text-[#6B7280] hover:text-[#0B1F3B]'}`}>
              Announcements
            </Link>             
          </div>
        )}

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          
          {/* Dashboard Icons (Notifs/Help) */}
          {user.role && isDashboardPage && (
            <div className="flex items-center gap-2 mr-2 border-r border-[#E5E7EB] pr-4">
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`p-2 transition-colors relative rounded-lg ${isNotificationsOpen ? 'text-[#1E5EFF] bg-[#F8FAFC]' : 'text-[#6B7280] hover:text-[#0B1F3B]'}`}
                >
                  <Bell size={20} />
                  {notifications.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>}
                </button>
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl py-2 z-[110] animate-in fade-in zoom-in-95 overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#E5E7EB] flex justify-between bg-[#F8FAFC]">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3B]">Notifications</span>
                      <span className="text-[9px] text-[#1E5EFF] font-bold">{notifications.length} NEW</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? notifications.map((n) => (
                        <div key={n.id} className="px-4 py-4 hover:bg-[#F8FAFC] border-b border-[#E5E7EB] transition-all">
                          <p className="text-[9px] font-black uppercase text-[#1E5EFF] mb-1">{n.type}</p>
                          <p className="text-[11px] font-bold text-[#0B1F3B] leading-snug">{n.title}</p>
                        </div>
                      )) : (
                        <div className="px-4 py-8 text-center text-[#6B7280] text-[10px] font-bold uppercase">No Alerts</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={toggleHelp} className="p-2 text-[#6B7280] hover:text-[#1E5EFF] transition-colors"><HelpCircle size={20} /></button>
            </div>
          )}

          {/* Profile Dropdown or Sign In Button */}
          {user.role ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 pl-3 py-1.5 rounded-xl transition-all hover:bg-[#F8FAFC] group">
                <div className="text-right hidden sm:block">
                  <p className="text-[11px] font-black uppercase leading-none tracking-tight text-[#0B1F3B]">{user.name}</p>
                  <p className="text-[9px] text-[#1E5EFF] font-black uppercase tracking-widest mt-1 opacity-80">{user.role}</p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] flex items-center justify-center font-black text-white text-sm shadow-sm">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <ChevronDown size={14} className={`text-[#6B7280] transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-60 bg-white border border-[#E5E7EB] rounded-xl shadow-2xl py-2 z-[110] animate-in fade-in zoom-in-95">
                  <button onClick={() => { setIsSettingsOpen(true); setIsProfileOpen(false); }} className="w-full flex items-center gap-4 px-5 py-3.5 text-[11px] font-black uppercase text-[#0B1F3B] hover:bg-[#F8FAFC] transition-all">
                    <Settings size={18} className="text-[#1E5EFF]" /> Account Settings
                  </button>
                  <div className="h-px bg-[#E5E7EB] my-1 mx-3"></div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-3.5 text-[11px] font-black uppercase text-rose-500 hover:bg-rose-50 transition-all">
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
             <Link href="/public/login" className="bg-[#1E5EFF] hover:bg-[#0B1F3B] text-white px-8 py-3 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/10 active:scale-95">
                Sign In
             </Link>
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