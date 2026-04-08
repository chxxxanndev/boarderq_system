'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  BedDouble, 
  User,
  LogOut,
  Sun,
  Moon,
  Home
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [role, setRole] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole); 
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setIsDarkMode(false);
  }, [pathname]);

  const isDashboardPage = pathname.startsWith('/admin') || pathname.startsWith('/tenant');
  if (isDashboardPage) return null;

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/public/login';
  };

  return (
    <nav className={`sticky top-0 z-50 w-full px-8 py-4 flex items-center justify-between transition-all duration-300 border-b ${
      isDarkMode 
        ? 'bg-[#0B1120] border-white/5 text-white' 
        : 'bg-white border-slate-200 shadow-sm text-slate-900'
    }`}>
      
      <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 min-w-0 mr-2">
            {/* Logo Image */}
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="h-8 w-auto object-contain flex-shrink-0" 
            />
            
            {/* System Name - Adjusted font size to text-lg to prevent overlap */}
            <div className="flex items-center gap-0.5 whitespace-nowrap overflow-hidden">
              <span className="font-black text-lg tracking-tight">BOARDER</span>
              <span className="font-black text-lg text-[#00A3CC] italic">Q</span>
            </div>
          </div>
      </div>

      <div className="hidden lg:flex items-center gap-10">
        {!role && (
          <>
            <Link 
              href="/" 
              className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all ${
                pathname === '/' ? 'text-cyan-500' : 'text-white/60 hover:text-white'
              }`}
            >
              <Home size={16} className={pathname === '/' ? 'text-cyan-500' : 'text-cyan-500/50'} />
              Overview
            </Link>
            <Link 
              href="/public/rooms" 
              className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all ${
                pathname === '/public/rooms' ? 'text-cyan-500' : 'text-white/60 hover:text-white'
              }`}
            >
              <BedDouble size={16} className={pathname === '/public/rooms' ? 'text-cyan-500' : 'text-cyan-500/50'} />
              Browse Rooms
            </Link>
          </>
        )}

        {role && (
          <Link 
            href={role === 'landlord' ? '/admin/dashboard' : '/tenant/dashboard'}
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-cyan-500 hover:text-cyan-400"
          >
            <LayoutDashboard size={16} />
            Go to My Dashboard
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-white/5 text-white/60' : 'hover:bg-slate-100 text-slate-500'
          }`}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {!role ? (
          <Link 
            href="/public/login" 
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-900/20"
          >
            <User size={14} />
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
             <span className="text-[9px] bg-cyan-500/10 text-cyan-500 px-2.5 py-1 rounded-md font-black uppercase tracking-tighter border border-cyan-500/20">
              {role}
            </span>
            
            <button 
              onClick={handleLogout}
              className="text-white/40 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}