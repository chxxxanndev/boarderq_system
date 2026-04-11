'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { 
  BedDouble, User, LogOut, Home, Menu, 
  Bell, HelpCircle, Settings, ChevronDown, LayoutDashboard 
} from 'lucide-react';
import ProfileSettingsModal from './ProfileSettingsModal'; // Already imported
import { useSidebar } from '@/context/SidebarContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Modal state

  const [user, setUser] = useState({ name: "Loading...", role: null });
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isDashboardPage = pathname.startsWith('/admin') || pathname.startsWith('/tenant');

  const getLogoHref = () => {
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'tenant') return '/tenant/dashboard';
    return '/'; 
  };

  useEffect(() => {
    setMounted(true);
    const storedRole = localStorage.getItem('role');
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedRole) {
      setUser({ 
        name: storedUser ? JSON.parse(storedUser).name : "User", 
        role: storedRole 
      });
    }

    if (token) {
      fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        })
        .catch(() => { if (isDashboardPage) handleLogout(); });
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/public/login';
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  if (!mounted) return null;

  return (
    <>
      <nav className="sticky top-0 z-[100] w-full h-[72px] px-8 flex items-center justify-between bg-[#0B1120] border-b border-white/5 text-white shadow-2xl transition-all duration-300">
        
        {/* LEFT: [LOGO] THEN [TOGGLE] */}
        <div className="flex items-center gap-6">
          <Link href={getLogoHref()} className="flex items-center gap-2 group">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            
            <div className={`flex items-center gap-0.5 overflow-hidden transition-all duration-500 ease-in-out ${
              isDashboardPage && isCollapsed ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100'
            }`}>
              <span className="font-black text-lg tracking-tight">BOARDER</span>
              <span className="font-black text-lg text-[#00A3CC] italic">Q</span>
            </div>
          </Link>

          {isDashboardPage && (
            <button 
              onClick={toggleSidebar} 
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-[#00A3CC] border border-white/10"
            >
              <Menu size={22} />
            </button>
          )}
        </div>

        {/* CENTER: Public Links */}
        {!isDashboardPage && (
          <div className="hidden lg:flex items-center gap-10">
            <Link href="/" className={`text-[11px] font-black uppercase tracking-widest transition-colors ${pathname === '/' ? 'text-cyan-500' : 'text-white/60 hover:text-white'}`}>Overview</Link>
            <Link href="/public/rooms" className={`text-[11px] font-black uppercase tracking-widest transition-colors ${pathname === '/public/rooms' ? 'text-cyan-500' : 'text-white/60 hover:text-white'}`}>Browse Rooms</Link>
          </div>
        )}

        {/* RIGHT: TOOLS AND PROFILE */}
        <div className="flex items-center gap-4">
          {user.role && isDashboardPage && (
            <div className="flex items-center gap-2 mr-2 border-r border-white/10 pr-4">
              <button className="p-2 text-white/40 hover:text-[#00A3CC] relative transition-colors" title="Notifications">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#0B1120]"></span>
              </button>
              <button className="p-2 text-white/40 hover:text-[#00A3CC] transition-colors" title="Help"><HelpCircle size={18} /></button>
            </div>
          )}

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
                  <button 
                     onClick={() => {
                       setIsSettingsOpen(true);
                       setIsProfileOpen(false);
                     }}
                     className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/5 transition-all"
                   >
                     <Settings size={16} className="text-[#00A3CC]" /> Account Settings
                   </button>
                  
                  {!isDashboardPage && (
                    <Link href={getLogoHref()} className="flex items-center gap-3 px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/5 transition-all">
                      <LayoutDashboard size={16} className="text-[#00A3CC]" /> Go to Dashboard
                    </Link>
                  )}

                  <div className="h-px bg-white/5 my-1 mx-2"></div>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/public/login" className="bg-[#00A3CC] hover:bg-white hover:text-black text-white px-6 py-2.5 rounded-sm text-[11px] font-black uppercase tracking-widest transition-all">Get Started</Link>
          )}
        </div>
      </nav>

      {/* FIXED: The Modal must be rendered here to appear on screen */}
      <ProfileSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        user={user}
        onUpdate={handleUpdateUser}
      />
    </>
  );
}