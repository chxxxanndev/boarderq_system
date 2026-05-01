// app/admin/applications/page.js

'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardList, CheckCircle2, XCircle, Search, 
  Inbox, Clock, Loader2, User, Mail, Phone, MessageSquare, ChevronRight, Activity, Bell
} from 'lucide-react';
import Button from '@/components/Button';

export default function LandlordApplications() {
  const [apps, setApps] = useState([]);
  const [statsData, setStatsData] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Modal States
  const [selectedApp, setSelectedApp] = useState(null);
  const [actionModal, setActionModal] = useState({ show: false, type: null, id: null });

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/admin/applications');
      const data = await res.json();
      setApps(data.applications || []);
      setStatsData({
        total: data.stats?.total ?? 0,
        pending: data.stats?.pending ?? 0,
        approved: data.stats?.approved ?? 0,
        rejected: data.stats?.rejected ?? 0
      });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchApplications();
  }, []);

  const handleStatusChange = async () => {
    const { id, type } = actionModal;
    try {
      const res = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: type }),
      });
      if (res.ok) {
        setActionModal({ show: false, type: null, id: null });
        setSelectedApp(null);
        fetchApplications();
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const formatValue = (val) => (val ?? 0).toString().padStart(2, '0');

  const stats = [
    { label: 'Total Received', value: formatValue(statsData?.total), icon: Inbox, bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'Pending Review', value: formatValue(statsData?.pending), icon: Clock, bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
    { label: 'Approved', value: formatValue(statsData?.approved), icon: CheckCircle2, bgColor: 'bg-[#0B1F3B]', textColor: 'text-white' },
    { label: 'Rejected', value: formatValue(statsData?.rejected), icon: XCircle, bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
  ];

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] font-sans text-[#1E5EFF]">
      <Loader2 className="animate-spin mr-2" /> ACCESSING SECURE ARCHIVES...
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
              <span className="text-[#0B1F3B]">TENANT</span>
              <span className="text-[#1E5EFF]"> APPLICATIONS</span>
            </h1>
            <p className="text-[#6B7280] text-[10px] font-black tracking-[0.3em] uppercase mt-2">Applicant Record Management</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl shadow-sm">
            <Activity className="w-4 h-4 text-emerald-500" />
            <span className="text-[#0B1F3B] text-[10px] font-black uppercase tracking-widest italic">Live Feed Status: Syncing</span>
          </div>
        </div>

        {/* Stats Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bgColor} p-6 rounded-2xl flex flex-col justify-between h-40 shadow-sm border border-[#E5E7EB]/50 relative overflow-hidden group transition-all hover:shadow-md`}>
              <div className="z-10">
                <h2 className={`text-[11px] font-black uppercase tracking-widest mb-1 ${stat.textColor === 'text-white' ? 'opacity-70' : 'text-[#6B7280]'}`}>{stat.label}</h2>
                <p className={`text-4xl font-black tracking-tighter ${stat.textColor}`}>{stat.value}</p>
              </div>
              <stat.icon className={`absolute -right-4 -bottom-4 opacity-10 -rotate-12 transition-transform group-hover:rotate-0 ${stat.textColor === 'text-white' ? 'text-white' : 'text-[#0B1F3B]'}`} size={110} />
              {stat.bgColor === 'bg-white' && <div className="absolute top-0 left-0 w-full h-1.5 bg-[#22D3EE]"></div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main List Area */}
          <div className="xl:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-8 flex flex-col shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1E5EFF]"></div>
            
            <div className="flex justify-between items-center mb-8 border-b border-[#E5E7EB] pb-5">
              <h2 className="text-sm font-black text-[#0B1F3B] uppercase tracking-widest flex items-center gap-3">
                <ClipboardList className="text-[#1E5EFF] w-5 h-5" /> Pending Queue
              </h2>
              <button onClick={fetchApplications} className="bg-[#F8FAFC] border border-[#E5E7EB] text-[#0B1F3B] text-[10px] font-black px-5 py-2 rounded-xl hover:bg-[#1E5EFF] hover:text-white transition-all uppercase tracking-widest">
                Refresh Feed
              </button>
            </div>
            
            <div className="space-y-4">
              {apps.length > 0 ? (
                apps.map((app, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedApp(app)}
                    className="bg-[#F8FAFC] hover:bg-white border border-transparent hover:border-[#1E5EFF] p-5 rounded-xl flex items-center justify-between group cursor-pointer shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#1E5EFF] group-hover:bg-[#1E5EFF] group-hover:text-white transition-all">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-black text-[#0B1F3B] uppercase text-lg leading-none mb-1 group-hover:text-[#1E5EFF]">{app.applicant_name}</h4>
                        <span className="text-[10px] font-bold text-[#6B7280] tracking-widest uppercase">Target Unit: {app.room_name}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="hidden md:flex items-center gap-2 text-[11px] font-bold text-[#6B7280] uppercase">
                        <Clock size={14} className="text-[#1E5EFF]" /> {new Date(app.applied_at).toLocaleDateString()}
                      </div>
                      <ChevronRight className="text-[#E5E7EB] group-hover:text-[#1E5EFF] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-24 text-center border-2 border-dashed border-[#E5E7EB] rounded-2xl bg-[#F8FAFC]">
                  <Inbox className="w-12 h-12 text-[#E5E7EB] mx-auto mb-4" />
                  <p className="text-[#6B7280] font-black text-[11px] uppercase tracking-widest">No pending applications found</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0B1F3B] p-8 rounded-2xl shadow-xl border-l-4 border-[#22D3EE]">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-white flex items-center gap-2">
                <Search className="text-[#22D3EE] w-4 h-4" /> Search Tools
              </h3>
              <div className="space-y-3">
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
                  <input type="text" placeholder="ID OR NAME..." className="w-full bg-white/5 border border-white/10 p-3 pl-12 rounded-xl text-white text-xs outline-none focus:border-[#22D3EE]" />
                </div>
                <Button variant="outline" className="w-full justify-start rounded-xl border-white/20 text-white hover:bg-white/10 text-[11px] h-14">
                  <Inbox className="mr-3 w-5 h-5" /> View History Log
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* --- UNIFORM PORTAL MODALS --- */}
        {mounted && createPortal(
          <AnimatePresence>
            {/* 1. DETAIL VIEW MODAL */}
            {selectedApp && (
              <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setSelectedApp(null)}
                  className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md cursor-pointer" />
                <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  onClick={e => e.stopPropagation()}
                  className="relative bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[90vh]"
                >
                  <div className="p-8 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F8FAFC]">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-[#0B1F3B]">Review <span className="text-[#1E5EFF]">Application</span></h2>
                    <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-gray-200 rounded-full text-[#6B7280]"><XCircle size={24}/></button>
                  </div>
                  
                  <div className="p-8 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-8 mb-8">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-[#6B7280] uppercase">Applicant Full Name</label>
                        <p className="font-black text-[#0B1F3B] text-xl border-b-2 border-[#E5E7EB] pb-2">{selectedApp.applicant_name}</p>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-[#6B7280] uppercase">Interested In</label>
                        <p className="font-black text-[#1E5EFF] text-xl border-b-2 border-[#1E5EFF]/20 pb-2">{selectedApp.room_name}</p>
                      </div>
                    </div>

                    <div className="space-y-6 mb-10">
                      <div className="flex items-center gap-4 text-[#0B1F3B] font-bold">
                        <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center border border-[#E5E7EB]"><Mail size={18} /></div>
                        <div><p className="text-[9px] text-[#6B7280] uppercase">Email Address</p>{selectedApp.applicant_email}</div>
                      </div>
                      <div className="flex items-center gap-4 text-[#0B1F3B] font-bold">
                        <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center border border-[#E5E7EB]"><Phone size={18} /></div>
                        <div><p className="text-[9px] text-[#6B7280] uppercase">Contact Number</p>{selectedApp.applicant_phone || 'Not Provided'}</div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-[#6B7280] uppercase flex items-center gap-2"><MessageSquare size={14}/> Applicant's Message</label>
                         <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB] text-sm italic text-[#0B1F3B] min-h-[100px]">
                           {selectedApp.message || 'No additional message provided.'}
                         </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => setActionModal({ show: true, type: 'approved', id: selectedApp.id })}
                        className="flex-1 py-5 bg-[#14B8A6] hover:bg-[#0F9D8B] text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-3"
                      >
                        <CheckCircle2 size={18} /> Approve
                      </button>
                      <button 
                        onClick={() => setActionModal({ show: true, type: 'rejected', id: selectedApp.id })}
                        className="flex-1 py-5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-3"
                      >
                        <XCircle size={18} /> Reject
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* 2. CONFIRMATION MODAL */}
            {actionModal.show && (
              <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setActionModal({ show: false, type: null, id: null })}
                  className="absolute inset-0 bg-[#0B1F3B]/90 backdrop-blur-xl cursor-pointer" />
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                  className="relative bg-white rounded-[2rem] w-full max-w-sm shadow-2xl p-10 text-center"
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${actionModal.type === 'approved' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                    {actionModal.type === 'approved' ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
                  </div>
                  <h3 className="text-2xl font-black text-[#0B1F3B] uppercase tracking-tight mb-3">Final Decision?</h3>
                  <p className="text-xs text-[#6B7280] font-bold uppercase tracking-widest leading-relaxed mb-10">
                    Are you sure you want to <span className={actionModal.type === 'approved' ? 'text-emerald-500' : 'text-rose-500'}>{actionModal.type}</span> this application?
                  </p>
                  <div className="flex gap-4">
                    <button onClick={() => setActionModal({ show: false, type: null, id: null })} className="flex-1 py-4 bg-[#F8FAFC] text-[#6B7280] font-black uppercase text-[10px] rounded-xl hover:bg-[#E5E7EB]">Cancel</button>
                    <button onClick={handleStatusChange} className={`flex-1 py-4 text-white font-black uppercase text-[10px] rounded-xl shadow-lg ${actionModal.type === 'approved' ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-rose-500 shadow-rose-500/20'}`}>Confirm</button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </main>
    </div>
  );
}