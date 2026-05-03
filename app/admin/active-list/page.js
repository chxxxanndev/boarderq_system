'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Mail, Home, Trash2, Calendar, ShieldCheck, 
  LogOut, ChevronRight, Loader2, Search, Info 
} from 'lucide-react';
import Button from '@/components/Button';
import AdminFooter from '@/components/AdminFooter'; 


export default function ActiveList() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [tenantToMoveOut, setTenantToMoveOut] = useState(null); // Custom modal state

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const res = await fetch('/api/admin/active-list', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        setTenants(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Connection Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    setMounted(true);
    fetchData(); 
  }, []);

  const confirmMoveOut = async () => {
    if (!tenantToMoveOut) return;
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`/api/admin/active-list`, { 
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: tenantToMoveOut.tenancy_id }) 
      });
      
      if (res.ok) {
        setTenantToMoveOut(null);
        fetchData();
      }
    } catch (err) { console.error(err); }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] font-sans text-[#1E5EFF]">
      <Loader2 className="animate-spin mr-2" /> LOADING RESIDENT DATABASE...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-12 font-sans text-[#0B1F3B]">
      <main className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
              ACTIVE <span className="text-[#1E5EFF]">RESIDENTS</span>
            </h1>
            <p className="text-[#6B7280] text-[10px] font-black tracking-[0.3em] uppercase mt-2">Occupancy & Lease Management</p>
          </div>
          <div className="bg-white border border-[#E5E7EB] px-5 py-2 rounded-xl flex items-center gap-3 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[#0B1F3B] text-[10px] font-black uppercase tracking-widest">Real-time Data Sync</span>
          </div>
        </div>

        {/* Summary Card - Standard Brand Card */}
        <div className="bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] w-full max-w-sm p-8 rounded-2xl mb-10 shadow-lg shadow-blue-500/20 flex justify-between items-center relative overflow-hidden">
            <div className="z-10">
                <p className="text-[11px] font-black uppercase text-white/70 mb-2 tracking-widest">Active Tenancies</p>
                <span className="text-6xl font-black text-white leading-none">
                    {tenants.length.toString().padStart(2, '0')}
                </span>
            </div>
            <Users size={64} className="text-white opacity-20 absolute -right-4 -bottom-4 -rotate-12" />
        </div>

        {/* Resident Table Wrapper */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
                  <th className="px-8 py-6 text-[11px] font-black uppercase text-[#6B7280] tracking-widest">Resident</th>
                  <th className="px-8 py-6 text-[11px] font-black uppercase text-[#6B7280] tracking-widest">Unit Allocation</th>
                  <th className="px-8 py-6 text-[11px] font-black uppercase text-[#6B7280] tracking-widest">Lease Timeline</th>
                  <th className="px-8 py-6 text-right text-[11px] font-black uppercase text-[#6B7280] tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {tenants.map((t) => (
                  <tr key={t.tenancy_id} className="hover:bg-[#F8FAFC] transition-all group">
                    <td className="px-8 py-6">
                      <p className="text-base font-black uppercase text-[#0B1F3B] tracking-tight group-hover:text-[#1E5EFF] transition-colors">{t.tenant_name}</p>
                      <div className="flex items-center gap-2 text-[10px] text-[#6B7280] font-bold uppercase mt-1">
                        <Mail size={12} className="text-[#1E5EFF]" /> {t.tenant_email}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                          <div className="p-2 bg-[#1E5EFF]/10 rounded-lg text-[#1E5EFF]"><Home size={18} /></div>
                          <div>
                              <p className="text-sm font-black uppercase text-[#0B1F3B]">{t.room_name}</p>
                              <p className="text-[10px] text-[#6B7280] font-black">RATE: ₱{Number(t.monthly_rate).toLocaleString()}</p>
                          </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-[10px] font-black text-[#6B7280] uppercase">
                              <Calendar size={12} className="text-[#1E5EFF]" /> In: {new Date(t.move_in_date).toLocaleDateString()}
                          </div>
                          {t.move_out_date && (
                          <div className="flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase bg-rose-50 w-fit px-2 py-0.5 rounded">
                              <LogOut size={12} /> Scheduled: {new Date(t.move_out_date).toLocaleDateString()}
                          </div>
                          )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => setTenantToMoveOut(t)}
                        className="bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 ml-auto"
                      >
                        <Trash2 size={14} /> Process Move-out
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {tenants.length === 0 && (
            <div className="py-24 text-center">
              <Info className="mx-auto text-[#E5E7EB] mb-4" size={48} />
              <p className="text-[#6B7280] font-black text-xs uppercase tracking-widest">No active residents found</p>
            </div>
          )}
        </div>

      <AdminFooter />
  
      </main>

      {/* --- UNIFORM PORTAL CONFIRMATION MODAL --- */}
      {mounted && createPortal(
        <AnimatePresence>
          {tenantToMoveOut && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setTenantToMoveOut(null)}
                className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md cursor-pointer" 
              />
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={e => e.stopPropagation()}
                className="relative bg-white rounded-[2.5rem] w-full max-w-sm shadow-2xl border border-[#E5E7EB] p-10 text-center overflow-hidden"
              >
                {/* Brand Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-rose-500"></div>

                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <LogOut size={36} />
                </div>
                <h2 className="text-2xl font-black text-[#0B1F3B] uppercase tracking-tight mb-2">Process Move-out?</h2>
                <p className="text-xs text-[#6B7280] font-bold uppercase tracking-widest leading-relaxed mb-10">
                  Confirm immediate departure for <span className="text-[#0B1F3B] underline">{tenantToMoveOut.tenant_name}</span> from <span className="text-[#1E5EFF]">{tenantToMoveOut.room_name}</span>.
                </p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setTenantToMoveOut(null)}
                    className="flex-1 py-4 bg-[#F8FAFC] text-[#6B7280] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#E5E7EB] transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmMoveOut}
                    className="flex-1 py-4 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}