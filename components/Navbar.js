'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { 
  Menu, Bell, Settings, ChevronDown, LogOut, Loader2,
  Home, LayoutGrid, Info 
} from 'lucide-react';
import ProfileSettingsModal from './ProfileSettingsModal';
import { useSidebar } from '@/context/SidebarContext';

export default function Navbar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  
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
      <nav className="sticky top-0 z-[100] w-full h-[72px] px-3 md:px-8 flex items-center justify-between bg-white border-b border-[#E5E7EB] text-[#0B1F3B] shadow-sm transition-all duration-300">
        
        {/* LEFT SECTION: Toggle & Logo */}
        <div className="flex items-center gap-2 md:gap-6 shrink-0">
          {isDashboardPage && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleSidebar();
              }} 
              className="p-2.5 hover:bg-[#F8FAFC] rounded-xl text-[#0B1F3B] border border-[#E5E7EB] transition-all active:scale-95 flex items-center justify-center min-w-[40px] h-[40px] md:min-w-[44px] md:h-[44px] bg-white shadow-sm"
            >
              <Menu size={22} />
            </button>
          )}

          {!isDashboardPage && (
            <Link href="/" className="flex items-center gap-1.5 md:gap-2 group shrink-0">
              <img src="/images/logo.png" alt="Logo" className="h-5 md:h-8 w-auto object-contain" />
              <div className="flex items-center gap-0.5">
                <span className="font-black text-[10px] md:text-lg tracking-tight text-[#0B1F3B]">BOARDER</span>
                <span className="font-black text-[10px] md:text-lg text-[#1E5EFF] italic">Q</span>
              </div>
            </Link>
          )}
        </div>

        {/* CENTER: Public Links (Icons on Mobile, Words on Desktop) */}
        {!isDashboardPage && (
          <div className="flex items-center gap-6 md:gap-10">
            {/* Overview */}
            <Link href="/" className={`flex items-center transition-colors ${pathname === '/' ? 'text-[#1E5EFF]' : 'text-[#6B7280] hover:text-[#0B1F3B]'}`}>
              <Home size={20} className="md:hidden" /> {/* Mobile Icon */}
              <span className="hidden md:block text-[11px] font-black uppercase tracking-[0.2em]">Overview</span> {/* Desktop Word */}
            </Link>

            {/* Browse Rooms */}
            <Link href="/public/rooms" className={`flex items-center transition-colors ${pathname === '/public/rooms' ? 'text-[#1E5EFF]' : 'text-[#6B7280] hover:text-[#0B1F3B]'}`}>
              <LayoutGrid size={20} className="md:hidden" /> {/* Mobile Icon */}
              <span className="hidden md:block text-[11px] font-black uppercase tracking-[0.2em]">Browse Rooms</span> {/* Desktop Word */}
            </Link>

            {/* About */}
            <Link href="/public/about" className={`flex items-center transition-colors ${pathname === '/public/about' ? 'text-[#1E5EFF]' : 'text-[#6B7280] hover:text-[#0B1F3B]'}`}>
              <Info size={20} className="md:hidden" /> {/* Mobile Icon */}
              <span className="hidden md:block text-[11px] font-black uppercase tracking-[0.2em]">About</span> {/* Desktop Word */}
            </Link>
          </div>
        )}

        {/* RIGHT SECTION: Notifications & Profile */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          
          {user.role && isDashboardPage && (
            <div className="flex items-center gap-1 md:gap-2 mr-1 md:mr-2 border-r border-[#E5E7EB] pr-2 md:pr-4">
              <div className="relative" ref={notifRef}>
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`p-2 transition-colors relative rounded-lg ${isNotificationsOpen ? 'text-[#1E5EFF] bg-[#F8FAFC]' : 'text-[#6B7280] hover:text-[#0B1F3B]'}`}
                >
                  <Bell size={20} />
                  {notifications.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>}
                </button>
                {isNotificationsOpen && (
                  <div className="absolute right-[-40px] sm:right-0 mt-3 w-64 sm:w-80 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl py-2 z-[110]">
                    <div className="px-4 py-3 border-b border-[#E5E7EB] flex justify-between bg-[#F8FAFC]">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3B]">Notifications</span>
                      <span className="text-[9px] text-[#1E5EFF] font-bold">{notifications.length} NEW</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? notifications.map((n) => (
                        <div key={n.id} className="px-4 py-4 hover:bg-[#F8FAFC] border-b border-[#E5E7EB] transition-all text-left">
                          <p className="text-[9px] font-black uppercase text-[#1E5EFF] mb-1">{n.type}</p>
                          <p className="text-[11px] font-bold text-[#0B1F3B] leading-snug">{n.title}</p>
                        </div>
                      )) : (
                        <div className="px-4 py-8 text-center text-[#6B7280] text-[10px] font-bold uppercase tracking-widest">Clear</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {user.role ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 md:gap-3 pl-1 md:pl-3 py-1 rounded-xl transition-all hover:bg-[#F8FAFC] group">
                <div className="text-right hidden md:block shrink-0">
                  <p className="text-[11px] font-black uppercase leading-none text-[#0B1F3B]">{user.name}</p>
                  <p className="text-[9px] text-[#1E5EFF] font-black uppercase tracking-widest mt-1 opacity-80">{user.role}</p>
                </div>
                
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] flex items-center justify-center font-black text-white text-[10px] md:text-sm shadow-sm active:scale-90 shrink-0">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <ChevronDown size={14} className={`text-[#6B7280] transition-transform duration-300 hidden md:block ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-52 md:w-60 bg-white border border-[#E5E7EB] rounded-xl shadow-2xl py-2 z-[110]">
                  <div className="px-5 py-3 mb-1 border-b border-gray-50 md:hidden">
                    <p className="text-[10px] font-black uppercase text-[#0B1F3B] truncate">{user.name}</p>
                    <p className="text-[8px] text-[#1E5EFF] font-black uppercase tracking-widest">{user.role}</p>
                  </div>
                  <button onClick={() => { setIsSettingsOpen(true); setIsProfileOpen(false); }} className="w-full flex items-center gap-4 px-5 py-3 text-[11px] font-black uppercase text-[#0B1F3B] hover:bg-[#F8FAFC] transition-all">
                    <Settings size={18} className="text-[#1E5EFF]" /> Settings
                  </button>
                  <div className="h-px bg-[#E5E7EB] my-1 mx-3"></div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-3 text-[11px] font-black uppercase text-rose-500 hover:bg-rose-50 transition-all">
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
             <Link href="/public/login" className="bg-[#1E5EFF] hover:bg-[#0B1F3B] text-white px-3 md:px-8 py-2 md:py-3 rounded-lg text-[9px] md:text-[11px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 whitespace-nowrap shrink-0">
                SIGN IN
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