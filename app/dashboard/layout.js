'use client';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  
  const getActiveTab = () => {
    if (pathname.includes('/rooms')) return 'rooms';
    if (pathname.includes('/applications')) return 'applications';
    if (pathname.includes('/payments')) return 'payments';
    if (pathname.includes('/maintenance')) return 'maintenance';
    return 'dashboard';
  };

  return (
    <div className="flex min-h-[calc(100vh-100px)]">
      <Sidebar active={getActiveTab()} />

      <div className="flex-1 bg-transparent transition-colors duration-300">
        <div className="max-w-6xl mx-auto p-8 lg:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}