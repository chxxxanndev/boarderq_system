'use client';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  
  return (
    <div className="flex flex-col w-full min-h-full bg-transparent relative">

      <main className="relative z-10 w-full h-full">
        <div className="w-full">
          {children}
        </div>
      </main>

      <div className="absolute bottom-10 right-10 z-0 pointer-events-none opacity-5 select-none">
        <h1 className="text-8xl font-black text-[#0B1F3B] tracking-tighter">B-Q</h1>
      </div>
    </div>
  );
}