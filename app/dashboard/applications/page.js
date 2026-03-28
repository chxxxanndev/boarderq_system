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
    // Replace alert with a subtle UI notification later if possible
    console.log(`Accepted: ${id}`);
  };

  const handleReject = (id) => {
    setApps(apps.filter(app => app.id !== id));
    console.log(`Rejected: ${id}`);
  };

  return (
    <div className="flex min-h-screen">

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 lg:p-12">
        
        {/* SECTION HEADER - Mimics your reference image exactly */}
        <div className="w-full flex items-center gap-6 mb-12">
          <div className="bg-purple-900/40 border border-purple-500/30 px-6 py-2 rounded-sm shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <span className="text-purple-300 font-black text-[11px] tracking-[0.3em] uppercase italic">
              TENANT RECORDS
            </span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
            Applications
          </h1>
          <div className="flex-1 h-[1px] bg-slate-800/60"></div>
        </div>

        {/* STATS SUMMARY (Optional but looks good for Dashboards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="glass-panel p-4 flex items-center justify-between border-l-2 border-l-cyan-500">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Total Pending</p>
              <p className="text-2xl font-bold text-white">{apps.length}</p>
            </div>
            <Inbox className="w-8 h-8 text-slate-700" />
          </div>
        </div>

        {/* 3. APPLICATIONS GRID */}
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
            /* EMPTY STATE - Redesigned for Cyber-Dark Look */
            <div className="col-span-full py-24 flex flex-col items-center justify-center glass-panel border-dashed">
              <div className="bg-slate-900/50 p-6 rounded-full border border-slate-800 mb-6">
                <ClipboardList className="w-12 h-12 text-slate-700 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight uppercase italic">No pending applications</h3>
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