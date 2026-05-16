'use client';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-black relative">

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto bg-transparent relative z-10">
        <div className="w-full min-h-full">
          {children}
        </div>
      </main>

      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]" 
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
      </div>
  );
}