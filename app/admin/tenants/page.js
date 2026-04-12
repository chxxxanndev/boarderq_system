'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, UserPlus, ShieldAlert, UserCheck, X, 
  Search, Home, Mail, ChevronRight, Loader2, Activity 
} from 'lucide-react';
import Button from '@/components/Button';

export default function TenantAccessControl() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // Modal States
  const [selectedUser, setSelectedUser] = useState(null); 
  const [targetRoom, setTargetRoom] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const [usersRes, roomsRes] = await Promise.all([
      fetch('/api/admin/users'),
      fetch('/api/rooms')
    ]);
    const users = await usersRes.json();
    const rooms = await roomsRes.json();
    
    setPendingUsers(users);
    setAvailableRooms(rooms.filter(r => r.status === 'available'));
    setLoading(false);
  };

  useEffect(() => { 
    setMounted(true);
    fetchData(); 
  }, []);

  const handleGrantAccess = async (e) => {
    e.preventDefault();
    if (!targetRoom) return alert("Select a room node first");

    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        id: selectedUser.id, 
        status: 'active',
        room_id: targetRoom 
      }),
    });

    if (res.ok) {
      setSelectedUser(null);
      setTargetRoom('');
      fetchData();
    }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] font-sans text-[#1E5EFF]">
      <Loader2 className="animate-spin mr-2" /> ACCESSING PERMISSION LOGS...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 lg:p-12 font-sans text-[#0B1F3B]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
            ACCESS <span className="text-[#1E5EFF]">CONTROL</span>
          </h1>
          <p className="text-[#6B7280] text-[10px] font-black tracking-[0.3em] uppercase mt-2">Identity & Access Management</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
           <ShieldCheck className="text-emerald-500 w-4 h-4" />
           <span className="text-[#0B1F3B] text-[10px] font-black uppercase tracking-widest">Secure Admin Session</span>
        </div>
      </div>

      {/* Pending User List */}
      <div className="max-w-4xl space-y-4">
        <h2 className="text-xs font-black text-[#6B7280] uppercase tracking-widest mb-6 flex items-center gap-2">
          <UserPlus size={16} className="text-[#1E5EFF]" /> Users Awaiting Deployment ({pendingUsers.length})
        </h2>

        {pendingUsers.length > 0 ? pendingUsers.map((user) => (
          <div 
            key={user.id} 
            className="bg-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between border border-[#E5E7EB] hover:border-[#1E5EFF] shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-5 mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center text-[#1E5EFF] group-hover:bg-[#1E5EFF] group-hover:text-white transition-all">
                <UserCheck size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-[#0B1F3B]">{user.name}</h3>
                <p className="text-[10px] font-bold text-[#6B7280] uppercase flex items-center gap-2 mt-1">
                  <Mail size={12} /> {user.email}
                </p>
              </div>
            </div>

            <Button 
              onClick={() => setSelectedUser(user)}
              className="px-8 rounded-xl text-[10px] tracking-[0.1em]"
            >
              Grant Room Access
            </Button>
          </div>
        )) : (
          <div className="py-24 text-center border-2 border-dashed border-[#E5E7EB] rounded-2xl bg-white">
             <ShieldCheck size={48} className="mx-auto text-[#E5E7EB] mb-4" />
             <p className="text-[#6B7280] font-black text-[11px] uppercase tracking-widest">No pending access requests detected</p>
          </div>
        )}
      </div>

      {/* --- UNIFORM PORTAL ASSIGNMENT MODAL --- */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedUser && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedUser(null)}
                className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md cursor-pointer" 
              />
              
              {/* Modal Card */}
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl border border-[#E5E7EB] overflow-hidden"
              >
                {/* Header */}
                <div className="p-8 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F8FAFC]">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#1E5EFF]/10 rounded-lg">
                      <Home size={20} className="text-[#1E5EFF]" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-[#0B1F3B]">Assign <span className="text-[#1E5EFF]">Room</span></h2>
                  </div>
                  <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-gray-200 rounded-full text-[#6B7280] transition-colors"><X size={24}/></button>
                </div>

                <div className="p-8">
                  <div className="mb-8 p-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl">
                    <p className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest mb-1">Target Identity</p>
                    <p className="text-lg font-black text-[#0B1F3B] uppercase">{selectedUser.name}</p>
                    <p className="text-[11px] font-bold text-[#6B7280] italic">{selectedUser.email}</p>
                  </div>

                  <form onSubmit={handleGrantAccess} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[#0B1F3B] uppercase tracking-widest ml-1">Select Available Unit</label>
                      <select 
                        required
                        className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-2xl text-sm font-bold uppercase focus:border-[#1E5EFF] outline-none appearance-none transition-all cursor-pointer"
                        value={targetRoom}
                        onChange={(e) => setTargetRoom(e.target.value)}
                      >
                        <option value="">-- BROWSE VACANT NODES --</option>
                        {availableRooms.map(room => (
                          <option key={room.id} value={room.id} className="text-[#0B1F3B]">
                            {room.name} — ₱{Number(room.monthly_rate).toLocaleString()}/MO
                          </option>
                        ))}
                      </select>
                    </div>

                    <Button type="submit" className="w-full py-5 rounded-2xl shadow-xl shadow-blue-500/10">
                      Confirm Assignment & Deploy
                    </Button>
                  </form>
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