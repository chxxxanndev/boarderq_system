import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <header className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Boarding House Management <br/><span className="text-blue-600">Made Simple.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Manage applications, payments, and maintenance requests in one place. Whether you're a landlord or a tenant, we've got you covered.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/rooms" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700">
            Browse Available Rooms
          </Link>
          <Link href="/tenant/dashboard" className="bg-white border border-gray-300 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50">
            Tenant Portal
          </Link>
        </div>
      </header>
    </div>
  );
}