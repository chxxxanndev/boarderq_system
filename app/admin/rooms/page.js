'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, MapPin, Users, X, 
  Settings2, Loader2, Trash2, Edit3
} from 'lucide-react';
import Button from '@/components/Button';

export default function LandlordRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // Track if we are editing

  const [formData, setFormData] = useState({
    name: '', monthly_rate: '', location: '', capacity: '', image_url: ''
  });

  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/rooms');
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  // OPEN MODAL FOR ADD
  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', monthly_rate: '', location: '', capacity: '', image_url: '' });
    setIsModalOpen(true);
  };

  // OPEN MODAL FOR EDIT
  const openEditModal = (room) => {
    setEditingId(room.id);
    setFormData({
      name: room.name,
      monthly_rate: room.monthly_rate,
      location: room.location || '',
      capacity: room.capacity || '',
      image_url: room.image_url || ''
    });
    setIsModalOpen(true);
  };

  // CREATE OR UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `/api/rooms/${editingId}` : '/api/rooms';
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      fetchRooms();
    }
  };

  // DELETE (ARCHIVE)
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to remove this unit?")) return;
    const res = await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
    if (res.ok) fetchRooms();
  };

  // TOGGLE STATUS (LIVE STATE)
  const toggleStatus = async (room) => {
    const newStatus = room.status === 'available' ? 'occupied' : 'available';
    const res = await fetch(`/api/rooms/${room.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) fetchRooms();
  };

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-black font-mono text-[#00A3CC] tracking-[1em]">
      ACCESSING_INVENTORY...
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
      <main className="flex-1 p-8 lg:p-12">
        
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row xl:items-baseline justify-between gap-6 mb-12">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-baseline gap-4">
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
              <span className="text-white">MANAGE</span>
              <span className="text-[#00A3CC]"> ROOMS</span>
            </h1>
            <span className="text-white text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">INVENTORY MODULE</span>
          </motion.div>

          {/* Utility Toolbar */}
          <div className="flex items-center gap-2 flex-1 max-w-md">
             <button className="p-3 bg-[#222] hover:bg-[#333] transition-colors rounded-sm border border-white/5 shadow-xl"><Settings2 className="w-5 h-5 opacity-80" /></button>
             <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input 
                  type="text" 
                  placeholder="SEARCH UNIT ID..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#222] border border-white/10 rounded-sm py-3.5 px-12 focus:outline-none focus:border-[#00A3CC] text-xs font-bold tracking-widest uppercase" 
                />
             </div>
             <button onClick={openAddModal} className="bg-[#222] hover:bg-[#00A3CC] transition-all px-6 py-3.5 border border-white/10 flex items-center gap-3 group shadow-xl">
                <Plus className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:text-black" />
                <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-black">Add New</span>
             </button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
          {filteredRooms.map((room, i) => (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={room.id} className="group flex flex-col">
              <div className="relative aspect-square overflow-hidden rounded-sm shadow-2xl bg-zinc-900 border border-white/5">
                <img 
                  src={room.image_url || '/images/Image (0).png'} 
                  alt={room.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                <div className={`absolute top-6 right-6 px-5 py-1 text-[10px] font-black uppercase tracking-widest border rounded-sm backdrop-blur-md ${room.status === 'available' ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-red-500/20 border-red-500/50 text-red-400'}`}>
                  {room.status}
                </div>
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                   <h3 className="text-5xl font-black tracking-tight leading-[0.85] mb-8 drop-shadow-2xl transition-colors group-hover:text-[#00A3CC] uppercase">{room.name}</h3>
                   <div className="space-y-4 mb-10 opacity-90">
                      <div className="flex items-center gap-4"><MapPin className="w-6 h-6 text-[#00A3CC]" /><span className="text-[11px] font-black tracking-[0.2em] uppercase leading-tight">{room.location || 'NOT SPECIFIED'}</span></div>
                      <div className="flex items-center gap-4"><Users className="w-6 h-6 text-[#00A3CC]" /><span className="text-[11px] font-black tracking-[0.2em] uppercase leading-tight">{room.capacity || 'N/A'} Persons</span></div>
                   </div>
                   <div className="border-t border-b border-white/20 py-5 flex items-center justify-center">
                      <span className="text-[12px] font-black tracking-[0.4em] uppercase opacity-80">Monthly Rate: ₱ {room.monthly_rate}</span>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <button 
                  onClick={() => openEditModal(room)}
                  className="bg-[#222] hover:bg-white hover:text-black py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all rounded-sm border border-white/5"
                >Modify</button>
                <button 
                  onClick={() => handleDelete(room.id)}
                  className="bg-[#222] hover:bg-red-900/40 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all rounded-sm border border-white/5"
                >Archive</button>
                <button 
                  onClick={() => toggleStatus(room)}
                  className="bg-[#00A3CC]/10 text-[#00A3CC] hover:bg-[#00A3CC] hover:text-black py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all rounded-sm border border-white/10 italic"
                >Live State</button>
              </div>
            </motion.div>
          ))}

          {/* Add Room Card */}
          <div onClick={openAddModal} className="aspect-square bg-[#333]/30 border border-white/5 flex flex-col items-center justify-center cursor-pointer group hover:bg-[#333] transition-all rounded-sm shadow-xl">
            <div className="w-14 h-14 rounded-lg border-2 border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00A3CC] group-hover:bg-[#00A3CC] transition-all duration-300">
               <Plus className="w-7 h-7 text-white/30 group-hover:text-black" />
            </div>
            <div className="text-center">
              <h4 className="font-black tracking-[0.3em] uppercase text-sm mb-2">Register Unit</h4>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">New Inventory Entry</p>
            </div>
          </div>
        </div>

        {/* REGISTRATION / EDIT MODAL */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#111] border border-[#00A3CC]/30 p-10 rounded-sm w-full max-w-xl relative shadow-[0_0_50px_rgba(0,163,204,0.2)]"
              >
                <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-white/40 hover:text-white"><X size={24}/></button>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 italic">
                  {editingId ? 'UPDATE' : 'UNIT'} <span className="text-[#00A3CC]">{editingId ? 'DETAILS' : 'REGISTRATION'}</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">Room Title</label>
                      <input required value={formData.name} className="w-full bg-[#1a1a1a] border border-white/10 p-4 text-xs font-bold uppercase tracking-widest focus:border-[#00A3CC] outline-none" 
                        onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">Monthly Rate</label>
                      <input required type="number" value={formData.monthly_rate} className="w-full bg-[#1a1a1a] border border-white/10 p-4 text-xs font-bold focus:border-[#00A3CC] outline-none text-[#00A3CC]" 
                        onChange={e => setFormData({...formData, monthly_rate: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">Exact Location</label>
                    <input value={formData.location} className="w-full bg-[#1a1a1a] border border-white/10 p-4 text-xs font-bold uppercase tracking-widest focus:border-[#00A3CC] outline-none" 
                      onChange={e => setFormData({...formData, location: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">Max Capacity</label>
                    <input value={formData.capacity} className="w-full bg-[#1a1a1a] border border-white/10 p-4 text-xs font-bold uppercase tracking-widest focus:border-[#00A3CC] outline-none" 
                      onChange={e => setFormData({...formData, capacity: e.target.value})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-white/40 tracking-widest">Image URL</label>
                    <input value={formData.image_url} className="w-full bg-[#1a1a1a] border border-white/10 p-4 text-xs font-bold focus:border-[#00A3CC] outline-none" 
                      onChange={e => setFormData({...formData, image_url: e.target.value})} />
                  </div>
                  <Button type="submit" className="w-full bg-[#00A3CC] text-white font-black py-5 rounded-none uppercase tracking-[0.3em] text-xs mt-6 hover:bg-white hover:text-black transition-all">
                    {editingId ? 'COMMIT CHANGES' : 'Initialize Unit Node'}
                  </Button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <footer className="mt-24 pb-10 text-center text-[9px] font-bold tracking-[0.6em] uppercase opacity-40 border-t border-white/5 pt-10">
          Inventory Terminal / System 2026 / Boarder-Q
        </footer>
      </main>
    </div>
  );
}