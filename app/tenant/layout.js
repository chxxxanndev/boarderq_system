'use client';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar'; 

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white relative">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto bg-transparent relative z-10">
        <div className="w-full">
          {children}
        </div>
      </main>

      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
    </div>
  );
}