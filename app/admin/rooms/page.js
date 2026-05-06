'use client';
import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Plus, Search, MapPin, Users, X, 
  Settings2, Upload, Loader2, Activity, ClipboardList, ShieldAlert, Trash2,
  AlertTriangle, CheckCircle2, Info
} from 'lucide-react';
import Button from '@/components/Button';
import AdminFooter from '@/components/AdminFooter'; 

export default function LandlordRooms() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Custom Alert/Confirm States
  const [confirmDeleteData, setConfirmDeleteData] = useState(null); // stores room object when deleting
  const [notification, setNotification] = useState(null); // { message, type: 'success' | 'error' }

  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '', monthly_rate: '', location: '', capacity: '', image_url: '', amenities: '', house_rules: '', status: 'available'
  });

  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/rooms');
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      showNotify("Failed to sync inventory", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchRooms();
  }, []);

  // Helper to show nice notifications
  const showNotify = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    try {
      const res = await fetch('/api/rooms/upload', { method: 'POST', body: uploadData });
      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, image_url: data.url }));
        showNotify("Texture uploaded successfully!");
      }
    } catch (error) {
      showNotify("Image upload failed", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', monthly_rate: '', location: '', capacity: '', image_url: '', amenities: '', house_rules: '', status: 'available' });
    setIsModalOpen(true);
  };

  const openEditModal = (room) => {
    setEditingId(room.id);
    setFormData({
      name: room.name,
      monthly_rate: room.monthly_rate,
      location: room.location || '',
      capacity: room.capacity || '',
      image_url: room.image_url || '',
      amenities: room.amenities || '',
      house_rules: room.house_rules || '',
      status: room.status || 'available'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `/api/rooms/${editingId}` : '/api/rooms';
    const method = editingId ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchRooms();
        showNotify(editingId ? "Unit updated!" : "New unit registered!");
      }
    } catch (err) {
      showNotify("Operation failed", "error");
    }
  };

  const toggleStatus = async (room) => {
    const newStatus = room.status === 'maintenance' ? 'available' : 'maintenance';
    try {
      const res = await fetch(`/api/rooms/${room.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...room, status: newStatus }),
      });
      if (res.ok) {
        setRooms(rooms.map(r => r.id === room.id ? { ...r, status: newStatus } : r));
        showNotify(`Room is now ${newStatus}`);
      }
    } catch (err) {
      showNotify("Status update failed", "error");
    }
  };

  const executeDelete = async () => {
    if (!confirmDeleteData) return;
    try {
      const res = await fetch(`/api/rooms/${confirmDeleteData.id}`, { method: 'DELETE' });
      if (res.ok) {
        setRooms(rooms.filter(r => r.id !== confirmDeleteData.id));
        showNotify("Unit permanently removed", "success");
      } else {
        showNotify("Cannot delete room with active tenants", "error");
      }
    } catch (err) {
      showNotify("Delete failed", "error");
    } finally {
      setConfirmDeleteData(null);
    }
  };

  const filteredRooms = rooms.filter(room =>
    room.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] font-sans text-[#1E5EFF]">
      <Loader2 className="animate-spin mr-2" /> SYNCHRONIZING INVENTORY...
    </div>
  );

  const inputClasses = "w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-4 px-5 focus:outline-none focus:border-[#1E5EFF] text-sm font-bold placeholder:text-[#9CA3AF] transition-all";
  const labelClasses = "block text-[10px] font-black uppercase tracking-[0.2em] text-[#6B7280] mb-2 ml-1";

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">
      <main className="flex-1 p-6 md:p-12 pb-24 md:pb-12">

        {/* NICE NOTIFICATION TOAST */}
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
              className={`fixed top-0 left-1/2 -translate-x-1/2 z-[10001] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px] border ${
                notification.type === 'error' ? 'bg-rose-500 border-rose-400 text-white' : 'bg-emerald-500 border-emerald-400 text-white'
              }`}
            >
              {notification.type === 'error' ? <AlertTriangle size={20}/> : <CheckCircle2 size={20}/>}
              <span className="text-xs font-black uppercase tracking-wider">{notification.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase leading-none text-[#0B1F3B]">
              MANAGE <span className="text-[#1E5EFF]">ROOMS</span>
            </h1>
            <p className="text-[#6B7280] text-[10px] font-black tracking-[0.3em] uppercase mt-2">
              Inventory Control Center
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <input
                type="text"
                placeholder="SEARCH BY UNIT ID OR LOCATION..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-xl py-4 px-12 focus:outline-none focus:border-[#1E5EFF] text-xs font-bold uppercase shadow-sm"
              />
            </div>
            <Button onClick={openAddModal} className="rounded-xl h-14 px-10 shadow-lg shadow-blue-500/20">
              <Plus className="w-5 h-5 mr-2 not-italic" /> REGISTER UNIT
            </Button>
          </div>
        </div>

        {/* ROOMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
          {filteredRooms.map((room) => {
            const capacity = Number(room.capacity || 0);
            const current = Number(room.current_tenants || 0);
            const isFull = capacity > 0 && current >= capacity;
            const displayStatus = room.status === 'maintenance' ? 'maintenance' : isFull ? 'FULL' : 'AVAILABLE';

            return (
              <div key={room.id} className="group bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={room.image_url || 'https://via.placeholder.com/400x300?text=No+Image'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md border ${
                    displayStatus === 'AVAILABLE' ? 'bg-emerald-500 text-white border-emerald-400' : 
                    displayStatus === 'FULL' ? 'bg-rose-500 text-white border-rose-400' : 'bg-gray-500 text-white border-gray-400'
                  }`}>{displayStatus}</div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-[#0B1F3B] uppercase tracking-tight group-hover:text-[#1E5EFF] transition-colors">{room.name}</h3>
                    <div className="text-right"><p className="text-[10px] font-black text-[#6B7280] uppercase">Rate</p><p className="text-lg font-black text-[#0B1F3B]">₱{Number(room.monthly_rate).toLocaleString()}</p></div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-3 text-[#6B7280]"><MapPin size={16} className="text-[#22D3EE]" /><span className="text-[11px] font-bold uppercase truncate">{room.location || 'NOT SPECIFIED'}</span></div>
                    <div className="flex items-center gap-3 text-[#6B7280]"><Users size={16} className="text-[#22D3EE]" /><span className="text-[11px] font-bold uppercase tracking-wider">{current} / {capacity} Persons</span></div>
                  </div>

                  <div className="space-y-3 mb-8 bg-[#F8FAFC] p-4 rounded-xl border border-[#E5E7EB]">
                    <div className="flex items-start gap-2"><ClipboardList size={14} className="text-[#1E5EFF] mt-0.5 shrink-0" /><p className="text-[10px] font-bold text-[#6B7280] uppercase leading-tight"><span className="text-[#0B1F3B]">Amenities:</span> {room.amenities || 'None'}</p></div>
                    <div className="flex items-start gap-2"><ShieldAlert size={14} className="text-rose-500 mt-0.5 shrink-0" /><p className="text-[10px] font-bold text-[#6B7280] uppercase leading-tight"><span className="text-[#0B1F3B]">Rules:</span> {room.house_rules || 'Standard'}</p></div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    <button onClick={() => openEditModal(room)} className="flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-[#E5E7EB] text-[#0B1F3B] py-3 rounded-lg text-[10px] font-black uppercase transition-all"><Settings2 size={14} /> Edit</button>
                    <button onClick={() => setConfirmDeleteData(room)} className="flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-rose-50 text-rose-500 py-3 rounded-lg text-[10px] font-black uppercase transition-all"><Trash2 size={14} /> Delete</button>
                    <button onClick={() => toggleStatus(room)} className={`flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] font-black uppercase transition-all italic ${room.status === 'maintenance' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-[#1E5EFF]/10 text-[#1E5EFF] hover:bg-[#1E5EFF] hover:text-white'}`}><Activity size={14} /> {room.status === 'maintenance' ? 'Fixing' : 'Status'}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* MODAL PORTAL: REGISTER / EDIT */}
        {mounted && createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md" />
                <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="relative bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] w-full max-w-xl shadow-2xl border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[95vh]">
                  <div className="p-8 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F8FAFC]">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-[#0B1F3B]">{editingId ? 'Modify' : 'Register'} <span className="text-[#1E5EFF]">Room</span></h2>
                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={24} /></button>
                  </div>
                  <div className="p-8 overflow-y-auto pb-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className={labelClasses}>Property Asset Image</label>
                        <div onClick={() => fileInputRef.current.click()} className="relative h-44 w-full bg-[#F8FAFC] border-2 border-dashed border-[#E5E7EB] rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#1E5EFF] transition-all overflow-hidden">
                          {formData.image_url ? <img src={formData.image_url} className="w-full h-full object-cover" alt="" /> : <div className="text-center">{isUploading ? <Loader2 className="w-8 h-8 animate-spin text-[#1E5EFF] mx-auto" /> : <Upload className="w-8 h-8 text-[#6B7280] mx-auto mb-2" />}<span className="text-[10px] font-black uppercase text-[#6B7280]">Click to upload texture</span></div>}
                          <input type="file" ref={fileInputRef} hidden onChange={handleFileUpload} accept="image/*" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2"><label className={labelClasses}>Room Number</label><input className={inputClasses} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required /></div>
                        <div className="space-y-2"><label className={labelClasses}>Rate (PHP)</label><input type="number" className={inputClasses} value={formData.monthly_rate} onChange={e => setFormData({ ...formData, monthly_rate: e.target.value })} required /></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2"><label className={labelClasses}>Location</label><input className={inputClasses} value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} /></div>
                        <div className="space-y-2"><label className={labelClasses}>Capacity</label><input type="number" className={inputClasses} value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })} required /></div>
                      </div>
                      <div className="space-y-2"><label className={labelClasses}>Amenities</label><textarea className={inputClasses + " h-24 pt-4 resize-none"} placeholder="WiFi, AC, Bed..." value={formData.amenities} onChange={e => setFormData({...formData, amenities: e.target.value})} /></div>
                      <div className="space-y-2"><label className={labelClasses}>House Rules</label><textarea className={inputClasses + " h-24 pt-4 resize-none"} placeholder="No pets, Curfew..." value={formData.house_rules} onChange={e => setFormData({...formData, house_rules: e.target.value})} /></div>
                      <Button type="submit" className="w-full h-16 rounded-2xl text-md shadow-xl shadow-blue-500/20">{editingId ? 'COMMIT CHANGES' : 'REGISTER UNIT'}</Button>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>, document.body
        )}

        {/* MODAL PORTAL: NICE DELETE CONFIRMATION */}
        {mounted && createPortal(
          <AnimatePresence>
            {confirmDeleteData && (
              <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setConfirmDeleteData(null)} className="absolute inset-0 bg-[#0B1F3B]/90 backdrop-blur-sm" />
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl text-center">
                  <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6"><Trash2 size={40} /></div>
                  <h2 className="text-2xl font-black text-[#0B1F3B] uppercase mb-2">Delete Room?</h2>
                  <p className="text-[#6B7280] text-xs font-bold uppercase tracking-wider mb-8 leading-relaxed">Are you sure you want to remove <span className="text-rose-500">{confirmDeleteData.name}</span>? This action will permanently erase the record from the inventory.</p>
                  <div className="flex gap-3">
                    <button onClick={() => setConfirmDeleteData(null)} className="flex-1 py-4 bg-[#F8FAFC] text-[#0B1F3B] rounded-xl text-[10px] font-black uppercase hover:bg-gray-200 transition-all">Go Back</button>
                    <button onClick={executeDelete} className="flex-1 py-4 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase hover:bg-rose-600 shadow-lg shadow-rose-500/30 transition-all">Yes, Delete</button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>, document.body
        )}

        <AdminFooter />
      </main>
    </div>
  );
}