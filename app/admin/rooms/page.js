'use client';
import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, MapPin, Users, X, 
  Settings2, Upload, Loader2, Home, Archive, Activity
} from 'lucide-react';
import Button from '@/components/Button';

export default function LandlordRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  const fileInputRef = useRef(null);

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

  useEffect(() => {
    setMounted(true);
    fetchRooms();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/rooms/upload', {
        method: 'POST',
        body: uploadData
      });
      const data = await res.json();
      if (data.url) setFormData({ ...formData, image_url: data.url });
    } catch (error) {
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', monthly_rate: '', location: '', capacity: '', image_url: '' });
    setIsModalOpen(true);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId ? `/api/rooms/${editingId}` : '/api/rooms';
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      fetchRooms();
    }
  };

  const promptDelete = (room) => {
    setRoomToDelete(room);
  };

  const confirmDelete = async () => {
    if (!roomToDelete) return;

    const res = await fetch(`/api/rooms/${roomToDelete.id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      setRoomToDelete(null);
      fetchRooms();
    }
  };

  // ❌ FIXED: NO MORE TOGGLING AVAILABLE/OCCUPIED
  // status is now computed from backend
  const toggleStatus = async (room) => {
    const res = await fetch(`/api/rooms/${room.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: room.status === 'maintenance' ? 'available' : 'maintenance'
      }),
    });

    if (res.ok) fetchRooms();
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

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">
      <main className="flex-1 p-8 lg:p-12">

        {/* HEADER (UNCHANGED) */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
              MANAGE <span className="text-[#1E5EFF]">ROOMS</span>
            </h1>
            <p className="text-[#6B7280] text-[10px] font-black tracking-[0.3em] uppercase mt-2">
              Inventory Control Center
            </p>
          </div>

          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <input
                type="text"
                placeholder="SEARCH BY UNIT ID OR LOCATION..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E5E7EB] rounded-xl py-4 px-12 focus:outline-none focus:border-[#1E5EFF] text-xs font-bold uppercase shadow-sm"
              />
            </div>

            <Button onClick={openAddModal} className="h-14 px-8 rounded-xl shadow-lg shadow-blue-500/10">
              <Plus className="w-5 h-5 mr-2" /> REGISTER UNIT
            </Button>
          </div>
        </div>

        {/* ROOMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
          {filteredRooms.map((room) => {

            const capacity = Number(room.capacity || 0);
            const current = Number(room.current_tenants || 0);
            const isFull = capacity > 0 && current >= capacity;

            const displayStatus =
              room.status === 'maintenance'
                ? 'maintenance'
                : isFull
                  ? 'FULL'
                  : 'AVAILABLE';

            return (
              <div key={room.id} className="group bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">

                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={room.image_url || '/images/room-placeholder.png'}
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                    }}
                  />

                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md border ${
                    displayStatus === 'AVAILABLE'
                      ? 'bg-emerald-500 text-white border-emerald-400'
                      : displayStatus === 'FULL'
                      ? 'bg-rose-500 text-white border-rose-400'
                      : 'bg-gray-500 text-white border-gray-400'
                  }`}>
                    {displayStatus}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">

                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-black text-[#0B1F3B] uppercase tracking-tight group-hover:text-[#1E5EFF] transition-colors">
                      {room.name}
                    </h3>

                    <div className="text-right">
                      <p className="text-[10px] font-black text-[#6B7280] uppercase">Monthly Rate</p>
                      <p className="text-lg font-black text-[#0B1F3B]">
                        ₱{Number(room.monthly_rate).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-[#6B7280]">
                      <MapPin size={16} className="text-[#22D3EE]" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        {room.location || 'NOT SPECIFIED'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[#6B7280]">
                      <Users size={16} className="text-[#22D3EE]" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        {current} / {capacity || 'N/A'} Persons
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-auto">

                    <button onClick={() => openEditModal(room)} className="flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-[#E5E7EB] text-[#0B1F3B] py-3 rounded-lg text-[10px] font-black uppercase transition-all">
                      <Settings2 size={14} /> Edit
                    </button>

                    <button onClick={() => promptDelete(room)} className="flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-rose-50 text-rose-500 py-3 rounded-lg text-[10px] font-black uppercase transition-all">
                      <Archive size={14} /> Archive
                    </button>

                    <button onClick={() => toggleStatus(room)} className="flex items-center justify-center gap-2 bg-[#1E5EFF]/10 text-[#1E5EFF] hover:bg-[#1E5EFF] hover:text-white py-3 rounded-lg text-[10px] font-black uppercase transition-all italic">
                      <Activity size={14} /> Status
                    </button>

                  </div>
                </div>
              </div>
            );
          })}

          {/* ADD CARD (UNCHANGED) */}
          <div onClick={openAddModal} className="aspect-square bg-white border-2 border-dashed border-[#E5E7EB] rounded-2xl flex flex-col items-center justify-center cursor-pointer group hover:border-[#1E5EFF] transition-all">
            <div className="p-4 bg-[#F8FAFC] group-hover:bg-[#1E5EFF]/10 rounded-full transition-colors">
              <Plus className="w-8 h-8 text-[#6B7280] group-hover:text-[#1E5EFF]" />
            </div>
            <h4 className="font-black text-[#0B1F3B] uppercase text-xs mt-4 tracking-widest">
              Register New Unit
            </h4>
          </div>
        </div>

        {/* MODALS (UNCHANGED) */}
        {mounted && createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsModalOpen(false)}
                  className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md"
                />

                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  onClick={e => e.stopPropagation()}
                  className="relative bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl border border-[#E5E7EB] overflow-hidden flex flex-col max-h-[90vh]"
                >

                  <div className="p-8 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F8FAFC]">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-[#0B1F3B]">
                      {editingId ? 'Modify' : 'Register'} <span className="text-[#1E5EFF]">Unit Node</span>
                    </h2>
                    <button onClick={() => setIsModalOpen(false)}>
                      <X size={24} />
                    </button>
                  </div>

                  <div className="p-8 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-5">

                      <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                      <input value={formData.monthly_rate} onChange={e => setFormData({ ...formData, monthly_rate: e.target.value })} />
                      <input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                      <input value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })} />

                      <Button type="submit">
                        {editingId ? 'COMMIT CHANGES' : 'INITIALIZE PROPERTY'}
                      </Button>

                    </form>
                  </div>

                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      </main>
    </div>
  );
}