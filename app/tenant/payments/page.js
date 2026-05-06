'use client';
import React, { useState, useEffect } from 'react';
import { Send, ShieldCheck, Loader2, QrCode, UploadCloud, FileCheck, Clock, CheckCircle2, AlertTriangle, XCircle, Receipt, CalendarDays } from 'lucide-react';
import TenantFooter from '@/components/TenantFooter';

const STATUS_CONFIG = {
  pending:   { label: 'Pending',   color: 'bg-amber-100 text-amber-700',   icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 },
  flagged:   { label: 'Flagged',   color: 'bg-red-100 text-red-700',        icon: AlertTriangle },
};

const METHOD_LABEL = { gcash: 'GCash', cash: 'Cash' };

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, color: 'bg-gray-100 text-gray-600', icon: Clock };
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${cfg.color}`}>
      <Icon size={10} /> {cfg.label}
    </span>
  );
}

export default function TenantPayments() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const [formData, setFormData] = useState({
    amount: '',
    method: 'gcash',
    reference_number: '',
    month_covered: new Date().toISOString().split('T')[0],
    notes: ''
  });

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
      alert("Please upload a screenshot of your GCash receipt.");
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
        if (!uploadRes.ok) throw new Error("Image upload failed");
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
        setSuccess(true);
        setSelectedFile(null);
        setFormData({ amount: '', method: 'gcash', reference_number: '', month_covered: new Date().toISOString().split('T')[0], notes: '' });
        setTimeout(() => setSuccess(false), 5000);
        fetchHistory(); // refresh history after submit
      }
    } catch (err) {
      console.error("Payment Submission Error:", err);
      alert("Submission failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  // Summary stats from history
  const totalPaid = history.filter(p => p.status === 'confirmed').reduce((sum, p) => sum + Number(p.amount), 0);
  const pendingCount = history.filter(p => p.status === 'pending').length;
  const flaggedCount = history.filter(p => p.status === 'flagged').length;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-[#0B1F3B]">
      <main className="flex-1 p-8 lg:p-12">
        

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tight">Payment <span className="text-[#1E5EFF]">Portal</span></h1>
          <p className="text-[#6B7280] text-[10px] font-bold tracking-[0.3em] uppercase mt-2">Secure Deployment</p>
        </div>

                {/* Payment History */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm mb-10">
          <div className="px-8 py-6 border-b border-[#E5E7EB] bg-[#F8FAFC] flex items-center gap-4">
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
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Month Covered</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Amount</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Method</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Ref #</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Date Submitted</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[#6B7280] tracking-widest">Proof</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {history.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F8FAFC] transition-all">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={14} className="text-[#1E5EFF]" />
                          <span className="text-xs font-black uppercase text-[#0B1F3B]">
                            {new Date(p.month_covered).toLocaleDateString('en-PH', { month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-black text-[#0B1F3B]">₱{Number(p.amount).toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]">{METHOD_LABEL[p.method] ?? p.method}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[10px] font-mono font-bold text-[#6B7280]">{p.reference_number ?? '—'}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[10px] font-bold text-[#9CA3AF]">
                          {new Date(p.created_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <StatusBadge status={p.status} />
                        {p.status === 'flagged' && p.notes && (
                          <p className="text-[9px] text-red-500 font-bold mt-1 max-w-[140px]">{p.notes}</p>
                        )}
                      </td>
                      <td className="px-6 py-5">
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

        {/* Form + QR */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          <div className="xl:col-span-2 bg-white border border-[#E5E7EB] rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#22D3EE] to-[#1E5EFF]" />

            <h2 className="text-sm font-black uppercase tracking-widest text-[#0B1F3B] mb-8 pb-4 border-b border-[#E5E7EB]">
              Submit Payment
            </h2>

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

              {success && (
                <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl px-6 py-4">
                  <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />
                  <p className="text-emerald-700 text-[10px] font-black uppercase tracking-wider">
                    Payment submitted! Waiting for admin verification.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* QR Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#0B1F3B] p-10 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
              <QrCode className="mx-auto text-[#22D3EE] mb-6" size={40} />
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/50 mb-8">Scan to Pay</h3>
              <div className="w-48 h-48 bg-white mx-auto rounded-3xl p-4 mb-8 flex items-center justify-center">
                <div className="w-full h-full bg-gray-100 rounded-2xl border-4 border-dashed border-gray-200 flex items-center justify-center">
                  <span className="text-[8px] font-black text-gray-300 uppercase italic">QR Placeholder</span>
                </div>
              </div>
              <p className="text-[10px] font-black text-[#22D3EE] uppercase tracking-[0.2em]">GCash: WHELSTER R. E.</p>
            </div>

            {/* Latest payment status card */}
            {history.length > 0 && (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mb-4">Latest Payment</p>
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
            )}
          </div>
        </div>
        <TenantFooter />
      </main>
    </div>
  );
}