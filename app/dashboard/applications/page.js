'use client';
import Sidebar from '@/components/Sidebar';
import ApplicationCard from '@/components/ApplicationCard';
import { mockApplications } from '@/lib/db';
import { useState } from 'react';
import { ClipboardList, Inbox, CheckCircle2, XCircle } from 'lucide-react';

export default function LandlordApplications() {
  const [apps, setApps] = useState(mockApplications);

  const handleAccept = (id) => {
    setApps(apps.filter(app => app.id !== id));
    console.log(`Accepted: ${id}`);
  };

  const handleReject = (id) => {
    setApps(apps.filter(app => app.id !== id));
    console.log(`Rejected: ${id}`);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      <main className="flex-1 p-8 lg:p-12">
        
        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-purple-500/10 border border-purple-500/20 px-6 py-2 rounded-sm shrink-0 shadow-sm">
            <span className="text-purple-700 font-black text-[11px] tracking-[0.3em] uppercase italic">
              TENANT RECORDS
            </span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Applications
          </h1>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="glass-panel bg-white p-4 flex items-center justify-between border-l-2 border-l-cyan-500 shadow-sm">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-semibold">Total Pending</p>
              <p className="text-2xl font-bold text-slate-900">{apps.length}</p>
            </div>
            <Inbox className="w-8 h-8 text-slate-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.length > 0 ? (
            apps.map((app) => (
              <ApplicationCard 
                key={app.id} 
                application={app} 
                onAccept={() => handleAccept(app.id)}
                onReject={() => handleReject(app.id)}
              />
            ))
          ) : (
            <div className="col-span-full py-24 flex flex-col items-center justify-center glass-panel bg-white/50 border-dashed border-slate-300">
              <div className="bg-slate-100 p-6 rounded-full border border-slate-200 mb-6">
                <ClipboardList className="w-12 h-12 text-slate-300 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight uppercase italic">No pending applications</h3>
              <p className="text-slate-500 text-xs font-mono tracking-widest mt-2 uppercase">
                Database synchronization complete. All clear.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}