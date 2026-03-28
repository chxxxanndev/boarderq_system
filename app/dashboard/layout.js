// app/dashboard/layout.js
'use client';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  
  // This automatically determines which sidebar item is active based on the URL
  const getActiveTab = () => {
    if (pathname.includes('/rooms')) return 'rooms';
    if (pathname.includes('/applications')) return 'applications';
    if (pathname.includes('/payments')) return 'payments';
    if (pathname.includes('/maintenance')) return 'maintenance';
    return 'dashboard';
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden">
      {/* 1. THE ONLY SIDEBAR INSTANCE */}
      <Sidebar active={getActiveTab()} />

      {/* 2. PAGE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto bg-slate-950/50">
        <div className="max-w-7xl mx-auto p-8 lg:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}