'use client';
import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, CheckCircle2, XCircle, Search, 
  Inbox, Clock, Loader2
} from 'lucide-react';
import Button from '@/components/Button';

export default function LandlordApplications() {
  const [apps, setApps] = useState([]);
  const [statsData, setStatsData] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/admin/applications');
      const data = await res.json();
      setApps(data.applications || []);
      setStatsData(data.stats || { total: 0, pending: 0, approved: 0, rejected: 0 });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        // Refresh data to show updated list and stats
        fetchApplications();
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const stats = [
    { label: 'TOTAL RECEIVED', value: statsData.total.toString().padStart(2, '0'), bgColor: 'bg-[#C5C7C7]' },
    { label: 'PENDING REVIEW', value: statsData.pending.toString().padStart(2, '0'), bgColor: 'bg-[#B0B2B2]' },
    { label: 'APPROVED', value: statsData.approved.toString().padStart(2, '0'), bgColor: 'bg-[#A1A3A3]' },
    { label: 'REJECTED', value: statsData.rejected.toString().padStart(2, '0'), bgColor: 'bg-[#919393]' },
  ];

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-black font-mono text-[#00A3CC]">
      <Loader2 className="animate-spin mr-2" /> LOADING ARCHIVES...
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Header */}
        <div className="flex items-baseline gap-4 mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
            <span className="text-white">TENANT</span>
            <span className="text-[#00A3CC]"> APPLICATIONS</span>
          </h1>
          <span className="text-white text-xs font-bold tracking-[0.3em] uppercase opacity-80">RECORD MODULE</span>
        </div>

        {/* Top Stats Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bgColor} p-5 rounded-sm flex flex-col justify-between h-36 shadow-lg border-t border-white/10`}>
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-black text-black leading-[0.9] uppercase w-1/2">{stat.label}</h2>
                <p className="text-5xl font-black text-white leading-none tracking-tighter">{stat.value}</p>
              </div>
              <div className="flex justify-between items-end border-t border-black/10 pt-2">
                <div className="text-[9px] font-black uppercase tracking-tight text-black/60">System Live Status</div>
                <p className="text-[9px] font-black text-white tracking-widest uppercase">REAL-TIME SYNC</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col">
            <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-3">
              <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">PENDING QUEUE</h2>
              <button onClick={fetchApplications} className="bg-[#333] hover:bg-black text-white text-[10px] font-black px-6 py-2 rounded-xl transition-all tracking-widest uppercase">Refresh</button>
            </div>
            
            <div className="space-y-3">
              {apps.length > 0 ? (
                apps.map((app, i) => (
                  <div key={i} className="bg-[#6F7171] hover:bg-[#5a5c5c] transition-colors p-5 rounded-lg flex items-center justify-between group shadow-md">
                    <div className="w-1/3">
                      <h4 className="font-black text-white uppercase text-xl tracking-tight leading-none mb-1">
                        {app.applicant_name}
                      </h4>
                      <span className="text-[9px] font-bold text-white/40 tracking-widest uppercase">
                        REF: APP-{String(app.id).padStart(4, '0')} 
                      </span>
                    </div>
                    
                    <div className="flex-1 flex justify-between text-[11px] font-bold text-white/90 tracking-widest px-8 border-x border-white/10">
                      <span className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-[#00A3CC]" /> 
                        {new Date(app.applied_at).toLocaleDateString()}
                      </span>
                      <span className="hidden md:block uppercase">{app.room_name}</span>
                    </div>

                    <div className="flex gap-2 ml-8">
                       <button 
                        onClick={() => updateStatus(app.id, 'approved')} 
                        className="p-2 bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-lg transition-all"
                        title="Approve"
                       >
                         <CheckCircle2 className="w-5 h-5" />
                       </button>
                       <button 
                        onClick={() => updateStatus(app.id, 'rejected')} 
                        className="p-2 bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg transition-all"
                        title="Reject"
                       >
                         <XCircle className="w-5 h-5" />
                       </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 flex flex-col items-center justify-center opacity-40">
                  <ClipboardList className="w-16 h-16 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Pending Records</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-xl p-8 border-l-4 border-[#00A3CC] shadow-2xl rounded-r-lg">
              <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-white">Records Admin</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start rounded-xl bg-[#00A3CC] hover:bg-[#008BB3] text-[10px] tracking-[0.2em] font-black h-12 border-none text-black">
                  <Search className="mr-3 w-4 h-4" /> SEARCH APPLICANTS
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl border-white/20 text-white hover:bg-white hover:text-black text-[10px] tracking-[0.2em] font-black h-12">
                  <Inbox className="mr-3 w-4 h-4" /> HISTORY LOG
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}