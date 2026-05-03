'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Wrench, ChevronRight, Clock, ShieldAlert, CheckCircle2, X, Loader2, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext'; 
import TenantFooter from '@/components/TenantFooter';


export default function TenantMaintenance() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null); // State for viewing ticket details
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const userData = JSON.parse(window.atob(base64));
        setUser(userData);
      } catch (e) {
        console.error("Token decoding failed", e);
      }
    }
  }, []);

  const fetchRequests = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch('/api/maintenance', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setRequests(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowSuccess(true); 
        setFormData({ title: '', description: '' });
        fetchRequests(); 
        
        setTimeout(() => {
          setIsModalOpen(false);
          setShowSuccess(false);
        }, 4000);
      }
    } catch (err) {
        console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { label: 'Active Repairs', value: requests.filter(r => r.status !== 'resolved').length, bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'Completed', value: requests.filter(r => r.status === 'resolved').length, bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
    { label: 'Pending Review', value: requests.filter(r => r.status === 'pending').length, bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
  ];

  if (!loading && !localStorage.getItem('token')) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC] p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-xl font-black uppercase text-[#0B1F3B]">Identity Required</h1>
        <p className="text-[#6B7280] text-[10px] mt-2 uppercase font-black tracking-widest">Please sign in to access maintenance logs</p>
        <Button className="mt-8 px-12" onClick={() => window.location.href = '/login'}>Proceed to Login</Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="relative flex-1 p-4 md:p-8 lg:p-12 max-w-6xl mx-auto overflow-hidden">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase leading-none">
              MAINTENANCE <span className="text-[#1E5EFF]">TRACKER</span>
            </h1>
            <p className="text-[#6B7280] text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mt-1">
              Logged in: <span className="text-[#1E5EFF]">{user?.name || 'Authorized Tenant'}</span>
            </p>
          </div>

          <Button 
            onClick={() => { setShowSuccess(false); setIsModalOpen(true); }}
            className="w-full md:w-auto rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#1E5EFF] text-white text-[11px] tracking-[0.1em] font-black h-14 border-none px-10 shadow-lg"
          >
            <Plus className="mr-3 w-5 h-5" /> FILE NEW REPAIR
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bgColor} p-4 md:p-6 rounded-2xl flex flex-col items-center justify-center h-32 md:h-40 shadow-sm border border-[#E5E7EB]/50 text-center relative overflow-hidden transition-all last:col-span-2 md:last:col-span-1`}>
              <h2 className={`text-[9px] md:text-[11px] font-black uppercase mb-1 tracking-widest ${stat.textColor === 'text-white' ? 'opacity-80' : 'text-[#6B7280]'}`}>
                {stat.label}
              </h2>
              <p className={`text-3xl md:text-5xl font-black tracking-tighter ${stat.textColor}`}>
                {String(stat.value).padStart(2, '0')}
              </p>
              <Wrench className={`absolute -right-4 -bottom-4 w-16 h-16 md:w-20 md:h-20 -rotate-12 opacity-10 ${stat.textColor === 'text-white' ? 'text-white' : 'text-[#0B1F3B]'}`} />
              {stat.bgColor === 'bg-white' && <div className="absolute top-0 left-0 w-full h-1.5 bg-[#22D3EE]"></div>}
            </div>
          ))}
        </div>

        {/* Request List Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-[40px] p-4 md:p-10 flex flex-col shadow-sm relative overflow-hidden min-h-[400px]">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1E5EFF]"></div>
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
            <h2 className="text-sm font-black text-[#0B1F3B] uppercase tracking-widest flex items-center gap-3">
              <span className="w-3 h-3 bg-[#22D3EE] rounded-full animate-pulse"></span>
              Live Service Logs
            </h2>
          </div>
          <div className="space-y-4">
            {loading ? (
               <div className="flex flex-col items-center py-20 text-[#6B7280]">
                 <Loader2 className="w-8 h-8 animate-spin mb-4" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Querying System...</span>
               </div>
            ) : requests.length > 0 ? (
              requests.map((request) => (
              <div 
                key={request.id} 
                onClick={() => setSelectedRequest(request)} // Clickable item
                className="group bg-[#F8FAFC] hover:bg-white border border-transparent hover:border-[#1E5EFF] transition-all p-6 rounded-3xl flex items-center justify-between shadow-sm cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white border border-[#E5E7EB] flex items-center justify-center rounded-2xl group-hover:bg-[#1E5EFF] group-hover:text-white transition-all shadow-sm">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#0B1F3B] uppercase text-lg leading-tight mb-1">
                      {request.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-[#6B7280] tracking-widest uppercase">
                      <span className="bg-[#E5E7EB] px-2.5 py-1 rounded-lg text-[9px] text-[#0B1F3B]">
                        {request.room_name}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 italic">
                        <Clock size={12} className="text-[#1E5EFF]" /> 
                        {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <StatusBadge status={request.status} />
                  <ChevronRight size={20} className="text-[#E5E7EB] group-hover:text-[#1E5EFF] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
            ) : (
              <div className="py-24 text-center border-2 border-dashed border-[#E5E7EB] rounded-[32px] bg-[#F8FAFC]">
                 <ShieldAlert className="mx-auto w-12 h-12 text-[#E5E7EB] mb-4" />
                 <p className="text-[#6B7280] font-black text-[11px] uppercase tracking-widest">No active logs found</p>
              </div>
            )}
          </div>
        </div>

        {/* --- MODAL: CREATE TICKET --- */}
        <AnimatePresence>
            {isModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#0B1F3B]/60 backdrop-blur-md" />

                <motion.div 
                  initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} 
                  className="bg-white rounded-[45px] w-full max-w-lg relative z-10 shadow-2xl flex flex-col overflow-hidden"
                >
                  <div className="px-10 py-8 flex items-center justify-between border-b border-gray-100">
                    <h3 className="font-black uppercase tracking-tight text-3xl text-[#0B1F3B]">
                      ADD <span className="text-[#1E5EFF]">TICKET</span>
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-[#0B1F3B]/30 hover:text-[#0B1F3B] transition-colors">
                      <X size={32} strokeWidth={2.5} />
                    </button>
                  </div>

                  <div className="p-10 space-y-8">
                    <AnimatePresence>
                      {showSuccess && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                          className="p-6 bg-[#011B27] border border-[#00FFA3] rounded-3xl flex items-center gap-4"
                        >
                          <div className="w-7 h-7 rounded-full border-2 border-[#00FFA3] flex items-center justify-center shrink-0">
                            <CheckCircle2 size={16} className="text-[#00FFA3]" />
                          </div>
                          <p className="text-[#00FFA3] text-[11px] font-black uppercase tracking-[0.1em] leading-snug">
                            Ticket successfully logged: monitor your email for admin approval.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div>
                        <label className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-3 ml-1">Subject</label>
                        <input 
                          required
                          placeholder="e.g. Electrical Issue"
                          className="w-full bg-[#F8FAFC] border-none rounded-[20px] px-7 py-6 text-sm font-bold text-[#0B1F3B] placeholder:text-[#CBD5E1] focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-3 ml-1">Description</label>
                        <textarea 
                          required rows={4}
                          placeholder="Describe the maintenance request..."
                          className="w-full bg-[#F8FAFC] border-none rounded-[20px] px-7 py-6 text-sm font-bold text-[#0B1F3B] placeholder:text-[#CBD5E1] focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all resize-none"
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                      </div>

                      <button 
                        type="submit" disabled={isSubmitting || showSuccess}
                        className="w-full h-[72px] bg-[#00CFE8] hover:bg-[#00B8D4] text-[#0B1F3B] italic font-black uppercase tracking-[0.15em] text-[15px] rounded-[20px] shadow-xl shadow-[#00CFE8]/30 transition-all active:scale-[0.97] flex items-center justify-center disabled:opacity-50"
                      >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : "INITIALIZE TICKET NODE"}
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
        </AnimatePresence>

        {/* --- MODAL: VIEW TICKET DETAILS --- */}
        <AnimatePresence>
          {selectedRequest && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedRequest(null)} className="absolute inset-0 bg-[#0B1F3B]/60 backdrop-blur-md" />
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }} 
                className="bg-white rounded-[45px] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl"
              >
                <div className="px-10 py-8 flex justify-between items-center border-b border-gray-100">
                  <h3 className="font-black uppercase tracking-tight text-3xl text-[#0B1F3B]">
                    TICKET <span className="text-[#1E5EFF]">DETAILS</span>
                  </h3>
                  <button onClick={() => setSelectedRequest(null)} className="text-[#0B1F3B]/30 hover:text-[#0B1F3B] transition-colors">
                    <X size={32} strokeWidth={2.5} />
                  </button>
                </div>

                <div className="p-10 space-y-10">
                  <div>
                    <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-3">Service Log Description</label>
                    <p className="text-2xl font-black text-[#0B1F3B] italic leading-tight">{selectedRequest.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-10">
                    <div>
                       <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-2">Location</label>
                       <p className="text-base font-black text-[#0B1F3B] uppercase flex items-center gap-2">
                         <MapPin size={16} className="text-[#1E5EFF]" /> {selectedRequest.room_name}
                       </p>
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-2">Logged Date</label>
                       <p className="text-base font-black text-[#0B1F3B] uppercase flex items-center gap-2">
                         <Clock size={16} className="text-[#1E5EFF]" /> {new Date(selectedRequest.created_at).toLocaleDateString()}
                       </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-3">Live Processing Status</label>
                    <div className="flex items-center">
                       <StatusBadge status={selectedRequest.status} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <TenantFooter />

      </main>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-amber-50 text-amber-600 border-amber-200',
    received: 'bg-blue-50 text-blue-600 border-blue-200',
    in_progress: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    resolved: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  };

  return (
    <div className={`text-[9px] font-black px-4 py-2 rounded-xl flex items-center gap-2 tracking-widest border uppercase ${styles[status] || styles.pending}`}>
      {status === 'resolved' ? <CheckCircle2 size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
      {status.replace('_', ' ')}
    </div>
  );
}