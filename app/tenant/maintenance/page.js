'use client';
import Navbar from '@/components/Navbar';
import MaintenanceCard from '@/components/MaintenanceCard';
import { mockMaintenance } from '@/lib/db';
import { Plus, Wrench } from 'lucide-react';

export default function TenantMaintenance() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar role="tenant" />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Maintenance</h1>
            <p className="text-gray-500">Report issues or track repair status.</p>
          </div>
          <button className="bg-orange-600 text-white p-3 rounded-full shadow-lg shadow-orange-100 md:rounded-xl md:px-6 md:py-3 flex items-center gap-2">
            <Plus className="w-6 h-6" />
            <span className="hidden md:inline font-bold">New Request</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-blue-600 mb-1">2</p>
            <p className="text-xs text-gray-500 font-bold uppercase">Active</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-green-600 mb-1">12</p>
            <p className="text-xs text-gray-500 font-bold uppercase">Completed</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <p className="text-3xl font-bold text-orange-600 mb-1">1</p>
            <p className="text-xs text-gray-500 font-bold uppercase">Pending</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">My Requests</h2>
        <div className="space-y-4">
          {mockMaintenance.filter(r => r.tenantName === 'Alice Johnson').map((request) => (
            <MaintenanceCard key={request.id} request={request} />
          ))}
        </div>
      </main>
    </div>
  );
}
