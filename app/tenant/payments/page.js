'use client';
import Navbar from '@/components/Navbar';
import PaymentCard from '@/components/PaymentCard';
import { mockPayments } from '@/lib/db';
import { CreditCard, Plus } from 'lucide-react';

export default function TenantPayments() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Navbar role="tenant" />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Payments</h1>
            <p className="text-gray-500">View and pay your rent bills.</p>
          </div>
          <button className="bg-blue-600 text-white p-3 rounded-full shadow-lg shadow-blue-100 md:rounded-xl md:px-6 md:py-3 flex items-center gap-2">
            <Plus className="w-6 h-6" />
            <span className="hidden md:inline font-bold">Pay Rent</span>
          </button>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-orange-50 p-4 rounded-2xl text-orange-600">
              <CreditCard className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Outstanding Balance</p>
              <h2 className="text-3xl font-bold text-gray-900">₱5,500</h2>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
            Pay Outstanding Balance
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment History</h2>
        <div className="space-y-4">
          {mockPayments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))}
        </div>
      </main>
    </div>
  );
}
