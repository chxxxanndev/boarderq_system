import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-white border-b sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-blue-600">BoarderQueue</Link>
      <div className="space-x-6 flex items-center">
        <Link href="/rooms" className="text-gray-600 hover:text-blue-600">Browse Rooms</Link>
        <Link href="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
        <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md">Demo Landlord</Link>
      </div>
    </nav>
  );
}