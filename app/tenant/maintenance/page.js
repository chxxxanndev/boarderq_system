'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom'; 
import { 
  Plus, Wrench, ChevronRight, Clock, ShieldAlert, CheckCircle2, 
  X, Loader2, MapPin, Upload, ImageIcon 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/Button';
import TenantFooter from '@/components/TenantFooter';

export default function TenantMaintenance() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false); 
  const [showSuccess, setShowSuccess] = useState(false); 
  const [mounted, setMounted] = useState(false);
  
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({ title: '', description: '', photo_url: '' });

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const userData = JSON.parse(window.atob(base64));
        setUser(userData);
      } catch (e) { console.error("Token error", e); }
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
    } catch (err) { console.error("Fetch error:", err); } 
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    try {
      const res = await fetch('/api/rooms/upload', { method: 'POST', body: uploadData });
      const data = await res.json();
      if (data.url) setFormData(prev => ({ ...prev, photo_url: data.url }));
    } catch (error) {
      alert("Photo upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowSuccess(true); 
        setFormData({ title: '', description: '', photo_url: '' });
        fetchRequests(); 
        setTimeout(() => { setIsModalOpen(false); setShowSuccess(false); }, 3000);
      }
    } catch (err) { console.error(err); } 
    finally { setIsSubmitting(false); }
  };

  const stats = [
    { label: 'Active Repairs', value: requests.filter(r => r.status !== 'resolved').length, bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'Completed', value: requests.filter(r => r.status === 'resolved').length, bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
    { label: 'Pending Review', value: requests.filter(r => r.status === 'pending').length, bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
  ];

  if (loading) return <div className="h-screen w-full flex items-center justify-center text-[#1E5EFF]"><Loader2 className="animate-spin mr-2" /> SYNCHRONIZING LOGS...</div>;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="relative flex-1 p-6 md:p-12 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase">MAINTENANCE <span className="text-[#1E5EFF]">TRACKER</span></h1>
            <p className="text-[#6B7280] text-[10px] font-black uppercase tracking-[0.2em] mt-1">Voice your Concerns</p>
          </div>
          <Button onClick={() => { setShowSuccess(false); setIsModalOpen(true); }} className="rounded-xl bg-[#00BCD4] text-white italic font-black h-14 px-10 shadow-lg shadow-cyan-500/20">
            <Plus className="mr-3 w-5 h-5 not-italic" /> FILE NEW REPAIR
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bgColor} p-6 rounded-2xl flex flex-col items-center justify-center h-32 md:h-40 shadow-sm border border-[#E5E7EB]/50 text-center relative overflow-hidden transition-all last:col-span-2 md:last:col-span-1`}>
              <h2 className={`text-[9px] md:text-[11px] font-black uppercase mb-1 tracking-widest ${stat.textColor === 'text-white' ? 'opacity-80' : 'text-[#6B7280]'}`}>{stat.label}</h2>
              <p className={`text-3xl md:text-5xl font-black tracking-tighter ${stat.textColor}`}>{String(stat.value).padStart(2, '0')}</p>
              <Wrench className={`absolute -right-4 -bottom-4 w-20 h-20 opacity-10 -rotate-12 ${stat.textColor === 'text-white' ? 'text-white' : 'text-[#0B1F3B]'}`} />
            </div>
          ))}
        </div>

        {/* Request List */}
        <div className="bg-white border border-[#E5E7EB] rounded-[2.5rem] p-6 md:p-10 shadow-sm relative overflow-hidden min-h-[400px]">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1E5EFF]"></div>
          <h2 className="text-sm font-black text-[#0B1F3B] uppercase tracking-widest mb-8 border-b pb-6">Service History</h2>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} onClick={() => setSelectedRequest(request)} className="group bg-[#F8FAFC] hover:bg-white border border-transparent hover:border-[#1E5EFF] transition-all p-6 rounded-3xl flex items-center justify-between cursor-pointer shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white border flex items-center justify-center rounded-2xl group-hover:bg-[#1E5EFF] group-hover:text-white transition-all shadow-sm"><Wrench size={24} /></div>
                  <div>
                    <h4 className="font-black text-[#0B1F3B] uppercase text-lg leading-tight mb-1">{request.title}</h4>
                    <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest flex items-center gap-2">
                        <Clock size={12} className="text-[#1E5EFF]" /> {new Date(request.created_at).toLocaleDateString()}
                        {request.photo_url && <span className="text-emerald-500 ml-2 font-black">• WITH PHOTO</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={request.status} />
                  <ChevronRight size={20} className="text-[#E5E7EB] group-hover:text-[#1E5EFF] transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- MODAL PORTAL: ADD TICKET (FIXED) --- */}
        {mounted && createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md cursor-pointer" />
                
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} 
                  onClick={e => e.stopPropagation()}
                  className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
                >
                  {/* Modal Header */}
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#F8FAFC] sticky top-0 z-10">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-[#0B1F3B]">
                      ADD <span className="text-[#1E5EFF]">TICKET</span>
                    </h2>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
                      <X size={20} />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="p-8 overflow-y-auto">
                    {showSuccess && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-[#011B27] border border-[#00FFA3] rounded-xl text-[#00FFA3] text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                         <CheckCircle2 size={16}/> Ticket Logged Successfully
                      </motion.div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="text-[10px] font-black text-[#6B7280] uppercase block mb-2 tracking-widest">Visual Evidence (Optional)</label>
                        <div onClick={() => fileInputRef.current.click()} className="relative h-32 w-full bg-[#F8FAFC] border-2 border-dashed border-[#E5E7EB] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#1E5EFF] transition-all overflow-hidden group">
                           {formData.photo_url ? (
                             <img src={formData.photo_url} className="w-full h-full object-cover" alt="Preview" />
                           ) : (
                             <div className="text-center">
                               {isUploading ? <Loader2 className="animate-spin text-[#1E5EFF] mx-auto" /> : <Upload className="text-[#6B7280] mx-auto mb-1 group-hover:text-[#1E5EFF] transition-colors" />}
                               <span className="text-[9px] font-black uppercase text-[#6B7280]">Attach Photo Evidence</span>
                             </div>
                           )}
                           <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*" />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-black text-[#6B7280] uppercase block mb-2 tracking-widest">Subject</label>
                        <input required placeholder="e.g. Broken Sink" className="w-full bg-[#F8FAFC] border-none rounded-xl p-4 text-sm font-black focus:ring-0 outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                      </div>

                      <div>
                        <label className="text-[10px] font-black text-[#6B7280] uppercase block mb-2 tracking-widest">Description</label>
                        <textarea required rows={3} placeholder="Describe the problem..." className="w-full bg-[#F8FAFC] border-none rounded-xl p-4 text-sm font-bold h-32 focus:ring-0 outline-none resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                      </div>
                      
                      <button disabled={isSubmitting || showSuccess || isUploading} type="submit" className="w-full h-14 bg-[#00CFE8] text-[#0B1F3B] italic font-black uppercase tracking-widest rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center">
                        {isSubmitting ? <Loader2 className="animate-spin" /> : "INITIALIZE TICKET NODE"}
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

        {/* --- MODAL PORTAL: VIEW DETAILS --- */}
        {mounted && createPortal(
          <AnimatePresence>
            {selectedRequest && (
              <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedRequest(null)} className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md cursor-pointer" />
                <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} onClick={e => e.stopPropagation()} className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                  <div className="p-6 border-b flex justify-between items-center bg-[#F8FAFC] sticky top-0 z-10">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-[#0B1F3B]">TICKET <span className="text-[#1E5EFF]">DETAILS</span></h2>
                    <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-[#0B1F3B] transition-colors"><X size={20} /></button>
                  </div>
                  <div className="p-8 space-y-6 overflow-y-auto">
                    {selectedRequest.photo_url && (
                        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">
                            <img src={selectedRequest.photo_url} className="w-full h-auto object-cover max-h-60" alt="Evidence" />
                            <p className="p-2 text-center text-[8px] font-black uppercase text-gray-400">Resident Evidence Log</p>
                        </div>
                    )}
                    <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-gray-100">
                      <label className="text-[9px] font-black text-[#6B7280] uppercase tracking-widest block mb-1">Issue Description</label>
                      <p className="text-lg font-black text-[#0B1F3B] italic leading-snug">{selectedRequest.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-[#F8FAFC] rounded-2xl text-center border border-gray-100"><label className="text-[9px] font-black text-[#6B7280] uppercase tracking-widest block mb-1">Status</label><div className="flex justify-center"><StatusBadge status={selectedRequest.status} /></div></div>
                      <div className="p-4 bg-[#F8FAFC] rounded-2xl text-center border border-gray-100"><label className="text-[9px] font-black text-[#6B7280] uppercase tracking-widest block mb-1">Date Logged</label><p className="text-sm font-black text-[#0B1F3B]">{new Date(selectedRequest.created_at).toLocaleDateString()}</p></div>
                    </div>
                    <Button onClick={() => setSelectedRequest(null)} className="w-full h-14 rounded-xl shadow-lg shadow-blue-500/10">DISMISS LOG</Button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

        <TenantFooter />
      </main>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = { pending: 'bg-amber-50 text-amber-600 border-amber-200', received: 'bg-blue-50 text-blue-600 border-blue-200', in_progress: 'bg-cyan-50 text-cyan-600 border-cyan-200', resolved: 'bg-emerald-50 text-emerald-600 border-emerald-200' };
  return <div className={`text-[9px] font-black px-3 py-1.5 rounded-lg flex items-center gap-2 tracking-widest border uppercase ${styles[status] || styles.pending}`}>{status === 'resolved' ? <CheckCircle2 size={10} /> : <div className="w-1 h-1 rounded-full bg-current animate-pulse" />}{status.replace('_', ' ')}</div>;
}