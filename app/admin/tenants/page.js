'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, UserPlus, UserCheck, X, Home, Mail, Loader2 } from 'lucide-react';
import Button from '@/components/Button';
import AdminFooter from '@/components/AdminFooter'; 

export default function TenantAccessControl() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [selectedUser, setSelectedUser] = useState(null); 
  const [targetRoom, setTargetRoom] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
        const [usersRes, roomsRes] = await Promise.all([
          fetch('/api/admin/users'),
          fetch('/api/rooms')
        ]);
        const users = await usersRes.json();
        const rooms = await roomsRes.json();
        setPendingUsers(users);
        setAvailableRooms(rooms.filter(r => !r.is_full && r.status !== 'maintenance'));
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { 
    setMounted(true);
    fetchData(); 
  }, []);

  // AUTO-SELECT LOGIC: When a user is picked, set the room to their preference if available
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: selectedUser.id, status: 'active', room_id: targetRoom }),
        });
        if (res.ok) {
          setSelectedUser(null);
          fetchData();
        }
    } finally { setSubmitting(false); }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-12 text-[#0B1F3B]">
      <div className="flex items-end justify-between mb-12">
        <h1 className="text-4xl font-black uppercase">ACCESS <span className="text-[#1E5EFF]">CONTROL</span></h1>
      </div>

      <div className="max-w-4xl space-y-4">
        {pendingUsers.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-2xl flex items-center justify-between border border-[#E5E7EB] hover:border-[#1E5EFF] transition-all group">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#1E5EFF] group-hover:bg-[#1E5EFF] group-hover:text-white transition-all"><UserCheck size={24} /></div>
              <div>
                <h3 className="text-xl font-black uppercase">{user.name}</h3>
                <div className="flex gap-4">
                    <p className="text-[10px] font-bold text-[#6B7280] uppercase flex items-center gap-2"><Mail size={12} /> {user.email}</p>
                    {user.preferred_room_name && (
                        <p className="text-[10px] font-black text-[#1E5EFF] uppercase flex items-center gap-2">
                            <Home size={12} /> Applied for: {user.preferred_room_name}
                        </p>
                    )}
                </div>
              </div>
            </div>
            <Button onClick={() => setSelectedUser(user)} className="px-8 rounded-xl text-[10px]">Grant Room Access</Button>
          </div>
        ))}
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {selectedUser && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md" onClick={() => setSelectedUser(null)} />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden">
                <div className="p-8 border-b flex justify-between items-center bg-[#F8FAFC]">
                   <h2 className="text-2xl font-black uppercase">Assign <span className="text-[#1E5EFF]">Room</span></h2>
                   <X className="cursor-pointer" onClick={() => setSelectedUser(null)} />
                </div>
                <div className="p-8">
                  <div className="mb-6 p-4 bg-[#F8FAFC] rounded-2xl">
                    <p className="text-[10px] font-black text-[#6B7280] uppercase">Target Identity</p>
                    <p className="text-lg font-black uppercase">{selectedUser.name}</p>
                  </div>
                  <form onSubmit={handleGrantAccess} className="space-y-6">
                    <select required className="w-full bg-[#F8FAFC] border p-4 rounded-2xl text-sm font-bold uppercase outline-none" value={targetRoom} onChange={(e) => setTargetRoom(e.target.value)}>
                        <option value="">-- BROWSE VACANT NODES --</option>
                        {availableRooms.map(room => (
                          <option key={room.id} value={room.id}>
                            {room.name} ({room.capacity - room.current_tenants} Slots Left) 
                            {room.id === selectedUser.preferred_room_id ? " [USER PREFERENCE]" : ""}
                          </option>
                        ))}
                    </select>
                    <Button type="submit" disabled={submitting || !targetRoom} className="w-full py-5 rounded-2xl">
                      {submitting ? <Loader2 className="animate-spin" /> : 'Confirm Assignment & Deploy'}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>, document.body
      )}

      <AdminFooter />

    </div>
    
  );
}