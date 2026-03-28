'use client';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import RoomCard from '@/components/RoomCard';
import { mockRooms } from '@/lib/db';
import { Plus, Search } from 'lucide-react';

export default function LandlordRooms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="landlord" />
      <div className="flex">
        <Sidebar active="rooms" />
        <main className="flex-1 p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Rooms</h1>
              <p className="text-gray-500">Add, edit, or remove rooms from your property.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search rooms..." 
                  className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Plus className="w-5 h-5" /> Add Room
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRooms.map((room) => (
              <div key={room.id} className="relative group">
                <RoomCard room={room} />
                <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white p-2 rounded-lg shadow-lg text-gray-600 hover:text-blue-600">
                    Edit
                  </button>
                  <button className="bg-white p-2 rounded-lg shadow-lg text-gray-600 hover:text-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
