'use client';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Card from '@/components/Card';
import { 
  Users, 
  Home, 
  CreditCard, 
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function LandlordDashboard() {
  const stats = [
    { label: 'Total Tenants', value: '24', icon: Users, color: 'bg-blue-500', trend: '+2 this month', trendUp: true },
    { label: 'Available Rooms', value: '5', icon: Home, color: 'bg-green-500', trend: '-1 this week', trendUp: false },
    { label: 'Revenue', value: '₱142,500', icon: CreditCard, color: 'bg-purple-500', trend: '+12% vs last month', trendUp: true },
    { label: 'Maintenance', value: '3', icon: AlertCircle, color: 'bg-orange-500', trend: '2 urgent', trendUp: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="landlord" />
      <div className="flex">
        <Sidebar active="dashboard" />
        <main className="flex-1 p-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-500">Welcome back! Here's what's happening with your properties.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.trend}
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card title="Recent Applications" className="lg:col-span-2">
              <div className="space-y-6">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">JD</div>
                      <div>
                        <h4 className="font-bold text-gray-900">John Doe</h4>
                        <p className="text-xs text-gray-500">Applied for Room 102 • 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-blue-600 text-sm font-bold hover:underline">Review</button>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Quick Actions">
              <div className="space-y-3">
                <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
                  Add New Room
                </button>
                <button className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
                  Post Announcement
                </button>
                <button className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
                  Generate Report
                </button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
