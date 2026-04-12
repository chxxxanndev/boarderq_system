'use client';
import React, { useEffect, useState } from 'react';
import { 
  Home, CreditCard, Wrench, ChevronRight, Zap, ShieldCheck, User,
  ArrowUpRight, ArrowDownRight, Loader2, Calendar, LogOut
} from 'lucide-react';
import Button from '@/components/Button';

export default function TenantDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noticeDate, setNoticeDate] = useState(""); // State for move-out date

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
    <div className="h-screen w-full flex items-center justify-center bg-black font-mono text-[#00A3CC]">
      <Loader2 className="animate-spin mr-2" /> SYNCHRONIZING NODE...
    </div>
  );

  const getPaymentTrend = () => {
    const status = data?.paymentStatus;
    if (status === 'confirmed') return { text: 'PAID', up: true };
    if (status === 'pending') return { text: 'VERIFYING', up: true };
    return { text: 'UNPAID', up: false };
  };

  const paymentTrend = getPaymentTrend();

  const stats = [
    { label: 'Room Assignment', value: data?.user?.room_name || 'PENDING', icon: Home, bgColor: 'bg-[#C5C7C7]', trend: 'Floor 1', trendUp: true },
    { label: 'Monthly Rent', value: `₱${data?.user?.monthly_rate || '0'}`, icon: CreditCard, bgColor: 'bg-[#B0B2B2]', trend: paymentTrend.text, trendUp: paymentTrend.up },
    { label: 'Utility Balance', value: '₱0.00', icon: Zap, bgColor: 'bg-[#A1A3A3]', trend: 'Current', trendUp: true },
    { label: 'Account Status', value: 'ACTIVE', icon: ShieldCheck, bgColor: 'bg-[#919393]', trend: 'Verified', trendUp: true },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black via-[#2a2a2a] via-20% to-[#efefef] font-sans text-white">     
      <main className="flex-1 p-8 lg:p-12">
        <div className="flex items-baseline gap-4 mb-12">
          <h1 className="text-4xl font-[1000] tracking-tighter uppercase leading-none text-white">
            HELLO, <span className="text-[#00A3CC]">{data?.user?.name ? data.user.name.split(' ')[0] : 'RESIDENT'}!</span>          
          </h1>
          <div className="bg-[#00A3CC]/10 border border-[#00A3CC]/20 px-4 py-1 rounded-sm">
            <span className="text-[#00A3CC] text-[9px] font-black tracking-[0.4em] uppercase">RESIDENT NODE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.bgColor} p-6 rounded-2xl flex flex-col items-center justify-center h-40 shadow-2xl relative overflow-hidden group transition-transform hover:scale-[1.02]`}>
              <div className={`absolute top-3 right-4 flex items-center gap-1 font-bold text-[9px] ${stat.trendUp ? 'text-emerald-700' : 'text-rose-700'}`}>
                {stat.trend.toUpperCase()}
              </div>
              <h2 className="text-sm font-[1000] text-black uppercase mb-1">{stat.label}</h2>
              <p className="text-3xl font-[1000] text-white tracking-tighter z-10">{stat.value}</p>
              <stat.icon className="absolute -left-2 -bottom-2 w-12 h-12 text-black/5 -rotate-12" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-8">
            <div className="flex justify-between items-end mb-8 border-b-2 border-black pb-3">
              <h2 className="text-sm font-black text-white uppercase tracking-[0.3em]">SYSTEM ANNOUNCEMENTS</h2>
              <div className="bg-black px-3 py-1 text-[9px] font-black text-white">
                {data?.announcements?.length.toString().padStart(2, '0')} BROADCASTS
              </div>
            </div>
            
            <div className="space-y-3">
              {data?.announcements?.map((ann, i) => (
                <div key={i} className="bg-[#6F7171] hover:bg-[#5a5c5c] p-5 rounded-lg flex items-center justify-between group cursor-pointer shadow-md border-l-4 border-transparent hover:border-[#00A3CC]">
                  <div>
                    <h4 className="font-black text-white uppercase text-lg">{ann.title}</h4>
                    <p className="text-[10px] font-bold text-white/50 tracking-widest">{new Date(ann.created_at).toLocaleDateString()}</p>
                  </div>
                  <button className="text-[10px] font-black text-white group-hover:text-[#00A3CC] flex items-center gap-2">
                    REVIEW <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-black/40 backdrop-blur-xl p-8 border-l-4 border-[#00A3CC] shadow-2xl rounded-r-lg">
              <h3 className="text-lg font-black uppercase tracking-widest mb-6 text-white">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start rounded-xl bg-[#00A3CC] hover:bg-[#008BB3] text-[10px] tracking-[0.2em] font-[1000] h-12">
                  <CreditCard className="mr-3 w-4 h-4" /> INITIALIZE PAYMENT
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl border-white/20 text-white hover:bg-white hover:text-black text-[10px] tracking-[0.2em] h-12">
                  <Wrench className="mr-3 w-4 h-4" /> REPAIR REQUEST
                </Button>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00A3CC]">Next rent due on:</span>
              <p className="text-white font-black underline decoration-[#00A3CC] mt-1 uppercase">{data?.nextDueDate}</p>
            </div>

            {/* LEASE MANAGEMENT CARD */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00A3CC]">Lease Status:</span>
              <p className="text-white font-black mt-1 uppercase text-sm">
                {data?.user?.move_out_date 
                  ? `Scheduled Move-out: ${new Date(data.user.move_out_date).toLocaleDateString()}` 
                  : 'Ongoing Contract'}
              </p>
              
              {!data?.user?.move_out_date && (
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-[9px] font-bold text-white/40 uppercase mb-2">Schedule Move-out Notice</p>
                  <div className="flex gap-2">
                    <input 
                      type="date" 
                      className="bg-black border border-white/10 text-[10px] p-2 rounded text-white outline-none flex-1" 
                      onChange={(e) => setNoticeDate(e.target.value)}
                    />
                    <button onClick={handleScheduleMoveOut} className="bg-white/10 hover:bg-red-500 text-white px-3 py-1 text-[9px] font-black uppercase rounded transition-colors">
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}