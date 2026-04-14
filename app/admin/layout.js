'use client';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  
  return (
    /* This container sits inside the "Content Area" of your RootLayout */
    <div className="flex flex-col w-full min-h-full bg-transparent relative">
      
      {/* 
          SCROLLABLE CONTENT AREA 
          We ensure it fills the remaining space under the Navbar
      */}
      <main className="relative z-10 w-full h-full">
        {/* Children contains the specific Admin pages (Dashboard, Rooms, etc.) */}
        <div className="w-full">
          {children}
        </div>
      </main>

      {/* 
          REFINED TECH GRID OVERLAY 
          Using a very light Navy/Gray grid to give it that "Technical SaaS" feel 
          without making it look like dark mode.
      */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]" 
        style={{ 
          backgroundImage: `
            linear-gradient(#E5E7EB 1px, transparent 1px), 
            linear-gradient(90deg, #E5E7EB 1px, transparent 1px)
          `, 
          backgroundSize: '60px 60px' 
        }} 
      />

      {/* Subtle brand accent - bottom right corner decoration */}
      <div className="absolute bottom-10 right-10 z-0 pointer-events-none opacity-5 select-none">
        <h1 className="text-8xl font-black text-[#0B1F3B] tracking-tighter">B-Q</h1>
      </div>
    </div>
  );
}