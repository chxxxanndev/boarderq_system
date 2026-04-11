'use client';
import { useState, useEffect } from 'react';
import { X, Save, Lock, User, Mail, Loader2 } from 'lucide-react';

export default function ProfileSettingsModal({ isOpen, onClose, user, onUpdate }) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        onUpdate(data.user); // Refresh Navbar state
        setTimeout(onClose, 1500);
      } else {
        setMessage({ type: 'error', text: data.error || 'Update failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Connection error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0B1120] border border-white/10 rounded-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/20">
          <h3 className="font-black text-[11px] tracking-[0.2em] uppercase text-white">Account Settings</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {message.text && (
            <div className={`p-3 text-[10px] font-bold uppercase tracking-wider rounded-sm ${
              message.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
            }`}>
              {message.text}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Full Name</label>
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00A3CC]" />
              <input 
                type="text" required
                className="w-full bg-black border border-white/10 rounded-sm py-2.5 pl-10 pr-4 text-xs text-white focus:border-[#00A3CC] outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Email Address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00A3CC]" />
              <input 
                type="email" required
                className="w-full bg-black border border-white/10 rounded-sm py-2.5 pl-10 pr-4 text-xs text-white focus:border-[#00A3CC] outline-none transition-all"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#00A3CC] mb-3">Change Password (Optional)</p>
            <div className="space-y-3">
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                <input 
                  type="password" placeholder="Current Password"
                  className="w-full bg-black border border-white/10 rounded-sm py-2.5 pl-10 pr-4 text-xs text-white focus:border-[#00A3CC] outline-none"
                  onChange={e => setFormData({...formData, currentPassword: e.target.value})}
                />
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                <input 
                  type="password" placeholder="New Password"
                  className="w-full bg-black border border-white/10 rounded-sm py-2.5 pl-10 pr-4 text-xs text-white focus:border-[#00A3CC] outline-none"
                  onChange={e => setFormData({...formData, newPassword: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-[#00A3CC] hover:bg-white hover:text-black text-white py-3 rounded-sm font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {loading ? 'Processing...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}