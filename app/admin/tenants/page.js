'use client';
import React, { useEffect, useState } from 'react';
import { ShieldCheck, UserPlus, ShieldAlert, UserCheck, X } from 'lucide-react';

export default function TenantAccessControl() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [selectedUser, setSelectedUser] = useState(null); // User currently being activated
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

  useEffect(() => { fetchData(); }, []);

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
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-black p-8 lg:p-12 font-sans text-white">
      <h1 className="text-4xl font-black uppercase mb-12">ACCESS <span className="text-[#00A3CC]">CONTROL</span></h1>

      <div className="space-y-4">
        {pendingUsers.map((user) => (
          <div key={user.id} className="bg-[#1a1a1a] p-6 flex items-center justify-between border-l-4 border-[#00A3CC]">
            <div>
              <h3 className="text-xl font-black uppercase">{user.name}</h3>
              <p className="text-xs font-mono text-white/40 uppercase">{user.email}</p>
            </div>
            <button 
              onClick={() => setSelectedUser(user)}
              className="bg-[#00A3CC] text-black px-6 py-3 font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all"
            >
              GRANT ACCESS
            </button>
          </div>
        ))}
      </div>

      {/* ROOM ASSIGNMENT MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-[#111] border border-[#00A3CC] p-10 rounded-none max-w-md w-full relative">
            <button onClick={() => setSelectedUser(null)} className="absolute top-4 right-4 text-white/40 hover:text-white">
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">ASSIGN ROOM</h2>
            <p className="text-[10px] font-mono text-white/40 uppercase mb-8">NODE_TARGET: {selectedUser.name}</p>

            <form onSubmit={handleGrantAccess} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[#00A3CC] uppercase tracking-widest">Select Available Unit</label>
                <select 
                  required
                  className="w-full bg-white/5 border border-white/20 p-4 text-sm focus:border-[#00A3CC] outline-none"
                  value={targetRoom}
                  onChange={(e) => setTargetRoom(e.target.value)}
                >
                  <option value="" className="bg-black">-- SELECT ROOM --</option>
                  {availableRooms.map(room => (
                    <option key={room.id} value={room.id} className="bg-black">
                      {room.name} - ₱{room.monthly_rate}/mo
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="w-full bg-[#00A3CC] text-black py-4 font-black uppercase text-[11px] tracking-widest hover:bg-white transition-all">
                CONFIRM DEPLOYMENT
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}