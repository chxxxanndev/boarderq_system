'use client';
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Loader2, QrCode, UploadCloud, FileCheck, Clock, CheckCircle2, AlertTriangle, Receipt, CalendarDays, Zap, CreditCard, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import TenantFooter from '@/components/TenantFooter';
import { motion, AnimatePresence } from 'framer-motion';

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

const STATUS_CONFIG = {
  pending:   { label: 'Pending',   color: 'bg-amber-100 text-amber-700',    icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  flagged:   { label: 'Flagged',   color: 'bg-red-100 text-red-700',         icon: AlertTriangle },
};

const METHOD_LABEL = { gcash: 'GCash', cash: 'Cash' };

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, color: 'bg-gray-100 text-gray-600', icon: Clock };
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${cfg.color}`}>
      <Icon size={10} /> {cfg.label}
    </span>
  );
}

function Toast({ notification }) {
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 20, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className={`fixed top-100 left-1/2 -translate-x-1/2 z-[10001] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[300px] border ${
            notification.type === 'error'
              ? 'bg-rose-500 border-rose-400 text-white'
              : 'bg-emerald-500 border-emerald-400 text-white'
          }`}
        >
          {notification.type === 'error' ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
          <span className="text-xs font-black uppercase tracking-wider flex-1">{notification.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PaymentCalendar({ history }) {
  const [viewYear, setViewYear] = useState(new Date().getFullYear());

  const priority = { confirmed: 3, pending: 2, flagged: 1 };
  const paymentMap = {};
  history?.forEach(p => {
    const d = new Date(p.month_covered);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (!paymentMap[key] || priority[p.status] > priority[paymentMap[key]?.status]) {
      paymentMap[key] = { status: p.status, amount: p.amount };
    }
  });

  const MONTH_STATUS = {
    confirmed: {
      bg: 'bg-emerald-500',
      text: 'text-white',
      badge: 'bg-emerald-100 text-emerald-700',
      label: 'Paid',
    },
    pending: {
      bg: 'bg-amber-400',
      text: 'text-white',
      badge: 'bg-amber-100 text-amber-700',
      label: 'Pending',
    },
    flagged: {
      bg: 'bg-red-500',
      text: 'text-white',
      badge: 'bg-red-100 text-red-700',
      label: 'Flagged',
    },
  };

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const yearPaid     = MONTHS.filter((_, i) => paymentMap[`${viewYear}-${i}`]?.status === 'confirmed').length;
  const yearPending  = MONTHS.filter((_, i) => paymentMap[`${viewYear}-${i}`]?.status === 'pending').length;
  const yearFlagged  = MONTHS.filter((_, i) => paymentMap[`${viewYear}-${i}`]?.status === 'flagged').length;
  const yearTotal    = history
    ?.filter(p => new Date(p.month_covered).getFullYear() === viewYear && p.status === 'confirmed')
    .reduce((sum, p) => sum + Number(p.amount), 0) ?? 0;

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-[#E5E7EB] header-shine flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] rounded-xl flex items-center justify-center">
            <CalendarDays size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-[#0B1F3B]">Payment Calendar</h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mt-0.5">Monthly payment overview</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewYear(y => y - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] transition-all text-[#6B7280] hover:text-[#0B1F3B]"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-black text-[#0B1F3B] w-12 text-center">{viewYear}</span>
          <button
            onClick={() => setViewYear(y => y + 1)}
            disabled={viewYear >= currentYear}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F3F4F6] transition-all text-[#6B7280] hover:text-[#0B1F3B] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-4 gap-3 mb-8">
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 text-center">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#6B7280] mb-1">Paid</p>
            <p className="text-xl font-black text-emerald-600">{yearPaid}</p>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 text-center">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#6B7280] mb-1">Pending</p>
            <p className="text-xl font-black text-amber-600">{yearPending}</p>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 text-center">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#6B7280] mb-1">Flagged</p>
            <p className="text-xl font-black text-red-600">{yearFlagged}</p>
          </div>
          <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4 text-center">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#6B7280] mb-1">Total</p>
            <p className="text-lg font-black text-[#1E5EFF]">₱{(yearTotal / 1000).toFixed(1)}K</p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {MONTHS.map((month, i) => {
            const key = `${viewYear}-${i}`;
            const entry = paymentMap[key];
            const cfg = entry ? MONTH_STATUS[entry.status] : null;
            const isCurrentMonth = i === currentMonth && viewYear === currentYear;
            const isFuture = viewYear === currentYear ? i > currentMonth : viewYear > currentYear;

            return (
              <div
                key={month}
                className={`relative rounded-2xl p-4 flex flex-col items-center justify-center gap-1.5 transition-all border
                  ${cfg
                    ? `${cfg.bg} border-transparent shadow-sm`
                    : isFuture
                      ? 'bg-[#F8FAFC] border-[#E5E7EB] opacity-40'
                      : 'bg-[#F8FAFC] border-dashed border-[#E5E7EB]'
                  }
                  ${isCurrentMonth && !cfg ? 'border-[#1E5EFF] border-solid' : ''}
                `}
              >
                {isCurrentMonth && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#1E5EFF] rounded-full border-2 border-white" />
                )}

                <span className={`text-[11px] font-black uppercase tracking-widest ${cfg ? cfg.text : 'text-[#9CA3AF]'}`}>
                  {month}
                </span>

                {entry ? (
                  <>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                    <span className={`text-[10px] font-bold ${cfg.text} opacity-80`}>
                      ₱{Number(entry.amount).toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-[9px] font-bold text-[#D1D5DB] uppercase tracking-wider">
                    {isFuture ? '—' : 'No record'}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-[#E5E7EB]">
          {[
            { color: 'bg-emerald-500', label: 'Confirmed' },
            { color: 'bg-amber-400',   label: 'Pending' },
            { color: 'bg-red-500',     label: 'Flagged' },
            { color: 'border-2 border-dashed border-[#E5E7EB] bg-[#F8FAFC]', label: 'No Record' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">{item.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-3 h-3 rounded-full bg-[#1E5EFF]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]">Current Month</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TenantPayments() {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    amount: '',
    method: 'gcash',
    reference_number: '',
    month_covered: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const showNotify = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch('/api/payments/history', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) setHistory(await res.json());
    } catch (err) {
      console.error('History fetch error:', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile && formData.method === 'gcash') {
      showNotify('Please upload a screenshot of your GCash receipt.', 'error');
      return;
    }
    setLoading(true);
    try {
      let proof_url = null;
      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append('file', selectedFile);
        const uploadRes = await fetch('/api/rooms/upload', { method: 'POST', body: uploadData });
        const uploadResult = await uploadRes.json();
        if (!uploadRes.ok) {
          showNotify('Image upload failed. Please try again.', 'error');
          return;
        }
        proof_url = uploadResult.url;
      }

      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...formData, proof_url }),
      });

      if (res.ok) {
        showNotify('Payment submitted! Waiting for admin verification.');
        setSelectedFile(null);
        setFormData({
          amount: '',
          method: 'gcash',
          reference_number: '',
          month_covered: new Date().toISOString().split('T')[0],
          notes: ''
        });
        fetchHistory();
      } else {
        const err = await res.json();
        showNotify(err.error ?? 'Submission failed. Please try again.', 'error');
      }
    } catch (err) {
      console.error("Payment Submission Error:", err);
      showNotify('Server connection error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const totalPaid = history.filter(p => p.status === 'confirmed').reduce((sum, p) => sum + Number(p.amount), 0);
  const pendingCount = history.filter(p => p.status === 'pending').length;
  const flaggedCount = history.filter(p => p.status === 'flagged').length;

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
      <Toast notification={notification} />

      <main className="flex-1 p-4 sm:p-8 lg:p-12 min-w-0">

        <RevealOnScroll>
          <div className="header-shine border border-[#E5E7EB] p-8 md:p-10 rounded-[2.5rem] mb-12 shadow-sm">
            <h1 className="text-4xl font-black uppercase tracking-tight leading-none">Payment <span className="text-[#1E5EFF]">Portal</span></h1>
            <p className="text-[#6B7280] text-[10px] font-bold tracking-[0.3em] uppercase mt-3">Secure Deployment & Asset Verification</p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          <div className="xl:col-span-2">
            <RevealOnScroll delay={0.1}>
              <div className="bg-white border border-[#E5E7EB] rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                <div className="header-shine border-b border-[#E5E7EB] -mx-10 -mt-10 px-10 py-6 mb-8">
                   <h2 className="text-sm font-black uppercase tracking-widest text-[#0B1F3B]">
                    Submit Payment
                  </h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Amount (PHP)</label>
                      <input required type="number" value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-5 rounded-2xl text-lg font-black focus:border-[#1E5EFF] outline-none"
                        placeholder="0.00" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Method</label>
                      <select className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-5 rounded-2xl text-sm font-black uppercase outline-none"
                        value={formData.method} onChange={(e) => setFormData({ ...formData, method: e.target.value })}>
                        <option value="gcash">GCASH</option>
                        <option value="cash">CASH</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Ref Number</label>
                      <input type="text" value={formData.reference_number}
                        onChange={(e) => setFormData({ ...formData, reference_number: e.target.value })}
                        className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-5 rounded-2xl text-sm font-mono font-black focus:border-[#1E5EFF] outline-none"
                        placeholder="13-DIGIT ID" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Proof of Payment</label>
                      <label className="flex flex-col items-center justify-center w-full h-16 bg-[#F8FAFC] border-2 border-dashed border-[#E5E7EB] rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                        <div className="flex items-center gap-3">
                          {selectedFile ? <FileCheck className="text-emerald-500" size={20} /> : <UploadCloud className="text-[#1E5EFF]" size={20} />}
                          <span className="text-[10px] font-black uppercase text-[#6B7280]">
                            {selectedFile ? selectedFile.name : "Upload Screenshot"}
                          </span>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Billing Month</label>
                    <input required type="date" value={formData.month_covered}
                      onChange={(e) => setFormData({ ...formData, month_covered: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-5 rounded-2xl text-sm font-black uppercase outline-none" />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">Notes (optional)</label>
                    <textarea value={formData.notes} rows={3}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] p-5 rounded-2xl text-sm font-bold focus:border-[#1E5EFF] outline-none resize-none"
                      placeholder="Any additional notes..." />
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full bg-gradient-to-r from-[#22D3EE] to-[#1E5EFF] text-white py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                    {loading ? <Loader2 className="animate-spin" /> : <><ShieldCheck size={18} /> Authenticate Payment</>}
                  </button>
                </form>
              </div>
            </RevealOnScroll>
          </div>

          <div className="space-y-8">
            <RevealOnScroll delay={0.2}>
              <div className="bg-[#0B1F3B] p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
                <QrCode className="mx-auto text-[#22D3EE] mb-6" size={40} />
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/50 mb-8">Scan to Pay</h3>
                <div className="w-48 h-48 bg-white mx-auto rounded-3xl p-4 mb-8 flex items-center justify-center">
                  <div className="w-full h-full bg-gray-100 rounded-2xl border-4 border-dashed border-gray-200 flex items-center justify-center">
                    <span className="text-[8px] font-black text-gray-300 uppercase italic">QR Placeholder</span>
                  </div>
                </div>
                <p className="text-[10px] font-black text-[#22D3EE] uppercase tracking-[0.2em]">GCash: CHE ANN P. A.</p>
              </div>
            </RevealOnScroll>

            {history.length > 0 && (
              <RevealOnScroll delay={0.3}>
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm overflow-hidden">
                  <div className="header-shine -mx-6 -mt-6 px-6 py-4 border-b border-[#E5E7EB] mb-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#0B1F3B]">Latest Payment</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#6B7280] uppercase">Amount</span>
                      <span className="text-sm font-black text-[#0B1F3B]">₱{Number(history[0].amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#6B7280] uppercase">Method</span>
                      <span className="text-sm font-black text-[#0B1F3B]">{METHOD_LABEL[history[0].method]}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#6B7280] uppercase">Status</span>
                      <StatusBadge status={history[0].status} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#6B7280] uppercase">Month</span>
                      <span className="text-sm font-black text-[#0B1F3B]">
                        {new Date(history[0].month_covered).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            )}
          </div>
        </div>

        {!historyLoading && (
          <div className="mb-10">
            <RevealOnScroll delay={0.4}>
              <PaymentCalendar history={history} />
            </RevealOnScroll>
          </div>
        )}

        <RevealOnScroll delay={0.5}>
          <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm mb-10">
            <div className="px-8 py-6 border-b border-[#E5E7EB] header-shine flex items-center gap-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#22D3EE] to-[#1E5EFF] rounded-xl flex items-center justify-center">
                <Receipt size={16} className="text-white" />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-widest text-[#0B1F3B]">Payment History</h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mt-0.5">All your submitted payments</p>
              </div>
            </div>

            {historyLoading ? (
              <div className="py-16 flex items-center justify-center text-[#1E5EFF]">
                <Loader2 className="animate-spin mr-2" size={20} /> Loading history...
              </div>
            ) : history.length === 0 ? (
              <div className="py-20 text-center">
                <Receipt className="mx-auto text-[#E5E7EB] mb-4" size={48} />
                <p className="text-[#6B7280] font-black text-xs uppercase tracking-widest">No payment records found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest whitespace-nowrap">Month Covered</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest whitespace-nowrap">Amount</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest whitespace-nowrap">Method</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest whitespace-nowrap">Ref #</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest whitespace-nowrap">Date Submitted</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest whitespace-nowrap">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest whitespace-nowrap">Proof</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {history.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F8FAFC] transition-all">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <CalendarDays size={14} className="text-[#1E5EFF]" />
                            <span className="text-xs font-black uppercase text-[#0B1F3B]">
                              {new Date(p.month_covered).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="text-sm font-black text-[#0B1F3B]">₱{Number(p.amount).toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">{METHOD_LABEL[p.method] ?? p.method}</span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="text-[10px] font-mono font-bold text-[#6B7280]">{p.reference_number ?? '—'}</span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="text-[10px] font-bold text-[#9CA3AF]">
                            {new Date(p.created_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <StatusBadge status={p.status} />
                          {p.status === 'flagged' && p.notes && (
                            <p className="text-[9px] text-red-500 font-bold mt-1 max-w-[140px]">{p.notes}</p>
                          )}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          {p.proof_url ? (
                            <a href={p.proof_url} target="_blank" rel="noopener noreferrer"
                              className="text-[9px] font-black uppercase tracking-widest text-[#1E5EFF] hover:underline flex items-center gap-1">
                              <FileCheck size={12} /> View
                            </a>
                          ) : (
                            <span className="text-[10px] text-[#D1D5DB] font-bold">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.6}>
          <TenantFooter />
        </RevealOnScroll>
      </main>
    </div>
  );
}