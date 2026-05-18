'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, CreditCard, Wrench, ChevronRight, Zap, ShieldCheck,
  Loader2, Calendar, Clock, CheckCircle2, AlertTriangle,
  Receipt, Activity, KeyRound, CalendarDays, TrendingUp,
  FileText, LogOut
} from 'lucide-react';
import TenantFooter from '@/components/TenantFooter';

// Helper for Scroll Reveal
const RevealOnScroll = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function timeAgo(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const PAYMENT_STATUS = {
  confirmed: { text: 'PAID',      color: 'bg-emerald-100 text-emerald-700' },
  pending:   { text: 'VERIFYING', color: 'bg-amber-100 text-amber-700' },
  flagged:   { text: 'FLAGGED',   color: 'bg-red-100 text-red-700' },
  unpaid:    { text: 'UNPAID',    color: 'bg-rose-100 text-rose-700' },
};

const MAINTENANCE_STATUS = {
  pending:     { color: 'bg-amber-100 text-amber-700',    label: 'Pending' },
  received:    { color: 'bg-sky-100 text-sky-700',        label: 'Received' },
  in_progress: { color: 'bg-blue-100 text-blue-700',      label: 'In Progress' },
  resolved:    { color: 'bg-emerald-100 text-emerald-700', label: 'Resolved' },
};

const ACTIVITY_CONFIG = {
  payment: {
    icon: CreditCard,
    color: 'bg-emerald-500',
    getMessage: (item) => item.title,
  },
  maintenance: {
    icon: Wrench,
    color: 'bg-amber-500',
    getMessage: (item) => item.title,
  },
};

function StatusBadge({ status, map }) {
  const cfg = map[status] ?? { color: 'bg-gray-100 text-gray-600', label: status };
  return (
    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${cfg.color}`}>
      {cfg.label ?? cfg.text}
    </span>
  );
}

function ActivityItem({ item }) {
  const config = ACTIVITY_CONFIG[item.type];
  if (!config) return null;
  const Icon = config.icon;
  const statusMap = item.type === 'payment' ? PAYMENT_STATUS : MAINTENANCE_STATUS;
  const statusCfg = statusMap[item.status] ?? { color: 'bg-gray-100 text-gray-600', label: item.status };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#F8FAFC] hover:bg-[#EEF2FF] border border-transparent hover:border-[#1E5EFF]/20 transition-all">
      <div className={`${config.color} w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon size={15} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-black uppercase text-[#0B1F3B] truncate">{config.getMessage(item)}</p>
        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${statusCfg.color}`}>
          {statusCfg.label ?? statusCfg.text}
        </span>
      </div>
      <span className="text-[9px] text-[#9CA3AF] flex items-center gap-1 flex-shrink-0">
        <Clock size={9} /> {timeAgo(item.date)}
      </span>
    </div>
  );
}

export default function TenantDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noticeDate, setNoticeDate] = useState('');
  const [notification, setNotification] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const showNotify = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('/api/tenant/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setData(await res.json());
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleScheduleMoveOut = async () => {
    if (!noticeDate) {
      showNotify('Please select a date first.', 'error');
      return;
    }
    setSubmitting(true);
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
        showNotify('Move-out notice submitted successfully.');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        showNotify('Failed to submit notice.', 'error');
      }
    } catch {
      showNotify('Server connection error.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] font-sans text-[#1E5EFF]">
      <Loader2 className="animate-spin mr-2" /> SYNCHRONIZING...
    </div>
  );

  const paymentStatus = PAYMENT_STATUS[data?.paymentStatus] ?? PAYMENT_STATUS.unpaid;

  const stats = [
    {
      label: 'Room Assignment',
      value: data?.user?.room_name || 'PENDING',
      icon: Home,
      badge: data?.user?.location || 'N/A',
      gradient: true,
    },
    {
      label: 'Monthly Rent',
      value: `₱${Number(data?.user?.monthly_rate || 0).toLocaleString()}`,
      icon: CreditCard,
      badge: paymentStatus.text,
      badgeColor: paymentStatus.color,
      gradient: false,
    },
    {
      label: 'Total Paid',
      value: `₱${Number(data?.totalPaid || 0).toLocaleString()}`,
      icon: TrendingUp,
      badge: 'Confirmed',
      gradient: true,
    },
    {
      label: 'Account Status',
      value: data?.user?.status?.toUpperCase() || 'ACTIVE',
      icon: ShieldCheck,
      badge: 'Verified',
      gradient: false,
    },
  ];

  // CSS for the shining gradient effect
  const shineStyles = `
    @keyframes shine {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    .header-shine {
      background: linear-gradient(90deg, #F8FAFC 0%, #EEF2FF 25%, #E0E7FF 50%, #EEF2FF 75%, #F8FAFC 100%);
      background-size: 200% 100%;
      animation: shine 4s infinite linear;
    }
  `;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">
      <style>{shineStyles}</style>

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
            className={`fixed top-100 left-1/2 -translate-x-1/2 z-[10001] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px] border ${
              notification.type === 'error'
                ? 'bg-rose-500 border-rose-400 text-white'
                : 'bg-emerald-500 border-emerald-400 text-white'
            }`}
          >
            {notification.type === 'error' ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
            <span className="text-xs font-black uppercase tracking-wider">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 p-4 sm:p-8 lg:p-12 min-w-0">
        
        {/* WELCOME HEADER WITH SHINE */}
        <RevealOnScroll>
          <div className="header-shine border border-[#E5E7EB] p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 shadow-sm">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight uppercase leading-none">
                Welcome back, <span className="text-[#1E5EFF]">{data?.user?.name?.split(' ')[0] ?? 'RESIDENT'}</span>
              </h1>
              <p className="text-[#6B7280] text-[10px] font-black tracking-[0.3em] uppercase mt-2">Resident Dashboard Oversight</p>
            </div>
            {data?.daysSinceMoveIn > 0 && (
              <div className="bg-white border border-[#E5E7EB] px-5 py-2 rounded-xl flex items-center gap-3 shadow-sm">
                <CalendarDays size={14} className="text-[#1E5EFF]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3B]">
                  Day {data.daysSinceMoveIn} of tenancy
                </span>
              </div>
            )}
          </div>
        </RevealOnScroll>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <div className={`p-6 rounded-2xl flex flex-col justify-between min-h-[9rem] sm:h-44 shadow-sm relative overflow-hidden transition-transform hover:scale-[1.02] ${
                stat.gradient
                  ? 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]'
                  : 'bg-white border border-[#E5E7EB]/50'
              }`}>
                {!stat.gradient && <div className="absolute top-0 left-0 w-full h-1.5" />}
                <div className="flex justify-between items-start z-10">
                  <div className={`p-2 rounded-lg ${stat.gradient ? 'bg-white/20' : 'bg-[#1E5EFF]/10'}`}>
                    <stat.icon className={`w-5 h-5 ${stat.gradient ? 'text-white' : 'text-[#1E5EFF]'}`} />
                  </div>
                  <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest ${
                    stat.badgeColor
                      ? stat.badgeColor
                      : stat.gradient
                        ? 'text-white'
                        : 'bg-[#F3F4F6] text-[#6B7280]'
                  }`}>
                    {stat.badge}
                  </span>
                </div>
                <div className="z-10">
                  <h2 className={`text-[10px] font-black uppercase tracking-widest mb-1 ${stat.gradient ? 'text-white/70' : 'text-[#6B7280]'}`}>
                    {stat.label}
                  </h2>
                  <p className={`text-2xl font-black tracking-tight ${stat.gradient ? 'text-white' : 'text-[#0B1F3B]'}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="xl:col-span-2 space-y-8">

            {/* RECENT ACTIVITY */}
            <RevealOnScroll delay={0.2}>
              <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-[#E5E7EB] header-shine flex items-center gap-4">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] rounded-xl flex items-center justify-center">
                    <Activity size={16} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-widest text-[#0B1F3B]">Recent Activity</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mt-0.5">Your latest payments & requests</p>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  {data?.recentActivity?.length > 0 ? (
                    data.recentActivity.map((item, i) => (
                      <ActivityItem key={`${item.type}-${item.id}-${i}`} item={item} />
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <Activity className="mx-auto text-[#E5E7EB] mb-3" size={36} />
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">No activity yet</p>
                    </div>
                  )}
                </div>
              </div>
            </RevealOnScroll>

            {/* MAINTENANCE */}
            <RevealOnScroll delay={0.3}>
              <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-[#E5E7EB] header-shine flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] rounded-xl flex items-center justify-center">
                      <Wrench size={16} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black uppercase tracking-widest text-[#0B1F3B]">Maintenance Requests</h2>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mt-0.5">Your submitted requests</p>
                    </div>
                  </div>
                  {data?.maintenance?.length > 0 && (
                    <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full uppercase tracking-widest">
                      {data.maintenance.filter(m => m.status !== 'resolved').length} Active
                    </span>
                  )}
                </div>

                {data?.maintenance?.length === 0 ? (
                  <div className="py-12 text-center">
                    <Wrench className="mx-auto text-[#E5E7EB] mb-3" size={36} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">No maintenance requests</p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#E5E7EB]">
                    {data.maintenance.map((m) => {
                      const cfg = MAINTENANCE_STATUS[m.status] ?? { color: 'bg-gray-100 text-gray-600', label: m.status };
                      return (
                        <div key={m.id} className="px-8 py-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-all">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Wrench size={14} className="text-amber-500" />
                            </div>
                            <div>
                              <p className="text-xs font-black uppercase text-[#0B1F3B]">{m.title}</p>
                              <p className="text-[9px] text-[#9CA3AF] mt-0.5 flex items-center gap-1">
                                <Clock size={9} /> {timeAgo(m.created_at)}
                              </p>
                            </div>
                          </div>
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${cfg.color}`}>
                            {cfg.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </RevealOnScroll>
          </div>

          <div className="space-y-6">

            {/* PAYMENT SUMMARY */}
            <RevealOnScroll delay={0.4}>
              <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-[#E5E7EB] header-shine">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] rounded-xl flex items-center justify-center">
                      <Receipt size={16} className="text-white" />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#0B1F3B]">Payment Summary</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Latest Status</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${paymentStatus.color}`}>
                      {paymentStatus.text}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Pending</span>
                    <span className="text-sm font-black text-[#0B1F3B]">{data?.pendingPayments ?? 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Total Confirmed</span>
                    <span className="text-sm font-black text-emerald-600">₱{Number(data?.totalPaid ?? 0).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-[#E5E7EB] pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Next Due</span>
                      <span className="text-[10px] font-black text-[#0B1F3B]">{data?.nextDueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* ROOM INFO */}
            {data?.user?.amenities && (
              <RevealOnScroll delay={0.5}>
                <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-[#E5E7EB] header-shine">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] rounded-xl flex items-center justify-center">
                        <Home size={16} className="text-white" />
                      </div>
                      <h3 className="text-sm font-black uppercase tracking-widest text-[#0B1F3B]">Room Info</h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    {data?.user?.location && (
                      <div className="flex justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Location</span>
                        <span className="text-[10px] font-black text-[#0B1F3B]">{data.user.location}</span>
                      </div>
                    )}
                    {data?.user?.move_in_date && (
                      <div className="flex justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Move-in</span>
                        <span className="text-[10px] font-black text-[#0B1F3B]">
                          {new Date(data.user.move_in_date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-[#E5E7EB]">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mb-2">Amenities</p>
                      <p className="text-[10px] font-bold text-[#0B1F3B] leading-relaxed">{data.user.amenities}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* LEASE STATUS */}
            <RevealOnScroll delay={0.6}>
              <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-[#E5E7EB] header-shine">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] rounded-xl flex items-center justify-center">
                      <KeyRound size={16} className="text-white" />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#0B1F3B]">Lease Status</h3>
                  </div>
                </div>
                <div className="p-6">
                  {data?.user?.move_out_date ? (
                    <div className="flex items-start gap-3 bg-rose-50 border border-rose-100 rounded-xl p-4">
                      <LogOut size={16} className="text-rose-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-rose-600">Move-out Scheduled</p>
                        <p className="text-sm font-black text-rose-700 mt-1">
                          {new Date(data.user.move_out_date).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Active Contract</span>
                      </div>
                      <div className="border-t border-[#E5E7EB] pt-4">
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#6B7280] mb-3">Notice of Intent to Vacate</p>
                        <div className="flex flex-col gap-2">
                          <input
                            type="date"
                            className="bg-[#F8FAFC] border border-[#E5E7EB] text-[10px] p-3 rounded-xl text-[#0B1F3B] outline-none focus:border-[#1E5EFF]"
                            onChange={(e) => setNoticeDate(e.target.value)}
                          />
                          <button
                            onClick={handleScheduleMoveOut}
                            disabled={submitting}
                            className="bg-[#F3F4F6] hover:bg-rose-500 hover:text-white text-[#0B1F3B] px-3 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {submitting ? <Loader2 size={13} className="animate-spin" /> : <LogOut size={13} />}
                            Submit Notice
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </RevealOnScroll>

          </div>
        </div>

        <RevealOnScroll delay={0.8}>
          <TenantFooter />
        </RevealOnScroll>
      </main>
    </div>
  );
}