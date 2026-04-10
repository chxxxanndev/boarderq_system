'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false); // To prevent hydration mismatch

  useEffect(() => {
    // 1. Mark component as mounted
    setMounted(true);
    
    // 2. Get Auth State from localStorage (or ideally a cookie-based API call)
    const storedRole = localStorage.getItem('role');
    setRole(storedRole); 
    
    // 3. Theme Syncing
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [pathname]);

  // Don't render anything on the server to prevent UI flickering
  const isDashboardPage = pathname.startsWith('/admin') || pathname.startsWith('/tenant');
  if (isDashboardPage || !mounted) return null;

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = async () => {
    // 1. Optional: Call backend logout if you use cookies/sessions
    await fetch('/api/auth/logout', { method: 'POST' });

    // 2. Clear local data
    localStorage.removeItem('role');
    localStorage.removeItem('token'); // If you use JWT
    localStorage.removeItem('user');
    
    setRole(null);
    
    // 3. Redirect to login
    router.push('/public/login');
    router.refresh(); // Forces a re-check of layout states
  };

  return (
    <nav className={`sticky top-0 z-50 w-full px-8 py-4 flex items-center justify-between transition-all duration-300 border-b ${
      isDarkMode 
        ? 'bg-[#0B1120] border-white/5 text-white' 
        : 'bg-white border-slate-200 shadow-sm text-slate-900'
    }`}>
      
      {/* Logo Section */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 min-w-0 mr-2">
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            className="h-8 w-auto object-contain flex-shrink-0" 
          />
          <div className="flex items-center gap-0.5 whitespace-nowrap overflow-hidden">
            <span className={`font-black text-lg tracking-tight ${!isDarkMode && 'text-slate-900'}`}>BOARDER</span>
            <span className="font-black text-lg text-[#00A3CC] italic">Q</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-10">
        <Link 
          href="/" 
          className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all ${
            pathname === '/' ? 'text-cyan-500' : isDarkMode ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home size={16} className="text-cyan-500/50" />
          Overview
        </Link>
        <Link 
          href="/public/rooms" 
          className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all ${
            pathname === '/public/rooms' ? 'text-cyan-500' : isDarkMode ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <BedDouble size={16} className="text-cyan-500/50" />
          Browse Rooms
        </Link>

        {role && (
          <Link 
            href={role === 'landlord' ? '/admin/dashboard' : '/tenant/dashboard'}
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-cyan-500 hover:text-cyan-400 group"
          >
            <LayoutDashboard size={16} className="group-hover:rotate-12 transition-transform" />
            My Dashboard
          </Link>
        )}
      </div>

      {/* Right Side Tools */}
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
            className="flex items-center gap-2 bg-[#00A3CC] hover:bg-white hover:text-black text-white px-5 py-2 rounded-sm text-[11px] font-black uppercase tracking-widest transition-all shadow-lg"
          >
            <User size={14} />
            Get Started
          </Link>
        ) : (
          <div className={`flex items-center gap-4 pl-4 border-l ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
            <span className="text-[9px] bg-cyan-500/10 text-cyan-500 px-2.5 py-1 rounded-sm font-black uppercase tracking-tighter border border-cyan-500/20">
              {role}
            </span>
            
            <button 
              onClick={handleLogout}
              className="text-white/40 hover:text-red-500 transition-colors p-1"
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