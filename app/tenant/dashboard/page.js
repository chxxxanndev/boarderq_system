'use client';
import Navbar from '@/components/Navbar';
import Card from '@/components/Card';
import PaymentCard from '@/components/PaymentCard';
import { mockPayments, mockAnnouncements } from '@/lib/db';
import { Home, CreditCard, Wrench, Bell, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TenantDashboard() {
  const currentRoom = {
    name: 'Premium Solo Room',
    number: '204',
    rent: 5500,
    dueDate: 'April 5, 2026',
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar role="tenant" />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hello, John!</h1>
          <p className="text-gray-500">Welcome to your Boarder-Q dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-lg shadow-blue-100 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-blue-100 text-sm font-medium mb-1">Current Room</p>
              <h2 className="text-3xl font-bold mb-6">{currentRoom.name}</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-xs uppercase font-bold tracking-wider">Room No.</p>
                  <p className="text-xl font-bold">{currentRoom.number}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-xs uppercase font-bold tracking-wider">Monthly Rent</p>
                  <p className="text-xl font-bold">₱{currentRoom.rent}</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500 rounded-full opacity-20"></div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Next Payment Due</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentRoom.dueDate}</h3>
              <p className="text-orange-500 text-sm font-bold flex items-center gap-1">
                <CreditCard className="w-4 h-4" /> ₱{currentRoom.rent} Pending
              </p>
            </div>
            <Link href="/tenant/payments" className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-center hover:bg-gray-800 transition-colors mt-4">
              Pay Now
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Announcements</h2>
              <Link href="/tenant/announcements" className="text-blue-600 text-sm font-bold hover:underline flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {mockAnnouncements.slice(0, 2).map((ann) => (
                <div key={ann.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl text-blue-600 h-fit">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{ann.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{ann.content}</p>
                    <p className="text-xs text-gray-400 mt-2">{ann.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/tenant/payments" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-3 hover:bg-gray-50 transition-colors">
                <div className="bg-green-50 p-3 rounded-xl text-green-600">
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-gray-700">Payments</span>
              </Link>
              <Link href="/tenant/maintenance" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-3 hover:bg-gray-50 transition-colors">
                <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
                  <Wrench className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-gray-700">Repairs</span>
              </Link>
              <Link href="/tenant/announcements" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-3 hover:bg-gray-50 transition-colors">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                  <Bell className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-gray-700">Notices</span>
              </Link>
              <Link href="/rooms" className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-3 hover:bg-gray-50 transition-colors">
                <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
                  <Home className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-gray-700">Browse</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex items-center justify-between md:hidden z-50">
        <Link href="/tenant/dashboard" className="flex flex-col items-center gap-1 text-blue-600">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/tenant/payments" className="flex flex-col items-center gap-1 text-gray-400">
          <CreditCard className="w-6 h-6" />
          <span className="text-[10px] font-bold">Pay</span>
        </Link>
        <Link href="/tenant/maintenance" className="flex flex-col items-center gap-1 text-gray-400">
          <Wrench className="w-6 h-6" />
          <span className="text-[10px] font-bold">Fix</span>
        </Link>
        <Link href="/tenant/announcements" className="flex flex-col items-center gap-1 text-gray-400">
          <Bell className="w-6 h-6" />
          <span className="text-[10px] font-bold">Alerts</span>
        </Link>
      </div>
    </div>
  );
}
