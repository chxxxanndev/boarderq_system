'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Wrench, CheckCircle2, Clock, AlertTriangle, Hammer,
  Search, ChevronRight, HelpCircle, Plus, Filter, Activity, Settings2, Loader2, X, MapPin, User, ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';
import AdminFooter from '@/components/AdminFooter'; 

export default function LandlordMaintenance() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true); 
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      const res = await fetch('/api/maintenance', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    setIsUpdating(true);
    try {
      const res = await fetch('/api/maintenance', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        fetchRequests();
        setSelectedRequest(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const stats = [
    { label: 'Total Logs', value: requests.length, bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'Pending', value: requests.filter(r => r.status === 'pending').length, bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
    { label: 'In Progress', value: requests.filter(r => r.status === 'in_progress').length, bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'Resolved', value: requests.filter(r => r.status === 'resolved').length, bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
  ];

  const filteredRequests = requests.filter(req => {
    const matchesSearch = (req.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) || 
                          (req.room_name?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || req.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto overflow-x-hidden">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase leading-none text-[#0B1F3B]">
              MAINTENANCE <span className="text-[#1E5EFF]">LOGS</span>
            </h1>
            <p className="text-[#6B7280] text-[10px] font-black tracking-[0.3em] uppercase mt-2">Facility Service & Control Panel</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bgColor} p-6 rounded-[32px] flex flex-col justify-center items-center h-32 md:h-40 shadow-sm border border-[#E5E7EB]/50 relative overflow-hidden transition-all`}>
              <h2 className={`text-[9px] md:text-[11px] font-black uppercase tracking-widest mb-1 ${stat.textColor === 'text-white' ? 'opacity-70' : 'text-[#6B7280]'}`}>
                {stat.label}
              </h2>
              <p className={`text-3xl md:text-5xl font-black tracking-tighter ${stat.textColor}`}>
                {String(stat.value).padStart(2, '0')}
              </p>
              {stat.bgColor === 'bg-white' && <div className="absolute top-0 left-0 w-full h-1.5"></div>}
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input 
              type="text" 
              placeholder="SEARCH BY ROOM OR ISSUE..." 
              className="w-full bg-white border border-[#E5E7EB] rounded-2xl py-4 pl-12 pr-6 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-[#1E5EFF]/5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="bg-white border border-[#E5E7EB] rounded-2xl px-6 py-4 text-[11px] font-black uppercase tracking-widest outline-none cursor-pointer hover:bg-gray-50 transition-colors"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="received">Received</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-[40px] p-6 md:p-10 shadow-sm relative min-h-[500px]">
          <div className="absolute top-0 left-0"></div>

          <div className="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
            <h2 className="text-sm font-black text-[#0B1F3B] uppercase tracking-widest flex items-center gap-3">
               <span className="w-3 h-3 bg-[#22D3EE] rounded-full animate-pulse"></span> Queue Management
            </h2>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-[#6B7280]">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#1E5EFF]" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Retrieving System Records...</p>
              </div>
            ) : filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  key={request.id} 
                  onClick={() => setSelectedRequest(request)}
                  className="group bg-[#F8FAFC] hover:bg-white border border-transparent hover:border-[#1E5EFF] p-6 rounded-3xl flex items-center justify-between shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white border border-[#E5E7EB] rounded-2xl flex items-center justify-center text-[#0B1F3B] group-hover:bg-[#1E5EFF] group-hover:text-white transition-all">
                      <Wrench size={24} />
                    </div>
                    <div>
                      <h4 className="font-black text-[#0B1F3B] uppercase text-lg leading-tight mb-1">
                        {request.title}
                      </h4>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-[#6B7280] tracking-widest uppercase">
                        <span className="flex items-center gap-1.5"><User size={12}/> {request.tenant_name}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5"><MapPin size={12}/> {request.room_name || `Unit ${request.room_id}`}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col items-end">
                      <StatusBadge status={request.status} />
                      <span className="text-[9px] font-black uppercase tracking-widest mt-2 text-[#94A3B8] italic flex items-center gap-1">
                        <Clock size={10} /> {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <ChevronRight className="text-[#E5E7EB] group-hover:text-[#1E5EFF] group-hover:translate-x-1 transition-all w-5 h-5" />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="py-32 text-center border-2 border-dashed border-[#E5E7EB] rounded-[32px] bg-[#F8FAFC]">
                <AlertTriangle className="w-16 h-16 text-[#E5E7EB] mx-auto mb-4" />
                <p className="text-[#6B7280] font-black text-[11px] uppercase tracking-widest">No matching service tickets found</p>
              </div>
            )}
          </div>
        </div>

        {mounted && createPortal(
          <AnimatePresence>
            {selectedRequest && (
              <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedRequest(null)}
                  className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md cursor-pointer"
                />

                <motion.div 
                  initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                  animate={{ scale: 1, opacity: 1, y: 0 }} 
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  onClick={e => e.stopPropagation()}
                  className="bg-white rounded-[32px] w-full max-w-2xl relative z-10 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
                >

                  <div className="px-8 py-6 flex justify-between items-center border-b border-gray-100 bg-[#F8FAFC]">
                    <h3 className="font-black uppercase tracking-tight text-2xl text-[#0B1F3B]">
                      TICKET <span className="text-[#1E5EFF]">DETAILS</span>
                    </h3>

                    <button 
                      onClick={() => setSelectedRequest(null)} 
                      className="text-[#0B1F3B]/30 hover:text-[#0B1F3B] transition-colors"
                    >
                      <X size={28} strokeWidth={2.5} />
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-8 space-y-8">

                    <div>
                      <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-3">
                        Resident Evidence Attachment
                      </label>
                      {selectedRequest.photo_url ? (
                        <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm bg-gray-50">
                          <img 
                            src={selectedRequest.photo_url} 
                            alt="Evidence" 
                            className="w-full h-auto object-cover max-h-[350px]" 
                          />
                        </div>
                      ) : (
                        <div className="p-10 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center text-[#94A3B8] bg-gray-50/50">
                          <ImageIcon size={40} className="mb-2 opacity-20" />
                          <span className="text-[9px] font-black uppercase tracking-widest">No Visual Assets Logged</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-2">
                        Issue Description
                      </label>
                      <p className="text-xl font-black text-[#0B1F3B] italic leading-tight bg-[#F8FAFC] p-6 rounded-2xl border border-gray-100">
                        {selectedRequest.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
                        <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-1">
                          Tenant
                        </label>
                        <p className="text-sm font-black text-[#0B1F3B] uppercase">
                          {selectedRequest.tenant_name}
                        </p>
                      </div>

                      <div className="p-4 bg-[#F8FAFC] rounded-xl border border-gray-100">
                        <label className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] block mb-1">
                          Location
                        </label>
                        <p className="text-sm font-black text-[#0B1F3B] uppercase">
                          {selectedRequest.room_name}
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-[#6B7280] uppercase block mb-4 tracking-widest text-center">
                        UPDATE STATUS
                      </label>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#F8FAFC] p-2 rounded-2xl border border-gray-100">
                        {['pending', 'received', 'in_progress', 'resolved'].map((s) => (
                          <button 
                            key={s}
                            disabled={isUpdating}
                            onClick={() => updateStatus(selectedRequest.id, s)}
                            className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                              selectedRequest.status === s 
                                ? 'bg-[#1E5EFF] text-white shadow-lg scale-105' 
                                : 'text-[#6B7280] hover:bg-white hover:text-[#1E5EFF]'
                            }`}
                          >
                            {isUpdating && selectedRequest.status === s 
                              ? <Loader2 size={12} className="animate-spin mx-auto" /> 
                              : s.replace('_', ' ')
                            }
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

        <AdminFooter />

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
    <div className={`px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${styles[status] || styles.pending}`}>
      {status === 'resolved' ? <CheckCircle2 size={12} /> : <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
      {status.replace('_', ' ')}
    </div>
  );
}