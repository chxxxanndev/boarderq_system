'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, UserPlus, UserCheck, X, Home, Mail, 
  Loader2, CheckCircle2, AlertTriangle, UserX, Trash2
} from 'lucide-react';
import Button from '@/components/Button';
import AdminFooter from '@/components/AdminFooter'; 

export default function TenantAccessControl() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const [selectedUser, setSelectedUser] = useState(null); 
  const [userToReject, setUserToReject] = useState(null); 
  const [targetRoom, setTargetRoom] = useState('');

  const showNotify = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchData = async () => {
    try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` };
        
        const [usersRes, roomsRes] = await Promise.all([
          fetch('/api/admin/users', { headers }),
          fetch('/api/rooms', { headers })
        ]);
        
        const users = await usersRes.json();
        const rooms = await roomsRes.json();
        
        setPendingUsers(Array.isArray(users) ? users : []);
        setAvailableRooms(Array.isArray(rooms) ? rooms.filter(r => !r.is_full && r.status !== 'maintenance') : []);
    } catch (err) { 
        showNotify("Failed to sync registry", "error");
    } finally { 
        setLoading(false); 
    }
  };

  useEffect(() => { 
    setMounted(true);
    fetchData(); 
  }, []);

  useEffect(() => {
    if (selectedUser?.preferred_room_id) {
        setTargetRoom(selectedUser.preferred_room_id.toString());
    } else {
        setTargetRoom('');
    }
  }, [selectedUser]);

  const handleGrantAccess = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
        const res = await fetch('/api/admin/users', {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ id: selectedUser.id, status: 'active', room_id: targetRoom }),
        });

        if (res.ok) {
          showNotify(`Deployment Successful: ${selectedUser.name} assigned.`);
          setSelectedUser(null);
          fetchData();
        }
    } finally { setSubmitting(false); }
  };

  const handleRejectUser = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/users?id=${userToReject.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.ok) {
        showNotify(`Account for ${userToReject.name} removed.`, 'error');
        setUserToReject(null);
        fetchData();
      }
    } catch (err) {
      showNotify("Action failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] text-[#1E5EFF]">
      <Loader2 className="animate-spin mr-2" /> INITIALIZING ACCESS PROTOCOLS...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-[#0B1F3B]">

      <main className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
                <h1 className="text-4xl font-black uppercase tracking-tight">ACCESS <span className="text-[#1E5EFF]">CONTROL</span></h1>
                <p className="text-[#6B7280] text-[10px] font-black uppercase tracking-[0.3em] mt-2">Pending Resident Verification</p>
            </div>
        </div>

        <div className="space-y-4">
            {pendingUsers.length > 0 ? pendingUsers.map((user) => (
            <div key={user.id} className="bg-white p-6 rounded-[2rem] flex flex-col md:flex-row items-center justify-between border border-[#E5E7EB] hover:shadow-xl hover:border-[#1E5EFF] transition-all group gap-6">
                <div className="flex items-center gap-5 w-full">
                <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] flex items-center justify-center text-[#1E5EFF] group-hover:bg-[#1E5EFF] group-hover:text-white transition-all shadow-sm">
                    <UserPlus size={28} />
                </div>
                <div>
                    <h3 className="text-xl font-black uppercase tracking-tight text-[#0B1F3B]">{user.name}</h3>
                    <div className="flex flex-wrap gap-4 mt-1">
                        <p className="text-[10px] font-bold text-[#6B7280] uppercase flex items-center gap-2"><Mail size={12} className="text-[#1E5EFF]" /> {user.email}</p>
                        {user.preferred_room_name && (
                            <p className="text-[10px] font-black text-[#1E5EFF] uppercase flex items-center gap-2 bg-blue-50 px-2 py-0.5 rounded">
                                <Home size={12} /> Target: {user.preferred_room_name}
                            </p>
                        )}
                    </div>
                </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                        onClick={() => setUserToReject(user)}
                        className="flex-1 md:flex-none px-6 h-12 rounded-xl border border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"
                    >
                        <UserX size={16} /> Reject
                    </button>
                    <Button onClick={() => setSelectedUser(user)} className="flex-[2] md:flex-none px-8 rounded-xl text-[10px] h-12 whitespace-nowrap shadow-lg shadow-blue-500/10">
                        Grant Access
                    </Button>
                </div>
            </div>
            )) : (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-[2rem] py-20 text-center">
                    <ShieldCheck className="mx-auto text-gray-200 mb-4" size={48} />
                    <p className="text-[#6B7280] font-black text-xs uppercase tracking-[0.2em]">Registry Clear: No Pending Applications</p>
                </div>
            )}
        </div>
      </main>

      {/* PORTAL MODAL: ASSIGN ROOM */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedUser && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md" onClick={() => setSelectedUser(null)} />
              <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl">
                <div className="p-8 border-b flex justify-between items-center bg-[#F8FAFC]">
                   <h2 className="text-2xl font-black uppercase tracking-tight text-[#0B1F3B]">Assign <span className="text-[#1E5EFF]">Node</span></h2>
                   <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={20} /></button>
                </div>
                <div className="p-8">
                  <div className="mb-8 p-6 bg-[#0B1F3B] rounded-[1.5rem] text-white relative overflow-hidden">
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Target Identity</p>
                    <p className="text-xl font-black uppercase tracking-tight">{selectedUser.name}</p>
                    <UserCheck className="absolute right-[-10px] bottom-[-10px] text-white opacity-5" size={80} />
                  </div>
                  <form onSubmit={handleGrantAccess} className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black text-[#6B7280] uppercase mb-2 ml-1 block tracking-widest">Select Available Unit</label>
                        <select required className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-4 rounded-2xl text-sm font-bold uppercase outline-none focus:border-[#1E5EFF] transition-all" value={targetRoom} onChange={(e) => setTargetRoom(e.target.value)}>
                            <option value="">-- BROWSE VACANT ROOMS --</option>
                            {availableRooms.map(room => (
                            <option key={room.id} value={room.id}>
                                {room.name} — ({room.capacity - (room.current_tenants || 0)} Slots Left) 
                            </option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" disabled={submitting || !targetRoom} className="w-full py-5 rounded-2xl h-16 shadow-xl shadow-blue-500/20">
                      {submitting ? <Loader2 className="animate-spin mx-auto" /> : 'Confirm Assignment & Deploy'}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>, document.body
      )}

      {/* PORTAL MODAL: REJECT CONFIRMATION */}
      {mounted && createPortal(
        <AnimatePresence>
          {userToReject && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md" onClick={() => setUserToReject(null)} />
              <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative bg-white rounded-[2.5rem] w-full max-w-sm p-10 text-center shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-rose-500"></div>
                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserX size={36} />
                </div>
                <h2 className="text-2xl font-black text-[#0B1F3B] uppercase mb-2">Reject Account?</h2>
                <p className="text-xs text-[#6B7280] font-bold uppercase tracking-widest leading-relaxed mb-10">
                    Are you sure you want to <span className="text-rose-600 underline">delete the registration</span> for <span className="text-[#0B1F3B]">{userToReject.name}</span>?
                </p>
                <div className="flex gap-4">
                  <button onClick={() => setUserToReject(null)} className="flex-1 py-4 bg-[#F8FAFC] text-[#6B7280] rounded-xl text-[10px] font-black uppercase hover:bg-[#E5E7EB]">Cancel</button>
                  <button onClick={handleRejectUser} disabled={submitting} className="flex-1 py-4 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-rose-500/20">
                    {submitting ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Confirm Reject"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>, document.body
      )}

      {/* UPDATED: FIXED TO BOTTOM OF SCREEN */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: 100, opacity: 0 }}
            className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[10001] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px] border ${
              notification.type === 'error' ? 'bg-rose-500 border-rose-400 text-white' : 'bg-emerald-500 border-emerald-400 text-white'
            }`}
          >
            {notification.type === 'error' ? <AlertTriangle size={20}/> : <CheckCircle2 size={20}/>}
            <span className="text-xs font-black uppercase tracking-wider">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AdminFooter />
    </div>
  );
}