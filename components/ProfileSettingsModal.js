'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Lock, User, Mail, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

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
        setMessage({ type: 'success', text: 'Identity Updated' });
        onUpdate(data.user); 
        setTimeout(onClose, 1500);
      } else {
        setMessage({ type: 'error', text: data.error || 'Update Failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network Error' });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-3.5 pl-12 pr-5 focus:outline-none focus:border-[#1E5EFF] text-sm font-bold text-[#0B1F3B] placeholder:text-[#9CA3AF] transition-all shadow-sm";
  const labelClasses = "block text-[10px] font-black uppercase tracking-[0.2em] text-[#6B7280] mb-2 ml-1";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0B1F3B]/80 backdrop-blur-md" 
            onClick={onClose} 
          />
          
          {/* Modal Container */}
          <motion.div 
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }}
            sm={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#E5E7EB] bg-[#F8FAFC]">
              <div>
                <h3 className="font-black text-2xl tracking-tight uppercase text-[#0B1F3B]">
                  USER <span className="text-[#1E5EFF]">PROFILE</span>
                </h3>
                <p className="text-[#6B7280] text-[9px] font-black tracking-[0.2em] uppercase mt-1">Authentication Registry</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-[#0B1F3B]">
                <X size={22} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
              
              {/* Message Alert */}
              <AnimatePresence>
                {message.text && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-4 rounded-xl flex items-center gap-3 border ${
                      message.type === 'success' 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                        : 'bg-rose-50 border-rose-200 text-rose-600'
                    }`}
                  >
                    {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                    <span className="text-[10px] font-black uppercase tracking-widest">{message.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name Field */}
              <div className="space-y-1">
                <label className={labelClasses}>Full Identity Name</label>
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#1E5EFF] transition-colors" />
                  <input 
                    type="text" required
                    className={inputClasses}
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label className={labelClasses}>Primary Contact Email</label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] group-focus-within:text-[#1E5EFF] transition-colors" />
                  <input 
                    type="email" required
                    className={inputClasses}
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="pt-4 border-t border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-4">
                    <Lock size={14} className="text-[#1E5EFF]" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1F3B]">Security Credentials</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={labelClasses}>Current PIN</label>
                    <input 
                      type="password" placeholder="••••••••"
                      className={inputClasses.replace('pl-12', 'pl-5')}
                      onChange={e => setFormData({...formData, currentPassword: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className={labelClasses}>New Access Code</label>
                    <input 
                      type="password" placeholder="••••••••"
                      className={inputClasses.replace('pl-12', 'pl-5')}
                      onChange={e => setFormData({...formData, newPassword: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                type="submit" disabled={loading}
                className="w-full h-16 bg-[#1E5EFF] hover:bg-[#0B1F3B] text-white rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                {loading ? 'SYNCHRONIZING...' : 'COMMIT CHANGES'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}