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
    /* CHANGED: bg-white/70 and border-b for visibility on the light background */
    <nav className="flex items-center justify-between px-10 pt-10 pb-6 sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100/50">
      
      {/* 1. LEFT SIDE: Small Branding/Logo */}
      <div className="w-48 hidden md:block">
        {/* CHANGED: text-cyan-600 for better contrast */}
        <Link href="/" className="text-xl font-black italic text-cyan-600 tracking-tighter glow-text uppercase">
          Boarder-Q
        </Link>
      </div>

      {/* 2. CENTER: The Pill Navigation Links */}
      {/* CHANGED: bg-white with slate-200 border and a softer shadow */}
      <div className="flex items-center gap-1 bg-white p-1.5 rounded-full border border-slate-200 shadow-lg">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                isActive
                  /* CHANGED: Active state - text-cyan-700, bg-cyan-50 */
                  ? 'text-cyan-700 border-cyan-200 bg-cyan-50 shadow-sm'
                  /* CHANGED: Inactive state - text-slate-500, hover:bg-slate-50 */
                  : 'text-slate-500 border-transparent hover:text-cyan-600 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* 3. RIGHT SIDE: Action Buttons */}
      <div className="w-48 flex justify-end items-center gap-3">
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