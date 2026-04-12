'use client';
import React, { useState, useEffect } from 'react';
import { Users, Mail, Home, Trash2, Calendar, ShieldCheck, LogOut } from 'lucide-react';

export default function ActiveList() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token
      
      const res = await fetch('/api/admin/active-list', {
        headers: { 
          'Authorization': `Bearer ${token}`, // Send the token here
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        // If it's 401 or 403, we know it's an auth issue
        if (res.status === 401 || res.status === 403) {
          console.error("Auth Error: You are not authorized to view this.");
          return;
        }
        const errorData = await res.json().catch(() => ({ error: "Server Error" }));
        console.error("Fetch failed:", errorData.error);
        return;
      }

      const data = await res.json();
      setTenants(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Connection Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

const handleMoveOut = async (id) => {
    if (!confirm("Confirm immediate move-out?")) return;
    
    const token = localStorage.getItem('token'); // Get token

    try {
      const res = await fetch(`/api/admin/active-list`, { 
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // ADD THIS
        },
        body: JSON.stringify({ id }) 
      });
      
      if (res.ok) {
        fetchData();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to process move-out");
      }
    } catch (err) { 
      console.error(err); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-[#555] p-8 lg:p-12">
      <main className="max-w-7xl mx-auto">
        <div className="flex items-baseline gap-4 mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none text-white">
            ACTIVE <span className="text-[#00A3CC]">RESIDENTS</span>
          </h1>
          <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] hidden sm:block">
            Occupancy Database v2.0
          </span>
        </div>

        <div className="bg-[#A6A6A6] w-full max-w-sm p-8 mb-10 shadow-2xl border-l-8 border-[#00A3CC] flex justify-between items-center">
            <div>
                <p className="text-[10px] font-black uppercase text-black/60 mb-2">Total Active Tenants</p>
                <span className="text-6xl font-black text-black leading-none">
                    {tenants.length.toString().padStart(2, '0')}
                </span>
            </div>
            <Users size={48} className="text-white opacity-40" />
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-sm overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/60 border-b-2 border-white/5">
                <th className="px-8 py-5 text-[10px] font-black uppercase text-[#00A3CC] tracking-widest">Resident Details</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-[#00A3CC] tracking-widest">Unit Allocation</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-[#00A3CC] tracking-widest">Lease Timeline</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase text-[#00A3CC] tracking-widest">System Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tenants.map((t) => (
                <tr key={t.tenancy_id} className="hover:bg-white/5 transition-all group">
                  <td className="px-8 py-6">
                    <p className="text-base font-black uppercase text-white tracking-tight">{t.tenant_name}</p>
                    <div className="flex items-center gap-2 text-[10px] text-white/40 font-bold uppercase mt-1">
                      <Mail size={12} className="text-[#00A3CC]" /> {t.tenant_email}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-sm"><Home size={16} className="text-white/60" /></div>
                        <div>
                            <p className="text-sm font-black uppercase text-white">{t.room_name}</p>
                            <p className="text-[10px] text-[#00A3CC] font-bold">RATE: ₱{t.monthly_rate}</p>
                        </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[10px] font-black text-white/60 uppercase">
                            <Calendar size={12} className="text-[#00A3CC]" /> IN: {new Date(t.move_in_date).toLocaleDateString()}
                        </div>
                        {t.move_out_date && (
                        <div className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase">
                            <LogOut size={12} /> OUT: {new Date(t.move_out_date).toLocaleDateString()}
                        </div>
                        )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => handleMoveOut(t.tenancy_id)}
                      className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-5 py-2.5 rounded-sm text-[9px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 ml-auto"
                    >
                      <Trash2 size={12} /> Process Move-out
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}