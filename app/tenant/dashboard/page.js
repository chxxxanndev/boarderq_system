'use client';
import React, { useEffect, useState } from 'react';
import { 
  Home, CreditCard, Wrench, ChevronRight, Zap, ShieldCheck, 
  Loader2, Calendar, Bell
} from 'lucide-react';
import Button from '@/components/Button';
import TenantFooter from '@/components/TenantFooter';

export default function TenantDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noticeDate, setNoticeDate] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('/api/tenant/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Fetch error");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleScheduleMoveOut = async () => {
    if (!noticeDate) return alert("Please select a date first.");
    try {
      const res = await fetch('/api/tenant/notice', {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ date: noticeDate })
      });
      if (res.ok) {
        alert("Notice submitted successfully.");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-white font-sans text-[#1E5EFF]">
      <Loader2 className="animate-spin mr-2" /> SYNCHRONIZING...
    </div>
  );

  const getPaymentTrend = () => {
    const status = data?.paymentStatus;
    if (status === 'confirmed') return { text: 'PAID', color: 'text-emerald-500' };
    if (status === 'pending') return { text: 'VERIFYING', color: 'text-amber-500' };
    return { text: 'UNPAID', color: 'text-rose-500' };
  };

  const paymentTrend = getPaymentTrend();

  const stats = [
    { label: 'Room Assignment', value: data?.user?.room_name || 'PENDING', icon: Home, trend: 'Floor 1' },
    { label: 'Monthly Rent', value: `₱${data?.user?.monthly_rate || '0'}`, icon: CreditCard, trend: paymentTrend.text, trendColor: paymentTrend.color },
    { label: 'Utility Balance', value: '₱0.00', icon: Zap, trend: 'Current' },
    { label: 'Account Status', value: 'ACTIVE', icon: ShieldCheck, trend: 'Verified' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">     
      <main className="flex-1 p-8 lg:p-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase leading-none">
              Welcome back, <span className="text-[#1E5EFF]">{data?.user?.name ? data.user.name.split(' ')[0] : 'RESIDENT'}</span>          
            </h1>
            <p className="text-[#6B7280] text-xs font-bold mt-2 uppercase tracking-widest">Resident Dashboard Oversight</p>
          </div>
        </div>

        {/* Stats Grid - Using the requested Blue/Cyan Gradient */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] p-6 rounded-2xl flex flex-col justify-between h-44 shadow-lg shadow-blue-500/10 relative overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="flex justify-between items-start z-10">
                <div className="p-2 bg-white/20 rounded-lg">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-[10px] font-black px-2 py-1 bg-white/20 rounded text-white`}>
                  {stat.trend.toUpperCase()}
                </span>
              </div>
              <div className="z-10">
                <h2 className="text-xs font-bold text-white/80 uppercase mb-1">{stat.label}</h2>
                <p className="text-2xl font-black text-white tracking-tight">{stat.value}</p>
              </div>
              {/* Decorative background icon */}
              <stat.icon className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 -rotate-12" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8 border-b border-[#E5E7EB] pb-5">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#2563EB]" />
                <h2 className="text-sm font-black text-[#0B1F3B] uppercase tracking-widest">Announcements</h2>
              </div>
              <div className="bg-[#1E5EFF]/10 px-3 py-1 rounded text-[10px] font-black text-[#1E5EFF]">
                {data?.announcements?.length.toString().padStart(2, '0')} RECENT
              </div>
            </div>
            
            <div className="space-y-4">
              {data?.announcements?.map((ann, i) => (
                <div key={i} className="group bg-[#F8FAFC] hover:bg-white border border-[#E5E7EB] hover:border-[#1E5EFF] p-5 rounded-xl flex items-center justify-between transition-all cursor-pointer shadow-sm">
                  <div>
                    <h4 className="font-bold text-[#0B1F3B] uppercase text-base group-hover:text-[#1E5EFF] transition-colors">{ann.title}</h4>
                    <p className="text-[10px] font-bold text-[#6B7280] mt-1 flex items-center gap-2 italic">
                      <Calendar className="w-3 h-3" /> {new Date(ann.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#E5E7EB] group-hover:text-[#1E5EFF] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">

            <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Upcoming Obligation:</span>
              <p className="text-[#0B1F3B] font-black text-lg mt-1 uppercase border-b-2 border-[#22D3EE] inline-block">{data?.nextDueDate || '---'}</p>
            </div>

            <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Lease Status:</span>
              </div>
              <p className="text-[#0B1F3B] font-black uppercase text-xs mb-4">
                {data?.user?.move_out_date 
                  ? `Move-out scheduled: ${new Date(data.user.move_out_date).toLocaleDateString()}` 
                  : 'Active Contract'}
              </p>
              
              {!data?.user?.move_out_date && (
                <div className="pt-4 border-t border-[#E5E7EB]">
                  <p className="text-[9px] font-bold text-[#6B7280] uppercase mb-2">Notice of Intent to Vacate</p>
                  <div className="flex flex-col gap-2">
                    <input 
                      type="date" 
                      className="bg-[#F8FAFC] border border-[#E5E7EB] text-[10px] p-2 rounded-lg text-[#0B1F3B] outline-none focus:border-[#1E5EFF]" 
                      onChange={(e) => setNoticeDate(e.target.value)}
                    />
                    <button onClick={handleScheduleMoveOut} className="bg-[#E5E7EB] hover:bg-rose-500 hover:text-white text-[#0B1F3B] px-3 py-2 text-[10px] font-black uppercase rounded-lg transition-all">
                      Submit Notice
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <TenantFooter />
        
      </main>
    </div>
  );
}