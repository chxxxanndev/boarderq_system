import Link from 'next/link';
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  CreditCard, 
  Wrench, 
  Settings,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ active = 'dashboard' }) {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'rooms', label: 'Manage Rooms', icon: Home, href: '/dashboard/rooms' },
    { id: 'applications', label: 'Applications', icon: Users, href: '/dashboard/applications' },
    { id: 'payments', label: 'Payments', icon: CreditCard, href: '/dashboard/payments' },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench, href: '/dashboard/maintenance' },
  ];

  return (
    <aside className="w-64 bg-slate-950/20 border-r border-slate-800/60 h-[calc(100vh-140px)] sticky top-[140px] hidden md:block">
      <div className="p-4 flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = active === item.id;
          return (
            <Link 
              key={item.id} 
              href={item.href}
              className={`flex items-center justify-between p-3 transition-all duration-300 group ${
                isActive 
                  ? 'bg-cyan-500/10 border-l-2 border-cyan-400 text-cyan-400' 
                  : 'text-slate-500 hover:text-slate-200 hover:bg-slate-900/40 border-l-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-600 group-hover:text-cyan-500'}`} />
                <span className="font-bold text-[11px] uppercase tracking-[0.2em] font-mono">
                  {item.label}
                </span>
              </div>
              {isActive && <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></div>}
            </Link>
          );
        })}
      </div>

      <div className="absolute bottom-6 w-full px-4">
        <Link href="/settings" className="flex items-center gap-3 p-3 text-slate-600 hover:text-cyan-400 transition-colors border-t border-slate-900 pt-6">
          <Settings className="w-4 h-4" />
          <span className="font-bold text-[10px] uppercase tracking-widest font-mono">System Settings</span>
        </Link>
      </div>
    </aside>
  );
}