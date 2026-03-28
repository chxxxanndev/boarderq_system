'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './Button'; // Import your reusable button
import { LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Tenants', href: '/dashboard/applications' },
    { name: 'Payments', href: '/dashboard/payments' },
    { name: 'Maintenance', href: '/dashboard/maintenance' },
    { name: 'Announcements', href: '/tenant/announcements' },
  ];

  return (
    <nav className="flex items-center justify-between px-10 pt-10 pb-6 sticky top-0 z-50 bg-slate-950/50 backdrop-blur-md">
      
      {/* 1. LEFT SIDE: Small Branding/Logo */}
      <div className="w-48 hidden md:block">
        <Link href="/" className="text-xl font-black italic text-cyan-400 tracking-tighter glow-text uppercase">
          Boarder-Q
        </Link>
      </div>

      {/* 2. CENTER: The Pill Navigation Links */}
      <div className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800/50 shadow-2xl">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                isActive
                  ? 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                  : 'text-slate-400 border-transparent hover:text-cyan-400 hover:bg-slate-800'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* 3. RIGHT SIDE: Action Buttons (Re-usable CTA) */}
      <div className="w-48 flex justify-end items-center gap-3">
        {/* Logic: If on Login page, show 'Sign Up', else show 'Login' */}
        {pathname === '/login' ? (
          <Button variant="primary" size="sm" onClick={() => window.location.href='/register'}>
            <UserPlus className="w-3 h-3" /> Get Started
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={() => window.location.href='/login'}>
            <LogIn className="w-3 h-3" /> Login
          </Button>
        )}
      </div>
    </nav>
  );
}