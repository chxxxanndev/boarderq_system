'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, X, CreditCard, Loader2, ClipboardList,
  ShieldAlert, Activity, Eye, CalendarDays,
  CheckCircle2, AlertTriangle, Clock, Receipt,
  TrendingUp, Banknote, Smartphone
} from 'lucide-react';
import AdminFooter from '@/components/AdminFooter';

const TABS = ['all', 'pending', 'confirmed', 'flagged'];

const STATUS_CONFIG = {
  pending:   { label: 'Pending',   color: 'bg-amber-100 text-amber-700',    icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  flagged:   { label: 'Flagged',   color: 'bg-red-100 text-red-700',         icon: AlertTriangle },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, color: 'bg-gray-100 text-gray-600', icon: Clock };
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${cfg.color}`}>
      <Icon size={10} /> {cfg.label}
    </span>
  );
}

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [paymentToFlag, setPaymentToFlag] = useState(null);
  const [flagNote, setFlagNote] = useState('');
  const [proofModal, setProofModal] = useState(null);
  const [processing, setProcessing] = useState(null);

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/admin/payments');
      if (!res.ok) return;
      setPayments(await res.json());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { setMounted(true); fetchPayments(); }, []);

  const handleVerify = async (id, status, notes = '') => {
    setProcessing(id);
    try {
      const res = await fetch('/api/admin/payments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, notes }),
      });
      if (res.ok) {
        setPaymentToFlag(null);
        setFlagNote('');
        fetchPayments();
      }
    } finally {
      setProcessing(null);
    }
  };

  const total      = payments.length;
  const confirmed  = payments.filter(p => p.status === 'confirmed');
  const pending    = payments.filter(p => p.status === 'pending');
  const flagged    = payments.filter(p => p.status === 'flagged');
  const totalRev   = confirmed.reduce((s, p) => s + Number(p.amount), 0);

  const filtered = activeTab === 'all' ? payments : payments.filter(p => p.status === activeTab);

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] font-sans text-[#1E5EFF]">
      <Loader2 className="animate-spin mr-2" /> PROCESSING FINANCIAL RECORDS...
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B] overflow-hidden">
      <main className="flex-1 p-4 sm:p-8 lg:p-12 min-w-0">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase leading-none">
              REVENUE <span className="text-[#1E5EFF]">AUDIT</span>
            </h1>
            <p className="text-[#6B7280] text-[10px] font-black tracking-[0.3em] uppercase mt-2">Financial Verification Module</p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] p-6 rounded-2xl flex flex-col justify-between h- shadow-sm relative overflow-hidden">
            <div>
              <h2 className="text-[11px] font-black uppercase tracking-widest mb-1 opacity-70 text-white">Total Revenue</h2>
              <p className="text-4xl font-black tracking-tighter text-white">₱{totalRev.toLocaleString()}</p>
            </div>
          </div>

        <div className="bg-white p-6 rounded-2xl flex flex-col justify-between h-36 shadow-sm border border-[#E5E7EB]/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5" />
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-widest mb-1 text-[#6B7280]">Pending Review</h2>
            <p className="text-4xl font-black tracking-tighter text-[#0B1F3B]">{pending.length}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] p-6 rounded-2xl flex flex-col justify-between h-36 shadow-sm relative overflow-hidden">
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-widest mb-1 opacity-70 text-white">Confirmed</h2>
            <p className="text-4xl font-black tracking-tighter text-white">{confirmed.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl flex flex-col justify-between h-36 shadow-sm border border-[#E5E7EB]/50 relative overflow-hidden">
          <div className="absolute top-100 left-0 w-full h-1.5" />
          <div>
            <h2 className="text-[11px] font-black uppercase tracking-widest mb-1 text-[#6B7280]">Flagged</h2>
            <p className="text-4xl font-black tracking-tighter text-[#0B1F3B]">{flagged.length}</p>
          </div>
        </div>
      </div>

        <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm mb-10">

          <div className="px-8 py-6 border-b border-[#E5E7EB] bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] rounded-xl flex items-center justify-center">
                <Receipt size={16} className="text-white" />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-[#0B1F3B]">Payment Records</h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mt-0.5">{total} total transactions</p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-[#F3F4F6] p-1 rounded-xl overflow-x-auto">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab
                      ? 'bg-white text-[#0B1F3B] shadow-sm'
                      : 'text-[#6B7280] hover:text-[#0B1F3B]'
                  }`}
                >
                  {tab}
                  {tab !== 'all' && (
                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[8px] ${
                      activeTab === tab ? 'bg-[#1E5EFF] text-white' : 'bg-[#E5E7EB] text-[#6B7280]'
                    }`}>
                      {payments.filter(p => p.status === tab).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <ClipboardList className="mx-auto mb-4 text-[#E5E7EB]" size={48} />
              <p className="text-[#6B7280] font-black text-xs uppercase tracking-widest">No {activeTab} payments found</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-1 px-1">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Tenant</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Amount</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Method</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Month Covered</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Ref #</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Proof</th>
                    <th className="px-6 py-4 text-right text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {filtered.map((pay) => (
                    <tr key={pay.id} className="hover:bg-[#F8FAFC] transition-all group">

                      <td className="px-6 py-5">
                        <p className="text-sm font-black uppercase text-[#0B1F3B] group-hover:text-[#1E5EFF] transition-colors">{pay.tenant_name}</p>
                        <p className="text-[10px] font-bold text-[#6B7280] uppercase mt-0.5">{pay.room_name}</p>
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-sm font-black text-[#0B1F3B]">₱{Number(pay.amount).toLocaleString()}</span>
                      </td>

                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                          pay.method === 'gcash' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {pay.method === 'gcash' ? <Smartphone size={10} /> : <Banknote size={10} />}
                          {pay.method}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={13} className="text-[#1E5EFF]" />
                          <span className="text-[10px] font-black uppercase text-[#6B7280]">
                            {new Date(pay.month_covered).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-[10px] font-mono font-bold text-[#6B7280]">{pay.reference_number ?? '—'}</span>
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge status={pay.status} />
                        {pay.status === 'flagged' && pay.notes && (
                          <p className="text-[9px] text-red-500 font-bold mt-1 max-w-[120px] truncate" title={pay.notes}>{pay.notes}</p>
                        )}
                      </td>

                      <td className="px-6 py-5">
                        {pay.proof_url ? (
                          <button
                            onClick={() => setProofModal(pay)}
                            className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#1E5EFF] hover:underline"
                          >
                            <Eye size={12} /> View
                          </button>
                        ) : (
                          <span className="text-[10px] text-[#D1D5DB] font-bold">—</span>
                        )}
                      </td>

                      <td className="px-6 py-5 text-right">
                        {pay.status === 'pending' && (
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              disabled={processing === pay.id}
                              onClick={() => handleVerify(pay.id, 'confirmed')}
                              className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-sm disabled:opacity-50"
                            >
                              {processing === pay.id ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                              Confirm
                            </button>
                            <button
                              disabled={processing === pay.id}
                              onClick={() => setPaymentToFlag(pay)}
                              className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-sm disabled:opacity-50"
                            >
                              <X size={12} /> Flag
                            </button>
                          </div>
                        )}
                        {pay.status !== 'pending' && (
                          <span className="text-[10px] text-[#D1D5DB] font-bold uppercase tracking-widest">Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <AdminFooter />
      </main>

      {mounted && createPortal(
        <AnimatePresence>
          {proofModal && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setProofModal(null)}
                className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md cursor-pointer"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="relative bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl border border-[#E5E7EB] p-8 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#22D3EE] to-[#1E5EFF]" />
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-black text-[#0B1F3B] uppercase tracking-tight">Proof of Payment</h2>
                    <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mt-0.5">{proofModal.tenant_name} — ₱{Number(proofModal.amount).toLocaleString()}</p>
                  </div>
                  <button onClick={() => setProofModal(null)} className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#E5E7EB] transition-all">
                    <X size={18} className="text-[#6B7280]" />
                  </button>
                </div>
                <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] mb-6">
                  <img src={proofModal.proof_url} alt="Payment proof" className="w-full object-contain max-h-[420px]" />
                </div>
                {proofModal.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => { handleVerify(proofModal.id, 'confirmed'); setProofModal(null); }}
                      className="flex-1 py-4 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                    >
                      <Check size={14} /> Confirm Payment
                    </button>
                    <button
                      onClick={() => { setProofModal(null); setPaymentToFlag(proofModal); }}
                      className="flex-1 py-4 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <X size={14} /> Flag
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {mounted && createPortal(
        <AnimatePresence>
          {paymentToFlag && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setPaymentToFlag(null)}
                className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md cursor-pointer"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="relative bg-white rounded-[2.5rem] w-full max-w-sm shadow-2xl border border-[#E5E7EB] p-10 text-center overflow-hidden"
              >
                <div className="absolute top-100 left-0 w-full h-1.5 bg-rose-500" />
                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldAlert size={36} />
                </div>
                <h2 className="text-2xl font-black text-[#0B1F3B] uppercase tracking-tight mb-2">Flag Payment?</h2>
                <p className="text-xs text-[#6B7280] font-bold uppercase tracking-widest leading-relaxed mb-6">
                  Flagging ₱<span className="text-rose-500">{Number(paymentToFlag.amount).toLocaleString()}</span> from <span className="text-[#0B1F3B]">{paymentToFlag.tenant_name}</span>
                </p>

                <textarea
                  value={flagNote}
                  onChange={e => setFlagNote(e.target.value)}
                  placeholder="Reason for flagging (shown to tenant)..."
                  rows={3}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-4 text-xs font-bold text-[#0B1F3B] outline-none focus:border-rose-400 resize-none mb-6 text-left"
                />

                <div className="flex gap-4">
                  <button
                    onClick={() => { setPaymentToFlag(null); setFlagNote(''); }}
                    className="flex-1 py-4 bg-[#F8FAFC] text-[#6B7280] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#E5E7EB] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleVerify(paymentToFlag.id, 'flagged', flagNote)}
                    className="flex-1 py-4 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all"
                  >
                    Confirm Flag
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}