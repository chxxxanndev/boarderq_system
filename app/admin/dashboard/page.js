'use client';
import React, { useEffect, useState } from 'react';
import {
  Users, Home, CreditCard, AlertCircle, Activity,
  ChevronRight, FileText, Wrench, Clock, TrendingUp
} from 'lucide-react';
import AdminFooter from '@/components/AdminFooter';

function timeAgo(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const STATUS_STYLES = {
  pending:     'bg-amber-100 text-amber-700',
  approved:    'bg-emerald-100 text-emerald-700',
  rejected:    'bg-red-100 text-red-700',
  confirmed:   'bg-emerald-100 text-emerald-700',
  flagged:     'bg-red-100 text-red-700',
  in_progress: 'bg-blue-100 text-blue-700',
  resolved:    'bg-emerald-100 text-emerald-700',
  received:    'bg-sky-100 text-sky-700',
};

const TYPE_CONFIG = {
  application: {
    icon: FileText,
    color: 'bg-[#1E5EFF]',
    label: 'Application',
    description: (item) => `Applied for ${item.room_name}`,
  },
  payment: {
    icon: CreditCard,
    color: 'bg-emerald-500',
    label: 'Payment',
    description: (item) => `₱${Number(item.amount).toLocaleString()} via ${item.method?.toUpperCase()} — ${item.room_name}`,
  },
  maintenance: {
    icon: Wrench,
    color: 'bg-amber-500',
    label: 'Maintenance',
    description: (item) => `"${item.title}" — ${item.room_name}`,
  },
};

function ActivityItem({ item }) {
  const config = TYPE_CONFIG[item.type];
  if (!config) return null;
  const Icon = config.icon;
  const statusStyle = STATUS_STYLES[item.status] ?? 'bg-gray-100 text-gray-600';

  return (
    <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-[#F8FAFC] hover:bg-[#EEF2FF] border border-transparent hover:border-[#1E5EFF]/20 transition-all cursor-pointer">
      <div className={`${config.color} w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
        <Icon size={14} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-[#0B1F3B] text-xs sm:text-sm truncate">{item.actor}</span>
          <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${statusStyle}`}>
            {item.status?.replace('_', ' ')}
          </span>
        </div>
        <p className="text-[10px] sm:text-xs text-[#6B7280] mt-0.5 truncate">{config.description(item)}</p>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-[9px] sm:text-[10px] text-[#9CA3AF] flex items-center gap-1">
          <Clock size={9} /> {timeAgo(item.timestamp)}
        </span>
        <span className="text-[9px] sm:text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide hidden sm:block">
          {config.label}
        </span>
      </div>
    </div>
  );
}

function SnapshotSidebar({ data, activity }) {
  const occupancyPct = data?.occupancy?.total > 0
    ? Math.round((data.occupancy.occupied / data.occupancy.total) * 100)
    : 0;

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-8 shadow-sm flex flex-col gap-5 sm:gap-6">
      <h2 className="text-sm font-black text-[#0B1F3B] uppercase tracking-widest pb-4 border-b border-[#E5E7EB]">
        Snapshot
      </h2>

      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Occupancy Rate</p>
          <span className="text-sm font-black text-[#0B1F3B]">{occupancyPct}%</span>
        </div>
        <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#22D3EE] to-[#1E5EFF] rounded-full transition-all duration-700"
            style={{ width: `${occupancyPct}%` }}
          />
        </div>
        <p className="text-[10px] text-[#9CA3AF] mt-1">
          {data?.occupancy?.occupied ?? 0} of {data?.occupancy?.total ?? 0} rooms occupied
        </p>
      </div>

      <div className="border-t border-[#F3F4F6]" />

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="bg-amber-500 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0">
          <CreditCard size={16} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">Pending Payments</p>
          <p className="text-xl sm:text-2xl font-black text-[#0B1F3B] leading-tight">{data?.pendingPayments ?? 0}</p>
        </div>
        {data?.pendingPayments > 0 && (
          <span className="text-[9px] sm:text-[10px] font-black bg-amber-100 text-amber-700 px-2 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
            Action Needed
          </span>
        )}
      </div>

      <div className="border-t border-[#F3F4F6]" />

      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mb-3">Activity Breakdown</p>
        <div className="space-y-3">
          {Object.entries(TYPE_CONFIG).map(([key, cfg]) => {
            const count = activity.filter(a => a.type === key).length;
            const Icon = cfg.icon;
            return (
              <div key={key} className="flex items-center gap-3">
                <div className={`${cfg.color} w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon size={13} className="text-white" />
                </div>
                <p className="text-xs font-bold text-[#6B7280] flex-1">{cfg.label}s</p>
                <span className="text-sm font-black text-[#0B1F3B]">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#F3F4F6]" />

      {data?.newestTenant && (
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mb-3">Newest Tenant</p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xs sm:text-sm">
                {data.newestTenant.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black text-[#0B1F3B] truncate">{data.newestTenant.name}</p>
              <p className="text-[10px] text-[#9CA3AF] truncate">{data.newestTenant.room_name}</p>
            </div>
          </div>
        </div>
      )}

      {data?.topRoom && (
        <>
          <div className="border-t border-[#F3F4F6]" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mb-3">Top Revenue Room</p>
            <div className="bg-[#F8FAFC] rounded-xl p-3 sm:p-4 border border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={14} className="text-[#1E5EFF]" />
                <p className="text-sm font-black text-[#0B1F3B]">{data.topRoom.name}</p>
              </div>
              <p className="text-lg sm:text-xl font-black text-[#1E5EFF]">
                ₱{Number(data.topRoom.total).toLocaleString()}
              </p>
              <p className="text-[10px] text-[#9CA3AF]">total confirmed revenue</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function LandlordDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      });
  }, []);

  const stats = [
    { label: 'Total Tenants',   value: data?.tenants ?? '0',   icon: Users,       bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'Available Rooms', value: data?.available ?? '0', icon: Home,        bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
    { label: 'Total Revenue',   value: `₱${data?.revenue ? (data.revenue / 1000).toFixed(1) : '0'}K`, icon: CreditCard, bgColor: 'bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF]', textColor: 'text-white' },
    { label: 'Maintenance',     value: data?.maintenance ?? '0', icon: AlertCircle, bgColor: 'bg-white', textColor: 'text-[#0B1F3B]' },
  ];

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] font-sans text-[#1E5EFF]">
      <Activity className="animate-spin mr-2" /> BOOTING CORE SERVICES...
    </div>
  );

  const activity = data?.activity ?? [];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">
      <main className="flex-1 p-4 sm:p-8 lg:p-12 flex flex-col">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase leading-none text-[#0B1F3B]">
              DASH<span className="text-[#1E5EFF]">BOARD</span>
            </h1>
            <p className="text-[#6B7280] text-[10px] font-black tracking-[0.3em] uppercase mt-2">
              Admin Management
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`${stat.bgColor} p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center h-32 sm:h-44 shadow-sm border border-[#E5E7EB]/50 relative overflow-hidden transition-all text-center`}
            >
              <div className="z-10">
                <h2 className={`text-[8px] sm:text-[11px] font-black uppercase tracking-widest mb-1 ${stat.textColor === 'text-white' ? 'opacity-70' : 'text-[#6B7280]'}`}>
                  {stat.label}
                </h2>
                <p className={`text-2xl sm:text-4xl font-black tracking-tighter ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <stat.icon
                className={`absolute -right-4 -bottom-4 opacity-10 -rotate-12 hidden xs:block ${stat.textColor === 'text-white' ? 'text-white' : 'text-[#0B1F3B]'}`}
                size={80}
              />
              {stat.bgColor === 'bg-white' && (
                <div className="absolute top-0 left-0 w-full h-1.5" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">

          <div className="xl:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6 pb-4 border-b border-[#E5E7EB]">
              <h2 className="text-sm font-black text-[#0B1F3B] uppercase tracking-widest">Recent Activity</h2>
              <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
                  <span key={key} className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold text-[#6B7280] uppercase tracking-wide">
                    <span className={`w-2 h-2 rounded-full ${cfg.color}`} />
                    {cfg.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {activity.length === 0 ? (
                <p className="text-sm text-[#9CA3AF] text-center py-8">No recent activity.</p>
              ) : (
                activity.map((item, i) => (
                  <ActivityItem key={`${item.type}-${item.id}-${i}`} item={item} />
                ))
              )}
            </div>
          </div>

          <SnapshotSidebar data={data} activity={activity} />
        </div>

        <AdminFooter />
      </main>
    </div>
  );
}