'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter
import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  BedDouble, 
  FileText, 
  CreditCard, 
  Wrench, 
  Megaphone,
  User,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // FIX: Listen to 'pathname' changes
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole); 
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setIsDarkMode(false);
  }, [pathname]); // Whenever the route changes, re-read the role from localStorage

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
    setRole(null); // Clear local state immediately
    window.location.href = '/public/login'; // Hard redirect to clear any cached states
  };

  const getIcon = (name) => {
    const iconClass = "w-4 h-4 text-cyan-500"; // Changed to cyan to match your theme
    switch (name) {
      case 'Dashboard': return <LayoutDashboard className={iconClass} />;
      case 'Rooms': return <BedDouble className={iconClass} />;
      case 'Applications': return <FileText className={iconClass} />;
      case 'Payments': return <CreditCard className={iconClass} />;
      case 'Maintenance': return <Wrench className={iconClass} />;
      case 'Announcements': return <Megaphone className={iconClass} />;
      default: return <LayoutDashboard className={iconClass} />;
    }
  };

  // Define links based on role
  let navLinks = [];
  if (!role) {
    navLinks = [
      { name: 'Home', href: '/' },
      { name: 'Rooms', href: '/public/rooms' },
    ];
  } else if (role === 'landlord') {
    navLinks = [
      { name: 'Dashboard', href: '/admin' }, // Ensure these match your folder structure
      { name: 'Rooms', href: '/admin/rooms' },
      { name: 'Applications', href: '/admin/applications' },
      { name: 'Payments', href: '/admin/payments' },
    ];
  } else if (role === 'tenant') {
    navLinks = [
      { name: 'Dashboard', href: '/tenant/dashboard' },
      { name: 'Payments', href: '/tenant/payments' },
      { name: 'Announcements', href: '/tenant/announcements' },
    ];
  }

  return (
    <nav className={`sticky top-0 z-50 w-full px-8 py-4 flex items-center justify-between transition-all duration-300 border-b ${
      isDarkMode 
        ? 'bg-[#0B1120] border-white/5 text-white' 
        : 'bg-white border-slate-200 shadow-sm text-slate-900'
    }`}>
      
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3 group">
          <span className={`text-xl font-bold tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Boarder<span className="text-cyan-500 italic">Q</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-8">
        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 group transition-all ${
                  isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {getIcon(link.name)}
                <span className={`text-[11px] font-bold tracking-wider uppercase transition-colors ${
                  isActive 
                    ? 'text-cyan-500' 
                    : (isDarkMode ? 'text-white' : 'text-slate-600')
                }`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        <div className={`flex items-center gap-4 pl-6 border-l ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
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
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-white/5 text-white/60' : 'hover:bg-slate-100 text-slate-500'
              }`}
            >
              <User size={18} />
            </Link>
          ) : (
            <div className="flex items-center gap-4">
               {/* Show Role Badge */}
               <span className="text-[9px] bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded font-black uppercase tracking-tighter">
                {role}
              </span>
              
              <button 
                onClick={handleLogout}
                className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all text-[10px] font-bold uppercase ${
                  isDarkMode 
                    ? 'bg-white/5 border-white/10 text-white/60 hover:text-red-400 hover:bg-red-500/10' 
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}